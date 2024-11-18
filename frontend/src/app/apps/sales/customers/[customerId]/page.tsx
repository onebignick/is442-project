import { OrderDataTable } from "@/components/datatables/orders/OrderDataTable";
import { OrderDataTableColumns } from "@/components/datatables/orders/OrderDataTableColumns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer } from "@/types/Customer";

interface IndividualCustomerPageProps {
    params : { customerId: string }
}

export default async function IndividualCustomerPage({ params } : IndividualCustomerPageProps) {

    const customerInformationResponse = await fetch("http://localhost:8080/api/customer/" + params.customerId);
    const customerInformation: Customer = await customerInformationResponse.json();

    const customerOrdersResponse = await fetch("http://localhost:8080/api/order/customerid/"+params.customerId);
    const customerOrders = await customerOrdersResponse.json();

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
        </div>
    )
}