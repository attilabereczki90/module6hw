import { observable } from 'mobx';
import { persist } from 'mobx-persist';
import { generateId } from '../utils';

class MenuItem {
  @persist @observable id = '';
  @persist @observable name = '';
  @persist @observable ingredients = '';
  @persist @observable quantity = '';
  @persist @observable price = '';

  constructor(item = {id: generateId(), name: '', ingredients: '', quantity: '', price: ''}) {
    this.id = item.id;
    this.name = item.name;
    this.ingredients = item.ingredients;
    this.quantity = item.quantity;
    this.price = item.price;

    return this;
  }
}

export default MenuItem;