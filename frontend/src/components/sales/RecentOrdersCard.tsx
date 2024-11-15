import { Order } from "@/types/Order";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface RecentOrdersCardProps {
    className: string;
    allOrders: Order[];
}

export function RecentOrdersCard({ className, allOrders} : RecentOrdersCardProps) {
    allOrders.sort((a, b) => +(new Date(b.salesDate)) - +(new Date(a.salesDate)));
    const recentOrders: Order[] = allOrders.slice(0, 5);
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                {recentOrders.map((order: Order, idx: number) => {
                    return(
                        <div key={idx}>
                            {order.customer.name} just made a purchase {order.salesType} on {order.salesDate}!
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    )
}