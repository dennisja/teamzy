import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../env";
import type { Database } from "./types";

import { redirect } from "next/navigation";
import { isCurrentPathAnAuthPath } from "../url";

async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

const getLoggedInUser = async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  const currentPathIsAuthPath = await isCurrentPathAnAuthPath();
  if ((error || !data.user) && !currentPathIsAuthPath) {
    redirect("/login");
  }
  return data.user!;
};

export { getLoggedInUser, createSupabaseServerClient };
