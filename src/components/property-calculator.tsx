"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface PropertyCalculatorProps {
  className?: string;
}

export default function PropertyCalculator({
  className,
}: PropertyCalculatorProps) {
  const [budget, setBudget] = useState(350000);
  const [income, setIncome] = useState(1800);
  const [timeline, setTimeline] = useState(5);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  const calculateYield = useCallback(() => {
    const annualIncome = income * 12;
    const yieldPercentage = ((annualIncome / budget) * 100).toFixed(1);
    const yieldNum = parseFloat(yieldPercentage);

    if (yieldNum > 6) return "5.5+";
    if (yieldNum < 3) return "3.2+";
    return yieldPercentage;
  }, [budget, income]);

  return (
    <div className={cn("reveal relative mt-16", className)}>
      <div className="bg-card border-gold-dim mx-auto max-w-xl border p-8">
        <div className="border-gold-dim mb-8 flex items-center justify-between border-b pb-4">
          <h4 className="text-gold font-mono text-[0.7rem] tracking-[0.2em] uppercase">
            Property Intelligence Calculator
          </h4>
          <span className="text-gold font-mono text-[0.6rem]">
            LIVE PREVIEW
          </span>
        </div>

        <div className="space-y-6">
          {/* Budget Slider */}
          <div className="space-y-2">
            <label className="text-muted-foreground flex justify-between font-mono text-[0.7rem]">
              <span>Investment Budget</span>
              <span>{formatCurrency(budget)}</span>
            </label>
            <input
              type="range"
              min="150000"
              max="1000000"
              step="50000"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="bg-gold-dim [&::-webkit-slider-thumb]:bg-gold h-0.5 w-full cursor-pointer appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
            />
          </div>

          {/* Income Slider */}
          <div className="space-y-2">
            <label className="text-muted-foreground flex justify-between font-mono text-[0.7rem]">
              <span>Target Monthly Income</span>
              <span>{formatCurrency(income)}</span>
            </label>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={income}
              onChange={(e) => setIncome(parseInt(e.target.value))}
              className="bg-gold-dim [&::-webkit-slider-thumb]:bg-gold h-0.5 w-full cursor-pointer appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
            />
          </div>

          {/* Timeline Slider */}
          <div className="space-y-2">
            <label className="text-muted-foreground flex justify-between font-mono text-[0.7rem]">
              <span>Investment Timeline</span>
              <span>{timeline} Years</span>
            </label>
            <input
              type="range"
              min="3"
              max="20"
              step="1"
              value={timeline}
              onChange={(e) => setTimeline(parseInt(e.target.value))}
              className="bg-gold-dim [&::-webkit-slider-thumb]:bg-gold h-0.5 w-full cursor-pointer appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
            />
          </div>
        </div>

        {/* Result */}
        <div className="bg-gold/5 border-gold mt-8 border-l-2 p-6">
          <div className="text-subtle mb-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase">
            Estimated Rental Yield
          </div>
          <div className="text-gold font-serif text-4xl">
            {calculateYield()}%
          </div>
          <p className="text-muted-foreground mt-2 text-sm">
            Based on your criteria, we've identified 3 properties matching your
            profile in Munich and Frankfurt.
          </p>
        </div>
      </div>
    </div>
  );
}
