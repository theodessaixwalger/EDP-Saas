import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/admin"];
const AUTH_PREFIXES = ["/login", "/register"];

const matches = (pathname: string, prefixes: string[]) =>
  prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

/** Supabase est configuré (sinon : mode démonstration local, aucune vérification réseau). */
function supabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey || url.includes("placeholder")) return null;
  return { url, anonKey };
}

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const env = supabaseEnv();

  // Mode démo sans Supabase : aucun appel réseau (évite un aller-retour vers un hôte factice à chaque requête).
  if (!env) return NextResponse.next({ request });

  const isProtected = matches(pathname, PROTECTED_PREFIXES);
  const isAuthRoute = matches(pathname, AUTH_PREFIXES);
  const hasSessionCookie = request.cookies.getAll().some(({ name }) => name.startsWith("sb-"));

  // Pages publiques consultées sans session : rien à rafraîchir, réponse immédiate.
  if (!isProtected && !hasSessionCookie) return NextResponse.next({ request });

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          supabaseResponse.cookies.set(name, value, options as any)
        );
      },
    },
  });

  // Rafraîchit la session si elle existe
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
