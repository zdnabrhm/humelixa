import { z } from "zod";

export const IntentValue = {
  TEST: "test",
  ADVICE: "advice",
} as const;

export const YesNoValue = {
  YES: "yes",
  NO: "no",
} as const;

export const TimelineValue = {
  ASAP: "asap",
  TWO_MONTHS: "2months",
  THREE_MONTHS: "3months",
  LATER: "later",
} as const;

export const GoalValue = {
  WEALTH: "wealth",
  RETIREMENT: "retirement",
  INCOME: "income",
  PROPERTY: "property",
  TAX: "tax",
} as const;

export const ResidenceValue = {
  GERMAN: "german",
  EU: "eu",
  UNLIMITED: "unlimited",
  TEMPORARY: "temporary",
} as const;

export const EmploymentValue = {
  EMPLOYED: "employed",
  SELF_EMPLOYED: "self-employed",
  UNEMPLOYED: "unemployed",
  RETIRED: "retired",
} as const;

export const EmploymentTypeValue = {
  PERMANENT: "permanent",
  PROBATION: "probation",
  TEMPORARY: "temporary",
} as const;

export const IncomeValue = {
  LOW: "2400-3000",
  MEDIUM: "3100-3500",
  HIGH: "3500+",
} as const;

export const InvestWithValue = {
  PARTNER: "partner",
  FAMILY: "family",
  OTHER: "other",
  ALONE: "alone",
} as const;

export const suitabilitySchema = z.object({
  intent: z.enum([IntentValue.TEST, IntentValue.ADVICE]),
  useEquity: z.enum([YesNoValue.YES, YesNoValue.NO]),
  timeline: z.enum([
    TimelineValue.ASAP,
    TimelineValue.TWO_MONTHS,
    TimelineValue.THREE_MONTHS,
    TimelineValue.LATER,
  ]),
  goals: z
    .array(
      z.enum([
        GoalValue.WEALTH,
        GoalValue.RETIREMENT,
        GoalValue.INCOME,
        GoalValue.PROPERTY,
        GoalValue.TAX,
      ]),
    )
    .min(1, "Please select at least one goal"),
  residenceStatus: z.enum([
    ResidenceValue.GERMAN,
    ResidenceValue.EU,
    ResidenceValue.UNLIMITED,
    ResidenceValue.TEMPORARY,
  ]),
  employmentStatus: z.enum([
    EmploymentValue.EMPLOYED,
    EmploymentValue.SELF_EMPLOYED,
    EmploymentValue.UNEMPLOYED,
    EmploymentValue.RETIRED,
  ]),
  employmentType: z
    .enum([
      EmploymentTypeValue.PERMANENT,
      EmploymentTypeValue.PROBATION,
      EmploymentTypeValue.TEMPORARY,
    ])
    .optional(),
  netIncome: z.enum([IncomeValue.LOW, IncomeValue.MEDIUM, IncomeValue.HIGH]),
  investWith: z.enum([
    InvestWithValue.PARTNER,
    InvestWithValue.FAMILY,
    InvestWithValue.OTHER,
    InvestWithValue.ALONE,
  ]),
  schufaEntries: z.enum([YesNoValue.YES, YesNoValue.NO]),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .min(6, "Please enter a valid phone number")
    .regex(/^\+?[0-9\s-]+$/, "Please enter a valid phone number"),
});

export type SuitabilityFormValues = z.infer<typeof suitabilitySchema>;
