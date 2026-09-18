import SeledtedMovieCard from '@/app/Components/SeledtedMovieCard';
import { IMovie } from '@/app/DataType';
import { getMovies } from '@/app/page';
import React from 'react';

const getAllMovies = async (): Promise<IMovie[]> => {
    const res = await fetch(
        "https://api.themoviedb.org/3/discover/movie",
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },
        }
    );

    const data = await res.json();
    return data.results;
};


const DynamicPage = async ({ params }: { params: Promise<{ movie: string }> }) => {

    const { movie } = await params;
    const movies = await getAllMovies();

    const movieId = movie.split("-")[0];

    const selectMovie = movies.find(n => n.id === JSON.parse(movieId))
    // console.log(selectMovie)

    if (!selectMovie) {
        return <div>Movie not found</div>;
    }


    return (
        <div>
            {
                <SeledtedMovieCard movie={selectMovie} />
            }
        </div>
    );
};

export default DynamicPage;