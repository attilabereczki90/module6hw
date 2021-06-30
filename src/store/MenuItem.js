import { action, makeObservable, observable } from 'mobx';

class MenuItem {
  item = '';

  constructor(menuItem = {name: '', mainIngredients: [], quantity: '', price: 0 }) {
    this.item = menuItem;
    makeObservable(this, {
      item: observable,
      updateMenuItem: action,
    });

    return this;
  }

  updateMenuItem(key, value) {
    if(this.item[key]) {
      this.item[key] = value;
    }
  }
}

export default MenuItem;