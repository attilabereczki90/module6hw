import * as _ from 'lodash';
import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import MenuItem from './MenuItem';

export class MenuSchema {
  @persist @observable id : string = '';
  @persist @observable name : string = ''; 
  @persist @observable description : string = '';
  @persist('list') @observable itemList : MenuItem[] = [];
}

export default class MenuList {
  @persist('list', MenuSchema) @observable.deep list = observable.array<MenuSchema>([]);

  @action
  getMenuById(menuId : string) : MenuSchema | undefined {
    return _.find(this.list, (menu : MenuSchema) => menu.id === menuId);
  }

  @action
  createMenu(menu : MenuSchema = { id: '', name: '', description: '', itemList: [] }) : MenuSchema {
    const items : Array<MenuItem> = [];
    if(menu.itemList.length > 0) {
      const itemList : Array<MenuItem> = menu.itemList;
      for(const item of itemList) {
        items.push(new MenuItem(item));
      }
    }
    menu.itemList = items;
    this.list.push(menu);
    return menu;
  }

  @action
  updateMenu(menuId : string, key : keyof MenuSchema, value : string) : void {
    const menuIndexAtId : number = this.list.findIndex(
      (menu) => menu.id === menuId
    );
    console.log(menuIndexAtId, key)
    /*if (menuIndexAtId > -1 && key && value) {
      const menuKey : (keyof MenuSchema) = key;
      this.list[menuIndexAtId][key] = value;
    }*/
  }

  @action
  deleteMenu(menuId : string) : void {
    const menuIndexAtId = this.list.findIndex((menu) => menu.id === menuId);
    if (menuIndexAtId > -1) {
      this.list.splice(menuIndexAtId, 1);
    }
  }

  @action
  addItemToList(menuId : string, item : MenuItem) : void {
    const menuIndexAtId = this.list.findIndex((menu) => menu.id === menuId);
    if(menuIndexAtId > -1) {
      this.list[menuIndexAtId].itemList.push(item);
    }
  }

  @action
  removeItem(menuId : string, itemId : string) : void {
    const menuIndexAtId = this.list.findIndex((menu) => menu.id === menuId);
    if(menuIndexAtId > -1) {
      const itemIndexAtId = this.list[menuIndexAtId].itemList.findIndex((item) => item.id === itemId);
      this.list[menuIndexAtId].itemList.splice(itemIndexAtId, 1);
    }
  }

  @action
  getMenuItemById(menuId : string, itemId : string) : MenuItem {
    let menuItem = new MenuItem();
    const menuIndexAtId : number = this.list.findIndex((menu) => menu.id === menuId);
    if(menuIndexAtId > -1) {
      const itemIndexAtId : number = this.list[menuIndexAtId].itemList.findIndex((item) => {
        return item.id === itemId
      });
      if(itemIndexAtId > -1) {
        return this.list[menuIndexAtId].itemList[itemIndexAtId];
      }
    }
    return menuItem;
  }

}