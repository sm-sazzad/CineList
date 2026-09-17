import React from 'react';

const MovieLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default MovieLayout;