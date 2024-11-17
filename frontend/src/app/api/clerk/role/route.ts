import { ClerkController } from "@/server/Clerk/ClerkController";
import { NextRequest } from "next/server";

const clerkController: ClerkController = new ClerkController();

export async function PUT(request: NextRequest) {
    return await clerkController.updateUserRole(request);
}