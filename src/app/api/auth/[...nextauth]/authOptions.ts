import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL || "";
        const adminPassword = process.env.ADMIN_PASSWORD || "";
        if (credentials?.email === adminEmail && credentials?.password === adminPassword) {
          return { id: "admin", name: "Administrator", email: adminEmail } as any;
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/admin/login" },
};

