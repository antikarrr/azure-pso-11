import Head from "next/head";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

import SummaryStats from "../components/SummaryStats";

export default function Home() {
  return (
    <section>
      <Head>
        <title>Dashboard - Employee Management</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-5">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-10 text-white mb-8 relative overflow-hidden">
            <div className="absolute w-40 h-40 bg-white/20 rounded-full -top-10 -left-10"></div>
            <div className="absolute w-52 h-52 bg-white/10 rounded-full -bottom-20 right-0"></div>

            <h1 className="text-5xl font-bold relative">
              Dashboard
            </h1>
            <p className="mt-3 text-indigo-100 relative">
              Summary of employee data
            </p>
          </div>

          <SummaryStats />

          <div className="flex justify-end mt-8">
            <Link
              href="/employees"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl text-white font-semibold duration-200"
            >
              Lihat Daftar Karyawan
              <BiRightArrowAlt size={22} />
            </Link>
          </div>

        </div>
      </main>
    </section>
  );
}