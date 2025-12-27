import { useForm } from "@tanstack/react-form";
import { useAtom } from "jotai";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { suitabilityAtom } from "../../store";
import { suitabilitySchema, type SuitabilityFormValues } from "../../schema";
import { residenceOptions } from "../../types";
import { FormProgress } from "../form-progress";

const residenceSchema = suitabilitySchema.pick({ residenceStatus: true });

export default function ResidenceForm() {
  const [formData, setFormData] = useAtom(suitabilityAtom);

  const form = useForm({
    defaultValues: {
      residenceStatus: (formData.residenceStatus ??
        "") as SuitabilityFormValues["residenceStatus"],
    },
    validators: {
      onSubmit: residenceSchema,
    },
    onSubmit: async ({ value }) => {
      setFormData({ ...formData, ...value });
      window.location.href = "/suitability-check/employment";
    },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <FormProgress currentStep={4} totalSteps={11} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="heading-2">What is your residence status?</h2>
          </div>

          <form.Field name="residenceStatus">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <RadioGroup
                    value={field.state.value as string}
                    onValueChange={(v) =>
                      field.handleChange(
                        v as SuitabilityFormValues["residenceStatus"],
                      )
                    }
                    className="mx-auto grid max-w-lg gap-3 md:grid-cols-2"
                  >
                    {residenceOptions.map((option) => (
                      <FieldLabel
                        key={option.value}
                        htmlFor={`residence-${option.value}`}
                        className="cursor-pointer"
                      >
                        <div
                          className={cn(
                            "border-gold/20 hover:border-gold/50 flex items-center gap-4 border px-6 py-4 transition-all",
                            field.state.value === option.value &&
                              "border-gold bg-gold/5",
                          )}
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`residence-${option.value}`}
                          />
                          <span className="font-medium">{option.label}</span>
                        </div>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
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

          <form.Subscribe selector={(state) => !!state.values.residenceStatus}>
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
