import React from "react";
import { MovieGridSkeleton, Shimmer } from "./Components/MovieSkeleton";

const Loading = () => {
    return (
        <div className="relative min-h-screen bg-black text-white pb-20 overflow-hidden">
            {/* Ambient Background Glow Accents */}
            <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#ee162f]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#fc6743]/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative w-[92%] sm:w-[90%] mx-auto pt-8 sm:pt-14">
                {/* Section Header Skeleton */}
                <div className="mb-8 sm:mb-12 border-b border-white/10 pb-6 sm:pb-8 relative overflow-hidden">
                    <Shimmer />

                    {/* Eyebrow */}
                    <div className="h-6 w-36 rounded-full bg-red-600/10 border border-red-500/20 mb-3" />

                    {/* Heading */}
                    <div className="h-9 sm:h-12 w-64 sm:w-80 rounded-xl bg-white/10 mb-2" />

                    {/* Subtitle */}
                    <div className="h-4 w-72 sm:w-96 rounded bg-white/5" />
                </div>

                {/* 10-Item Movie Grid Skeleton */}
                <MovieGridSkeleton count={10} />
            </div>
        </div>
    );
};

export default Loading;
