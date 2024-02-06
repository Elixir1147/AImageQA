import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyRequestOrigin } from "oslo/request";

export const middleware = async (request: NextRequest) => {
  if (request.method !== "GET") {
    const originHeader = request.headers.get("Origin");
    const hostHeader = request.headers.get("Host");
    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      return new NextResponse(null, {
        status: 403,
      });
    }
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
};
