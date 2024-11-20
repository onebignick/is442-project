export type OrderLineItem = {
    id?: string;
    order: { id: string };
    quantity: number;
    price: { id: string };
}