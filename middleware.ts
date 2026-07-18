import { NextRequest, NextResponse } from "next/server";

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "thecreova.com";

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").split(":")[0];
  if (host === rootDomain || host === `www.${rootDomain}` || host.includes("localhost") || host.endsWith("vercel.app")) return NextResponse.next();
  if (!host.endsWith(`.${rootDomain}`)) return NextResponse.next();
  const slug = host.slice(0, -(`.${rootDomain}`).length);
  const url = request.nextUrl.clone();
  url.pathname = `/sites/${slug}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: ["/((?!_next|api|favicon.ico).*)"] };
