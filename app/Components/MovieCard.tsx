import Image from 'next/image';
import { IMovie } from '../DataType';
import { IoMdStar } from 'react-icons/io';
import { MdFavorite } from 'react-icons/md';
import Link from 'next/link';

export interface IMovieProps {
    movie: IMovie;
}

const MovieCard = ({ movie }: IMovieProps) => {
    const movieName = movie.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
    console.log(movieName)
    return (
        <Link href={`/movie/${movie.id}-${movieName}`}>
            <div className='shadow-md shadow-stone-800/50 bg-stone-900 text-white rounded-2xl cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
                <div className='relative'>
                    <Image
                        className='w-full object-cover'
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={300}
                        height={450}
                    />

                    {movie.adult === false && (
                        <span className='absolute top-2 right-2 bg-red-600/80 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full ring-1 ring-red-400/50 shadow-md'>
                            Adult
                        </span>
                    )}

                    <p className='absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full shadow-md'>
                        <IoMdStar className='inline text-yellow-400' />
                        {movie.vote_average.toFixed(1)}
                    </p>
                </div>

                <div className='py-3 px-3 pb-4 space-y-2'>
                    <h1 className='font-semibold text-sm line-clamp-1' title={movie.title}>
                        {movie.title}
                    </h1>

                    <div className='flex justify-between items-center text-xs text-stone-400'>
                        <p>{movie.release_date}</p>
                        <button className='hover:text-red-500 transition-colors'>
                            <MdFavorite className='text-xl' />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;