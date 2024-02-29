import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req) {
  const url = req.nextUrl;
  let hostname = req.headers
    .get("host")
    .replace(".localhost:3000", ".multi-tenant-beryl.vercel.app");
   
  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  if (hostname == 'multi-tenant-beryl.vercel.app'||hostname == 'localhost:3000') {
    const session = await getToken({ req });
    if (session && path !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (!session && path == "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.rewrite(
      new URL(`/ashraful${path === "/" ? "" : path}`, req.url),
    );
  }

  if (
    hostname === "multi-tenant-beryl.vercel.app" || hostname === "localhost:3000" 
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}