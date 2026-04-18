const API = "http://localhost:3000/api";

let token = localStorage.getItem("token");

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  token = data.token;

  localStorage.setItem("token", token);

  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "block";

  getTasks();
}

// REGISTER
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  alert("Usuario creado, ahora inicia sesión");
}

// GET TASKS
async function getTasks() {
  const res = await fetch(`${API}/tasks`, {
    headers: { Authorization: token }
  });

  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${task.title} 
      ${task.completed ? "✔" : "❌"}
      <button onclick="toggleTask('${task._id}')">Completar</button>
      <button onclick="deleteTask('${task._id}')">Eliminar</button>
    `;

    list.appendChild(li);
  });
}

// CREATE
async function createTask() {
  const title = document.getElementById("taskInput").value;

  await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ title })
  });

  getTasks();
}

// UPDATE
async function toggleTask(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: { Authorization: token }
  });

  getTasks();
}

// DELETE
async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: token }
  });

  getTasks();
}