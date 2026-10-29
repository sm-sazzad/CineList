"use client";

import { useContext } from "react";
import { MoviesContext } from "../Context/MoviesContext";
import { IMovie } from "../DataType";
import { toast } from "react-toastify";

const RemoveItemBtn = ({
    movie,
    btnType,
}: {
    movie: IMovie;
    btnType: "watchlist" | "favourite";
}) => {
    const { removeFromWatchList, removeFromFavourite } = useContext(MoviesContext);

    const handleRemove = async () => {
        if (btnType === "watchlist") {
            const ok = await removeFromWatchList(movie.id);
            if (ok) {
                toast.info(`Removed "${movie.title}" from your watchlist`);
            }
        } else {
            const ok = await removeFromFavourite(movie.id);
            if (ok) {
                toast.info(`Removed "${movie.title}" from your favourites`);
            }
        }
    };

    return (
        <button
            onClick={handleRemove}
            className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-medium text-stone-400 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
        >
            Remove item
        </button>
    );
};

export default RemoveItemBtn;
