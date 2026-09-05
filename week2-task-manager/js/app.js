
/* =========================================================
   APP.JS
   Main Task Manager Application
   ========================================================= */


/* =========================================================
   TASK MANAGER CLASS
   ========================================================= */

class TaskManager {

    constructor() {

        this.tasks = loadTasks();

        this.currentFilter = "all";

        this.searchQuery = "";

        this.editingTaskId = null;

        this.init();
    }


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    init() {

        this.setupEventListeners();

        this.loadSavedTheme();

        this.render();

        this.setMinimumDate();
    }


    /* =====================================================
       EVENT LISTENERS
       ===================================================== */

    setupEventListeners() {

        /* Add task */
        document
            .getElementById("taskForm")
            .addEventListener(
                "submit",
                event => this.handleFormSubmit(event)
            );


        /* Task actions */
        document
            .getElementById("taskList")
            .addEventListener(
                "click",
                event => this.handleTaskClick(event)
            );


        /* Checkbox */
        document
            .getElementById("taskList")
            .addEventListener(
                "change",
                event => this.handleCheckboxChange(event)
            );


        /* Filters */

        document
            .getElementById("filterButtons")
            .addEventListener(
                "click",
                event => {

                    const button =
                        event.target.closest(".filter-btn");

                    if (!button) return;

                    this.currentFilter =
                        button.dataset.filter;

                    updateFilterButtons(
                        this.currentFilter
                    );

                    this.render();
                }
            );


        /* Search */

        document
            .getElementById("searchInput")
            .addEventListener(
                "input",
                event => {

                    this.searchQuery =
                        event.target.value
                            .trim()
                            .toLowerCase();

                    this.render();
                }
            );


        /* Clear completed */

        document
            .getElementById("clearCompleted")
            .addEventListener(
                "click",
                () => this.clearCompleted()
            );


        /* Theme */

        document
            .getElementById("themeToggle")
            .addEventListener(
                "click",
                () => this.toggleTheme()
            );


        /* Export */

        document
            .getElementById("exportTasks")
            .addEventListener(
                "click",
                () => this.exportTasks()
            );


        /* Import button */

        document
            .getElementById("importTasksBtn")
            .addEventListener(
                "click",
                () => {

                    document
                        .getElementById("importTasks")
                        .click();
                }
            );


        /* Import file */

        document
            .getElementById("importTasks")
            .addEventListener(
                "change",
                event => this.importTasks(event)
            );


        /* Keyboard shortcuts */

        document.addEventListener(
            "keydown",
            event => this.handleKeyboard(event)
        );


        /* Drag and drop */

        this.setupDragAndDrop();
    }


    /* =====================================================
       ADD / EDIT TASK
       ===================================================== */

    handleFormSubmit(event) {

        event.preventDefault();

        const input =
            document.getElementById("taskInput");

        const priority =
            document.getElementById("priority");

        const dueDate =
            document.getElementById("dueDate");

        const text = input.value.trim();


        /* Validation */

        const error = validateTaskText(text);

        if (error) {

            showError(error);

            input.focus();

            return;
        }

        clearError();


        /* Edit existing task */

        if (this.editingTaskId) {

            this.updateTask(
                this.editingTaskId,
                text,
                priority.value,
                dueDate.value
            );

        } else {

            this.addTask(
                text,
                priority.value,
                dueDate.value
            );
        }


        /* Reset form */

        input.value = "";

        priority.value = "medium";

        dueDate.value = "";

        this.editingTaskId = null;

        document.getElementById(
            "addTaskBtn"
        ).textContent = "+ Add Task";
    }


    /* =====================================================
       ADD TASK
       ===================================================== */

    addTask(text, priority, dueDate) {

        const task = {

            id: generateId(),

            text: text,

            completed: false,

            createdAt:
                new Date().toISOString(),

            priority: priority,

            dueDate: dueDate || null
        };


        this.tasks.unshift(task);

        saveTasks(this.tasks);

        this.render();

        showNotification("Task added successfully!");
    }


    /* =====================================================
       UPDATE TASK
       ===================================================== */

    updateTask(id, text, priority, dueDate) {

        this.tasks =
            this.tasks.map(task => {

                if (String(task.id) === String(id)) {

                    return {

                        ...task,

                        text: text,

                        priority: priority,

                        dueDate: dueDate || null
                    };
                }

                return task;
            });


        saveTasks(this.tasks);

        this.render();

        showNotification("Task updated successfully!");
    }


    /* =====================================================
       DELETE TASK
       ===================================================== */

