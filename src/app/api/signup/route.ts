import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.email || !body?.password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const email = String(body.email).toLowerCase().trim();
  const password = String(body.password);

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { email, passwordHash: hash, role: "user" },
  });

  return NextResponse.json({ ok: true });
}
