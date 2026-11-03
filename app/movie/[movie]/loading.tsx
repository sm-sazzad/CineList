import React from "react";
import { Shimmer } from "@/app/Components/MovieSkeleton";

const MovieDetailsLoading = () => {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden pb-20">
            {/* Hero Backdrop Skeleton */}
            <div className="relative h-[380px] sm:h-[480px] md:h-[550px] w-full overflow-hidden bg-stone-950">
                <Shimmer />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent" />
                <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#ee162f]/10 blur-[150px] rounded-full pointer-events-none" />
            </div>

            {/* Main Content Layout */}
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 -mt-48 sm:-mt-64 md:-mt-80 z-10">
                <div className="flex flex-col md:flex-row gap-6 sm:gap-10 md:gap-12">

                    {/* Left: Poster Skeleton */}
                    <div className="shrink-0 mx-auto md:mx-0">
                        <div className="relative w-52 sm:w-64 md:w-80 aspect-[2/3] rounded-2xl sm:rounded-3xl bg-stone-900 overflow-hidden border border-white/10 shadow-2xl">
                            <Shimmer />
                        </div>
                    </div>

                    {/* Right: Info Metadata Skeleton */}
                    <div className="flex-1 space-y-5">
                        <div className="space-y-3">
                            {/* Title */}
                            <div className="relative h-9 sm:h-12 w-3/4 rounded-2xl bg-white/10 overflow-hidden">
                                <Shimmer />
                            </div>
                            {/* Tags */}
                            <div className="flex items-center gap-3">
                                <div className="h-5 w-14 rounded bg-white/5" />
                                <div className="h-5 w-20 rounded bg-white/5" />
                                <div className="h-5 w-32 rounded bg-white/5" />
                            </div>
                        </div>

                        {/* Actions Row Skeleton */}
                        <div className="relative p-5 rounded-2xl bg-stone-900/60 border border-white/10 flex items-center gap-4 overflow-hidden">
                            <Shimmer />
                            <div className="w-14 h-14 rounded-full bg-white/10" />
                            <div className="h-10 w-36 rounded-full bg-linear-to-r from-red-600/30 to-orange-500/30" />
                            <div className="h-10 w-10 rounded-full bg-white/10" />
                            <div className="h-10 w-10 rounded-full bg-white/10" />
                        </div>

                        {/* Overview Paragraphs */}
                        <div className="space-y-2 pt-2">
                            <div className="h-5 w-28 rounded bg-white/10 mb-2" />
                            <div className="h-4 w-full rounded bg-white/5" />
                            <div className="h-4 w-11/12 rounded bg-white/5" />
                            <div className="h-4 w-4/5 rounded bg-white/5" />
                        </div>

                        {/* Quick Spec Box */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="h-8 rounded bg-white/5" />
                            <div className="h-8 rounded bg-white/5" />
                            <div className="h-8 rounded bg-white/5" />
                        </div>
                    </div>

                </div>

                {/* Cast Carousel Skeleton */}
                <div className="mt-16 border-t border-white/10 pt-10">
                    <div className="h-6 w-48 rounded bg-white/10 mb-6" />
                    <div className="flex items-center gap-4 overflow-hidden pb-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="relative shrink-0 w-32 sm:w-40 md:w-44 rounded-2xl bg-stone-900/70 border border-white/10 overflow-hidden"
                            >
                                <div className="aspect-[3/4] w-full bg-stone-950 relative overflow-hidden">
                                    <Shimmer />
                                </div>
                                <div className="p-3 space-y-2">
                                    <div className="h-3.5 w-3/4 rounded bg-white/10" />
                                    <div className="h-2.5 w-1/2 rounded bg-white/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Grid Skeleton */}
                <div className="mt-16 border-t border-white/10 pt-10">
                    <div className="h-6 w-52 rounded bg-white/10 mb-6" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="relative p-4 rounded-xl bg-stone-900/60 border border-white/5 overflow-hidden">
                                <Shimmer />
                                <div className="h-3 w-1/2 rounded bg-white/5 mb-2" />
                                <div className="h-5 w-3/4 rounded bg-white/10" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommendations Grid Skeleton */}
                <div className="mt-16 border-t border-white/10 pt-10">
                    <div className="h-6 w-56 rounded bg-white/10 mb-6" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="relative rounded-2xl bg-stone-900/70 border border-white/10 overflow-hidden"
                            >
                                <div className="aspect-[2/3] w-full bg-stone-950 relative overflow-hidden">
                                    <Shimmer />
                                </div>
                                <div className="p-3.5 space-y-2">
                                    <div className="h-4 w-3/4 rounded bg-white/10" />
                                    <div className="h-3 w-1/2 rounded bg-white/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsLoading;
