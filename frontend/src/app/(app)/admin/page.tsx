import { validateRole } from "@/lib/validateRole";
import { redirect } from "next/navigation";

export default function AdminApp() {
  const allowedRoles = new Set(["admin"])

  if (validateRole(allowedRoles) === false) {
    redirect("/")
  }
  return (
    <div>
      This is the admin page
    </div>
  );
}