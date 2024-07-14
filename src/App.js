import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
  #todoListModel = new TodoListModel();

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containertElement = document.querySelector("#js-todo-list");
    const todoCountElement = document.querySelector("#js-todo-count");
    const progressBarElement = document.querySelector("#js-progress-bar");

    this.#todoListModel.onchange(() => {
      const todoListElement = element`<ul></ul>`;
      const todoItems = this.#todoListModel.getTodoItems();
      todoItems.forEach(item => {
        const todoItemElement = element`<li>${item.title}</li>`;
        todoListElement.appendChild(todoItemElement);
      });
      render(todoListElement, containertElement);
      todoCountElement.textContent = `${this.#todoListModel.getTotalCount()}`;
      progressBarElement.max = `${this.#todoListModel.getTotalCount()}`;
    });

    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.#todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false
      }));
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