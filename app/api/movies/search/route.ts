import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.trim() || "";
    const page = searchParams.get("page") || "1";

    if (!query) {
        return NextResponse.json([]);
    }

    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                },
                cache: 'no-store',
            }
        );

        if (!res.ok) {
            return NextResponse.json([], { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data?.results || []);
    } catch (err) {
        console.error("Error searching movies:", err);
        return NextResponse.json([], { status: 500 });
    }
}

