import { useForm } from "@tanstack/react-form";
import { useAtom } from "jotai";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
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
          <form.Field name="goals" mode="array">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const selectedGoals = field.state
                .value as SuitabilityFormValues["goals"];

              return (
                <FieldSet>
                  <FieldLegend className="heading-2 mb-2 text-center">
                    What is important to you?
                  </FieldLegend>
                  <FieldDescription className="mb-6 text-center">
                    Select all that apply
                  </FieldDescription>
                  <FieldGroup
                    data-slot="checkbox-group"
                    className="mx-auto grid max-w-lg gap-3"
                  >
                    {goalOptions.map((option) => {
                      const isChecked = selectedGoals.includes(
                        option.value as SuitabilityFormValues["goals"][number],
                      );

                      return (
                        <Field
                          key={option.value}
                          orientation="horizontal"
                          data-invalid={isInvalid}
                        >
                          <Checkbox
                            id={`goal-${option.value}`}
                            name={field.name}
                            aria-invalid={isInvalid}
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
                          <FieldLabel htmlFor={`goal-${option.value}`}>
                            {option.label}
                          </FieldLabel>
                        </Field>
                      );
                    })}
                  </FieldGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldSet>
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
