export type CreateOrder = {
    id?: string;
    invoiceId: string;
    customer: {
        id: string,
    };
    salesDate: string;
    salesType: string;
    shippingMethod: string;
    address: string;
}