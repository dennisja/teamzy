import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CreateTeamUpdateDialog } from "../create-team-update-dialog";
import { toast } from "sonner";
import { createTeamUpdate } from "../actions";
import { vi, describe, beforeEach, it, expect, Mock } from "vitest";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../actions", async () => ({
  ...(await vi.importActual("../actions")),
  createTeamUpdate: vi.fn(),
}));

describe("CreateTeamUpdateDialog", () => {
  const teamId = "test-team-id";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the dialog trigger button", () => {
    render(<CreateTeamUpdateDialog teamId={teamId} />);
    expect(screen.getByText("Create New Team Update")).toBeInTheDocument();
  });

  it("opens the dialog when the trigger button is clicked", () => {
    render(<CreateTeamUpdateDialog teamId={teamId} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Create New Team Update" })
    );
    expect(
      screen.getByRole("heading", { name: "Create New Team Update" })
    ).toBeInTheDocument();
  });

  it("submits the form and shows success toast on success", async () => {
    (createTeamUpdate as Mock).mockResolvedValueOnce({
      type: "success",
      message: "Update created successfully",
    });
    console.dir({ createTeamUpdate }, { depth: null });

    render(<CreateTeamUpdateDialog teamId={teamId} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Create New Team Update" })
    );

    fireEvent.change(screen.getByPlaceholderText("Your team update title"), {
      target: { value: "Test Title" },
    });

    fireEvent.submit(
      screen.getByRole("button", { name: "Create Team Update" })
    );

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Update created successfully");
    });
  });

  it.skip("shows error toast on failure", async () => {
    (createTeamUpdate as Mock).mockResolvedValueOnce({
      type: "error",
      message: "Failed to create update",
    });

    render(<CreateTeamUpdateDialog teamId={teamId} />);
    fireEvent.click(screen.getByText("Create New Team Update"));

    fireEvent.change(screen.getByPlaceholderText("Your team update title"), {
      target: { value: "Test Title" },
    });

    fireEvent.submit(
      screen.getByRole("button", { name: "Create Team Update" })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to create update");
    });
  });

  it.skip("disables the submit button while loading", async () => {
    (createTeamUpdate as Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                type: "success",
                message: "Update created successfully",
              }),
            1000
          )
        )
    );

    render(<CreateTeamUpdateDialog teamId={teamId} />);
    fireEvent.click(screen.getByText("Create New Team Update"));

    fireEvent.change(screen.getByPlaceholderText("Your team update title"), {
      target: { value: "Test Title" },
    });

    fireEvent.submit(
      screen.getByRole("button", { name: "Create Team Update" })
    );

    expect(screen.getByRole("button", { name: "Creating..." })).toBeDisabled();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Create Team Update" })
      ).not.toBeDisabled();
    });
  });
});
