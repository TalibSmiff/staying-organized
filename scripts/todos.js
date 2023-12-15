"use strict";
let user_select = document.querySelector("#user_select");
let todo_body = document.querySelector("#todo_body");

async function getUsers() {
  let response = await fetch("http://localhost:8083/api/users");
  let users = await response.json();
  for (const user of users) {
    let user_option = document.createElement("option");

    user_option.innerText = user.username;
    user_option.value = user.id;

    user_select.appendChild(user_option);
  }
}
async function getTodos() {
  const user_id = user_select.value;

  let response = await fetch(`http://localhost:8083/api/todos/byuser/${user_id}`);
  let todos = await response.json();

  for (const todo of todos) {
    display_todo(todo);
  }
  table_body.innerHTML = " ";
}
function display_todo(todo) {
  let row = todo_body.insertRow(-1);

  let cell1 = row.insertCell(0);
  cell1.innerText = todo.priority;

  let cell2 = row.insertCell(1);
  cell2.innerText = todo.category;

  let cell3 = row.insertCell(2);
  cell3.innerText = todo.description;

  let cell4 = row.insertCell(3);
  cell4.innerText = todo.deadline;
}

window.onload = function () {
  getUsers();
};
user_select.onchange = getTodos;
