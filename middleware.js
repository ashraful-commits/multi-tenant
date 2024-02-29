import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  // Define the matcher to exclude certain paths
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host");

  // Extract subdomain and domain from the hostname
  const [subdomain, domain] = hostname.split('.');

  // Handle requests to the main domain without subdomains
  if (!subdomain) {
    const path = `${url.pathname}${url.search ? `?${url.search}` : ""}`;

    // Redirect to login or home page based on authentication status
    if (domain === "multi-tenant-beryl.vercel.app" || domain === "localhost:3000") {
      const session = await getToken({ req });

      if (!session && path !== "/login") {
        return NextResponse.redirect("/login");
      } else if (session && path === "/login") {
        return NextResponse.redirect("/");
      }
      return NextResponse.rewrite(`/ashraful${path}`);
    }

    // Rewrite the URL to include "/home" before the path for other domains
    return NextResponse.rewrite(`/${domain === "multi-tenant-beryl.vercel.app" ? "home" : domain}${path}`);
  }

  // Handle requests with subdomains
  // Example logic for handling subdomains
  if (subdomain === "subdomain") {
    // Handle requests for the "subdomain" subdomain
    // You can add specific logic for this subdomain
    return NextResponse.rewrite(`https://${hostname}${url.pathname}${url.search ? `?${url.search}` : ""}`);
  } else {
    // Handle requests for other subdomains
    // You can add specific logic for other subdomains if needed
    return NextResponse.rewrite(`https://${subdomain}.${domain}${url.pathname}${url.search ? `?${url.search}` : ""}`);
  }
}
