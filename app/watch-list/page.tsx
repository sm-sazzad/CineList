"use client";

import { useContext, useState } from "react";
import { MoviesContext } from "../Context/MoviesContext";
import SelectedCard from "./SelectedCard";
import Link from "next/link";
import { FaBookmark, FaHeart, FaCompass } from "react-icons/fa";
import { MovieGridSkeleton } from "../Components/MovieSkeleton";

const WatchList = () => {
    const { watchList, favourite, isLoading } = useContext(MoviesContext);
    const [btnType, setBtnType] = useState<"watchlist" | "favourite">("watchlist");

    const currentList = btnType === "watchlist" ? watchList : favourite;

    return (
        <div className="relative min-h-screen bg-black text-white pb-20 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#ee162f]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#fc6743]/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative w-[92%] sm:w-[90%] mx-auto pt-6 sm:pt-12">
                {/* Header & Filter Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 sm:pb-8 gap-5 sm:gap-6">

                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-bold uppercase tracking-wider text-red-400 mb-2.5 sm:mb-3">
                            {btnType === "watchlist" ? <FaBookmark className="text-xs" /> : <FaHeart className="text-xs text-red-500" />}
                            <span>Personal Library</span>
                        </div>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                            My{" "}
                            <span className="bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent">
                                {btnType === "watchlist" ? "Watchlist" : "Favourites"}
                            </span>
                        </h1>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1">
                            {btnType === "watchlist"
                                ? "Movies you have queued up for your next movie night."
                                : "Your all-time favorite cinema picks."}
                        </p>
                    </div>

                    {/* Animated Sliding Pill Toggle */}
                    <div className="relative grid grid-cols-2 w-full sm:w-[350px] p-1.5 rounded-2xl bg-stone-900/90 ring-1 ring-white/10 backdrop-blur-md shadow-xl select-none">
                        {/* Smooth Sliding Pill Indicator */}
                        <div
                            className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-xl bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] shadow-lg shadow-red-600/35 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-0 ${
                                btnType === "favourite" ? "translate-x-[calc(100%+6px)]" : "translate-x-0"
                            }`}
                        />

                        {/* Watchlist Button */}
                        <button
                            type="button"
                            onClick={() => setBtnType("watchlist")}
                            className={`relative z-10 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer ${
                                btnType === "watchlist"
                                    ? "text-white"
                                    : "text-gray-400 hover:text-gray-200"
                            }`}
                        >
                            <FaBookmark className={`text-xs transition-transform duration-200 ${btnType === "watchlist" ? "scale-110 text-white" : "text-gray-400"}`} />
                            <span>Watchlist</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black transition-colors ${
                                btnType === "watchlist" ? "bg-black/30 text-white" : "bg-white/10 text-gray-400"
                            }`}>
                                {watchList.length}
                            </span>
                        </button>

                        {/* Favourites Button */}
                        <button
                            type="button"
                            onClick={() => setBtnType("favourite")}
                            className={`relative z-10 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer ${
                                btnType === "favourite"
                                    ? "text-white"
                                    : "text-gray-400 hover:text-gray-200"
                            }`}
                        >
                            <FaHeart className={`text-xs transition-transform duration-200 ${btnType === "favourite" ? "scale-110 text-white" : "text-gray-400"}`} />
                            <span>Favourites</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black transition-colors ${
                                btnType === "favourite" ? "bg-black/30 text-white" : "bg-white/10 text-gray-400"
                            }`}>
                                {favourite.length}
                            </span>
                        </button>
                    </div>

                </div>

                {/* Content States with Animated Transition */}
                {isLoading ? (
                    <div className="mt-8">
                        <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                            <span>Synchronizing cloud library...</span>
                        </div>
                        <MovieGridSkeleton count={10} />
                    </div>
                ) : currentList.length === 0 ? (
                    <div key={`empty-${btnType}`} className="flex min-h-[420px] items-center justify-center py-12 animate-in fade-in-50 duration-300">
                        <div className="text-center max-w-md p-8 rounded-3xl bg-stone-900/50 border border-white/5 backdrop-blur-xl shadow-2xl">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-red-500/20 to-orange-500/10 border border-red-500/20 text-3xl shadow-xl">
                                {btnType === "watchlist" ? "🎬" : "❤️"}
                            </div>

                            <h2 className="text-2xl font-black text-white mb-2">
                                Your {btnType === "watchlist" ? "Watchlist" : "Favourites"} is Empty
                            </h2>

                            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                                You haven&apos;t added any movies yet. Browse our extensive movie archive and click the save button to add films here.
                            </p>

                            <Link href="/all-movies">
                                <button className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] hover:from-[#fd3148] hover:to-[#fc6743] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 shadow-xl shadow-red-600/30 cursor-pointer">
                                    <FaCompass />
                                    <span>Explore Catalog</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div key={`list-${btnType}`} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mt-8 animate-in fade-in-50 duration-300">
                        {currentList.map((movie, indx) => (
                            <SelectedCard key={`${movie.id}-${indx}`} movie={movie} btnType={btnType} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchList;
