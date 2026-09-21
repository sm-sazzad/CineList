"use client"

import { useContext, useState } from "react";
import { MoviesContext } from "../Context/MoviesContext";
import SelectedCard from "./SelectedCard";
import { Span } from "next/dist/trace";

const WatchList = () => {

    const { watchList, favourite } = useContext(MoviesContext);
    const [btnType, setBtnType] = useState<"watchlist" | "favourite">("watchlist")

    return (
        <div className='w-[90%] mx-auto'>
            <div className="flex items-center justify-between border-b border-white/10 p-5 ">

                <h1 className="text-2xl font-bold text-white tracking-tight sm:text-4xl">
                    {
                        btnType === "watchlist" ? (<span>My <span className="bg-linear-to-r from-[#e23e19] via-[#fd3c46] to-[#fd6742] bg-clip-text text-transparent">Watchlist</span></span>) : <span>My <span className="bg-linear-to-r from-[#e23e19] via-[#fd3c46] to-[#fd6742] bg-clip-text text-transparent">Favourite</span></span>
                    }
                </h1>

                <div className="flex items-center gap-1 rounded-2xl bg-stone-900/80 p-1 ring-1 ring-white/10 backdrop-blur-sm">

                    <button onClick={() => setBtnType("watchlist")}
                        className={`${btnType === "watchlist" ? " from-red-600 to-red-500 shadow-red-600/30 shadow-lg font-semibold" : ""} bg-linear-to-r cursor-pointer rounded-xl  px-5 py-2 text-xs font-medium text-white hover:bg-white/5 hover:text-white transition-all duration-200 sm:text-sm`}
                    >
                        Watchlist
                    </button>

                    <button onClick={() => setBtnType("favourite")}
                        className={`${btnType === "favourite" ? " from-red-600 to-red-500 shadow-red-600/30 shadow-lg font-semibold" : ""} bg-linear-to-r cursor-pointer rounded-xl px-5 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-white/5 hover:text-white sm:text-sm`}
                    >
                        Favourite
                    </button>

                </div>

            </div>
            <div className="grid grid-cols-5 gap-4">
                {
                    btnType === "watchlist" ? (watchList.map((movie, indx) => <SelectedCard key={indx} movie={movie} />)
                    ) : (favourite.map((movie, indx) => <SelectedCard key={indx} movie={movie} />))
                }
            </div>
        </div>
    );
};

export default WatchList;