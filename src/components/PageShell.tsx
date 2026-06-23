import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main>
      <section className="border-b border-sky-100 bg-gradient-to-b from-sky-50 via-white to-mint-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <p className="text-sm font-bold text-coral-500">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-normal text-slate-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {intro}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        {children}
      </section>
    </main>
  );
}
