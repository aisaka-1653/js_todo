export class TodoListModel extends EventTarget {
  #items;

  constructor(items = []) {
    super();
    this.#items = items;
  }

  getTotalCount() {
    return this.#items.length;
  }

  getDoneCount() {
    const completedItems = this.#items.filter(todo => {
      return todo.completed === true;
    });
    return completedItems.length;
  }

  getPendingCount() {
    const pendingItems = this.#items.filter(todo => {
      return todo.completed === false;
    });
    return pendingItems.length;
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

  updateTodo({ id, completed }) {
    const todoItem = this.#items.find(todo => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  deleteTodo({ id }) {
    if(window.confirm("本当に削除してもよろしいですか?")){
      this.#items = this.#items.filter(todo => {
        return todo.id !== id;
      });
      this.emitChange();
    }
  }
}
