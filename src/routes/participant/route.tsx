import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RoleGate } from "@/components/layout/shells";

export const Route = createFileRoute("/participant")({
  component: () => (
    <RoleGate role="participant">
      <Outlet />
    </RoleGate>
  ),
});
