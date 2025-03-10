import { createSupabaseServerClient } from "@/lib/supabase/server";

const fetchTeams = async () => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("teams")
    .select(
      `id,
        name,
        created_at,
        profiles!teams_created_by_fkey (
            id,
            full_name,
            avatar_url
        ) `
    )
    .order("created_at", { ascending: false });

  return { teams: data, error };
};

export { fetchTeams };
