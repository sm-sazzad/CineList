"use client"
import React, { useState } from 'react';
import PopularMovieCard from '../Components/PopularMovieCard';
import { IMovie } from '../DataType';

const MoreBtn = ({ Movies, type }: { Movies: IMovie[], type: string }) => {

    const [allMovies, setAllMovies] = useState<IMovie[]>(Movies);
    const [moviePages, setMoviePages] = useState(1);
    const [popular, setPopular] = useState<IMovie[]>(Movies);
    const [pages, setPages] = useState(30);

    const handleMoreBtn = async () => {
        let nextPage = pages + 1;

        const res = await fetch(`/api/movies/popular-movies?page=${nextPage}`);
        const newMovies = await res.json();

        setPopular((previousMOvies: IMovie[]) => [...previousMOvies, ...newMovies]);
        setPages(nextPage);
    }

    const handleMovie = async () => {
        let nextPage = moviePages + 1;

        const res = await fetch(`/api/movies/all-movies?page=${nextPage}`)
        const newMovies = await res.json();
        setAllMovies(pre => [...pre, ...newMovies]);
        setMoviePages(nextPage);
    }

    return (<>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {
                type === "movies" ? (allMovies.map(movie => <PopularMovieCard key={movie.id} movie={movie} />))
                    : (popular.map((movie: IMovie) => (<PopularMovieCard key={movie.id} movie={movie} />)))
            }
        </div>
        <div className='flex justify-center mt-10'>
            <button onClick={type === "popular" ? handleMoreBtn : handleMovie}
                className='group cursor-pointer px-8 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 flex items-center gap-2'>
                Load More
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </button>
        </div>
    </>);
};

export default MoreBtn;