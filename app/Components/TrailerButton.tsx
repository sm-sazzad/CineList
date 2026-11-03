"use client";

import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import TrailerModal from "./TrailerModal";

interface TrailerButtonProps {
    movieId: number | string;
    movieTitle: string;
    variant?: "hero" | "details" | "compact";
    className?: string;
}

export const TrailerButton: React.FC<TrailerButtonProps> = ({
    movieId,
    movieTitle,
    variant = "hero",
    className = "",
}) => {
    const [isOpen, setIsOpen] = useState(false);

    if (variant === "details") {
        return (
            <>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className={`cursor-pointer group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/20 hover:border-red-500/50 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
                >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-linear-to-r from-[#ee162f] to-[#fc6743] text-white text-[10px] shadow-sm">
                        <FaPlay className="ml-0.5" />
                    </span>
                    <span>Watch Trailer</span>
                </button>

                <TrailerModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    movieId={movieId}
                    movieTitle={movieTitle}
                />
            </>
        );
    }

    if (variant === "compact") {
        return (
            <>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-red-600/20 text-gray-200 hover:text-white border border-white/10 hover:border-red-500/40 text-xs font-semibold transition-all ${className}`}
                >
                    <FaPlay className="text-[10px] text-red-500" />
                    <span>Trailer</span>
                </button>

                <TrailerModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    movieId={movieId}
                    movieTitle={movieTitle}
                />
            </>
        );
    }

    // Default: 'hero' variant
    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`group px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-white text-xs sm:text-base bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-red-500/40 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2 ${className}`}
            >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-linear-to-r from-[#ee162f] to-[#fc6743] text-white text-[10px] shadow-sm">
                    <FaPlay className="ml-0.5" />
                </span>
                <span>Watch Trailer</span>
            </button>

            <TrailerModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                movieId={movieId}
                movieTitle={movieTitle}
            />
        </>
    );
};

export default TrailerButton;

