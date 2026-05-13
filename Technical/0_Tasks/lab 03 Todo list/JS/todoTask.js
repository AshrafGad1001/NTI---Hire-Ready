const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const emptyMsg = document.getElementById('empty-msg');
const errorMsg = document.getElementById('error-msg');
const statsBar = document.getElementById('stats-bar');
const statsText = document.getElementById('stats-text');
const clearBtn = document.getElementById('clear-completed-btn');






const localStorsgeKey = 'Task Manager';

let tasks = [];
let filter = 'all';


function loadTasks() {
    try { tasks = JSON.parse(localStorage.getItem(localStorsgeKey)) || []; }
    catch (e) { tasks = []; }
}

function saveTasks() {
    try { localStorage.setItem(localStorsgeKey, JSON.stringify(tasks)); }
    catch (e) { }
}



function addTask() {
    const text = taskInput.value.trim();

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

    tasks.push({ id: Date.now(), text, completed: false });
    saveTasks();
    taskInput.value = '';
    taskInput.classList.remove('error');
    errorMsg.textContent = '';
    render();
}


function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();
}


function toggleTask(id) {
    const t = tasks.find(t => t.id === id);
    if (t) { t.completed = !t.completed; saveTasks(); render(); }
}


function startEdit(id, li) {
    const t = tasks.find(t => t.id === id);
    if (!t) return;

    const span = li.querySelector('.task-text');
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'task-edit-input';
    editInput.value = t.text;
    span.replaceWith(editInput);
    editInput.focus();
    editInput.select();

    function saveEdit() {
        const val = editInput.value.trim();
        if (val) t.text = val;
        saveTasks();
        render();
    }

    editInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') saveEdit();
        if (e.key === 'Escape') render();
    });
    editInput.addEventListener('blur', saveEdit);
}


function getFiltered() {
    if (filter === 'active') return tasks.filter(t => !t.completed);
    if (filter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
}


clearBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    render();
});


function render() {
    const filtered = getFiltered();
    const totalDone = tasks.filter(t => t.completed).length;
    const totalLeft = tasks.filter(t => !t.completed).length;

    taskList.innerHTML = '';


    const isEmpty = tasks.length === 0;
    emptyMsg.style.display = isEmpty ? 'block' : 'none';


    if (tasks.length > 0) {
        statsBar.style.display = 'flex';
        statsText.textContent = `${totalLeft} task${totalLeft !== 1 ? 's' : ''} left · ${totalDone} completed`;
    } else {
        statsBar.style.display = 'none';
    }


    filtered.forEach(t => {
        const li = document.createElement('li');
        li.className = 'task-item' + (t.completed ? ' completed' : '');
        li.dataset.id = t.id;


        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = t.completed;
        cb.addEventListener('change', () => toggleTask(t.id));


        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = t.text;
        span.title = 'Double-click to edit';
        span.addEventListener('dblclick', () => startEdit(t.id, li));


        const del = document.createElement('button');
        del.className = 'delete-btn';
        del.textContent = 'Delete';
        del.addEventListener('click', () => deleteTask(t.id));

        li.appendChild(cb);
        li.appendChild(span);
        li.appendChild(del);
        taskList.appendChild(li);
    });
}


addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        filter = btn.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render();
    });
});


loadTasks();
render();