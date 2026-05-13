console.log("A7aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

const taskInput = document.getElementById('task-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
const taskList = document.getElementById('task-list') as HTMLUListElement;
const emptyMsg = document.getElementById('empty-msg') as HTMLElement;
const errorMsg = document.getElementById('error-msg') as HTMLElement;
const statsBar = document.getElementById('stats-bar') as HTMLElement;
const statsText = document.getElementById('stats-text') as HTMLElement;
const clearBtn = document.getElementById('clear-completed-btn') as HTMLButtonElement;

const localStorageKey: string = 'Task Manager';
let tasks: Task[] = [];
let filter: FilterType = 'all';




function loadTasks(): void {
    try {
        tasks = JSON.parse(localStorage.getItem(localStorageKey) as string) as Task[] || [];
    } catch (e) {
        tasks = [];
        
    }
}

function saveTasks(): void {
    try {
        localStorage.setItem(localStorageKey, JSON.stringify(tasks));
    } catch (e) { }
}

function addTask(): void {
    const text: string = taskInput.value.trim();

    if (!text) {
        taskInput.classList.add('error');
        errorMsg.textContent = 'Please enter a task before adding.';
        taskInput.focus();

        setTimeout(() => {
            taskInput.classList.remove('error');
            errorMsg.textContent = '';
        }, 2500);

        return;
    }

    const newTask: Task = {
        id: Date.now(),
        text,
        completed: false,
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = '';
    taskInput.classList.remove('error');
    errorMsg.textContent = '';

    render();
}

function deleteTask(id: number): void {
    tasks = tasks.filter((t: Task) => t.id !== id);

    saveTasks();
    render();
}

function toggleTask(id: number): void {
    const t: Task | undefined = tasks.find((t: Task) => t.id === id);

    if (t) {
        t.completed = !t.completed;

        saveTasks();
        render();
    }
}

function startEdit(id: number, li: HTMLLIElement): void {
    const t: Task | undefined = tasks.find((t: Task) => t.id === id);

    if (!t) return;

    const span = li.querySelector('.task-text') as HTMLSpanElement;

    const editInput: HTMLInputElement = document.createElement('input');

    editInput.type = 'text';
    editInput.className = 'task-edit-input';
    editInput.value = t.text;

    span.replaceWith(editInput);

    editInput.focus();
    editInput.select();

    function saveEdit(): void {
        const val: string = editInput.value.trim();

        if (val) t!.text = val;

        saveTasks();
        render();
    }

    editInput.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter') saveEdit();

        if (e.key === 'Escape') render();
    });

    editInput.addEventListener('blur', saveEdit);
}

function getFiltered(): Task[] {
    if (filter === 'active') {
        return tasks.filter((t: Task) => !t.completed);
    }

    if (filter === 'completed') {
        return tasks.filter((t: Task) => t.completed);
    }

    return tasks;
}

clearBtn.addEventListener('click', (_e: MouseEvent) => {
    tasks = tasks.filter((t: Task) => !t.completed);

    saveTasks();
    render();
});

function render(): void {
    const filtered: Task[] = getFiltered();

    const totalDone: number =
        tasks.filter((t: Task) => t.completed).length;

    const totalLeft: number =
        tasks.filter((t: Task) => !t.completed).length;

    taskList.innerHTML = '';

    const isEmpty: boolean = tasks.length === 0;

    emptyMsg.style.display = isEmpty ? 'block' : 'none';

    if (tasks.length > 0) {
        statsBar.style.display = 'flex';

        statsText.textContent =
            `${totalLeft} task${totalLeft !== 1 ? 's' : ''} left · ${totalDone} completed`;

    } else {
        statsBar.style.display = 'none';
    }

    filtered.forEach((t: Task) => {
        const li: HTMLLIElement = document.createElement('li');

        li.className =
            'task-item' + (t.completed ? ' completed' : '');

        li.dataset.id = String(t.id);

        const cb: HTMLInputElement =
            document.createElement('input');

        cb.type = 'checkbox';
        cb.checked = t.completed;

        cb.addEventListener('change', () => toggleTask(t.id));

        const span: HTMLSpanElement =
            document.createElement('span');

        span.className = 'task-text';
        span.textContent = t.text;
        span.title = 'Double-click to edit';

        span.addEventListener('dblclick', () =>
            startEdit(t.id, li)
        );

        const del: HTMLButtonElement =
            document.createElement('button');

        del.className = 'delete-btn';
        del.textContent = 'Delete';

        del.addEventListener('click', () =>
            deleteTask(t.id)
        );

        li.appendChild(cb);
        li.appendChild(span);
        li.appendChild(del);

        taskList.appendChild(li);
    });
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') addTask();
});

document.querySelectorAll('.filter-btn').forEach((btn: Element) => {
    btn.addEventListener('click', () => {
        filter =
            (btn.getAttribute('data-filter') ?? 'all') as FilterType;

        document.querySelectorAll('.filter-btn').forEach(
            (b: Element) => b.classList.remove('active')
        );

        btn.classList.add('active');

        render();
    });
});

loadTasks();

render();