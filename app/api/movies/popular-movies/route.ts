import { getMovies } from "@/app/Components/Popular";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page"));
    const movies = await getMovies(page);

    return NextResponse.json(movies);
}