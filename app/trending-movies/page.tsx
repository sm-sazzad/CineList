import React from 'react';
import { getTrendingMovies } from '../Components/TrendingMovies';
import PopularMovieCard from '../Components/PopularMovieCard';
import { IMovie } from '../DataType';
import { FaFire } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

const TrendingMovies = async () => {
    // Fetch both day and week trends
    const [dayTrends, weekTrends] = await Promise.all([
        getTrendingMovies('day'),
        getTrendingMovies('week'),
    ]);

    // Deduplicate movies by id so no duplicates appear
    const movieMap = new Map<number, IMovie>();
    [...dayTrends, ...weekTrends].forEach((movie) => {
        if (!movieMap.has(movie.id)) {
            movieMap.set(movie.id, movie);
        }
    });

    const uniqueTrendingMovies = Array.from(movieMap.values());

    return (
        <div className="relative min-h-screen bg-black text-white pb-20 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#ee162f]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#fc6743]/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative w-[92%] sm:w-[90%] mx-auto pt-6 sm:pt-14">
                {/* Header Banner */}
                <div className="mb-8 sm:mb-12 border-b border-white/10 pb-6 sm:pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-bold uppercase tracking-wider text-red-400 mb-2.5 sm:mb-3">
                                <FaFire className="text-[#ee162f]" />
                                <span>Global Trends</span>
                            </div>
                            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                                Trending <span className="bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent">Movies</span>
                            </h1>
                            <p className="text-gray-400 text-xs sm:text-base mt-1.5 sm:mt-2 max-w-xl">
                                The most talked-about, streamed, and acclaimed movies trending globally right now.
                            </p>
                        </div>

                        {/* Count Pill */}
                        <div className="self-start sm:self-auto px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 backdrop-blur-md">
                            🔥 {uniqueTrendingMovies.length} Trending Titles
                        </div>
                    </div>
                </div>

                {/* Movies Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-6">
                    {uniqueTrendingMovies.map((movie) => (
                        <PopularMovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrendingMovies;
