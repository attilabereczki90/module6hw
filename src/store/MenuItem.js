import { action, makeObservable, observable } from 'mobx';

class MenuItem {
  id = '';
  name = '';
  mainIngredients = '';
  quantity = '';
  price = '';

  constructor({id = '', name = '', mainIngredients = '', quantity = '', price = ''}) {
    this.id = id;
    this.name = name;
    this.mainIngredients = mainIngredients;
    this.quantity = quantity;
    this.price = price;

    makeObservable(this, {
      id: observable,
      name: observable,
      mainIngredients: observable,
      quantity: observable,
      price: observable,
      updateMenuItem: action,
    });

    return this;
  }

  updateMenuItem(menuItem) {
    for (const [key, value] of Object.entries(menuItem)) {
      this[key] = value;
    }
  }
}

export default MenuItem;