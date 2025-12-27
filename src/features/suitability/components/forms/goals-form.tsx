import { useForm } from "@tanstack/react-form";
import { useAtom } from "jotai";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { suitabilityAtom } from "../../store";
import { suitabilitySchema, type SuitabilityFormValues } from "../../schema";
import { goalOptions } from "../../types";
import { FormProgress } from "../form-progress";

const goalsSchema = suitabilitySchema.pick({ goals: true });

export default function GoalsForm() {
  const [formData, setFormData] = useAtom(suitabilityAtom);

  const form = useForm({
    defaultValues: {
      goals: (formData.goals ?? []) as SuitabilityFormValues["goals"],
    },
    validators: {
      onSubmit: goalsSchema,
    },
    onSubmit: async ({ value }) => {
      setFormData({ ...formData, ...value });
      window.location.href = "/suitability-check/residence";
    },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <FormProgress currentStep={3} totalSteps={11} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="heading-2">What is important to you?</h2>
            <p className="text-muted-foreground mt-4">Select all that apply</p>
          </div>

          <form.Field name="goals" mode="array">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const selectedGoals = field.state
                .value as SuitabilityFormValues["goals"];

              return (
                <Field data-invalid={isInvalid}>
                  <FieldGroup
                    data-slot="checkbox-group"
                    className="mx-auto grid max-w-lg gap-3"
                  >
                    {goalOptions.map((option) => {
                      const isChecked = selectedGoals.includes(
                        option.value as SuitabilityFormValues["goals"][number],
                      );

                      return (
                        <FieldLabel
                          key={option.value}
                          htmlFor={`goal-${option.value}`}
                          className="cursor-pointer"
                        >
                          <div
                            className={cn(
                              "border-gold/20 hover:border-gold/50 flex items-center gap-4 border px-6 py-4 transition-all",
                              isChecked && "border-gold bg-gold/5",
                            )}
                          >
                            <Checkbox
                              id={`goal-${option.value}`}
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.pushValue(
                                    option.value as SuitabilityFormValues["goals"][number],
                                  );
                                } else {
                                  const index = selectedGoals.indexOf(
                                    option.value as SuitabilityFormValues["goals"][number],
                                  );
                                  if (index > -1) {
                                    field.removeValue(index);
                                  }
                                }
                              }}
                            />
                            <span className="font-medium">{option.label}</span>
                          </div>
                        </FieldLabel>
                      );
                    })}
                  </FieldGroup>
                  {isInvalid && field.state.meta.errors.length > 0 && (
                    <FieldError
                      errors={field.state.meta.errors.map((e) => ({
                        message: String(e),
                      }))}
                      className="text-center"
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            <ArrowLeftIcon className="size-4" />
            Back
          </Button>

          <form.Subscribe selector={(state) => state.values.goals.length > 0}>
            {(canProceed) => (
              <Button type="submit" disabled={!canProceed}>
                Next
                <ArrowRightIcon className="size-4" />
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}
