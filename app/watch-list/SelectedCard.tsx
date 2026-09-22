import { IMovie } from '../DataType';
import Image from 'next/image';
import { IoMdStar } from 'react-icons/io';
import RemoveItemBtn from './RemoveItemBtn';

const SelectedCard = ({ movie, btnType }: { movie: IMovie, btnType: "watchlist" | "favourite" }) => {
    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-stone-900 text-white shadow-lg shadow-black/30 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50">

            {/* Poster */}
            <div className="relative overflow-hidden">

                <Image
                    className="aspect-[2/2.7] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={405}
                />

                {/* Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-stone-900 to-transparent pointer-events-none" />

                {/* Adult */}
                {movie.adult === true && (
                    <span className="absolute right-2.5 top-2.5 rounded-full bg-red-600/90 px-2 py-0.5 text-[10px] font-semibold shadow-md backdrop-blur-md">
                        Adult
                    </span>
                )}

                {/* Rating */}
                <p className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-semibold backdrop-blur-md">
                    <IoMdStar className="text-yellow-400" />
                    {movie.vote_average.toFixed(1)}
                </p>

            </div>


            {/* Info */}
            <div className="flex flex-1 flex-col px-3 py-3">

                <div className="flex items-center justify-between gap-2">

                    <h1
                        className="line-clamp-1 min-w-0 text-sm font-semibold"
                        title={movie.title}
                    >
                        {movie.title}
                    </h1>

                    <span className="shrink-0 text-[10px] text-emerald-400">
                        Saved
                    </span>

                </div>

                <p className="mt-1 text-[11px] text-stone-500">
                    {movie.release_date}
                </p>


                {/* Actions */}
                <div className="mt-3 space-y-1.5">

                    <button
                        className="w-full cursor-pointer rounded-lg bg-[#ee162f] py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-red-700 hover:shadow-md hover:shadow-red-600/20"
                    >
                        Start Watching
                    </button>

                    <RemoveItemBtn movie={movie} btnType={btnType} />

                </div>

            </div>

        </div>
    );
};

export default SelectedCard;