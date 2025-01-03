import { ClerkController } from "@/server/Clerk/ClerkController";
import { NextRequest } from "next/server";

const clerkController: ClerkController = new ClerkController();

export async function POST(request: NextRequest) {
    return await clerkController.createOneUser(request);
}

export async function PUT(request: NextRequest) {
    return await clerkController.updateOneUser(request);
}