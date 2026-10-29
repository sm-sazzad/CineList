import { auth, Session } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getServerSession(): Promise<Session | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error: unknown) {
    const err = error as { digest?: string };
    if (
      err?.digest === "DYNAMIC_SERVER_USAGE" ||
      (typeof err?.digest === "string" && err.digest.startsWith("NEXT_REDIRECT"))
    ) {
      throw error;
    }
    console.error("Error retrieving server session:", error);
    return null;
  }
}

export async function requireAuth(callbackUrl: string = "/"): Promise<Session> {
  const session = await getServerSession();
  if (!session) {
    redirect(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  return session;
}

export async function requireVerifiedAuth(callbackUrl: string = "/"): Promise<Session> {
  const session = await requireAuth(callbackUrl);
  if (!session.user.emailVerified) {
    redirect(`/sign-in?error=unverified&email=${encodeURIComponent(session.user.email)}`);
  }
  return session;
}
