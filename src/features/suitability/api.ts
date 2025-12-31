import type { SuitabilityFormValues } from "./schema";

export async function submitToGoogleSheets(
  data: SuitabilityFormValues,
): Promise<{ success: boolean }> {
  const response = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Submission failed");
  }

  return response.json();
}
