var buttonElement = document.querySelector("#save-task");
var tasksToDoElement = document.querySelector("#tasks-to-do");

var createTaskHandler = function () {
   var listItemElement = document.createElement("li");
   listItemElement.className = "task-item";
   listItemElement.textContent = "This is a New Task.";
   tasksToDoElement.appendChild(listItemElement);
};

buttonElement.addEventListener("click", createTaskHandler);
