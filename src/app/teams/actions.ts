"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { error } from "console";

const TEXT = {
  teamCreated: "Team created successfully!",
  teamCreateError: "Failed to create team. Please try again.",
};

type CreateTeamResultState = {
  type: "success" | "error";
  message: string;
  error?: string;
};

export const createTeam = async (
  userId: string,
  previousState: CreateTeamResultState | undefined,
  formData: FormData
): Promise<CreateTeamResultState> => {
  const supabase = await createSupabaseServerClient();

  // TODO: validate with zod
  const name = formData.get("team-name") as string;

  // First create the team
  const { data: team, error: teamError } = await supabase
    .from("teams")
    .insert([
      {
        name,
        created_by: userId,
      },
      
    ])
    .select()
    .single();

  if (teamError) {
    console.error("Failed to create team", teamError);
    return {
      type: "error",
      message: TEXT.teamCreateError,
      error: teamError.message,
    };
  }

  // Then create the team membership for the creator
  const { error: memberError } = await supabase.from("team_members").insert([
    {
      team_id: team.id,
      user_id: userId,
      role: "owner", // Set the creator as owner
    },
  ]);

  if (memberError) {
    console.error("Failed to create team member", memberError);
    return {
      type: "error",
      message: TEXT.teamCreateError,
      error: memberError.message,
    };
  }

  return { type: "success", message: TEXT.teamCreated };
};
