// ─────────────────────────────────────────────
// 1. INTERFACE — بنعرف شكل الـ Object قبل ما نعمله
//    زي إنك بتحدد "عقد" لازم كل task يلتزم بيه
// ─────────────────────────────────────────────
interface Task {
    id: number;          // رقم فريد لكل task
    text: string;        // نص الـ task
    completed: boolean;  // هل اتعملت ولا لأ؟
}


// ─────────────────────────────────────────────
// 2. TYPE ALIAS — بنعمل اسم جديد لنوع محدد
//    بدل ما نكتب 'all' | 'active' | 'completed' في كل مكان
//    نعملها type واحد ونستخدمها في أي حتة
// ─────────────────────────────────────────────
type FilterType = 'all' | 'active' | 'completed';
//                 ↑ union type: يعني القيمة لازم تكون واحدة من دول بس


// ─────────────────────────────────────────────
// 3. TYPE ASSERTION — بنقول لـ TypeScript
//    "أنا عارف نوع العنصر ده أكتر منك"
//    HTMLElement عام جداً، فبنحوله لنوع أدق
// ─────────────────────────────────────────────
const taskInput = document.getElementById('task-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
const taskList = document.getElementById('task-list') as HTMLUListElement;
const emptyMsg = document.getElementById('empty-msg') as HTMLElement;
const errorMsg = document.getElementById('error-msg') as HTMLElement;
const statsBar = document.getElementById('stats-bar') as HTMLElement;
const statsText = document.getElementById('stats-text') as HTMLElement;
const clearBtn = document.getElementById('clear-completed-btn') as HTMLButtonElement;


// ─────────────────────────────────────────────
// 4. TYPED VARIABLES
//    بنحدد نوع المتغير صراحةً
//    : string        → نص
//    : Task[]        → array من الـ Task interface اللي عرفناه فوق
//    : FilterType    → اللي عرفناه بـ type alias فوق
// ─────────────────────────────────────────────
const localStorageKey: string = 'Task Manager';
let tasks: Task[] = [];       // array of Task objects
let filter: FilterType = 'all';   // لازم تكون all أو active أو completed


// ─────────────────────────────────────────────
// 5. RETURN TYPE: void
//    الـ function مش بترجع أي قيمة
//    زي void في C#
// ─────────────────────────────────────────────
function loadTasks(): void {
    try {
        // JSON.parse بيرجع any، بس إحنا بنقوله بـ (as Task[]) إن النوع Task[]
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


// ─────────────────────────────────────────────
// 6. PARAMETER TYPES
//    بنحدد نوع كل parameter في الـ function
//    هنا: text بتاخد string بس
// ─────────────────────────────────────────────
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

    // بنبني object من نوع Task — لو نسينا field هيقولك TypeScript error
    const newTask: Task = {
        id: Date.now(),    // number
        text,              // shorthand: زي text: text
        completed: false,  // boolean
    };

    tasks.push(newTask);
    saveTasks();
    taskInput.value = '';
    taskInput.classList.remove('error');
    errorMsg.textContent = '';
    render();
}


// ─────────────────────────────────────────────
// 7. PARAMETER TYPE: number
//    id لازم يكون number مش أي حاجة تانية
// ─────────────────────────────────────────────
function deleteTask(id: number): void {
    // t هنا TypeScript بيعرف تلقائياً إنه Task (من الـ tasks: Task[])
    tasks = tasks.filter((t: Task) => t.id !== id);
    saveTasks();
    render();
}

function toggleTask(id: number): void {
    // .find بيرجع Task | undefined — عشان كده بنتحقق بـ if
    const t: Task | undefined = tasks.find((t: Task) => t.id === id);
    if (t) {
        t.completed = !t.completed;
        saveTasks();
        render();
    }
}


// ─────────────────────────────────────────────
// 8. MULTIPLE PARAMETER TYPES
//    id: number  و  li: HTMLLIElement
// ─────────────────────────────────────────────
function startEdit(id: number, li: HTMLLIElement): void {
    const t: Task | undefined = tasks.find((t: Task) => t.id === id);
    if (!t) return;

    // querySelector بيرجع Element | null — بنستخدم as عشان نحدد النوع
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
        if (val) t!.text = val;  // ! (non-null assertion): بقولوله "مش null وأنا ضامن"
        saveTasks();
        render();
    }

    // e بيكون KeyboardEvent تلقائياً في addEventListener('keydown')
    editInput.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter') saveEdit();
        if (e.key === 'Escape') render();
    });

    editInput.addEventListener('blur', saveEdit);
}


