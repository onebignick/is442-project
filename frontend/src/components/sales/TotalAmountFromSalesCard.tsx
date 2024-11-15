import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface TotalAmountFromSalesCardProps {
    totalAmountOfSales: number;
    className: string
}

export function TotalAmountFromSalesCard({ totalAmountOfSales, className } : TotalAmountFromSalesCardProps) {
    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Total Amount of Sales
                </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
                ${totalAmountOfSales.toFixed(2)}
            </CardContent>
        </Card>
    )
}