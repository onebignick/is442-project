import { User } from "@/types/User";
import { clerkClient } from "@clerk/nextjs/server";

export class ClerkService {
    
    async createOneUser(userToCreate: User) {
        const createdUser = await clerkClient.users.createUser({
            emailAddress: [userToCreate.email],
            password: userToCreate.password,
        });
        console.log(createdUser);
        return createdUser;
    }
}