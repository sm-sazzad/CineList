"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const NavLink = () => {
    const pathName = usePathname();
    return (
        <>
            <Link href={"/"} className='hover:scale-110 duration-300 hover:text-red-500'><li className={pathName === '/' ? "bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent scale-120 font-bold" : ""}>Home</li></Link>
            <Link href={"/trending-movies"} className='hover:scale-110 hover:text-red-500 duration-300'><li className={pathName === "/trending-movies" ? "bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent scale-120 font-bold" : ""}>Trending Movies</li></Link>
            <Link href={"/popular-movies"} className='hover:scale-110 duration-300 hover:text-red-500'><li className={pathName === '/popular-movies' ? "bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent scale-120 font-bold" : ""}>Popular Movies</li></Link>
            <Link href={"/all-movies"} className='hover:scale-110 duration-300 hover:text-red-500'><li className={pathName === '/all-movies' ? "bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent scale-120 font-bold" : ""}>All Movies</li></Link>
            <Link href={"/contact"} className='hover:scale-110 duration-300 hover:text-red-500'><li className={pathName === '/contact' ? "bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] bg-clip-text text-transparent scale-120 font-bold" : ""}>Contact</li></Link>
        </>
    );
};

export default NavLink;
