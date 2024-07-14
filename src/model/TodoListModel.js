export class TodoListModel extends EventTarget {
  #items;

  constructor(items = []) {
    super();
    this.#items = items;
  }

  getTotalCount() {
    return this.#items.length;
  }

  getTodoItems() {
    return this.#items;
  }

  onchange(listener) {
    this.addEventListener("change", listener);
  }

  emitChange() {
    this.dispatchEvent(new Event("change"));
  }

  addTodo(todoItem) {
    this.#items.push(todoItem);
    this.emitChange();
  }
}
