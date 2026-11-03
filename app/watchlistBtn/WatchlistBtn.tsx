"use client";

import { useContext } from "react";
import { MoviesContext } from "../Context/MoviesContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBookmark } from "react-icons/fa";

const WatchListBtn = () => {
    const { watchList } = useContext(MoviesContext);
    const pathName = usePathname();
    const isActive = pathName === "/watch-list";

    return (
        <Link href="/watch-list" className="relative inline-block">
            <button
                type="button"
                className={`w-9 h-9 sm:w-auto sm:h-10 sm:px-4 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                    isActive
                        ? "bg-red-600/20 border-red-500/60 text-white shadow-red-500/10"
                        : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-gray-200 hover:text-white"
                }`}
                title="My Watchlist"
                aria-label="My Watchlist"
            >
                <FaBookmark className={`text-xs ${isActive ? "text-red-500" : "text-gray-300"}`} />
                <span className="hidden sm:inline">Watchlist</span>
            </button>

            {/* Floating Notification Badge on Top-Right Corner */}
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] text-white text-[10px] font-black shadow-md shadow-red-600/40 border border-black/50 pointer-events-none">
                {watchList.length}
            </span>
        </Link>
    );
};

export default WatchListBtn;
