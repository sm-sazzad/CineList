import { IMovie, ICredits } from '../DataType';
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import Btn from './favouriteBtn/Btn';
import BackButton from './BackButton';
import MovieCast from './MovieCast';
import MovieRecommendations from './MovieRecommendations';

interface IMoviePropss {
    movie: IMovie;
    credits?: ICredits;
    recommendations?: IMovie[];
}

const SeledtedMovieCard = ({ movie, credits, recommendations = [] }: IMoviePropss) => {
    const percentage = Math.round((movie.vote_average || 0) * 10);
    const releaseYear = movie.release_date?.slice(0, 4) || '';
    const runtimeHours = movie.runtime ? Math.floor(movie.runtime / 60) : 0;
    const runtimeMinutes = movie.runtime ? movie.runtime % 60 : 0;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-500 selection:text-white">

            {/* ================= HERO BACKDROP ================= */}
            <div className="relative h-[380px] sm:h-[480px] md:h-[550px] w-full overflow-hidden">
                {/* Floating Back Navigation Button */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-8 z-30">
                    <BackButton fallback="/all-movies" />
                </div>

                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
                    alt={movie.title}
                    className="h-full w-full object-cover object-top scale-105"
                />

                {/* Multi-layered cinematic overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 md:via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#ee162f]/20 blur-[150px] rounded-full pointer-events-none" />
            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 -mt-48 sm:-mt-64 md:-mt-80 pb-20 z-10">
                <div className="flex flex-col md:flex-row gap-6 sm:gap-10 md:gap-12">

                    {/* ---------- LEFT: POSTER ---------- */}
                    <div className="shrink-0 mx-auto md:mx-0">
                        <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/80 ring-1 ring-white/10 hover:ring-red-500/40 transition-all duration-300">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-52 sm:w-64 md:w-80 object-cover rounded-2xl sm:rounded-3xl shadow-2xl"
                            />
                            {movie.adult && (
                                <span className="absolute top-3 right-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                                    18+
                                </span>
                            )}
                        </div>
                    </div>

                    {/* ---------- RIGHT: INFO & METADATA ---------- */}
                    <div className="flex-1 text-center md:text-left">

                        {/* Title & Release Year */}
                        <div className="flex flex-wrap items-baseline justify-center md:justify-start gap-2.5 sm:gap-3">
                            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                                {movie.title}
                            </h1>
                            {releaseYear && (
                                <span className="text-xl sm:text-3xl font-light text-gray-400">
                                    ({releaseYear})
                                </span>
                            )}
                        </div>

                        {/* Meta Tags Row */}
                        <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
                            <span className="rounded-md border border-white/20 bg-white/5 px-2 py-0.5 font-semibold text-gray-200 text-[11px] sm:text-xs">
                                {movie.adult ? "R" : "PG-13"}
                            </span>
                            <span>{movie.release_date || "—"}</span>
                            <span className="text-gray-600">•</span>
                            <span className="uppercase font-semibold text-red-400">
                                {movie.original_language || "EN"}
                            </span>
                            {movie.genres && movie.genres.length > 0 && (
                                <>
                                    <span className="text-gray-600">•</span>
                                    <span className="text-gray-300">
                                        {movie.genres.map(g => g.name).join(", ")}
                                    </span>
                                </>
                            )}
                            {movie.runtime && movie.runtime > 0 ? (
                                <>
                                    <span className="text-gray-600">•</span>
                                    <span className="text-gray-300">
                                        {runtimeHours}h {runtimeMinutes}m
                                    </span>
                                </>
                            ) : null}
                        </div>

                        {/* ---------- ACTIONS ROW & SCORE ---------- */}
                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-stone-900/60 border border-white/10 backdrop-blur-md">

                            {/* Score Ring */}
                            <div className="flex items-center gap-3">
                                <div className="relative h-16 w-16 shrink-0">
                                    <div
                                        className="h-full w-full rounded-full"
                                        style={{
                                            background: `conic-gradient(#ee162f ${percentage}%, #27272a ${percentage}%)`,
                                        }}
                                    />
                                    <div className="absolute inset-1.5 flex items-center justify-center rounded-full bg-black">
                                        <span className="text-base font-extrabold text-white">
                                            {percentage}
                                            <span className="text-[10px]">%</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="text-xs font-bold leading-tight uppercase tracking-wider text-gray-300">
                                    <div>Audience</div>
                                    <div className="text-yellow-400">Score</div>
                                </div>
                            </div>

                            {/* Divider on desktop */}
                            <div className="hidden sm:block h-10 w-px bg-white/10" />

                            {/* Action Buttons (Trailer / Watchlist / Favorite / Share) */}
                            <Btn movie={movie} />
                        </div>

                        {/* Tagline */}
                        {movie.tagline && (
                            <p className="mt-6 text-base sm:text-lg italic text-gray-400 font-serif">
                                &ldquo;{movie.tagline}&rdquo;
                            </p>
                        )}

                        {/* Overview */}
                        <div className="mt-6">
                            <h2 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <span>Overview</span>
                            </h2>
                            <p className="max-w-3xl text-gray-300 text-sm sm:text-base leading-relaxed">
                                {movie.overview || "No synopsis available for this film."}
                            </p>
                        </div>

                        {/* Quick Crew / Status */}
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</p>
                                <p className="text-sm font-bold text-white mt-0.5">{movie.status || "Released"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Release Year</p>
                                <p className="text-sm font-bold text-white mt-0.5">{releaseYear || "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Audio / Format</p>
                                <p className="text-sm font-bold text-white mt-0.5">4K Ultra HD • Stereo</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ================= CAST & CREW ================= */}
                <MovieCast cast={credits?.cast} crew={credits?.crew} />

                {/* ================= STATS & FINANCIALS ================= */}
                <div className="mt-16 border-t border-white/10 pt-10">
                    <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white flex items-center gap-2">
                        <span>Film Details & Statistics</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            { label: "Popularity Index", value: movie.popularity?.toFixed(1) },
                            { label: "TMDB ID", value: movie.id },
                            { label: "Vote Count", value: movie.vote_count?.toLocaleString() },
                            { label: "Original Language", value: movie.original_language?.toUpperCase() },
                            { label: "Release Date", value: movie.release_date },
                            { label: "Runtime", value: movie.runtime ? `${movie.runtime} min` : "—" },
                            { label: "Budget", value: movie.budget ? `$${movie.budget.toLocaleString()}` : "—" },
                            { label: "Box Office Revenue", value: movie.revenue ? `$${movie.revenue.toLocaleString()}` : "—" },
                        ].map((stat, i) => (
                            <div key={i} className="p-4 rounded-xl bg-stone-900/60 border border-white/5 hover:border-red-500/30 transition-colors">
                                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                                    {stat.label}
                                </p>
                                <p className="mt-1.5 text-base sm:text-lg font-bold text-white">
                                    {stat.value ?? "—"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================= RECOMMENDATIONS ================= */}
                <MovieRecommendations movies={recommendations} currentMovieId={movie.id} />

                {/* ================= DEVELOPER IDENTITY ================= */}
                <div className="mt-20 border-t border-white/10 pt-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6 sm:p-8 rounded-3xl bg-stone-900/40 border border-white/5 backdrop-blur-md">

                        {/* Identity */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="h-16 w-16 rounded-full bg-linear-to-br from-[#ee162f] via-[#fd3148] to-[#fc6743] p-0.5 shadow-lg shadow-red-600/30">
                                    <img
                                        src="https://github.com/sm-sazzad.png"
                                        alt="SM Sazzad"
                                        className="h-full w-full rounded-full object-cover bg-black"
                                    />
                                </div>
                                <span className="absolute bottom-0.5 right-0.5 flex h-4 w-4">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 border-2 border-black" />
                                </span>
                            </div>

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                                    Designed & Developed by
                                </p>
                                <h3 className="mt-0.5 text-lg font-black text-white">
                                    SM Sazzad
                                </h3>
                                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#ee162f]" />
                                    Frontend Developer • Next.js & React
                                </p>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-2.5 flex-wrap justify-center">
                            {/* Portfolio */}
                            <a
                                href="https://sazzad-dev.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Portfolio Website"
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-linear-to-r hover:from-[#ee162f] hover:to-[#fc6743] hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-md shadow-red-600/10"
                            >
                                <FaGlobe className="text-lg" />
                            </a>

                            {/* GitHub */}
                            <a
                                href="https://github.com/sm-sazzad"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="GitHub"
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 shadow-md"
                            >
                                <FaGithub className="text-lg" />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/sm-sazzad/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="LinkedIn"
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-[#0A66C2] hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-md"
                            >
                                <FaLinkedin className="text-lg" />
                            </a>

                            <a
                                href="https://www.facebook.com/sazzad.hossain.5758/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Facebook"
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-[#1877F2] hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-md"
                            >
                                <FaFacebook className="text-lg" />
                            </a>

                            <a
                                href="mailto:sazzadhossain5758@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Send Email"
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-[#EA4335] hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-md"
                            >
                                <FaEnvelope className="text-lg" />
                            </a>

                            <div className="hidden md:block h-8 w-px bg-white/10 mx-1" />

                            <a
                                href="mailto:sazzadhossain5758@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative hidden md:flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white overflow-hidden shadow-lg shadow-red-600/30 hover:scale-105 transition-all duration-300"
                            >
                                <span className="absolute inset-0 bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743]" />
                                <span className="relative">Contact Dev</span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SeledtedMovieCard;
