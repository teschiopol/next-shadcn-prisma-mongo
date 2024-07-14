export type StatusType = "new" | "pending" | "processing" | "success" | "failed"

export type Task = {
  id: string
  content: string
  status: StatusType
}

export type CreateTask = {
    task: string,
    status: StatusType
}

export type badgeType = "outline" | "default" | "destructive" | "secondary"
