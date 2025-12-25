import { type Icon } from "@phosphor-icons/react";

interface NarrativeCardProps {
  number: "01" | "02" | "03";
  icon: Icon;
  title: string;
  description: string;
  scenarioText: string;
}

export function NarrativeCard({
  number,
  icon: Icon,
  title,
  description,
  scenarioText,
}: NarrativeCardProps) {
  return (
    <div className="group bg-card border-gold-dim hover:border-gold reveal relative overflow-hidden border p-12 transition-all duration-400 hover:-translate-y-2">
      <div className="bg-gold absolute top-0 left-0 h-0 w-1 transition-all duration-400 group-hover:h-full" />

      <div className="space-y-3">
        <p className="text-gold font-mono text-sm tracking-widest">{number}</p>
        <h3 className="font-serif text-2xl font-medium">{title}</h3>
        <p className="text-neutral-400">{description}</p>
      </div>

      <div className="bg-popover border-gold-dim relative mt-6 space-y-4 border-2 border-dashed p-6">
        <p className="font-mono text-xs tracking-widest text-neutral-600 uppercase">
          Common Scenario
        </p>
        <div className="border-gold bg-card absolute top-0 right-0 flex shrink-0 translate-x-[50%] -translate-y-[50%] items-center justify-center border p-2.5">
          <Icon className="text-gold" />
        </div>
        <p className="text-muted-foreground text-sm">“{scenarioText}”</p>
      </div>
    </div>
  );
}
