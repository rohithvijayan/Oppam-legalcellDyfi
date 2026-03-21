import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll().map(({ name, value }) => ({ name, value }));
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        req.cookies.set(name, value);
                        res.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();
    const pathname = req.nextUrl.pathname;
    const adminEmail = process.env.ADMIN_EMAIL;

    // Protect all admin routes (Pages and API)
    if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
        // Allow access to the login page itself
        if (pathname === '/admin') return res;

        // Verify session exists
        if (!session) {
            if (pathname.startsWith('/api')) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/admin', req.url));
        }

        // Verify admin email if configured
        if (adminEmail && session.user.email !== adminEmail) {
            console.error(`Unauthorized access attempt by ${session.user.email}`);
            if (pathname.startsWith('/api')) {
                return NextResponse.json({ error: "Forbidden: Not an admin" }, { status: 403 });
            }
            // For pages, we sign them out and redirect to login
            await supabase.auth.signOut();
            return NextResponse.redirect(new URL('/admin?error=unauthorized', req.url));
        }
    }

    return res;
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*'],
};
