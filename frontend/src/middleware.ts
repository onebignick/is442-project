// @ts-ignore
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/api/webhook/clerk"])
const isAdminRoute = createRouteMatcher(["/apps/admin(.*)"])
const isMarketingRoute = createRouteMatcher(["/apps/marketing(.*)"])
const isSalesRoute = createRouteMatcher(["/apps/sales(.*)"])

export default clerkMiddleware((auth, request) => {

  if (!isPublicRoute(request)) {
    auth().protect()
  }
  if (isAdminRoute(request) && auth().sessionClaims?.public_metadata?.role != "admin") {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }
  if (isMarketingRoute(request) && auth().sessionClaims?.public_metadata?.role != "marketing") {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }
  if (isSalesRoute(request) && auth().sessionClaims?.public_metadata?.role != "sales") {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
