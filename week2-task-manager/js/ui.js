
/* =========================================================
   UI.JS
   Handles DOM rendering and UI updates
   ========================================================= */


/* Get elements */
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const totalTasks = document.getElementById("totalTasks");
const activeTasks = document.getElementById("activeTasks");
const completedTasks = document.getElementById("completedTasks");


/* Render tasks */
function renderTasks(tasks) {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        emptyState.style.display = "block";

        return;
    }

    emptyState.style.display = "none";


    tasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.dataset.id = task.id;

        li.draggable = true;


        /* Checkbox */
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;

        checkbox.setAttribute(
            "aria-label",
            `Mark ${task.text} as complete`
        );


        /* Task text */
        const text = document.createElement("span");

        text.className = "task-text";

        text.textContent = task.text;


        /* Meta container */
        const meta = document.createElement("div");

        meta.className = "task-meta";


        /* Priority */
        const priority = document.createElement("span");

        priority.className =
            `priority priority-${task.priority}`;

        priority.textContent = task.priority;


        /* Due date */
        if (task.dueDate) {

            const dueDate = document.createElement("span");

            dueDate.className = "due-date";

            dueDate.textContent =
                `📅 ${formatDate(task.dueDate)}`;

            if (isOverdue(task)) {

                dueDate.classList.add("overdue");

                dueDate.textContent =
                    `⚠ Overdue · ${formatDate(task.dueDate)}`;
            }

            meta.appendChild(dueDate);
        }


        meta.appendChild(priority);


        /* Edit button */
        const editButton = document.createElement("button");

        editButton.type = "button";

        editButton.className = "edit-btn";

        editButton.dataset.action = "edit";

        editButton.innerHTML = "✏️";

        editButton.setAttribute("aria-label", "Edit task");


        /* Delete button */
        const deleteButton = document.createElement("button");

        deleteButton.type = "button";

        deleteButton.className = "delete-btn";

        deleteButton.dataset.action = "delete";

        deleteButton.innerHTML = "🗑️";

        deleteButton.setAttribute("aria-label", "Delete task");


        /* Append elements */

        li.appendChild(checkbox);

        li.appendChild(text);

        li.appendChild(meta);

        li.appendChild(editButton);

        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}


/* Update statistics */
function updateStats(tasks) {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const active = total - completed;


    totalTasks.textContent = total;

    activeTasks.textContent = active;

    completedTasks.textContent = completed;
}


/* Show error */
function showError(message) {

    const errorElement =
        document.getElementById("taskError");

    errorElement.textContent = message;
}


/* Clear error */
function clearError() {

    const errorElement =
        document.getElementById("taskError");

    errorElement.textContent = "";
}


/* Update filter button */
function updateFilterButtons(currentFilter) {

    const buttons =
        document.querySelectorAll(".filter-btn");

    buttons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.filter === currentFilter
        );
    });
}


/* Show notification */
function showNotification(message) {

    let notification =
        document.getElementById("notification");


    if (!notification) {

        notification =
            document.createElement("div");

        notification.id = "notification";

        notification.style.position = "fixed";
        notification.style.bottom = "25px";
        notification.style.right = "25px";
        notification.style.padding = "12px 18px";
        notification.style.borderRadius = "8px";
        notification.style.background = "#2563eb";
        notification.style.color = "white";
        notification.style.fontWeight = "600";
        notification.style.zIndex = "1000";
        notification.style.boxShadow =
            "0 5px 20px rgba(0,0,0,0.2)";

        document.body.appendChild(notification);
    }


    notification.textContent = message;

    notification.style.display = "block";


    setTimeout(() => {

        notification.style.display = "none";

    }, 2000);
}


