"use client";

import { MoviesContext } from '@/app/Context/MoviesContext';
import { useContext } from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';

const Haamburger = () => {
    const { setIsOpen } = useContext(MoviesContext);

    return (
        <div>
            <HiMenuAlt1 className='text-2xl cursor-pointer text-white' onClick={() => setIsOpen(true)} />
        </div>
    );
};

const Sidebar = () => {
    const { isOpen, setIsOpen } = useContext(MoviesContext);

    return (
        <div
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 bg-black/70 backdrop-blur-xs z-100 duration-300 transition-opacity ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute left-0 top-0 bottom-0 w-[75%] sm:w-[50%] bg-slate-900 border-r border-white/10 p-5 duration-300 transition-transform overflow-y-auto ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className='flex items-center justify-between pb-4 border-b border-white/10'>
                    <span className='text-lg font-bold text-white'>
                        Cine<span className='text-red-500'>List</span>
                    </span>
                    <RxCross2
                        onClick={() => setIsOpen(false)}
                        className='text-white font-bold text-2xl cursor-pointer hover:text-red-500 transition-colors'
                    />
                </div>
                <div className='mt-4'>
                    <ul className='flex flex-col gap-1'>
                        <SidebarLink />
                    </ul>
                </div>
            </div>
        </div>
    );
};

const SidebarLink = () => {
    const { setIsOpen } = useContext(MoviesContext);
    const pathName = usePathname();
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

    return (
        <>
            <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                    pathName === "/"
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
            >
                Home
            </Link>

            <Link
                href="/trending-movies"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                    pathName === "/trending-movies"
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
            >
                Trending Movies
            </Link>

            <Link
                href="/popular-movies"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                    pathName === "/popular-movies"
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
            >
                Popular Movies
            </Link>

            <Link
                href="/all-movies"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                    pathName === "/all-movies"
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
            >
                All Movies
            </Link>

            <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                    pathName === "/contact"
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
            >
                Contact
            </Link>

            {/* Mobile Auth Divider */}
            <div className='my-3 border-t border-white/10' />

            {session?.user ? (
                <div className='flex flex-col gap-2 pt-1'>
                    <div className='px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3'>
                        {session.user.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={session.user.image}
                                alt={session.user.name || "User"}
                                className='w-8 h-8 rounded-full object-cover border border-red-500'
                            />
                        ) : (
                            <div className='w-8 h-8 rounded-full bg-linear-to-tr from-[#ee162f] to-[#fc6743] flex items-center justify-center text-white text-xs font-bold shrink-0'>
                                {(session.user.name || session.user.email || "U").charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className='truncate'>
                            <p className='text-xs font-semibold text-white truncate'>
                                {session.user.name || "Movie Fan"}
                            </p>
                            <p className='text-[10px] text-gray-400 truncate'>
                                {session.user.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className='cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 font-medium text-sm transition-colors'
                    >
                        <HiOutlineLogout className='text-lg' />
                        <span>Sign Out</span>
                    </button>
                </div>
            ) : (
                <div className='flex flex-col gap-2 pt-1'>
                    <Link
                        href="/sign-in"
                        onClick={() => setIsOpen(false)}
                        className='w-full text-center px-4 py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/10 font-medium text-sm transition-colors'
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/sign-up"
                        onClick={() => setIsOpen(false)}
                        className='w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] text-white font-semibold text-sm shadow-md shadow-red-600/30'
                    >
                        <HiOutlineUser className='text-base' />
                        <span>Sign Up</span>
                    </Link>
                </div>
            )}
        </>
    );
};

export default Haamburger;
export { Sidebar, SidebarLink };
