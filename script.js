// Array to store all todos
let todos = [];

// Function to add a new todo
function addTodo() {
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();
    
    // Check if input is empty
    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create a new todo object
    const newTodo = {
        id: Date.now(), // Simple ID using timestamp
        text: todoText,
        completed: false
    };
    
    // Add to our todos array
    todos.push(newTodo);
    
    // Clear the input field
    input.value = '';
    
    // Update the display
    renderTodos();
}

// Function to delete a todo
function deleteTodo(id) {
    // Filter out the todo with matching id
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Function to toggle completion status
function toggleTodo(id) {
    // Find the todo and toggle its completed status
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

// Function to display all todos on the page
function renderTodos() {
    const todoList = document.getElementById('todoList');
    
    // Clear the current list
    todoList.innerHTML = '';
    
    // If no todos, show empty state
    if (todos.length === 0) {
        todoList.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
        return;
    }
    
    // Create HTML for each todo
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        todoItem.innerHTML = `
            <span class="todo-text" onclick="toggleTodo(${todo.id})">
                ${todo.text}
            </span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">
                Delete
            </button>
        `;
        
        todoList.appendChild(todoItem);
    });
}

// Allow Enter key to add todos
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('todoInput');
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // Show empty state on page load
    renderTodos();
});