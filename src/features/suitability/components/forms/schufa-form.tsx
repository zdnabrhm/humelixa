import { useForm } from "@tanstack/react-form";
import { useAtom } from "jotai";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { suitabilityAtom } from "../../store";
import { suitabilitySchema, type SuitabilityFormValues } from "../../schema";
import { yesNoOptions } from "../../types";
import { FormProgress } from "../form-progress";

const schufaSchema = suitabilitySchema.pick({ schufaEntries: true });

export default function SchufaForm() {
  const [formData, setFormData] = useAtom(suitabilityAtom);

  const form = useForm({
    defaultValues: {
      schufaEntries: (formData.schufaEntries ??
        "") as SuitabilityFormValues["schufaEntries"],
    },
    validators: {
      onSubmit: schufaSchema,
    },
    onSubmit: async ({ value }) => {
      setFormData({ ...formData, ...value });
      window.location.href = "/suitability-check/contact";
    },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <FormProgress currentStep={9} totalSteps={11} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="heading-2">
              Do you have any negative SCHUFA entries?
            </h2>
          </div>

          <form.Field name="schufaEntries">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <RadioGroup
                    value={field.state.value as string}
                    onValueChange={(v) =>
                      field.handleChange(
                        v as SuitabilityFormValues["schufaEntries"],
                      )
                    }
                    className="mx-auto grid max-w-md grid-cols-2 gap-4"
                  >
                    {yesNoOptions.map((option) => (
                      <FieldLabel
                        key={option.value}
                        htmlFor={`schufa-${option.value}`}
                        className="cursor-pointer"
                      >
                        <div
                          className={cn(
                            "border-gold/20 hover:border-gold/50 flex items-center justify-center gap-3 border p-6 transition-all",
                            field.state.value === option.value &&
                              "border-gold bg-gold/5",
                          )}
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`schufa-${option.value}`}
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

          <form.Subscribe selector={(state) => !!state.values.schufaEntries}>
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
