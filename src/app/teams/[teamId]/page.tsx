import { CreateTeamUpdateDialog } from "./create-team-update-dialog";
import { fetchTeamData } from "./data";

const TEXT = {
  description:
    "Welcome to the team ${team_name} home. Manage team details here",
};

export default async function TeamPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;

  const { team } = await fetchTeamData(teamId);


  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {team?.name}
            </h2>
            <p className="text-muted-foreground">{TEXT.description}</p>
          </div>
          <CreateTeamUpdateDialog teamId={teamId} />
        </div>
      </section>
    </div>
  );
}
