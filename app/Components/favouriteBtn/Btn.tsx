"use client";

import { MoviesContext } from '@/app/Context/MoviesContext';
import { IMovie } from '@/app/DataType';
import { useContext } from 'react';
import { FaBookmark, FaPlay, FaShare } from 'react-icons/fa';
import { MdOutlineFavorite } from 'react-icons/md';
import { toast } from 'react-toastify';

const Btn = ({ movie }: { movie: IMovie }) => {
    const {
        watchList,
        favourite,
        addToFavourite,
        addToWatchList,
    } = useContext(MoviesContext);

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

    return (
        <div className="flex items-center gap-1">
            {[
                {
                    icon: <MdOutlineFavorite className={isAvailableFav ? "text-red-500" : ""} />,
                    label: "Favorite",
                    onclick: handleFavourite,
                },
                {
                    icon: <FaBookmark className={isAvailableWatch ? "text-amber-400" : ""} />,
                    label: "Watchlist",
                    onclick: handleBookmark,
                },
                { icon: <FaPlay />, label: "Trailer" },
                { icon: <FaShare />, label: "Share" },
            ].map((action, i) => (
                <button
                    onClick={action.onclick}
                    key={i}
                    title={action.label}
                    className="flex cursor-pointer h-12 w-12 items-center justify-center rounded-full bg-[#0d253f] border border-white/10 text-white hover:bg-[#ee162f] hover:border-[#ee162f] transition-colors duration-200"
                >
                    {action.icon}
                </button>
            ))}
        </div>
    );
};

export default Btn;
