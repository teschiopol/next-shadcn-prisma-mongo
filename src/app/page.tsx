import { prisma } from "@/utils";
import { Task, columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

async function getData(): Promise<Task[]> {
  // Fetch data from your API here.
  const allTask = await prisma.task.findMany()
  // @ts-ignore
  return allTask
}

async function addTask() {
  await prisma.task.create({
    data: {
      content: 'Added task',
      // @ts-ignore
      status: 'new', 
    },
  })
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="">
      <div className="text-center my-8 flex justify-center">
        <h1 className="text-2xl font-semibold">ToDo List</h1>
      </div>
      <div className="container mx-auto">
        <Button>
          <Plus className="mr-2 h-4 w-4" />Add New
        </Button>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
