import React from "react";
import PopularMovieCard from "../Components/PopularMovieCard";
import { IMovie } from "../DataType";
import { FaSearch, FaFilm } from "react-icons/fa";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
    const { q } = await searchParams;
    const query = q?.trim() || "";

    let movies: IMovie[] = [];

    if (query) {
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                    },
                    cache: "no-store",
                }
            );

            if (res.ok) {
                const data = await res.json();
                movies = data?.results || [];
            }
        } catch (err) {
            console.error("Error fetching search results:", err);
        }
    }

    return (
        <div className="relative min-h-screen bg-black text-white pb-20 overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#ee162f]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#fc6743]/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative w-[92%] sm:w-[90%] mx-auto pt-6 sm:pt-14">
                {/* Header */}
                <div className="mb-8 sm:mb-12 border-b border-white/10 pb-6 sm:pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-bold uppercase tracking-wider text-red-400 mb-3">
                                <FaSearch className="text-[#ee162f]" />
                                <span>Search Query</span>
                            </div>
                            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                                {query ? (
                                    <>
                                        Results for{" "}
                                        <span className="bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent">
                                            &ldquo;{query}&rdquo;
                                        </span>
                                    </>
                                ) : (
                                    <span>Search Movies</span>
                                )}
                            </h1>
                            <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl">
                                {query
                                    ? `Showing titles matching your search across the global TMDB library.`
                                    : "Type a title or keyword in the search bar above to find films."}
                            </p>
                        </div>

                        {query && (
                            <div className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 backdrop-blur-md">
                                🎬 {movies.length} {movies.length === 1 ? "Result" : "Results"} Found
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                {!query ? (
                    <div className="flex min-h-[400px] items-center justify-center text-center">
                        <div className="max-w-md p-8 rounded-3xl bg-stone-900/50 border border-white/5">
                            <FaSearch className="mx-auto text-4xl text-gray-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Start Searching</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Discover blockbusters, classics, and trending releases.
                            </p>
                            <Link href="/all-movies">
                                <button className="px-6 py-2.5 rounded-full bg-linear-to-r from-[#ee162f] to-[#fc6743] text-white font-bold text-xs shadow-lg shadow-red-600/30">
                                    Browse All Movies
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : movies.length === 0 ? (
                    <div className="flex min-h-[400px] items-center justify-center text-center">
                        <div className="max-w-md p-8 rounded-3xl bg-stone-900/50 border border-white/5 backdrop-blur-xl">
                            <div className="w-16 h-16 rounded-full bg-red-600/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4 text-red-500 text-2xl">
                                🎬
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">No Movies Found</h3>
                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                We couldn&apos;t find any films matching &ldquo;{query}&rdquo;. Check your spelling or try searching for another title.
                            </p>
                            <Link href="/all-movies">
                                <button className="px-6 py-3 rounded-full bg-linear-to-r from-[#ee162f] to-[#fc6743] text-white font-bold text-sm shadow-lg shadow-red-600/30 hover:scale-105 transition-transform cursor-pointer">
                                    Explore Popular Catalog
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                        {movies.map((movie) => (
                            <PopularMovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;

