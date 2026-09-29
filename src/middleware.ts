import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Hanya memproteksi rute yang diawali /academy
  if (pathname.startsWith('/academy')) {
    // Cek keberadaan token/cookie login member (misal: 'sv_member_session' atau token Supabase)
    const memberSession = request.cookies.get('sv_member_session')?.value;

    // JIKA INGIN DITES DAHULU TANPA LOGIN:
    // Kamu bisa beri komentar pada blok 'if (!memberSession)' di bawah ini.
    if (!memberSession) {
      const loginUrl = new URL('/#gate', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/academy/:path*'],
};