// ─────────────────────────────────────────────
// 9. RETURN TYPE: Task[]
//    الـ function دي بترجع array من Task
// ─────────────────────────────────────────────
function getFiltered(): Task[] {
    if (filter === 'active') return tasks.filter((t: Task) => !t.completed);
    if (filter === 'completed') return tasks.filter((t: Task) => t.completed);
    return tasks;
}


// ─────────────────────────────────────────────
// 10. EVENT TYPE: MouseEvent
//     كل event لها type في TypeScript
//     MouseEvent, KeyboardEvent, InputEvent, ...
// ─────────────────────────────────────────────
clearBtn.addEventListener('click', (_e: MouseEvent) => {
    // _ قبل الاسم معناها "مش هستخدم الـ parameter ده" — TypeScript بيقبل ده
    tasks = tasks.filter((t: Task) => !t.completed);
    saveTasks();
    render();
});


function render(): void {
    const filtered: Task[] = getFiltered();
    const totalDone: number = tasks.filter((t: Task) => t.completed).length;
    const totalLeft: number = tasks.filter((t: Task) => !t.completed).length;

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
        // بنحدد نوع الـ element اللي بنعمله صراحةً
        const li: HTMLLIElement = document.createElement('li');
        li.className = 'task-item' + (t.completed ? ' completed' : '');
        li.dataset.id = String(t.id);  // dataset بياخد string بس، فبنحول الـ number

        const cb: HTMLInputElement = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = t.completed;
        cb.addEventListener('change', () => toggleTask(t.id));

        const span: HTMLSpanElement = document.createElement('span');
        span.className = 'task-text';
        span.textContent = t.text;
        span.title = 'Double-click to edit';
        span.addEventListener('dblclick', () => startEdit(t.id, li));

        const del: HTMLButtonElement = document.createElement('button');
        del.className = 'delete-btn';
        del.textContent = 'Delete';
        del.addEventListener('click', () => deleteTask(t.id));

        li.appendChild(cb);
        li.appendChild(span);
        li.appendChild(del);
        taskList.appendChild(li);
    });
}


// ─────────────────────────────────────────────
// Events
// ─────────────────────────────────────────────
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') addTask();
});

document.querySelectorAll('.filter-btn').forEach((btn: Element) => {
    btn.addEventListener('click', () => {
        // getAttribute بيرجع string | null — بنستخدم ?? عشان نضمن قيمة افتراضية
        filter = (btn.getAttribute('data-filter') ?? 'all') as FilterType;

        document.querySelectorAll('.filter-btn').forEach((b: Element) =>
            b.classList.remove('active')
        );
        btn.classList.add('active');
        render();
    });
});


// ─────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────
loadTasks();
render();


// ============================================================
//  ملخص الـ TypeScript Concepts اللي اتعلمتها هنا:
//
//  1. interface       → تعريف شكل الـ Object
//  2. type alias      → اسم بديل لنوع (خصوصاً Union Types)
//  3. type assertion  → as HTMLInputElement
//  4. typed variables → let x: string = ...
//  5. void            → return type لـ function مش بترجع حاجة
//  6. param types     → function foo(id: number): void
//  7. T | undefined   → نوع ممكن يكون undefined
//  8. T[]             → array من نوع T
//  9. non-null (!)    → t!.text  (أنا ضامن مش null)
// 10. Event types     → KeyboardEvent / MouseEvent
// ============================================================