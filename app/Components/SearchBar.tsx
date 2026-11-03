"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaStar, FaSpinner, FaFire, FaTimes } from "react-icons/fa";
import { IMovie } from "../DataType";
import { SearchItemSkeleton } from "./MovieSkeleton";

const QUICK_TRENDING = [
    "Oppenheimer",
    "Avengers",
    "Spider-Man",
    "Inception",
    "Interstellar",
    "Batman",
    "Dune"
];

const SearchBar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<IMovie[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    // Global keyboard shortcut: Ctrl+K or Cmd+K to open, Esc to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Handle entering and exiting transitions
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            document.body.style.overflow = "hidden";
            // Double rAF ensures -translate-y-full has rendered before animating down
            const frame1 = requestAnimationFrame(() => {
                const frame2 = requestAnimationFrame(() => {
                    setIsAnimating(true);
                    inputRef.current?.focus();
                });
                return () => cancelAnimationFrame(frame2);
            });
            return () => cancelAnimationFrame(frame1);
        } else {
            setIsAnimating(false);
            document.body.style.overflow = "unset";
            const timer = setTimeout(() => {
                setIsMounted(false);
            }, 300); // 300ms matches CSS transition duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Debounced search
    useEffect(() => {
        const trimmed = query.trim();
        if (!trimmed) {
            setResults([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`/api/movies/search?query=${encodeURIComponent(trimmed)}`);
                if (res.ok) {
                    const data = await res.json();
                    setResults(data.slice(0, 6)); // Top 6 results
                } else {
                    setResults([]);
                }
            } catch (err) {
                console.error("Search error:", err);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;
        setIsOpen(false);
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    };

    const handleSelectMovie = () => {
        setIsOpen(false);
        setQuery("");
    };

    return (
        <>
            {/* Navbar Search Icon Button with smooth rotational morph */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-300 cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
                    isOpen
                        ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30"
                        : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300 hover:text-white"
                }`}
                title={isOpen ? "Close search (Esc)" : "Search movies (Ctrl + K)"}
                aria-label={isOpen ? "Close search" : "Search movies"}
            >
                <span className={`inline-flex transition-transform duration-300 ${isOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"}`}>
                    {isOpen ? <FaTimes className="text-sm" /> : <FaSearch className="text-xs sm:text-sm" />}
                </span>
            </button>

            {/* Slide-Down Search Panel & Backdrop (Emerges from behind navbar and slides back up) */}
            {isMounted && (
                <>
                    {/* Dark Blurred Backdrop Overlay */}
                    <div
                        onClick={() => setIsOpen(false)}
                        className={`fixed inset-0 top-[56px] sm:top-[68px] bg-black/80 backdrop-blur-md z-40 transition-opacity duration-300 ease-out ${
                            isAnimating ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                        }`}
                    />

                    {/* Header Panel with Up/Down Slide Animation */}
                    <div
                        ref={panelRef}
                        className={`fixed inset-x-0 top-[56px] sm:top-[68px] z-45 bg-stone-950/98 border-b border-white/10 shadow-2xl backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isAnimating
                                ? "translate-y-0 opacity-100 pointer-events-auto"
                                : "-translate-y-full opacity-0 pointer-events-none"
                        }`}
                    >
                        <div className="w-[92%] sm:w-[85%] max-w-4xl mx-auto py-5 sm:py-7">

                            {/* Search Form */}
                            <form onSubmit={handleSubmit} className="relative flex items-center">
                                <FaSearch className="absolute left-4 text-gray-400 text-base pointer-events-none" />

                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search by movie title, actor, or genre..."
                                    className="w-full pl-12 pr-32 py-3.5 sm:py-4 text-sm sm:text-lg text-white placeholder-gray-500 bg-white/[0.04] border border-white/15 rounded-2xl focus:outline-none focus:border-red-500/60 focus:ring-2 focus:ring-red-500/30 shadow-inner transition-all duration-200"
                                />

                                {/* Right Side: Loading / Clear / Close */}
                                <div className="absolute right-3 flex items-center gap-1.5 sm:gap-2">
                                    {isLoading && (
                                        <FaSpinner className="animate-spin text-sm text-red-500 mr-1" />
                                    )}

                                    {query && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setQuery("");
                                                setResults([]);
                                                inputRef.current?.focus();
                                            }}
                                            className="px-2 py-1 text-xs text-gray-400 hover:text-white rounded-md bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                                        >
                                            Clear
                                        </button>
                                    )}

                                    <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-[10px] font-mono font-semibold text-gray-400 bg-white/5 border border-white/10 rounded-md">
                                        ESC
                                    </kbd>

                                    {/* Direct Close Cross Button */}
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        title="Close search (Esc)"
                                        className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                        aria-label="Close search panel"
                                    >
                                        <FaTimes className="text-sm" />
                                    </button>
                                </div>
                            </form>

                            {/* State 1: Live Results List */}
                            {query.trim().length > 0 ? (
                                <div className="mt-4 pt-3 border-t border-white/5">
                                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3 px-1">
                                        <span className="font-semibold uppercase tracking-wider text-red-400">
                                            Instant Matches
                                        </span>
                                        <span>{results.length} found</span>
                                    </div>

                                    {isLoading ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-hidden pr-1">
                                            {Array.from({ length: 4 }).map((_, i) => (
                                                <SearchItemSkeleton key={i} />
                                            ))}
                                        </div>
                                    ) : results.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto no-scrollbar pr-1">
                                            {results.map((movie) => {
                                                const slug = movie.title
                                                    ? movie.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
                                                    : "movie";
                                                const poster = movie.poster_path
                                                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                                    : "/cinelistBanner.jpg";
                                                const year = movie.release_date?.slice(0, 4) || "—";
                                                const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

                                                return (
                                                    <Link
                                                        key={movie.id}
                                                        href={`/movie/${movie.id}-${slug}`}
                                                        onClick={handleSelectMovie}
                                                        className="group flex items-center gap-3.5 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.07] border border-white/5 hover:border-red-500/30 transition-all duration-200"
                                                    >
                                                        <div className="relative w-12 h-16 shrink-0 rounded-lg overflow-hidden bg-stone-900 border border-white/10">
                                                            <Image
                                                                src={poster}
                                                                alt={movie.title || "Movie"}
                                                                fill
                                                                sizes="48px"
                                                                className="object-cover group-hover:scale-105 transition-transform"
                                                            />
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors truncate">
                                                                {movie.title}
                                                            </p>
                                                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                                                <span>{year}</span>
                                                                <span>•</span>
                                                                <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                                                                    <FaStar className="text-[10px]" />
                                                                    {rating}
                                                                </span>
                                                            </div>
                                                            {movie.overview && (
                                                                <p className="text-[11px] text-gray-400 line-clamp-1 mt-1 leading-snug">
                                                                    {movie.overview}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center text-gray-400 text-sm">
                                            No movies found matching &ldquo;{query}&rdquo;. Press Enter to explore catalog.
                                        </div>
                                    )}

                                    {/* View all button */}
                                    {results.length > 0 && (
                                        <div className="mt-4 pt-3 border-t border-white/5 text-center">
                                            <button
                                                type="button"
                                                onClick={handleSubmit}
                                                className="text-xs sm:text-sm font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                                            >
                                                Press Enter to view all results for &ldquo;{query}&rdquo; &rarr;
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* State 2: Quick Trending Chips (When input is empty) */
                                <div className="mt-4 pt-3 border-t border-white/5">
                                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
                                        <FaFire className="text-red-500" />
                                        <span>Trending Searches</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        {QUICK_TRENDING.map((tag, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => {
                                                    setQuery(tag);
                                                }}
                                                className="px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 hover:border-red-500/40 transition-all cursor-pointer"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default SearchBar;
