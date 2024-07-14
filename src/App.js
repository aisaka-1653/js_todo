import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
  #todoListModel = new TodoListModel();

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containertElement = document.querySelector("#js-todo-list");
    const progressBarElement = document.querySelector("#js-progress-bar");
    const todoCountElement = document.querySelector("#js-todo-count");
    const doneCountElement = document.querySelector("#js-done-count");
    const pendingCountElement = document.querySelector("#js-pending-count");

    this.#todoListModel.onchange(() => {
      const todoListElement = element`<ul></ul>`;
      const todoItems = this.#todoListModel.getTodoItems();

      todoItems.forEach((item) => {
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox" checked>
            <s class="todo-item-title">${item.title}</s>
            <button class="todo-item-btn delete-btn">削除</button>
          </li>`
          : element`<li><input type="checkbox" class="checkbox">
            <p class="todo-item-title">${item.title}</p>
            <button class="todo-item-btn delete-btn">削除</button>
          </li>`;

        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
          this.#todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed,
          });
        });

        const deleteButtonElement = todoItemElement.querySelector(".delete-btn");
        deleteButtonElement.addEventListener("click", () => {
          this.#todoListModel.deleteTodo({
            id: item.id,
          });
        });
        todoListElement.appendChild(todoItemElement);
      });

      render(todoListElement, containertElement);
      todoCountElement.textContent = `${this.#todoListModel.getTotalCount()}`;
      doneCountElement.textContent = `${this.#todoListModel.getDoneCount()}`;
      pendingCountElement.textContent = `${this.#todoListModel.getPendingCount()}`;
      progressBarElement.max = `${this.#todoListModel.getTotalCount()}`;
      progressBarElement.value = `${this.#todoListModel.getDoneCount()}`;
    });

    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.#todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false,
        })
      );
      inputElement.value = "";
    });
  }
  // constructor(formElement, formInputElement, formSubmitElement, todoListElememnt, progressBarElement, todoCountElement, doneCountElement, leftCountElement) {
  // this.formElement = formElement;
  // this.formInputElement = formInputElement;
  // this.formSubmitElement = formSubmitElement;
  // this.todoListElememnt = todoListElememnt;
  // this.progressBarElement = progressBarElement;
  // this.todoCountElement = todoCountElement;
  // this.doneCountElement = doneCountElement;
  // this.leftCountElement = leftCountElement;
  // }
}

// const formElement = document.querySelector("#js-form");
// const formInputElement = document.querySelector("#js-form-input");
// const formSubmitElement = document.querySelector("#js-form-submit");
// const todoListElement = document.querySelector("#js-todo-list");
// const progressBarElement = document.querySelector("#js-progress-bar");
// const todoCountElement = document.querySelector("#js-todo-count");
// const doneCountElement = document.querySelector("#js-done-count");
// const leftCountElement = document.querySelector("#js-left-count");
