import {
  makeObservable,
  observable,
  action,
} from "mobx";
import MenuList from "./MenuList";
import MenuItem from "./MenuItem";

class MenuStore {
  menus = new MenuList();

  constructor() {
    makeObservable(this, {
      menus: observable.deep,
      addMenuItem: action,
      deleteMenuItem: action,
      updateMenuItem: action,
    });
  }

  addMenuItem(menuId, menuItem) {
    const item = new MenuItem(menuItem);
    this.menus.addItemToList(menuId,item);
  }

  updateMenuItem(menuId, menuItem) {
    this.menus.getMenuItemById(menuId, menuItem.id)?.updateMenuItem(menuItem);
  }

  deleteMenuItem(menuId, itemId) {
    this.menus.removeItem(menuId, itemId);
  }
}

export default MenuStore;
