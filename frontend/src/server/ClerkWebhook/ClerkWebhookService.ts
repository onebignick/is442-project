import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { NextRequest } from "next/server";
import { User } from "@/types/User";

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;
const BACKEND_URL = process.env.BACKEND_URL;

export class ClerkWebhookService {

    async handleClerkEvent(request: NextRequest, headers: ReadonlyHeaders) {
        const event = await request.json();
        const body: string = JSON.stringify(event);
        if (!this.validateRequest(body, headers)) {
            throw new Error("Invalid event");
        }

        switch (event.type) {
            case "user.created":
                await this.handleUserCreated(event);
                break;
            case "user.updated":
                await this.handleUserUpdated(event);
                break;
            case "user.deleted":
                await this.handleUserDeleted(event);
                break;
        }
    }

    async handleUserCreated(event: any) {
        try {
            console.info("ClerkWebhookService.handleCreatedUser: handling event", event)

            const userData = event.data;

            let role;
            if (!userData.public_metadata && !userData.public_metadata["role"]) {
                role = ""
            } else {
                role = userData.public_metadata["role"];
            }

            const newUser = {
                clerkUserId: userData.id,
                username: userData.username,
                email: userData.email_addresses[0].email_address,
                role: role,
            } as User;
            
            // callout to backend to create user
            console.info("ClerkWebhookService.handleCreatedUser:  creating user on backend")
            const userToCreateResponse = await fetch(BACKEND_URL + "user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify(newUser),
            });
            if (userToCreateResponse.ok) {
                const createdUser = await userToCreateResponse.json();
                console.log(createdUser);
            } else {
                console.error("ClerkWebhookService.handleCreatedUser: an error occured")
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    async handleUserUpdated(event: any) {
        const userData = event.data;

        const userToUpdateResponse = await fetch(BACKEND_URL + "user/clerkUserId/" + userData.id);
        if (!userToUpdateResponse.ok) return;

        const userToUpdate: User = (await userToUpdateResponse.json())[0];
        userToUpdate.username = userData.username;
        userToUpdate.role = userData.public_metadata["role"];
        
        const updatedUserResponse = await fetch(BACKEND_URL + "user", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userToUpdate),
        })
        if (updatedUserResponse.ok) return;

        console.error("ClerkWebhookService.handleUserUpdated: An error occured");
    }

    async handleUserDeleted(event: any) {
        const userData = event.data;
        
        const targetUserToDeleteResponse = await fetch(BACKEND_URL + "user/clerkUserId/" + userData.id);
        if (!targetUserToDeleteResponse.ok) return;

        const targetUserToDelete = await targetUserToDeleteResponse.json()
        console.log(targetUserToDelete)
        const deletedUserResponse = await fetch(BACKEND_URL + "user", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(targetUserToDelete[0])
        })
        if (!deletedUserResponse.ok) return;
        console.log("user deleted");
        return;
    }

    validateRequest(body: string, headers: ReadonlyHeaders) : boolean {
        try {
            console.log("validating request")
            const svix_id = headers.get("svix-id");
            const svix_timestamp = headers.get("svix-timestamp");
            const svix_signature = headers.get("svix-signature");
            if (!svix_id || !svix_timestamp || !svix_signature) {
                throw new Error("invalid headers");
            } 

            const wh = new Webhook(CLERK_WEBHOOK_SECRET);
            wh.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature
            }) as WebhookEvent;
            console.log("successfully validated request");
            return true;
        } catch {
            console.log("failed to validate request");
            return false;
        }
    }
}