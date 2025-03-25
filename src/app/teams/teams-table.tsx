import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { Maybe } from "@/lib/types";
import { Edit3, Trash2 } from "lucide-react";
import Link from "next/link";

const TEXT = {
  teamName: "Team Name",
  createdAt: "Created at",
  createdBy: "Created by",
  actions: "Actions",
  yourTeams: "Your Teams",
  editTeam: "Edit team",
  deleteTeam: "Delete team",
};

type Team = {
  id: string;
  name: string;
  createdAt: string;
  createdBy: {
    fullName?: Maybe<string>;
    avatarUrl?: Maybe<string>;
  };
};

type TeamsTableProps = {
  teams: readonly Team[];
};

const TeamsTable = ({ teams }: TeamsTableProps) => {
  return (
    <div className="my-5">
      <Text as="h1" variant="h3">
        {TEXT.yourTeams}
      </Text>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{TEXT.teamName}</TableHead>
            <TableHead>{TEXT.createdAt}</TableHead>
            <TableHead>{TEXT.createdBy}</TableHead>
            <TableHead>{TEXT.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>
                <Link href={`teams/${team.id}`}>{team.name}</Link>
              </TableCell>
              <TableCell>{team.createdAt}</TableCell>
              <TableCell>{team.createdBy.fullName}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Edit3 className="h-5 w-5" />
                  <span className="sr-only">{TEXT.editTeam}</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-5 w-5" />
                  <span className="sr-only">{TEXT.deleteTeam}</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { TeamsTable };
