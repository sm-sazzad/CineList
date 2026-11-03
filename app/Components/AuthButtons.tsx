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
  const [imgError, setImgError] = useState(false);

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
      <div className="flex items-center gap-2">
        <div className="h-9 sm:h-10 w-24 rounded-full bg-white/10 animate-pulse" />
      </div>
    );
  }

  if (session?.user) {
    const user = session.user;
    const displayName = user.name || user.email?.split("@")[0] || "User";
    const initial = displayName.charAt(0).toUpperCase();

    return (
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* User Profile Badge (Standard h-9 sm:h-10 height) */}
        <div
          className="h-9 sm:h-10 flex items-center gap-2 px-2.5 sm:px-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all max-w-[120px] xl:max-w-[180px] shadow-sm shrink-0"
          title={displayName}
        >
          {user.image && !imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={displayName}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover ring-1 ring-red-500/50 shadow-sm shrink-0"
            />
          ) : (
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-linear-to-tr from-[#ee162f] via-[#fd3148] to-[#fc6743] flex items-center justify-center text-white text-[11px] sm:text-xs font-bold shrink-0 shadow-sm">
              {initial}
            </div>
          )}
          <span className="text-white text-xs sm:text-sm font-semibold truncate">
            {displayName}
          </span>
        </div>

        {/* Sign Out Button (Matching h-9 sm:h-10 height) */}
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          title="Sign Out"
          className="h-9 sm:h-10 cursor-pointer group flex items-center gap-1.5 px-3 xl:px-3.5 rounded-full bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/40 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 disabled:opacity-60 shadow-sm active:scale-95 shrink-0"
        >
          {isSigningOut ? (
            <span className="loading loading-spinner loading-xs text-red-500" />
          ) : (
            <HiOutlineLogout className="text-sm group-hover:text-red-400 transition-colors" />
          )}
          <span className="hidden xl:inline">Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {/* Sign In */}
      <Link
        href="/sign-in"
        className="h-9 sm:h-10 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 flex items-center justify-center transition-all duration-200"
      >
        Sign In
      </Link>

      {/* Sign Up */}
      <Link
        href="/sign-up"
        className="h-9 sm:h-10 px-3.5 sm:px-4.5 rounded-full text-xs sm:text-sm font-bold text-white bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] hover:from-[#fd3148] hover:to-[#fc6743] shadow-md shadow-red-600/30 flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <HiOutlineUser className="text-sm" />
        <span>Sign Up</span>
      </Link>
    </div>
  );
};
