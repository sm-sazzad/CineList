import Image from 'next/image';
import React from 'react';
import navlogo from '../assets/CineListLogo.png'
import Link from 'next/link';

const Navbar = () => {

    const link = <>
        <Link href={"/home"}><li>Home</li></Link>
        <Link href={"/Popular"}><li>Popular Movies</li></Link>
        <Link href={"/all-movies"}><li>All Movies</li></Link>
        <Link href={"/contact"}><li>Contact</li></Link>
    </>


    return (
        <div className='border-b border-white/20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 sticky top-0 z-50 backdrop-blur-md'>
            <nav className='flex justify-between items-center gap-4 w-[90%] max-w-7xl mx-auto py-4'>

                {/* Logo */}
                <div className='flex items-center'>
                    <Image
                        src={navlogo}
                        alt='CineList'
                        className='h-10 w-auto hover:scale-105 transition-transform duration-300'
                    />
                </div>

                {/* Nav Links - Desktop */}
                <ul className='hidden md:flex items-center gap-8 text-white font-medium'>
                    {link}
                </ul>

                {/* Watchlist Button with Badge */}
                <div className="indicator">
                    <span className="indicator-item badge badge-secondary badge-sm font-bold">
                        12
                    </span>
                    <button className="btn btn-outline btn-sm md:btn-md text-white border-white/40 hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        My Watchlist
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;