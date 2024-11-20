import { Customer } from "@/types/Customer";

export class CustomerService {

    async checkIfCustomerExistsByEmail(customerEmail: string) : Promise<Customer[]> {
        const foundResponse = await fetch("http://localhost:8080/api/customer/email/"+customerEmail);
        const foundCustomers = await foundResponse.json();
        return foundCustomers;
    }

    async createCustomer(customer: Customer) {
        const createdCustomerResponse = await fetch("http://localhost:8080/api/customer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer)
        })
        const createdCustomer = await createdCustomerResponse.json();
        console.log(createdCustomer);
        return createdCustomer;
    }

}