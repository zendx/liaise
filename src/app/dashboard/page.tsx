import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string })?.id;

  const [numbers, messages, orders, numbersCount, messagesCount] = userId
    ? await Promise.all([
        prisma.number.findMany({
          where: { userId },
          orderBy: { purchasedAt: "desc" },
          take: 5,
        }),
        prisma.message.findMany({
          where: { number: { userId } },
          include: { number: { select: { msisdn: true } } },
          orderBy: { receivedAt: "desc" },
          take: 5,
        }),
        prisma.order.findMany({
          where: { userId },
          include: { number: { select: { msisdn: true } } },
          orderBy: { createdAt: "desc" },
          take: 3,
        }),
        prisma.number.count({ where: { userId } }),
        prisma.message.count({ where: { number: { userId } } }),
      ])
    : [[], [], [], 0, 0];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,#0d1836_0%,#04060f_48%,#02030a_100%)] px-6 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-emerald-200">Dashboard</div>
            <div className="text-lg font-semibold">Welcome, {session?.user?.email}</div>
            <div className="text-xs text-slate-300/80">Manage numbers, payments, and SMS.</div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10">
              Sign out
            </button>
          </form>
        </header>

        <main className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="text-sm uppercase tracking-[0.18em] text-emerald-200/90">Numbers</div>
              <div className="text-xs text-emerald-100/80">{numbersCount} total</div>
            </div>
            <div className="mt-3 space-y-2 text-sm text-slate-200/85">
              {numbers.length === 0 && <div className="text-slate-400">No numbers assigned yet.</div>}
              {numbers.map((num) => (
                <div
                  key={num.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                >
                  <div>
                    <div className="font-semibold">{num.msisdn}</div>
                    <div className="text-xs text-slate-400">
                      {num.region} · {num.provider}
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
            <div className="flex items-center justify-between">
              <div className="text-sm uppercase tracking-[0.18em] text-emerald-200/90">SMS Inbox</div>
              <div className="text-xs text-emerald-100/80">{messagesCount} received</div>
            </div>
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
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="text-sm uppercase tracking-[0.18em] text-emerald-200/90">Billing</div>
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
                    {order.provider} · {order.periodMonths} month{order.periodMonths > 1 ? "s" : ""}{" "}
                    {order.number?.msisdn ? `· ${order.number.msisdn}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
