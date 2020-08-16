export default class StoreLocal {
  constructor(props) {
    this.storeName = props;
  }
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.storeName));
    } catch (err) {
      return {};
    }
  }

  deleteItem(id) {
    const all = this.getAll();
    const index = all.findIndex((it) => it.id === id);
    if (index === -1) {
      return;
    }
    const firstToNewList = all.slice(0, index);

    const newToLastList = all.slice(index + 1);
    const newAll = [].concat(firstToNewList, newToLastList);
    localStorage.setItem(this.storeName, JSON.stringify(newAll));
  }

  setItems(data) {
    const all = this.getAll() || [];
    all.push(data);
    localStorage.setItem(this.storeName, JSON.stringify(all));
  }
  setItem(data) {
    localStorage.setItem(this.storeName, JSON.stringify(data));
  }
  clear() {
    localStorage.removeItem(this.storeName);
  }

  setKey(key, value) {
    const all = this.getAll();
    all[0][key] = value;
    localStorage.setItem(this.storeName, JSON.stringify(all));
  }
}

