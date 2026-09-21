import React from 'react';
import PopularMovieCard from './PopularMovieCard';
import { IMovie } from '../DataType';
import Link from 'next/link';

export const getMovies = async (page: number): Promise<IMovie[]> => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
    });

    const data = await res.json();
    console.log(data)
    return data.results;
};

const Popular = async () => {
    const movies = await getMovies(2);
    return (
        <div className='relative py-20 w-[90%] mx-auto'>
            {/* Section Header */}
            <div className=' mb-12'>
                <div className='flex items-end justify-between flex-wrap gap-4'>
                    <div>
                        <div className='flex items-center gap-3 mb-2'>
                            <span className='w-1.5 h-8 bg-linear-to-b from-[#ee162f] to-[#f46a47] rounded-full'></span>
                            <span className='text-red-400 text-sm font-semibold uppercase tracking-widest'>
                                Trending Now
                            </span>
                        </div>
                        <h1 className='text-4xl md:text-5xl font-bold text-white'>
                            Popular <span className='text-transparent bg-clip-text bg-linear-to-r from-[#fd3148] to-[#fc6743]'>Movies</span>
                        </h1>
                        <p className='text-gray-400 mt-2 text-sm md:text-base'>
                            Discover the most-watched films right now
                        </p>
                    </div>

                    {/* View All Button */}
                    <Link href={"/popular-movies"}>
                        <button className='btn btn-outline btn-sm md:btn-md text-white border-white/30 hover:bg-[#fd3148] hover:text-slate-900 hover:border-orange-600 transition-all duration-300 group'>
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Movies Grid */}
            <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mx-auto">
                {movies.map((movie) => (
                    <PopularMovieCard key={movie.id} movie={movie} />
                ))}
            </main>

            {/* Load More */}
            {movies.length > 0 && (
                <Link href={"/popular-movies"}>
                    <div className='flex justify-center mt-14'>
                        <button className='btn btn-wide bg-linear-to-r from-[#fd3148] to-[#fc6743] text-slate-900 border-none hover:from-yellow-300 hover:to-amber-400 font-semibold shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all duration-300'>
                            Load More Movies
                        </button>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default Popular;