import Image from "next/image";
import profile from "../assets/profile (1).png";
import backdrop from "../assets/backdrop.png";

import {
    FaGithub,
    FaLinkedin,
    FaFacebook,
    FaInstagram,
    FaXTwitter,
    FaEnvelope,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    FaGitAlt,
    FaGithubAlt,
    FaJava,
    FaPython,
} from "react-icons/fa6";

import {
    SiTypescript,
    SiNextdotjs,
    SiTailwindcss,
    SiCplusplus,
    SiVercel,
    SiNetlify,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

// Moved outside the component so these arrays aren't recreated on every render.
const SOCIAL_LINKS = [
    {
        name: "GitHub",
        icon: FaGithub,
        link: "https://github.com/sm-sazzad",
        color: "hover:bg-[#181717] hover:border-[#181717]",
    },
    {
        name: "LinkedIn",
        icon: FaLinkedin,
        link: "https://www.linkedin.com/in/sm-sazzad/",
        color: "hover:bg-[#0A66C2] hover:border-[#0A66C2]",
    },
    {
        name: "Facebook",
        icon: FaFacebook,
        link: "https://www.facebook.com/sazzad.hossain.5758",
        color: "hover:bg-[#1877F2] hover:border-[#1877F2]",
    },
    {
        name: "Instagram",
        icon: FaInstagram,
        link: "https://www.instagram.com/sazzad_hossain5758/",
        color: "hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent",
    },
    {
        name: "X",
        icon: FaXTwitter,
        link: "https://x.com/sm_sazzad58",
        color: "hover:bg-black hover:border-black",
    },
    {
        name: "Email",
        icon: FaEnvelope,
        link: "https://mail.google.com/mail/?view=cm&fs=1&to=sazzadhossain5758@gmail.com",
        color: "hover:bg-[#EA4335] hover:border-[#EA4335]",
    },
];

const TECH_STACK = [
    { name: "HTML", icon: FaHtml5, color: "hover:text-[#E34F26]" },
    { name: "CSS", icon: FaCss3Alt, color: "hover:text-[#1572B6]" },
    { name: "JavaScript", icon: FaJs, color: "hover:text-[#F7DF1E]" },
    { name: "TypeScript", icon: SiTypescript, color: "hover:text-[#3178C6]" },
    { name: "React", icon: FaReact, color: "hover:text-[#61DAFB]" },
    { name: "Next.js", icon: SiNextdotjs, color: "hover:text-white" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "hover:text-[#06B6D4]" },
    { name: "C++", icon: SiCplusplus, color: "hover:text-[#00599C]" },
    { name: "Java", icon: FaJava, color: "hover:text-[#F89820]" },
    { name: "Python", icon: FaPython, color: "hover:text-[#3776AB]" },
    { name: "Git", icon: FaGitAlt, color: "hover:text-[#F05032]" },
    { name: "GitHub", icon: FaGithubAlt, color: "hover:text-white" },
    { name: "VS Code", icon: VscVscode, color: "hover:text-[#007ACC]" },
    { name: "Vercel", icon: SiVercel, color: "hover:text-white" },
    { name: "Netlify", icon: SiNetlify, color: "hover:text-[#00C7B7]" },
];

const Page = () => {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#0a1929]">
            {/* Backdrop */}
            <div className="absolute inset-0" aria-hidden="true">
                <Image
                    src={backdrop}
                    alt=""
                    fill
                    priority
                    className="object-cover object-[73%_center] sm:object-[65%_center]"
                />

                {/* Horizontal gradient — lighter on mobile so right-side face stays visible */}
                <div className="absolute inset-0 bg-linear-to-r from-[#0a1929] via-[#0a1929]/85 to-[#0a1929]/40 md:via-[#0a1929]/95 md:to-[#0a1929]/70" />

                {/* Vertical gradient — softer on mobile */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0a1929] via-[#0a1929]/15 to-[#0a1929]/75 md:via-[#0a1929]/30 md:to-[#0a1929]/85" />
            </div>

            {/* Decorative glows */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#ee162f]/10 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#fc6743]/10 blur-3xl" aria-hidden="true" />

            {/* Main Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
                {/* Profile + About */}
                <section
                    aria-labelledby="about-heading"
                    className="grid grid-cols-1 items-center gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20"
                >
                    {/* Profile */}
                    <div className="flex flex-col items-center md:items-start motion-safe:animate-[fadeIn_0.8s_ease-out]">
                        <div className="group relative">
                            {/* Animated gradient ring */}
                            <div className="absolute -inset-3 rounded-full bg-linear-to-tr from-[#ee162f] via-[#fc6743] to-[#fbbf24] opacity-60 blur-lg transition duration-700 group-hover:opacity-100 group-hover:blur-xl" />

                            {/* Rotating conic border (paused for users who prefer reduced motion) */}
                            <div className="absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,#ee162f,#fc6743,#fbbf24,#ee162f)] opacity-80 motion-safe:animate-[spin_8s_linear_infinite]" />

                            {/* Image */}
                            <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-[#0a1929] shadow-2xl md:h-72 md:w-72">
                                <Image
                                    src={profile}
                                    alt="Portrait of Sheikh Md Sazzad Hossain"
                                    fill
                                    priority
                                    sizes="(min-width: 768px) 18rem, 14rem"
                                    className="object-cover transition duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* Status dot */}
                            <div
                                className="absolute bottom-4 right-4 flex h-5 w-5 items-center justify-center md:bottom-6 md:right-6"
                                role="status"
                                aria-label="Available for opportunities"
                            >
                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 motion-safe:animate-ping" />
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500 ring-2 ring-[#0a1929]" />
                            </div>
                        </div>

                        <div className="mt-8 text-center md:text-left">
                            <h1
                                id="about-heading"
                                className="bg-linear-to-r from-white via-white to-gray-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl"
                            >
                                Sheikh Md Sazzad Hossain
                            </h1>

                            <p className="mt-3 text-sm font-medium text-gray-300 md:text-base">
                                Web Developer <span className="text-[#fc6743]">•</span> CSE Student{" "}
                                <span className="text-[#fc6743]">•</span> Future Software Engineer
                            </p>

                            <p className="mt-3 text-sm italic text-gray-400">
                                &ldquo;Building, Learning &amp; Growing One Project at a Time.&rdquo;
                            </p>

                            {/* Primary actions */}
                            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=sazzadhossain5758@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full bg-linear-to-r from-[#ee162f] via-[#fc6743] to-[#fbbf24] px-5 py-2.5 text-sm font-semibold text-[#0a1929] shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                                >
                                    Get In Touch
                                </a>
                                <a
                                    href="https://github.com/sm-sazzad"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                                >
                                    View GitHub
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    <div className="text-white">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-300 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#fc6743]" />
                            About Me
                        </span>

                        <h2 className="mt-5 text-3xl font-bold leading-tight md:text-[2.5rem]">
                            Turning ideas into{" "}
                            <span className="bg-linear-to-r from-[#ee162f] via-[#fc6743] to-[#fbbf24] bg-clip-text text-transparent">
                                real-world projects.
                            </span>
                        </h2>

                        <div className="mt-6 space-y-5 text-[15px] leading-7 text-gray-300 md:text-base">
                            <p>
                                I&apos;m a Computer Science &amp; Technology student passionate about
                                building modern and user-friendly web experiences. I&apos;m currently
                                strengthening my skills in JavaScript, TypeScript, React, Next.js,
                                Tailwind CSS, and modern frontend development.
                            </p>

                            <p>
                                I enjoy learning new technologies, solving programming problems, and
                                turning ideas into real-world projects. My long-term goal is to become
                                a skilled Software Engineer, and I&apos;m using web development as one
                                of the first steps toward that journey.
                            </p>
                        </div>

                        {/* Social */}
                        <div className="mt-9">
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                                Connect With Me
                            </p>

                            <ul className="flex flex-wrap gap-3">
                                {SOCIAL_LINKS.map(({ name, icon: Icon, link, color }) => (
                                    <li key={name}>
                                        <a
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={name}
                                            aria-label={name}
                                            className={`group flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-lg text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:text-white hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fc6743] ${color}`}
                                        >
                                            <Icon aria-hidden="true" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Divider */}
                <div className="my-20 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

                {/* Tech Stack */}
                <section aria-labelledby="toolkit-heading">
                    <div className="text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-300 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#fc6743]" />
                            My Toolkit
                        </span>

                        <h2 id="toolkit-heading" className="mt-5 text-3xl font-bold text-white md:text-4xl">
                            Technologies I Work With
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400 md:text-base">
                            A curated set of tools and languages I use to craft modern web experiences.
                        </p>
                    </div>

                    <ul className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-4">
                        {TECH_STACK.map(({ name, icon: Icon, color }) => (
                            <li
                                key={name}
                                title={name}
                                tabIndex={0}
                                className={`group relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-3xl text-gray-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:bg-white/10 hover:shadow-2xl focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#fc6743] ${color}`}
                            >
                                <Icon aria-hidden="true" />

                                {/* Tooltip */}
                                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#0a1929] px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:-top-10 group-hover:opacity-100 group-focus-visible:-top-10 group-focus-visible:opacity-100">
                                    {name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Footer note */}
                <footer className="mt-24 text-center">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} Sheikh Md Sazzad Hossain — Built with Next.js &amp; Tailwind CSS
                    </p>
                </footer>
            </div>
        </main>
    );
};

export default Page;
