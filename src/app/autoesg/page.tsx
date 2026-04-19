"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, ArrowRight } from "lucide-react";
import { useAuth } from "@/src/lib/auth/context";

export default function AutoESGLogin() {
  const router = useRouter();
  const { user, login, loginDemo, isLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // If already logged in, go straight to upload
  useEffect(() => {
    if (!isLoading && user) router.push("/autoesg/upload");
  }, [user, isLoading, router]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setBusy(true);
    try {
      await login(form.email, form.password);
      router.push("/autoesg/upload");
    } catch {
      setError("Login failed. Please try again.");
    } finally { setBusy(false); }
  }

  function handleDemo() {
    loginDemo();
    router.push("/autoesg/upload");
  }

  const loading = busy || isLoading;

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 text-2xl font-black tracking-tight text-primary">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              AutoESG
            </div>
            <p className="mt-2 text-sm text-slate-500">Automated carbon compliance for EU SMEs</p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="mb-6 text-lg font-bold text-slate-900">Sign in to your account</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-600 ring-1 ring-red-100">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg disabled:opacity-60"
              >
                {loading ? "Signing in…" : <>Sign in <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-[11px] text-slate-400">or</span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <button
              type="button"
              onClick={handleDemo}
              className="w-full rounded-xl border-2 border-primary/20 bg-primary/5 py-2.5 text-sm font-semibold text-primary transition-all hover:border-primary/40 hover:bg-primary/10"
            >
              Continue with Demo Account
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-slate-400">
            {["CSRD-aligned", "DEFRA 2024 factors", "No credit card"].map((b) => (
              <span key={b} className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {b}
              </span>
            ))}
          </div>

          <p className="mt-4 text-center text-[11px] text-slate-400">
            Back to{" "}
            <Link href="/automate" className="font-semibold text-primary hover:underline">
              AutoESG overview
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
