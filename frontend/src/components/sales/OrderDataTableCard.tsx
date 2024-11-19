import { Order } from "@/types/Order";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { OrderDataTable } from "../datatables/orders/OrderDataTable";
import { OrderDataTableColumns } from "../datatables/orders/OrderDataTableColumns";

interface OrderDataTableCardProps {
    className: string;
}

export async function OrderDataTableCard({ className } : OrderDataTableCardProps) {
    const ordersResponse = await fetch("http://localhost:8080/api/orders/price");
    const orders: Order[] = await ordersResponse.json();

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>View All Orders</CardTitle>
                <CardDescription>View all orders here</CardDescription>
            </CardHeader>
            <CardContent>
                <OrderDataTable columns={OrderDataTableColumns} data={orders}/>
            </CardContent>
        </Card>
    )
}