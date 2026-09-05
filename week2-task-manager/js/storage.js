
/* =========================================================
   STORAGE.JS
   Handles LocalStorage operations
   ========================================================= */

const STORAGE_KEY = "taskManagerTasks";
const THEME_KEY = "taskManagerTheme";

/* Save tasks */
function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/* Load tasks */
function loadTasks() {
    try {
        const storedTasks = localStorage.getItem(STORAGE_KEY);

        if (!storedTasks) {
            return [];
        }

        const tasks = JSON.parse(storedTasks);

        return Array.isArray(tasks) ? tasks : [];

    } catch (error) {
        console.error("Error loading tasks:", error);
        return [];
    }
}

/* Delete all saved tasks */
function clearStoredTasks() {
    localStorage.removeItem(STORAGE_KEY);
}

/* Save theme */
function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}

/* Load theme */
function loadTheme() {
    return localStorage.getItem(THEME_KEY);
}

