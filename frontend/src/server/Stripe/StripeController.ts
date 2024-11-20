import { NextRequest, NextResponse } from "next/server";
import { StripeService } from "./StripeService"

export class StripeController {

    stripeService: StripeService;
    constructor() {
        this.stripeService = new StripeService();
    }

    async createNewInvoice(request: NextRequest) {
        const body = await request.json();
        const url = await this.stripeService.createDraftInvoice(body["email"], body["priceId"], body["quantity"])
        return NextResponse.json({url: url}, {status: 200})
    }
}