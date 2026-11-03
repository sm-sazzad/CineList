"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
    href: string;
    label: string;
    shortLabel?: string;
    external?: boolean;
}

const navItems: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/trending-movies", label: "Trending Movies", shortLabel: "Trending" },
    { href: "/popular-movies", label: "Popular Movies", shortLabel: "Popular" },
    { href: "/all-movies", label: "All Movies" },
    { href: "https://sazzad-dev.vercel.app/", label: "Contact", external: true },
];

const NavLink = () => {
    const pathName = usePathname();

    return (
        <>
            {navItems.map((item, idx) => {
                const isActive = !item.external && pathName === item.href;

                const content = (
                    <li
                        className={`group relative px-3 xl:px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer list-none flex items-center gap-1.5 select-none ${
                            isActive
                                ? "text-white bg-white/[0.08] shadow-inner"
                                : "text-gray-300 hover:text-white hover:bg-white/[0.05]"
                        }`}
                    >
                        {/* Active Micro Red Cinema Dot */}
                        {isActive && (
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ee162f]" />
                            </span>
                        )}

                        {/* Label */}
                        <span className="relative z-10 transition-colors">
                            {item.shortLabel ? (
                                <>
                                    <span>{item.shortLabel}</span>
                                    <span className="hidden xl:inline"> Movies</span>
                                </>
                            ) : (
                                item.label
                            )}
                        </span>

                        {/* External Arrow for Contact */}
                        {item.external && (
                            <span className="text-[10px] text-gray-500 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                                ↗
                            </span>
                        )}

                        {/* Glowing Red Underline on Hover & Active */}
                        <span
                            className={`absolute -bottom-1 left-2.5 right-2.5 h-[2px] rounded-full bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] transition-all duration-300 pointer-events-none ${
                                isActive
                                    ? "opacity-100 scale-x-100 shadow-[0_0_10px_#ee162f]"
                                    : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 shadow-[0_0_8px_#ee162f]"
                            }`}
                        />
                    </li>
                );

                if (item.external) {
                    return (
                        <a
                            key={idx}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            {content}
                        </a>
                    );
                }

                return (
                    <Link key={idx} href={item.href} className="inline-block">
                        {content}
                    </Link>
                );
            })}
        </>
    );
};

export default NavLink;
