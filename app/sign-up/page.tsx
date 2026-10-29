"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineSparkles,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [signedUpSuccess, setSignedUpSuccess] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL: `${window.location.origin}/email-verified`,
      });

      if (result.error) {
        toast.error(result.error.message || "Failed to create account.");
      } else {
        setSignedUpSuccess(true);
        toast.success("Account created! Verification email has been sent.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
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
      toast.error("Failed to resend verification email.");
    } finally {
      setResendingEmail(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#ee162f] opacity-15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#fc6743] opacity-15 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md">
        {signedUpSuccess ? (
          /* Post-Registration Verification Notice */
          <div className="relative rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <HiOutlineCheckCircle className="text-4xl" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Verify Your Email
              </h2>
              <p className="text-gray-300 text-sm">
                We sent a verification link to:
              </p>
              <p className="text-red-400 font-semibold text-sm break-all">
                {email}
              </p>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed">
              Please click the link in that email to activate your account and start exploring CineList. If you don&apos;t see it, check your spam/junk folder.
            </p>

            <div className="pt-2 flex flex-col gap-3">
              <Link
                href={`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="w-full py-3 px-4 rounded-xl text-center text-white font-semibold text-sm bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] hover:opacity-95 transition-all shadow-lg shadow-red-600/20"
              >
                Proceed to Sign In
              </Link>

              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resendingEmail}
                className="cursor-pointer text-xs text-gray-400 hover:text-white transition-colors underline underline-offset-4 disabled:opacity-60"
              >
                {resendingEmail ? "Resending email..." : "Didn't receive email? Click to resend"}
              </button>
            </div>
          </div>
        ) : (
          /* Sign Up Card */
          <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-red-950/40">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <HiOutlineSparkles className="text-sm" />
                <span>Join CineList</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Create an{" "}
                <span className="bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent">
                  Account
                </span>
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                Join thousands of film enthusiasts tracking cinema today
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
                Or register with email
              </span>
              <div className="flex-1 border-t border-white/10"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-gray-300 mb-1.5 uppercase tracking-wider"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <HiOutlineUser className="text-lg" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
                  />
                </div>
              </div>

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
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-300 mb-1.5 uppercase tracking-wider"
                >
                  Password (min 6 characters)
                </label>
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

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-medium text-gray-300 mb-1.5 uppercase tracking-wider"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <HiOutlineLockClosed className="text-lg" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <HiOutlineEyeOff className="text-lg" />
                    ) : (
                      <HiOutlineEye className="text-lg" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
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
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <span>Sign Up</span>
                    )}
                  </span>
                </button>
              </div>
            </form>

            {/* Footer Navigation */}
            <div className="mt-8 text-center text-xs text-gray-400">
              Already have an account?{" "}
              <Link
                href={
                  callbackUrl && callbackUrl !== "/"
                    ? `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`
                    : "/sign-in"
                }
                className="font-semibold text-red-400 hover:text-red-300 underline underline-offset-4 ml-1 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-black">
          <span className="loading loading-spinner loading-lg text-red-500" />
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}

