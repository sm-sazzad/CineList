import React from 'react';
import { getTrendingMovies } from '../Components/TrendingMovies';
import PopularMovieCard from '../Components/PopularMovieCard';

const TrendingMovies = async () => {

    const trend = ["week", "day"];
    const trendingMovies = await Promise.all(
        trend.map(type => getTrendingMovies(type))
    );

    return (
        <div className='w-[90%] mx-auto py-1 pb-5 md:py-10'>
            {/* Header Section */}
            <div className='flex items-center justify-between mb-8'>
                <div className='py-5'>
                    <h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>
                        Trending <span className='text-red-500'>Movies</span>
                    </h1>
                    <p className='text-gray-400 text-sm mt-1'>
                        Most popular movies right now
                    </p>
                </div>
            </div>

            {/* Movies Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
                {trendingMovies.map((movies) =>
                    movies.map((movie) => (
                        <PopularMovieCard key={movie.id} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
};

export default TrendingMovies;