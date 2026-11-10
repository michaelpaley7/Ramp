import { LogOutIcon, UploadIcon } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/(auth)/actions";
import { AppNav } from "@/components/app-nav";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { requireSession } from "@/lib/auth";
import { AUTONOMY_LABELS } from "@/lib/autonomy";
import { db } from "@/lib/db";
import { env, isMockMode } from "@/lib/env";
import { getAutonomy } from "@/lib/server/settings";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const session = await requireSession();
  const [reviewCount, autonomy] = await Promise.all([
    db.document.count({ where: { organizationId: session.organizationId, status: "needs_review" } }),
    getAutonomy(session.organizationId),
  ]);

  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <aside className="flex shrink-0 flex-col gap-4 border-b bg-sidebar px-4 py-3 lg:sticky lg:top-0 lg:h-svh lg:w-60 lg:gap-6 lg:border-r lg:border-b-0 lg:px-3 lg:py-5 print:hidden">
        <div className="flex items-center justify-between gap-3 lg:px-2">
          <Link href="/" className="rounded-md outline-offset-4">
            <Brand />
          </Link>
          <Button asChild size="sm" className="lg:hidden">
            <Link href="/upload">
              <UploadIcon />
              Upload
            </Link>
          </Button>
        </div>
        <Button asChild className="hidden w-full lg:inline-flex">
          <Link href="/upload">
            <UploadIcon />
            Upload documents
          </Link>
        </Button>
        <AppNav reviewCount={reviewCount} />

        <div className="mt-auto hidden space-y-3 lg:block">
          <Link
            href="/settings"
            className="block rounded-lg border bg-background px-3 py-2.5 text-xs leading-4 transition-colors hover:border-line-strong"
          >
            <span className="eyebrow block">Autonomy</span>
            <span className="mt-1 block text-[13px] leading-[18px] text-ink">{AUTONOMY_LABELS[autonomy.level].name}</span>
          </Link>
          {isMockMode() && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-lg bg-warning-soft px-3 py-2 text-left text-xs leading-4 text-warning-ink"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-warning" aria-hidden />
                  Mock extraction mode
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-64 leading-relaxed">
                ANTHROPIC_API_KEY isn&apos;t set, so uploads get simulated extraction data. Set it to read documents with{" "}
                {env.ANTHROPIC_MODEL}.
              </TooltipContent>
            </Tooltip>
          )}
          <div className="flex items-center gap-2 border-t pt-3 pl-2">
            <div className="min-w-0 flex-1 text-xs leading-4">
              <div className="truncate text-[13px] text-ink">{session.organizationName}</div>
              <div className="truncate text-muted-foreground">{session.email}</div>
            </div>
            <form action={logout}>
              <Button variant="ghost" size="icon-sm" type="submit" aria-label="Sign out" title="Sign out">
                <LogOutIcon />
              </Button>
            </form>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {isMockMode() && (
          <p className="border-b bg-warning-soft px-4 py-2 text-xs text-warning-ink lg:hidden print:hidden">
            Mock extraction mode: uploads get simulated extraction data.
          </p>
        )}
        <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 sm:px-8 lg:py-10 print:max-w-none print:p-0">
          {children}
        </main>
        <footer className="flex items-center justify-between gap-4 border-t px-4 py-3 text-xs text-muted-foreground sm:px-8 lg:hidden print:hidden">
          <span className="truncate">{session.organizationName}</span>
          <form action={logout}>
            <button type="submit" className="underline underline-offset-4">
              Sign out
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
