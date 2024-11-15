import { Customer } from "./Customer";

export interface Order {
    id: string;
    customer: Customer;
    salesDate: string;
    salesType: string;
    shippingMethod: string;
    address: string;
}