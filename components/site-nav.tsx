import Link from "next/link";
import { cn } from "@/lib/utils";

export function SiteNav({ className }: { className?: string }) {
  return (
    <header className={cn("sticky top-4 z-40 px-4 sm:px-6 lg:px-10", className)}>
      <nav className="flex items-center justify-between rounded-full border border-border/60 bg-white/90 py-2 pl-6 pr-2 shadow-sm backdrop-blur">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          peony
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/courses"
            className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Courses
          </Link>
          <Link
            href="/#how-it-works"
            className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            How it works
          </Link>
        </div>
        <Link
          href="/login"
          className="rounded-full border border-border bg-white px-4 py-2 text-sm font-bold text-foreground transition-colors hover:bg-muted"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
