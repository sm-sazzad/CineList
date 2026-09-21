import Image from 'next/image';
import React from 'react';
import navlogo from '../assets/CineListLogo.png'
import Link from 'next/link';
import WatchListBtn from '../watchlistBtn/WatchlistBtn';
import NavLink from './NavLink';

const Navbar = () => {

    const link = <NavLink />


    return (
        <div className='border-b border-white/20 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 sticky top-0 z-50 backdrop-blur-md'>
            <nav className='flex justify-between items-center gap-4 w-[90%] mx-auto py-4'>

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
                <WatchListBtn />

            </nav>
        </div>
    );
};

export default Navbar;