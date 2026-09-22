import { IMovie } from '../DataType';
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import Btn from './favouriteBtn/Btn';

interface IMoviePropss {
    movie: IMovie;
}

const SeledtedMovieCard = ({ movie }: IMoviePropss) => {
    const newLocal = "absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent";
    return (
        <div className="min-h-screen bg-[#0d253f] text-white">

            {/* ================= BACKDROP ================= */}
            <div className="relative h-105 w-full">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        className="h-full w-full object-cover object-top"
                    />
                    {/* Single clean gradient (TMDB style) */}
                    <div className="absolute inset-0 bg-linear-to-r from-[#0d253f] via-[#0d253f]/85 to-[#0d253f]/60"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-[#0d253f] via-transparent to-transparent"></div>
                </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="relative mx-auto max-w-7xl px-6 -mt-64 pb-20">
                <div className="flex flex-col md:flex-row gap-10">

                    {/* ---------- LEFT: POSTER ---------- */}
                    <div className="shrink-0 mx-auto md:mx-0">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-75 rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* ---------- RIGHT: INFO ---------- */}
                    <div className="flex-1">

                        {/* Title + Year */}
                        <div className="flex flex-wrap items-baseline gap-3">
                            <h1 className="text-3xl md:text-4xl font-bold">
                                {movie.title}
                            </h1>
                            <span className="text-3xl md:text-4xl font-light text-gray-300">
                                ({movie.release_date?.slice(0, 4)})
                            </span>
                        </div>

                        {/* Meta Row — TMDB style */}
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                            <span className="rounded border border-gray-500 px-2 py-0.5 text-gray-300">
                                {movie.adult ? "R" : "PG-13"}
                            </span>
                            <span className="text-gray-300">
                                {movie.release_date}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-300 uppercase">
                                {movie.original_language}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-300">
                                {movie.genres.map(g => g.name).join(", ")}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-300">
                                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                            </span>
                        </div>

                        {/* ---------- ACTIONS ROW (TMDB iconic) ---------- */}
                        <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">

                            {/* Score Ring — TMDB style */}
                            {(() => {
                                const percentage = Math.round(movie.vote_average * 10);
                                return (
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-16 w-16">
                                            <div
                                                className="h-full w-full rounded-full"
                                                style={{
                                                    background: `conic-gradient(#ee162f ${percentage}%, #1a2f47 ${percentage}%)`,
                                                }}
                                            ></div>
                                            <div className="absolute inset-1 flex items-center justify-center rounded-full bg-[#0d253f]">
                                                <span className="text-lg font-bold">
                                                    {percentage}
                                                    <span className="text-xs">%</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-sm font-semibold leading-tight">
                                            <div>User</div>
                                            <div>Score</div>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Action Icons — TMDB list style */}
                            <Btn movie={movie} />
                        </div>

                        {/* ---------- TAGLINE ---------- */}
                        {movie.tagline && (
                            <p className="mt-8 text-lg italic text-gray-400">
                                {movie.tagline}
                            </p>
                        )}

                        {/* ---------- OVERVIEW ---------- */}
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">Overview</h2>
                            <p className="max-w-3xl text-gray-300 leading-relaxed">
                                {movie.overview || "No overview available."}
                            </p>
                        </div>

                        {/* ---------- CREW (like TMDB) ---------- */}
                        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                            <div>
                                <p className="font-semibold text-white">Director</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    {"—"}
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-white">Writer</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    {"—"}
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-white">Status</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    {movie.status || "Released"}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ================= STATS SECTION (TMDB style) ================= */}
                <div className="mt-16 border-t border-white/10 pt-8">
                    <h3 className="text-xl font-semibold mb-6">Details</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

                        {[
                            { label: "Popularity", value: movie.popularity?.toFixed(1) },
                            { label: "Movie ID", value: movie.id },
                            { label: "Votes", value: movie.vote_count?.toLocaleString() },
                            { label: "Language", value: movie.original_language?.toUpperCase() },
                            { label: "Release Date", value: movie.release_date },
                            { label: "Runtime", value: `${movie.runtime} min` },
                            { label: "Budget", value: movie.budget ? `$${movie.budget.toLocaleString()}` : "—" },
                            { label: "Revenue", value: movie.revenue ? `$${movie.revenue.toLocaleString()}` : "—" },
                        ].map((stat, i) => (
                            <div key={i} className="border-l-2 border-[#ee162f]/40 pl-4">
                                <p className="text-xs uppercase tracking-wider text-gray-500">
                                    {stat.label}
                                </p>
                                <p className="mt-1 text-base font-semibold text-white">
                                    {stat.value ?? "—"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>


            {/* ================= DEVELOPER IDENTITY ================= */}
            <div className="mt-20 border-t border-white/10 pt-10">
                <div className="w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* ---------- LEFT: IDENTITY ---------- */}
                    <div className="flex items-center gap-4">
                        {/* Avatar with gradient ring + online dot */}
                        <div className="relative">
                            <div className="h-16 w-16 rounded-full bg-linear-to-br from-[#16a34a] via-[#22c55e] to-[#4ade80] p-0.5 shadow-lg shadow-[#22c55e]/30">                                <img
                                src="https://github.com/sm-sazzad.png"
                                alt="SM Sazzad"
                                className="h-full w-full rounded-full object-cover bg-[#0d253f]"
                            />
                            </div>
                            {/* Online Indicator */}
                            <span className="absolute bottom-0.5 right-0.5 flex h-4 w-4">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 border-2 border-[#0d253f]"></span>
                            </span>
                        </div>

                        {/* Name + Role */}
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
                                Designed & Developed by
                            </p>
                            <h3 className="mt-1 text-lg font-bold text-white leading-tight">
                                SM Sazzad
                            </h3>
                            <p className="text-sm text-gray-400 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#fc6743]"></span>
                                Frontend Developer • Next.js & Tailwind
                            </p>
                        </div>
                    </div>

                    {/* ---------- RIGHT: SOCIAL LINKS ---------- */}
                    <div className="flex items-center gap-2.5">

                        {/* GitHub */}
                        <a
                            href="https://github.com/sm-sazzad"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GitHub"
                            className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-black/40"
                        >
                            <span className="absolute inset-0 bg-linear-to-br from-[#333] to-[#171515] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <FaGithub className="relative text-lg" />
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/sm-sazzad/"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="LinkedIn"
                            className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-[#0A66C2]/40"
                        >
                            <span className="absolute inset-0 bg-linear-to-br from-[#0A66C2] to-[#0077B5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <FaLinkedin className="relative text-lg" />
                        </a>

                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/sazzad.hossain.5758/"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Facebook"
                            className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-[#1877F2]/40"
                        >
                            <span className="absolute inset-0 bg-linear-to-br from-[#1877F2] to-[#0C5DC7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <FaFacebook className="relative text-lg" />
                        </a>

                        {/* Email (Gmail compose) */}
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=sazzadhossain5758@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Send Email"
                            className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-[#EA4335]/40"
                        >
                            <span className="absolute inset-0 bg-linear-to-br from-[#EA4335] to-[#C5221F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <FaEnvelope className="relative text-lg" />
                        </a>

                        {/* Divider */}
                        <div className="hidden md:block h-8 w-px bg-white/10 mx-1"></div>

                        {/* Primary CTA — Hire / Connect */}
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=sazzadhossain5758@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative hidden md:flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-[#ee162f]/20 hover:shadow-[#fc6743]/40"
                        >
                            <span className="absolute inset-0 bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743]"></span>
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/30 to-transparent"></span>
                            <span className="relative flex items-center gap-2">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8M3 8a2 2 0 012-2h14a2 2 0 012 2" />
                                </svg>
                                Hire Me
                            </span>
                        </a>
                    </div>
                </div>

                {/* ---------- FOOTER BOTTOM BAR ---------- */}
                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                    {/* <p>
                        © {new Date().getFullYear()}{" "}
                        <span className="text-gray-300 font-medium">SM Sazzad</span>. All rights reserved.
                    </p>

                    <p className="flex items-center gap-1.5 pb-3">
                        Built with
                        <span className="text-white font-semibold">Next.js</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-[#38bdf8] font-semibold">Tailwind CSS</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-[#ee162f]">♥</span>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default SeledtedMovieCard;