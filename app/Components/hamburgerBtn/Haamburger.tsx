"use client"
import { MoviesContext } from '@/app/Context/MoviesContext';
import { useContext } from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
import NavLink from '../NavLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Haamburger = () => {

    const { isOpen, setIsOpen } = useContext(MoviesContext);

    return (<>
        <div>
            <HiMenuAlt1 className='text-2xl cursor-pointer' onClick={() => setIsOpen(true)} />
        </div>

    </>);
};


const Sidebar = () => {
    const { isOpen, setIsOpen } = useContext(MoviesContext);

    return (
        <div onClick={() => setIsOpen(false)}
            className={`fixed inset-0 bg-black/40 z-100 duration-500 transition-opacity ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div onClick={(e) => e.stopPropagation()}
                className={`absolute left-0 top-0 bottom-0 w-[60%] bg-white p-5 duration-500 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div >
                    <RxCross2 onClick={() => setIsOpen(false)}
                        className='text-black font-bold text-2xl justify-self-end cursor-pointer' />
                </div>
                <div className='text-black'>
                    <ul className='flex flex-col'><SidebarLink /></ul>
                </div>
            </div>
        </div>
    )
}

const SidebarLink = () => {
    const { isOpen, setIsOpen } = useContext(MoviesContext);
    const pathName = usePathname();
    return (
        <>
            <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${pathName === "/"
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                    }`}
            >
                Home
            </Link>

            <Link
                href="/trending-movies"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${pathName === "/trending-movies"
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                    }`}
            >
                Trending Movies
            </Link>

            <Link
                href="/popular-movies"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${pathName === "/popular-movies"
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                    }`}
            >
                Popular Movies
            </Link>

            <Link
                href="/all-movies"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${pathName === "/all-movies"
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                    }`}
            >
                All Movies
            </Link>

            <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${pathName === "/contact"
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                    }`}
            >
                Contact
            </Link>
        </>
    )
}

export default Haamburger;
export { Sidebar };
export { SidebarLink };