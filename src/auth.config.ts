import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";

const adminEmail = process.env.ADMIN_EMAIL;
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
const adminPassword = process.env.ADMIN_PASSWORD;

async function verifyAdminPassword(input: string) {
  if (adminPasswordHash) {
    return bcrypt.compare(input, adminPasswordHash);
  }
  if (adminPassword) {
    return input === adminPassword;
  }
  return false;
}

async function verifyUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user || !user.passwordHash) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return { id: user.id, email: user.email!, role: user.role ?? "user" };
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;
        const email = credentials.email;
        const password = credentials.password;

        // Admin shortcut
        if (adminEmail && email.toLowerCase() === adminEmail.toLowerCase()) {
          const ok = await verifyAdminPassword(password);
          if (!ok) return null;
          return { id: "admin", email: adminEmail, role: "admin" };
        }

        // Regular user from DB
        return verifyUser(email, password);
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const typedUser = user as { role?: string; id?: string };
        token.role = typedUser.role ?? "user";
        if (typedUser.id) token.sub = typedUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const userSession = session.user as { role?: string; id?: string };
        userSession.role = (token.role as string) ?? "user";
        if (token.sub) userSession.id = token.sub as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
