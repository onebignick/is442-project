import { ClerkWebhookController } from "@/server/ClerkWebhook/ClerkWebhookController";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

const clerkWebhookController = new ClerkWebhookController();

export async function POST(request: NextRequest) {
    const header: ReadonlyHeaders = headers();
    return await clerkWebhookController.handleClerkEvent(request, header);
}