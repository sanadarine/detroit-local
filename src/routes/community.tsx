import { createFileRoute, redirect } from "@tanstack/react-router";

// Community now lives inside the forum; keep old links working.
export const Route = createFileRoute("/community")({
  beforeLoad: () => {
    throw redirect({ to: "/stories", search: { section: "community" }, replace: true });
  },
});
