"use client";

import { useContext, useState } from "react";
import { MoviesContext } from "../Context/MoviesContext";
import SelectedCard from "./SelectedCard";
import Link from "next/link";

const WatchList = () => {
    const { watchList, favourite, isLoading } = useContext(MoviesContext);
    const [btnType, setBtnType] = useState<"watchlist" | "favourite">("watchlist");

    const currentList = btnType === "watchlist" ? watchList : favourite;

    return (
        <div className='w-[97%] sm:w-[90%] mx-auto py-4'>
            <div className="flex items-center justify-between border-b border-white/10 p-2 sm:p-5">

                <h1 className="text-2xl font-bold text-white tracking-tight sm:text-4xl">
                    {btnType === "watchlist" ? (
                        <span>
                            My{" "}
                            <span className="bg-linear-to-r from-[#e23e19] via-[#fd3c46] to-[#fd6742] bg-clip-text text-transparent">
                                Watchlist
                            </span>
                        </span>
                    ) : (
                        <span>
                            My{" "}
                            <span className="bg-linear-to-r from-[#e23e19] via-[#fd3c46] to-[#fd6742] bg-clip-text text-transparent">
                                Favourite
                            </span>
                        </span>
                    )}
                </h1>

                <div className="flex items-center gap-1 rounded-2xl bg-stone-900/80 p-1 ring-1 ring-white/10 backdrop-blur-sm">
                    <button
                        onClick={() => setBtnType("watchlist")}
                        className={`${
                            btnType === "watchlist"
                                ? "from-red-600 to-red-500 shadow-red-600/30 shadow-lg font-semibold"
                                : ""
                        } bg-linear-to-r cursor-pointer rounded-xl px-5 py-2 text-xs font-medium text-white hover:bg-white/5 hover:text-white transition-all duration-200 sm:text-sm`}
                    >
                        Watchlist ({watchList.length})
                    </button>

                    <button
                        onClick={() => setBtnType("favourite")}
                        className={`${
                            btnType === "favourite"
                                ? "from-red-600 to-red-500 shadow-red-600/30 shadow-lg font-semibold"
                                : ""
                        } bg-linear-to-r cursor-pointer rounded-xl px-5 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-white/5 hover:text-white sm:text-sm`}
                    >
                        Favourite ({favourite.length})
                    </button>
                </div>

            </div>

            {isLoading ? (
                <div className="flex min-h-80 items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <span className="loading loading-spinner loading-lg text-red-500" />
                        <p className="text-gray-400 text-sm">Loading your saved movies...</p>
                    </div>
                </div>
            ) : currentList.length === 0 ? (
                <div className="flex min-h-100 items-center justify-center">
                    <div className="text-center max-w-md p-6">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/80 border border-gray-700 shadow-xl">
                            <span className="text-4xl">
                                {btnType === "watchlist" ? "🎬" : "❤️"}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2">
                            Your {btnType === "watchlist" ? "Watchlist" : "Favourite List"} is Empty
                        </h2>

                        <p className="text-gray-400 mb-7 text-sm leading-relaxed">
                            You haven&apos;t added any movies to your {btnType} yet.
                            Start exploring and save your favorite movies directly to your CineList account.
                        </p>

                        <Link href="/all-movies">
                            <button className="cursor-pointer rounded-xl bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] px-6 py-3 font-semibold text-white transition duration-300 hover:opacity-90 shadow-lg shadow-red-600/20">
                                + Explore Movies
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 my-5 px-2 sm:px-0">
                    {currentList.map((movie, indx) => (
                        <SelectedCard key={`${movie.id}-${indx}`} movie={movie} btnType={btnType} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WatchList;
