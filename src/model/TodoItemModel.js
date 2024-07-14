let todoIdx = 0;

export class TodoItemModel {
  id;
  title;
  completed;
  
  constructor({ title, completed }) {
    this.id = todoIdx++;
    this.title = title;
    this.completed = completed;
  }

  isEmptyTitle() {
    return this.title.length === 0;
  }
}