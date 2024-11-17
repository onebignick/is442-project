import { User } from "@/types/User";
import { clerkClient } from "@clerk/nextjs/server";

export class ClerkService {
    
    async createOneUser(userToCreate: User) {
        const createdUser = await clerkClient.users.createUser({
            emailAddress: [userToCreate.email],
            password: userToCreate.password,
            publicMetadata: {
                role: userToCreate.role
            }
        });
        console.log(createdUser);

        return createdUser;
    }

    async updateUserRole(clerkUserId: string, role: string) {
        console.log(clerkUserId, role);
        await clerkClient.users.updateUserMetadata(clerkUserId, {
            publicMetadata: {
                role
            }
        })
        return;
    }
}