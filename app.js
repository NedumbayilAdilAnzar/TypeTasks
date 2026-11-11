import { addTask, advanceTask, deleteTask, filterByStatus, countByStatus, } from "./model.js";
const filters = ["all", "todo", "in-progress", "done"];
let tasks = [];
let currentFilter = "all";
const titleInput = document.getElementById("title");
const addButton = document.getElementById("add");
const chipsDiv = document.getElementById("chips");
const listUl = document.getElementById("list");
function drawChips() {
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
function drawList() {
    listUl.replaceChildren();
    const visible = currentFilter === "all" ? tasks : filterByStatus(tasks, currentFilter);
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
function render() {
    drawChips();
    drawList();
}
addButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    if (title === "")
        return;
    tasks = addTask(tasks, title);
    titleInput.value = "";
    render();
});
render();
