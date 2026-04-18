"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Platform",    href: "/platform"    },
  { label: "Methodology", href: "/methodology" },
  { label: "Pricing",     href: "/pricing"     },
  { label: "Resources",   href: "/resources"   },
  { label: "Team",        href: "/team"        },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-primary transition-opacity hover:opacity-90"
        >
          openESG
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-primary ${active ? "text-primary" : "text-slate-500"}`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-primary/40 hover:text-primary"
          >
            Log in
          </button>
          <button
            type="button"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary/90 hover:shadow-lg"
          >
            Request Demo
          </button>
        </div>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg border-l-2 px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50 hover:text-primary ${active ? "border-primary bg-primary/5 text-primary" : "border-transparent text-slate-600"}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              type="button"
              className="mt-2 w-full rounded-full border border-slate-200 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary"
            >
              Log in
            </button>
            <button
              type="button"
              className="w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90"
            >
              Request Demo
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
