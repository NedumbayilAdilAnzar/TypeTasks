import {
  addTask,
  advanceTask,
  deleteTask,
  filterByStatus,
  countByStatus,
} from "./model.js";
import type { Task, TaskStatus } from "./model.js";

type Filter = TaskStatus | "all";
const filters: Filter[] = ["all", "todo", "in-progress", "done"];

let tasks: Task[] = [];
let currentFilter: Filter = "all";

const titleInput = document.getElementById("title") as HTMLInputElement;
const addButton = document.getElementById("add") as HTMLButtonElement;
const chipsDiv = document.getElementById("chips") as HTMLDivElement;
const listUl = document.getElementById("list") as HTMLUListElement;

function drawChips(): void {
  chipsDiv.replaceChildren();
  for (const f of filters) {
    const count = f === "all" ? tasks.length : countByStatus(tasks, f);
    const chip = document.createElement("button");
    chip.textContent = `${f} (${count})`;
    chip.className = f === currentFilter ? "chip active" : "chip";
    chip.addEventListener("click", () => {
      currentFilter = f;
      render();
    });
    chipsDiv.appendChild(chip);
  }
}

function drawList(): void {
  listUl.replaceChildren();

  const visible: Task[] =
    currentFilter === "all" ? tasks : filterByStatus(tasks, currentFilter);

  for (const task of visible) {
    const li = document.createElement("li");

    const title = document.createElement("span");
    title.className = "title";
    title.textContent = task.title;

    const badge = document.createElement("span");
    badge.className = `badge ${task.status}`;
    badge.textContent = task.status;

    li.append(title, badge);

    if (task.status !== "done") {
      const advance = document.createElement("button");
      advance.className = "action";
      advance.textContent = task.status === "todo" ? "Start" : "Finish";
      advance.addEventListener("click", () => {
        tasks = advanceTask(tasks, task.id);
        render();
      });
      li.appendChild(advance);
    }

    const remove = document.createElement("button");
    remove.className = "action";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => {
      tasks = deleteTask(tasks, task.id);
      render();
    });
    li.appendChild(remove);

    listUl.appendChild(li);
  }
}

function render(): void {
  drawChips();
  drawList();
}

addButton.addEventListener("click", () => {
  const title = titleInput.value.trim();
  if (title === "") return;
  tasks = addTask(tasks, title);
  titleInput.value = "";
  render();
});

render();