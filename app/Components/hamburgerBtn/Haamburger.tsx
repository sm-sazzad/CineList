"use client";

import { MoviesContext } from '@/app/Context/MoviesContext';
import { useContext } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import { toast } from '@/app/Components/Toast/Toast';
import { HiOutlineLogout, HiOutlineUser, HiOutlineBookmark } from 'react-icons/hi';

const Haamburger = () => {
    const { setIsOpen } = useContext(MoviesContext);

    return (
        <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white transition-all cursor-pointer active:scale-95 shadow-sm"
            aria-label="Open mobile menu"
        >
            <HiMenuAlt3 className="text-xl" />
        </button>
    );
};

const Sidebar = () => {
    const { isOpen, setIsOpen } = useContext(MoviesContext);

    return (
        <div
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-100 duration-300 transition-opacity ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute right-0 top-0 bottom-0 w-[82%] max-w-xs sm:max-w-sm bg-stone-950/98 border-l border-white/10 p-5 sm:p-6 duration-300 transition-transform overflow-y-auto flex flex-col justify-between shadow-2xl backdrop-blur-2xl ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                        <span className="text-xl font-black text-white tracking-tight">
                            Cine<span className="bg-linear-to-r from-[#ee162f] to-[#fc6743] bg-clip-text text-transparent">List</span>
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label="Close menu"
                        >
                            <RxCross2 className="text-2xl" />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <div className="mt-5">
                        <ul className="flex flex-col gap-1.5">
                            <SidebarLink />
                        </ul>
                    </div>
                </div>

                {/* Footer User Info / Auth */}
                <div className="mt-8 pt-4 border-t border-white/10">
                    <SidebarAuth />
                </div>
            </div>
        </div>
    );
};

const SidebarLink = () => {
    const { setIsOpen } = useContext(MoviesContext);
    const pathName = usePathname();

    const links = [
        { href: "/", label: "Home" },
        { href: "/trending-movies", label: "Trending Movies" },
        { href: "/popular-movies", label: "Popular Movies" },
        { href: "/all-movies", label: "All Movies" },
        { href: "/watch-list", label: "My Watchlist", icon: <HiOutlineBookmark className="text-lg" /> },
        { href: "https://sazzad-dev.vercel.app/", label: "Contact", external: true },
    ];

    return (
        <>
            {links.map((item, idx) => {
                const isActive = pathName === item.href;
                if (item.external) {
                    return (
                        <a
                            key={idx}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 rounded-xl font-semibold text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between"
                        >
                            <span>{item.label}</span>
                            <span className="text-xs text-gray-500">↗</span>
                        </a>
                    );
                }

                return (
                    <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-between ${
                            isActive
                                ? "bg-linear-to-r from-[#ee162f] to-[#fc6743] text-white shadow-lg shadow-red-600/30 font-bold"
                                : "text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        <span>{item.label}</span>
                        {item.icon}
                    </Link>
                );
            })}
        </>
    );
};

const SidebarAuth = () => {
    const { setIsOpen } = useContext(MoviesContext);
    const { data: session } = useSession();

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("Signed out successfully.");
            setIsOpen(false);
        } catch {
            toast.error("Failed to sign out.");
        }
    };

    if (session?.user) {
        const user = session.user;
        const displayName = user.name || user.email?.split("@")[0] || "User";
        const initial = displayName.charAt(0).toUpperCase();

        return (
            <div className="flex flex-col gap-3">
                <div className="px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    {user.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={user.image}
                            alt={displayName}
                            referrerPolicy="no-referrer"
                            className="w-9 h-9 rounded-full object-cover ring-1 ring-red-500/50 shrink-0"
                        />
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-linear-to-tr from-[#ee162f] to-[#fc6743] flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {initial}
                        </div>
                    )}
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white truncate">
                            {displayName}
                        </p>
                        <p className="text-[10px] text-gray-400 truncate">
                            {user.email}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleSignOut}
                    className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                    <HiOutlineLogout className="text-base" />
                    <span>Sign Out</span>
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2.5">
            <Link
                href="/sign-in"
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-4 py-2.5 rounded-xl border border-white/20 text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider transition-colors"
            >
                Sign In
            </Link>
            <Link
                href="/sign-up"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 hover:scale-[1.02] transition-transform"
            >
                <HiOutlineUser className="text-sm" />
                <span>Create Account</span>
            </Link>
        </div>
    );
};

export default Haamburger;
export { Sidebar, SidebarLink };
