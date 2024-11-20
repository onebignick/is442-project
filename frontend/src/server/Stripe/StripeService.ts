import Stripe from 'stripe';
import { CustomerService } from '../Customer/CustomerService';
import { Customer } from '@/types/Customer';
import { OrderService } from '../Order/OrderService';
import { OrderLineItemService } from '../OrderLineItem/OrderLineItem';
import { CreateOrder } from '@/types/CreateOrder';
import { OrderLineItem } from '@/types/OrderLineItem';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export class StripeService {
    
    customerService: CustomerService;
    orderService: OrderService;
    orderLineItemService: OrderLineItemService;

    constructor() {
        this.customerService = new CustomerService();
        this.orderService = new OrderService();
        this.orderLineItemService = new OrderLineItemService();
    }

    async createDraftInvoice(customerEmail: string, priceId: string, quantity: number) {

        const targetCustomer = await this.customerService.checkIfCustomerExistsByEmail(customerEmail);
        
        let targetCustomerStripeId;
        let targetCustomerId;
        if (targetCustomer.length == 0) {
            targetCustomerStripeId = await this.createCustomer(customerEmail);

            const customerToCreate = {
                stripeCustomerId: targetCustomerStripeId,
                email: customerEmail,
                name: "demo account"
            } as Customer;
            const createdCustomer = await this.customerService.createCustomer(customerToCreate);
            targetCustomerId = createdCustomer.id

        } else {
            targetCustomerStripeId = targetCustomer[0].stripeCustomerId;
            targetCustomerId = targetCustomer[0].id 
        }
        console.log(targetCustomerId, targetCustomerStripeId)

        const createdInvoice = await stripe.invoices.create({
            customer: targetCustomerStripeId
        })
        const createdInvoiceId = createdInvoice.id;

        const orderToCreate = {
            invoiceId: createdInvoiceId,
            customer: { id: targetCustomerId },
            salesDate: "2024-11-20",
            shippingMethod: "Same Day Delivery",
            salesType: "Online",
            address: "00000"
        } as CreateOrder;
        const createdOrder = await this.orderService.createOneOrder(orderToCreate);

        await stripe.invoiceItems.create({
            customer: targetCustomerStripeId,
            price: priceId,
            invoice: createdInvoiceId,
            quantity: quantity,
        });

        const orderLineItemToCreate = {
            order: { id: createdOrder.id },
            quantity: quantity,
            price: { id: priceId },
        } as OrderLineItem     
        await this.orderLineItemService.createOneOrderLineItem(orderLineItemToCreate);

        const finalizedInvoice = await stripe.invoices.finalizeInvoice(createdInvoiceId);

        return finalizedInvoice.hosted_invoice_url;
    }

    async createCustomer(email: string) {

        const newCustomer = await stripe.customers.create({
            email: email,
        })

        return newCustomer.id;

    }
}