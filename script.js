const addTaskBtn = document.getElementById("add-task-btn");
const newTaskInput = document.getElementById("new-task-input");
const listContainer = document.querySelector(".list-todo");

listContainer.addEventListener("change", (e) => {
  if (e.target.classList.contains("my-checkbox")) {
    const task = e.target.closest(".task");
    task.classList.toggle("completed");
  }
});

listContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const task = e.target.closest(".task");
    task.remove();
  }
});

addTaskBtn.addEventListener("click", () => {
  const taskText = newTaskInput.value.trim();
  if (taskText === "") return;

  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.innerHTML = `
      <input type="checkbox" class="my-checkbox" />
      <p>${taskText}</p>
      <button class="delete-btn">Eliminar</button>
    `;

  listContainer.insertBefore(
    newTask,
    document.querySelector(".input-container")
  );
  newTaskInput.value = "";
});