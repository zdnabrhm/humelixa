import type { SuitabilityFormValues } from "./schema";

const GOOGLE_SCRIPT_URL = import.meta.env.PUBLIC_GOOGLE_SCRIPT_URL;

export async function submitToGoogleSheets(
  data: SuitabilityFormValues,
): Promise<{ success: boolean }> {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn("Google Script URL not configured, logging data instead:");
    console.log("Form submission:", data);
    return { success: true };
  }

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      goals: data.goals.join(", "),
      timeline: data.timeline,
      useEquity: data.useEquity,
      netIncome: data.netIncome,
      investWith: data.investWith,
      residenceStatus: data.residenceStatus,
      employmentStatus: data.employmentStatus,
      employmentType: data.employmentType || "N/A",
      schufaEntries: data.schufaEntries,
    }),
  });

  return { success: true };
}
