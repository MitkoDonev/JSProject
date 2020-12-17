"use strict";

//Select DOM
var todoInput = document.querySelector(".todo-input");
var todoButton = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-list");
var filterOption = document.querySelector(".filter-todo"); //Event Listeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo); //Functions

function addTodo(e) {
  //Prevent natural behaviour
  e.preventDefault(); //Create todo div

  var todoDiv = document.createElement("div");
  todoDiv.classList.add("todo"); //Create list

  var newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; //Save to local - do this last
  //Save to local

  saveLocalTodos(todoInput.value); //

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = ""; //Create Completed Button

  var completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class=\"fas fa-check\"></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton); //Create trash button

  var trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class=\"fas fa-trash\"></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton); //attach final Todo

  todoList.appendChild(todoDiv);
}

function deleteTodo(e) {
  var item = e.target;

  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();
    var todo = item.parentElement;
    todo.classList.add("fall"); //at the end

    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function (e) {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    var _todo = item.parentElement;

    _todo.classList.toggle("completed");

    console.log(_todo);
  }
}

function filterTodo(e) {
  var todos = todoList.childNodes;
  todos.forEach(function (todo, index) {
    if (index != 0) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;

        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }

          break;

        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }

          break;
      }
    }
  });
}

function saveLocalTodos(todo) {
  var todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  var todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  var todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  var todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //Create todo div
    var todoDiv = document.createElement("div");
    todoDiv.classList.add("todo"); //Create list

    var newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = ""; //Create Completed Button

    var completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class=\"fas fa-check\"></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton); //Create trash button

    var trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class=\"fas fa-trash\"></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton); //attach final Todo

    todoList.appendChild(todoDiv);
  });
}