import { CheckIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "goals-timeline", label: "Goals" },
  { id: "financial", label: "Financial" },
  { id: "situation", label: "Situation" },
  { id: "schufa", label: "Credit" },
  { id: "contact", label: "Contact" },
] as const;

interface StepIndicatorProps {
  currentStep: number;
  className?: string;
}

export function StepIndicator({ currentStep, className }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress" className={cn("mb-8", className)}>
      <ol className="flex items-center justify-center gap-2 md:gap-4">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <li key={step.id} className="flex items-center gap-2 md:gap-4">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                    isCompleted && "border-gold bg-gold text-black",
                    isCurrent && "border-gold text-gold",
                    !isCompleted && !isCurrent && "border-gold/30 text-gold/30",
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon className="size-4" weight="bold" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "hidden text-xs md:block",
                    isCompleted && "text-gold",
                    isCurrent && "text-gold font-medium",
                    !isCompleted && !isCurrent && "text-gold/30",
                  )}
                >
                  {step.label}
                </span>
              </div>

              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-6 md:w-12",
                    index < currentStep ? "bg-gold" : "bg-gold/20",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
