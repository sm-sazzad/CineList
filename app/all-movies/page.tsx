
import { getMovies } from '../Components/Movies';
import PopularMovieCard from '../Components/PopularMovieCard';
import MoreBtn from '../popularMoreBtn/MoreBtn';

const AllMovies = async () => {

    const allMovies = await getMovies(1)
    let type = "movies";

    return (
        <div className='w-[90%] mx-auto py-5 md:py-10'>
            {/* Header Section */}
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>
                        All <span className='text-red-500'>Movies</span>
                    </h1>
                    <p className='text-gray-400 text-sm mt-1'>
                        All movies here
                    </p>
                </div>
            </div>

            {/* Load More Button */}
            <MoreBtn Movies={allMovies} type={type} />
        </div>
    );
};

export default AllMovies;