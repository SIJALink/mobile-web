
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const akunDemo = [
      {
        email: "admin@sijalink.test",
        username: "admin",
        password: "Admin123",
        name: "Admin SIJALink",
        role: "admin",
      },
      {
        email: "kepala@sijalink.test",
        username: "kepala_site",
        password: "Kepala123",
        name: "Kepala SITE SIJALink",
        role: "kepala",
      },
      {
        email: "pelanggan@sijalink.test",
        username: "pelanggan",
        password: "123456",
        name: "Pelanggan SIJALink",
        role: "pelanggan",
      },
      {
        email: "petugas@sijalink.test",
        username: "petugas",
        password: "123456",
        name: "Petugas SIJALink",
        role: "petugas",
      },
      {
        email: "kakonsli@sijalink.test",
        username: "kakonsli",
        password: "Kakonsli123",
        name: "Kakonsli SIJALink",
        role: "kakonsli",
      },
      ];

    let akunTerdaftar = [];

    try {
      akunTerdaftar = JSON.parse(
        localStorage.getItem("sijalink_akun") || "[]"
      );
    } catch {
      akunTerdaftar = [];
    }

    const semuaAkun = [...akunDemo, ...akunTerdaftar];

    const akun = semuaAkun.find(
      (item: {
        email: string;
        username: string;
        password: string;
      }) =>
        (item.email?.toLowerCase() === username.trim().toLowerCase() ||
          item.username?.toLowerCase() === username.trim().toLowerCase()) &&
        item.password === password
    );

    if (!akun) {
      alert("Email/Username atau password salah!");
      return;
    }

    localStorage.setItem(
      "sijalink_user",
      JSON.stringify({
        email: akun.email,
        username: akun.username,
        name: akun.name,
        role: akun.role,
      })
    );

   if (
  akun.role === "admin" ||
  akun.role === "kepala" ||
  akun.role === "kakonsli"
) {
  router.push("/dashboard");
} else {
  router.push(`/dashboard/${akun.role}`);
}
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <section className="auth-illustration">
          <div className="auth-brand">
            <div className="auth-logo">📶</div>
            <h1>SIJALink</h1>
            <p>Solusi Internet Terpercaya</p>
          </div>

          <div className="auth-art">
            <div className="auth-tower">🗼</div>
            <h2>
              Internet Cepat dan Stabil
              <br />
              Untuk Kebutuhan Anda
            </h2>
          </div>

          <div className="auth-benefits">
            <div className="auth-benefit">
              <span>✓</span>
              Internet Stabil untuk Aktivitas Anda
            </div>
            <div className="auth-benefit">
              <span>✓</span>
              Layanan Cepat dan Profesional
            </div>
            <div className="auth-benefit">
              <span>✓</span>
              Solusi Terbaik untuk Koneksi Anda
            </div>
          </div>
        </section>

        <section className="auth-form-panel">
          <h2>Login</h2>
          <p className="auth-subtitle">
            Masuk ke akun SIJALink Anda
          </p>

          <form onSubmit={handleLogin}>
            <div className="auth-field">
              <label>Email / Username</label>
              <input
                type="text"
                placeholder="Masukkan email atau username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
         <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Masukkan password"
    className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-slate-500"
  >{showPassword ? "👁" : "◉"}
  </button>
</div>
            </div>

            <button type="submit" className="auth-button">
              Login →
            </button>
          </form>

          <p className="auth-switch">
            Belum punya akun?{" "}
            <Link href="/register">Daftar di sini →</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
