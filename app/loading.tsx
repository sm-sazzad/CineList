import React from 'react';

const Loading = () => {
    return (
        <div className='min-h-[60vh] flex flex-col justify-center items-center gap-6'>
            {/* Animated gradient ring spinner */}
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-base-300"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-secondary animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-accent border-l-info animate-spin [animation-duration:1.5s] [animation-direction:reverse]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary animate-ping"></div>
                </div>
            </div>

            {/* Loading text with animated dots */}
            <div className="flex items-center gap-2">
                <span className="text-base-content/70 font-medium tracking-wide">
                    Loading
                </span>
                <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0ms]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:150ms]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:300ms]"></span>
                </span>
            </div>
        </div>
    );
};



export default Loading;