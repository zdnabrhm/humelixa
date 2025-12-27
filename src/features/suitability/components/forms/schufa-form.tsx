import { useForm } from "@tanstack/react-form";
import { useAtom } from "jotai";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
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
        <form.Field name="schufaEntries">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <FieldSet>
                <FieldLegend className="heading-2 mb-6 text-center">
                  Do you have any negative SCHUFA entries?
                </FieldLegend>
                <RadioGroup
                  name={field.name}
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
                    >
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <RadioGroupItem
                          value={option.value}
                          id={`schufa-${option.value}`}
                          aria-invalid={isInvalid}
                        />
                        <FieldContent>
                          <FieldTitle>{option.label}</FieldTitle>
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
