"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/app/Components/Toast/Toast";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineSparkles,
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isUnverified, setIsUnverified] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!email.trim() || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result.error) {
        const errorMsg = result.error.message || "Invalid email or password.";
        setErrorMessage(errorMsg);

        // Check if unverified
        if (
          result.error.code === "EMAIL_NOT_VERIFIED" ||
          errorMsg.toLowerCase().includes("not verified")
        ) {
          setIsUnverified(true);
          toast.warning("Your email is not verified yet. Please verify your email first.");
        } else {
          toast.error(errorMsg);
        }
      } else {
        toast.success("Welcome back! Signed in successfully.");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google Sign-in failed.";
      toast.error(msg);
      setGoogleLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email above to resend verification link.");
      return;
    }

    setResendingEmail(true);
    try {
      const res = await authClient.sendVerificationEmail({
        email: email.trim(),
        callbackURL: `${window.location.origin}/email-verified`,
      });

      if (res.error) {
        toast.error(res.error.message || "Could not resend email.");
      } else {
        toast.success("Verification email resent! Please check your inbox & spam folder.");
      }
    } catch {
      toast.error("Failed to resend verification email. Please try again later.");
    } finally {
      setResendingEmail(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#ee162f] opacity-15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#fc6743] opacity-15 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-red-950/40">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <HiOutlineSparkles className="text-sm" />
              <span>Cinema Experience</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome{" "}
              <span className="bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent">
                Back
              </span>
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Sign in to manage your watchlist and favorite films
            </p>
          </div>

          {/* Social Sign-In (Google) */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            <span>
              {googleLoading ? "Connecting to Google..." : "Continue with Google"}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="px-3 text-xs text-gray-500 uppercase tracking-wider">
              Or continue with email
            </span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-300 mb-1.5 uppercase tracking-wider"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <HiOutlineMail className="text-lg" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (isUnverified) setIsUnverified(false);
                  }}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <HiOutlineLockClosed className="text-lg" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="text-lg" />
                  ) : (
                    <HiOutlineEye className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message Box */}
            {errorMessage && !isUnverified && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {errorMessage}
              </div>
            )}

            {/* Unverified Email Warning Box with Resend */}
            {isUnverified && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-3">
                <p className="font-semibold text-amber-300">
                  ⚠️ Email verification required
                </p>
                <p className="text-amber-200/90 leading-relaxed">
                  Your email is not verified yet. Please check your inbox for the confirmation link to activate your CineList account.
                </p>
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={resendingEmail}
                  className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-100 font-medium text-xs transition-colors disabled:opacity-60"
                >
                  {resendingEmail ? "Sending email..." : "Resend Verification Email"}
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full relative group overflow-hidden rounded-xl py-3 px-4 text-white font-semibold text-sm transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-red-600/20"
            >
              <span className="absolute inset-0 bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743]" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </span>
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 text-center text-xs text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href={
                callbackUrl && callbackUrl !== "/"
                  ? `/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`
                  : "/sign-up"
              }
              className="font-semibold text-red-400 hover:text-red-300 underline underline-offset-4 ml-1 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-black">
          <span className="loading loading-spinner loading-lg text-red-500" />
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}

