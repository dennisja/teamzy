import { createSupabaseServerClient } from "@/lib/supabase/server";

const fetchTeamData = async (teamId: string) => {
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

    .eq("id", teamId)
    .limit(1)
    .single();

  return { team: data, error };
};

export { fetchTeamData };
