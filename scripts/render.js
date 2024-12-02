export function render({ taskName, isCompleted }) {
  const todoTask = document.createElement("li");
  todoTask.classList.add("todo__task");
  todoTask.innerHTML = `
  <div>
     <h4 class="${
       !isCompleted ? "todo__title" : "todo__title todo__title--completed"
     }">${taskName}</h4>
  </div>
 
    <input type="checkbox" class="todo__checkbox" ${
      isCompleted ? "checked disabled" : ""
    }/>
    <button class="button button__cross ${
      isCompleted ? "" : "button__cross--hidden"
    }" id="cross">
    </button>`;
  return todoTask;
}
