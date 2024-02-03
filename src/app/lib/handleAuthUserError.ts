import { ZodError } from "zod";
import { NextResponse } from "next/server";

export default function handleAuthUserError(
  e: any
): NextResponse<{ body: string; options: { status: number } }> {
  if (e instanceof ZodError) {
    return new NextResponse("unexpected data is submited.", {
      status: 400,
    });
  } else if (e instanceof Error) {
    return new NextResponse(e.message, {
      status: 500,
    });
  } else {
    return new NextResponse("unknown error is occured", {
      status: 500,
    });
  }
}
