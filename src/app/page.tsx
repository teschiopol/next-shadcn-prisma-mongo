import { getTask } from "@/actions/actions"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateForm } from "./create-form";
import { Task } from "@/types";

async function getData(): Promise<Task[]> {
  // Fetch data from your API here.
  // @ts-ignore
  return getTask()
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="">
      <div className="text-center my-8 flex justify-center">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
          ToDo List
        </h1>
      </div>
      <div className="container mx-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Add New</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Task</DialogTitle>
              <DialogDescription>
                Add new task to your list. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <CreateForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
