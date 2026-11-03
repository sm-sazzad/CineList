import Image from 'next/image';
import Link from 'next/link';
import footerImg from "../assets/CineListLogo.png";
import { FaGlobe, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Trending Movies", href: "/trending-movies" },
    { label: "Popular Movies", href: "/popular-movies" },
    { label: "All Movies", href: "/all-movies" },
    { label: "My Watchlist", href: "/watch-list" },
];

const contactLinks = [
    {
        label: "Portfolio Website",
        href: "https://sazzad-dev.vercel.app/",
        icon: <FaGlobe className="text-[#fc6743]" />,
        highlight: true,
    },
    {
        label: "GitHub",
        href: "https://www.github.com/sm-sazzad",
        icon: <FaGithub className="text-gray-300 group-hover:text-white" />,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/sm-sazzad/",
        icon: <FaLinkedin className="text-[#0A66C2]" />,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/sazzad_hossain5758/",
        icon: <FaInstagram className="text-[#E4405F]" />,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/sazzad.hossain.5758/",
        icon: <FaFacebook className="text-[#1877F2]" />,
    },
    {
        label: "Email",
        href: "mailto:sazzadhossain5758@gmail.com",
        icon: <FaEnvelope className="text-[#EA4335]" />,
    },
];

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 px-6 py-14 sm:py-16 md:px-10 lg:px-20 text-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 pb-12 border-b border-white/10">

                {/* Brand Column */}
                <div className="text-left sm:col-span-2 lg:col-span-1">
                    <Link href="/" className="inline-block">
                        <Image
                            src={footerImg}
                            alt="CineList"
                            priority
                            className="h-10 sm:h-12 w-auto hover:scale-105 transition-transform"
                        />
                    </Link>

                    <p className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-widest bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent">
                        Discover → Track → Enjoy
                    </p>

                    <p className="mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-gray-400">
                        Explore millions of blockbusters, build your customized cloud watchlist, and uncover global cinema trends in one sleek experience.
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Live TMDB API & Cloud Sync</span>
                    </div>
                </div>

                {/* Quick Links Column */}
                <div className="text-left">
                    <h2 className="mb-4 text-base sm:text-lg font-bold bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent">
                        Quick Links
                    </h2>

                    <ul className="space-y-2.5 flex flex-col items-start text-xs sm:text-sm text-gray-400">
                        {quickLinks.map((link, idx) => (
                            <li key={idx}>
                                <Link
                                    href={link.href}
                                    className="group flex items-center gap-2 hover:text-white transition-colors duration-200"
                                >
                                    <span className="text-red-500 text-xs font-bold group-hover:translate-x-1 transition-transform">
                                        ›
                                    </span>
                                    <span>{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Column */}
                <div className="text-left sm:col-span-2 lg:col-span-2">
                    <h2 className="mb-4 text-base sm:text-lg font-bold bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent">
                        Connect & Developer
                    </h2>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-gray-400">
                        {contactLinks.map((link, idx) => (
                            <li key={idx}>
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`group flex items-center gap-3 p-2 rounded-xl transition-all duration-200 ${
                                        link.highlight
                                            ? "bg-white/[0.04] border border-red-500/30 hover:border-red-500/60 hover:bg-white/[0.08] text-white"
                                            : "hover:bg-white/5 hover:text-white"
                                    }`}
                                >
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-black/60 border border-white/10 group-hover:scale-110 group-hover:border-white/20 transition-all shrink-0">
                                        {link.icon}
                                    </span>
                                    <span className="truncate font-medium">{link.label}</span>
                                    {link.highlight && (
                                        <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                                            Live
                                        </span>
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Credits Bar */}
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 pt-6 text-xs text-gray-500 sm:flex-row">
                <p>© {new Date().getFullYear()} CineList. All rights reserved.</p>

                <p className="flex items-center gap-1.5">
                    <span>Designed & Developed by</span>
                    <a
                        href="https://sazzad-dev.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-gray-300 hover:text-red-400 transition-colors underline underline-offset-4"
                    >
                        SM Sazzad
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
