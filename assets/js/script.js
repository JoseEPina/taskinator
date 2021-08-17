var taskIdCounter = 0;
var formElement = document.querySelector("#task-form");
var tasksToDoElement = document.querySelector("#tasks-to-do");
var tasksInProgressElement = document.querySelector("#tasks-in-progress");
var tasksCompletedElement = document.querySelector("#tasks-completed");
var pageContentElement = document.querySelector("#page-content");
var tasks = [];

var loadTasks = function () {
   // Gets task items from localStorage.
   var savedTasks = localStorage.getItem("tasks");

   if (savedTasks === null) {
      return false;
   }

   // Converts tasks from the string format back into an array of objects.
   savedTasks = JSON.parse(savedTasks);

   // Loop through savedTasks array
   for (var i = 0; i < savedTasks.length; i++) {
      // Pass each task object into the 'createTaskElement()' function
      createTaskElement(savedTasks[i]);
   }
};

var saveTasks = function () {
   localStorage.setItem("tasks", JSON.stringify(tasks));
};

var taskStatusChangeHandler = function (event) {
   // console.log(event.target);
   // Get the task item's id
   var taskId = event.target.getAttribute("data-task-id");

   // Get the currently selected option's value and convert to lowercase
   var statusValue = event.target.value.toLowerCase();

   // Find the parent task item element based on the id
   var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

   if (statusValue === "to do") {
      tasksToDoElement.appendChild(taskSelected);
   } else if (statusValue === "in progress") {
      tasksInProgressElement.appendChild(taskSelected);
   } else if (statusValue === "completed") {
      tasksCompletedElement.appendChild(taskSelected);
   }

   // Update task's in tasks array
   for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(taskId)) {
         tasks[i].status = statusValue;
      }
   }
   saveTasks();
};

var completeEditTask = function (taskName, taskType, taskId) {
   // console.log(taskName, taskType, taskId);
   // Find the matching task list item
   var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

   // Set new values
   taskSelected.querySelector("h3.task-name").textContent = taskName;
   taskSelected.querySelector("span.task-type").textContent = taskType;

   // Loop through tasks array and task object with new content
   for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(taskId)) {
         tasks[i].name = taskName;
         tasks[i].type = taskType;
      }
   }
   formElement.removeAttribute("data-task-id");
   document.querySelector("#save-task").textContent = "Add Task";
   window.alert("Task Updated!");

   saveTasks();
};

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

   // Create New array to hold updated list of tasks
   var updatedTaskArr = [];

   // Loop through current tasks
   for (var i = 0; i < tasks.length; i++) {
      // If tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
      if (tasks[i].id !== parseInt(taskId)) {
         updatedTaskArr.push(tasks[i]);
      }
   }

   // Reassign tasks array to be the same as updatedTaskArr
   tasks = updatedTaskArr;

   saveTasks();
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

   var statusChoices = ["", "To Do", "In Progress", "Completed"];

   for (var i = 0; i < statusChoices.length; i++) {
      // Create option element
      var statusOptionElement = document.createElement("option");
      statusOptionElement.setAttribute("value", statusChoices[i]);
      statusOptionElement.textContent = statusChoices[i];

      // Set up condition to display "Pick a Column" w/ DISABLED SELECTED properties
      if (i === 0) {
         statusOptionElement.textContent = "Pick a Column";
         statusOptionElement.setAttribute("disabled", "true");
         statusOptionElement.setAttribute("selected", "true");
      } else {
         // Display selected option in dropdown menu.
         statusOptionElement.textContent = statusChoices[i];
      }

      // Append to select
      statusSelectElement.appendChild(statusOptionElement);
   }
   return actionContainerElement;
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

   if (taskDataObj.status === "to do") {
      tasksToDoElement.appendChild(listItemElement);
   } else if (taskDataObj.status === "in progress") {
      tasksInProgressElement.appendChild(listItemElement);
   } else if (taskDataObj.status === "completed") {
      tasksCompletedElement.appendChild(listItemElement);
   }

   taskDataObj.id = taskIdCounter;
   tasks.push(taskDataObj);
   saveTasks();
   // Increase task counter for next unique id
   taskIdCounter++;
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

   var isEdit = formElement.hasAttribute("data-task-id");

   // If it Has data attribute, so get task id and call function to complete edit process
   if (isEdit) {
      var taskId = formElement.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
   }
   // If it has No data attribute, create object as normal and pass to createTaskElement function
   else {
      // Package up date as an object
      var taskDataObj = {
         name: taskNameInput,
         type: taskTypeInput,
         status: "to do",
      };
      // Send it as an argument to createTaskElement
      createTaskElement(taskDataObj);
   }
};

loadTasks();

pageContentElement.addEventListener("click", taskButtonHandler);
formElement.addEventListener("submit", taskFormHandler);
pageContentElement.addEventListener("change", taskStatusChangeHandler);
