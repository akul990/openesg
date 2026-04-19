"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Leaf, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/src/lib/auth/context";

type Tab = "login" | "register";

interface AuthModalProps {
  onClose: () => void;
  defaultTab?: Tab;
  redirectTo?: string;
}

export function AuthModal({ onClose, defaultTab = "login", redirectTo = "/dashboard" }: AuthModalProps) {
  const { login, register, loginDemo, isLoading } = useAuth();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  const [tab, setTab]         = useState<Tab>(defaultTab);
  const [busy, setBusy]       = useState(false);
  const [error, setError]     = useState("");
  const [showPw, setShowPw]   = useState(false);

  const [loginForm, setLoginForm]     = useState({ email: "", password: "" });
  const [regForm,   setRegForm]       = useState({ name: "", email: "", password: "", company: "" });

  // Close on Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) { setError("Please fill in all fields."); return; }
    setBusy(true); setError("");
    try {
      await login(loginForm.email, loginForm.password);
      onClose();
      router.push(redirectTo);
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally { setBusy(false); }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!regForm.name || !regForm.email || !regForm.password) { setError("Please fill in all required fields."); return; }
    if (regForm.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setBusy(true); setError("");
    try {
      await register(regForm.name, regForm.email, regForm.password, regForm.company);
      onClose();
      router.push(redirectTo);
    } catch {
      setError("Registration failed. Please try again.");
    } finally { setBusy(false); }
  }

  function handleDemo() {
    loginDemo();
    onClose();
    router.push(redirectTo);
  }

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-dark/60 px-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md animate-content-fade overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-7">
          {/* Logo */}
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-black text-primary">openESG</span>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex rounded-xl bg-surface p-1">
            {(["login", "register"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold capitalize transition-all ${
                  tab === t
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Login form */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <Field label="Email" type="email" value={loginForm.email} placeholder="you@company.com"
                onChange={(v) => setLoginForm((f) => ({ ...f, email: v }))} />
              <PasswordField label="Password" value={loginForm.password} show={showPw}
                onToggle={() => setShowPw((v) => !v)}
                onChange={(v) => setLoginForm((f) => ({ ...f, password: v }))} />

              {error && <ErrorBox msg={error} />}

              <SubmitBtn busy={busy || isLoading} label="Sign In" />
            </form>
          )}

          {/* Register form */}
          {tab === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Full Name *" type="text" value={regForm.name} placeholder="Jane Smith"
                  onChange={(v) => setRegForm((f) => ({ ...f, name: v }))} />
                <Field label="Company" type="text" value={regForm.company} placeholder="Acme GmbH"
                  onChange={(v) => setRegForm((f) => ({ ...f, company: v }))} />
              </div>
              <Field label="Work Email *" type="email" value={regForm.email} placeholder="jane@company.com"
                onChange={(v) => setRegForm((f) => ({ ...f, email: v }))} />
              <PasswordField label="Password * (min 6 chars)" value={regForm.password} show={showPw}
                onToggle={() => setShowPw((v) => !v)}
                onChange={(v) => setRegForm((f) => ({ ...f, password: v }))} />

              {error && <ErrorBox msg={error} />}

              <SubmitBtn busy={busy || isLoading} label="Create Account" />
            </form>
          )}

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-[11px] text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          {/* Demo */}
          <button
            type="button"
            onClick={handleDemo}
            className="w-full rounded-xl border-2 border-primary/20 bg-primary/5 py-2.5 text-sm font-semibold text-primary transition-all hover:border-primary/40 hover:bg-primary/10"
          >
            Continue with Demo Account
          </button>

          {/* Trust line */}
          <p className="mt-4 text-center text-[10px] text-slate-400">
            Free tier · No credit card · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Small helpers ──────────────────────────────────────────────── */
function Field({ label, type, value, placeholder, onChange }: {
  label: string; type: string; value: string; placeholder: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
      />
    </div>
  );
}

function PasswordField({ label, value, show, onToggle, onChange }: {
  label: string; value: string; show: boolean; onToggle: () => void; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          placeholder="••••••••"
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
        <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  return <p className="rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-600 ring-1 ring-red-100">{msg}</p>;
}

function SubmitBtn({ busy, label }: { busy: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg disabled:opacity-60"
    >
      {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <>{label} <ArrowRight className="h-4 w-4" /></>}
    </button>
  );
}
