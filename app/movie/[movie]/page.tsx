import SeledtedMovieCard from '@/app/Components/SeledtedMovieCard';
import { getMovies } from '@/app/page';
import React from 'react';

const DynamicPage = async ({ params }: { params: Promise<{ movie: string }> }) => {

    const { movie } = await params;
    const movies = await getMovies();

    const movieId = movie.split("-")[0];

    const selectMovie = movies.find(n => n.id === JSON.parse(movieId))
    console.log(selectMovie)

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