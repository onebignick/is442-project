import { OrderDataTableCard } from "@/components/sales/OrderDataTableCard";

export default function MarketingOrderPage() {
    return (
        <div className="grid grid-cols-12 gap-4 p-8">
            <OrderDataTableCard className={"col-span-12"}/>
        </div>
    )
}