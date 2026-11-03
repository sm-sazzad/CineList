import SeledtedMovieCard from '@/app/Components/SeledtedMovieCard';
import { getServerSession } from '@/lib/auth-server';
import { redirect } from 'next/navigation';
import { ICredits, IMovie } from '@/app/DataType';

const DynamicPage = async ({ params }: { params: Promise<{ movie: string }> }) => {
    const { movie } = await params;

    const session = await getServerSession();
    if (!session) {
        redirect(`/sign-in?callbackUrl=${encodeURIComponent(`/movie/${movie}`)}`);
    }

    const movieId = movie.split("-")[0];

    // Fetch movie details, credits (cast & crew), and recommendations concurrently
    const [findMovie, creditsRes, recsRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },
            cache: 'no-store',
        }),
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },
            cache: 'no-store',
        }),
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },
            cache: 'no-store',
        }),
    ]);

    const selectMovie: IMovie = await findMovie.json();
    const credits: ICredits = creditsRes.ok ? await creditsRes.json() : { id: Number(movieId), cast: [], crew: [] };
    let recommendationsData = recsRes.ok ? await recsRes.json() : { results: [] };

    // If recommendations are fewer than 4, try fallback to similar movies
    if (!recommendationsData.results || recommendationsData.results.length < 4) {
        try {
            const similarRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar`, {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                },
                cache: 'no-store',
            });
            if (similarRes.ok) {
                const similarData = await similarRes.json();
                if (similarData.results && similarData.results.length > 0) {
                    const existingIds = new Set((recommendationsData.results || []).map((m: IMovie) => m.id));
                    const newMovies = similarData.results.filter((m: IMovie) => !existingIds.has(m.id));
                    recommendationsData = {
                        ...recommendationsData,
                        results: [...(recommendationsData.results || []), ...newMovies],
                    };
                }
            }
        } catch {
            // graceful fallback
        }
    }

    if (!selectMovie || !selectMovie.id) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center p-8 rounded-2xl bg-stone-900 border border-white/10 max-w-md">
                    <h2 className="text-xl font-bold text-red-500 mb-2">Movie Not Found</h2>
                    <p className="text-sm text-gray-400 mb-6">
                        The requested movie could not be located in our cinema registry.
                    </p>
                    <a
                        href="/all-movies"
                        className="px-6 py-2.5 rounded-full bg-linear-to-r from-[#ee162f] to-[#fc6743] text-white text-xs font-bold uppercase tracking-wider shadow-lg"
                    >
                        Browse Movies
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div>
            <SeledtedMovieCard
                movie={selectMovie}
                credits={credits}
                recommendations={recommendationsData.results || []}
            />
        </div>
    );
};

export default DynamicPage;
