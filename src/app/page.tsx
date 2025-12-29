"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Active eSIMs", value: "12,480", delta: "+186 today" },
  { label: "Data used", value: "3.2 TB", delta: "72% of pool" },
  { label: "New activations", value: "642", delta: "Africa + EU" },
];

const controlCards = [
  { title: "Provision", value: "Batch x200", hint: "90 sec / batch" },
  { title: "Monitor", value: "Latency 84 ms", hint: "Across 17 regions" },
  { title: "Recover", value: "Auto reroute", hint: "Plivo + Telnyx" },
];

const simPools = [
  { country: "Nigeria", usage: 76, status: "Healthy", data: "620 GB / 820 GB" },
  { country: "Kenya", usage: 58, status: "Scaling", data: "410 GB / 700 GB" },
  { country: "UK", usage: 34, status: "Idle capacity", data: "230 GB / 980 GB" },
  { country: "France", usage: 64, status: "Active", data: "610 GB / 950 GB" },
];

const activity = [
  { time: "09:45", title: "Auto-provisioned", detail: "Batch of 50 EU Toll-free" },
  { time: "10:02", title: "Latency spike contained", detail: "Switched to Telnyx FRA" },
  { time: "10:18", title: "Data top-up", detail: "Added 500 GB to West Africa" },
  { time: "10:30", title: "Webhook verified", detail: "Inbound queue signatures clean" },
];

const plans = [
  {
    name: "Operator",
    price: "₦8,900",
    detail: "per eSIM / mo",
    perks: ["Inbound + outbound", "Country-based routing", "Usage caps"],
  },
  {
    name: "Mission Control",
    price: "₦12,900",
    detail: "per eSIM / mo",
    perks: ["Predictive failover", "Live usage overlays", "Multi-team approvals"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    detail: "10k+ eSIM fleet",
    perks: ["Private NOC lanes", "Custom PSP mix", "SLA + onboarding pods"],
  },
];

function GlowBackdrops() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(123,255,222,0.22),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(64,162,255,0.2),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,198,106,0.16),transparent_38%)]" />
    </>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/8 bg-white/5 px-4 py-3 shadow-[0_20px_90px_-60px_rgba(0,0,0,0.9)] backdrop-blur">
      {children}
    </div>
  );
}

