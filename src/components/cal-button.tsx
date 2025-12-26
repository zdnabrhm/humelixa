import { getCalApi } from "@calcom/embed-react";
import { Button, buttonVariants } from "./ui/button";
import type { VariantProps } from "class-variance-authority";
import type { Button as ButtonPrimitive } from "@base-ui/react/button";

type CalButtonProps = Omit<ButtonPrimitive.Props, "onClick"> &
  VariantProps<typeof buttonVariants>;

export function CalButton({
  children,
  className,
  variant,
  size,
  ...props
}: CalButtonProps) {
  const handleClick = async () => {
    const cal = await getCalApi();
    cal("ui", {
      theme: "dark",
      styles: { branding: { brandColor: "#C9A227" } },
    });
    cal("modal", { calLink: "zidan-abraham/30min" });
  };

  return (
    <Button
      onClick={handleClick}
      className={className}
      variant={variant}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
}
