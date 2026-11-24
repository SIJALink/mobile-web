
"use client";

import { useEffect, useState } from "react";

type Profil = {
  nama: string;
  username: string;
  email: string;
  telepon: string;
  jabatan: string;
  wilayah: string;
};

const profilAwal: Profil = {
  nama: "Kakonsli SIJALink",
  username: "kakonsli",
  email: "kakonsli@sijalink.test",
  telepon: "081234567890",
  jabatan: "Kakonsli",
  wilayah: "Wilayah Sekolah",
};

export default function ProfilKakonsli() {
  const [profil, setProfil] = useState<Profil>(profilAwal);
  const [foto, setFoto] = useState("");
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    const dataProfil = localStorage.getItem("profil_kakonsli");
    const dataFoto = localStorage.getItem("foto_kakonsli");

    if (dataProfil) {
      try {
        setProfil({ ...profilAwal, ...JSON.parse(dataProfil) });
      } catch {
        console.error("Data profil tidak valid.");
      }
    }

    if (dataFoto) {
      setFoto(dataFoto);
    }
  }, []);

  function ubahData(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setProfil((sebelumnya) => ({
      ...sebelumnya,
      [name]: value,
    }));
  }

  function gantiFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran foto maksimal 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const hasil = reader.result as string;
      setFoto(hasil);
      localStorage.setItem("foto_kakonsli", hasil);
    };

    reader.readAsDataURL(file);
  }

  function simpanProfil(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    localStorage.setItem("profil_kakonsli", JSON.stringify(profil));
    setPesan("Profil berhasil disimpan!");

    setTimeout(() => setPesan(""), 3000);
  }

  function resetProfil() {
    if (confirm("Yakin ingin mengembalikan profil ke data awal?")) {
      setProfil(profilAwal);
      localStorage.removeItem("profil_kakonsli");
      setPesan("Profil berhasil dikembalikan ke data awal!");

      setTimeout(() => setPesan(""), 3000);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <div>
          <p className="text-sm font-semibold text-blue-600">
            SIJALink / Kakonsli
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-800">
            Profil Kakonsli
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola informasi akun dan profil Kakonsli.
          </p>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-4xl font-bold text-blue-600">
              {foto ? (
                <img
                  src={foto}
                  alt="Foto profil Kakonsli"
                  className="h-full w-full object-cover"
                />
              ) : (
                "K"
              )}
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-slate-800">
                {profil.nama}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {profil.jabatan}
              </p>

              <label className="mt-3 inline-block cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                Ganti Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={gantiFoto}
                  className="hidden"
                />
              </label>

              <p className="mt-2 text-xs text-slate-400">
                Format gambar, maksimal 2 MB.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-slate-800">
            Informasi Profil
          </h2>

          {pesan && (
            <div className="mb-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">
              {pesan}
            </div>
          )}

          <form onSubmit={simpanProfil} className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Nama Lengkap
              </label>
              <input
                name="nama"
                value={profil.nama}
                onChange={ubahData}
                required
                className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Username
              </label>
              <input
                name="username"
                value={profil.username}
                onChange={ubahData}
                required
                className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profil.email}
                onChange={ubahData}
                required
                className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Nomor Telepon
              </label>
              <input
                name="telepon"
                value={profil.telepon}
                onChange={ubahData}
                required
                className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Jabatan
              </label>
              <input
                value={profil.jabatan}
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-slate-100 p-3 text-sm text-slate-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Wilayah
              </label>
              <input
                name="wilayah"
                value={profil.wilayah}
                onChange={ubahData}
                required
                className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-3 sm:col-span-2">
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Simpan Perubahan
              </button>

              <button
                type="button"
                onClick={resetProfil}
                className="rounded-xl bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-300"
              >
                Reset Profil
              </button>
            </div>
          </form>
        </section>

      </div>
    </main>
  );
}
