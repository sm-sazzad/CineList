import React from "react";

// Continuous subtle shimmering light sweep
export const Shimmer = () => (
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none z-10" />
);

// Single 2:3 Movie Card Skeleton (Matching PopularMovieCard)
export const MovieCardSkeleton = () => {
    return (
        <div className="relative flex flex-col h-full overflow-hidden rounded-2xl bg-stone-900/90 border border-white/5 shadow-lg shadow-black/40">
            {/* Poster Container */}
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-stone-950">
                <Shimmer />

                {/* Rating Badge Skeleton */}
                <div className="absolute top-2.5 left-2.5 h-6 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/5" />

                {/* Quality Tag Skeleton */}
                <div className="absolute top-2.5 right-2.5 h-4 w-7 rounded bg-white/5 border border-white/5" />

                {/* Ambient Center Circle */}
                <div className="absolute inset-0 flex items-center justify-center opacity-25">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />
                </div>

                {/* Bottom Vignette */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent pointer-events-none" />
            </div>

            {/* Movie Info Section */}
            <div className="relative flex flex-col flex-1 p-3.5 space-y-2.5 overflow-hidden">
                <Shimmer />

                {/* Title Line */}
                <div className="h-4 w-4/5 rounded-md bg-white/10" />

                {/* Release Year & Action Line */}
                <div className="flex items-center justify-between pt-1">
                    <div className="h-3 w-1/3 rounded bg-white/5" />
                    <div className="h-3 w-1/4 rounded bg-red-500/20" />
                </div>
            </div>
        </div>
    );
};

// Responsive Grid of Movie Cards (Used across Watchlist, Explore, Trends)
export const MovieGridSkeleton = ({ count = 10 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <MovieCardSkeleton key={i} />
            ))}
        </div>
    );
};

// Search Result Horizontal Card Skeleton (For SearchBar debounced state)
export const SearchItemSkeleton = () => {
    return (
        <div className="relative flex items-center gap-3.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
            <Shimmer />

            {/* Mini Poster */}
            <div className="relative w-12 h-16 shrink-0 rounded-lg overflow-hidden bg-stone-900 border border-white/10" />

            {/* Details */}
            <div className="flex-1 space-y-2 min-w-0">
                <div className="h-3.5 w-3/4 rounded bg-white/10" />
                <div className="flex items-center gap-2">
                    <div className="h-2.5 w-10 rounded bg-white/5" />
                    <div className="h-2.5 w-12 rounded bg-yellow-500/20" />
                </div>
                <div className="h-2 w-full rounded bg-white/5" />
            </div>
        </div>
    );
};

// Full Hero Banner Skeleton (For App / Page Level loading transitions)
export const HeroBannerSkeleton = () => {
    return (
        <div className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#ee162f]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#fc6743]/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-20 w-[92%] sm:w-[90%] mx-auto py-20 max-w-3xl space-y-5">
                <Shimmer />

                {/* Eyebrow Pill */}
                <div className="h-7 w-48 rounded-full bg-white/10 border border-white/10" />

                {/* Hero Title */}
                <div className="space-y-2">
                    <div className="h-10 sm:h-14 w-4/5 rounded-2xl bg-white/10" />
                    <div className="h-10 sm:h-14 w-2/3 rounded-2xl bg-white/10" />
                </div>

                {/* Meta Row */}
                <div className="flex items-center gap-3 pt-1">
                    <div className="h-6 w-20 rounded-md bg-yellow-500/10 border border-yellow-500/20" />
                    <div className="h-6 w-14 rounded-md bg-white/10 border border-white/10" />
                    <div className="h-6 w-24 rounded-md bg-red-600/10 border border-red-500/20" />
                </div>

                {/* Synopsis Paragraph */}
                <div className="space-y-2 max-w-2xl pt-2">
                    <div className="h-4 w-full rounded bg-white/5" />
                    <div className="h-4 w-11/12 rounded bg-white/5" />
                    <div className="h-4 w-3/4 rounded bg-white/5" />
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3 pt-4">
                    <div className="h-11 sm:h-12 w-36 rounded-full bg-linear-to-r from-red-600/40 to-orange-500/40" />
                    <div className="h-11 sm:h-12 w-36 rounded-full bg-white/10 border border-white/10" />
                </div>
            </div>
        </div>
    );
};

export default MovieGridSkeleton;

