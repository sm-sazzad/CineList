import Link from 'next/link';
import { IMovie } from '../DataType';
import PopularMovieCard from './PopularMovieCard';

export const getMovies = async (page: number): Promise<IMovie[]> => {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },
        }
    );

    const data = await res.json();
    return data.results;
};

const Movies = async () => {

    const Movies = await getMovies(Math.floor(Math.random() * 500) + 1);

    return (
        <div className='relative py-20 overflow-hidden'>
            {/* Ambient Background Glow */}
            <div className='absolute top-1/3 left-0 w-96 h-96 bg-[#ee162f] opacity-10 blur-[120px] rounded-full pointer-events-none'></div>
            <div className='absolute bottom-0 right-0 w-96 h-96 bg-[#fc6743] opacity-10 blur-[120px] rounded-full pointer-events-none'></div>

            {/* Section Header */}
            <div className='relative w-[90%] mx-auto mb-12'>
                <div className='flex items-end justify-between flex-wrap gap-4'>
                    <div>
                        {/* Eyebrow Label */}
                        <div className='flex items-center gap-3 mb-2'>
                            <span className='w-1.5 h-8 bg-linear-to-b from-[#ee162f] to-[#fc6743] rounded-full'></span>
                            <span className='text-sm font-semibold uppercase tracking-widest bg-linear-to-r from-[#ee162f] to-[#f46a47] bg-clip-text text-transparent'>
                                Explore Collection
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className='text-4xl md:text-5xl font-bold text-white'>
                            All{' '}
                            <span className='bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent'>
                                Movies
                            </span>
                        </h1>

                        <p className='text-gray-400 mt-2 text-sm md:text-base'>
                            Browse our complete library of films
                        </p>
                    </div>
                </div>
            </div>

            {/* Movies Grid */}
            <div className='relative w-[90%] mx-auto'>
                {Movies.length > 0 ? (
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
                        {Movies.map(movie => (
                            <PopularMovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className='flex flex-col items-center justify-center py-20 text-center'>
                        <div className='w-20 h-20 rounded-full bg-linear-to-br from-[#ee162f]/20 to-[#fc6743]/20 flex items-center justify-center mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#fc6743]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                            </svg>
                        </div>
                        <h3 className='text-white text-xl font-semibold mb-2'>No movies found</h3>
                        <p className='text-gray-400 text-sm'>Check back later for new releases</p>
                    </div>
                )}
            </div>

            {/* All Movies Button */}
            {Movies.length > 0 && (
                <Link href={"/all-movies"}>
                    <div className='relative flex justify-center mt-14'>
                        <button className='group relative px-8 py-3 cursor-pointer rounded-full text-white font-semibold overflow-hidden border border-transparent transition-all duration-300 hover:scale-105 shadow-lg shadow-[#ee162f]/20 hover:shadow-[#fc6743]/40'>
                            {/* Animated Gradient Background */}
                            <span className='absolute inset-0 bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743]'></span>

                            {/* Shine Effect */}
                            <span className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/30 to-transparent'></span>

                            {/* Button Content */}
                            <span className='relative flex items-center gap-2'>
                                All Movies
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default Movies;