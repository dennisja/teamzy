import { getLoggedInUser } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { ThemeProvider } from "./theme/ThemeProvider";
import { ThemeToggle } from "./theme/ThemeToggle";
import { Toaster } from "sonner";

const TEXT = {
  teamHealth: "Team Health",
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = async ({ children }: LayoutProps) => {
  const user = await getLoggedInUser();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold">{TEXT.teamHealth}</h1>
            <div className="flex items-center space-x-4">
              <LogoutButton loggedInUser={user} />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <Toaster/>
      </div>
    </ThemeProvider>
  );
};
