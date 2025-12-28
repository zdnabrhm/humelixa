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
import { EmploymentValue, type SuitabilityFormValues } from "../../schema";
import {
  residenceOptions,
  employmentOptions,
  employmentTypeOptions,
} from "../../types";

interface SituationStepProps {
  values: Partial<SuitabilityFormValues>;
  onChange: (values: Partial<SuitabilityFormValues>) => void;
  errors?: Record<string, string>;
}

export function SituationStep({
  values,
  onChange,
  errors,
}: SituationStepProps) {
  const showEmploymentType =
    values.employmentStatus === EmploymentValue.EMPLOYED;

  return (
    <div className="space-y-8">
      <FieldSet>
        <FieldLegend className="heading-2 mb-6 text-center">
          What is your residence status?
        </FieldLegend>
        <RadioGroup
          value={values.residenceStatus ?? ""}
          onValueChange={(v) =>
            onChange({
              ...values,
              residenceStatus: v as SuitabilityFormValues["residenceStatus"],
            })
          }
          className="mx-auto grid max-w-lg gap-3 md:grid-cols-2"
        >
          {residenceOptions.map((option) => (
            <FieldLabel
              key={option.value}
              htmlFor={`residence-${option.value}`}
            >
              <Field
                orientation="horizontal"
                data-invalid={!!errors?.residenceStatus}
              >
                <RadioGroupItem
                  value={option.value}
                  id={`residence-${option.value}`}
                />
                <FieldContent>
                  <FieldTitle>{option.label}</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
        {errors?.residenceStatus && (
          <FieldError errors={[{ message: errors.residenceStatus }]} />
        )}
      </FieldSet>

      <FieldSet>
        <FieldLegend className="heading-2 mb-6 text-center">
          What is your employment status?
        </FieldLegend>
        <RadioGroup
          value={values.employmentStatus ?? ""}
          onValueChange={(v) => {
            const newValues: Partial<SuitabilityFormValues> = {
              ...values,
              employmentStatus: v as SuitabilityFormValues["employmentStatus"],
            };
            if (v !== EmploymentValue.EMPLOYED) {
              newValues.employmentType = undefined;
            }
            onChange(newValues);
          }}
          className="mx-auto grid max-w-lg gap-3 md:grid-cols-2"
        >
          {employmentOptions.map((option) => (
            <FieldLabel
              key={option.value}
              htmlFor={`employment-${option.value}`}
            >
              <Field
                orientation="horizontal"
                data-invalid={!!errors?.employmentStatus}
              >
                <RadioGroupItem
                  value={option.value}
                  id={`employment-${option.value}`}
                />
                <FieldContent>
                  <FieldTitle>{option.label}</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
        {errors?.employmentStatus && (
          <FieldError errors={[{ message: errors.employmentStatus }]} />
        )}
      </FieldSet>

      {showEmploymentType && (
        <FieldSet>
          <FieldLegend className="heading-2 mb-6 text-center">
            What type of employment contract do you have?
          </FieldLegend>
          <RadioGroup
            value={values.employmentType ?? ""}
            onValueChange={(v) =>
              onChange({
                ...values,
                employmentType: v as SuitabilityFormValues["employmentType"],
              })
            }
            className="mx-auto grid max-w-lg gap-3"
          >
            {employmentTypeOptions.map((option) => (
              <FieldLabel
                key={option.value}
                htmlFor={`employment-type-${option.value}`}
              >
                <Field
                  orientation="horizontal"
                  data-invalid={!!errors?.employmentType}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`employment-type-${option.value}`}
                  />
                  <FieldContent>
                    <FieldTitle>{option.label}</FieldTitle>
                  </FieldContent>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
          {errors?.employmentType && (
            <FieldError errors={[{ message: errors.employmentType }]} />
          )}
        </FieldSet>
      )}
    </div>
  );
}
