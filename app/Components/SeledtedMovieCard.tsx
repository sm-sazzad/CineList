import React from 'react';
import { IMovie } from '../DataType';
import { MdOutlineFavorite } from 'react-icons/md';
import { FaBookmark, FaPlay, FaShare } from 'react-icons/fa';

interface IMoviePropss {
    movie: IMovie;
}

const SeledtedMovieCard = ({ movie }: IMoviePropss) => {
    const newLocal = "absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent";
    return (
        <div className="min-h-screen bg-[#0d253f] text-white">

            {/* ================= BACKDROP ================= */}
            <div className="relative h-105 w-full">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        className="h-full w-full object-cover object-top"
                    />
                    {/* Single clean gradient (TMDB style) */}
                    <div className="absolute inset-0 bg-linear-to-r from-[#0d253f] via-[#0d253f]/85 to-[#0d253f]/60"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-[#0d253f] via-transparent to-transparent"></div>
                </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="relative mx-auto max-w-7xl px-6 -mt-64 pb-20">
                <div className="flex flex-col md:flex-row gap-10">

                    {/* ---------- LEFT: POSTER ---------- */}
                    <div className="shrink-0 mx-auto md:mx-0">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-75 rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* ---------- RIGHT: INFO ---------- */}
                    <div className="flex-1">

                        {/* Title + Year */}
                        <div className="flex flex-wrap items-baseline gap-3">
                            <h1 className="text-3xl md:text-4xl font-bold">
                                {movie.title}
                            </h1>
                            <span className="text-3xl md:text-4xl font-light text-gray-300">
                                ({movie.release_date?.slice(0, 4)})
                            </span>
                        </div>

                        {/* Meta Row — TMDB style */}
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                            <span className="rounded border border-gray-500 px-2 py-0.5 text-gray-300">
                                {movie.adult ? "R" : "PG-13"}
                            </span>
                            <span className="text-gray-300">
                                {movie.release_date}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-300 uppercase">
                                {movie.original_language}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-300">
                                {movie.genres.map(g => g.name).join(", ")}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-300">
                                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                            </span>
                        </div>

                        {/* ---------- ACTIONS ROW (TMDB iconic) ---------- */}
                        <div className="mt-8 flex items-center gap-6">

                            {/* Score Ring — TMDB style */}
                            {(() => {
                                const percentage = Math.round(movie.vote_average * 10);
                                return (
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-16 w-16">
                                            <div
                                                className="h-full w-full rounded-full"
                                                style={{
                                                    background: `conic-gradient(#ee162f ${percentage}%, #1a2f47 ${percentage}%)`,
                                                }}
                                            ></div>
                                            <div className="absolute inset-1 flex items-center justify-center rounded-full bg-[#0d253f]">
                                                <span className="text-lg font-bold">
                                                    {percentage}
                                                    <span className="text-xs">%</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-sm font-semibold leading-tight">
                                            <div>User</div>
                                            <div>Score</div>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Action Icons — TMDB list style */}
                            <div className="flex items-center gap-1">
                                {[
                                    { icon: <MdOutlineFavorite />, label: "Favorite" },
                                    { icon: <FaBookmark />, label: "Watchlist" },
                                    { icon: <FaPlay />, label: "Trailer" },
                                    { icon: <FaShare />, label: "Share" },
                                ].map((action, i) => (
                                    <button
                                        key={i}
                                        title={action.label}
                                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d253f] border border-white/10 text-white hover:bg-[#ee162f] hover:border-[#ee162f] transition-colors duration-200"
                                    >
                                        {action.icon}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ---------- TAGLINE ---------- */}
                        {movie.tagline && (
                            <p className="mt-8 text-lg italic text-gray-400">
                                {movie.tagline}
                            </p>
                        )}

                        {/* ---------- OVERVIEW ---------- */}
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">Overview</h2>
                            <p className="max-w-3xl text-gray-300 leading-relaxed">
                                {movie.overview || "No overview available."}
                            </p>
                        </div>

                        {/* ---------- CREW (like TMDB) ---------- */}
                        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                            <div>
                                <p className="font-semibold text-white">Director</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    {"—"}
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-white">Writer</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    {"—"}
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-white">Status</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    {movie.status || "Released"}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ================= STATS SECTION (TMDB style) ================= */}
                <div className="mt-16 border-t border-white/10 pt-8">
                    <h3 className="text-xl font-semibold mb-6">Details</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

                        {[
                            { label: "Popularity", value: movie.popularity?.toFixed(1) },
                            { label: "Movie ID", value: movie.id },
                            { label: "Votes", value: movie.vote_count?.toLocaleString() },
                            { label: "Language", value: movie.original_language?.toUpperCase() },
                            { label: "Release Date", value: movie.release_date },
                            { label: "Runtime", value: `${movie.runtime} min` },
                            { label: "Budget", value: movie.budget ? `$${movie.budget.toLocaleString()}` : "—" },
                            { label: "Revenue", value: movie.revenue ? `$${movie.revenue.toLocaleString()}` : "—" },
                        ].map((stat, i) => (
                            <div key={i} className="border-l-2 border-[#ee162f]/40 pl-4">
                                <p className="text-xs uppercase tracking-wider text-gray-500">
                                    {stat.label}
                                </p>
                                <p className="mt-1 text-base font-semibold text-white">
                                    {stat.value ?? "—"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SeledtedMovieCard;