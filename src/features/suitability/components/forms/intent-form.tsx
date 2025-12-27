import { useForm } from "@tanstack/react-form";
import { useAtom } from "jotai";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
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
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <FormProgress currentStep={0} totalSteps={11} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="heading-2">
              Become a real estate landlord without equity
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              The free property check. Find out in less than 2 minutes, if you
              are suitable for our concept.
            </p>
          </div>

          <form.Field name="intent">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <RadioGroup
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
                        className="cursor-pointer"
                      >
                        <div
                          className={cn(
                            "border-gold/20 hover:border-gold/50 flex items-start gap-4 border p-6 transition-all",
                            field.state.value === option.value &&
                              "border-gold bg-gold/5",
                          )}
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`intent-${option.value}`}
                          />
                          <div className="flex-1">
                            <span className="block font-medium">
                              {option.label}
                            </span>
                            {option.description && (
                              <FieldDescription className="mt-1">
                                {option.description}
                              </FieldDescription>
                            )}
                          </div>
                        </div>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                  {isInvalid && field.state.meta.errors.length > 0 && (
                    <FieldError
                      errors={field.state.meta.errors.map((e) => ({
                        message: String(e),
                      }))}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>
        </div>

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
