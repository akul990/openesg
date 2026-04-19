"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Leaf, LayoutDashboard, LogOut, Zap, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/src/lib/auth/context";
import { AuthModal } from "@/src/components/AuthModal";

const platformLinks = [
  { label: "Overview",   href: "/platform" },
  { label: "Companies",  href: "/platform/companies" },
  { label: "Automate",   href: "/automate" },
];

const links = [
  { label: "Methodology", href: "/methodology" },
  { label: "Pricing",     href: "/pricing"     },
  { label: "Resources",   href: "/resources"   },
  { label: "Team",        href: "/team"        },
];

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

export function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen]                   = useState(false);
  const [platformOpen, setPlatform]       = useState(false);
  const [mobileplatform, setMobilePlatform] = useState(false);
  const [authOpen, setAuthOpen]           = useState(false);
  const [userMenuOpen, setUserMenuOpen]   = useState(false);
  const pathname   = usePathname();
  const router     = useRouter();
  const dropRef    = useRef<HTMLDivElement>(null);
  const userRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setPlatform(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setPlatform(false); setOpen(false); setUserMenuOpen(false); }, [pathname]);

  const platformActive = pathname.startsWith("/platform") || pathname.startsWith("/automate");

  function handleLogout() {
    logout();
    setUserMenuOpen(false);
    router.push("/");
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-primary transition-opacity hover:opacity-90">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-3.5 w-3.5 text-white" />
            </div>
            openESG
          </Link>

          {/* Desktop nav */}
          <div className="hidden flex-1 items-center justify-center gap-8 md:flex">

            {/* Platform dropdown */}
            <div ref={dropRef} className="relative">
              <button
                type="button"
                onClick={() => setPlatform((v) => !v)}
                className={`flex items-center gap-1 relative text-sm font-medium transition-colors duration-200 hover:text-primary ${platformActive ? "text-primary" : "text-slate-500"}`}
              >
                Platform
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${platformOpen ? "rotate-180" : ""}`} />
                {platformActive && <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 rounded-full bg-primary" />}
              </button>

              {platformOpen && (
                <div className="absolute left-1/2 top-[calc(100%+14px)] w-44 -translate-x-1/2 rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg">
                  {platformLinks.map((pl) => (
                    <Link
                      key={pl.href}
                      href={pl.href}
                      className={`block px-4 py-2 text-sm transition-colors hover:bg-slate-50 hover:text-primary ${pathname === pl.href ? "font-semibold text-primary" : "text-slate-600"}`}
                    >
                      {pl.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 hover:text-primary ${active ? "text-primary" : "text-slate-500"}`}
                >
                  {link.label}
                  {active && <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 rounded-full bg-primary" />}
                </Link>
              );
            })}
          </div>

          {/* Right side — auth state */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              /* ── Logged in ─────────────────────────── */
              <div ref={userRef} className="relative flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[12px] font-semibold text-primary transition-all hover:border-primary/40 hover:bg-primary/10"
                >
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Dashboard
                </Link>

                {/* Avatar */}
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-black text-white shadow-md ring-2 ring-primary/20 transition-all hover:ring-primary/40"
                >
                  {initials(user.name) || <User className="h-4 w-4" />}
                </button>

                {/* User dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-xl border border-slate-100 bg-white py-1.5 shadow-xl">
                    <div className="border-b border-slate-100 px-4 py-3">
                      <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="mt-1.5 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                        {user.plan} plan
                      </span>
                    </div>
                    <Link href="/dashboard" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-primary">
                      <LayoutDashboard className="h-4 w-4" /> My Dashboard
                    </Link>
                    <Link href="/autoesg/upload" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-primary">
                      <Zap className="h-4 w-4" /> AutoESG Tool
                    </Link>
                    <div className="my-1 border-t border-slate-100" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Logged out ────────────────────────── */
              <>
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-primary/40 hover:text-primary"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary/90 hover:shadow-lg"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
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

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1">

              {/* Platform accordion */}
              <button
                type="button"
                onClick={() => setMobilePlatform((v) => !v)}
                className={`flex items-center justify-between rounded-lg border-l-2 px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50 hover:text-primary ${platformActive ? "border-primary bg-primary/5 text-primary" : "border-transparent text-slate-600"}`}
              >
                Platform
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileplatform ? "rotate-180" : ""}`} />
              </button>
              {mobileplatform && (
                <div className="ml-4 flex flex-col gap-1 border-l border-slate-200 pl-3">
                  {platformLinks.map((pl) => (
                    <Link
                      key={pl.href}
                      href={pl.href}
                      onClick={() => setOpen(false)}
                      className={`rounded-md px-3 py-1.5 text-sm transition-colors hover:text-primary ${pathname === pl.href ? "font-semibold text-primary" : "text-slate-500"}`}
                    >
                      {pl.label}
                    </Link>
                  ))}
                </div>
              )}

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

              <div className="mt-3 border-t border-slate-100 pt-3">
                {user ? (
                  <>
                    <div className="mb-3 flex items-center gap-3 rounded-xl bg-surface px-3 py-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-black text-white">
                        {initials(user.name) || <User className="h-4 w-4" />}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">{user.name}</p>
                        <p className="truncate text-[11px] text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg border-l-2 border-transparent px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-primary">
                      <LayoutDashboard className="h-4 w-4" /> My Dashboard
                    </Link>
                    <button type="button" onClick={() => { handleLogout(); setOpen(false); }} className="flex w-full items-center gap-2 rounded-lg border-l-2 border-transparent px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50">
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => { setAuthOpen(true); setOpen(false); }} className="w-full rounded-full border border-slate-200 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary">
                      Log in
                    </button>
                    <button type="button" onClick={() => { setAuthOpen(true); setOpen(false); }} className="mt-2 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90">
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
