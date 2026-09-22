"use client"
import React, { createContext, useEffect, useState } from 'react';
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
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [favourite, setFavourite] = useState<IMovie[]>([]);
    const [watchList, setWatchList] = useState<IMovie[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedWatchList = localStorage.getItem('watchList');
        const savedFavourite = localStorage.getItem('favourite');

        if (savedWatchList) {
            setWatchList(JSON.parse(savedWatchList));
        }
        if (savedFavourite) {
            setFavourite(JSON.parse(savedFavourite));
        }
        setIsLoaded(true); // load complete
    }, []);

    // 2. WATCHLIST CHANGE HOLE SAVE KORBE, KINTU FIRST LOAD ER AGE NA
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("watchList", JSON.stringify(watchList));
        }
    }, [watchList, isLoaded]);

    // 3. FAVOURITE ER JONNO O SAME
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("favourite", JSON.stringify(favourite));
        }
    }, [favourite, isLoaded]);

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