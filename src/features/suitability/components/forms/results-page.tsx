import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { suitabilityAtom } from "../../store";
import type { SuitabilityFormValues } from "../../schema";
import { ResultsScreen } from "../results-screen";

export default function ResultsPage() {
  const formData = useAtomValue(suitabilityAtom);

  useEffect(() => {
    // Console.log the complete form data as requested
    console.log("Suitability Form Submission:", formData);
  }, [formData]);

  const handleBookConsultation = () => {
    window.open("https://cal.com", "_blank");
  };

  // Check if we have the required data
  const hasRequiredData = !!(formData.name && formData.email && formData.phone);

  if (!hasRequiredData) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h2 className="heading-2">No form data found</h2>
        <p className="text-muted-foreground mt-4">
          Please complete the suitability check first.
        </p>
        <a
          href="/suitability-check/intent"
          className="text-gold mt-4 inline-block underline"
        >
          Start the suitability check
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <ResultsScreen
        values={formData as SuitabilityFormValues}
        onBookConsultation={handleBookConsultation}
      />
    </div>
  );
}
