"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Unable to sign up");
      setLoading(false);
      return;
    }

    // Auto sign in after sign up
    const loginRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (loginRes?.error) {
      setError("Signed up, but could not log in");
      setLoading(false);
      return;
    }

    router.push(loginRes?.url ?? callbackUrl);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_20%_20%,#0d1836_0%,#04060f_48%,#02030a_100%)] px-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
        <div className="mb-6 space-y-2">
          <div className="text-sm uppercase tracking-[0.2em] text-emerald-200">Join Liaise</div>
          <h1 className="text-3xl font-semibold">Create account</h1>
          <p className="text-sm text-slate-200/80">
            Sign up to provision numbers, pay securely, and receive inbound SMS.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/70"
          />
          <input
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="Password (min 8 chars)"
            className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/70"
          />
          {error && <div className="text-sm text-red-400">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/25 transition hover:shadow-emerald-400/40 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-slate-300/80">
          Already have an account?{" "}
          <a className="text-emerald-200 hover:text-emerald-100" href="/login">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}
