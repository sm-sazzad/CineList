import Image from 'next/image';
import footerImg from "../assets/CineListLogo.png"
import NavLink from './NavLink';

const Footer = () => {
    return (
        <div className="bg-black px-6 py-16 md:px-10 lg:px-20">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 border-b border-gray-800 pb-12 md:grid-cols-3 justify-items-center">

                {/* Brand */}
                <div>
                    <Image
                        src={footerImg}
                        alt="CineList"
                        className="h-15 w-auto"
                    />

                    <p className="mt-3 text-sm text-gray-400">
                        Discover → Track → Enjoy
                    </p>

                    <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
                        Discover movies, build your watchlist, and keep track of
                        everything you want to watch.
                    </p>
                </div>

                {/* Quick Links */}
                <div className=' text-center'>
                    <h2 className="mb-4 text-2xl font-bold bg-linear-to-r from-red-600 to-violet-600 bg-clip-text text-transparent">
                        Quick Links
                    </h2>

                    <ul className="space-y-2 flex flex-col text-gray-400">
                        <NavLink />
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h2 className="mb-4 text-2xl font-bold bg-linear-to-r from-red-600 to-violet-600 bg-clip-text text-transparent">
                        Contact
                    </h2>

                    <ul className="space-y-2 text-gray-400">
                        <li>
                            <a
                                href="https://www.github.com/sm-sazzad"
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-white"
                            >
                                GitHub
                            </a>
                        </li>

                        <li>
                            <a
                                href="https://www.linkedin.com/in/sm-sazzad/"
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-white"
                            >
                                LinkedIn
                            </a>
                        </li>

                        <li>
                            <a
                                href="https://www.instagram.com/sazzad_hossain5758/"
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-white"
                            >
                                Instagram
                            </a>
                        </li>

                        <li>
                            <a
                                href="https://www.facebook.com/sazzad.hossain.5758/"
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-white"
                            >
                                Facebook
                            </a>
                        </li>

                        <li>
                            <a
                                href="mailto:sazzadhossain5758@gmail.com"
                                className="transition hover:text-white"
                            >
                                Email
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom */}
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 pt-6 text-sm text-gray-500 md:flex-row">
                <p>© {new Date().getFullYear()} CineList. All rights reserved.</p>

                <p>
                    Made with <span className="text-red-500">♥</span> for movie lovers
                </p>
            </div>
        </div>
    );
};

export default Footer;