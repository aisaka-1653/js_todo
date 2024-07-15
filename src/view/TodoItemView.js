import { element } from "./html-util.js";

export class TodoItemView {
  createElement(todoItem, { onUpdateTodo, onEditTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked>
        <s class="todo-item-title">${todoItem.title}</s>
        <input type="text" class="edit-input" style="display: none;" value="${todoItem.title}">
        <button class="todo-item-btn edit-btn">編集</button>
        <button class="todo-item-btn save-btn" style="display: none;">保存</button>
        <button class="todo-item-btn delete-btn">削除</button>
      </li>`
      : element`<li><input type="checkbox" class="checkbox">
        <p class="todo-item-title">${todoItem.title}</p>
        <input type="text" class="edit-input" style="display: none;" value="${todoItem.title}">
        <button class="todo-item-btn edit-btn">編集</button>
        <button class="todo-item-btn save-btn" style="display: none;">保存</button>
        <button class="todo-item-btn delete-btn">削除</button>
      </li>`;

    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    const titleTextElement = todoItemElement.querySelector(".todo-item-title");
    const editInputElement = todoItemElement.querySelector(".edit-input");
    const editButtonElement = todoItemElement.querySelector(".edit-btn");
    const deleteButtonElement = todoItemElement.querySelector(".delete-btn");
    const saveButtonElement = todoItemElement.querySelector(".save-btn");

    inputCheckboxElement.addEventListener("change", () => {
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });

    editButtonElement.addEventListener("click", () => {
      titleTextElement.style.display = "none";
      editInputElement.style.display = "inline-block";
      editButtonElement.style.display = "none";
      saveButtonElement.style.display = "inline-block";
      editInputElement.focus();
      const length = editInputElement.value.length;
      editInputElement.setSelectionRange(length, length);
    });

    saveButtonElement.addEventListener("click", () => {
      const newTitle = editInputElement.value.trim();
      if (newTitle !== '' && newTitle !== todoItem.title) {
        onEditTodo({
          id: todoItem.id,
          title: newTitle
        });
      } else {
        titleTextElement.style.display = 'inline-block';
        editInputElement.style.display = 'none';
        editButtonElement.style.display = 'inline-block';
        saveButtonElement.style.display = 'none';
      }
    });

    deleteButtonElement.addEventListener("click", () => {
      onDeleteTodo({
        id: todoItem.id
      });
    });

    return todoItemElement;
  }
}
