import { StripeController } from "@/server/Stripe/StripeController";
import { NextRequest } from "next/server";

const stripeController: StripeController = new StripeController();

export async function POST(request: NextRequest) {
    return await stripeController.createNewInvoice(request);
}