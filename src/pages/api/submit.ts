export const prerender = false;

import type { APIRoute } from "astro";
import {
  suitabilitySchema,
  type SuitabilityFormValues,
} from "@/features/suitability/schema";

const SHEET_RANGE = "Submissions!A:M";

async function getAccessToken(
  serviceAccountEmail: string,
  privateKey: string,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccountEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const base64UrlEncode = (obj: object): string =>
    btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(obj))))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const keyData = privateKey.replace(
    /-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n/g,
    "",
  );
  const binaryKey = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsignedToken),
  );

  const encodedSignature = btoa(
    String.fromCharCode(...new Uint8Array(signature)),
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  const jwt = `${unsignedToken}.${encodedSignature}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Google OAuth failed: ${response.status} - ${error}`);
  }

  const { access_token } = await response.json();
  return access_token;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: SuitabilityFormValues = await request.json();

    const validation = suitabilitySchema.safeParse(data);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid form data" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const privateKey = import.meta.env.GOOGLE_PRIVATE_KEY;
    const clientEmail = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const spreadsheetId = import.meta.env.SPREADSHEET_ID;

    if (!privateKey || !clientEmail || !spreadsheetId) {
      console.error("Missing env vars");
      return new Response(
        JSON.stringify({ success: false, error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const accessToken = await getAccessToken(clientEmail, privateKey);

    const row = [
      new Date().toISOString(),
      data.name,
      data.email,
      data.phone,
      Array.isArray(data.goals) ? data.goals.join(", ") : data.goals,
      data.timeline,
      data.useEquity,
      data.netIncome,
      data.investWith,
      data.residenceStatus,
      data.employmentStatus,
      data.employmentType || "",
      data.schufaEntries,
    ];

    const sheetsResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_RANGE}:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [row] }),
      },
    );

    if (!sheetsResponse.ok) {
      const errorText = await sheetsResponse.text();
      console.error("Google Sheets API error:", errorText);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to save submission" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Submit endpoint error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
