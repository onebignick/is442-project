import { TotalCustomerBreakdown } from "@/components/charts/TotalCustomerBreakdown";
import { CustomerDataTableCard } from "@/components/customers/CustomerDataTableCard";

export default async function CustomerAppPage() {

    const customersResponse = await fetch("http://localhost:8080/api/customer");
    const customers = await customersResponse.json();
    
    return (
        <div className="grid grid-cols-12 gap-4 p-8">
            <div className="col-span-12 lg:col-span-6">
                <TotalCustomerBreakdown/>
            </div>
            <div className="col-span-12">
                <CustomerDataTableCard allCustomers={customers}/>
            </div>
        </div>
    )
}