// Getting the user input
let userInput = document.querySelector("#user-input");
let addBtn = document.querySelector(".add");
let itemContainer = document.querySelector(".main");
let myToDoTask = JSON.parse(localStorage.getItem("tasks")) || [];
let urgentBtn = document.querySelector(".urgent-btn");
let importantBtn = document.querySelector(".important-btn");
let lowPriorityBtn = document.querySelector(".low-btn");
//Dropdown Area
let dropDownContainer = document.querySelector(".dropdown-select-item");
let mainItem = document.querySelector(".select");
let options = document.querySelectorAll("#option li");
dropDownContainer.addEventListener("click", () => {
   dropDownContainer.classList.toggle("active");
   document.querySelector(".dropdown-options").classList.toggle("visible");
});
options.forEach((option) => {
   option.addEventListener("click", () => {
      mainItem.innerHTML = `${option.innerHTML}`;
   });
});
document.addEventListener("click", (e) => {
   if (!dropDownContainer.contains(e.target)) {
      dropDownContainer.classList.remove("active"); // Remove active class if clicking outside
      document.querySelector(".dropdown-options").classList.remove("visible"); // Hide dropdown
   }
});
function addItems() {
   let userInputValue = userInput.value.trim();
   let priority = mainItem.innerHTML.trim().toLowerCase();
   console.log(priority);
   if (priority == "low priority") {
      priority = "low";
   }
   if (userInputValue === "") {
      alert("Enter something");
   } else if (priority == "Select priority") {
      alert("Select the priority");
   } else {
      let taskId = Date.now(); // Unique ID using timestamp
      let taskObj = {
         id: taskId,
         text: userInputValue,
         priority: priority,
         state: "unchecked",
      };
      createItems(taskObj);
      myToDoTask.push(taskObj);
      storeInBrowser(); //Updates the data in LocalStorage
   }
   userInput.value = "";
}

function createItems(taskObj) {
   let newList = document.createElement("div");
   newList.className = "todo-items " + taskObj.priority;
   newList.setAttribute("draggable", "true");
   newList.dataset.id = taskObj.id;
   newList.innerHTML = `
      <div class="text-section">
         <div class="item item-1">
            <div class="list-text">
               <input type="checkbox" id="list-${taskObj.id}" ${taskObj.state}>
               <label for="list-${taskObj.id}">${taskObj.text}</label>
            </div>
         </div>
      </div>
      <div class="item-delete">
         <button class="remove-btn">
            <i class="fa-solid fa-trash"></i>
         </button>
      </div>
   `;
   itemContainer.append(newList);
   // Task Deletion
   let removeBtn = newList.querySelector(".remove-btn");
   removeBtn.addEventListener("click", () => {
      newList.remove();
      myToDoTask = myToDoTask.filter((task) => task.id !== taskObj.id); // Remove by ID
      storeInBrowser();
   });
   //Checking the checkbox State
   let checkBox = newList.querySelector(`input[type = "checkbox"]`);
   checkBox.addEventListener("change", () => {
      taskObj.state = checkBox.checked;
      if (taskObj.state) {
         taskObj.state = "checked";
      } else {
         taskObj.state = "unchecked";
      }
      storeInBrowser(); //Updates the state in LocalStorage
   });
   // dragAndDrop(newList);
}

function storeInBrowser() {
   localStorage.setItem("tasks", JSON.stringify(myToDoTask)); //Converts the array of tasks into JSON string
}

function retrieveData() {
   myToDoTask.forEach((task) => createItems(task));
}
function prioritySorting(sortType, requiredTask) {
   // for (const task in myToDoTask) {
   //    if (myToDoTask[task].priority == "Urgent") {
   //       console.log(task);
   //       alert("Urgent");
   //    }
   // }
   console.log(requiredTask);
   let currentToDoItems = document.querySelectorAll(".todo-items");
   console.log(currentToDoItems);
   if (sortType == "Urgent") {
      currentToDoItems.forEach((currItem) => {
         currItem.style.display = "none";
      });
      requiredTask.forEach((reqTask) => {
         reqTask.style.display = "flex";
      });
   } else if (sortType == "Important") {
      currentToDoItems.forEach((currItem) => {
         currItem.style.display = "none";
      });
      requiredTask.forEach((reqTask) => {
         reqTask.style.display = "flex";
      });
   } else if (sortType == "Low") {
      currentToDoItems.forEach((currItem) => {
         currItem.style.display = "none";
      });
      requiredTask.forEach((reqTask) => {
         reqTask.style.display = "flex";
      });
   }
   // console.log(myToDoTask);
}
// function dragAndDrop(newList) {
//    let lists = newList.querySelectorAll(".list-text");
//    console.log(lists);
//    let list;
//    for (list of lists) {
//       console.log(list);
//       list.addEventListener("dragstart", (e) => {
//          let selected = e.target;
//          rightBox.addEventListener("dragover", (e) => {
//             e.preventDefault();
//          });
//          rightBox.addEventListener("drop", (e) => {
//             rightBox.appendChild(selected);
//             selected = null;
//          });
//          leftBox.addEventListener("dragover", (e) => {
//             e.preventDefault();
//          });
//          leftBox.addEventListener("drop", (e) => {
//             leftBox.appendChild(selected);
//             selected = null;
//          });
//          console.log(e.target);
//       });
//    }
// }

//Event Listeners
userInput.addEventListener("keydown", (e) => {
   if (e.key === "Enter") {
      e.preventDefault();
      addItems();
   }
});
urgentBtn.addEventListener("click", () => {
   let urgentTask = document.querySelectorAll(".urgent");
   prioritySorting("Urgent", urgentTask);
});
importantBtn.addEventListener("click", () => {
   let importantTask = document.querySelectorAll(".important");
   prioritySorting("Important", importantTask);
});
lowPriorityBtn.addEventListener("click", () => {
   let lowPriorityTask = document.querySelectorAll(".low");
   prioritySorting("Low", lowPriorityTask);
});
addBtn.addEventListener("click", addItems);
document.addEventListener("DOMContentLoaded", retrieveData);
