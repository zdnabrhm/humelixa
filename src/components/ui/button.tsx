import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium font-mono uppercase tracking-widest cursor-pointer select-none outline-none transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 shrink-0 group/button",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-background border-none hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_10px_30px_oklch(0.76_0.12_85/20%)] focus-visible:ring-2 focus-visible:ring-gold/50",
        outline:
          "border border-gold bg-transparent text-foreground hover:border-gold hover:text-gold focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/30",
        secondary:
          "bg-gold/10 text-gold border border-transparent hover:bg-gold/20 focus-visible:ring-1 focus-visible:ring-gold/30",
        ghost:
          "bg-transparent text-foreground border-none hover:text-gold focus-visible:text-gold",
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 hover:border-destructive/40 focus-visible:ring-1 focus-visible:ring-destructive/30",
        link: "bg-transparent text-gold border-none underline-offset-4 hover:underline normal-case tracking-normal",
      },
      size: {
        default: "h-9 md:h-10 gap-2 px-4 md:px-6 text-xs",
        xs: "h-6 md:h-7 gap-1 px-2 md:px-3 text-[0.6rem] md:text-[0.65rem] [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 md:h-8 gap-1.5 px-3 md:px-4 text-[0.65rem] md:text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 md:h-12 gap-2 px-6 md:px-10 text-xs md:text-sm",
        icon: "size-9 md:size-10",
        "icon-xs": "size-6 md:size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 md:size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-10 md:size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
