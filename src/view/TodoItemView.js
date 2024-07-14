import { element } from "./html-util.js";

export class TodoItemView {
  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked>
        <s class="todo-item-title">${todoItem.title}</s>
        <button class="todo-item-btn edit-btn">編集</button>
        <button class="todo-item-btn delete-btn">削除</button>
      </li>`
      : element`<li><input type="checkbox" class="checkbox">
        <p class="todo-item-title">${todoItem.title}</p>
        <button class="todo-item-btn edit-btn">編集</button>
        <button class="todo-item-btn delete-btn">削除</button>
      </li>`;

    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });

    const deleteButtonElement = todoItemElement.querySelector(".delete-btn");
    deleteButtonElement.addEventListener("click", () => {
      onDeleteTodo({
        id: todoItem.id
      });
    });

    return todoItemElement;
  }
}