    deleteTask(id) {

        const confirmed =
            confirm("Are you sure you want to delete this task?");

        if (!confirmed) return;


        this.tasks =
            this.tasks.filter(
                task =>
                    String(task.id) !== String(id)
            );


        saveTasks(this.tasks);

        this.render();

        showNotification("Task deleted.");
    }


    /* =====================================================
       TOGGLE COMPLETE
       ===================================================== */

    toggleComplete(id) {

        this.tasks =
            this.tasks.map(task => {

                if (String(task.id) === String(id)) {

                    return {

                        ...task,

                        completed: !task.completed
                    };
                }

                return task;
            });


        saveTasks(this.tasks);

        this.render();
    }


    /* =====================================================
       EDIT TASK
       ===================================================== */

    startEditing(id) {

        const task =
            this.tasks.find(
                task =>
                    String(task.id) === String(id)
            );


        if (!task) return;


        document.getElementById(
            "taskInput"
        ).value = task.text;


        document.getElementById(
            "priority"
        ).value = task.priority;


        document.getElementById(
            "dueDate"
        ).value = task.dueDate || "";


        this.editingTaskId = id;


        document.getElementById(
            "addTaskBtn"
        ).textContent = "Update Task";


        document.getElementById(
            "taskInput"
        ).focus();


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =====================================================
       TASK CLICK HANDLER
       ===================================================== */

    handleTaskClick(event) {

        const button =
            event.target.closest("button");

        if (!button) return;


        const taskItem =
            event.target.closest(".task-item");

        if (!taskItem) return;


        const id = taskItem.dataset.id;


        if (button.dataset.action === "delete") {

            this.deleteTask(id);
        }


        if (button.dataset.action === "edit") {

            this.startEditing(id);
        }
    }


    /* =====================================================
       CHECKBOX HANDLER
       ===================================================== */

    handleCheckboxChange(event) {

        if (
            !event.target.classList.contains(
                "task-checkbox"
            )
        ) {
            return;
        }


        const taskItem =
            event.target.closest(".task-item");


        if (!taskItem) return;


        const id = taskItem.dataset.id;

        this.toggleComplete(id);
    }


    /* =====================================================
       FILTERING
       ===================================================== */

    getFilteredTasks() {

        let filteredTasks = [...this.tasks];


        /* Filter */

        if (this.currentFilter === "active") {

            filteredTasks =
                filteredTasks.filter(
                    task => !task.completed
                );
        }


        if (this.currentFilter === "completed") {

            filteredTasks =
                filteredTasks.filter(
                    task => task.completed
                );
        }


        /* Search */

        if (this.searchQuery) {

            filteredTasks =
                filteredTasks.filter(
                    task =>
                        task.text
                            .toLowerCase()
                            .includes(this.searchQuery)
                );
        }


        return filteredTasks;
    }


    /* =====================================================
       RENDER
       ===================================================== */

    render() {

        const filteredTasks =
            this.getFilteredTasks();


        renderTasks(filteredTasks);

        updateStats(this.tasks);
    }


    /* =====================================================
       CLEAR COMPLETED
       ===================================================== */

    clearCompleted() {

        const completedCount =
            this.tasks.filter(
                task => task.completed
            ).length;


        if (completedCount === 0) {

            showNotification(
                "There are no completed tasks."
            );

            return;
        }


        const confirmed =
            confirm(
                `Delete ${completedCount} completed task(s)?`
            );


        if (!confirmed) return;


        this.tasks =
            this.tasks.filter(
                task => !task.completed
            );


        saveTasks(this.tasks);

        this.render();

        showNotification(
            "Completed tasks cleared."
        );
    }


    /* =====================================================
       THEME
       ===================================================== */

    toggleTheme() {

        const isDark =
            document.body.classList.toggle(
                "dark-mode"
            );


        document.body.classList.toggle(
            "light-mode",
            !isDark
        );


        const theme =
            isDark ? "dark" : "light";


        saveTheme(theme);

        this.updateThemeButton(theme);
    }


    /* Load saved theme */

    loadSavedTheme() {

        const savedTheme = loadTheme();


        if (savedTheme === "dark") {

            document.body.classList.add(
                "dark-mode"
            );

            document.body.classList.remove(
                "light-mode"
            );

            this.updateThemeButton("dark");

        } else {

            document.body.classList.add(
                "light-mode"
            );

            document.body.classList.remove(
                "dark-mode"
            );

            this.updateThemeButton("light");
        }
    }


    /* Update theme icon */

    updateThemeButton(theme) {

        const button =
            document.getElementById(
                "themeToggle"
            );


        if (theme === "dark") {

            button.textContent = "☀️";

            button.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        } else {

            button.textContent = "🌙";

            button.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }
    }


    /* =====================================================
       EXPORT TASKS
       ===================================================== */

    exportTasks() {

        if (this.tasks.length === 0) {

            showNotification(
                "There are no tasks to export."
            );

            return;
        }


        downloadJSON(
            this.tasks,
            "task-manager-backup.json"
        );


        showNotification(
            "Tasks exported successfully!"
        );
    }


    /* =====================================================
       IMPORT TASKS
       ===================================================== */

    async importTasks(event) {

        const file = event.target.files[0];

        if (!file) return;


        try {

            const importedTasks =
                await readJSONFile(file);


            if (!Array.isArray(importedTasks)) {

                throw new Error(
                    "Invalid task data."
                );
            }


            const validTasks =
                importedTasks.filter(task =>
                    task &&
                    task.text &&
                    typeof task.text === "string"
                );


            if (validTasks.length === 0) {

                throw new Error(
                    "No valid tasks found."
                );
            }


            this.tasks = validTasks.map(task => ({

                id: task.id || generateId(),

                text: task.text.trim(),

                completed:
                    Boolean(task.completed),

                createdAt:
                    task.createdAt ||
                    new Date().toISOString(),

                priority:
                    ["low", "medium", "high"]
                        .includes(task.priority)
                        ? task.priority
                        : "medium",

                dueDate:
                    task.dueDate || null
            }));


            saveTasks(this.tasks);

            this.render();

            showNotification(
                "Tasks imported successfully!"
            );


        } catch (error) {

            alert(
                `Import failed: ${error.message}`
            );

        } finally {

            event.target.value = "";
        }
    }


    /* =====================================================
       KEYBOARD SHORTCUTS
       ===================================================== */

    handleKeyboard(event) {

        const activeElement =
            document.activeElement;


        /* "/" → Search */

        if (
            event.key === "/" &&
            activeElement.tagName !== "INPUT" &&
            activeElement.tagName !== "TEXTAREA"
        ) {

            event.preventDefault();

            document
                .getElementById("searchInput")
                .focus();
        }


        /* Ctrl + K → Task input */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            document
                .getElementById("taskInput")
                .focus();
        }


        /* Escape → Cancel editing */

        if (
            event.key === "Escape" &&
            this.editingTaskId
        ) {

            this.cancelEditing();
        }
    }


