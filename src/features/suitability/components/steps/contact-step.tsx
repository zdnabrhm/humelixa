import { Turnstile } from "@marsidev/react-turnstile";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import type { SuitabilityFormValues } from "../../schema";

interface ContactStepProps {
  values: Partial<SuitabilityFormValues>;
  onChange: (values: Partial<SuitabilityFormValues>) => void;
  errors?: Record<string, string>;
}

export function ContactStep({ values, onChange, errors }: ContactStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="heading-2">Almost there!</h2>
        <p className="text-muted-foreground mt-4">
          Enter your contact details so we can reach you with your personalized
          consultation.
        </p>
      </div>

      <FieldGroup className="mx-auto max-w-md">
        <Field data-invalid={!!errors?.name}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            value={values.name ?? ""}
            onChange={(e) => onChange({ ...values, name: e.target.value })}
            placeholder="John Doe"
          />
          {errors?.name && <FieldError errors={[{ message: errors.name }]} />}
        </Field>

        <Field data-invalid={!!errors?.email}>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            id="email"
            type="email"
            value={values.email ?? ""}
            onChange={(e) => onChange({ ...values, email: e.target.value })}
            placeholder="john@mail.com"
          />
          {errors?.email && <FieldError errors={[{ message: errors.email }]} />}
        </Field>

        <Field data-invalid={!!errors?.phone}>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input
            id="phone"
            type="tel"
            value={values.phone ?? ""}
            onChange={(e) => onChange({ ...values, phone: e.target.value })}
            placeholder="+491234567890"
          />
          {errors?.phone && <FieldError errors={[{ message: errors.phone }]} />}
        </Field>

        <Field data-invalid={!!errors?.turnstileToken}>
          <Turnstile
            siteKey={import.meta.env.PUBLIC_TURNSTILE_SITE_KEY}
            onSuccess={(token) =>
              onChange({ ...values, turnstileToken: token })
            }
          />
          {errors?.turnstileToken && (
            <FieldError errors={[{ message: errors.turnstileToken }]} />
          )}
        </Field>

        <FieldDescription className="text-center text-balance">
          We'll use this to send you a free & non-binding consultation offer.
        </FieldDescription>
      </FieldGroup>
    </div>
  );
}
