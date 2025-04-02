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
import { createTeamUpdate } from "./actions";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

const TEXT = {
  createNewTeamUpdate: "Create New Team Update",
  creating: "Creating...",
  createTeamUpdate: "Create Team Update",
  title: "Title",
  enterTitle: "Your team update title",
  duration: "Duration",
};

export function CreateTeamUpdateDialog({ teamId }: { teamId: string }) {
  const [open, setOpen] = useState(false);
  const createTeamUpdateAction = createTeamUpdate.bind(null, teamId);
  const [result, submitTeamUpdate, isLoading] = useActionState(
    createTeamUpdateAction,
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
        <Button>{TEXT.createNewTeamUpdate}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{TEXT.createNewTeamUpdate}</DialogTitle>
        </DialogHeader>
        <form action={submitTeamUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{TEXT.title}</Label>
            <Input
              id="title"
              name="title"
              placeholder={TEXT.enterTitle}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">{TEXT.duration}</Label>
            <DatePickerWithRange
              startDateName="start-date"
              endDateName="end-date"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? TEXT.creating : TEXT.createTeamUpdate}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
