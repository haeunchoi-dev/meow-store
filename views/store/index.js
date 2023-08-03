export default class Store {
  constructor(name, callback) {
    const localStorage = window.localStorage;

    let itemlist;

    this.getLocalStorage = () => {
      return itemlist || JSON.parse(localStorage.getItem(name) || '[]');
    };

    this.setLocalStorage = (items) => {
      localStorage.setItem(name, JSON.stringify((itemlist = items)));
    };

    this.removeLocalStorage = () => {
      itemlist = null;
      localStorage.removeItem(name);
    };

    if (callback) {
      callback();
    }
  }

  selectAll() {
    return [...this.getLocalStorage()];
  }

  findById(id, callback) {
    const items = this.getLocalStorage();
    let i = items.length;

    let findItem = null;
    while (i--) {
      if (items[i]._id === id) {
        findItem = { ...items[i] };
        break;
      }
    }

    if (callback) {
      callback(findItem);
    }

    return findItem;
  }

  find(query, callback) {
    const items = this.getLocalStorage();
    let k;
    const findItems = items.filter((item) => {
      for (k in query) {
        if (query[k] !== item[k]) {
          return false;
        }
      }
      return true;
    });

    if (callback) {
      callback(findItems);
    }

    return findItems;
  }

  update(update, callback) {
    const id = update.id;
    const items = this.getLocalStorage();
    let i = items.length;
    let k;

    while (i--) {
      if (items[i]._id === id) {
        for (k in update) {
          items[i][k] = update[k];
        }
        break;
      }
    }

    this.setLocalStorage(items);

    if (callback) {
      callback([...items]);
    }
  }

  insert(item, callback) {
    const items = this.getLocalStorage();
    items.push(item);
    this.setLocalStorage(items);

    if (callback) {
      callback([...items]);
    }
  }

  remove(query, callback) {
    let k;

    const items = this.getLocalStorage().filter((item) => {
      for (k in query) {
        if (query[k] !== item[k]) {
          return true;
        }
      }
      return false;
    });

    this.setLocalStorage(items);

    if (callback) {
      callback([...items]);
    }
  }

  removeAll() {
    this.removeLocalStorage();
  }

  count(query, callback) {
    const cnt = this.find(query).length;
    if (callback) {
      callback(cnt);
    }
    return cnt;
  }
}
