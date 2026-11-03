import Image from 'next/image';
import Link from 'next/link';
import navlogo from '../assets/CineListLogo.png';
import WatchListBtn from '../watchlistBtn/WatchlistBtn';
import NavLink from './NavLink';
import Haamburger, { Sidebar } from './hamburgerBtn/Haamburger';
import { AuthButtons } from './AuthButtons';
import SearchBar from './SearchBar';

const Navbar = () => {
    const link = <NavLink />;

    return (
        <>
            <div className="border-b border-white/10 bg-black/85 sticky top-0 z-50 backdrop-blur-xl">
                <nav className="flex justify-between items-center gap-2 sm:gap-4 w-[92%] sm:w-[90%] mx-auto py-2.5 sm:py-3.5">

                    {/* Left: Brand Logo only (Mobile & Desktop) */}
                    <div className="flex items-center shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={navlogo}
                                alt="CineList"
                                priority
                                className="h-8 sm:h-9 md:h-10 w-auto hover:scale-105 transition-transform duration-300"
                            />
                        </Link>
                    </div>

                    {/* Center: Desktop Nav Links (hidden on mobile & tablet, visible on lg and up) */}
                    <ul className="hidden lg:flex items-center gap-1 xl:gap-2 text-white font-medium text-xs xl:text-sm">
                        {link}
                    </ul>

                    {/* Right: Search + Watchlist + (Desktop: Auth / Mobile & Tablet: Hamburger) */}
                    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                        <SearchBar />
                        <WatchListBtn />

                        {/* Desktop Auth Controls (Profile Badge / Sign Out) */}
                        <div className="hidden lg:flex items-center">
                            <AuthButtons />
                        </div>

                        {/* Mobile & Tablet Hamburger Menu on the Right! */}
                        <div className="block lg:hidden">
                            <Haamburger />
                        </div>
                    </div>
                </nav>
            </div>
            <Sidebar />
        </>
    );
};

export default Navbar;
