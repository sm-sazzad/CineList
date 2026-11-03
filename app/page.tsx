import Banner from "./Components/Banner";
import StatsBar from "./Components/StatsBar";
import GenreChips from "./Components/GenreChips";
import TrendingMovies from "./Components/TrendingMovies";
import Popular from "./Components/Popular";
import FeatureSection from "./Components/FeatureSection";
import Movies from "./Components/Movies";

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div className="flex flex-col w-full font-sans bg-black selection:bg-red-500 selection:text-white">
      <Banner />
      <StatsBar />
      <GenreChips />
      <TrendingMovies />
      <Popular />
      <FeatureSection />
      <Movies />
    </div>
  );
}
