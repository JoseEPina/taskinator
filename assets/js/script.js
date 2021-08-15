var formElement = document.querySelector("#task-form");
var tasksToDoElement = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {
   event.preventDefault();

   var taskNameInput = document.querySelector("input[name='task-name']").value;
   var taskTypeInput = document.querySelector("select[name='task-type']").value;

   // Create list item
   var listItemElement = document.createElement("li");
   // Give it a class name
   listItemElement.className = "task-item";

   // Create div item to hold task info and add to list item
   var taskInfoElement = document.createElement("div");
   // Give it a class name
   taskInfoElement.className = "task-info";

   // Add HTML content to div item
   taskInfoElement.innerHTML =
      "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

   listItemElement.appendChild(taskInfoElement);

   // Add entire list item to list
   tasksToDoElement.appendChild(listItemElement);
   console.dir(listItemElement);
};

formElement.addEventListener("submit", createTaskHandler);
