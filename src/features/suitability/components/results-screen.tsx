import { Button } from "@/components/ui/button";
import { CheckCircleIcon, CalendarIcon } from "@phosphor-icons/react";
import type { SuitabilityFormValues } from "../schema";
import { goalOptions, timelineOptions, incomeOptions } from "../types";

interface ResultsScreenProps {
  values: SuitabilityFormValues;
  onBookConsultation: () => void;
}

export function ResultsScreen({
  values,
  onBookConsultation,
}: ResultsScreenProps) {
  const selectedGoals = goalOptions.filter((g) =>
    values.goals.includes(g.value as SuitabilityFormValues["goals"][number]),
  );
  const selectedTimeline = timelineOptions.find(
    (t) => t.value === values.timeline,
  );
  const selectedIncome = incomeOptions.find(
    (i) => i.value === values.netIncome,
  );

  return (
    <div className="space-y-12 text-center">
      <div className="space-y-6">
        <div className="bg-gold/10 border-gold mx-auto flex size-20 items-center justify-center rounded-full border">
          <CheckCircleIcon className="text-gold size-10" weight="fill" />
        </div>

        <div>
          <h2 className="heading-2">
            Great news, {values.name.split(" ")[0]}!
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Based on your answers, you appear to be a strong candidate for our
            real estate investment program.
          </p>
        </div>
      </div>

      <div className="border-gold/20 mx-auto max-w-lg border p-8">
        <h3 className="text-gold mb-6 font-mono text-sm tracking-widest uppercase">
          Your Profile Summary
        </h3>

        <div className="space-y-4 text-left">
          <div className="border-gold/10 border-b pb-4">
            <p className="text-muted-foreground text-xs tracking-wide uppercase">
              Investment Goals
            </p>
            <p className="mt-1 font-medium">
              {selectedGoals.map((g) => g.label).join(", ")}
            </p>
          </div>

          <div className="border-gold/10 border-b pb-4">
            <p className="text-muted-foreground text-xs tracking-wide uppercase">
              Timeline
            </p>
            <p className="mt-1 font-medium">{selectedTimeline?.label}</p>
          </div>

          <div className="border-gold/10 border-b pb-4">
            <p className="text-muted-foreground text-xs tracking-wide uppercase">
              Monthly Net Income
            </p>
            <p className="mt-1 font-medium">{selectedIncome?.label}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs tracking-wide uppercase">
              Using Equity
            </p>
            <p className="mt-1 font-medium capitalize">{values.useEquity}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-medium">What's Next?</h3>
          <p className="text-muted-foreground mt-2">
            Book a free consultation with our experts to discuss your
            personalized investment strategy.
          </p>
        </div>

        <Button size="lg" onClick={onBookConsultation} className="gap-2">
          <CalendarIcon className="size-5" />
          Book Free Consultation
        </Button>

        <p className="text-muted-foreground text-sm">
          We've sent a confirmation email to{" "}
          <span className="text-foreground">{values.email}</span>
        </p>
      </div>
    </div>
  );
}
