import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CalButton } from "./cal-button";
import logo from "@/assets/logo.svg";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="from-background/95 fixed top-0 z-1000 w-full bg-linear-to-b to-transparent backdrop-blur-sm">
      <nav
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between p-5 transition-transform duration-300 md:px-8 md:py-6",
          hidden && "-translate-y-full",
          className,
        )}
      >
        <a
          href="/"
          className="flex items-center gap-0.5 font-serif text-xl font-medium no-underline md:text-2xl"
        >
          <img src={logo.src} alt="" className="size-6" />
          <span>
            Humelixa<span className="text-gold">.</span>
          </span>
        </a>

        <CalButton variant="outline">Book Consultation</CalButton>
      </nav>
    </header>
  );
}
