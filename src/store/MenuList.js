import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import MenuItem from './MenuItem';

class MenuList {
  list = [];

  constructor() {
    makeObservable(this, {
      list: observable.deep,
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
          new MenuItem({id: 'bread-item', name: 'Bread', mainIngredients: 'flour, salt', quantity: '350g', price: '16.88$' }),
          new MenuItem({id: 'tapas-item', name: 'Tapas', mainIngredients: 'salt, pepper', quantity: '310ml', price: '23.76$' }),
        ],
      },
      {
        id: "menu-soups",
        name: "Soups",
        description: "Enjoy fancy ingredients in water",
        itemList: [
          new MenuItem({id: 'tomato-item', name: 'Tomato Soup', mainIngredients: 'tomato, water', quantity: '300ml', price: '41.1$' }),
          new MenuItem({id: 'broccoli-item', name: 'Creamy Broccoli', mainIngredients: 'broccoli, water', quantity: '322ml', price: '1.62$' }),
        ],
      }
    ];
  }

  getMenuById(menuId) {
    return _.find(this.list, menu => menu.id === menuId);
  }

  createMenu(menu = { id: '', name: '', description: '', itemList: [] }) {
    const items = [];
    if(menu.itemList.length > 0) {
      for(const item in menu.itemList) {
        items.push(new MenuItem(item));
      }
    }
    menu.itemList = items;
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

  addItemToList(menuId, item) {
    const menuIndexAtId = this.list.findIndex((menu) => menu.id === menuId);
    if(menuIndexAtId > -1) {
      this.list[menuIndexAtId].itemList.push(item);
    }
  }

  removeItem(menuId, itemId) {
    const menuIndexAtId = this.list.findIndex((menu) => menu.id === menuId);
    if(menuIndexAtId > -1) {
      const itemIndexAtId = this.list[menuIndexAtId].itemList.findIndex((item) => item.id === itemId);
      this.list[menuIndexAtId].itemList.splice(itemIndexAtId, 1);
    }
  }

  getMenuItemById(menuId, itemId) {
    const menuIndexAtId = this.list.findIndex((menu) => menu.id === menuId);
    if(menuIndexAtId > -1) {
      const itemIndexAtId = this.list[menuIndexAtId].itemList.findIndex((item) => item.id === itemId);
      if(itemIndexAtId > -1) {
        return this.list[menuIndexAtId].itemList[itemIndexAtId];
      }
    }
    return;
  }

}

export default MenuList;