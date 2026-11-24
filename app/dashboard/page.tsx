"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const adminMenus = [
  ["▦", "Dashboard"],
  ["♟", "Data Petugas"],
  ["▣", "Jadwal Piket"],
  ["✓", "Monitoring Checklist"],
  ["▤", "Laporan Harian Piket"],
  ["▧", "Dokumentasi Foto/Video"],
  ["📍", "Monitoring Live Location"],
  ["◉", "Pengaduan Pelanggan"],
  ["▦", "Riwayat Verifikasi QR"],
  ["♙", "Profil Admin"],
];

const kepalaMenus = [
  ["▦", "Dashboard"],
  ["▣", "Penugasan Harian"],
  ["◉", "Monitoring Pengaduan"],
  ["♟", "Laporan Pelanggan Baru"],
  ["⚠", "Laporan Gangguan"],
  ["▥", "Laporan Kinerja Petugas"],
  ["✓", "Pemeriksaan Laporan"],
  ["▥", "Monitoring Pelaksanaan Piket"],
  ["▧", "Dokumentasi Foto/Video"],
  ["📍", "Monitoring Live Location"],
  ["♙", "Profil Kepala SITE"],
];

const kakonsliMenus = [
  ["▦", "Dashboard"],
  ["▣", "Pengaturan Jadwal Piket"],
  ["♟", "Manajemen Data Guru"],
  ["📍", "Monitoring Lokasi"],
  ["✓", "Pemeriksaan Laporan"],
  ["♙", "Profil Kakonsli"],
];

const adminRoutes: Record<string, string> = {
  Dashboard: "/dashboard",
  "Data Petugas": "/dashboard/petugas",
  "Jadwal Piket": "/dashboard/guru-piket",
  "Monitoring Checklist": "/dashboard/checklist",
  "Laporan Harian Piket": "/dashboard/laporan-piket",
  "Dokumentasi Foto/Video": "/dashboard/dokumentasi",
  "Monitoring Live Location": "/dashboard/monitoring-lokasi",
  "Pengaduan Pelanggan": "/dashboard/pengaduan",
  "Riwayat Verifikasi QR": "/dashboard/riwayat-qr",
  "Profil Admin": "/dashboard/profil",
};

const kepalaRoutes: Record<string, string> = {
  Dashboard: "/dashboard",
  "Penugasan Harian": "/dashboard/penugasan",
  "Monitoring Pengaduan": "/dashboard/monitoring-pengaduan",
  "Laporan Pelanggan Baru": "/dashboard/laporan-pelanggan-baru",
  "Laporan Gangguan": "/dashboard/laporan-gangguan",
  "Laporan Kinerja Petugas": "/dashboard/laporan-kinerja",
  "Pemeriksaan Laporan": "/dashboard/pemeriksaan-laporan",
  "Monitoring Pelaksanaan Piket": "/dashboard/monitoring-piket",
  "Dokumentasi Foto/Video": "/dashboard/dokumentasi-kepala",
  "Monitoring Live Location": "/dashboard/lokasi-kepala",
  "Profil Kepala SITE": "/dashboard/profil-kepala",
};

const kakonsliRoutes: Record<string, string> = {
  Dashboard: "/dashboard",
  "Pengaturan Jadwal Piket": "/dashboard/kakonsli/jadwal",
  "Manajemen Data Guru": "/dashboard/kakonsli/guru",
  "Monitoring Lokasi": "/dashboard/kakonsli/lokasi",
  "Pemeriksaan Laporan": "/dashboard/kakonsli/pemeriksaan-laporan",
  "Profil Kakonsli": "/dashboard/kakonsli/profil",
};

const stats = [
  ["♟", "24", "Total Petugas"],
  ["▦", "5", "Jadwal Piket Aktif"],
  ["▰", "12", "Pengaduan Baru"],
  ["▤", "8", "Laporan Masuk"],
];

const activities = [
  ["▣", "Jadwal piket diperbarui oleh Admin", "1 jam yang lalu"],
  ["▰", "Pengaduan baru dari Pelanggan", "2 jam yang lalu"],
  ["✓", "Laporan aktivitas petugas telah diisi", "3 jam yang lalu"],
  ["♟", "Data petugas baru ditambahkan", "1 hari yang lalu"],
];

