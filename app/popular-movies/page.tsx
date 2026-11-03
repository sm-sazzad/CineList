import { getMovies } from '../Components/Popular';
import MoreBtn from '../popularMoreBtn/MoreBtn';
import { FaCrown } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

const PopularMovie = async () => {
    const popularMovies = await getMovies(Math.floor(Math.random() * 50) + 1);
    const type = "popular";

    return (
        <div className="relative min-h-screen bg-black text-white pb-20 overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-[#ee162f]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-[#fc6743]/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative w-[92%] sm:w-[90%] mx-auto pt-6 sm:pt-14">
                {/* Header Section */}
                <div className="mb-8 sm:mb-12 border-b border-white/10 pb-6 sm:pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5 sm:mb-3">
                                <FaCrown className="text-yellow-400" />
                                <span>Audience Favorites</span>
                            </div>
                            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                                Popular <span className="bg-linear-to-r from-amber-400 via-orange-500 to-[#ee162f] bg-clip-text text-transparent">Movies</span>
                            </h1>
                            <p className="text-gray-400 text-xs sm:text-base mt-1.5 sm:mt-2 max-w-xl">
                                Discover the most-watched and highest-rated films captivating audiences across the globe.
                            </p>
                        </div>

                        {/* Top Pill */}
                        <div className="self-start sm:self-auto px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 backdrop-blur-md">
                            👑 Top Global Chart
                        </div>
                    </div>
                </div>

                {/* Movies Grid & Load More */}
                <MoreBtn Movies={popularMovies} type={type} />
            </div>
        </div>
    );
};

export default PopularMovie;
