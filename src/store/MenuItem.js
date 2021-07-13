import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { generateId } from '../utils';

class MenuItem {
  @persist @observable id = '';
  @persist @observable name = '';
  @persist @observable ingredients = '';
  @persist @observable quantity = '';
  @persist @observable price = '';

  constructor({id = generateId(), name = '', ingredients = '', quantity = '', price = ''}) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.quantity = quantity;
    this.price = price;
  }

  @action
  updateMenuItem(menuItem) {
    for (const [key, value] of Object.entries(menuItem)) {
      this[key] = value;
    }
  }
}

export default MenuItem;