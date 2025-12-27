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
        <form.Field name="residenceStatus">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <FieldSet>
                <FieldLegend className="heading-2 mb-6 text-center">
                  What is your residence status?
                </FieldLegend>
                <RadioGroup
                  name={field.name}
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
                    >
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <RadioGroupItem
                          value={option.value}
                          id={`residence-${option.value}`}
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
