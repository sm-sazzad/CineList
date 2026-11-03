"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ICastMember, ICrewMember } from "../DataType";
import { FaChevronLeft, FaChevronRight, FaUser, FaClapperboard } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

interface MovieCastProps {
    cast?: ICastMember[];
    crew?: ICrewMember[];
}

const MovieCast: React.FC<MovieCastProps> = ({ cast = [], crew = [] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Filter top cast members (e.g. top 20 sorted by order)
    const topCast = cast.slice(0, 20);

    // Extract key crew members: Director, Screenplay/Writer, Producer
    const directors = crew.filter(
        (c) => c.job === "Director" || c.department === "Directing" && c.job.toLowerCase().includes("director")
    );
    const writers = crew.filter(
        (c) => c.job === "Screenplay" || c.job === "Writer" || c.job === "Story"
    );

    // Update scroll buttons disabled state
    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        checkScroll();
        const el = scrollRef.current;
        if (el) {
            el.addEventListener("scroll", checkScroll, { passive: true });
            window.addEventListener("resize", checkScroll);
            return () => {
                el.removeEventListener("scroll", checkScroll);
                window.removeEventListener("resize", checkScroll);
            };
        }
    }, [topCast]);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const scrollAmount = scrollRef.current.clientWidth * 0.75;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    if (topCast.length === 0 && directors.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 border-t border-white/10 pt-10">
            {/* ================= HEADER & CREW SPOTLIGHT ================= */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-1.5">
                        <FaClapperboard className="text-sm" />
                        <span>Ensemble & Production</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                        <span>Top Cast & Crew</span>
                        <HiSparkles className="text-red-500 text-lg hidden sm:inline-block" />
                    </h3>
                </div>

                {/* Navigation Buttons for Carousel */}
                {topCast.length > 4 && (
                    <div className="flex items-center gap-2 self-end md:self-auto">
                        <button
                            type="button"
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            aria-label="Scroll left"
                            className={`p-2.5 rounded-full border transition-all duration-300 ${
                                canScrollLeft
                                    ? "bg-stone-900/80 border-white/20 text-white hover:bg-linear-to-r hover:from-[#ee162f] hover:to-[#fc6743] hover:border-transparent hover:scale-105 active:scale-95 shadow-md shadow-red-600/10"
                                    : "bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed opacity-40"
                            }`}
                        >
                            <FaChevronLeft className="text-xs" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            aria-label="Scroll right"
                            className={`p-2.5 rounded-full border transition-all duration-300 ${
                                canScrollRight
                                    ? "bg-stone-900/80 border-white/20 text-white hover:bg-linear-to-r hover:from-[#ee162f] hover:to-[#fc6743] hover:border-transparent hover:scale-105 active:scale-95 shadow-md shadow-red-600/10"
                                    : "bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed opacity-40"
                            }`}
                        >
                            <FaChevronRight className="text-xs" />
                        </button>
                    </div>
                )}
            </div>

            {/* Key Directors & Writers Chips */}
            {(directors.length > 0 || writers.length > 0) && (
                <div className="mb-6 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
                    {directors.slice(0, 2).map((dir) => (
                        <div
                            key={`dir-${dir.id}-${dir.name}`}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-stone-900/90 to-black border border-red-500/30 text-white shadow-sm"
                        >
                            <span className="text-[10px] uppercase font-bold tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                                Director
                            </span>
                            <span className="font-semibold text-gray-200">{dir.name}</span>
                        </div>
                    ))}
                    {writers.slice(0, 2).map((w) => (
                        <div
                            key={`writer-${w.id}-${w.name}`}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/60 border border-white/10 text-gray-300"
                        >
                            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">
                                Writer
                            </span>
                            <span className="font-medium text-gray-200">{w.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* ================= CAST CAROUSEL ================= */}
            <div
                ref={scrollRef}
                className="flex items-stretch gap-3.5 sm:gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-stone-800"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {topCast.map((actor) => {
                    const profileUrl = actor.profile_path
                        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                        : null;

                    return (
                        <div
                            key={`actor-${actor.id}-${actor.character}`}
                            className="group shrink-0 w-32 sm:w-40 md:w-44 snap-start flex flex-col rounded-2xl bg-stone-900/70 border border-white/10 overflow-hidden hover:border-red-500/40 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1.5 transition-all duration-300"
                        >
                            {/* Actor Portrait */}
                            <div className="relative aspect-[3/4] w-full bg-stone-950 overflow-hidden">
                                {profileUrl ? (
                                    <Image
                                        src={profileUrl}
                                        alt={actor.name}
                                        fill
                                        sizes="(max-width: 640px) 130px, (max-width: 768px) 160px, 180px"
                                        className="object-cover transition-transform duration-500 group-hover:scale-108"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-b from-stone-900 to-black text-stone-600">
                                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 mb-2">
                                            <FaUser className="text-xl" />
                                        </div>
                                        <span className="text-[11px] font-medium text-stone-500">No Photo</span>
                                    </div>
                                )}

                                {/* Bottom Dark Vignette */}
                                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-stone-950/90 to-transparent pointer-events-none" />
                            </div>

                            {/* Actor Details */}
                            <div className="p-3 flex flex-col flex-1 justify-between bg-stone-900/90">
                                <div>
                                    <h4
                                        className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1"
                                        title={actor.name}
                                    >
                                        {actor.name}
                                    </h4>
                                    <p
                                        className="mt-0.5 text-[11px] sm:text-xs text-gray-400 line-clamp-2 leading-snug"
                                        title={actor.character}
                                    >
                                        <span className="text-stone-500 text-[10px]">as </span>
                                        {actor.character || "Cast"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default MovieCast;

