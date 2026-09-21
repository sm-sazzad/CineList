import React from 'react';

const Banner = () => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(/cinelistBanner.jpg)`,
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-6xl font-extrabold">Wellcome</h1>
                    <p className="mb-5 text-3xl">
                        Millions of movies, TV shows and people to discover. Explore now.
                    </p>
                    <button className="btn rounded-xl  bg-linear-to-r from-[#ee162f] via-[#fd3148] to-[#fc6743]">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;