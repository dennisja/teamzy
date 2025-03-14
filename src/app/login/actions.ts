"use server";

import { getAppURL } from "@/lib/url";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getAppURL()}auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }

  if (error) {
    return error;
  }
}

async function signOut() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (!error) {
    redirect("/");
  }

  return error;
}

export { signInWithGoogle, signOut };
