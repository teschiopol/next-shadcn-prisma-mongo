"use server";

import prisma from "@/prisma";
import { CreateTask } from './../types'

export async function getTask() {
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
