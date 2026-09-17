import React from 'react';
import { IMovie } from '../DataType';

interface IMoviePropss {
    movie: IMovie;
}

const SeledtedMovieCard = ({ movie }: IMoviePropss) => {
    const newLocal = "absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent";
    return (
        <div className="min-h-screen bg-[#0f172a] text-white">
            {/* Backdrop */}
            <div className="relative">
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="h-112.5 w-full object-cover opacity-40"
                />

                {/* Overlay */}
                <div className={newLocal} />
            </div>

            {/* Movie Details */}
            <div className="relative mx-auto -mt-64 max-w-6xl px-6 pb-16">
                <div className="flex flex-col gap-8 md:flex-row">

                    {/* Poster */}
                    <div className="shrink-0">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-100 rounded-xl shadow-2xl"
                        />
                    </div>

                    {/* Information */}
                    <div className="flex-1 pt-1">
                        {/* Title */}
                        <h1 className="text-4xl font-bold md:text-5xl">
                            {movie.title}
                        </h1>

                        {/* Original Title */}
                        {movie.original_title !== movie.title && (
                            <p className="mt-2 text-gray-400">
                                Original title: {movie.original_title}
                            </p>
                        )}

                        {/* Release date + language */}
                        <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-300">
                            <span className="rounded-full bg-white/10 px-4 py-2">
                                📅 {movie.release_date}
                            </span>

                            <span className="rounded-full bg-white/10 px-4 py-2 uppercase">
                                🌐 {movie.original_language}
                            </span>

                            <span className="rounded-full bg-white/10 px-4 py-2">
                                👥 {movie.vote_count} votes
                            </span>
                        </div>

                        {/* Rating */}
                        <div className="mt-6 flex items-center gap-4">
                            {(() => {
                                const percentage = Math.round(
                                    (movie.vote_average / 10) * 100
                                );

                                return (
                                    <div
                                        className="flex h-20 w-20 items-center justify-center rounded-full"
                                        style={{
                                            background: `conic-gradient(
                    #21d07a ${percentage}%,
                    #1f2937 ${percentage}%
                  )`,
                                        }}
                                    >
                                        <div className="flex h-17 w-17 items-center justify-center rounded-full bg-[#0f172a]">
                                            <span className="font-bold">
                                                {percentage}%
                                            </span>
                                        </div>
                                    </div>
                                );
                            })()}

                            <div>
                                <p className="font-bold">User Score</p>
                                <p className="text-sm text-gray-400">
                                    {movie.vote_average.toFixed(1)} / 10
                                </p>
                            </div>
                        </div>

                        {/* Overview */}
                        <div className="mt-8">
                            <h2 className="mb-3 text-2xl font-bold">
                                Overview
                            </h2>

                            <p className="max-w-3xl leading-7 text-gray-300">
                                {movie.overview || "No overview available."}
                            </p>
                        </div>

                        {/* Genres */}
                        <div className="mt-6">
                            <h2 className="mb-3 text-xl font-bold">
                                Genres
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                {movie.genre_ids.map((genreId) => (
                                    <span
                                        key={genreId}
                                        className="rounded-full bg-indigo-500/20 px-4 py-2 text-sm text-indigo-300"
                                    >
                                        Genre ID: {genreId}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* More Information */}
                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            <div className="rounded-lg bg-white/5 p-4">
                                <p className="text-sm text-gray-400">
                                    Popularity
                                </p>
                                <p className="mt-1 text-lg font-semibold">
                                    {movie.popularity.toFixed(2)}
                                </p>
                            </div>

                            <div className="rounded-lg bg-white/5 p-4">
                                <p className="text-sm text-gray-400">
                                    Movie ID
                                </p>
                                <p className="mt-1 text-lg font-semibold">
                                    {movie.id}
                                </p>
                            </div>

                            <div className="rounded-lg bg-white/5 p-4">
                                <p className="text-sm text-gray-400">
                                    Adult
                                </p>
                                <p className="mt-1 text-lg font-semibold">
                                    {movie.adult ? "Yes" : "No"}
                                </p>
                            </div>

                            <div className="rounded-lg bg-white/5 p-4">
                                <p className="text-sm text-gray-400">
                                    Video
                                </p>
                                <p className="mt-1 text-lg font-semibold">
                                    {movie.video ? "Available" : "No"}
                                </p>
                            </div>

                            <div className="rounded-lg bg-white/5 p-4">
                                <p className="text-sm text-gray-400">
                                    Softcore
                                </p>
                                <p className="mt-1 text-lg font-semibold">
                                    {movie.softcore ? "Yes" : "No"}
                                </p>
                            </div>

                            <div className="rounded-lg bg-white/5 p-4">
                                <p className="text-sm text-gray-400">
                                    Backdrop
                                </p>
                                <p className="mt-1 truncate text-lg font-semibold">
                                    {movie.backdrop_path}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeledtedMovieCard;