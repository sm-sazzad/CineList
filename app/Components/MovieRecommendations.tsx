"use client";

import React from "react";
import { IMovie } from "../DataType";
import PopularMovieCard from "./PopularMovieCard";
import { FaFilm } from "react-icons/fa6";
import { MdOutlineLocalMovies } from "react-icons/md";
import Link from "next/link";

interface MovieRecommendationsProps {
    movies?: IMovie[];
    currentMovieId?: number;
}

const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({
    movies = [],
    currentMovieId,
}) => {
    // Filter out the current movie and items without posters
    const filteredMovies = movies
        .filter((m) => m && m.id !== currentMovieId && (m.poster_path || m.backdrop_path))
        .slice(0, 10);

    if (filteredMovies.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 border-t border-white/10 pt-10">
            {/* ================= HEADER ================= */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-1.5">
                        <FaFilm className="text-sm" />
                        <span>Curated Suggestions</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                        <span>More Like This</span>
                        <MdOutlineLocalMovies className="text-red-500 text-2xl hidden sm:inline-block" />
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-gray-400">
                        Handpicked cinema based on genre similarities, storyline mood, and viewer ratings.
                    </p>
                </div>

                {/* Counter Badge */}
                <div className="self-start sm:self-auto">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-gray-300">
                        {filteredMovies.length} Recommendations
                    </span>
                </div>
            </div>

            {/* ================= MOVIES GRID ================= */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5 md:gap-6">
                {filteredMovies.map((movie) => (
                    <PopularMovieCard key={`rec-${movie.id}`} movie={movie} />
                ))}
            </div>

            {/* Explore More CTA */}
            <div className="mt-10 flex justify-center">
                <Link
                    href="/all-movies"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-stone-900/80 border border-white/10 hover:border-red-500/40 hover:bg-stone-800 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                    <span>Browse All Cinema</span>
                    <span className="text-red-500">&rarr;</span>
                </Link>
            </div>
        </section>
    );
};

export default MovieRecommendations;

