import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in.", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  if (!session.user.emailVerified) {
    return NextResponse.json(
      {
        error: "Forbidden. Your email is not verified.",
        code: "EMAIL_NOT_VERIFIED",
        email: session.user.email,
      },
      { status: 403 }
    );
  }

  return NextResponse.json({
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      emailVerified: session.user.emailVerified,
      image: session.user.image,
    },
    session: {
      id: session.session.id,
      expiresAt: session.session.expiresAt,
    },
  });
}
