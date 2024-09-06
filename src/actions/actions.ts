"use server";

import prisma from "@/prisma";
import { CreateTask, EditTask } from './../types'

export const dynamic = "force-dynamic";

export async function getTask() {
  if (process.env.OFFLINE === 'demo') {
    return [
      {
        id: '2345',
        status: 'new',
        content: 'pfir'
      },
      {
        id: '23435',
        status: 'pending',
        content: 'sabe'
      }
    ];
  }
  return await prisma.task.findMany()
}
  
export async function createTask(values : CreateTask) {
  const res = prisma.task.create({
    data: {
      content: values.task,
      // @ts-ignore
      status: values.status, 
    },
  })
   
  return res;
}

export async function ediTask(values : EditTask) {
  const res = prisma.task.update({
    where: {
      id: values.id
    },
    data: {
      content: values.task,
      // @ts-ignore
      status: values.status, 
    },
  })
   
  return res;
}

export async function completeTask(id: string) {
  await prisma.task.update({
    where: {
      id: id
    },
    data: {
      // @ts-ignore
      status: 'success',
    }
  })
}

export async function deleteTask(id : string) {
  await prisma.task.delete({
    where: {
      id: id
    }
  })
}
