"use client";

import React, { useEffect, useState } from "react";
import { FaPlay, FaTimes, FaYoutube, FaFilm, FaExternalLinkAlt } from "react-icons/fa";

interface TrailerModalProps {
    isOpen: boolean;
    onClose: () => void;
    movieId?: number | string;
    movieTitle?: string;
    initialVideoKey?: string;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
    isOpen,
    onClose,
    movieId,
    movieTitle = "Movie",
    initialVideoKey,
}) => {
    const [videoKey, setVideoKey] = useState<string | null>(initialVideoKey || null);
    const [videoName, setVideoName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    // Fetch trailer when opened if not provided or different
    useEffect(() => {
        if (!isOpen) {
            setVideoKey(initialVideoKey || null);
            setVideoName(null);
            setErrorMessage(null);
            return;
        }

        if (initialVideoKey) {
            setVideoKey(initialVideoKey);
            return;
        }

        if (!movieId) return;

        let isCancelled = false;
        setIsLoading(true);
        setErrorMessage(null);

        fetch(`/api/movies/trailer?movieId=${movieId}`)
            .then(async (res) => {
                if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    throw new Error(data.error || "No official trailer found");
                }
                return res.json();
            })
            .then((data) => {
                if (!isCancelled) {
                    if (data.key) {
                        setVideoKey(data.key);
                        setVideoName(data.name || "Official Trailer");
                    } else {
                        setErrorMessage("No official trailer found for this movie.");
                    }
                }
            })
            .catch((err) => {
                if (!isCancelled) {
                    setErrorMessage(err.message || "Failed to load trailer.");
                }
            })
            .finally(() => {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            });

        return () => {
            isCancelled = true;
        };
    }, [isOpen, movieId, initialVideoKey]);

    if (!isOpen) return null;

    const youtubeDirectUrl = videoKey
        ? `https://www.youtube.com/watch?v=${videoKey}`
        : `https://www.youtube.com/results?search_query=${encodeURIComponent(`${movieTitle} official trailer`)}`;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300"
            role="dialog"
            aria-modal="true"
        >
            {/* Ambient Cinema Lighting Backlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#ee162f]/20 via-[#fd3148]/15 to-[#fc6743]/20 blur-[150px] rounded-full pointer-events-none" />

            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl rounded-3xl bg-stone-950/98 border border-white/15 shadow-[0_20px_70px_-10px_rgba(238,22,47,0.3)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            >
                {/* Top Subtle Red Accent Edge */}
                <div className="h-[2px] w-full bg-linear-to-r from-transparent via-[#ee162f] to-transparent" />

                {/* Header Bar */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-white/[0.03]">
                    <div className="flex items-center gap-3 min-w-0 pr-3">
                        {/* Red YouTube / Theater Icon */}
                        <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-red-600/30 to-red-900/40 border border-red-500/30 text-red-500 shrink-0 shadow-md shadow-red-600/20">
                            <FaYoutube className="text-lg sm:text-xl" />
                        </div>

                        <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-sm sm:text-base font-black text-white truncate tracking-tight">
                                    {movieTitle}
                                </h3>
                                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30">
                                    Official Trailer
                                </span>
                            </div>
                            <p className="text-[11px] text-gray-400 truncate mt-0.5">
                                {videoName || "Cinema Theater Experience • HD 1080p"}
                            </p>
                        </div>
                    </div>

                    {/* Actions: Open in YouTube & Close */}
                    <div className="flex items-center gap-2 shrink-0">
                        <a
                            href={youtubeDirectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                            title="Watch directly on YouTube"
                        >
                            <span>Open on YouTube</span>
                            <FaExternalLinkAlt className="text-[10px]" />
                        </a>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-red-600/20 text-gray-400 hover:text-red-400 border border-white/10 hover:border-red-500/40 transition-all cursor-pointer hover:rotate-90 active:scale-95"
                            aria-label="Close trailer"
                            title="Close (Esc)"
                        >
                            <FaTimes className="text-sm sm:text-base" />
                        </button>
                    </div>
                </div>

                {/* Video Player / Loading / Error Container */}
                <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                    {isLoading ? (
                        /* Premium Theater Loading State */
                        <div className="flex flex-col items-center justify-center text-center p-8 max-w-sm space-y-4">
                            {/* Animated Glowing Cinema Badge */}
                            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ee162f]/20 via-red-950/40 to-orange-500/10 border border-red-500/30 shadow-xl shadow-red-600/30">
                                <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-red-500 opacity-30" />
                                <FaPlay className="text-xl text-red-500 ml-0.5" />
                            </div>

                            <div className="space-y-1.5">
                                <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                                    Loading Official Trailer...
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                                    Connecting to official cinema stream for{" "}
                                    <span className="text-white font-medium">&ldquo;{movieTitle}&rdquo;</span>
                                </p>
                            </div>

                            {/* Animated Loading Bar */}
                            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
                                <div className="absolute inset-y-0 w-24 bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] rounded-full animate-shimmer" />
                            </div>
                        </div>
                    ) : videoKey ? (
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
                            title={`${movieTitle} Official Trailer`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full border-0"
                        />
                    ) : (
                        /* Clean Fallback if no trailer is found on TMDB */
                        <div className="flex flex-col items-center gap-3 text-center p-8 max-w-md">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 text-3xl shadow-lg">
                                <FaFilm />
                            </div>
                            <h4 className="text-lg font-bold text-white tracking-tight">
                                Trailer Not Available on TMDB
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                                {errorMessage || "We couldn't locate an official trailer directly for this movie. You can search and watch it on YouTube with one click."}
                            </p>
                            <a
                                href={youtubeDirectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] hover:from-[#fd3148] hover:to-[#fc6743] text-white text-xs sm:text-sm font-bold shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
                            >
                                <FaYoutube className="text-base" />
                                <span>Search & Watch on YouTube ↗</span>
                            </a>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-stone-900/80 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] sm:text-xs">Official Cinema Feed • TMDB & YouTube</span>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer text-xs"
                    >
                        Close (Esc)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrailerModal;
