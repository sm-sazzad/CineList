"use client";

import React, { createContext, useEffect, useState, useCallback } from "react";
import { IMovie } from "../DataType";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export interface addType {
  watchList: IMovie[];
  setWatchList: React.Dispatch<React.SetStateAction<IMovie[]>>;
  favourite: IMovie[];
  setFavourite: React.Dispatch<React.SetStateAction<IMovie[]>>;
  addToWatchList: (movie: IMovie) => Promise<boolean>;
  removeFromWatchList: (movieId: number) => Promise<boolean>;
  addToFavourite: (movie: IMovie) => Promise<boolean>;
  removeFromFavourite: (movieId: number) => Promise<boolean>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export const MoviesContext = createContext<addType>({
  watchList: [],
  setWatchList: () => { },
  favourite: [],
  setFavourite: () => { },
  addToWatchList: async () => false,
  removeFromWatchList: async () => false,
  addToFavourite: async () => false,
  removeFromFavourite: async () => false,
  isOpen: false,
  setIsOpen: () => { },
  isLoading: false,
});

const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [favourite, setFavourite] = useState<IMovie[]>([]);
  const [watchList, setWatchList] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Clean up legacy localStorage if any exists
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("watchList");
        localStorage.removeItem("favourite");
      } catch {
        // ignore
      }
    }
  }, []);

  // Fetch saved movies from MongoDB whenever user logs in or session changes
  useEffect(() => {
    if (session?.user?.id) {
      setIsLoading(true);
      fetch("/api/user/movies")
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            setWatchList(data.watchList || []);
            setFavourite(data.favourite || []);
          } else {
            setWatchList([]);
            setFavourite([]);
          }
        })
        .catch((err) => {
          console.error("Error loading saved movies from MongoDB:", err);
          setWatchList([]);
          setFavourite([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Signed out: reset state
      setWatchList([]);
      setFavourite([]);
      setIsLoading(false);
    }
  }, [session?.user?.id]);

  const addToWatchList = useCallback(
    async (movie: IMovie): Promise<boolean> => {
      if (!session?.user) {
        toast.warning("Please sign in to add movies to your watchlist.");
        return false;
      }

      // Optimistic update
      setWatchList((prev) => {
        if (prev.some((m) => m.id === movie.id)) return prev;
        return [...prev, movie];
      });

      try {
        const res = await fetch("/api/user/movies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "add", type: "watchlist", movie }),
        });

        if (res.ok) {
          const data = await res.json();
          setWatchList(data.watchList || []);
          return true;
        } else {
          const err = await res.json();
          toast.error(err.error || "Failed to update watchlist in database.");
          return false;
        }
      } catch (err) {
        console.error("Failed to add to watchlist:", err);
        toast.error("Network error while saving to database.");
        return false;
      }
    },
    [session?.user]
  );

  const removeFromWatchList = useCallback(
    async (movieId: number): Promise<boolean> => {
      if (!session?.user) {
        toast.warning("Please sign in first.");
        return false;
      }

      // Optimistic update
      setWatchList((prev) => prev.filter((m) => m.id !== movieId));

      try {
        const res = await fetch("/api/user/movies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "remove",
            type: "watchlist",
            movie: { id: movieId } as IMovie,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setWatchList(data.watchList || []);
          return true;
        }
        return false;
      } catch (err) {
        console.error("Failed to remove from watchlist:", err);
        return false;
      }
    },
    [session?.user]
  );

  const addToFavourite = useCallback(
    async (movie: IMovie): Promise<boolean> => {
      if (!session?.user) {
        toast.warning("Please sign in to add movies to your favourites.");
        return false;
      }

      // Optimistic update
      setFavourite((prev) => {
        if (prev.some((m) => m.id === movie.id)) return prev;
        return [...prev, movie];
      });

      try {
        const res = await fetch("/api/user/movies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "add", type: "favourite", movie }),
        });

        if (res.ok) {
          const data = await res.json();
          setFavourite(data.favourite || []);
          return true;
        } else {
          const err = await res.json();
          toast.error(err.error || "Failed to update favourites in database.");
          return false;
        }
      } catch (err) {
        console.error("Failed to add to favourite:", err);
        toast.error("Network error while saving to database.");
        return false;
      }
    },
    [session?.user]
  );

  const removeFromFavourite = useCallback(
    async (movieId: number): Promise<boolean> => {
      if (!session?.user) {
        toast.warning("Please sign in first.");
        return false;
      }

      // Optimistic update
      setFavourite((prev) => prev.filter((m) => m.id !== movieId));

      try {
        const res = await fetch("/api/user/movies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "remove",
            type: "favourite",
            movie: { id: movieId } as IMovie,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setFavourite(data.favourite || []);
          return true;
        }
        return false;
      } catch (err) {
        console.error("Failed to remove from favourite:", err);
        return false;
      }
    },
    [session?.user]
  );

  const add: addType = {
    watchList,
    setWatchList,
    favourite,
    setFavourite,
    addToWatchList,
    removeFromWatchList,
    addToFavourite,
    removeFromFavourite,
    isOpen,
    setIsOpen,
    isLoading,
  };

  return <MoviesContext.Provider value={add}>{children}</MoviesContext.Provider>;
};

export default MoviesProvider;
