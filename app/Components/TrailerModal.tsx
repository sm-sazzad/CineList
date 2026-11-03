"use client";

import React, { useEffect, useState } from "react";
import { FaPlay, FaTimes, FaSpinner, FaYoutube, FaFilm } from "react-icons/fa";

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

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl bg-stone-950 border border-white/10 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            >
                {/* Header Bar */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 min-w-0 pr-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600/20 text-red-500 border border-red-500/30 shrink-0">
                            <FaYoutube className="text-base" />
                        </span>
                        <div className="min-w-0">
                            <h3 className="text-sm sm:text-base font-bold text-white truncate">
                                {movieTitle}
                            </h3>
                            <p className="text-[11px] text-gray-400 truncate">
                                {videoName || "Official Trailer • HD 1080p"}
                            </p>
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white border border-white/10 transition-colors cursor-pointer shrink-0"
                        aria-label="Close trailer"
                    >
                        <FaTimes className="text-sm sm:text-base" />
                    </button>
                </div>

                {/* Video Player / Loading / Error Container */}
                <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-3 text-center p-6">
                            <FaSpinner className="animate-spin text-3xl text-red-500" />
                            <p className="text-xs sm:text-sm font-medium text-gray-400">
                                Fetching official trailer...
                            </p>
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
                        <div className="flex flex-col items-center gap-3 text-center p-6 max-w-md">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 text-2xl">
                                <FaFilm />
                            </div>
                            <h4 className="text-base font-bold text-white">Trailer Unavailable</h4>
                            <p className="text-xs sm:text-sm text-gray-400">
                                {errorMessage || "We couldn't locate an official trailer for this film on TMDB."}
                            </p>
                            <a
                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                                    `${movieTitle} official trailer`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-[#ee162f] to-[#fc6743] text-white text-xs font-bold shadow-lg shadow-red-600/30 hover:scale-105 transition-transform"
                            >
                                <FaYoutube className="text-sm" />
                                <span>Search Trailer on YouTube ↗</span>
                            </a>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-stone-900/60 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span>Powered by TMDB & YouTube</span>
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1 rounded-md hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                        Close (Esc)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrailerModal;

