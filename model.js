export function addTask(tasks, title) {
    const id = Math.max(0, ...tasks.map((t) => t.id)) + 1;
    return [...tasks, { id, title, status: "todo" }];
}
export function completeTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}
export function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
// My own operations
export function advanceTask(tasks, id) {
    return tasks.map((t) => {
        if (t.id !== id)
            return t;
        if (t.status === "todo")
            return { ...t, status: "in-progress" };
        return { ...t, status: "done" };
    });
}
export function deleteTask(tasks, id) {
    return tasks.filter((t) => t.id !== id);
}
export function countByStatus(tasks, status) {
    return filterByStatus(tasks, status).length;
}
