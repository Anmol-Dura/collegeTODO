// Data Setup
const todos = [
  { text: "Order cat food", completed: false },
  { text: "Clean kitchen", completed: true },
  { text: "Buy food", completed: true },
  { text: "Do work", completed: false },
  { text: "Exercise", completed: false },
];

// Filters for Todos
const filters = {
  searchText: "", // Text to filter todos
  hideCompleted: false, // Whether to hide completed todos
};

// Rendering Function: Renders todos based on filters
const renderTodos = function (todos, filters) {
  // Filter todos based on search text and completion status
  const filteredTodos = todos.filter(function (todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  // Filter incomplete todos for summary
  const incompleteTodos = filteredTodos.filter(function (todo) {
    return !todo.completed;
  });

  // Select the todos container and clear its contents
  const todosContainer = document.querySelector("#todos");
  // get all the elamements inside $tods and make ti empty
  todosContainer.innerHTML = "";

  // Display summary of incomplete todos
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  todosContainer.appendChild(summary);

  // Render each filtered todo
  filteredTodos.forEach(function (todo) {
    const todoEl = document.createElement("label");
    todoEl.style.display = "block"; // Display each todo on a new line
    // Create checkbox for todo completion status
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todo.completed;

    // Create span for todo text
    const todoText = document.createTextNode(todo.text);
    // todoText.textContent = todo.text;
    if (todo.completed) {
      todoEl.style.textDecoration = "line-through"; // Strikethrough for completed todos
    }

    // Append checkbox and todo text to todo element
    todoEl.appendChild(checkbox);
    todoEl.appendChild(todoText);

    // Append todo element to todos container
    todosContainer.appendChild(todoEl);

    // Event listener for checkbox to toggle todo completion status
    checkbox.addEventListener("change", function () {
      todo.completed = !todo.completed;
      renderTodos(todos, filters); // Re-render todos after modification
    });
  });
};

// Initial rendering of todos
renderTodos(todos, filters);

// Event Listeners

// Event listener for adding new todo
document.querySelector("#new-todo").addEventListener("submit", function (e) {
  e.preventDefault();
  const todoText = e.target.elements[0].value.trim();
  if (todoText.length > 0) {
    todos.push({
      text: todoText,
      completed: false,
    });
    xs;
    renderTodos(todos, filters); // Re-render todos after addition
    e.target.elements[0].value = ""; // Clear input field
  }
});

// Event listener for searching todos
document.querySelector("#search-text").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters); // Re-render todos after search text change
});

// Event listener for toggling hide completed todos option
document
  .querySelector("#hide-completed")
  .addEventListener("change", function (e) {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters); // Re-render todos after completion status change
  });
