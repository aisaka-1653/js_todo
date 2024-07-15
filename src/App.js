import { render } from "./view/html-util.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";

export class App {
  #todoListView = new TodoListView();
  #todoListModel = new TodoListModel();

  handleAdd(title) {
    this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  handleUpdate({ id, completed }) {
    this.#todoListModel.updateTodo({ id, completed });
  }

  handleEdit({ id, title }) {
    this.#todoListModel.editTodo({ id, title });
  }

  handleDelete({ id }) {
    this.#todoListModel.deleteTodo({ id });
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containertElement = document.querySelector("#js-todo-list");
    const progressBarElement = document.querySelector("#js-progress-bar");
    const todoCountElement = document.querySelector("#js-todo-count");
    const doneCountElement = document.querySelector("#js-done-count");
    const pendingCountElement = document.querySelector("#js-pending-count");

    this.#todoListModel.onchange(() => {
      const todoItems = this.#todoListModel.getTodoItems();
      const todoListElement = this.#todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        onEditTodo: ({ id, title }) => {
          this.handleEdit({ id, title });
        },
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        }
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
      this.#todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false,
      }));
      inputElement.value = "";
    });
  }
}
