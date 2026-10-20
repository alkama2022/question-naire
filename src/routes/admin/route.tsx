import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RoleGate } from "@/components/layout/shells";

export const Route = createFileRoute("/admin")({
  component: () => (
    <RoleGate role="admin">
      <Outlet />
    </RoleGate>
  ),
});
