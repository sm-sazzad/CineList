"use client"
import React, { createContext, useState } from 'react';
import { IMovie } from '../DataType';


interface addType {
    watchList: IMovie[],
    setWatchList: React.Dispatch<React.SetStateAction<IMovie[]>>,
    favourite: IMovie[],
    setFavourite: React.Dispatch<React.SetStateAction<IMovie[]>>,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const MoviesContext = createContext<addType>({
    watchList: [],
    setWatchList: () => { },
    favourite: [],
    setFavourite: () => { },
    isOpen: false,
    setIsOpen: () => { }
});

const MoviesProvider = ({ children }: { children: React.ReactNode }) => {

    const [watchList, setWatchList] = useState<IMovie[]>([]);
    const [favourite, setFavourite] = useState<IMovie[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const add: addType = {
        watchList, setWatchList, favourite, setFavourite, isOpen, setIsOpen
    }

    return (
        <MoviesContext.Provider value={add}>
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesProvider;