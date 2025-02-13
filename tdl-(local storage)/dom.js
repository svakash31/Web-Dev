// Define UI Variables
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#search");

// Load all event listeners
loadAllEventListeners();

function loadAllEventListeners() {
    document.addEventListener("DOMContentLoaded", getTasks);
    form.addEventListener("submit", handleTask);
    taskList.addEventListener("click", removeTask);
    taskList.addEventListener("click", editTask);
    clearBtn.addEventListener("click", clearTask);
    filter.addEventListener("input", filterTasks);
}

function getTasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(taskValue){
        createTaskElement(taskValue);
    });
}

function createTaskElement(taskValue) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.innerText = taskValue;
    
    const editLink = document.createElement("a");
    editLink.className = "edit-item secondary-content";
    editLink.innerHTML = `<i class="fa fa-pencil edit" aria-hidden="true"></i>`;
    
    const deleteLink = document.createElement("a");
    deleteLink.className = "delete-item secondary-content test";
    deleteLink.innerHTML = `<i class="fa fa-remove"></i>`;
    
    li.appendChild(deleteLink);
    li.appendChild(editLink);
    
    taskList.appendChild(li);
}

function storeTaskInLocalStorage(taskValue){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(taskValue);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function handleTask(e) {
    e.preventDefault();
    if (taskInput.value === "") {
        alert("Please enter a task");
    } else {
        if (taskInput.dataset.editing === "true") {
            updateTask(taskInput.value);
            taskInput.dataset.editing = "false";
        } else {
            createTaskElement(taskInput.value);
            storeTaskInLocalStorage(taskInput.value);
        }
        taskInput.value = "";
    }
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure?")) {
            let taskElement = e.target.parentElement.parentElement;
            taskElement.remove();
            removeTaskFromLocalStorage(taskElement.innerText.trim());
        }
    }
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editTask(e) {
    if (e.target.classList.contains("edit")) {
        let li = e.target.closest("li");
        let currentText = li.firstChild.textContent.trim();
        taskInput.value = currentText;
        taskInput.dataset.editing = "true";
        taskInput.dataset.taskId = currentText;
        document.querySelector("#submit-btn").textContent = "Update Task";
    }
}

function updateTask(updatedText) {
    let taskId = taskInput.dataset.taskId;
    let li = Array.from(taskList.children).find((li) => li.innerText.trim() === taskId);
    if (li) {
        li.firstChild.textContent = updatedText;
    }
    updateTaskInLocalStorage(taskId, updatedText);
    document.querySelector("#submit-btn").textContent = "Add Task";
}

function updateTaskInLocalStorage(oldTask, updatedTask) {
    let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    tasks = tasks.map(task => task === oldTask ? updatedTask : task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTask() {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function (li) {
        const item = li.innerText;
        li.style.display = item.toLowerCase().indexOf(text) !== -1 ? "block" : "none";
    });
}
