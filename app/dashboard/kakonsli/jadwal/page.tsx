
"use client";

import { useState } from "react";

type Jadwal = {
  id: number;
  nama: string;
  hari: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
};

export default function JadwalKakonsli() {
  const [jadwal, setJadwal] = useState<Jadwal[]>([
    {
      id: 1,
      nama: "Andi Saputra",
      hari: "Senin",
      tanggal: "24 November 2026",
      waktu: "07.00 - 12.00",
      lokasi: "Area Sekolah",
    },
    {
      id: 2,
      nama: "Budi Santoso",
      hari: "Selasa",
      tanggal: "25 November 2026",
      waktu: "07.00 - 12.00",
      lokasi: "Area Sekolah",
    },
  ]);

  const [nama, setNama] = useState("");
  const [hari, setHari] = useState("Senin");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("07.00 - 12.00");
  const [lokasi, setLokasi] = useState("Area Sekolah");

  function tambahJadwal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!nama.trim() || !tanggal) {
      alert("Nama guru dan tanggal wajib diisi.");
      return;
    }

    setJadwal([
      ...jadwal,
      {
        id: Date.now(),
        nama,
        hari,
        tanggal,
        waktu,
        lokasi,
      },
    ]);

    setNama("");
    setTanggal("");
    alert("Jadwal berhasil ditambahkan!");
  }

  function hapusJadwal(id: number) {
    if (confirm("Yakin ingin menghapus jadwal ini?")) {
      setJadwal(jadwal.filter((item) => item.id !== id));
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <p className="text-sm text-blue-600 font-semibold">
            SIJALink / Kakonsli
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-800">
            Pengaturan Jadwal Piket
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola jadwal piket guru dengan mudah.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Jadwal</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {jadwal.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Guru Terjadwal</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {new Set(jadwal.map((item) => item.nama)).size}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Lokasi Piket</p>
            <h2 className="mt-2 text-3xl font-bold text-purple-600">
              {new Set(jadwal.map((item) => item.lokasi)).size}
            </h2>
          </div>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">
            Tambah Jadwal Piket
          </h2>

          <form onSubmit={tambahJadwal} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Nama Guru
              </label>
              <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama guru"
                className="w-full rounded-xl border border-slate-300 p-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Hari
              </label>
              <select
                value={hari}
                onChange={(e) => setHari(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 text-sm"
              >
                {["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map(
                  (item) => (
                    <option key={item}>{item}</option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Tanggal
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Waktu
              </label>
              <input
                value={waktu}
                onChange={(e) => setWaktu(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Lokasi
              </label>
              <input
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 text-sm"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 sm:col-span-2"
            >
              + Tambah Jadwal
            </button>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-lg font-bold text-slate-800">
              Daftar Jadwal Piket
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-4">No.</th>
                  <th className="p-4">Nama Guru</th>
                  <th className="p-4">Hari</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4">Waktu</th>
                  <th className="p-4">Lokasi</th>
                  <th className="p-4">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {jadwal.map((item, index) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-medium">{item.nama}</td>
                    <td className="p-4">{item.hari}</td>
                    <td className="p-4">{item.tanggal}</td>
                    <td className="p-4">{item.waktu}</td>
                    <td className="p-4">{item.lokasi}</td>
                    <td className="p-4">
                      <button
                        onClick={() => hapusJadwal(item.id)}
                        className="rounded-lg bg-red-50 px-3 py-2 text-red-600 hover:bg-red-100"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}

                {jadwal.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-slate-500">
                      Belum ada jadwal piket.
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
