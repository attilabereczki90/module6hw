import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import MenuItem from './MenuItem';

class MenuList {
  list = [];

  constructor() {
    makeObservable(this, {
      list: observable,
      getMenuById: action,
      createMenu: action,
      updateMenu: action,
      deleteMenu: action,
    });

    this.init();
  }

  init() {
    this.list = [
      {
        id: "menu-starters",
        name: "Starters",
        description: "Prepare your tummy for happy meal",
        itemList: [
          new MenuItem({name: 'Bread', mainIngredients: [
            { value: "flour", label: "Flour" },
            { value: "salt", label: "Salt" },
            ] , quantity: '350g', price: 16.88 }),
          new MenuItem({name: 'Tapas', mainIngredients: [
            { value: "salt", label: "Salt" },
            { value: "pepper", label: "Pepper" },
            ] , quantity: '310ml', price: 23.76 }),
        ],
      },
      {
        id: "menu-soups",
        name: "Soups",
        description: "Enjoy fancy ingredients in water",
        itemList: [
          new MenuItem({name: 'Tomato Soup', mainIngredients: [
            { value: "tomato", label: "Tomato" },
            { value: "water", label: "Water" },
            ] , quantity: '300ml', price: 41.1 }),
          new MenuItem({name: 'Creamy Broccoli', mainIngredients: [
            { value: "broccoli", label: "Broccoli" },
            { value: "water", label: "Water" },
            ] , quantity: '322ml', price: 1.62 }),
        ],
      }
    ];
  }

  getMenuById(menuId) {
    return _.find(this.list, menu => menu?.id === menuId);
  }

  createMenu(menu = { id: '', name: '', description: '', itemList: new MenuItem() }) {
    this.list.push(menu);
    return menu;
  }

  updateMenu(menuId, key, value) {
    const menuIndexAtId = this.list.findIndex(
      (menu) => menu.id === menuId
    );
    if (menuIndexAtId > -1 && key && value) {
      this.list[menuIndexAtId][key] = value;
    }
  }

  deleteMenu(menuId) {
    const menuIndexAtId = this.list.findIndex((menu) => menu.id === menuId);
    if (menuIndexAtId > -1) {
      this.list.splice(menuIndexAtId, 1);
    }
  }
}

export default MenuList;