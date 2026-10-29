import { auth } from "@/lib/auth";
import { mongoDb } from "@/lib/mongodb";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { IMovie } from "@/app/DataType";

interface SavedMoviesDocument {
  userId: string;
  watchList: IMovie[];
  favourite: IMovie[];
  updatedAt: Date;
  createdAt: Date;
}

// GET: Fetch the current authenticated user's watchlist and favourites
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { watchList: [], favourite: [] },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const collection = mongoDb.collection<SavedMoviesDocument>("user_saved_movies");
  const doc = await collection.findOne({ userId });

  return NextResponse.json({
    watchList: doc?.watchList || [],
    favourite: doc?.favourite || [],
  });
}

// POST: Add or Remove movie from user's watchlist or favourites in MongoDB
export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in to save movies." },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  try {
    const body = await request.json();
    const { action, type, movie } = body as {
      action: "add" | "remove";
      type: "watchlist" | "favourite";
      movie: IMovie;
    };

    if (!action || !type || !movie || !movie.id) {
      return NextResponse.json(
        { error: "Invalid action, list type, or movie data." },
        { status: 400 }
      );
    }

    const collection = mongoDb.collection<SavedMoviesDocument>("user_saved_movies");
    const fieldName = type === "watchlist" ? "watchList" : "favourite";

    const userDoc = await collection.findOne({ userId });

    if (action === "add") {
      if (!userDoc) {
        await collection.insertOne({
          userId,
          watchList: type === "watchlist" ? [movie] : [],
          favourite: type === "favourite" ? [movie] : [],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        const currentList: IMovie[] = userDoc[fieldName] || [];
        // Prevent duplicate entries of the same movie
        const filtered = currentList.filter((m) => m.id !== movie.id);
        filtered.push(movie);

        await collection.updateOne(
          { userId },
          {
            $set: {
              [fieldName]: filtered,
              updatedAt: new Date(),
            },
          }
        );
      }
    } else if (action === "remove") {
      if (userDoc) {
        const currentList: IMovie[] = userDoc[fieldName] || [];
        const filtered = currentList.filter((m) => m.id !== movie.id);

        await collection.updateOne(
          { userId },
          {
            $set: {
              [fieldName]: filtered,
              updatedAt: new Date(),
            },
          }
        );
      }
    }

    // Return the updated lists
    const updatedDoc = await collection.findOne({ userId });

    return NextResponse.json({
      success: true,
      watchList: updatedDoc?.watchList || [],
      favourite: updatedDoc?.favourite || [],
    });
  } catch (error) {
    console.error("Error updating saved movies in MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to update saved movies." },
      { status: 500 }
    );
  }
}

