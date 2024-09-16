import { Customer } from "@/types/Customer";
import { DataTable } from "./_datatable/DataTable";
import { columns } from "./_datatable/DataTableColumns";

export default async function SalesAppCustomer() {

    const findAllCustomers = async () => {
        const response = await fetch("http://localhost:8080/customers");
        const json = await response.json();
        return json;
    }

    const customers: Customer[] = await findAllCustomers();
    return (
        <div className="px-4">
            <DataTable columns={columns} data={customers}/>
        </div>
    )
}