import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import type { SuitabilityFormValues } from "../../schema";
import { goalOptions, timelineOptions } from "../../types";

interface GoalsTimelineStepProps {
  values: Partial<SuitabilityFormValues>;
  onChange: (values: Partial<SuitabilityFormValues>) => void;
  errors?: Record<string, string>;
}

export function GoalsTimelineStep({
  values,
  onChange,
  errors,
}: GoalsTimelineStepProps) {
  const selectedGoals = (values.goals ?? []) as SuitabilityFormValues["goals"];

  const handleGoalChange = (
    goal: SuitabilityFormValues["goals"][number],
    checked: boolean,
  ) => {
    const newGoals = checked
      ? [...selectedGoals, goal]
      : selectedGoals.filter((g) => g !== goal);
    onChange({ ...values, goals: newGoals });
  };

  return (
    <div className="space-y-8">
      <FieldSet>
        <FieldLegend className="heading-2 mb-2 text-center">
          What are your investment goals?
        </FieldLegend>
        <FieldDescription className="mb-6 text-center">
          Select all that apply
        </FieldDescription>
        <FieldGroup className="mx-auto grid max-w-lg gap-3">
          {goalOptions.map((option) => {
            const isChecked = selectedGoals.includes(
              option.value as SuitabilityFormValues["goals"][number],
            );

            return (
              <Field
                key={option.value}
                orientation="horizontal"
                data-invalid={!!errors?.goals}
              >
                <Checkbox
                  id={`goal-${option.value}`}
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    handleGoalChange(
                      option.value as SuitabilityFormValues["goals"][number],
                      !!checked,
                    )
                  }
                />
                <FieldLabel htmlFor={`goal-${option.value}`}>
                  {option.label}
                </FieldLabel>
              </Field>
            );
          })}
        </FieldGroup>
        {errors?.goals && <FieldError errors={[{ message: errors.goals }]} />}
      </FieldSet>

      <FieldSet>
        <FieldLegend className="heading-2 mb-6 text-center">
          When would you like to start?
        </FieldLegend>
        <RadioGroup
          value={values.timeline ?? ""}
          onValueChange={(v) =>
            onChange({
              ...values,
              timeline: v as SuitabilityFormValues["timeline"],
            })
          }
          className="mx-auto grid max-w-lg gap-3 md:grid-cols-2"
        >
          {timelineOptions.map((option) => (
            <FieldLabel key={option.value} htmlFor={`timeline-${option.value}`}>
              <Field orientation="horizontal" data-invalid={!!errors?.timeline}>
                <RadioGroupItem
                  value={option.value}
                  id={`timeline-${option.value}`}
                />
                <FieldContent>
                  <FieldTitle>{option.label}</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
        {errors?.timeline && (
          <FieldError errors={[{ message: errors.timeline }]} />
        )}
      </FieldSet>
    </div>
  );
}
