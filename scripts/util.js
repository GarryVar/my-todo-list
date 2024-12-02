import { render } from "./render.js";
import { Node } from "./node.js";

export function addNewTask(evt) {
  evt.preventDefault();
  let taskName = Node.input.value;

  /*Создаём таску по условию*/
  if (!taskName || typeof taskName !== "string") {
    console.error(`Название задачи не может быть пустым`);
  } else {
    const newTask = {
      taskName: taskName,
      isCompleted: false,
    };

    Node.input.value = "";
    setComplete();
    removeTask();
    Node.tasks.unshift(newTask);
    Node.todoList.prepend(render(newTask));
  }
}

export function setComplete() {
  /*Находим чекбокc который ортисовался на странице и навешиваем на него событие change*/
  Node.todoList.addEventListener("change", (evt) => {
    let checked = evt.target.checked;

    let task = Node.tasks.find(
      (i) =>
        i.taskName ===
        evt.target.previousElementSibling.querySelector(".todo__title")
          .textContent
    );

    if (checked && task) {
      Node.todoList.innerHTML = "";
      task.isCompleted = true;

      Node.tasks.forEach((i) => Node.todoList.append(render(i)));
    } else {
      task.isCompleted = false;
    }
  });
}

export function removeTask() {
  Node.todoList.addEventListener("click", (evt) => {
    const closeBtn = evt.target;

    const taskIndex = Node.tasks.findIndex(
      (i) =>
        i.taskName ===
        closeBtn.parentElement.querySelector(".todo__title").textContent
    );

    if (closeBtn.nodeName === "BUTTON" && taskIndex !== -1) {
      Node.tasks.splice(taskIndex, 1);
      Node.todoList.innerHTML = "";
      Node.tasks.forEach((i) => Node.todoList.append(render(i)));
    }
  });
}

/* Показывает выполненые задачи */
export function onShowCompletedTasks() {
  Node.todoList.innerHTML = "";
  Node.tasks.filter((i) => i.isCompleted && Node.todoList.append(render(i)));
}

/* Показывает не выполненые задачи */
export function onShowNotCompletedTasks() {
  Node.todoList.innerHTML = "";
  Node.tasks.filter((i) => !i.isCompleted && Node.todoList.append(render(i)));
}

/* Показыывает все задачи */
export function onShowAllTasks() {
  Node.todoList.innerHTML = "";
  Node.tasks.forEach((i) => i && Node.todoList.append(render(i)));
}

export function onChangeTaskText(evt) {
  const taskText = evt.target;
  const taskTitleContainer = taskText.parentElement;

  let task = Node.tasks.find((i) => i.taskName === taskText.textContent);

  if (task && !task.isCompleted) {
    taskTitleContainer.innerHTML = `
    <input type="text" class="todo__edit-input" autofocus value="${taskText.textContent}">
    <button class="button button--save" type="button" id="save-edit">Сохранить</button>
    `;
    const saveEditButton = taskTitleContainer.querySelector("#save-edit");

    saveEditButton.addEventListener("click", () => {
      task.taskName = saveEditButton.previousElementSibling.value;

      Node.todoList.innerHTML = "";
      Node.tasks.forEach((i) => Node.todoList.append(render(i)));
      removeTask();
    });
  }
}
