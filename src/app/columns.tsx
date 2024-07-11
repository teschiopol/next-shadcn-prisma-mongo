"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Status = {
    status:  "new" | "pending" | "processing" | "success" | "failed"
}

export type Task = {
  id: string
  content: string
  status: Status
}

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "content",
        header: "Task",
    },
    {
        accessorKey: "status",
        header: "Status",
    }
]
