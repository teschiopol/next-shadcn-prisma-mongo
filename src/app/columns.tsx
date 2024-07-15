"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { capitaL } from "@/lib/utils"
import { Task, badgeType } from "@/types"
import { useState } from "react"
import { EditForm } from "./edit-form"
import { completeTask, deleteTask } from "@/actions/actions"

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Task
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const value : string = capitaL(row.getValue("status"))
      let badgeType : badgeType = 'default';
      switch (value) {
        case 'Pending':
          badgeType = 'secondary';
          break;
        case 'Processing':
        case 'Success':
          badgeType = 'outline';
          break;
        case 'Failed':
          badgeType = 'destructive';
          break;   
        default:
          break;
      }
 
      return  <Badge variant={badgeType}>{value}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
     
      return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                onClick={() => setIsEditDialogOpen(true)}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Complete</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {setIsDeleteDialogOpen(true); completeTask(row.getValue("id"))}} className="text-red-700">  Delete</DropdownMenuItem>            
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your selected task.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteTask(row.getValue("id"))}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>
                  Edit selected task of your list. Click save when done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <EditForm task={task}/>
              </div>
            </DialogContent>
          </Dialog>
        </AlertDialog>
      )
    }
  }
]
