import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get("movieId")?.trim();

    if (!movieId) {
        return NextResponse.json({ error: "movieId is required" }, { status: 400 });
    }

    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch movie videos" }, { status: res.status });
        }

        const data = await res.json();
        const results = (data?.results || []) as Array<{
            id: string;
            key: string;
            name: string;
            site: string;
            type: string;
            official?: boolean;
        }>;

        // Priority 1: Official YouTube Trailer
        let trailer = results.find(
            (v) => v.site === "YouTube" && v.type === "Trailer" && v.official === true
        );

        // Priority 2: Any YouTube Trailer
        if (!trailer) {
            trailer = results.find(
                (v) => v.site === "YouTube" && v.type === "Trailer"
            );
        }

        // Priority 3: Any YouTube Teaser
        if (!trailer) {
            trailer = results.find(
                (v) => v.site === "YouTube" && v.type === "Teaser"
            );
        }

        // Priority 4: Any YouTube video
        if (!trailer) {
            trailer = results.find((v) => v.site === "YouTube");
        }

        if (!trailer) {
            return NextResponse.json({ error: "No trailer found for this movie" }, { status: 404 });
        }

        return NextResponse.json({
            key: trailer.key,
            name: trailer.name,
            site: trailer.site,
            type: trailer.type,
        });
    } catch (err) {
        console.error("Error in trailer route:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

