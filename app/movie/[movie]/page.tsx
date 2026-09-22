import SeledtedMovieCard from '@/app/Components/SeledtedMovieCard';

// const getAllMovies = async (): Promise<IMovie[]> => {
//     const res = await fetch(
//         `https://api.themoviedb.org/3/find/{}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
//             },
//         }
//     );

//     const data = await res.json();
//     return data.results;
// };


const DynamicPage = async ({ params }: { params: Promise<{ movie: string }> }) => {

    const { movie } = await params;
    // const movies = await getAllMovies();

    const movieId = movie.split("-")[0];
    // console.log(movieId)
    // const selectMovie = movies.find(n => n.id === JSON.parse(movieId))
    // console.log(selectMovie)

    const findMovie = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },
        }
    );
    const data = await findMovie.json();
    const selectMovie = data;


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