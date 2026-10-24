import { createFileRoute, redirect } from "@tanstack/react-router";

// The seller hub now lives inside Explore; keep old links working.
export const Route = createFileRoute("/vendor-hub")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/explore", search: { tab: "sell" }, hash: location.hash || undefined, replace: true });
  },
});
