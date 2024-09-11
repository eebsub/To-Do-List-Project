const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Adding Task Function
function addTask() {
  if (inputBox.value === '') {
    alert('You must write something!');
  } else {
    let li = document.createElement("li");
    li.textContent = inputBox.value;

    let span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);

    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
  }
}

// Event Listener for List Container
  listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  }, false);

  inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });


// Saving the Data Function
function saveData() {
  let tasks = [];
  document.querySelectorAll("#list-container li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      checked: li.classList.contains("checked")
    });
  });
  localStorage.setItem("data", JSON.stringify(tasks));
}

// Showing Task Function
function showTask() {
  let tasks = JSON.parse(localStorage.getItem("data")) || [];
  listContainer.innerHTML = "";
  tasks.forEach(task => {
    let li = document.createElement("li");
    li.textContent = task.text;

    if (task.checked) {
      li.classList.add("checked");
    }

    let span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);

    listContainer.appendChild(li);
  });
}


showTask();
