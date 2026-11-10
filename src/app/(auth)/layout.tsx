import { Brand } from "@/components/brand";

const POINTS = [
  "Reads every invoice and credit memo you upload.",
  "Links each credit to the invoice it corrects, and says why.",
  "Shows what is still unused, and which vendors keep billing you wrong.",
];

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="grid min-h-svh lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <section className="dark flex flex-col justify-between gap-12 bg-background px-6 py-8 text-foreground sm:px-10 lg:px-14 lg:py-12">
        <Brand />
        <div>
          <span className="accent-dash" aria-hidden />
          <h1 className="mt-6 max-w-xl text-4xl leading-[1.08] font-normal tracking-[-0.03em] text-balance sm:text-5xl lg:text-[56px]">
            Find the money your vendors <span className="text-solar">still owe you.</span>
          </h1>
          <ol className="mt-10 hidden max-w-xl divide-y divide-white/15 border-y border-white/15 sm:block">
            {POINTS.map((point, i) => (
              <li key={point} className="flex items-baseline gap-5 py-3.5">
                <span className="w-5 shrink-0 text-xs text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg leading-6 tracking-[-0.01em]">{point}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="hidden text-xs text-muted-foreground lg:block">Nothing in this app moves money.</p>
      </section>
      <section className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">{children}</div>
      </section>
    </main>
  );
}
