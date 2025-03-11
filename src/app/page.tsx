import { getLoggedInUser } from "@/lib/supabase/server";
import { CreateTeamDialog } from "./teams/create-team-dialog";
import { fetchTeams } from "./teams/data";
import { Card } from "@/components/ui/card";
import { TeamsTable } from "./teams/teams-table";
import { format } from "date-fns";

const TEXT = {
  welcomeBack: "Welcome Back!",
  shareUpdate: "Share your weekly update and stay connected with your team.",
  noTeamsYet:
    "You haven't created or joined any teams yet. Create a team to get started!",
};

export default async function Home() {
  const loggedInUser = await getLoggedInUser();
  const { teams } = await fetchTeams();

  return (
    <>
      <div className="max-w-3xl mx-auto space-y-8 animate-in">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {TEXT.welcomeBack}
              </h2>
              <p className="text-muted-foreground">{TEXT.shareUpdate}</p>
            </div>
            <CreateTeamDialog user={loggedInUser} />
          </div>
        </section>

        {/* TODO: handle loading and error cases for teams */}
        {teams ? (
          <TeamsTable
            teams={teams.map((team) => ({
              id: team.id,
              createdAt: format(new Date(team.created_at), "do, MMM yyyy"),
              name: team.name,
              createdBy: {
                id: team.profiles?.id,
                fullName: team.profiles?.full_name,
                avatarUrl: team.profiles?.avatar_url,
              },
            }))}
          />
        ) : null}

        {teams?.length === 0 && (
          <Card className="p-6">
            <p className="text-center text-muted-foreground">
              {TEXT.noTeamsYet}
            </p>
          </Card>
        )}
      </div>
    </>
  );
}
