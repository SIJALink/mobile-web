
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    if (password !== konfirmasi) {
      alert("Konfirmasi password tidak sama!");
      return;
    }

    const akunLama = JSON.parse(
      localStorage.getItem("sijalink_akun") || "[]"
    );

    const emailBersih = email.trim().toLowerCase();
    const usernameBersih = username.trim().toLowerCase();

    const akunDemo = [
      "pelanggan@sijalink.test",
      "petugas@sijalink.test",
    ];

    const usernameDemo = ["pelanggan", "petugas"];

    const sudahAda = akunLama.some(
      (akun: { email: string; username: string }) =>
        akun.email.toLowerCase() === emailBersih ||
        akun.username.toLowerCase() === usernameBersih
    );

    if (
      sudahAda ||
      akunDemo.includes(emailBersih) ||
      usernameDemo.includes(usernameBersih)
    ) {
      alert("Email atau username sudah digunakan!");
      return;
    }

    const akunBaru = {
      name: nama.trim(),
      username: usernameBersih,
      email: emailBersih,
      password,
      role: "pelanggan",
    };

    localStorage.setItem(
      "sijalink_akun",
      JSON.stringify([...akunLama, akunBaru])
    );

    alert("Pendaftaran berhasil! Silakan login.");
router.push("/login");
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <section className="auth-illustration">
          <div className="auth-brand">
            <div className="auth-logo">🎧</div>
            <h1>SIJALink</h1>
            <p>
              Sistem Informasi
              <br />
              Customer Service
            </p>
          </div>
        </section>

        <section className="auth-form-panel">
          <h2>Daftar Akun</h2>
          <p className="auth-subtitle">Buat akun untuk melanjutkan</p>

          <form onSubmit={handleRegister}>
            <div className="auth-field">
              <label>Nama Lengkap</label>
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label>Konfirmasi Password</label>
              <input
                type="password"
                placeholder="Konfirmasi Password"
                value={konfirmasi}
                onChange={(e) => setKonfirmasi(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button">
              Daftar →
            </button>
          </form>

          <p className="text-center text-sm text-blue-900">
  Sudah punya akun?{" "}
  <Link
    href="/login"
    className="font-semibold text-blue-700 underline"
  >
    Login di sini →
  </Link>
</p>
        </section>
      </div>
    </main>
  );
}
