"use client";

import Image from 'next/image';
import { IMovie } from '../DataType';
import { IoMdStar } from 'react-icons/io';
import { FaPlay } from 'react-icons/fa';
import Link from 'next/link';

export interface IMovieProps {
    movie: IMovie;
}

const PopularMovieCard = ({ movie }: IMovieProps) => {
    const movieName = movie?.title
        ? movie.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        : 'movie';

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/cinelistBanner.jpg';

    const year = movie.release_date ? movie.release_date.slice(0, 4) : '';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

    const handleCardClick = () => {
        if (typeof window !== "undefined") {
            const path = window.location.pathname;
            if (path.includes("all-movies")) {
                sessionStorage.setItem("cinelist_scroll_movies", window.scrollY.toString());
            } else if (path.includes("popular-movies")) {
                sessionStorage.setItem("cinelist_scroll_popular", window.scrollY.toString());
            }
        }
    };

    return (
        <Link
            href={`/movie/${movie.id}-${movieName}`}
            onClick={handleCardClick}
            className="block h-full group"
        >
            <div className="relative flex flex-col h-full overflow-hidden rounded-2xl bg-stone-900/90 text-white shadow-lg shadow-black/40 ring-1 ring-white/10 group-hover:ring-red-500/40 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-red-500/10">

                {/* Poster Container */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-stone-950">
                    <Image
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                        src={posterUrl}
                        alt={movie.title || 'Movie Poster'}
                        width={300}
                        height={450}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />

                    {/* Quick Play Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#ee162f] to-[#fc6743] flex items-center justify-center text-white shadow-lg shadow-red-600/50 scale-75 group-hover:scale-100 transition-transform duration-300">
                            <FaPlay className="ml-0.5 text-sm" />
                        </div>
                    </div>

                    {/* Bottom Vignette Gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent pointer-events-none" />

                    {/* Adult Badge */}
                    {movie.adult && (
                        <span className="absolute top-2.5 right-2.5 rounded-full bg-red-600/95 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg ring-1 ring-red-400/50 backdrop-blur-md">
                            18+
                        </span>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md border border-white/10">
                        <IoMdStar className="text-yellow-400 text-sm" />
                        <span>{rating}</span>
                    </div>

                    {/* Quality Tag */}
                    <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 rounded bg-black/60 text-[10px] font-semibold text-gray-300 border border-white/10 backdrop-blur-sm">
                        HD
                    </span>
                </div>

                {/* Movie Info */}
                <div className="flex flex-col flex-1 p-3.5">
                    <h3
                        className="line-clamp-1 text-sm font-bold tracking-tight text-white group-hover:text-red-400 transition-colors"
                        title={movie.title}
                    >
                        {movie.title}
                    </h3>

                    <div className="mt-2 flex items-center justify-between text-xs text-stone-400">
                        <span>{year || 'Cinema'}</span>
                        <span className="text-[11px] font-medium text-red-500 group-hover:underline">
                            Details &rarr;
                        </span>
                    </div>
                </div>

            </div>
        </Link>
    );
};

export default PopularMovieCard;
