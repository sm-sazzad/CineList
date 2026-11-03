import { getMovies } from '../Components/Movies';
import MoreBtn from '../popularMoreBtn/MoreBtn';
import { FaFilm } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

const AllMovies = async () => {
    const allMovies = await getMovies(1);
    const type = "movies";

    return (
        <div className="relative min-h-screen bg-black text-white pb-20 overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#ee162f]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#fc6743]/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative w-[92%] sm:w-[90%] mx-auto pt-6 sm:pt-14">
                {/* Header Section */}
                <div className="mb-8 sm:mb-12 border-b border-white/10 pb-6 sm:pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-bold uppercase tracking-wider text-red-400 mb-2.5 sm:mb-3">
                                <FaFilm className="text-[#ee162f]" />
                                <span>Complete Catalog</span>
                            </div>
                            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                                Explore <span className="bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent">All Movies</span>
                            </h1>
                            <p className="text-gray-400 text-xs sm:text-base mt-1.5 sm:mt-2 max-w-xl">
                                Browse thousands of cinematic titles, discover hidden gems, and curate your personalized watchlist.
                            </p>
                        </div>

                        {/* Top Pill */}
                        <div className="self-start sm:self-auto px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 backdrop-blur-md">
                            🎬 10,000+ Film Archive
                        </div>
                    </div>
                </div>

                {/* Movies Grid & Load More */}
                <MoreBtn Movies={allMovies} type={type} />
            </div>
        </div>
    );
};

export default AllMovies;
