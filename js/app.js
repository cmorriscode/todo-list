// Hold the todos to be rendered on the screen
const todoList = [];

// Add todos
const popup = document.querySelector(".add-popup");

document.querySelector(".add-todo").addEventListener("click", () => {
  popup.style.display = "block";
});

document.querySelector(".submit-add").addEventListener("click", (e) => {
  e.preventDefault();
  popup.style.display = "none";
  addTodo();
  renderTodos();
});

const addTodo = () => {
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const obj = {};

  if (!title.value) {
    obj.name = "Untitled";
  } else {
    obj.name = title.value;
  }
  obj.description = description.value;
  obj.completed = false;
  obj.id = uuidv4();

  // Check radio buttons
  if (document.getElementById("low").checked) {
    obj.priority = "low";
  } else if (document.getElementById("important").checked) {
    obj.priority = "important";
  } else if (document.getElementById("urgent").checked) {
    obj.priority = "urgent";
  }

  todoList.push(obj);
  title.value = "";
  description.value = "";
  document.getElementById("low").checked = true;
};

// Render todos on screen

const renderTodos = () => {
  const todoDisplay = document.querySelector(".todos");
  todoDisplay.innerHTML = "";
  todoList.forEach((todo) => {
    const div = document.createElement("div");

    if (todo.completed) {
      div.innerHTML = `
      <div class="todo-text">
        <h4>${todo.name}</h4>
        <p>${todo.description}</p>
      </div>
      <div class="todo-check">
        <i class="fa fa-check-square check-true"></i>
        <i class="fa fa-trash trash"></i>
      </div>
      `;
    } else {
      div.innerHTML = `
      <div class="todo-text">
        <h4>${todo.name}</h4>
        <p>${todo.description}</p>
      </div>
      <div class="todo-check">
        <i class="fa fa-square check-false"></i>
        <i class="fa fa-trash trash"></i>
      </div>`;
    }
    div.setAttribute("id", todo.id);
    div.setAttribute("class", "todo-div");

    todoDisplay.appendChild(div);
  });

  incompleteTodos();
};

// Click on checked box to change complete/incomplete
document.querySelector(".todos").addEventListener("click", (e) => {
  if (
    e.target.classList.contains("check-true") ||
    e.target.classList.contains("check-false")
  ) {
    checkTodo(e);
  }
});

const checkTodo = (e) => {
  const getId = e.target.parentElement.parentElement.id;
  const index = todoList.findIndex((todo) => todo.id === getId);

  todoList[index].completed = !todoList[index].completed;
  renderTodos();
};

// Delete todo
document.addEventListener("click", (e) => {
  deleteTodo(e);
});

const deleteTodo = (e) => {
  if (e.target.classList.contains("trash")) {
    const getId = e.target.parentElement.id;
    const index = todoList.findIndex((todo) => todo.id === getId);
    todoList.splice(index, 1);
    renderTodos();
  }
};

// Display tasks that need to be done
const incompleteTodos = () => {
  const completed = todoList.filter((todo) => !todo.completed);
  document.querySelector(
    ".todo-list p"
  ).textContent = `Incomplete Tasks: ${completed.length}`;
};

renderTodos();
