import { Node } from "./node.js";
import {
  addNewTask,
  onChangeTaskText,
  onShowAllTasks,
  onShowCompletedTasks,
  onShowNotCompletedTasks,
} from "./util.js";

Node.form.addEventListener("submit", addNewTask);
Node.todoList.addEventListener("dblclick", onChangeTaskText);
Node.btnShowCompleted.addEventListener("click", onShowCompletedTasks);
Node.btnShowNotCompleted.addEventListener("click", onShowNotCompletedTasks);
Node.btnShowAll.addEventListener("click", onShowAllTasks);
