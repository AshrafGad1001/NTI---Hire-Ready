"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-desc");
const dateInput = document.getElementById("task-date");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const emptyMsg = document.getElementById("empty-msg");
const errorMsg = document.getElementById("error-msg");
const statsBar = document.getElementById("stats-bar");
const statsText = document.getElementById("stats-text");
const clearBtn = document.getElementById("clear-completed-btn");
const STORAGE_KEY = "TaskManagerTS";
let tasks = [];
let filter = "all";
function loadTasks() {
    try {
        tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    }
    catch {
        tasks = [];
    }
}
function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
    catch { }
}
function addTask() {
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const date = dateInput.value;
    if (!title) {
        showError("Please enter a task title.");
        titleInput.focus();
        return;
    }
    const newTask = {
        id: Date.now(),
        title,
        description,
        date,
        status: "pending",
    };
    tasks.push(newTask);
    saveTasks();
    titleInput.value = "";
    descInput.value = "";
    dateInput.value = "";
    clearError();
    render();
}
function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    render();
}
function toggleTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task)
        return;
    task.status =
        task.status === "completed"
            ? "pending"
            : "completed";
    saveTasks();
    render();
}
function startEdit(id, li) {
    const task = tasks.find((t) => t.id === id);
    if (!task)
        return;
    const titleSpan = li.querySelector(".task-title");
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "task-edit-input";
    editInput.value = task.title;
    titleSpan.replaceWith(editInput);
    editInput.focus();
    editInput.select();
    const save = () => {
        const val = editInput.value.trim();
        if (val) {
            task.title = val;
        }
        saveTasks();
        render();
    };
    editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            save();
        }
        if (e.key === "Escape") {
            render();
        }
    });
    editInput.addEventListener("blur", save);
}
function getFiltered() {
    if (filter === "active") {
        return tasks.filter((t) => t.status === "pending");
    }
    if (filter === "completed") {
        return tasks.filter((t) => t.status === "completed");
    }
    return tasks;
}
function showError(msg) {
    errorMsg.textContent = msg;
    titleInput.classList.add("error");
    setTimeout(() => {
        clearError();
    }, 2500);
}
function clearError() {
    errorMsg.textContent = "";
    titleInput.classList.remove("error");
}
function formatDate(isoString) {
    if (!isoString) {
        return "";
    }
    const d = new Date(isoString);
    return d.toLocaleString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
function render() {
    const filtered = getFiltered();
    const totalDone = tasks.filter((t) => t.status === "completed").length;
    const totalLeft = tasks.filter((t) => t.status === "pending").length;
    taskList.innerHTML = "";
    emptyMsg.style.display =
        tasks.length === 0
            ? "block"
            : "none";
    if (tasks.length > 0) {
        statsBar.style.display = "flex";
        statsText.textContent =
            `${totalLeft} task${totalLeft !== 1 ? "s" : ""} left · ${totalDone} completed`;
    }
    else {
        statsBar.style.display = "none";
    }
    filtered.forEach((task) => {
        const li = document.createElement("li");
        li.className =
            "task-item" +
            (task.status === "completed"
                ? " completed"
                : "");
        li.dataset["id"] = String(task.id);
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = task.status === "completed";
        cb.addEventListener("change", () => {
            toggleTask(task.id);
        });
        const content = document.createElement("div");
        content.className = "task-content";
        const titleSpan = document.createElement("span");
        titleSpan.className = "task-title";
        titleSpan.textContent = task.title;
        titleSpan.title = "Double-click to edit";
        titleSpan.addEventListener("dblclick", () => {
            startEdit(task.id, li);
        });
        const descSpan = document.createElement("span");
        descSpan.className = "task-desc";
        descSpan.textContent = task.description || "";
        const meta = document.createElement("div");
        meta.className = "task-meta";
        if (task.date) {
            const dateEl = document.createElement("span");
            dateEl.className = "task-date";
            dateEl.textContent = "📅 " + formatDate(task.date);
            meta.appendChild(dateEl);
        }
        const badge = document.createElement("span");
        badge.className = "task-badge " + task.status;
        badge.textContent =
            task.status === "completed"
                ? "✅ Completed"
                : "⏳ Pending";
        meta.appendChild(badge);
        content.appendChild(titleSpan);
        if (task.description) {
            content.appendChild(descSpan);
        }
        content.appendChild(meta);
        const del = document.createElement("button");
        del.className = "delete-btn";
        del.textContent = "Delete";
        del.addEventListener("click", () => {
            deleteTask(task.id);
        });
        li.appendChild(cb);
        li.appendChild(content);
        li.appendChild(del);
        taskList.appendChild(li);
    });
}
addBtn.addEventListener("click", addTask);
titleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});
clearBtn.addEventListener("click", () => {
    tasks = tasks.filter((t) => t.status !== "completed");
    saveTasks();
    render();
});
document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => {
        btn.addEventListener("click", () => {
            filter = btn.dataset["filter"];
            document
                .querySelectorAll(".filter-btn")
                .forEach((b) => {
                    b.classList.remove("active");
                });
            btn.classList.add("active");
            render();
        });
    });
loadTasks();
render();
//# sourceMappingURL=index.js.map