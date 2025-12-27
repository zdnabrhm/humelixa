import { useForm } from "@tanstack/react-form";
import { useAtom } from "jotai";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { suitabilityAtom } from "../../store";
import { suitabilitySchema, type SuitabilityFormValues } from "../../schema";
import { intentOptions } from "../../types";
import { FormProgress } from "../form-progress";

const intentSchema = suitabilitySchema.pick({ intent: true });

export default function IntentForm() {
  const [formData, setFormData] = useAtom(suitabilityAtom);

  const form = useForm({
    defaultValues: {
      intent: (formData.intent ?? "") as SuitabilityFormValues["intent"],
    },
    validators: {
      onSubmit: intentSchema,
    },
    onSubmit: async ({ value }) => {
      setFormData({ ...formData, ...value });
      window.location.href = "/suitability-check/equity";
    },
  });

  return (
    <div className="form-container">
      <FormProgress currentStep={0} totalSteps={11} />

      <div className="space-y-4 text-center">
        <h2 className="heading-2">
          Become a real estate landlord without equity
        </h2>
        <p className="text-lg text-neutral-400">
          The free property check. Find out in less than 2 minutes, if you are
          suitable for our concept.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="intent">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <FieldSet>
                <FieldLegend className="sr-only">
                  Select your investment intent
                </FieldLegend>
                <RadioGroup
                  name={field.name}
                  value={field.state.value as string}
                  onValueChange={(v) =>
                    field.handleChange(v as SuitabilityFormValues["intent"])
                  }
                  className="grid gap-4 md:grid-cols-2"
                >
                  {intentOptions.map((option) => (
                    <FieldLabel
                      key={option.value}
                      htmlFor={`intent-${option.value}`}
                    >
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <RadioGroupItem
                          value={option.value}
                          id={`intent-${option.value}`}
                          aria-invalid={isInvalid}
                        />
                        <FieldContent>
                          <FieldTitle>{option.label}</FieldTitle>
                          {option.description && (
                            <FieldDescription>
                              {option.description}
                            </FieldDescription>
                          )}
                        </FieldContent>
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </FieldSet>
            );
          }}
        </form.Field>

        <div className="mt-8 flex justify-end">
          <form.Subscribe selector={(state) => !!state.values.intent}>
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
