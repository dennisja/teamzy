import { LogOut } from "lucide-react";

import { ThemeProvider } from "./theme/ThemeProvider";
import { ThemeToggle } from "./theme/ThemeToggle";
import { Button } from "./ui/button";
import { getLoggedInUser } from "@/lib/supabase/server";
import { signOut } from "@/app/login/actions";

const TEXT = {
  teamHealth: "Team Health",
  signOut: "Sign out",
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
              {user && (
                <form action={signOut}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-10 h-10"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">{TEXT.signOut}</span>
                  </Button>
                </form>
              )}
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="container py-8">{children}</main>
      </div>
    </ThemeProvider>
  );
};
