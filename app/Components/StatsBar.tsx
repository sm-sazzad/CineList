import React from 'react';
import { FaFilm, FaFire, FaCloud, FaStar } from 'react-icons/fa';

const stats = [
    {
        icon: <FaFilm className="text-[#ee162f] text-2xl" />,
        value: "10,000+",
        label: "Movies & Shows",
        sub: "Massive global catalog"
    },
    {
        icon: <FaFire className="text-[#fc6743] text-2xl" />,
        value: "Daily Sync",
        label: "Live TMDB Data",
        sub: "Always fresh & trending"
    },
    {
        icon: <FaCloud className="text-[#fd3148] text-2xl" />,
        value: "Cloud Watchlist",
        label: "Instant Sync",
        sub: "Access from any device"
    },
    {
        icon: <FaStar className="text-yellow-400 text-2xl" />,
        value: "4K & HDR",
        label: "Ultra Quality",
        sub: "Official cinema backdrops"
    }
];

const StatsBar = () => {
    return (
        <section className="relative w-[92%] sm:w-[90%] mx-auto -mt-8 sm:-mt-14 z-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 p-3 sm:p-6 rounded-2xl sm:rounded-3xl bg-stone-900/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="group flex items-center gap-2.5 sm:gap-4 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-white/10 transition-all duration-300"
                    >
                        <div className="p-2.5 sm:p-3.5 rounded-xl bg-black/50 border border-white/5 group-hover:scale-110 transition-transform duration-300 shrink-0">
                            {item.icon}
                        </div>
                        <div className="min-w-0">
                            <div className="text-base sm:text-xl font-extrabold text-white tracking-tight truncate">
                                {item.value}
                            </div>
                            <div className="text-[11px] sm:text-sm font-semibold text-gray-200 truncate">
                                {item.label}
                            </div>
                            <div className="hidden sm:block text-[11px] text-gray-400 truncate">
                                {item.sub}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsBar;

