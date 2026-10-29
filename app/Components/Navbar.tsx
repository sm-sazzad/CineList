import Image from 'next/image';
import Link from 'next/link';
import navlogo from '../assets/CineListLogo.png';
import WatchListBtn from '../watchlistBtn/WatchlistBtn';
import NavLink from './NavLink';
import Haamburger, { Sidebar } from './hamburgerBtn/Haamburger';
import { AuthButtons } from './AuthButtons';

const Navbar = () => {
    const link = <NavLink />;

    return (
        <>
            <div className='border-b border-white/20 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 sticky top-0 z-50 backdrop-blur-md'>
                <nav className='flex justify-between items-center gap-4 w-[90%] mx-auto py-3 md:py-4'>

                    {/* Logo & Mobile Menu */}
                    <div className='flex items-center gap-3'>
                        <div className='block md:hidden'>
                            <Haamburger />
                        </div>
                        <Link href="/" className='flex items-center'>
                            <Image
                                src={navlogo}
                                alt='CineList'
                                priority
                                className='h-9 md:h-10 w-auto hover:scale-105 transition-transform duration-300'
                            />
                        </Link>
                    </div>

                    {/* Nav Links - Desktop */}
                    <ul className='hidden md:flex items-center gap-8 text-white font-medium'>
                        {link}
                    </ul>

                    {/* Right side: Watchlist & Auth Controls */}
                    <div className='flex items-center gap-2 sm:gap-4'>
                        <WatchListBtn />
                        <AuthButtons />
                    </div>
                </nav>
            </div>
            <Sidebar />
        </>
    );
};

export default Navbar;
