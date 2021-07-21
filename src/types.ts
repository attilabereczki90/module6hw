import MenuListComponent from "./components/MenuListComponent";
import { MenuSchema } from "./store/MenuList";

export interface IPropsMainPage {
}

export interface IStateMainPage {
  showAddMenu: IShowAddMenu;
  selectedTab: string;
}

export interface IShowAddMenu {
  menu: IMenu | MenuSchema | undefined;
  show: boolean;
}

export interface IShowEditDishes {
    item: MenuItemInterface;
    show: boolean;
  }

export interface IMenu {
  id: string;
  name: string | undefined;
  description: string | undefined;
}

export interface IPropsMenuListComponent {
    id: string;
}

export interface IStateMenuListComponent {
    showEditMenu: IShowAddMenu;
    showEditDishesModal: IShowEditDishes;
    navigate: boolean;
    isNew: boolean;
}

export interface IPropsMenuItemListComponent {
    key: string;
    menuId: string;
    menuItemId: string;
    removeItem: MenuListComponent['removeItem'];
    showModal: MenuListComponent['showModal'];
}

export interface MenuItemInterface {
    id: string, 
    name: string, 
    ingredients: string, 
    quantity: string, 
    price: string,
  };