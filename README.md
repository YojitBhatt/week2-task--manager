Interactive Task Manager

A responsive and interactive Task Manager web application built using HTML, CSS, and JavaScript as part of Week 2 JavaScript Fundamentals.

The application allows users to create, manage, search, filter, and organize tasks while automatically saving data in the browser using LocalStorage.

🚀 Features
✅ Add new tasks
✏️ Edit existing tasks
🗑️ Delete tasks
✔️ Mark tasks as completed
🔍 Search tasks
📌 Filter tasks:
All
Active
Completed
⭐ Task priority:
High
Medium
Low
📅 Set due dates
📊 Task statistics
Total tasks
Active tasks
Completed tasks
🧹 Clear all completed tasks
💾 Automatic data persistence using LocalStorage
🌙 Dark/Light mode
📤 Export tasks as JSON
📥 Import tasks from JSON backup
🎯 Drag-and-drop task organization
⌨️ Keyboard shortcuts
📱 Responsive design
⚠️ Form validation
🔔 User notifications
✨ Dynamic DOM updates
🛠️ Technologies Used
Technology	Purpose
HTML5	Page structure
CSS3	Styling and responsive design
JavaScript	Application logic and interactivity
DOM API	Dynamic webpage manipulation
LocalStorage	Saving tasks and theme
JSON	Import/export task data
📁 Project Structure
week2-task-manager/
│
├── index.html
│
├── css/
│   ├── style.css
│   └── theme.css
│
├── js/
│   ├── app.js
│   ├── storage.js
│   ├── ui.js
│   └── utils.js
│
├── README.md
│
└── .gitignore
🧠 JavaScript Concepts Used

This project demonstrates several important JavaScript concepts:

Variables
const STORAGE_KEY = "taskManagerTasks";
let currentFilter = "all";
Functions

Functions are used to divide the application into reusable components.

function saveTasks(tasks) {
    localStorage.setItem(
        "taskManagerTasks",
        JSON.stringify(tasks)
    );
}
Arrays

Tasks are stored inside an array.

const tasks = [];
Objects

Each task is represented as a JavaScript object.

{
    id: "12345",
    text: "Complete JavaScript project",
    completed: false,
    priority: "high",
    dueDate: "2026-09-10"
}
DOM Manipulation

JavaScript dynamically creates and updates task elements.

document.createElement("li");
Event Handling

The application responds to user actions such as:

Button clicks
Form submission
Checkbox changes
Keyboard input
Drag and drop
LocalStorage

Tasks remain available even after refreshing the browser.

localStorage.setItem(
    "taskManagerTasks",
    JSON.stringify(tasks)
);
💾 LocalStorage

The application uses browser LocalStorage to store:

taskManagerTasks

and:

taskManagerTheme

This means tasks are preserved after:

Page refresh
Browser restart
Closing and reopening the application

Note: LocalStorage is browser-specific. Clearing browser site data can remove saved tasks.

🔄 Application Workflow
User
  ↓
Enter Task
  ↓
Validation
  ↓
Create Task Object
  ↓
Add to Task Array
  ↓
Save to LocalStorage
  ↓
Update DOM
  ↓
Display Updated Statistics
🔍 Search and Filtering

Users can search tasks using keywords.

Example:

Search: JavaScript

The application displays only tasks containing the searched text.

Tasks can also be filtered using:

All → Active → Completed
⭐ Priority System

Each task can have one of three priority levels:

High
Medium
Low

Priority helps users identify which tasks require more attention.

📅 Due Dates

Users can assign a due date to a task.

The application can identify overdue tasks and visually indicate them to the user.

🌙 Dark Mode

The application includes a Dark/Light mode.

The selected theme is stored in LocalStorage so that the user's preference can persist after refreshing the page.

📤 Export and Import
Export

Users can export their tasks as a JSON file for backup.

Example:

[
    {
        "id": "12345",
        "text": "Learn JavaScript",
        "completed": false,
        "priority": "high",
        "dueDate": "2026-09-10"
    }
]
Import

The exported JSON file can later be imported to restore tasks.

⌨️ Keyboard Shortcuts

The project supports keyboard-based interaction for faster task management.

Example shortcuts can include:

Shortcut	Action
/	Focus search
Ctrl + K	Focus search
Escape	Cancel editing
📱 Responsive Design

The interface is designed to work across:

💻 Desktop
💻 Laptop
📱 Mobile
📱 Tablet

CSS media queries are used to adjust the layout for smaller screens.

🧪 Validation

The application validates task input before adding it.

Examples of invalid input:

Empty task
Task shorter than 2 characters
Task longer than 150 characters

The user receives an appropriate error message instead of an invalid task being added.

🧪 Testing
Test Case	Expected Result
Add valid task	Task appears in list
Add empty task	Validation error
Edit task	Task text updates
Delete task	Task is removed
Complete task	Task becomes completed
Search task	Matching tasks displayed
Filter Active	Only active tasks displayed
Filter Completed	Only completed tasks displayed
Refresh page	Tasks remain available
Toggle dark mode	Theme changes
Export tasks	JSON file downloaded
Import tasks	Tasks restored
Clear completed	Completed tasks removed
▶️ How to Run
Method 1 — VS Code Live Server
Open the project in VS Code.
Install the Live Server extension.
Open index.html.
Right-click the file.
Select Open with Live Server.

The application will open in your browser.

Method 2 — Direct Browser

You can also open:

index.html

directly in a browser.

However, Live Server is recommended for development because it avoids many issues associated with file:// URLs.

⚠️ Troubleshooting

If you see:

ReferenceError: renderTasks is not defined

check that:

js/ui.js

exists.

If you see:

ReferenceError: validateTaskText is not defined

check that:

js/utils.js

exists.

The JavaScript files should be loaded in this order:

<script src="./js/utils.js"></script>
<script src="./js/storage.js"></script>
<script src="./js/ui.js"></script>
<script src="./js/app.js"></script>

Also make sure the files aren't accidentally saved as:

ui.js.txt
utils.js.txt
🎯 Learning Objectives

Through this project, the following JavaScript concepts are practiced:

JavaScript syntax
Variables and data types
Functions
Arrays
Objects
Conditional statements
Loops
DOM manipulation
Event listeners
Form validation
LocalStorage
JSON
Error handling
Dynamic UI updates
Responsive web development
🔮 Future Enhancements

Possible future improvements include:

🔐 User authentication
☁️ Cloud database synchronization
👥 Multi-user task management
🔔 Browser notifications
📈 Advanced productivity analytics
🗓️ Calendar integration
🔄 Automatic cloud backup
🤖 AI-powered task suggestions
📱 Progressive Web App (PWA)
🎨 Custom themes
👨‍💻 Author

Yojit Bhatt

B.Tech Computer Science & Engineering
IILM University

📌 Project Status
🚧 Week 2 JavaScript Project

The project demonstrates practical implementation of JavaScript fundamentals through a fully interactive Task Manager application.
