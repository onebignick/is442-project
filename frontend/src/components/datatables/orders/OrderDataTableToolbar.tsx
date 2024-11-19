"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DataTableViewOptions } from "@/components/DataTableViewOptions"
import { DataTableFacetedFilter } from "@/components/DataTableFacetedFilter"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

const shippingMethods = [
    {
        value: "Same Day Delivery",
        label: "Same Day Delivery",
    },
];

const saleTypes = [
    {
        value: "Online",
        label: "Online",
    },
    {
        value: "Physical",
        label: "Physical",
    }
]

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter Orders By Id..."
                    value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("id")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <Input
                    placeholder="Filter Orders By Customer Id..."
                    value={(table.getColumn("customer_id")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("customer_id")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("sales_type") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("sales_type")}
                        title="Sales Type"
                        options={saleTypes}
                    />
                )}
                {table.getColumn("shipping_method") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("shipping_method")}
                        title="Shipping Method"
                        options={shippingMethods}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}