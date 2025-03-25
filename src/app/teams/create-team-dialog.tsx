"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/lib/types";
import { createTeam } from "./actions";
import { Label } from "@/components/ui/label";

const TEXT = {
  createNewTeam: "Create New Team",
  creating: "Creating...",
  createTeam: "Create Team",
  teamName: "Team Name",
  enterName: "Enter team name",
};

export function CreateTeamDialog({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const createTeamAction = createTeam.bind(null, user.id);
  const [result, submitTeamAction, isLoading] = useActionState(
    createTeamAction,
    undefined
  );

  useEffect(() => {
    if (result) {
      if (result.type === "success") {
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    }
  }, [result]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{TEXT.createNewTeam}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{TEXT.createNewTeam}</DialogTitle>
        </DialogHeader>
        <form action={submitTeamAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="team-name">{TEXT.teamName}</Label>
            <Input
              id="team-name"
              name="team-name"
              placeholder={TEXT.enterName}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? TEXT.creating : TEXT.createTeam}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
