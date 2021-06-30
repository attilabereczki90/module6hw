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
      menus: observable,
      addMenuItem: action,
      deleteMenuItem: action,
    });
  }

  addMenuItem(menuId, menuItem) {
    const item = new MenuItem(menuItem);
    this.menus.getMenuById(menuId)?.itemList?.push(item);
  }

  deleteMenuItem(menuId, itemName) {
    this.menus.getMenuById(menuId)?.itemList?.filter(item => item.name === itemName);
  }

/*
  // Get menu using menuId
  getMenuById(menuId) {
    return _.find(this.menus, menu => menu?.id === menuId);
  }

  getMenuItems(menuId) {
    return _.find(this.menuList, (menu) => menu.id === menuId).menuItems;
  }

  createMenu(menu = { id: '', name: '', description: '', menuItems: [] }) {
    this.menuList.push(menu);
    return menu;
  }

  createAndAddMenuItem(menuId, menuItem = { id: '', name: '', price: 0, quantity: '', ingredients: [] }) {
    this.getMenuById(menuId)?.menuItems.push(menuItem);
  }

  updateMenu(menuId, menu) {
    const menuIndexAtId = this.menuList.findIndex(
      (menu) => menu.id === menuId
    );
    if (menuIndexAtId > -1 && menu) {
      this.menuList[menuIndexAtId] = menu;
    }
  }

  updateMenuItem(menuId, menuItem) {
    const menuIndexAtId = this.menuList.findIndex(
      (menu) => menu.id === menuId
    );
    const menuItemIndex = this.menuList[menuIndexAtId]?.menuItems.findIndex(
      (item) => item.id === menuItem.id
    ) || -1;
    if(menuItemIndex > -1 && menuItem) {
      this.menuList[menuIndexAtId].menuItems[menuItemIndex] = menuItem;
    }
  }

  deleteMenu(menuId) {
    const menuIndexAtId = this.menuList.findIndex((menu) => menu.id === menuId);
    if (menuIndexAtId > -1) {
      this.menuList.splice(menuIndexAtId, 1);
    }
  }

  deleteMenuItem(menuId, menuItemId) {
    const menuIndexAtId = this.menuList.findIndex(
      (menu) => menu.id === menuId
    );
    const menuItemIndex = this.menuList[menuIndexAtId]?.menuItems.findIndex(
      (item) => item.id === menuItemId
    ) || -1;
    if(menuItemIndex > -1) {
      this.menuList[menuIndexAtId].menuItems.splice(menuItemIndex, 1);
    }
  }

  get storeDetails() {
    return `We have ${this.allMenu} number of menus , choose what you like!`;
  }

  logStoreDetails() {
    console.log(this.storeDetails);
  }

  prefetchData = () => {
    const menus = [
      {
        id: "menu-starters",
        name: "Starters",
        description: "Prepare your tummy for happy meal",
        menuItems: [
          {
            id: "component-bread",
            parentId: "menu-starters",
            name: "Bread",
            price: 16.88,
            ingredients: [
              { value: "flour", label: "Flour" },
              { value: "salt", label: "Salt" }
            ],
            quantity: '350g',
          },
          {
            id: "component-tapas",
            parentId: "menu-starters",
            name: "Tapas",
            price: 23.76,
            ingredients: [
              { value: "salt", label: "Salt" },
              { value: "pepper", label: "Pepper" }
            ],
            quantity: '310ml',
          }
        ],
      },
      {
        id: "menu-soups",
        name: "Soups",
        description: "Enjoy fancy ingredients in water",
        menuItems: [
          {
            id: "component-tomato-soup",
            parentId: "menu-soups",
            name: "Tomato Soup",
            price: 41.1,
            ingredients: [
              { value: "tomato", label: "Tomato" },
              { value: "water", label: "Water" }
            ],
            quantity: '300ml',
          },
          {
            id: "component-creamy-broccoli",
            parentId: "menu-soups",
            name: "Creamy Broccoli",
            price: 1.62,
            ingredients: [
              { value: "broccoli", label: "Broccoli" },
              { value: "water", label: "Water" }
            ],
            quantity: '322ml',
          }
        ],
      }
    ];

    setTimeout(() => {
      console.log("Fetch complete update store");
      menus.map((menu) => this.createMenu(menu));
    }, 3000);
  };*/
}

export default MenuStore;
