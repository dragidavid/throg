import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname === "/"
  ) {
    return;
  }

  const slug = req.nextUrl.pathname.split("/").pop();

  const res = await fetch(`${req.nextUrl.origin}/api/slug/${slug}`);

  if ([400, 404].includes(res.status)) {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  const data = await res.json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}
