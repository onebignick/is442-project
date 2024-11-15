import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface AverageOrderValueProps {
    averageOrderValue: number;
    className: string;
}

export function AverageOrderValue({ averageOrderValue, className } : AverageOrderValueProps) {
    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Average Order Value
                </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
                ${ averageOrderValue.toFixed(2) }
            </CardContent>
        </Card>
    )
}