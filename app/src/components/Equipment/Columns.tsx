"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Equipment = {
    id: string
    equipmentName: string
    brand: string
    price:number
    model:string
    status:string
    purchaseDate:Date 
    warrantyExpiryDate:Date
}

export const equipmentColumns: ColumnDef<Equipment>[] = [
    {
        accessorKey: "equipmentName",
        header: "Name",
    },
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        accessorKey: "model",
        header: "Model",
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
]
