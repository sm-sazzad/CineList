import { IMovie } from "./DataType";
import MovieCard from "./Components/MovieCard";

export const getMovies = async (): Promise<IMovie[]> => {
  const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });

  const data = await res.json();

  // console.log(data);

  return data.results;
};



export default async function Home() {

  const movies = await getMovies();
  console.log(movies);

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">



      <main className="grid grid-cols-6 gap-4  w-[90%] mx-auto mt-20">
        {
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        }
      </main>
    </div>
  );
}
