import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RoleGate } from "@/components/layout/shells";

export const Route = createFileRoute("/researcher")({
  component: () => (
    <RoleGate role="researcher">
      <Outlet />
    </RoleGate>
  ),
});
