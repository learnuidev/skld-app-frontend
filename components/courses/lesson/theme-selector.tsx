"use client";

import { useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const OPTIONS = ["Auto", "Light", "Dark"] as const;

/** Light/dark/system switcher that rides the lesson navbar. */
export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const mode = theme === "dark" ? "Dark" : theme === "light" ? "Light" : "Auto";
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  const choose = (option: (typeof OPTIONS)[number]) => {
    setTheme(option === "Dark" ? "dark" : option === "Light" ? "light" : "system");
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Theme"
        className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-lesson-soft hover:text-foreground"
      >
        <Icon className="size-5" />
      </button>

      {open ? (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-40 mt-2 w-36 rounded-2xl border border-lesson-line bg-card p-1.5 shadow-xl">
            {OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => choose(option)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors",
                  mode === option
                    ? "bg-lesson-soft text-foreground"
                    : "text-muted-foreground hover:bg-lesson-soft hover:text-foreground",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
