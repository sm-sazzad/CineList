"use client";

import Link from "next/link";
import { HiOutlineCheckCircle, HiOutlineSparkles } from "react-icons/hi";

export default function EmailVerifiedPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#ee162f] opacity-15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#fc6743] opacity-15 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="relative rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <HiOutlineSparkles className="text-sm" />
            <span>Account Verified</span>
          </div>

          <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
            <HiOutlineCheckCircle className="text-5xl" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Email{" "}
              <span className="bg-linear-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Verified!
              </span>
            </h1>
            <p className="text-gray-300 text-sm">
              Your email address has been verified successfully.
            </p>
          </div>

          <p className="text-gray-400 text-xs leading-relaxed">
            Your CineList account is now active. You can now sign in to explore movies, save to your watchlist, and enjoy all features.
          </p>

          <div className="pt-3 flex flex-col gap-3">
            <Link
              href="/sign-in"
              className="w-full relative group overflow-hidden rounded-xl py-3 px-4 text-white font-semibold text-sm transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-red-600/20 text-center"
            >
              <span className="absolute inset-0 bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743]" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative">Sign In Now</span>
            </Link>

            <Link
              href="/"
              className="w-full py-2.5 px-4 rounded-xl text-center text-gray-300 hover:text-white font-medium text-xs bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

