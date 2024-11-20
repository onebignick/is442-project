import { OrderDataTable } from "@/components/datatables/orders/OrderDataTable";
import { OrderDataTableColumns } from "@/components/datatables/orders/OrderDataTableColumns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer } from "@/types/Customer";


import { TotalNumberOfSalesCard } from "@/components/sales/TotalNumberOfSalesCard";
import { TotalAmountFromSalesCard } from "@/components/sales/TotalAmountFromSalesCard";
import { AverageOrderValue } from "@/components/sales/AverageOrderValue";

interface IndividualCustomerPageProps {
    params: { customerId: string }
}

export default async function IndividualCustomerPage({ params }: IndividualCustomerPageProps) {

    const customerInformationResponse = await fetch("http://localhost:8080/api/customer/" + params.customerId);
    const customerInformation: Customer = await customerInformationResponse.json();

    const customerOrdersResponse = await fetch("http://localhost:8080/api/order/customerid/" + params.customerId);
    const customerOrders = await customerOrdersResponse.json();

    const customerOrdersPricesResponse = await fetch("http://localhost:8080/api/order/customerid/" + params.customerId + "/total");
    const customerOrdersPrices = await customerOrdersPricesResponse.json();

    const totalCustOrderValue = customerOrdersPrices.reduce((curSum: number, curOrder: any) => curSum + curOrder.total_price, 0)
    const custoAverageOrderValue = totalCustOrderValue / customerOrders.length;


    return (
        <div className="grid grid-cols-12 gap-4 p-8">
            <div className="col-span-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Customer {customerInformation.name}</CardTitle>
                        <CardDescription>Now viewing information about {customerInformation.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            Email: {customerInformation.email}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-12">
                <OrderDataTable columns={OrderDataTableColumns} data={customerOrders} />
            </div>

            <TotalNumberOfSalesCard className={"col-span-4"} totalNumberSales={customerOrders.length} />
            <TotalAmountFromSalesCard className={"col-span-4"} totalAmountOfSales={totalCustOrderValue} />
            <AverageOrderValue className={"col-span-4"} averageOrderValue={custoAverageOrderValue} />

        </div>
    )


}