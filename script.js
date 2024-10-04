// let lists = document.querySelectorAll(".list");
// let leftBox = document.querySelector(".items-1");
// let rightBox = document.querySelector(".items-2");
// let list;
// for (list of lists) {
//    list.addEventListener("dragstart", (e) => {
//       let selected = e.target;
//       rightBox.addEventListener("dragover", (e) => {
//          e.preventDefault();
//       });
//       rightBox.addEventListener("drop", (e) => {
//          rightBox.appendChild(selected);
//          selected = null;
//       });
//       leftBox.addEventListener("dragover", (e) => {
//          e.preventDefault();
//       });
//       leftBox.addEventListener("drop", (e) => {
//          leftBox.appendChild(selected);
//          selected = null;
//       });
//    });
// }
// Getting the user input
let userInput = document.querySelector("#user-input");
let addBtn = document.querySelector(".add");
let itemContainer = document.querySelector(".main");
let myToDoTask = JSON.parse(localStorage.getItem("tasks")) || [];

function addItems() {
   let userInputValue = userInput.value.trim();
   if (userInputValue === "") {
      alert("Enter something");
   } else {
      let taskId = Date.now(); // Unique ID using timestamp
      let taskObj = {
         id: taskId,
         text: userInputValue,
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
   newList.className = "todo-items";
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
}

function storeInBrowser() {
   localStorage.setItem("tasks", JSON.stringify(myToDoTask)); //Converts the array of tasks into JSON string
}

function retrieveData() {
   myToDoTask.forEach((task) => createItems(task));
}

//Event Listeners
userInput.addEventListener("keydown", (e) => {
   if (e.key === "Enter") {
      e.preventDefault();
      addItems();
   }
});
addBtn.addEventListener("click", addItems);
document.addEventListener("DOMContentLoaded", retrieveData);
