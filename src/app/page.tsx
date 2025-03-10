import { getLoggedInUser } from "@/lib/supabase/server";
import { CreateTeamDialog } from "./team/CreateTeamDialog";

const TEXT = {
  welcomeBack: "Welcome Back!",
  shareUpdate: "Share your weekly update and stay connected with your team.",
};

export default async function Home() {
  const loggedInUser = await getLoggedInUser();

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
      </div>
    </>
  );
}
