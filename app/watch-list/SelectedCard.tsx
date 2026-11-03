import { IMovie } from '../DataType';
import Image from 'next/image';
import { IoMdStar } from 'react-icons/io';
import RemoveItemBtn from './RemoveItemBtn';
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa';

const SelectedCard = ({ movie, btnType }: { movie: IMovie, btnType: "watchlist" | "favourite" }) => {
    const movieName = movie?.title
        ? movie.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
        : "details";

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/cinelistBanner.jpg';

    const year = movie.release_date ? movie.release_date.slice(0, 4) : '';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-stone-900/90 text-white shadow-lg shadow-black/40 ring-1 ring-white/10 hover:ring-red-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-500/10">

            {/* Poster Container */}
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-stone-950">
                <Image
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    src={posterUrl}
                    alt={movie.title || "Movie Poster"}
                    width={300}
                    height={450}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Bottom Vignette */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent pointer-events-none" />

                {/* Adult Badge */}
                {movie.adult && (
                    <span className="absolute top-2.5 right-2.5 rounded-full bg-red-600/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-md backdrop-blur-md">
                        18+
                    </span>
                )}

                {/* Rating */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md border border-white/10">
                    <IoMdStar className="text-yellow-400 text-sm" />
                    <span>{rating}</span>
                </div>
            </div>

            {/* Movie Info & Actions */}
            <div className="flex flex-1 flex-col p-3.5">
                <div className="flex items-center justify-between gap-2">
                    <h3
                        className="line-clamp-1 min-w-0 text-sm font-bold text-white group-hover:text-red-400 transition-colors"
                        title={movie.title}
                    >
                        {movie.title}
                    </h3>
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        Saved
                    </span>
                </div>

                <p className="mt-1 text-xs text-stone-400">
                    {year || 'Cinema'}
                </p>

                {/* Action Buttons */}
                <div className="mt-3.5 space-y-2 pt-2 border-t border-white/5">
                    <Link href={`/movie/${movie.id}-${movieName}`} className="block">
                        <button className="w-full cursor-pointer rounded-xl bg-linear-to-r from-[#ee162f] to-[#fc6743] hover:from-[#fd3148] hover:to-[#fc6743] py-2 text-xs font-bold text-white transition-all duration-200 shadow-md shadow-red-600/20 hover:scale-[1.02] flex items-center justify-center gap-1.5">
                            <FaPlay className="text-[10px]" />
                            <span>View Movie</span>
                        </button>
                    </Link>

                    <RemoveItemBtn movie={movie} btnType={btnType} />
                </div>
            </div>

        </div>
    );
};

export default SelectedCard;
