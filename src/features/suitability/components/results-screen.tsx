import {
  CheckCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
} from "@phosphor-icons/react";
import type { SuitabilityFormValues } from "../schema";

interface ResultsScreenProps {
  values: SuitabilityFormValues;
}

export function ResultsScreen({ values }: ResultsScreenProps) {
  const firstName = values.name.split(" ")[0];

  return (
    <div className="space-y-12 text-center">
      <div className="space-y-6">
        <div className="bg-gold/10 border-gold mx-auto flex size-20 items-center justify-center rounded-full border">
          <CheckCircleIcon className="text-gold size-10" weight="fill" />
        </div>

        <div>
          <h2 className="heading-2">Thank you, {firstName}!</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            We've received your information and will be in touch soon.
          </p>
        </div>
      </div>

      <div className="border-gold/20 mx-auto max-w-lg border p-8">
        <h3 className="text-gold mb-6 font-mono text-sm tracking-widest uppercase">
          What happens next?
        </h3>

        <div className="space-y-6 text-left">
          <div className="flex gap-4">
            <div className="bg-gold/10 flex size-10 shrink-0 items-center justify-center rounded-full">
              <EnvelopeIcon className="text-gold size-5" />
            </div>
            <div>
              <p className="font-medium">Check your inbox</p>
              <p className="text-muted-foreground text-sm">
                We'll send a confirmation to {values.email}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-gold/10 flex size-10 shrink-0 items-center justify-center rounded-full">
              <PhoneIcon className="text-gold size-5" />
            </div>
            <div>
              <p className="font-medium">Expect a call</p>
              <p className="text-muted-foreground text-sm">
                Our team will reach out within 1-2 business days
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-gold/10 flex size-10 shrink-0 items-center justify-center rounded-full">
              <CalendarIcon className="text-gold size-5" />
            </div>
            <div>
              <p className="font-medium">Free consultation</p>
              <p className="text-muted-foreground text-sm">
                We'll discuss your goals and answer any questions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-muted-foreground text-sm">
        <p>
          Questions? Email us at{" "}
          <a href="mailto:hello@humelixa.com" className="text-gold underline">
            hello@humelixa.com
          </a>
        </p>
      </div>
    </div>
  );
}
