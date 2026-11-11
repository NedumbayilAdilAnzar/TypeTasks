"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = addTask;
exports.completeTask = completeTask;
exports.filterByStatus = filterByStatus;
function addTask(tasks, title) {
    const id = Math.max(0, ...tasks.map((t) => t.id)) + 1;
    return [...tasks, { id, title, status: "todo" }];
}
function completeTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}
function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
