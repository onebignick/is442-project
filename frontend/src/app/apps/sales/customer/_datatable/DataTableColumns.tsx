"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowOptions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Customer } from "@/types/Customer";

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Id" />),
        cell: ({ row }) => {
            return (
                <Button variant="link" asChild>
                    <Link href={`#`}>{row.getValue("id")}</Link>
                </Button>
            );
        }
    },
    {
        id: "actions",
        cell: () => <div className="w-full flex justify-end"><DataTableRowActions /></div>,
    }
];