"use client"

import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DateRange } from "react-day-picker"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { format } from "date-fns";

import { DataTableViewOptions } from "@/components/DataTableViewOptions"
import { DataTableFacetedFilter } from "@/components/DataTableFacetedFilter"
import Papa from "papaparse"

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

const shippingMethods = [
    {
        value: "Same Day Delivery",
        label: "Same Day Delivery",
    },
];

const saleTypes = [
    {
        value: "Direct - B2B",
        label: "Direct - B2B",
    },
    {
        value: "Direct - B2C",
        label: "Direct - B2C",
    },
    {
        value: "Wholesaler",
        label: "Wholesaler",
    },
    {
        value: "Consignment",
        label: "Consignment",
    },
    {
        value: "Marketing",
        label: "Marketing",
    },
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

    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);

    const handleDateRangeChange = (dateRange: DateRange | undefined) => {
        setDateRange(dateRange);
    
        if (dateRange?.from && dateRange?.to) {
            table.getColumn("sales_date")?.setFilterValue([
                format(dateRange.from, "yyyy-MM-dd"),
                format(dateRange.to, "yyyy-MM-dd"),
            ]);
        } else {
            table.getColumn("sales_date")?.setFilterValue(undefined);
        }
    };

    const exportToCSV = () => {
        const filteredData = table.getSortedRowModel().rows.map((row) => row.original);

        const csv = Papa.unparse(filteredData);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "filtered-orders.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter Orders By Id..."
                    value={(table.getColumn("order_id")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("order_id")?.setFilterValue(event.target.value)
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
                <DatePickerWithRange 
                    onChange={handleDateRangeChange} 
                />
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
            <div className="flex items-center space-x-2">
                <Button 
                    variant="secondary"
                    onClick={exportToCSV} 
                    className="h-8 px-3 lg:px-4">
                    Export
                </Button>
                <DataTableViewOptions table={table} />
            </div>
        </div>
    )
}