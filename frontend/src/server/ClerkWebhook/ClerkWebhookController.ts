import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { NextRequest, NextResponse } from "next/server";
import { ClerkWebhookService } from "./ClerkWebhookService";

export class ClerkWebhookController {
    clerkWebhookService: ClerkWebhookService;

    constructor() {
        this.clerkWebhookService = new ClerkWebhookService();
    }

    async handleClerkEvent(request: NextRequest, headers: ReadonlyHeaders) {
        try {
            await this.clerkWebhookService.handleClerkEvent(request, headers);
            return NextResponse.json({}, {status: 200});
        } catch (e) {
            console.error(e.message)
            return NextResponse.json({}, {status: 500});
        }
    }
}