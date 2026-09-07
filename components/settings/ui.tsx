"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-emerald-500" : "bg-muted",
      )}
    >
      <span
        className={cn(
          "inline-block size-4 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

export function Segmented({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="inline-flex rounded-full bg-muted p-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
            value === option
              ? "bg-white text-foreground shadow-sm dark:bg-white/15"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function RowsList({ children }: { children: ReactNode }) {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-card">
      {children}
    </div>
  );
}

export function SettingRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-bold tracking-tight">{children}</h2>;
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="mt-6 text-sm font-bold text-foreground">{children}</h3>;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange?: (next: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      readOnly={!onChange}
      className={cn(
        "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground",
        className,
      )}
    />
  );
}

export function InfoBox({
  icon,
  children,
  tone = "blue",
}: {
  icon?: ReactNode;
  children: ReactNode;
  tone?: "blue" | "gray";
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-4 text-sm leading-relaxed",
        tone === "blue" ? "border-blue-200 bg-blue-50 text-blue-900" : "border-border bg-muted text-muted-foreground",
      )}
    >
      {icon ? <span className="mt-0.5 shrink-0 text-current">{icon}</span> : null}
      <div>{children}</div>
    </div>
  );
}

export function Badge({ children, tone }: { children: ReactNode; tone?: "green" | "blue" }) {
  return (
    <span
      className={cn(
        "rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
        tone === "green" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700",
      )}
    >
      {children}
    </span>
  );
}
