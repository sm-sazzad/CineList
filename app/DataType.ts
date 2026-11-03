export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    genres?: { id: number; name: string }[];
    genre_ids?: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    softcore?: boolean;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    runtime?: number;
    tagline?: string;
    status?: string;
    revenue?: number;
    budget?: number;
}

export interface ICastMember {
    id: number;
    name: string;
    original_name: string;
    character: string;
    profile_path: string | null;
    known_for_department?: string;
    order: number;
    popularity?: number;
}

export interface ICrewMember {
    id: number;
    name: string;
    original_name?: string;
    job: string;
    department: string;
    profile_path: string | null;
}

export interface ICredits {
    id: number;
    cast: ICastMember[];
    crew: ICrewMember[];
}
