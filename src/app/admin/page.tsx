import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await auth();

  const [numbers, orders, messages, activeNumbers, pendingNumbers, pendingOrders] = await Promise.all([
    prisma.number.findMany({
      orderBy: { purchasedAt: "desc" },
      take: 5,
      include: { user: { select: { email: true } } },
    }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { user: { select: { email: true } }, number: { select: { msisdn: true } } },
    }),
    prisma.message.findMany({
      orderBy: { receivedAt: "desc" },
      take: 5,
      include: { number: { select: { msisdn: true } } },
    }),
    prisma.number.count({ where: { status: "active" } }),
    prisma.number.count({ where: { status: "pending" } }),
    prisma.order.count({ where: { status: "pending" } }),
  ]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,#0d1836_0%,#04060f_48%,#02030a_100%)] px-6 py-10 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-emerald-200">Admin</div>
            <div className="text-lg font-semibold">Control center</div>
            <div className="text-xs text-slate-300/80">
              Signed in as {session?.user?.email ?? "unknown"}
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10">
              Sign out
            </button>
          </form>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Active numbers", value: activeNumbers },
            { label: "Pending numbers", value: pendingNumbers },
            { label: "Pending orders", value: pendingOrders },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-emerald-200/80">{stat.label}</div>
              <div className="mt-2 text-2xl font-semibold">{stat.value}</div>
            </div>
          ))}
        </section>

        <main className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="text-sm uppercase tracking-[0.18em] text-emerald-200/90">Numbers</div>
            <div className="mt-3 space-y-2 text-sm text-slate-200/85">
              {numbers.length === 0 && <div className="text-slate-400">No numbers yet.</div>}
              {numbers.map((num) => (
                <div
                  key={num.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                >
                  <div>
                    <div className="font-semibold">{num.msisdn}</div>
                    <div className="text-xs text-slate-300/80">
                      {num.region} · {num.provider} · {num.user?.email ?? "unassigned"}
                    </div>
                  </div>
                  <div className="text-xs rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-200">
                    {num.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="text-sm uppercase tracking-[0.18em] text-emerald-200/90">Payments</div>
            <div className="mt-3 space-y-2 text-sm text-slate-200/85">
              {orders.length === 0 && <div className="text-slate-400">No orders yet.</div>}
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">
                      {(order.amountCents / 100).toLocaleString(undefined, {
                        style: "currency",
                        currency: order.currency,
                      })}
                    </div>
                    <div className="text-xs rounded-full bg-amber-200/20 px-3 py-1 text-amber-200">
                      {order.status}
                    </div>
                  </div>
                  <div className="text-xs text-slate-300/80">
                    {order.provider} · {order.user?.email ?? "unknown user"} ·{" "}
                    {order.number?.msisdn ?? "no number"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="text-sm uppercase tracking-[0.18em] text-emerald-200/90">SMS</div>
            <div className="mt-3 space-y-2 text-sm text-slate-200/85">
              {messages.length === 0 && <div className="text-slate-400">No messages yet.</div>}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs"
                >
                  <div className="flex items-center justify-between text-emerald-100/90">
                    <span>{msg.number?.msisdn ?? "Unknown"}</span>
                    <span className="text-[11px] text-slate-300/80">
                      {new Date(msg.receivedAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 text-slate-200">{msg.body}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
