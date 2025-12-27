import { cn } from "@/lib/utils";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function FormProgress({
  currentStep,
  totalSteps,
  className,
}: FormProgressProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={cn(
              "size-2 rounded-full transition-all duration-300",
              index === currentStep
                ? "bg-gold scale-125"
                : index < currentStep
                  ? "bg-gold/50"
                  : "bg-gold/20",
            )}
          />
        ))}
      </div>
      <p className="text-muted-foreground font-mono text-xs tracking-wide">
        Step {currentStep + 1} of {totalSteps}
      </p>
    </div>
  );
}
