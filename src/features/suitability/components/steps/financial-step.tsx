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
import type { SuitabilityFormValues } from "../../schema";
import { yesNoOptions, incomeOptions, investWithOptions } from "../../types";

interface FinancialStepProps {
  values: Partial<SuitabilityFormValues>;
  onChange: (values: Partial<SuitabilityFormValues>) => void;
  errors?: Record<string, string>;
}

export function FinancialStep({
  values,
  onChange,
  errors,
}: FinancialStepProps) {
  return (
    <div className="space-y-8">
      <FieldSet>
        <FieldLegend className="heading-2 mb-6 text-center">
          Do you want to use equity for your investment?
        </FieldLegend>
        <RadioGroup
          value={values.useEquity ?? ""}
          onValueChange={(v) =>
            onChange({
              ...values,
              useEquity: v as SuitabilityFormValues["useEquity"],
            })
          }
          className="mx-auto grid max-w-md grid-cols-2 gap-4"
        >
          {yesNoOptions.map((option) => (
            <FieldLabel key={option.value} htmlFor={`equity-${option.value}`}>
              <Field
                orientation="horizontal"
                data-invalid={!!errors?.useEquity}
              >
                <RadioGroupItem
                  value={option.value}
                  id={`equity-${option.value}`}
                />
                <FieldContent>
                  <FieldTitle>{option.label}</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
        {errors?.useEquity && (
          <FieldError errors={[{ message: errors.useEquity }]} />
        )}
      </FieldSet>

      <FieldSet>
        <FieldLegend className="heading-2 mb-6 text-center">
          What is your monthly net income?
        </FieldLegend>
        <RadioGroup
          value={values.netIncome ?? ""}
          onValueChange={(v) =>
            onChange({
              ...values,
              netIncome: v as SuitabilityFormValues["netIncome"],
            })
          }
          className="mx-auto grid max-w-lg gap-3"
        >
          {incomeOptions.map((option) => (
            <FieldLabel key={option.value} htmlFor={`income-${option.value}`}>
              <Field
                orientation="horizontal"
                data-invalid={!!errors?.netIncome}
              >
                <RadioGroupItem
                  value={option.value}
                  id={`income-${option.value}`}
                />
                <FieldContent>
                  <FieldTitle>{option.label}</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
        {errors?.netIncome && (
          <FieldError errors={[{ message: errors.netIncome }]} />
        )}
      </FieldSet>

      <FieldSet>
        <FieldLegend className="heading-2 mb-6 text-center">
          Who do you want to invest with?
        </FieldLegend>
        <RadioGroup
          value={values.investWith ?? ""}
          onValueChange={(v) =>
            onChange({
              ...values,
              investWith: v as SuitabilityFormValues["investWith"],
            })
          }
          className="mx-auto grid max-w-lg gap-3 md:grid-cols-2"
        >
          {investWithOptions.map((option) => (
            <FieldLabel
              key={option.value}
              htmlFor={`invest-with-${option.value}`}
            >
              <Field
                orientation="horizontal"
                data-invalid={!!errors?.investWith}
              >
                <RadioGroupItem
                  value={option.value}
                  id={`invest-with-${option.value}`}
                />
                <FieldContent>
                  <FieldTitle>{option.label}</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
        {errors?.investWith && (
          <FieldError errors={[{ message: errors.investWith }]} />
        )}
      </FieldSet>
    </div>
  );
}
