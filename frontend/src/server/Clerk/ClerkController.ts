import { NextRequest, NextResponse } from "next/server";
import { ClerkService } from "./ClerkService";

export class ClerkController {
    
    clerkService: ClerkService;
    constructor() {
        this.clerkService = new ClerkService();
    }

    async createOneUser(request: NextRequest) {
        const userToCreate = await request.json();
        const createdUser = await this.clerkService.createOneUser(userToCreate)
        return NextResponse.json({ createdUser: createdUser }, { status: 200 });
    }

    async updateUserRole(request: NextRequest) {
        const { clerkUserId, role } = await request.json();
        await this.clerkService.updateUserRole(clerkUserId, role);
        return NextResponse.json({}, {status: 200});
    }
}