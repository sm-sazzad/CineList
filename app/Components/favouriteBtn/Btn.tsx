"use client";

import { MoviesContext } from '@/app/Context/MoviesContext';
import { IMovie } from '@/app/DataType';
import { useContext, useState } from 'react';
import { FaBookmark, FaPlay, FaShare } from 'react-icons/fa';
import { MdOutlineFavorite } from 'react-icons/md';
import { toast } from '@/app/Components/Toast/Toast';
import TrailerModal from '../TrailerModal';

const Btn = ({ movie }: { movie: IMovie }) => {
    const {
        watchList,
        favourite,
        addToFavourite,
        addToWatchList,
    } = useContext(MoviesContext);
    const [trailerOpen, setTrailerOpen] = useState(false);

    const isAvailableFav = favourite.some(n => n.id === movie.id);
    const isAvailableWatch = watchList.some(n => n.id === movie.id);

    const handleFavourite = async () => {
        if (!isAvailableFav) {
            const ok = await addToFavourite(movie);
            if (ok) {
                toast.success(`❤️ ${movie.title} added to your favourites!`);
            }
        } else {
            toast.info(`❤️ ${movie.title} is already in your favourites.`);
        }
    };

    const handleBookmark = async () => {
        if (!isAvailableWatch) {
            const ok = await addToWatchList(movie);
            if (ok) {
                toast.success(`🔖 ${movie.title} added to your watchlist!`);
            }
        } else {
            toast.info(`🔖 ${movie.title} is already in your watchlist.`);
        }
    };

    const handleShare = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            toast.success("🔗 Movie link copied to clipboard!");
        }
    };

    return (
        <>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {/* Watch Trailer Button */}
                <button
                    type="button"
                    onClick={() => setTrailerOpen(true)}
                    className="cursor-pointer group flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] hover:from-[#fd3148] hover:to-[#fc6743] text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                    <FaPlay className="text-[10px] sm:text-xs" />
                    <span>Watch Trailer</span>
                </button>

                {/* Favorite */}
                <button
                    type="button"
                    onClick={handleFavourite}
                    title={isAvailableFav ? "In Favourites" : "Add to Favourites"}
                    className={`flex cursor-pointer h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border transition-all duration-200 active:scale-95 ${
                        isAvailableFav
                            ? "bg-red-500/20 border-red-500 text-red-500 shadow-md shadow-red-500/20"
                            : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-gray-300 hover:text-white"
                    }`}
                >
                    <MdOutlineFavorite className="text-base sm:text-lg" />
                </button>

                {/* Watchlist */}
                <button
                    type="button"
                    onClick={handleBookmark}
                    title={isAvailableWatch ? "In Watchlist" : "Add to Watchlist"}
                    className={`flex cursor-pointer h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border transition-all duration-200 active:scale-95 ${
                        isAvailableWatch
                            ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-md shadow-amber-500/20"
                            : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-gray-300 hover:text-white"
                    }`}
                >
                    <FaBookmark className="text-xs sm:text-sm" />
                </button>

                {/* Share */}
                <button
                    type="button"
                    onClick={handleShare}
                    title="Share Movie Link"
                    className="flex cursor-pointer h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-all duration-200 active:scale-95"
                >
                    <FaShare className="text-xs sm:text-sm" />
                </button>
            </div>

            <TrailerModal
                isOpen={trailerOpen}
                onClose={() => setTrailerOpen(false)}
                movieId={movie.id}
                movieTitle={movie.title}
            />
        </>
    );
};

export default Btn;
