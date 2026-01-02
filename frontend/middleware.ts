import { NextResponse, type NextRequest } from "next/server";
import { IJWTExtended } from "./types/Auth";
import environment from "./config/environment";
import { getToken } from "next-auth/jwt";
import { redirect } from "next/dist/server/api-utils";


export async function middleware(request: NextRequest) {
    const token: IJWTExtended | null = await getToken({
        req: request,
        secret: environment.AUTH_SECRET,
    });

    const {pathname} = request.nextUrl;

    if(pathname === "/auth/login" || pathname === "/auth/register") {
        if (token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    if(pathname.startsWith("/admin")) {
        if(!token) {
            const url = new URL("/auth/login", request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));

            return NextResponse.redirect(url)
        }

        if(token?.user?.role !== "admin" ) {
            return NextResponse.redirect(new URL("/", request.url))
        }

        if(pathname === "/admin") {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url))
        }
    }

    if(pathname.startsWith("/member")) {
        if(!token) {
            const url = new URL("/auth/login", request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url);
        }

        if(pathname === "/member") {
            return NextResponse.redirect(new URL("/member/dashboard", request.url))
        }
    }
}

export const config = {
    mathcher: ["/auth/:path*", "/admin/:path*", "/member/:path*"]
}