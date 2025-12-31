import {
  YesNoValue,
  TimelineValue,
  GoalValue,
  ResidenceValue,
  EmploymentValue,
  EmploymentTypeValue,
  IncomeValue,
  InvestWithValue,
} from "./schema";

export interface FormOption {
  value: string;
  label: string;
  description?: string;
}

export const yesNoOptions: FormOption[] = [
  { value: YesNoValue.YES, label: "Yes" },
  { value: YesNoValue.NO, label: "No" },
];

export const timelineOptions: FormOption[] = [
  { value: TimelineValue.ASAP, label: "As soon as possible" },
  { value: TimelineValue.TWO_MONTHS, label: "Within 2 months" },
  { value: TimelineValue.THREE_MONTHS, label: "Within 3 months" },
  { value: TimelineValue.LATER, label: "Later than 3 months" },
];

export const goalOptions: FormOption[] = [
  { value: GoalValue.WEALTH, label: "Build wealth" },
  { value: GoalValue.RETIREMENT, label: "Financial security for retirement" },
  { value: GoalValue.INCOME, label: "Additional monthly income" },
  { value: GoalValue.PROPERTY, label: "Own property nearby" },
  { value: GoalValue.TAX, label: "Reduce tax burden" },
];

export const residenceOptions: FormOption[] = [
  { value: ResidenceValue.GERMAN, label: "German citizen" },
  { value: ResidenceValue.EU, label: "EU citizen" },
  { value: ResidenceValue.UNLIMITED, label: "Unlimited EU residence permit" },
  { value: ResidenceValue.TEMPORARY, label: "Temporary residence permit" },
];

export const employmentOptions: FormOption[] = [
  { value: EmploymentValue.EMPLOYED, label: "Employed" },
  { value: EmploymentValue.SELF_EMPLOYED, label: "Self-Employed" },
  { value: EmploymentValue.UNEMPLOYED, label: "Unemployed" },
  { value: EmploymentValue.RETIRED, label: "Retired" },
];

export const employmentTypeOptions: FormOption[] = [
  { value: EmploymentTypeValue.PERMANENT, label: "Permanent" },
  {
    value: EmploymentTypeValue.PROBATION,
    label: "Permanent in probation period",
  },
  { value: EmploymentTypeValue.TEMPORARY, label: "Temporary" },
];

export const incomeOptions: FormOption[] = [
  { value: IncomeValue.LOW, label: "2,400 - 3,000 €" },
  { value: IncomeValue.MEDIUM, label: "3,100 - 3,500 €" },
  { value: IncomeValue.HIGH, label: "More than 3,500 €" },
];

export const investWithOptions: FormOption[] = [
  { value: InvestWithValue.PARTNER, label: "Life partner" },
  { value: InvestWithValue.FAMILY, label: "Family member" },
  { value: InvestWithValue.OTHER, label: "Someone else" },
  { value: InvestWithValue.ALONE, label: "Alone" },
];
