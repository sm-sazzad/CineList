"use client"

import { useContext } from "react";
import { MoviesContext } from "../Context/MoviesContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

const WatchListBtn = () => {

    const { watchList } = useContext(MoviesContext);
    const pathName = usePathname();

    return (
        <Link href={"/watch-list"}>
            <div className="indicator">
                <span className="indicator-item bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] badge badge-secondary badge-sm font-bold">
                    {watchList.length}
                </span>
                <button className={`${pathName === "/watch-list" ? "bg-white text-black" : 'text-white'} btn btn-outline btn-sm md:btn-md border-white/40 hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-300`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    My Watchlist
                </button>
            </div>
        </Link >
    );
};

export default WatchListBtn;