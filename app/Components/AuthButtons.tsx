"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";

export const AuthButtons = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      toast.success("Signed out successfully.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="hidden sm:flex items-center gap-3">
        <div className="h-8 w-20 rounded-full bg-white/10 animate-pulse" />
        <div className="h-8 w-20 rounded-full bg-white/10 animate-pulse" />
      </div>
    );
  }

  if (session?.user) {
    const user = session.user;
    const displayName = user.name || user.email?.split("@")[0] || "User";
    const initial = displayName.charAt(0).toUpperCase();

    return (
      <div className="flex items-center gap-3">
        {/* User Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 max-w-[170px]">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={displayName}
              className="w-6 h-6 rounded-full object-cover border border-red-500/40"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-linear-to-tr from-[#ee162f] to-[#fc6743] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {initial}
            </div>
          )}
          <span
            className="text-white text-xs font-medium truncate"
            title={displayName}
          >
            {displayName}
          </span>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          title="Sign Out"
          className="cursor-pointer group flex items-center gap-1.5 px-3 py-2.5 rounded-full border border-white/20 hover:border-red-500/60 bg-transparent hover:bg-red-500/10 text-gray-300 hover:text-white text-xs font-medium transition-all duration-300 disabled:opacity-60"
        >
          {isSigningOut ? (
            <span className="loading loading-spinner loading-xs text-red-500" />
          ) : (
            <HiOutlineLogout className="text-sm group-hover:text-red-400 transition-colors" />
          )}
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Sign In */}
      <Link
        href="/sign-in"
        className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-gray-200 hover:text-white hover:bg-white/5 transition-all duration-200"
      >
        Sign In
      </Link>

      {/* Sign Up */}
      <Link
        href="/sign-up"
        className="relative group overflow-hidden px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-red-600/20"
      >
        <span className="absolute inset-0 bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743]" />
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
        <span className="relative flex items-center gap-1.5">
          <HiOutlineUser className="text-sm" />
          <span>Sign Up</span>
        </span>
      </Link>
    </div>
  );
};

