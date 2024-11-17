import { User } from "@/types/User";
import { clerkClient } from "@clerk/nextjs/server";

export class ClerkService {
    
    async createOneUser(userToCreate: User) {
        console.info("ClerkService.createOneUser: Creating User on Clerk")
        const createdUser = await clerkClient.users.createUser({
            emailAddress: [userToCreate.email],
            password: userToCreate.password,
            username: userToCreate.username,
            publicMetadata: {
                role: userToCreate.role
            }
        });
        console.info("ClerkService.createOneUser: Created User on Clerk")
        return createdUser;
    }

    async updateUserRole(clerkUserId: string, role: string) {
        await clerkClient.users.updateUserMetadata(clerkUserId, {
            publicMetadata: {
                role
            }
        })
        return;
    }
}