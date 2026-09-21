import Image from 'next/image';
import { IMovie } from '../DataType';
import { IoMdStar } from 'react-icons/io';
import { MdFavorite } from 'react-icons/md';
import Link from 'next/link';

export interface IMovieProps {
    movie: IMovie;
}

const PopularMovieCard = ({ movie }: IMovieProps) => {
    const movieName = movie.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
    // console.log(movieName)
    return (
        <Link href={`/movie/${movie.id}-${movieName}`}>

            <div className="group flex flex-col h-full overflow-hidden rounded-2xl bg-stone-900 text-white shadow-lg shadow-black/30 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50">

                {/* Poster */}
                <div className="relative overflow-hidden">

                    <Image
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={300}
                        height={450}
                    />

                    {/* Bottom Gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-stone-900 to-transparent pointer-events-none" />

                    {/* Adult Badge */}
                    {movie.adult === true && (
                        <span className="absolute top-3 right-3 rounded-full bg-red-600/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg ring-1 ring-red-400/40 backdrop-blur-md">
                            Adult
                        </span>
                    )}

                    {/* Rating */}
                    <p className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                        <IoMdStar className="text-yellow-400 text-sm" />
                        {movie.vote_average.toFixed(1)}
                    </p>

                </div>

                {/* Movie Info */}
                <div className="flex flex-col flex-1 px-3.5 py-3">

                    <h1
                        className="line-clamp-1 text-sm font-semibold tracking-wide"
                        title={movie.title}
                    >
                        {movie.title}
                    </h1>

                    <div className="mt-2 flex items-center justify-between">

                        <p className="text-xs text-stone-400">
                            {movie.release_date}
                        </p>

                        <button
                            className="group/fav rounded-full p-1.5 text-stone-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-500 hover:scale-110 cursor-pointer"
                        >
                            <MdFavorite className="text-xl transition-transform duration-200 group-hover/fav:scale-110" />
                        </button>

                    </div>

                </div>

            </div>

        </Link>
    );
};

export default PopularMovieCard;