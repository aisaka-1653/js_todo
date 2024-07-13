import { element, render } from "./view/html-util.js";

export class App {
  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containertElement = document.querySelector("#js-todo-list");
    const todoCountElement = document.querySelector("#js-todo-count");
    const progressBarElement = document.querySelector("#js-progress-bar");
    const todoListElement = element`<ul></ul>`;

    let todoItemCount = 0;
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const todoItemElement = element`<li>${inputElement.value}</li>`;
      todoListElement.appendChild(todoItemElement);
      render(todoListElement, containertElement);
      todoItemCount += 1;
      todoCountElement.textContent = `${todoItemCount}`;
      progressBarElement.max = todoItemCount;
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