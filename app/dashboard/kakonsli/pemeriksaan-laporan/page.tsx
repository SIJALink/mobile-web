
"use client";

import { useState } from "react";

type Laporan = {
  id: number;
  nama: string;
  jenis: string;
  tanggal: string;
  kegiatan: string;
  status: "Menunggu" | "Disetujui" | "Perlu Revisi";
  catatan: string;
};

export default function PemeriksaanLaporan() {
  const [laporan, setLaporan] = useState<Laporan[]>([
    {
      id: 1,
      nama: "Andi Saputra",
      jenis: "Laporan Piket",
      tanggal: "24 November 2026",
      kegiatan: "Melaksanakan piket pagi dan memeriksa kebersihan lingkungan sekolah.",
      status: "Menunggu",
      catatan: "",
    },
    {
      id: 2,
      nama: "Budi Santoso",
      jenis: "Laporan Kegiatan",
      tanggal: "24 November 2026",
      kegiatan: "Mengawasi kegiatan siswa selama jam istirahat.",
      status: "Disetujui",
      catatan: "Laporan sudah sesuai.",
    },
    {
      id: 3,
      nama: "Dewi Lestari",
      jenis: "Laporan Piket",
      tanggal: "23 November 2026",
      kegiatan: "Melaksanakan pemeriksaan ruang kelas dan lingkungan sekolah.",
      status: "Perlu Revisi",
      catatan: "Mohon lengkapi dokumentasi kegiatan.",
    },
  ]);

  const [filter, setFilter] = useState("Semua");
  const [pencarian, setPencarian] = useState("");
  const [laporanDipilih, setLaporanDipilih] = useState<Laporan | null>(null);
  const [catatan, setCatatan] = useState("");

  const laporanTampil = laporan.filter((item) => {
    const cocokNama = item.nama
      .toLowerCase()
      .includes(pencarian.toLowerCase());

    const cocokStatus =
      filter === "Semua" || item.status === filter;

    return cocokNama && cocokStatus;
  });

  function ubahStatus(
    id: number,
    status: Laporan["status"],
    isiCatatan: string
  ) {
    setLaporan((sebelumnya) =>
      sebelumnya.map((item) =>
        item.id === id
          ? { ...item, status, catatan: isiCatatan }
          : item
      )
    );

    setLaporanDipilih(null);
    setCatatan("");
    alert(
      status === "Disetujui"
        ? "Laporan berhasil disetujui."
        : "Laporan dikembalikan untuk revisi."
    );
  }

  const totalMenunggu = laporan.filter(
    (item) => item.status === "Menunggu"
  ).length;

  const totalDisetujui = laporan.filter(
    (item) => item.status === "Disetujui"
  ).length;

  const totalRevisi = laporan.filter(
    (item) => item.status === "Perlu Revisi"
  ).length;

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl space-y-6">

        <div>
          <p className="text-sm font-semibold text-blue-600">
            SIJALink / Kakonsli
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-800">
            Pemeriksaan Laporan
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Periksa dan berikan keputusan terhadap laporan guru.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Menunggu Pemeriksaan</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              {totalMenunggu}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Laporan Disetujui</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {totalDisetujui}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Perlu Revisi</p>
            <h2 className="mt-2 text-3xl font-bold text-red-500">
              {totalRevisi}
            </h2>
          </div>
        </div>

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Daftar Laporan Guru
              </h2>
              <p className="text-sm text-slate-500">
                Periksa laporan yang telah dikirimkan.
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
            {["Semua", "Menunggu", "Disetujui", "Perlu Revisi"].map(
              (item) => (
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
              )
            )}
          </div>

          <div className="overflow-x-auto p-6">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-4">No.</th>
                  <th className="p-4">Nama Guru</th>
                  <th className="p-4">Jenis Laporan</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {laporanTampil.map((item, index) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-semibold text-slate-700">
                      {item.nama}
                    </td>
                    <td className="p-4">{item.jenis}</td>
                    <td className="p-4">{item.tanggal}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Disetujui"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Menunggu"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          setLaporanDipilih(item);
                          setCatatan(item.catatan);
                        }}
                        className="rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-600 hover:bg-blue-100"
                      >
                        Periksa
                      </button>
                    </td>
                  </tr>
                ))}

                {laporanTampil.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      Laporan tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {laporanDipilih && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">
                  Detail Pemeriksaan
                </h2>
                <button
                  onClick={() => setLaporanDipilih(null)}
                  className="text-xl text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <p><strong>Nama Guru:</strong> {laporanDipilih.nama}</p>
                <p><strong>Jenis:</strong> {laporanDipilih.jenis}</p>
                <p><strong>Tanggal:</strong> {laporanDipilih.tanggal}</p>

                <div>
                  <p className="mb-2 font-semibold">Isi Laporan:</p>
                  <div className="rounded-xl bg-slate-50 p-4 text-slate-600">
                    {laporanDipilih.kegiatan}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-semibold">
                    Catatan Pemeriksaan
                  </label>
                  <textarea
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    rows={3}
                    placeholder="Tulis catatan untuk guru..."
                    className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap justify-end gap-2">
                <button
                  onClick={() => setLaporanDipilih(null)}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600"
                >
                  Tutup
                </button>

                <button
                  onClick={() =>
                    ubahStatus(
                      laporanDipilih.id,
                      "Perlu Revisi",
                      catatan || "Mohon perbaiki laporan."
                    )
                  }
                  className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                >
                  Minta Revisi
                </button>

                <button
                  onClick={() =>
                    ubahStatus(
                      laporanDipilih.id,
                      "Disetujui",
                      catatan || "Laporan sudah sesuai."
                    )
                  }
                  className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Setujui Laporan
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
