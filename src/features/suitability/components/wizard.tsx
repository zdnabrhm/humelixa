import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SpinnerIcon,
} from "@phosphor-icons/react";
import { suitabilityAtom } from "../store";
import {
  stepSchemas,
  EmploymentValue,
  type StepId,
  type SuitabilityFormValues,
} from "../schema";
import { StepIndicator } from "./step-indicator";
import { ResultsScreen } from "./results-screen";
import { GoalsTimelineStep } from "./steps/goals-timeline-step";
import { FinancialStep } from "./steps/financial-step";
import { SituationStep } from "./steps/situation-step";
import { SchufaStep } from "./steps/schufa-step";
import { ContactStep } from "./steps/contact-step";
import { submitToGoogleSheets } from "../api";

const STEPS: { id: StepId; label: string }[] = [
  { id: "goals-timeline", label: "Goals" },
  { id: "financial", label: "Financial" },
  { id: "situation", label: "Situation" },
  { id: "schufa", label: "Credit" },
  { id: "contact", label: "Contact" },
];

export function SuitabilityWizard() {
  const [formData, setFormData] = useAtom(suitabilityAtom);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const stepIndex = STEPS.findIndex((s) => s.id === hash);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  }, []);

  useEffect(() => {
    window.location.hash = STEPS[currentStep].id;
  }, [currentStep]);

  const validateStep = (stepId: StepId): boolean => {
    const schema = stepSchemas[stepId];
    const result = schema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        newErrors[field] = issue.message;
      });

      setErrors(newErrors);
      return false;
    }

    if (
      stepId === "situation" &&
      formData.employmentStatus === EmploymentValue.EMPLOYED &&
      !formData.employmentType
    ) {
      setErrors({ employmentType: "Please select your employment type" });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleNext = async () => {
    const stepId = STEPS[currentStep].id;

    if (!validateStep(stepId)) {
      return;
    }

    if (currentStep === STEPS.length - 1) {
      setIsSubmitting(true);
      try {
        await submitToGoogleSheets(formData as SuitabilityFormValues);
        setIsComplete(true);
      } catch (error) {
        console.error("Submission failed:", error);
        setErrors({ submit: "Submission failed. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setDirection("forward");
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection("backward");
      setErrors({});
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleChange = (values: Partial<SuitabilityFormValues>) => {
    setFormData(values);
    setErrors({});
  };

  if (isComplete) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <ResultsScreen values={formData as SuitabilityFormValues} />
      </div>
    );
  }

  const stepId = STEPS[currentStep].id;
  const canProceed = (() => {
    switch (stepId) {
      case "goals-timeline":
        return (formData.goals?.length ?? 0) > 0 && !!formData.timeline;
      case "financial":
        return (
          !!formData.useEquity && !!formData.netIncome && !!formData.investWith
        );
      case "situation": {
        const hasBasics =
          !!formData.residenceStatus && !!formData.employmentStatus;
        if (formData.employmentStatus === EmploymentValue.EMPLOYED) {
          return hasBasics && !!formData.employmentType;
        }
        return hasBasics;
      }
      case "schufa":
        return !!formData.schufaEntries;
      case "contact":
        return (
          !!formData.name &&
          !!formData.email &&
          !!formData.phone &&
          !!formData.turnstileToken
        );
      default:
        return false;
    }
  })();

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <StepIndicator currentStep={currentStep} />

      <div
        key={stepId}
        className={`animate-in fade-in duration-300 ${
          direction === "forward"
            ? "slide-in-from-right-4"
            : "slide-in-from-left-4"
        }`}
      >
        {stepId === "goals-timeline" && (
          <GoalsTimelineStep
            values={formData}
            onChange={handleChange}
            errors={errors}
          />
        )}
        {stepId === "financial" && (
          <FinancialStep
            values={formData}
            onChange={handleChange}
            errors={errors}
          />
        )}
        {stepId === "situation" && (
          <SituationStep
            values={formData}
            onChange={handleChange}
            errors={errors}
          />
        )}
        {stepId === "schufa" && (
          <SchufaStep
            values={formData}
            onChange={handleChange}
            errors={errors}
          />
        )}
        {stepId === "contact" && (
          <ContactStep
            values={formData}
            onChange={handleChange}
            errors={errors}
          />
        )}
      </div>

      {errors.submit && (
        <p className="text-destructive text-center text-sm">{errors.submit}</p>
      )}

      <div className="flex items-center justify-between gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className={currentStep === 0 ? "invisible" : ""}
        >
          <ArrowLeftIcon className="size-4" />
          Back
        </Button>

        <Button onClick={handleNext} disabled={!canProceed || isSubmitting}>
          {isSubmitting ? (
            <>
              <SpinnerIcon className="size-4 animate-spin" />
              Submitting...
            </>
          ) : currentStep === STEPS.length - 1 ? (
            "Submit"
          ) : (
            <>
              Next
              <ArrowRightIcon className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
