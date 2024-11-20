"use client"

import { Customer } from "@/types/Customer"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CustomerDataTable } from "../datatables/customers/CustomerDataTable";
import { CustomerDataTableColumns } from "../datatables/customers/CustomerDataTableColumns";
import { CustomerDataTableFilters, CustomerDataTableFilterType, handleCustomerFilter } from "./CustomerFilters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CustomerDataTableCardProps {
    allCustomers: Customer[]
}


export function CustomerDataTableCard({ allCustomers } : CustomerDataTableCardProps) {

    const [customers, setCustomers] = useState<Customer[]>(allCustomers);

    async function handleOnValueChange(value: CustomerDataTableFilterType) {
        const segmentedCustomers = await handleCustomerFilter(value);
        setCustomers(segmentedCustomers);
    }

    return (
        <Card>
            <CardHeader className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center w-full">
                    <CardTitle className="text-lg font-semibold">Customer Table</CardTitle>
                    <Button>
                        <Link href="/apps/marketing/templates/send"> Send Email </Link>
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <Label>Filter By</Label>
                <Select onValueChange={handleOnValueChange} defaultValue="all">
                    <SelectTrigger>
                        <SelectValue/>
                    </SelectTrigger>
                    
                    <SelectContent>
                        {CustomerDataTableFilters.map((item) => {
                            return <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                        })}
                    </SelectContent>
                </Select>
                <CustomerDataTable columns={CustomerDataTableColumns} data={customers}/>
            </CardContent>
        </Card>
    )
}