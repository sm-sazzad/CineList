"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export const BackButton = ({ fallback = "/all-movies" }: { fallback?: string }) => {
    const router = useRouter();

    const handleBack = () => {
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
        } else {
            router.push(fallback);
        }
    };

    return (
        <button
            type="button"
            onClick={handleBack}
            className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 text-white font-semibold text-xs sm:text-sm border border-white/15 hover:border-red-500/40 backdrop-blur-md shadow-xl transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
            title="Go back"
            aria-label="Go back to previous page"
        >
            <FaArrowLeft className="text-xs text-red-500 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
        </button>
    );
};

export default BackButton;

