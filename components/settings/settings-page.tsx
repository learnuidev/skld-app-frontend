"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Crown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import { useAuth } from "@/components/auth-provider";
import Account from "@/components/settings/account";
import Preferences from "@/components/settings/preferences";
import { cn } from "@/lib/utils";

type Tab = "account" | "premium" | "preferences";

const TABS: Array<{ id: Tab; label: string }> = [
  { id: "account", label: "Account" },
  { id: "premium", label: "Premium" },
  { id: "preferences", label: "Preferences" },
];

function PremiumPanel() {
  return (
    <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-200">
        <Crown className="size-6 text-amber-900" />
      </div>
      <h2 className="mt-5 text-xl font-bold">Go Premium</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        Unlock every course, unlimited streaks, and audio lessons narrated aloud. One plan, every
        subject on peony.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button>Upgrade to Premium</Button>
        <Button variant="outline">Compare plans</Button>
      </div>
    </div>
  );
}

export default function SettingsPage({ initialTab }: { initialTab: Tab }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<Tab>(initialTab);

  const select = (next: Tab) => {
    setTab(next);
    router.replace(`/settings?tab=${next}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteNav className="lg:px-10" />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
        {user ? (
          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
            {/* Sidebar */}
            <nav className="h-fit rounded-2xl bg-white p-2 shadow-sm">
              {TABS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => select(item.id)}
                  className={cn(
                    "block w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors",
                    tab === item.id ? "bg-gray-100 text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Content */}
            <div className="min-w-0">
              {tab === "account" ? <Account /> : tab === "preferences" ? <Preferences /> : <PremiumPanel />}
            </div>
          </div>
        ) : loading ? (
          <div className="mx-auto max-w-md rounded-3xl border border-border bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-muted-foreground">Loading…</p>
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-3xl border border-border bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-bold">Log in to manage settings</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Click <span className="font-semibold">Login</span> in the header to get started.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
