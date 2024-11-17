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
}