document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addButton = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");
  const clearAllButton = document.getElementById("clear-all");
  const searchInput = document.getElementById("search-todo");

  // Load todos from localStorage
  const loadTodos = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  };

  const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const renderTodos = (todos) => {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = todo.checked ? "checked" : "";
      li.innerHTML = `
          <button class="check-button" data-index="${index}">
            <img src="https://img.icons8.com/color/48/000000/checkmark.png" alt="Check" />
          </button>
          <span>${todo.text}</span>
          <button class="remove-button" data-index="${index}">
            <img src="https://img.icons8.com/color/48/000000/delete-sign.png" alt="Remove" />
          </button>
        `;
      todoList.appendChild(li);
    });
  };

  addButton.addEventListener("click", () => {
    const todos = loadTodos();
    const text = todoInput.value.trim();
    if (text) {
      todos.push({ text, checked: false });
      saveTodos(todos);
      renderTodos(todos);
      todoInput.value = "";
    }
  });

  // Handle todo list actions
  todoList.addEventListener("click", (event) => {
    const todos = loadTodos();
    const index = event.target.closest("button")?.dataset.index;

    if (event.target.closest(".check-button")) {
      todos[index].checked = !todos[index].checked;
      saveTodos(todos);
      renderTodos(todos);
    }

    if (event.target.closest(".remove-button")) {
      todos.splice(index, 1);
      saveTodos(todos);
      renderTodos(todos);
    }
  });

  clearAllButton.addEventListener("click", () => {
    saveTodos([]);
    renderTodos([]);
  });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const todos = loadTodos();
    const filteredTodos = todos.filter((todo) =>
      todo.text.toLowerCase().includes(query)
    );
    renderTodos(filteredTodos);
  });

  renderTodos(loadTodos());
});
