import React from 'react';
import Link from 'next/link';
import { FaBookmark, FaBolt, FaFilm, FaArrowRight } from 'react-icons/fa';

const features = [
    {
        icon: <FaBookmark className="text-2xl text-[#ee162f]" />,
        title: "Cloud Watchlist & Favorites",
        description: "Save movies you want to watch or love most. Synchronized securely with your cloud profile across any mobile or desktop device.",
        badge: "Personalized"
    },
    {
        icon: <FaBolt className="text-2xl text-[#fc6743]" />,
        title: "Live Box Office & Streaming",
        description: "Powered by TMDB's high-speed API. Get authentic audience ratings, release dates, storylines, and trending charts updated constantly.",
        badge: "Real-time"
    },
    {
        icon: <FaFilm className="text-2xl text-[#fd3148]" />,
        title: "Curated Cinema Discovery",
        description: "Explore randomized hidden gems, all-time highest grossers, and trending titles with one-click full synopsis and poster artworks.",
        badge: "Curated"
    }
];

const FeatureSection = () => {
    return (
        <section className="relative w-[92%] sm:w-[90%] mx-auto py-12 sm:py-24 overflow-hidden">
            {/* Ambient background blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-[#ee162f]/10 to-[#fc6743]/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="relative text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-red-400 mb-3 sm:mb-4">
                    <span>✨ Built for Movie Enthusiasts</span>
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                    Experience Cinema Like <span className="bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent">Never Before</span>
                </h2>
                <p className="text-gray-400 mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed">
                    CineList gives you seamless tools to track your cinema journey, uncover blockbusters, and build your ultimate personal watchlist.
                </p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="group relative p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-white/10 hover:border-red-500/40 shadow-xl shadow-black/50 hover:shadow-red-500/10 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-5 sm:mb-6">
                                <div className="p-3 sm:p-3.5 rounded-2xl bg-black/60 border border-white/10 group-hover:scale-110 group-hover:border-red-500/30 transition-all duration-300">
                                    {item.icon}
                                </div>
                                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/5">
                                    {item.badge}
                                </span>
                            </div>

                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-red-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        <div className="mt-5 sm:mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-gray-400 group-hover:text-white transition-colors">
                            <span>Learn more</span>
                            <FaArrowRight className="ml-2 text-[10px] group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Call to Action banner */}
            <div className="relative mt-8 sm:mt-12 p-6 sm:p-12 rounded-3xl bg-linear-to-r from-red-950/40 via-stone-900/90 to-orange-950/40 border border-red-500/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-2xl">
                <div>
                    <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                        Ready to dive into the film universe?
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-base mt-2 max-w-xl">
                        Browse thousands of movies, discover today's top picks, or organize your weekend movie marathon.
                    </p>
                </div>
                <Link href="/all-movies" className="shrink-0 w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] hover:from-[#fd3148] hover:to-[#fc6743] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
                        Start Exploring Now
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default FeatureSection;