    /* Cancel editing */

    cancelEditing() {

        this.editingTaskId = null;

        document.getElementById(
            "taskForm"
        ).reset();


        document.getElementById(
            "priority"
        ).value = "medium";


        document.getElementById(
            "addTaskBtn"
        ).textContent = "+ Add Task";


        clearError();
    }


    /* =====================================================
       DATE
       ===================================================== */

    setMinimumDate() {

        const dueDate =
            document.getElementById(
                "dueDate"
            );


        dueDate.min = getTodayDate();
    }


    /* =====================================================
       DRAG & DROP
       ===================================================== */

    setupDragAndDrop() {

        const list =
            document.getElementById(
                "taskList"
            );


        let draggedId = null;


        list.addEventListener(
            "dragstart",
            event => {

                const task =
                    event.target.closest(
                        ".task-item"
                    );


                if (!task) return;


                draggedId =
                    task.dataset.id;


                task.classList.add(
                    "dragging"
                );
            }
        );


        list.addEventListener(
            "dragend",
            event => {

                const task =
                    event.target.closest(
                        ".task-item"
                    );


                if (!task) return;


                task.classList.remove(
                    "dragging"
                );
            }
        );


        list.addEventListener(
            "dragover",
            event => {

                event.preventDefault();


                const dragging =
                    list.querySelector(
                        ".dragging"
                    );


                const target =
                    event.target.closest(
                        ".task-item"
                    );


                if (
                    !dragging ||
                    !target ||
                    dragging === target
                ) {
                    return;
                }


                const rect =
                    target.getBoundingClientRect();


                const after =
                    event.clientY >
                    rect.top +
                    rect.height / 2;


                if (after) {

                    target.after(dragging);

                } else {

                    target.before(dragging);
                }
            }
        );


        list.addEventListener(
            "drop",
            event => {

                event.preventDefault();


                if (!draggedId) return;


                const orderedIds =
                    [...list.children]
                        .map(
                            item =>
                                String(
                                    item.dataset.id
                                )
                        );


                const taskMap =
                    new Map(
                        this.tasks.map(
                            task => [
                                String(task.id),
                                task
                            ]
                        )
                    );


                this.tasks =
                    orderedIds
                        .map(id =>
                            taskMap.get(id)
                        )
                        .filter(Boolean);


                saveTasks(this.tasks);

                this.render();

                draggedId = null;
            }
        );
    }
}


/* =========================================================
   START APPLICATION
   ========================================================= */

const taskManager =
    new TaskManager();

