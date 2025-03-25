"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import z from "zod";
import { isAfter } from "date-fns";

const TEXT = {
  teamUpdateCreated: "Team update created successfully",
  teamUpdateCreateError: "Failed to create team update. Please try again.",
  teamIdIsUuid: "Team id is not a valid uuid",
  titleMinLength: "The title should be more than 5 characters",
  titleMaxLength: "The title should not be more than 100 characters",
  minStartDate: "Start date cannot be in the past",
  minEndDate: "End date cannot be in the past",
};

const CreateTeamUpdateSchema = z.object({
  teamId: z.string().uuid(TEXT.teamIdIsUuid),
  title: z.string().min(5, TEXT.titleMinLength).max(100, TEXT.titleMaxLength),
  startDate: z
    .string()
    .refine((date) => isAfter(new Date(date), new Date()), {
      message: TEXT.minStartDate,
    }),
  endDate: z
    .string()
    .refine((date) => isAfter(new Date(date), new Date()), {
      message: TEXT.minEndDate,
    }),
});

type CreateTeamResultState = {
  type: "success" | "error";
  message: string;
  error?: string;
};

const createTeamUpdate = async (
  teamId: string,
  previousState: CreateTeamResultState | undefined,
  formData: FormData
): Promise<CreateTeamResultState | undefined> => {
  const supabase = await createSupabaseServerClient();

  const endDate = formData.get("end-date");
  const title = formData.get("title");
  const startDate = formData.get("start-date");

  const result = CreateTeamUpdateSchema.safeParse({
    endDate,
    title,
    startDate,
    teamId,
  });

  if (!result.success) {
    // TODO: return the zod errors to the form
    // or just do this in client side validation
    return {
      error: "error",
      message: TEXT.teamUpdateCreateError,
      type: "error",
    };
  }

  const { error: teamUpdateCreateError, data } = await supabase
    .from("team_update")
    .insert([
      {
        end_date: result.data.endDate,
        title: result.data.title,
        start_date: result.data.startDate,
        team_id: result.data.teamId,
      },
    ])
    .select()
    .single();

  if (teamUpdateCreateError) {
    return {
      error: "error",
      message: TEXT.teamUpdateCreateError,
      type: "error",
    };
  }

  if (data) return { type: "success", message: TEXT.teamUpdateCreated };

  return previousState;
};

export { createTeamUpdate };
