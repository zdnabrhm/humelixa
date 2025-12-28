import { useForm } from "@tanstack/react-form";
import { useAtom } from "jotai";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { suitabilityAtom } from "../../store";
import { suitabilitySchema } from "../../schema";
import { FormProgress } from "../form-progress";

const contactSchema = suitabilitySchema.pick({
  name: true,
  email: true,
  phone: true,
});

export default function ContactForm() {
  const [formData, setFormData] = useAtom(suitabilityAtom);

  const form = useForm({
    defaultValues: {
      name: (formData.name ?? "") as string,
      email: (formData.email ?? "") as string,
      phone: (formData.phone ?? "") as string,
    },
    validators: {
      onSubmit: contactSchema,
    },
    onSubmit: async ({ value }) => {
      // Final step: don't store in atom, just navigate to results
      // The results page will read from the atom + console.log
      setFormData({ ...formData, ...value });
      window.location.href = "/suitability-check/results";
    },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <FormProgress currentStep={10} totalSteps={11} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="heading-2">Almost there!</h2>
            <p className="text-muted-foreground mt-4">
              Enter your contact details to receive your personalized results.
            </p>
          </div>

          <FieldGroup className="mx-auto max-w-md">
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      name={field.name}
                      value={field.state.value as string}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="John Doe"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && field.state.meta.errors.length > 0 && (
                      <FieldError
                        errors={field.state.meta.errors.map((e) => ({
                          message: String(e),
                        }))}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <Input
                      id="email"
                      name={field.name}
                      type="email"
                      value={field.state.value as string}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="john@mail.com"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && field.state.meta.errors.length > 0 && (
                      <FieldError
                        errors={field.state.meta.errors.map((e) => ({
                          message: String(e),
                        }))}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="phone">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input
                      id="phone"
                      name={field.name}
                      type="tel"
                      value={field.state.value as string}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="+491234567890"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && field.state.meta.errors.length > 0 && (
                      <FieldError
                        errors={field.state.meta.errors.map((e) => ({
                          message: String(e),
                        }))}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <FieldDescription className="text-center">
              Why do we ask this question? So we can send you a free &
              non-binding offer.
            </FieldDescription>
          </FieldGroup>
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

          <form.Subscribe
            selector={(state) =>
              !!(state.values.name && state.values.email && state.values.phone)
            }
          >
            {(canProceed) => (
              <Button type="submit" disabled={!canProceed}>
                Submit
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}
