"use client"
import React, { createContext, useState } from 'react';
import { IMovie } from '../DataType';


interface addType {
    watchList: IMovie[],
    setWatchList: React.Dispatch<React.SetStateAction<IMovie[]>>,
    favourite: IMovie[],
    setFavourite: React.Dispatch<React.SetStateAction<IMovie[]>>
}
export const MoviesContext = createContext<addType>({
    watchList: [],
    setWatchList: () => { },
    favourite: [],
    setFavourite: () => { }
});

const MoviesProvider = ({ children }: { children: React.ReactNode }) => {

    const [watchList, setWatchList] = useState<IMovie[]>([]);
    const [favourite, setFavourite] = useState<IMovie[]>([]);

    const add: addType = {
        watchList, setWatchList, favourite, setFavourite
    }

    return (
        <MoviesContext.Provider value={add}>
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesProvider;