import { prisma } from "@/utils";
import { Task, columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"

async function getData(): Promise<Task[]> {
  // Fetch data from your API here.
  const allTask = await prisma.task.findMany()
  return allTask
}

async function addTask() {
  await prisma.task.create({
    data: {
      content: 'Added task',
      status: 'new',
    },
  })
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="">
      <div className="text-center my-5 flex justify-center">
        <h1 className="text-2xl font-bold">ToDo List</h1>
      </div>
      <div className="flex mx-10">
        <Button>Add New</Button>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
