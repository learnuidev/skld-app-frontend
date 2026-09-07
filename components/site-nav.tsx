"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, HelpCircle, Info, LogOut, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth-provider";

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? "bg-black text-white"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

function MenuItem({
  icon,
  children,
  onClick,
  danger,
}: {
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors",
        danger ? "text-red-600 hover:bg-red-50" : "text-foreground hover:bg-muted",
      )}
    >
      {icon ? <span className="text-muted-foreground">{icon}</span> : null}
      {children}
    </button>
  );
}

export function SiteNav({ className }: { className?: string }) {
  const router = useRouter();
  const { user, loading, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const goSettings = () => {
    setMenuOpen(false);
    router.push("/settings");
  };

  const handleLogin = () => {
    login();
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className={cn("sticky top-0 z-40 border-b border-border/60 bg-white/90 backdrop-blur", className)}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="shrink-0 text-2xl font-bold tracking-tight">
          peony
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/courses">Courses</NavLink>
          <NavLink href="/you">You</NavLink>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {loading ? (
            <>
              <span className="hidden h-8 w-24 rounded-full bg-muted sm:inline-block" aria-hidden />
              <span className="size-9 animate-pulse rounded-full bg-muted" aria-hidden />
            </>
          ) : !user ? (
            <button
              type="button"
              onClick={handleLogin}
              className="rounded-full bg-black px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-black/80"
            >
              Login
            </button>
          ) : (
            <>
              <Button
                variant="outline"
                className="hidden h-10 rounded-full px-4 sm:inline-flex"
              >
                Go Pro
              </Button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  className="flex h-10 items-center gap-1 rounded-full border border-border bg-white pl-1.5 pr-2.5 shadow-sm transition-colors hover:bg-muted"
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-black text-white">
                    <User className="size-3.5" />
                  </span>
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </button>

                {menuOpen ? (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
                    <div className="absolute right-0 z-40 mt-2 w-60 rounded-2xl border border-border bg-white p-2 shadow-xl">
                      <div className="px-3 py-2">
                        <p className="text-sm font-bold">{user.name}</p>
                        {user.email ? (
                          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                        ) : null}
                      </div>
                      <div className="my-1 h-px bg-border" />
                      <MenuItem icon={<Settings className="size-4" />} onClick={goSettings}>
                        Settings
                      </MenuItem>
                      <MenuItem icon={<Info className="size-4" />}>About</MenuItem>
                      <MenuItem icon={<HelpCircle className="size-4" />}>Help</MenuItem>
                      <div className="my-1 h-px bg-border" />
                      <MenuItem icon={<LogOut className="size-4" />} onClick={handleLogout} danger>
                        Log out
                      </MenuItem>
                    </div>
                  </>
                ) : null}
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
