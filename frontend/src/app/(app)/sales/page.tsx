import { validateRole } from "@/lib/validateRole";
import { redirect } from "next/navigation";

export default function SalesApp() {
  const allowedRoles = new Set(["sales", "admin"])

  if (validateRole(allowedRoles) === false) {
    redirect("/")
  }
  return (
    <div>
      This is the sales page
    </div>
  );
}