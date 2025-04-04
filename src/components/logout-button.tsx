"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useActionState, useEffect } from "react";
import { signOut } from "@/app/login/actions";
import { toast } from "sonner";
import { User } from "@/lib/types";

const TEXT = {
  signOutError: "An error occurred while signing out",
  signOut: "Sign out",
};

type LogoutButtonProps = {
  // TODO: fix the type of this when we generate supabase types
  loggedInUser: User | null;
};

const LogoutButton = ({ loggedInUser }: LogoutButtonProps) => {
  const [error, signOutAction, isPending] = useActionState(signOut, undefined);

  useEffect(() => {
    if (error) {
      toast.error(TEXT.signOutError);
      console.log("error", error);
      // TODO: Log error to error tracking service
    }
  }, [error]);

  return (
    <>
      {loggedInUser && (
        <form action={signOutAction}>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-10 h-10"
            disabled={isPending}
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">{TEXT.signOut}</span>
          </Button>
        </form>
      )}
    </>
  );
};

export { LogoutButton };
