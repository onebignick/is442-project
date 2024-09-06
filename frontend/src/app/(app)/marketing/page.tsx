import { validateRole } from "@/lib/validateRole";
import { redirect } from "next/navigation";

export default function MarketingApp() {
  const allowedRoles = new Set(["marketing", "admin"])

  if (validateRole(allowedRoles) === false) {
    redirect("/")
  }
  return (
    <div>
      This is the marketing page
    </div>
  );
}