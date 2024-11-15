import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface TotalNumberOfSalesCardProps {
    totalNumberSales: number;
    className: string;
}

export function TotalNumberOfSalesCard({ totalNumberSales, className } : TotalNumberOfSalesCardProps) {
    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Total Number of Sales
                </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
                {totalNumberSales}
            </CardContent>
        </Card>
    )
}