import {
  observable,
  action,
} from "mobx";
import MenuList from "./MenuList";
import MenuItem from "./MenuItem";
import { create, persist } from "mobx-persist";
import localForage from "localforage";
import { generateId } from "../utils";

const hydrate = create({
  storage: localForage,
  jsonify: true,
});

class MenuStore {
  @persist('object') @observable menus = new MenuList();

  constructor() {
    hydrate('menulist', this.menus)
    .then((menus) => {
      return menus.list.length;
    })
    .then((menuListLength) => {
      if(menuListLength === 0) {
        this.init()
      }
    });
  }

  @action
  addMenuItem(menuId, menuItem) {
    const item = new MenuItem(menuItem);
    this.menus.addItemToList(menuId,item);
  }

  @action
  updateMenuItem(menuId, menuItem) {
    this.menus.getMenuById(menuId).itemList.forEach((item) => {
      if(item.id === menuItem.id) {
        for (const [key, value] of Object.entries(menuItem)) {
          item[key] = value;
        }
      }
    });
  }

  @action
  deleteMenuItem(menuId, itemId) {
    this.menus.removeItem(menuId, itemId);
  }

  @action
  init() {
    let id = generateId();
    this.menus.createMenu({
      id,
      name: "Starters",
      description: "Prepare your tummy for happy meal",
      itemList: [],
    });

    const bread = new MenuItem({id: generateId(), name: 'Garlic bread', ingredients: 'freshly toasted garlic bread', quantity: '350g', price: '5.00$' });
    const bruschetta = new MenuItem({id: generateId(), name: 'Bruschetta', ingredients: 'freshly toasted garlic bread with bruschetta topping', quantity: '350g', price: '8.50$' });
    const pulledPork = new MenuItem({id: generateId(), name: 'BBQ Pulled pork crepe', ingredients: 'topped with grilled cheese', quantity: '350g', price: '13.50$' });
    const onionRings = new MenuItem({id: generateId(), name: 'Onion rings house made', ingredients: 'beer battered onion rings served with spicy mayo', quantity: '350g', price: '6.50$' });
    const tomato = new MenuItem({id: generateId(), name: 'Tomato chilli prawns', ingredients: 'served with crispy bacon and basmati rice', quantity: '350g', price: '12.00$' });
          
    this.menus.addItemToList(id,bread);
    this.menus.addItemToList(id,bruschetta);
    this.menus.addItemToList(id,pulledPork);
    this.menus.addItemToList(id,onionRings);
    this.menus.addItemToList(id,tomato);

    id = generateId();
    this.menus.createMenu({
      id,
      name: "Mains",
      description: "For full lunch",
      itemList: [],
    });

    const grilledChicken = new MenuItem({id: generateId(), name: 'Grilled chicken breast', ingredients: 'topped with avocado & tomato salsa, balsamic glaze', quantity: '350g', price: '18.90$' });
    const mainatedPork = new MenuItem({id: generateId(), name: 'Marinated pork cutlet', ingredients: 'served with home-made chilli jam', quantity: '350g', price: '23.90$' });
    const slowPork = new MenuItem({id: generateId(), name: 'Slow cooked pork ribs', ingredients: 'USA pork rib with a home-made smoky BBQ Bourbon sauce, served with coleslaw and chips', quantity: '350g', price: '27.90$' });

    this.menus.addItemToList(id,grilledChicken);
    this.menus.addItemToList(id,mainatedPork);
    this.menus.addItemToList(id,slowPork);

    id = generateId();
    this.menus.createMenu({
      id,
      name: "Vegetarian",
      description: "If you like animals",
      itemList: [],
    });

    const thaiCurry = new MenuItem({id: generateId(), name: 'Red thai vegetable curry', ingredients: 'served with basmati rice', quantity: '350g', price: '14.90$' });
    const fettuccine =  new MenuItem({id: generateId(), name: 'Fettucccine alfredo', ingredients: 'with a cashew based sauce, mushrooms, broccoli & peas', quantity: '350g', price: '16.90$' });
    const pumpkin = new MenuItem({id: generateId(), name: 'Pumpkin and spinach risotto', ingredients: 'arborio rice, cream & parmesan', quantity: '350g', price: '17.90$' });
    const cabbageLeaf = new MenuItem({id: generateId(), name: 'Cabbage leaf', ingredients: 'filled with seasonal vegetables and walnuts served with potato, carrot, turnip and a cashew based mushroom sauce', quantity: '350g', price: '18.90$' });

    this.menus.addItemToList(id,thaiCurry);
    this.menus.addItemToList(id,fettuccine);
    this.menus.addItemToList(id,pumpkin);
    this.menus.addItemToList(id,cabbageLeaf);
  }
}

const store = new MenuStore();
export default store;