function UsageBar({ value }: { value: number }) {
  return (
    <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_10%,#0b1531_0%,#050915_42%,#05070f_100%)] text-white">
      <GlowBackdrops />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.04)_0,rgba(255,255,255,0)_30%,rgba(255,255,255,0.04)_60%,rgba(255,255,255,0)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(255,255,255,0.06),transparent_50%)] mix-blend-screen" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-14 px-6 pb-24 pt-12 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-900 font-semibold">
              L
            </div>
            <div className="leading-tight">
              <div className="text-sm uppercase tracking-[0.18em] text-emerald-200/90">Liaise</div>
              <div className="text-sm text-white/80">eSIM Command Center</div>
            </div>
          </div>
          <div className="hidden items-center gap-3 text-sm text-white/70 sm:flex">
            <a
              className="rounded-full border border-white/15 px-4 py-2 transition hover:border-white/30 hover:bg-white/5"
              href="/login"
            >
              Log in
            </a>
            <a
              className="rounded-full border border-white/15 px-4 py-2 transition hover:border-white/30 hover:bg-white/5"
              href="#plans"
            >
              Plans
            </a>
            <a
              className="rounded-full bg-gradient-to-r from-amber-300 via-emerald-300 to-sky-400 px-4 py-2 text-slate-900 font-semibold shadow-lg shadow-emerald-500/30 transition hover:shadow-emerald-400/40"
              href="/signup"
            >
              Get started
            </a>
          </div>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-emerald-200/90">
              e-SIM orchestration
            </div>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Build, launch, and steady an eSIM fleet in every market.
            </h1>
            <p className="max-w-2xl text-lg text-slate-200/80">
              Provision in batches, watch latency and usage live, and fail over between Plivo and
              Telnyx without your customers noticing. The console ships with approvals, status
              overlays, and PSP-ready billing.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                className="rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-emerald-500/25 transition hover:shadow-emerald-400/40"
                href="/signup"
              >
                Get started
              </a>
              <a
                className="rounded-full border border-white/15 px-6 py-3 text-base font-semibold text-white/85 backdrop-blur transition hover:border-white/35 hover:bg-white/5"
                href="/login"
              >
                Log in
              </a>
              <a
                className="rounded-full border border-white/15 px-6 py-3 text-base font-semibold text-white/85 backdrop-blur transition hover:border-white/35 hover:bg-white/5"
                href="#plans"
              >
                View plans
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <Frame key={item.label}>
                  <div className="text-xs uppercase tracking-[0.16em] text-white/70">{item.label}</div>
                  <div className="mt-2 text-2xl font-semibold text-white">{item.value}</div>
                  <div className="text-xs text-emerald-200/80">{item.delta}</div>
                </Frame>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-emerald-400/30 blur-[90px]" />
            <div className="absolute -right-6 bottom-10 h-24 w-24 rounded-full bg-sky-400/30 blur-[90px]" />
            <div className="relative space-y-4 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-[0_40px_120px_-70px_rgba(0,0,0,1)] backdrop-blur lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-white/70">Mission dashboard</div>
                  <div className="text-xl font-semibold text-white">Live control</div>
                </div>
                <div className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-50">
                  Stable
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {controlCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur"
                  >
                    <div className="text-xs uppercase tracking-[0.16em] text-white/60">
                      {card.title}
                    </div>
                    <div className="mt-2 text-lg font-semibold text-white">{card.value}</div>
                    <div className="text-xs text-white/60">{card.hint}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0b1223]/70 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">Regional pools</div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                    Updated just now
                  </div>
                </div>
                <div className="space-y-3">
                  {simPools.map((pool) => (
                    <div key={pool.country} className="rounded-xl border border-white/5 bg-white/5 p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-white">{pool.country}</div>
                        <div className="text-xs text-emerald-200/80">{pool.status}</div>
                      </div>
                      <div className="mt-1 text-xs text-white/60">{pool.data}</div>
                      <div className="mt-2">
                        <UsageBar value={pool.usage} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">Live activity</div>
                  <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                </div>
                <div className="mt-3 space-y-3">
                  {activity.map((event) => (
                    <div
                      key={event.time}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2"
                    >
                      <div className="text-xs text-white/60">{event.time}</div>
                      <div>
                        <div className="text-sm font-semibold text-white">{event.title}</div>
                        <div className="text-xs text-white/60">{event.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="monitor" className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-emerald-200/90">Mission center</div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                End-to-end visibility for eSIM operations.
              </h2>
              <p className="max-w-3xl text-base text-white/70">
                Watch demand, approve rollouts, and simulate failovers before pushing them live.
                Every panel is mapped to your providers, PSPs, and webhook signatures.
              </p>
            </div>
            <button className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-white/30 hover:bg-white/10">
              Schedule a walkthrough
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Predictive routing across Plivo + Telnyx",
              "Role-based approvals and change windows",
              "Realtime QoS overlays for every country",
              "Webhook verification and replay safety",
              "PSP-ready billing with crypto + Paystack",
              "Fleet health with per-tenant views",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-[#0b1223]/70 p-4 text-sm text-white/80"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="plans" className="space-y-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-emerald-200/90">Plans</div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Pricing tuned for real fleet work.
              </h2>
              <p className="max-w-2xl text-base text-white/70">
                Start with controlled pilots and scale to tens of thousands of eSIMs without
                reworking your stack.
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
              Telnyx + Plivo • US/EU/MEA
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative overflow-hidden rounded-3xl border border-white/12 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-white/30 ${
                  plan.featured ? "shadow-[0_35px_120px_-60px_rgba(59,130,246,0.65)]" : ""
                }`}
              >
                {plan.featured && (
                  <div className="absolute right-3 top-3 rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-50">
                    Most chosen
                  </div>
                )}
                <div className="text-xs uppercase tracking-[0.18em] text-white/60">{plan.name}</div>
                <div className="mt-3 text-3xl font-semibold text-white">{plan.price}</div>
                <div className="text-sm text-white/60">{plan.detail}</div>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90 transition hover:border-white/35 hover:bg-white/15">
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="space-y-4">
            <div className="text-sm uppercase tracking-[0.2em] text-emerald-200/90">Support pod</div>
            <h3 className="text-3xl font-semibold text-white sm:text-4xl">Talk with mission control.</h3>
            <p className="text-base text-white/70">
              Tell us the markets, PSP mix, and inbound volumes. We assemble the routing and billing
              story and ship the console with your approvals baked in.
            </p>
            <div className="rounded-2xl border border-white/10 bg-[#0b1223]/70 p-4 text-sm text-white/80">
              Bring your providers or lean on ours. We handle webhook verification, PSP checkout,
              and rollout playbooks for your NOC teams.
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0b1223]/70 p-5">
            <form className="space-y-4">
              <input
                className="w-full rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/70"
                placeholder="Work email"
                type="email"
              />
              <input
                className="w-full rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/70"
                placeholder="Company / project"
                type="text"
              />
              <textarea
                className="h-28 w-full rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/70"
                placeholder="Regions, volumes, PSP mix, and timing."
              />
              <button className="w-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/25 transition hover:shadow-emerald-400/40">
                Send message
              </button>
            </form>
            <div className="mt-4 text-xs text-white/60">Response in under 24h. No spam.</div>
          </div>
        </section>

        <footer className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/70 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>Liaise • eSIM command center for global fleets</div>
          <div className="flex gap-4">
            <a className="hover:text-white" href="#monitor">
              Console
            </a>
            <a className="hover:text-white" href="#plans">
              Plans
            </a>
            <a className="hover:text-white" href="#">
              Status
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
