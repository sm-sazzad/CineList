"use client";

import React, { useState, useEffect, useRef } from 'react';
import PopularMovieCard from '../Components/PopularMovieCard';
import { IMovie } from '../DataType';
import { FaSpinner } from 'react-icons/fa';
import { MovieCardSkeleton } from '../Components/MovieSkeleton';

const CACHE_KEY_PREFIX = "cinelist_cache_";
const SCROLL_KEY_PREFIX = "cinelist_scroll_";
const PAGE_KEY_PREFIX = "cinelist_page_";
const USED_PAGES_KEY_PREFIX = "cinelist_used_pages_";

const MoreBtn = ({ Movies, type }: { Movies: IMovie[], type: string }) => {
    const isMoviesType = type === "movies";
    const cacheKey = `${CACHE_KEY_PREFIX}${type}`;
    const scrollKey = `${SCROLL_KEY_PREFIX}${type}`;
    const pageKey = `${PAGE_KEY_PREFIX}${type}`;
    const usedPagesKey = `${USED_PAGES_KEY_PREFIX}${type}`;

    const [allMovies, setAllMovies] = useState<IMovie[]>(Movies || []);
    const [moviePages, setMoviePages] = useState<number>(1);
    const [popular, setPopular] = useState<IMovie[]>(Movies || []);
    const [pages, setPages] = useState<number>(30);
    const [usedPage, setUsedPage] = useState<number[]>([1]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const hasRestored = useRef<boolean>(false);

    // 1. Restore previously loaded movies and scroll position from session storage
    useEffect(() => {
        if (typeof window === "undefined" || hasRestored.current) return;
        hasRestored.current = true;

        try {
            const cachedMovies = sessionStorage.getItem(cacheKey);
            const cachedPage = sessionStorage.getItem(pageKey);
            const cachedScroll = sessionStorage.getItem(scrollKey);
            const cachedUsedPages = sessionStorage.getItem(usedPagesKey);

            if (cachedMovies) {
                const parsed = JSON.parse(cachedMovies) as IMovie[];
                if (Array.isArray(parsed) && parsed.length > 0) {
                    if (isMoviesType) {
                        setAllMovies(parsed);
                        if (cachedPage) setMoviePages(Number(cachedPage));
                    } else {
                        setPopular(parsed);
                        if (cachedPage) setPages(Number(cachedPage));
                        if (cachedUsedPages) setUsedPage(JSON.parse(cachedUsedPages));
                    }

                    // Restore scroll position after DOM has laid out all restored movie cards
                    if (cachedScroll) {
                        const targetScroll = parseInt(cachedScroll, 10);
                        if (!isNaN(targetScroll) && targetScroll > 0) {
                            requestAnimationFrame(() => {
                                setTimeout(() => {
                                    window.scrollTo({
                                        top: targetScroll,
                                        behavior: "instant",
                                    });
                                }, 60);
                            });
                        }
                    }
                    return;
                }
            }
        } catch (err) {
            console.error("Failed to restore movie list from session cache:", err);
        }

        // Initial setup for fresh visit
        if (Movies && Movies.length > 0) {
            try {
                sessionStorage.setItem(cacheKey, JSON.stringify(Movies));
                sessionStorage.setItem(pageKey, "1");
            } catch {
                // Ignore storage quota error
            }
        }
    }, [cacheKey, pageKey, scrollKey, usedPagesKey, isMoviesType, Movies]);

    // 2. Track scroll position continuously (debounced)
    useEffect(() => {
        if (typeof window === "undefined") return;

        let timeoutId: NodeJS.Timeout;
        const handleScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (window.scrollY > 50) {
                    sessionStorage.setItem(scrollKey, window.scrollY.toString());
                }
            }, 120);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollKey]);

    // 3. Load More Popular Movies
    const handleMoreBtn = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            let nextPage = Math.floor(Math.random() * 500) + 1;
            while (usedPage.includes(nextPage)) {
                nextPage = Math.floor(Math.random() * 500) + 1;
            }

            const updatedUsed = [...usedPage, nextPage];
            setUsedPage(updatedUsed);

            const res = await fetch(`/api/movies/popular-movies?page=${nextPage}`, {
                cache: 'no-store',
            });

            if (res.ok) {
                const newMovies: IMovie[] = await res.json();
                setPopular((previousMovies: IMovie[]) => {
                    // Deduplicate movies by ID
                    const existingIds = new Set(previousMovies.map((m) => m.id));
                    const uniqueNew = newMovies.filter((m) => !existingIds.has(m.id));
                    const updated = [...previousMovies, ...uniqueNew];

                    try {
                        sessionStorage.setItem(cacheKey, JSON.stringify(updated));
                        sessionStorage.setItem(pageKey, nextPage.toString());
                        sessionStorage.setItem(usedPagesKey, JSON.stringify(updatedUsed));
                    } catch {}

                    return updated;
                });
                setPages(nextPage);
            }
        } catch (err) {
            console.error("Failed to load more popular movies:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // 4. Load More All Movies (Sequential pagination: 2, 3, 4...)
    const handleMovie = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const nextPage = moviePages + 1;
            const res = await fetch(`/api/movies/all-movies?page=${nextPage}`, {
                cache: 'no-store',
            });

            if (res.ok) {
                const newMovies: IMovie[] = await res.json();
                setAllMovies((previousMovies: IMovie[]) => {
                    const existingIds = new Set(previousMovies.map((m) => m.id));
                    const uniqueNew = newMovies.filter((m) => !existingIds.has(m.id));
                    const updated = [...previousMovies, ...uniqueNew];

                    try {
                        sessionStorage.setItem(cacheKey, JSON.stringify(updated));
                        sessionStorage.setItem(pageKey, nextPage.toString());
                    } catch {}

                    return updated;
                });
                setMoviePages(nextPage);
            }
        } catch (err) {
            console.error("Failed to load more movies:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const displayMovies = isMoviesType ? allMovies : popular;

    return (
        <div>
            {/* Live Count Pill */}
            <div className="flex items-center justify-between text-xs text-gray-400 mb-4 px-1">
                <span>
                    Showing <strong className="text-white">{displayMovies.length}</strong> movies loaded
                </span>
                {displayMovies.length > 20 && (
                    <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>State & Scroll Restored</span>
                    </span>
                )}
            </div>

            {/* Movies Grid */}
            <div
                onClickCapture={() => {
                    if (typeof window !== "undefined" && window.scrollY > 0) {
                        sessionStorage.setItem(scrollKey, window.scrollY.toString());
                    }
                }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
            >
                {displayMovies.map((movie) => (
                    <PopularMovieCard key={movie.id} movie={movie} />
                ))}

                {/* Skeletons rendered during Load More */}
                {isLoading && (
                    <>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <MovieCardSkeleton key={`skeleton-${i}`} />
                        ))}
                    </>
                )}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-12 sm:mt-16">
                <button
                    onClick={type === "popular" ? handleMoreBtn : handleMovie}
                    disabled={isLoading}
                    className="group relative px-8 py-3.5 rounded-full bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] hover:from-[#fd3148] hover:to-[#fc6743] text-white font-bold text-sm tracking-wide shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2.5 overflow-hidden"
                >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                    {isLoading ? (
                        <>
                            <FaSpinner className="animate-spin text-base" />
                            <span>Loading Movies...</span>
                        </>
                    ) : (
                        <>
                            <span>Load More Movies</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default MoreBtn;
