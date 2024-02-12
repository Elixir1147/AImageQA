import { validateRequest } from "../../lib/auth/validateRequest";
import { lucia } from "../../lib/auth/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(): Promise<
  NextResponse<{ body: string; options: { status: number } }>
> {
  const { session } = await validateRequest();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return new NextResponse("", { status: 200 });
}
