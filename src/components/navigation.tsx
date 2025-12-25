import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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

  const scrollToSection = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="from-background/95 fixed top-0 z-1000 w-full bg-linear-to-b to-transparent backdrop-blur-sm">
      <nav
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-6 transition-transform duration-300",
          hidden && "-translate-y-full",
          className,
        )}
      >
        <a
          href="/"
          className="font-serif text-2xl font-medium tracking-[0.05em] text-neutral-50 no-underline"
        >
          Humelixa<span className="text-gold">.</span>
        </a>
        <button
          onClick={() => scrollToSection("#consultation")}
          className={cn(
            "magnetic border-gold text-gold cursor-pointer border bg-transparent px-6 py-3 font-mono text-xs tracking-widest uppercase",
            "transition-all duration-300",
            "hover:bg-gold hover:text-background",
          )}
        >
          Book Consultation
        </button>
      </nav>
    </header>
  );
}
