
"use client";

import { useState } from "react";

type Guru = {
  id: number;
  nama: string;
  nip: string;
  jabatan: string;
  telepon: string;
  status: string;
};

export default function ManajemenGuru() {
  const [guru, setGuru] = useState<Guru[]>([
    {
      id: 1,
      nama: "Andi Saputra",
      nip: "198701012010011001",
      jabatan: "Guru Matematika",
      telepon: "081234567890",
      status: "Aktif",
    },
    {
      id: 2,
      nama: "Budi Santoso",
      nip: "198805152012011002",
      jabatan: "Guru Bahasa Indonesia",
      telepon: "081234567891",
      status: "Aktif",
    },
    {
      id: 3,
      nama: "Dewi Lestari",
      nip: "199002102015012003",
      jabatan: "Guru IPA",
      telepon: "081234567892",
      status: "Tidak Aktif",
    },
  ]);

  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [telepon, setTelepon] = useState("");
  const [status, setStatus] = useState("Aktif");
  const [pencarian, setPencarian] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const guruTampil = guru.filter((item) =>
    item.nama.toLowerCase().includes(pencarian.toLowerCase()) ||
    item.nip.includes(pencarian)
  );

  function simpanGuru(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!nama.trim() || !nip.trim() || !jabatan.trim() || !telepon.trim()) {
      alert("Semua data wajib diisi.");
      return;
    }

    if (editId !== null) {
      setGuru(
        guru.map((item) =>
          item.id === editId
            ? { ...item, nama, nip, jabatan, telepon, status }
            : item
        )
      );
      alert("Data guru berhasil diperbarui.");
    } else {
      setGuru([
        ...guru,
        {
          id: Date.now(),
          nama,
          nip,
          jabatan,
          telepon,
          status,
        },
      ]);
      alert("Data guru berhasil ditambahkan.");
    }

    resetForm();
  }

  function editGuru(item: Guru) {
    setEditId(item.id);
    setNama(item.nama);
    setNip(item.nip);
    setJabatan(item.jabatan);
    setTelepon(item.telepon);
    setStatus(item.status);
  }

  function hapusGuru(id: number) {
    if (confirm("Yakin ingin menghapus data guru ini?")) {
      setGuru(guru.filter((item) => item.id !== id));
    }
  }

  function resetForm() {
    setEditId(null);
    setNama("");
    setNip("");
    setJabatan("");
    setTelepon("");
    setStatus("Aktif");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            SIJALink / Kakonsli
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-800">
            Manajemen Data Guru
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola informasi dan data guru sekolah.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Guru</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {guru.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Guru Aktif</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {guru.filter((item) => item.status === "Aktif").length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Guru Tidak Aktif</p>
            <h2 className="mt-2 text-3xl font-bold text-red-500">
              {guru.filter((item) => item.status === "Tidak Aktif").length}
            </h2>
          </div>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">
            {editId !== null ? "Edit Data Guru" : "Tambah Data Guru"}
          </h2>

          <form onSubmit={simpanGuru} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Nama Guru</label>
              <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama guru"
                className="w-full rounded-xl border border-slate-300 p-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">NIP</label>
              <input
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                placeholder="Masukkan NIP"
                className="w-full rounded-xl border border-slate-300 p-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Jabatan</label>
              <input
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                placeholder="Contoh: Guru Matematika"
                className="w-full rounded-xl border border-slate-300 p-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Nomor Telepon</label>
              <input
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
                placeholder="Masukkan nomor telepon"
                className="w-full rounded-xl border border-slate-300 p-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 text-sm"
              >
                <option>Aktif</option>
                <option>Tidak Aktif</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {editId !== null ? "Simpan Perubahan" : "+ Tambah Guru"}
              </button>

              {editId !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Daftar Data Guru
              </h2>
              <p className="text-sm text-slate-500">
                Informasi seluruh guru yang terdaftar.
              </p>
            </div>

            <input
              value={pencarian}
              onChange={(e) => setPencarian(e.target.value)}
              placeholder="Cari nama atau NIP..."
              className="rounded-xl border border-slate-300 p-3 text-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-4">No.</th>
                  <th className="p-4">Nama Guru</th>
                  <th className="p-4">NIP</th>
                  <th className="p-4">Jabatan</th>
                  <th className="p-4">Telepon</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {guruTampil.map((item, index) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-medium">{item.nama}</td>
                    <td className="p-4">{item.nip}</td>
                    <td className="p-4">{item.jabatan}</td>
                    <td className="p-4">{item.telepon}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Aktif"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="flex gap-2 p-4">
                      <button
                        onClick={() => editGuru(item)}
                        className="rounded-lg bg-blue-50 px-3 py-2 text-blue-600 hover:bg-blue-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => hapusGuru(item.id)}
                        className="rounded-lg bg-red-50 px-3 py-2 text-red-600 hover:bg-red-100"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}

                {guruTampil.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-slate-500">
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
