import { IMovie } from "./DataType";
import MovieCard from "./Components/PopularMovieCard";
import Banner from "./Components/Banner";
import Popular from "./Components/Popular";
import TrendingMovies from "./Components/TrendingMovies";
import Movies from "./Components/Movies";




export default async function Home() {

  return (
    <div className="flex flex-col items-center justify-center  font-sans bg-black">
      <Banner />
      <TrendingMovies />
      <Popular />
      <Movies />

    </div>
  );
}
