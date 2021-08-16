var taskIdCounter = 0;
var formElement = document.querySelector("#task-form");
var tasksToDoElement = document.querySelector("#tasks-to-do");
var pageContentElement = document.querySelector("#page-content");

var editTask = function (taskId) {
   console.log("Editing task #" + taskId);
   formElement.setAttribute("data-task-id", taskId);

   // Get task list item element
   var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

   // Get content from task name and type
   var taskName = taskSelected.querySelector("h3.task-name").textContent;
   document.querySelector("input[name='task-name']").value = taskName;
   var taskType = taskSelected.querySelector("span.task-type").textContent;
   document.querySelector("select[name='task-type']").value = taskType;

   document.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function (taskId) {
   var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
   taskSelected.remove();
};

var taskButtonHandler = function (event) {
   // Get target element from event
   var targetElement = event.target;
   var taskId = targetElement.getAttribute("data-task-id"); //**

   // Edit button was clicked
   if (targetElement.matches(".edit-btn")) {
      // Get the element's task ID
      editTask(taskId);
   }
   // Delete button was clicked
   else if (targetElement.matches(".delete-btn")) {
      // Get the element's task ID
      deleteTask(taskId);
   }
};

var createTaskActions = function (taskId) {
   var actionContainerElement = document.createElement("div");
   actionContainerElement.className = "task-actions";

   // Create EDIT button
   var editButtonElement = document.createElement("button");
   editButtonElement.textContent = "Edit";
   editButtonElement.className = "btn edit-btn";
   editButtonElement.setAttribute("data-task-id", taskId);

   actionContainerElement.appendChild(editButtonElement);

   // Create DELETE button
   var deleteButtonElement = document.createElement("button");
   deleteButtonElement.textContent = "Delete";
   deleteButtonElement.className = "btn delete-btn";
   deleteButtonElement.setAttribute("data-task-id", taskId);

   actionContainerElement.appendChild(deleteButtonElement);

   var statusSelectElement = document.createElement("select");
   statusSelectElement.className = "select-status";
   statusSelectElement.setAttribute("name", "status-change");
   statusSelectElement.setAttribute("data-task-id", taskId);

   actionContainerElement.appendChild(statusSelectElement);

   var statusChoices = ["To Do", "In Progress", "Completed"];

   for (var i = 0; i < statusChoices.length; i++) {
      // Create option element
      var statusOptionElement = document.createElement("option");
      statusOptionElement.setAttribute("value", statusChoices[i]);
      statusOptionElement.textContent = statusChoices[i];

      // Append to select
      statusSelectElement.appendChild(statusOptionElement);
   }
   return actionContainerElement;
};

var taskFormHandler = function (event) {
   event.preventDefault();
   var taskNameInput = document.querySelector("input[name='task-name']").value;
   var taskTypeInput = document.querySelector("select[name='task-type']").value;

   // Check if input values are empty Strings
   // **Remember to use ! operator for this condition (for compactness)
   if (taskNameInput === "" || taskTypeInput === "") {
      window.alert("You need to fill out the task form!");
      return;
   }
   formElement.reset();
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

   // Add task ID as a custom attribute
   listItemElement.setAttribute("data-task-id", taskIdCounter);

   // Create div item to hold task info and add to list item
   var taskInfoElement = document.createElement("div");
   // Give it a class name
   taskInfoElement.className = "task-info";
   // Add HTML content to div item
   taskInfoElement.innerHTML =
      "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
   listItemElement.appendChild(taskInfoElement);

   var taskActionsElement = createTaskActions(taskIdCounter);
   listItemElement.appendChild(taskActionsElement);
   // Add entire list item to list
   tasksToDoElement.appendChild(listItemElement);

   // Increase task counter for next unique id
   taskIdCounter++;
};

pageContentElement.addEventListener("click", taskButtonHandler);
formElement.addEventListener("submit", taskFormHandler);
