import SeledtedMovieCard from '@/app/Components/SeledtedMovieCard';
import { getServerSession } from '@/lib/auth-server';
import { redirect } from 'next/navigation';

const DynamicPage = async ({ params }: { params: Promise<{ movie: string }> }) => {
    const { movie } = await params;

    const session = await getServerSession();
    if (!session) {
        redirect(`/sign-in?callbackUrl=${encodeURIComponent(`/movie/${movie}`)}`);
    }

    const movieId = movie.split("-")[0];

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
