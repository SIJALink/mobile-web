
"use client";

import { useState } from "react";

type LokasiGuru = {
  id: number;
  nama: string;
  jabatan: string;
  lokasi: string;
  waktu: string;
  status: "Aktif" | "Tidak Aktif";
};

export default function MonitoringLokasi() {
  const [guru] = useState<LokasiGuru[]>([
    {
      id: 1,
      nama: "Andi Saputra",
      jabatan: "Guru Matematika",
      lokasi: "Area Gerbang Sekolah",
      waktu: "08.15 WIB",
      status: "Aktif",
    },
    {
      id: 2,
      nama: "Budi Santoso",
      jabatan: "Guru Bahasa Indonesia",
      lokasi: "Area Lapangan",
      waktu: "08.10 WIB",
      status: "Aktif",
    },
    {
      id: 3,
      nama: "Dewi Lestari",
      jabatan: "Guru IPA",
      lokasi: "Belum tersedia",
      waktu: "07.30 WIB",
      status: "Tidak Aktif",
    },
    {
      id: 4,
      nama: "Rizky Pratama",
      jabatan: "Guru Olahraga",
      lokasi: "Area Kantin",
      waktu: "08.05 WIB",
      status: "Aktif",
    },
  ]);

  const [pencarian, setPencarian] = useState("");
  const [filter, setFilter] = useState("Semua");

  const guruTampil = guru.filter((item) => {
    const cocokNama = item.nama
      .toLowerCase()
      .includes(pencarian.toLowerCase());

    const cocokStatus =
      filter === "Semua" || item.status === filter;

    return cocokNama && cocokStatus;
  });

  const totalAktif = guru.filter(
    (item) => item.status === "Aktif"
  ).length;

  const totalTidakAktif = guru.filter(
    (item) => item.status === "Tidak Aktif"
  ).length;

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl space-y-6">

        <div>
          <p className="text-sm font-semibold text-blue-600">
            SIJALink / Kakonsli
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-800">
            Monitoring Lokasi
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Pantau informasi lokasi guru selama kegiatan piket.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Guru</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {guru.length}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Guru terdaftar
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Lokasi Aktif</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {totalAktif}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Sedang membagikan lokasi
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Lokasi Tidak Aktif</p>
            <h2 className="mt-2 text-3xl font-bold text-red-500">
              {totalTidakAktif}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Lokasi belum tersedia
            </p>
          </div>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Peta Monitoring
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Gambaran area pemantauan lokasi guru.
              </p>
            </div>
            <span className="w-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
              Peta ilustrasi
            </span>
          </div>

          <div className="relative mt-5 flex h-72 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
                backgroundSize: "35px 35px",
              }}
            />

            <div className="relative grid grid-cols-2 gap-8 sm:gap-16">
              <div className="rounded-xl bg-white p-4 text-center shadow-md">
                <span className="text-3xl">📍</span>
                <p className="mt-1 text-xs font-semibold text-slate-700">
                  Gerbang Sekolah
                </p>
              </div>

              <div className="rounded-xl bg-white p-4 text-center shadow-md">
                <span className="text-3xl">📍</span>
                <p className="mt-1 text-xs font-semibold text-slate-700">
                  Lapangan
                </p>
              </div>

              <div className="rounded-xl bg-white p-4 text-center shadow-md">
                <span className="text-3xl">📍</span>
                <p className="mt-1 text-xs font-semibold text-slate-700">
                  Area Kantin
                </p>
              </div>

              <div className="rounded-xl bg-white p-4 text-center shadow-md">
                <span className="text-3xl">🏫</span>
                <p className="mt-1 text-xs font-semibold text-slate-700">
                  Gedung Sekolah
                </p>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Posisi pada tampilan ini hanya contoh, bukan koordinat GPS asli.
          </p>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Daftar Lokasi Guru
              </h2>
              <p className="text-sm text-slate-500">
                Informasi status lokasi setiap guru.
              </p>
            </div>

            <input
              value={pencarian}
              onChange={(e) => setPencarian(e.target.value)}
              placeholder="Cari nama guru..."
              className="rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-2 px-6 pt-4">
            {["Semua", "Aktif", "Tidak Aktif"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  filter === item
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto p-6">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-4">No.</th>
                  <th className="p-4">Nama Guru</th>
                  <th className="p-4">Jabatan</th>
                  <th className="p-4">Lokasi Terakhir</th>
                  <th className="p-4">Pembaruan</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {guruTampil.map((item, index) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-semibold text-slate-700">
                      {item.nama}
                    </td>
                    <td className="p-4">{item.jabatan}</td>
                    <td className="p-4">{item.lokasi}</td>
                    <td className="p-4">{item.waktu}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Aktif"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {guruTampil.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-6 text-center text-slate-500"
                    >
                      Data guru tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
}
