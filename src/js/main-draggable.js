// Set input value to empty
document.getElementById("item").value = "";

// Check, Delete and Warning SVG Icons
let checkSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm-2 13l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" class="pathOpacity" opacity="0"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/></svg>';
let deleteSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>';
let warningSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';

// Allow drop function
const allowDrop = (ev) => ev.preventDefault();

// Drag function
const drag = (ev) => ev.dataTransfer.setData("text", ev.target.id);

// Drop function
const drop = (ev) => {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
};

// Adds new item to the todo list
addListItem = (inputValue) => {
  let list = document.getElementById("todo");
  let listDone = document.getElementById("completed");

  let todoListItem = document.createElement("li");
  todoListItem.innerText = inputValue;
  // make a draggable item
  todoListItem.setAttribute("draggable", "true");
  todoListItem.setAttribute("id", "dragItem");
  todoListItem.setAttribute("ondragstart", "drag(event)");

  let checkBtn = document.createElement("span");
  checkBtn.classList.add("btn", "check");
  checkBtn.innerHTML = checkSVG;

  // Adds an event listener to the check icon for marking it as done
  checkBtn.addEventListener("click", function () {
    checkBtn.classList.toggle("done");

    if (checkBtn.classList.contains("done")) {
      listDone.insertBefore(todoListItem, listDone.childNodes[0]);
    } else {
      list.insertBefore(todoListItem, list.childNodes[0]);
    }
  });

  let deleteBtn = document.createElement("span");
  deleteBtn.classList.add("btn", "delete");
  deleteBtn.innerHTML = deleteSVG;

  // Adds an event listener to the delete icon for removing an item
  deleteBtn.addEventListener("click", function () {
    todoListItem.remove();
  });

  todoListItem.appendChild(checkBtn);
  todoListItem.appendChild(deleteBtn);

  list.insertBefore(todoListItem, list.childNodes[0]);
};

// Trigger add button on pressing enter key
document.getElementById("item").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addItem").click();
  }
});

// Adds an event listener to the add item button
document.getElementById("addItem").addEventListener("click", function () {
  let inputValue = document.getElementById("item").value;

  if (inputValue.trim()) {
    addListItem(inputValue);
    document.getElementById("item").value = "";
    document.getElementById("errorSection").classList.add("hidden");
  } else {
    document.getElementsByClassName(
      "error"
    )[0].innerHTML = `${warningSVG} Please enter a task to do!`;
    document.getElementById("errorSection").classList.remove("hidden");
  }
});
