import { CreateOrder } from "@/types/CreateOrder";

export class OrderService {
    
    async createOneOrder(order: CreateOrder) {
        const createdOrderResponse = await fetch("http://localhost:8080/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        });
        const createdOrder = await createdOrderResponse.json();
        return createdOrder;
    }
}