const kakonsliStats = [
  ["♟", "12", "Total Guru"],
  ["▣", "5", "Jadwal Piket"],
  ["▤", "3", "Laporan Menunggu"],
  ["📍", "8", "Lokasi Aktif"],
];

const kakonsliActivities = [
  ["▣", "Jadwal piket guru diperbarui", "1 jam yang lalu"],
  ["♟", "Data guru baru ditambahkan", "2 jam yang lalu"],
  ["▤", "Laporan guru menunggu pemeriksaan", "3 jam yang lalu"],
  ["📍", "Pembaruan monitoring lokasi guru", "4 jam yang lalu"],
];

export default function Dashboard() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState("admin");
  const [namaPengguna, setNamaPengguna] = useState("Admin");

  useEffect(() => {
    const dataUser = localStorage.getItem("sijalink_user");

    if (dataUser) {
      try {
        const user = JSON.parse(dataUser);
        setRole(user.role);
        setNamaPengguna(user.name || "Pengguna SIJALink");
      } catch {
        console.error("Data akun tidak valid");
      }
    }
  }, []);

  const dashboardStats =
    role === "kakonsli" ? kakonsliStats : stats;

  const dashboardActivities =
    role === "kakonsli" ? kakonsliActivities : activities;

  const monitoringTitle =
    role === "kakonsli"
      ? "Monitoring Lokasi Guru"
      : "Monitoring Lokasi Petugas";

  const reportTitle =
    role === "kakonsli"
      ? "Pemeriksaan Laporan"
      : "Ringkasan Laporan";

  const monitoringRoute =
    role === "kakonsli"
      ? "/dashboard/kakonsli/lokasi"
      : role === "kepala"
      ? "/dashboard/lokasi-kepala"
      : "/dashboard/monitoring-lokasi";

  const reportRoute =
    role === "kakonsli"
      ? "/dashboard/kakonsli/pemeriksaan-laporan"
      : role === "kepala"
      ? "/dashboard/pemeriksaan-laporan"
      : "/dashboard/laporan-piket";

  const menus =
    role === "admin"
      ? adminMenus
      : role === "kepala"
      ? kepalaMenus
      : role === "kakonsli"
      ? kakonsliMenus
      : [];

  const routes =
    role === "admin"
      ? adminRoutes
      : role === "kepala"
      ? kepalaRoutes
      : role === "kakonsli"
      ? kakonsliRoutes
      : {};

  const roleName =
    role === "kepala"
      ? "Kepala SITE"
      : role === "kakonsli"
      ? "Kakonsli"
      : "Administrator";

  const initials =
    namaPengguna
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  function handleLogout() {
    localStorage.removeItem("sijalink_user");
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform bg-blue-950 p-6 text-white transition-transform duration-300 md:static md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl font-bold text-blue-950">
            S
          </div>

          <div>
            <h1 className="text-xl font-bold">SIJALink</h1>
            <p className="text-xs text-blue-200">
              Integrated Service System
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-xl bg-blue-900 p-4">
          <p className="text-xs text-blue-200">Login sebagai</p>
          <p className="mt-1 font-semibold">{roleName}</p>
          <p className="mt-1 text-xs text-blue-200">
            {namaPengguna}
          </p>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue-300">
          Menu Utama
        </p>

        <nav className="space-y-2">
          {menus.map(([icon, label]) => (
            <Link
              key={label}
              href={routes[label]}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-blue-100 transition hover:bg-blue-800 hover:text-white"
            >
              <span className="w-6 text-lg">{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 w-full border-t border-blue-800 pt-6 text-left text-sm text-blue-100 hover:text-white"
        >
          ⇥ Logout
        </button>
      </aside>

      {/* OVERLAY MOBILE */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}

      {/* KONTEN UTAMA */}
      <main className="min-w-0 flex-1">
        {/* HEADER */}
        <header className="flex items-center justify-between border-b bg-white px-5 py-5 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg border px-3 py-2 text-xl text-slate-700 md:hidden"
            >
              ☰
            </button>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Dashboard SIJALink
              </h2>
              <p className="text-sm text-slate-500">
                Sistem Informasi dan Layanan Terintegrasi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {namaPengguna}
              </p>
              <p className="text-xs text-slate-500">{roleName}</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800">
              {initials}
            </div>
          </div>
        </header>

        <div className="space-y-7 p-5 md:p-8">
          {/* SAMBUTAN */}
          <section className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-600 p-7 text-white shadow-sm">
            <p className="text-sm text-blue-100">
              Selamat datang di SIJALink
            </p>

            <h1 className="mt-2 text-2xl font-bold md:text-3xl">
              Halo, {namaPengguna}! 👋
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
              {role === "kakonsli"
                ? "Kelola jadwal piket, data guru, monitoring lokasi, dan pemeriksaan laporan melalui dashboard Kakonsli."
                : role === "kepala"
                ? "Pantau aktivitas petugas, pengaduan pelanggan, penugasan, dan laporan melalui dashboard Kepala SITE."
                : "Kelola data petugas, jadwal piket, pengaduan pelanggan, dan aktivitas layanan melalui dashboard Admin."}
            </p>

            <div className="mt-5 inline-flex rounded-lg bg-white/15 px-4 py-2 text-sm">
              Login sebagai {roleName}
            </div>
          </section>

          {/* STATISTIK */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-800">
                Ringkasan Informasi
              </h2>
              <p className="text-sm text-slate-500">
                Informasi umum aktivitas SIJALink
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {dashboardStats.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">
                        {item[2]}
                      </p>
                      <h3 className="mt-2 text-3xl font-bold text-slate-800">
                        {item[1]}
                      </h3>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl text-blue-700">
                      {item[0]}
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-400">
                    Data contoh dashboard
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* AKTIVITAS DAN MONITORING */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* AKTIVITAS */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-2">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Aktivitas Terbaru
                  </h2>
                  <p className="text-sm text-slate-500">
                    Informasi aktivitas terakhir
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {dashboardActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-lg text-blue-700">
                      {activity[0]}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700">
                        {activity[1]}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {activity[2]}
                      </p>
                    </div>

                    <span className="text-xs text-green-600">
                      ●
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* MONITORING LOKASI */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-800">
                    {monitoringTitle}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Ringkasan pemantauan lokasi
                  </p>
                </div>

                <span className="text-2xl">📍</span>
              </div>

              <div className="mt-5 flex h-40 items-center justify-center rounded-xl bg-blue-50">
                <div className="text-center">
                  <div className="text-5xl">🗺️</div>
                  <p className="mt-2 text-sm font-semibold text-blue-900">
                    Peta Monitoring
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Tampilan lokasi
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">
                    {role === "kakonsli"
                      ? "Guru Aktif"
                      : "Petugas Aktif"}
                  </p>
                  <p className="mt-1 text-xl font-bold text-slate-800">
                    {role === "kakonsli" ? "8 Guru" : "18 Petugas"}
                  </p>
                </div>

                <Link
                  href={monitoringRoute}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Lihat Detail →
                </Link>
              </div>
            </div>
          </section>

          {/* LAPORAN */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {reportTitle}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {role === "kakonsli"
                    ? "Kelola dan periksa laporan aktivitas guru piket."
                    : "Pantau laporan dan aktivitas layanan SIJALink."}
                </p>
              </div>

              <Link
                href={reportRoute}
                className="rounded-xl bg-blue-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                {role === "kakonsli"
                  ? "Periksa Laporan →"
                  : "Lihat Laporan →"}
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-sm text-slate-500">
                  Status Sistem
                </p>
                <p className="mt-2 font-bold text-blue-800">
                  Sistem SIJALink
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Tampilan dashboard aktif
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-sm text-slate-500">
                  Aktivitas
                </p>
                <p className="mt-2 font-bold text-green-700">
                  Monitoring
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Pemantauan kegiatan
                </p>
              </div>

              <div className="rounded-xl bg-orange-50 p-4">
                <p className="text-sm text-slate-500">
                  Pemeriksaan
                </p>
                <p className="mt-2 font-bold text-orange-700">
                  Laporan
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Informasi laporan kegiatan
                </p>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pb-4 text-center text-xs text-slate-400">
            © 2026 SIJALink — Integrated Customer Service & Field Service Management System
          </footer>
        </div>
      </main>
    </div>
  );
}