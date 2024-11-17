import { Customer } from "@/types/Customer";

export type CustomerDataTableFilterType = "all" | "active" | "dormant" | "returning" | "frequent" | "occasional" | "onetime" | "high" | "mid" | "low" | "";

export const CustomerDataTableFilters = [
    {
        id: "all",
        label: "All Customers",
    },
    {
        id: "active",
        label: "Active Customers",
    },
    {
        id: "dormant",
        label: "Dormant Customers",
    },
    {
        id: "returning",
        label: "Returning Customers",
    },
    {
        id: "frequent",
        label: "Frequent Customers",
    },
    {
        id: "occasional",
        label: "Occasional Customers",
    },
    {
        id: "onetime",
        label: "One Time Customers",
    },
    {
        id: "highvalue",
        label: "High Value Customers",
    },
    {
        id: "midtier",
        label: "Mid Range Customers",
    },
    {
        id: "lowspend",
        label: "Low Spend Customers",
    },
]

export async function handleCustomerFilter(filterType: CustomerDataTableFilterType) : Promise<Customer[]> {
    switch (filterType) {
        case "all":
            return await retrieveCustomer("");
        default:
            return await retrieveCustomer(filterType);
    }
}

export async function retrieveCustomer(filterType: CustomerDataTableFilterType) : Promise<Customer[]> {
    let customersResponse;
    if (filterType) {
        customersResponse = await fetch("http://localhost:8080/api/customer/" + filterType);
    }
    else {
        customersResponse = await fetch("http://localhost:8080/api/customer");
    }
    
    if (!customersResponse.ok) {
        console.error("an error occured");
    }

    const customers = await customersResponse.json();
    return customers;
}