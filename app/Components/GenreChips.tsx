import Link from 'next/link';
import React from 'react';

const genres = [
    { label: "🔥 All Movies", href: "/all-movies" },
    { label: "⚡ Trending Now", href: "/trending-movies" },
    { label: "👑 Most Popular", href: "/popular-movies" },
    { label: "💥 Action", href: "/all-movies" },
    { label: "🚀 Sci-Fi", href: "/all-movies" },
    { label: "🔪 Thriller", href: "/all-movies" },
    { label: "👻 Horror", href: "/all-movies" },
    { label: "🎭 Drama", href: "/all-movies" },
    { label: "😂 Comedy", href: "/all-movies" },
    { label: "🪄 Animation", href: "/all-movies" },
    { label: "❤️ Romance", href: "/all-movies" },
];

const GenreChips = () => {
    return (
        <section className="relative w-[90%] mx-auto pt-10 sm:pt-14 pb-4">
            <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#ee162f] animate-ping" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Quick Discover
                </span>
            </div>

            {/* Scrollable pill container with hidden scrollbar */}
            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2 mask-linear">
                {genres.map((genre, idx) => (
                    <Link
                        key={idx}
                        href={genre.href}
                        className="shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-200 bg-white/5 hover:bg-linear-to-r hover:from-[#ee162f] hover:to-[#fc6743] hover:text-white border border-white/10 hover:border-transparent transition-all duration-300 hover:scale-105 shadow-sm active:scale-95"
                    >
                        {genre.label}
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default GenreChips;

