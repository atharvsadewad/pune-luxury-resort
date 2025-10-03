"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main className="container-lux py-20 max-w-md">
      <h1 className="text-3xl font-semibold text-[--color-navy]">Admin Login</h1>
      <div className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-black/5">
        <div className="grid gap-4">
          <input className="rounded-lg border px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="rounded-lg border px-4 py-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="btn btn-primary" onClick={() => signIn("credentials", { email, password, callbackUrl: "/admin" })}>Sign In</button>
        </div>
      </div>
    </main>
  );
}

