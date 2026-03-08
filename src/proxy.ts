import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function proxy(req) {
        const { pathname } = req.nextUrl;
        const token = req.nextauth.token;

        const authPages = [
            "/sign-in",
            "/sign-up",
            "/forget-password",
            "/reset-password",
            "/verify-otp",
        ];

        if (token && authPages.some(page => pathname.startsWith(page))) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        const protectedPages = [
            "/my-trips",
            "/profile",
            "/create-trip",
            "/blogs/create-blog",
            "/blogs/my-blogs",
        ];

        if (!token && protectedPages.some(page => pathname.startsWith(page))) {
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }
    },
    {
        callbacks: {
            authorized: () => true,
        },
    }
);

export const config = {
    matcher: [
        "/sign-in",
        "/sign-up",
        "/forget-password",
        "/reset-password",
        "/verify-otp",
        "/my-trips",
        "/profile",
        "/create-trip",
        "/blogs/create-blog",
        "/blogs/my-blogs",
    ],
};