export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export function addTask(tasks: Task[], title: string): Task[] {
  const id = Math.max(0, ...tasks.map((t) => t.id)) + 1;
  return [...tasks, { id, title, status: "todo" }];
}

export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}

export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

// My own operations
export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => {
    if (t.id !== id) return t;
    if (t.status === "todo") return { ...t, status: "in-progress" };
    return { ...t, status: "done" };
  });
}

export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}

export function countByStatus(tasks: Task[], status: TaskStatus): number {
  return filterByStatus(tasks, status).length;
}
