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

    async updateOneUser(userToUpdate: User) {
        console.info("ClerkService.updateOneUser: Updating User on Clerk")
        const userToUpdateClerkUserId = userToUpdate.clerkUserId!;
        
        const updatedUser = await clerkClient.users.updateUser(userToUpdateClerkUserId, {
            username: userToUpdate.username,
            password: userToUpdate.password,
            publicMetadata: {
                role: userToUpdate.role
            }
        })
        console.info("ClerkService.updateOneUser: Updated User on Clerk", updatedUser);
        return updatedUser;
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