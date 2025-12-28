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
import type { SuitabilityFormValues } from "../../schema";
import { yesNoOptions } from "../../types";

interface SchufaStepProps {
  values: Partial<SuitabilityFormValues>;
  onChange: (values: Partial<SuitabilityFormValues>) => void;
  errors?: Record<string, string>;
}

export function SchufaStep({ values, onChange, errors }: SchufaStepProps) {
  return (
    <FieldSet>
      <FieldLegend className="heading-2 mb-2 text-center">
        Do you have any negative SCHUFA entries?
      </FieldLegend>
      <FieldDescription className="mb-6 text-center">
        SCHUFA is the German credit bureau that tracks your credit history
      </FieldDescription>
      <RadioGroup
        value={values.schufaEntries ?? ""}
        onValueChange={(v) =>
          onChange({
            ...values,
            schufaEntries: v as SuitabilityFormValues["schufaEntries"],
          })
        }
        className="mx-auto grid max-w-md grid-cols-2 gap-4"
      >
        {yesNoOptions.map((option) => (
          <FieldLabel key={option.value} htmlFor={`schufa-${option.value}`}>
            <Field
              orientation="horizontal"
              data-invalid={!!errors?.schufaEntries}
            >
              <RadioGroupItem
                value={option.value}
                id={`schufa-${option.value}`}
              />
              <FieldContent>
                <FieldTitle>{option.label}</FieldTitle>
              </FieldContent>
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
      {errors?.schufaEntries && (
        <FieldError errors={[{ message: errors.schufaEntries }]} />
      )}
    </FieldSet>
  );
}
