// Hold the todos to be rendered on the screen
const todoList = [
  { name: "walk the dog", description: "Walk Smokey", completed: true, id: 0 },
];

// Add todos
const addTodo = () => {
  let obj = {};
  obj.name = document.getElementById("title").value;
  obj.description = document.getElementById("description").value;
  obj.completed = false;
  obj.id = uuidv4();

  todoList.push(obj);
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
};

// Click on
document.querySelector(".todos").addEventListener("click", (e) => {
  checkTodo(e);
});

const checkTodo = (e) => {
  // console.log(e);
  // const getId = e.target.parentElement.id;
  // const index = todoList.findIndex((todo) => todo.id === getId);
  // todoList.splice(index, 1);
  // renderTodos();

  if (e.target.parentElement.classList.contains("todo-check")) {
    const getId = e.target.parentElement.parentElement;
    const index = todoList.findIndex((todo) => (todo.id = getId));

    todoList[index].completed = !todoList[index].completed;
    renderTodos();
  }
};

const completedTodos = () => {
  const completed = todoList.filter((todo) => todo.completed);
  document.querySelector(
    ".todo-list p"
  ).textContent = `Incomplete Tasks: ${completed.length}`;
};

renderTodos();
