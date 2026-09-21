import { getMovies } from '../Components/Popular';
import MoreBtn from '../popularMoreBtn/MoreBtn';

const PopularMovie = async () => {
    const popularMovies = await getMovies(30);
    let type = "popular";

    return (
        <div className='w-[90%] mx-auto py-10'>
            {/* Header Section */}
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>
                        Popular <span className='text-red-500'>Movies</span>
                    </h1>
                    <p className='text-gray-400 text-sm mt-1'>
                        Most watched movies of all time
                    </p>
                </div>
            </div>

            {/* Movies Grid */}
            {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
                {popularMovies.map((movie) => (
                    <PopularMovieCard key={movie.id} movie={movie} />
                ))}
            </div> */}

            {/* Load More Button */}
            <MoreBtn Movies={popularMovies} type={type} />
        </div>
    );
};

export default PopularMovie;