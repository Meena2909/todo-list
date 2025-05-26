// Load tasks from localStorage on page load
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTask(task.text, task.completed));
};

// Add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTask(taskText, false);
  saveTask(taskText, false);
  taskInput.value = "";
}

// Create task element and add to the list
function createTask(taskText, isCompleted) {
  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;
  checkbox.onchange = () => toggleTask(taskText, checkbox.checked);

  const span = document.createElement("span");
  span.textContent = taskText;
  if (isCompleted) span.style.textDecoration = "line-through";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.onclick = () => {
    li.remove();
    deleteTask(taskText);
  };

  checkbox.onchange = () => {
    span.style.textDecoration = checkbox.checked ? "line-through" : "none";
    updateTask(taskText, checkbox.checked);
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save a task to localStorage
function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task completed status
function updateTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.map(task =>
    task.text === text ? { ...task, completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Delete a task
function deleteTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}