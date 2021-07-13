import _ from 'lodash';
import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import MenuItem from './MenuItem';

class MenuList {
  @persist('list') @observable.deep list = [];

  @action
  getMenuById(menuId) {
    return _.find(this.list, menu => menu.id === menuId);
  }

  @action
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

  @action
  updateMenu(menuId, key, value) {
    const menuIndexAtId = this.list.findIndex(
      (menu) => menu.id === menuId
    );
    if (menuIndexAtId > -1 && key && value) {
      this.list[menuIndexAtId][key] = value;
    }
  }

  @action
  deleteMenu(menuId) {
    const menuIndexAtId = this.list.findIndex((menu) => menu.id === menuId);
    if (menuIndexAtId > -1) {
      this.list.splice(menuIndexAtId, 1);
    }
  }

  @action('ADD')
  addItemToList(menuId, item) {
    const menuIndexAtId = this.list.findIndex((menu) => menu.id === menuId);
    if(menuIndexAtId > -1) {
      this.list[menuIndexAtId].itemList.push(item);
    }
  }

  @action
  removeItem(menuId, itemId) {
    const menuIndexAtId = this.list.findIndex((menu) => menu.id === menuId);
    if(menuIndexAtId > -1) {
      const itemIndexAtId = this.list[menuIndexAtId].itemList.findIndex((item) => item.id === itemId);
      this.list[menuIndexAtId].itemList.splice(itemIndexAtId, 1);
    }
  }

  @action
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