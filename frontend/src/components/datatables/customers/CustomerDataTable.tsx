"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "@/components/DataTablePagination"
import { DataTableToolbar } from "./CustomerDataTableToolbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function CustomerDataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    const handleSendEmail = () => {
        const selectedRows = table.getSelectedRowModel().rows;
        const selectedData = selectedRows.map((row) => row.original);
        const emailList = selectedData.map((data) => data.email).join(", ");

        // Store the selectedData array in sessionStorage
        if (typeof window !== "undefined") {
            sessionStorage.setItem("selectedCustomers", JSON.stringify(selectedData));
        }

        return emailList;
    };

    return (
        <div className="space-y-4">
            <DataTableToolbar table={table} />

            <div>
                {/* <Button
                    onClick={() => {
                        const selectedRows = table.getSelectedRowModel().rows;
                        const selectedData = selectedRows.map((row) => row.original);
                        console.log("Selected Data:", selectedData);
                    }}
                >
                    Log Selected Rows
                </Button> */}

                {/* <Button
                    onClick={() => {
                        const selectedRows = table.getSelectedRowModel().rows;
                        const selectedData = selectedRows.map((row) => row.original);
                        const emailList = selectedData.map((data) => data.email).join(", ");
                        console.log("Selected Emails:", emailList);
                        setEmails(emailList); // Save the emails to state
                    }}
                >
                    <Link
                        href={{
                            pathname: "/apps/marketing/templates/send",
                            query: { recipients: emails }, // Access emails from state
                        }}
                    >
                        Send Email
                    </Link>
                </Button> */}

                <Button>
                    <Link
                        href={{
                            pathname: "/apps/marketing/templates/send",
                            query: { recipients: handleSendEmail() }, // Pass email list as query parameter
                        }}
                    >
                        Send Email
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    )
}