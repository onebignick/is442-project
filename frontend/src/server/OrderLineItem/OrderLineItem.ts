import { OrderLineItem } from "@/types/OrderLineItem";

export class OrderLineItemService {

    async createOneOrderLineItem(orderLineItem: OrderLineItem) {
        const createdOrderLineItemResponse = await fetch("http://localhost:8080/api/orderLineItem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderLineItem),
        });
        const createdOrderLineItem = await createdOrderLineItemResponse.json();
        return createdOrderLineItem;
    }
}