var formElement = document.querySelector("#task-form");
var tasksToDoElement = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {
   event.preventDefault();
   var taskNameInput = document.querySelector("input[name='task-name']").value;
   var taskTypeInput = document.querySelector("select[name='task-type']").value;

   // Package up date as an object
   var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
   };

   // Send it as an argument to createTaskElement
   createTaskElement(taskDataObj);
};

var createTaskElement = function (taskDataObj) {
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
      "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

   listItemElement.appendChild(taskInfoElement);

   // Add entire list item to list
   tasksToDoElement.appendChild(listItemElement);
};

formElement.addEventListener("submit", taskFormHandler);
