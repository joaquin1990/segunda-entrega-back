export default class MemoryContainer {
  constructor() {
    this.container = [];
  }
  getAll = () => {
    return this.container;
  };
  save = (item) => {
    this.container.push(item);
    return item;
  };
}
