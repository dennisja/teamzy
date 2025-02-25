"use server";

import { getAppURL } from "@/lib/appURL";
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
    throw error; // Note: do proper error handling here
  }
}

async function signOut() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  if (!error) {
    redirect("/");
  }
  // Note: do proper error handling here
}

export { signInWithGoogle, signOut };
