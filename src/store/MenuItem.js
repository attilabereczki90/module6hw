import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

class MenuItem {
  @persist @observable id = '';
  @persist @observable name = '';
  @persist @observable ingredients = '';
  @persist @observable quantity = '';
  @persist @observable price = '';

  constructor({id = '', name = '', ingredients = '', quantity = '', price = ''}) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.quantity = quantity;
    this.price = price;

    return this;
  }

  @action
  updateMenuItem(menuItem) {
    console.log('updateMenuItem', menuItem)
    for (const [key, value] of Object.entries(menuItem)) {
      this[key] = value;
    }
  }
}

export default MenuItem;