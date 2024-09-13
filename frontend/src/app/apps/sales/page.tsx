import { validateRole } from "@/lib/validateRole";
import { redirect } from "next/navigation";
import { TotalSalesChart } from "./_charts/total-sales-chart";

export default function SalesApp() {
  const allowedRoles = new Set(["sales", "admin"])

  if (validateRole(allowedRoles) === false) {
    redirect("/")
  }
  return (
    <div className="px-4">
      <TotalSalesChart/>
    </div>
  );
}