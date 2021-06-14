const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement("li");
        if (todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        todoEl.innerText = todoText;

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");

            updateLS();
        });

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEl.remove();

            updateLS();
        });

        todosUL.appendChild(todoEl);

        input.value = "";

        updateLS();
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll("li");

    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

let clock = () => {
    let date = new Date();
    let day = date.getDay();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let period = "AM";
    if (hrs == 0) {
      hrs = 12;
    } else if (hrs >= 12) {
      hrs = hrs - 12;
      period = "PM";
    }
    hrs = hrs < 10 ? "0" + hrs : hrs;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
  
    let time = `Current time: ${hrs}:${mins}:${secs} ${period}`;
    document.getElementById("clock").innerText = time;
    setTimeout(clock, 1000);
  };
  
  clock();
   
  