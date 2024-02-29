import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req) {
  const url = req.nextUrl;

  let hostname = req.headers
    .get("host")

    if (
      hostname.endsWith(`.vercel.app`)
    ) {
      hostname = `${hostname.split(".")[0]}.vercel.app`;
    }
  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // rewrites for app pages
  if (hostname == 'https://main.vercel.com') {
    return NextResponse.redirect(new URL("/", req.url));

    return NextResponse.rewrite(
      new URL(`/ashraful${path === "/" ? "" : path}`, req.url),
    );
  }


  // rewrite root application to `/home` folder
  if (
    hostname === "https://multi-tenant-beryl.vercel.app" 
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}