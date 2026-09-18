import { IMovie } from "./DataType";
import MovieCard from "./Components/PopularMovieCard";
import Banner from "./Components/Banner";
import Popular from "./Components/Popular";

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

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Banner />
      <Popular />

    </div>
  );
}
