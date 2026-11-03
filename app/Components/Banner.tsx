import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlay, FaFire, FaStar, FaCompass } from 'react-icons/fa';
import { IMovie } from '../DataType';
import TrailerButton from './TrailerButton';

export const getFeaturedMovie = async (): Promise<IMovie | null> => {
    try {
        const res = await fetch('https://api.themoviedb.org/3/trending/movie/day', {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },
            cache: 'no-store',
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data?.results?.[0] || null;
    } catch {
        return null;
    }
};

const Banner = async () => {
    const movie = await getFeaturedMovie();

    const movieSlug = movie?.title
        ? movie.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        : '';
    const movieDetailsUrl = movie ? `/movie/${movie.id}-${movieSlug}` : '/all-movies';

    const backdropUrl = movie?.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : '/cinelistBanner.jpg';

    const title = movie?.title || 'Unlimited Cinema, Infinite Stories';
    const overview = movie?.overview ||
        'Discover millions of movies, track your personal watchlist, and explore today\'s top-rated global cinema.';
    const releaseYear = movie?.release_date
        ? new Date(movie.release_date).getFullYear()
        : new Date().getFullYear();
    const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : '8.5';

    return (
        <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
            {/* Cinematic Backdrop Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backdropUrl}
                    alt={title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center scale-105"
                />

                {/* Left gradient for crystal clear text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 md:via-black/75 to-transparent z-10" />

                {/* Bottom gradient fade for seamless blend into page background */}
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

                {/* Top subtle fade */}
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent z-10" />

                {/* Ambient theater glow */}
                <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#ee162f]/20 blur-[140px] rounded-full pointer-events-none z-10" />
            </div>

            {/* Hero Content */}
            <div className="relative z-20 w-[92%] sm:w-[90%] mx-auto py-14 sm:py-20 md:py-28 flex flex-col justify-center">
                <div className="max-w-3xl">

                    {/* Eyebrow Trending Pill */}
                    <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-black/60 border border-red-500/30 backdrop-blur-md mb-4 sm:mb-5 shadow-lg shadow-red-500/10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ee162f]"></span>
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-linear-to-r from-[#ee162f] to-[#fc6743] bg-clip-text text-transparent flex items-center gap-1.5">
                            <FaFire className="text-[#ee162f]" />
                            {movie ? '#1 Trending Movie Worldwide' : 'Welcome to CineList'}
                        </span>
                    </div>

                    {/* Movie Title */}
                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-3 sm:mb-4 drop-shadow-2xl">
                        {title}
                    </h1>

                    {/* Meta Info Bar */}
                    <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold mb-6">
                        {/* Rating */}
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 backdrop-blur-sm">
                            <FaStar className="text-xs" />
                            <span>{rating} TMDB</span>
                        </div>

                        {/* Release Year */}
                        <div className="px-2.5 py-1 rounded-md bg-white/10 text-gray-200 border border-white/10 backdrop-blur-sm">
                            {releaseYear}
                        </div>

                        {/* Quality Badge */}
                        <div className="px-2.5 py-1 rounded-md bg-red-600/20 text-red-400 border border-red-500/30 text-[11px] font-bold tracking-wider">
                            4K ULTRA HD
                        </div>

                        {/* Audio / Feature */}
                        <div className="hidden sm:block px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10 text-[11px]">
                            DOLBY VISION
                        </div>

                        {movie?.adult && (
                            <span className="px-2.5 py-1 rounded-md bg-red-700 text-white text-[11px] font-bold">
                                18+
                            </span>
                        )}
                    </div>

                    {/* Synopsis */}
                    <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed line-clamp-3 sm:line-clamp-4 max-w-2xl mb-8 drop-shadow">
                        {overview}
                    </p>

                    {/* Call to Action Buttons */}
                    <div className="flex items-center flex-wrap gap-2.5 sm:gap-4">
                        {/* Primary Button */}
                        <Link href={movieDetailsUrl}>
                            <button className="group relative px-5 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-white text-xs sm:text-base overflow-hidden border border-transparent shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2">
                                {/* Animated Gradient Fill */}
                                <span className="absolute inset-0 bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743]" />
                                {/* Shine Sweep */}
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/30 to-transparent" />
                                <FaPlay className="relative text-xs sm:text-sm" />
                                <span className="relative">View Details</span>
                            </button>
                        </Link>

                        {/* Watch Trailer Modal Trigger */}
                        {movie && (
                            <TrailerButton
                                movieId={movie.id}
                                movieTitle={movie.title}
                                variant="hero"
                            />
                        )}

                        {/* Secondary Button: Browse All */}
                        <Link href="/all-movies" className="hidden sm:block">
                            <button className="group px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-white text-xs sm:text-base bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2">
                                <FaCompass className="text-gray-300 group-hover:text-white transition-colors" />
                                <span>Browse Catalog</span>
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Banner;
