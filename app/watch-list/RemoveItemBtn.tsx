"use client"

import { useContext } from "react";
import { MoviesContext } from "../Context/MoviesContext";
import { IMovie } from "../DataType";
import { toast } from "react-toastify";

const RemoveItemBtn = ({ movie, btnType }: { movie: IMovie, btnType: "watchlist" | "favourite" }) => {

    const { watchList, setWatchList, favourite, setFavourite } = useContext(MoviesContext);

    const handleRemoveItemWatchlist = () => {
        const remainingItem = watchList.filter(item => item.id !== movie.id);
        setWatchList(remainingItem);
        toast.info(`${movie.title} remove from your list`);

    }

    const handleRemoveItemFavourite = () => {
        const remainingItemFavourite = favourite.filter(item => item.id !== movie.id);
        setFavourite(remainingItemFavourite);
        toast.info(`${movie.title} remove from your list`);

    }

    return (
        <button onClick={btnType === "watchlist" ? handleRemoveItemWatchlist : handleRemoveItemFavourite}
            className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-medium text-stone-400 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
        >
            Remove item
        </button>
    );
};

export default RemoveItemBtn;