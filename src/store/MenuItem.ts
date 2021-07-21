import { observable } from 'mobx';
import { persist } from 'mobx-persist';
import { MenuItemInterface } from '../types';
import { generateId } from '../utils';

export default class MenuItem {
  @persist @observable id = '';
  @persist @observable name = '';
  @persist @observable ingredients = '';
  @persist @observable quantity = '';
  @persist @observable price = '';

  constructor(item : MenuItemInterface = {id: generateId(), name: '', ingredients: '', quantity: '', price: ''}) {
    this.id = item.id;
    this.name = item.name;
    this.ingredients = item.ingredients;
    this.quantity = item.quantity;
    this.price = item.price;

    return this;
  }
}