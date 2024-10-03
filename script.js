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
// Targeting DOM Elements
let itemContainer = document.querySelector(".main");
let idForListItems = 1;
let myToDoTask = [];
function addItems() {
   let userInputValue = userInput.value;
   if (userInputValue == "") {
      alert("Enter something");
   } else {
      createItems(userInputValue);
   }
   userInput.value = "";
}
addBtn.addEventListener("click", addItems);
userInput.addEventListener("keydown", (e) => {
   if (e.key == "Enter") {
      e.preventDefault();
      addItems();
   }
});

function createItems(task) {
   let newList = document.createElement("div");
   newList.className = "todo-items";
   newList.innerHTML = `
      <div class="text-section">
      <div class="item item-1">
      <div class="list-text">
      <input type="checkbox" id="list-${idForListItems}">
      <label for="list-${idForListItems}">${task}</label>
      </div>  
      </div>
      </div>
      <div class="item-delete"><button class="remove-btn"><i class="fa-solid fa-trash"></i></button></div>
      `;
   itemContainer.append(newList);
   let removeBtn = newList.querySelector(".remove-btn");
   removeBtn.addEventListener("click", () => {
      newList.remove();
      let taskIndex = myToDoTask.indexOf(task);
      myToDoTask.splice(taskIndex, 1);
      storeInBrowser(myToDoTask); // Updates the data after deletion
   });
   myToDoTask.push(task);
   storeInBrowser(myToDoTask);
   idForListItems++;
}
function storeInBrowser(myToDoTask) {
   localStorage.setItem("tasks", JSON.stringify(myToDoTask));
}
function retrieveData() {
   let storedTasks = JSON.parse(localStorage.getItem("tasks"));
   if (storedTasks) {
      storedTasks.forEach((task) => {
         createItems(task);
      });
   }
}
document.addEventListener("DOMContentLoaded", retrieveData);
