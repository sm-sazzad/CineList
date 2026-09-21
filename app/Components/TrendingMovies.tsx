import React, { use } from 'react';
import PopularMovieCard from './PopularMovieCard';
import { IMovie } from '../DataType';
import Link from 'next/link';

export const getTrendingMovies = async (day: string): Promise<IMovie[]> => {
    const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/${day}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },
        }
    );

    const data = await res.json();
    return data.results;
};


const TrendingMovies = async () => {
    const trendingMovies = await (getTrendingMovies("day"));


    return (
        <div className='relative py-20 overflow-hidden'>
            {/* Decorative background glow */}
            <div className='absolute top-0 left-1/4 w-96 h-96 bg-[#ee162f] opacity-10 blur-[120px] rounded-full pointer-events-none'></div>
            <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-[#fc6743] opacity-10 blur-[120px] rounded-full pointer-events-none'></div>

            {/* Section Header */}
            <div className='relative w-[90%] mx-auto mb-12'>
                <div className='flex items-end justify-between flex-wrap gap-4'>
                    <div>
                        {/* Eyebrow Label */}
                        <div className='flex items-center gap-3 mb-2'>
                            <span className='w-1.5 h-8 bg-linear-to-b from-[#ee162f] to-[#fc6743] rounded-full'></span>
                            <span className='text-sm font-semibold uppercase tracking-widest bg-linear-to-r from-[#ee162f] to-[#f46a47] bg-clip-text text-transparent'>
                                Hot Right Now 🔥
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className='text-4xl md:text-5xl font-bold text-white'>
                            Trending{' '}
                            <span className='bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent'>
                                Movies
                            </span>
                        </h1>

                        <p className='text-gray-400 mt-2 text-sm md:text-base'>
                            The most talked-about films this week
                        </p>
                    </div>

                    {/* View All Button */}
                    <Link href={"/trending-movies"}>
                        <button className='group cursor-pointer relative px-5 py-2.5 rounded-full text-white font-medium border border-white/20 hover:border-transparent transition-all duration-300 overflow-hidden'>
                            <span className='absolute inset-0 bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
                            <span className='relative flex items-center gap-2'>
                                View All
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </button>
                    </Link>

                </div>
            </div>

            {/* Horizontal Scroll / Grid Layout */}
            <div className='relative w-[90%] mx-auto'>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
                    {trendingMovies.map(movie => (
                        <PopularMovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrendingMovies;