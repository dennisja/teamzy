"use client";
import { LogOut } from "lucide-react";

import { ThemeProvider } from "./theme/ThemeProvider";
import { ThemeToggle } from "./theme/ThemeToggle";
import { Button } from "./ui/button";

const TEXT = {
  teamHealth: "Team Health",
  signOut: "Sign out",
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold">{TEXT.teamHealth}</h1>
            <div className="flex items-center space-x-4">
              {/* TODO: put this behind auth */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-10 h-10"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">{TEXT.signOut}</span>
              </Button>

              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="container py-8">{children}</main>
      </div>
    </ThemeProvider>
  );
};
