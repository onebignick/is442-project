import { auth } from "@clerk/nextjs/server";

export function validateRole(allowedRoles: Set<string>) : boolean {
  const { sessionClaims } = auth();
  const userRole: string = sessionClaims?.metadata.role ?? "";

  return allowedRoles.has(userRole);
}