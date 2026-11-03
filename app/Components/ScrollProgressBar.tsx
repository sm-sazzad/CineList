"use client";

import React, { useEffect, useState } from "react";

export const ScrollProgressBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight <= 0) {
                setProgress(0);
                return;
            }
            const currentProgress = (window.scrollY / totalHeight) * 100;
            setProgress(Math.min(100, Math.max(0, currentProgress)));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // If page is at top, hide or show 0
    if (progress <= 0) return null;

    return (
        <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none bg-transparent">
            <div
                className="h-full bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743] transition-[width] duration-75 ease-out shadow-[0_0_12px_#ee162f]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ScrollProgressBar;

