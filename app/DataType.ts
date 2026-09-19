export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    genres: { id: number, name: string }[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    softcore: boolean;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    runtime: number,
    tagline: string,
    status: string,
    revenue: number,
    budget: number
}