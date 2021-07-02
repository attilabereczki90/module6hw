import {
  observable,
  action,
} from "mobx";
import MenuList from "./MenuList";
import MenuItem from "./MenuItem";
import { create, persist } from "mobx-persist";
import localForage from "localforage";

const hydrate = create({
  storage: localForage,
  jsonify: true,
});

class MenuStore {
  @persist('object') @observable menus = new MenuList();

  constructor() {
    this.init();
    hydrate('menulist', this.menus);
  }

  @action
  addMenuItem(menuId, menuItem) {
    const item = new MenuItem(menuItem);
    this.menus.addItemToList(menuId,item);
  }

  @action
  updateMenuItem(menuId, menuItem) {
    console.log('store', menuId, menuItem)
    this.menus.getMenuItemById(menuId, menuItem.id).updateMenuItem(menuItem);
  }

  @action
  deleteMenuItem(menuId, itemId) {
    this.menus.removeItem(menuId, itemId);
  }

  @action
  init() {
    this.menus.createMenu({
      id: "menu-starters",
      name: "Starters",
      description: "Prepare your tummy for happy meal",
      itemList: [],
    });

    const bread = new MenuItem({id: 'bread-item', name: 'Garlic bread', ingredients: 'freshly toasted garlic bread', quantity: '350g', price: '5.00$' });
    const bruschetta = new MenuItem({id: 'bruschetta-item', name: 'Bruschetta', ingredients: 'freshly toasted garlic bread with bruschetta topping', quantity: '350g', price: '8.50$' });
    const pulledPork = new MenuItem({id: 'pulled-pork-item', name: 'BBQ Pulled pork crepe', ingredients: 'topped with grilled cheese', quantity: '350g', price: '13.50$' });
    const onionRings = new MenuItem({id: 'onion-rings-item', name: 'Onion rings house made', ingredients: 'beer battered onion rings served with spicy mayo', quantity: '350g', price: '6.50$' });
    const tomato = new MenuItem({id: 'tomato-chilli-item', name: 'Tomato chilli prawns', ingredients: 'served with crispy bacon and basmati rice', quantity: '350g', price: '12.00$' });
          
    this.menus.addItemToList("menu-starters",bread);
    this.menus.addItemToList("menu-starters",bruschetta);
    this.menus.addItemToList("menu-starters",pulledPork);
    this.menus.addItemToList("menu-starters",onionRings);
    this.menus.addItemToList("menu-starters",tomato);

    this.menus.createMenu({
      id: "menu-mains",
      name: "Mains",
      description: "For full lunch",
      itemList: [],
    });

    const grilledChicken = new MenuItem({id: 'grilled-chicken-item', name: 'Grilled chicken breast', ingredients: 'topped with avocado & tomato salsa, balsamic glaze', quantity: '350g', price: '18.90$' });
    const mainatedPork = new MenuItem({id: 'mainated-pork-item', name: 'Marinated pork cutlet', ingredients: 'served with home-made chilli jam', quantity: '350g', price: '23.90$' });
    const slowPork = new MenuItem({id: 'slow-pork-item', name: 'Slow cooked pork ribs', ingredients: 'USA pork rib with a home-made smoky BBQ Bourbon sauce, served with coleslaw and chips', quantity: '350g', price: '27.90$' });

    this.menus.addItemToList("menu-mains",grilledChicken);
    this.menus.addItemToList("menu-mains",mainatedPork);
    this.menus.addItemToList("menu-mains",slowPork);

    this.menus.createMenu({
      id: "menu-vegetarian",
      name: "Vegetarian",
      description: "If you like animals",
      itemList: [],
    });

    const thaiCurry = new MenuItem({id: 'thai-curry-item', name: 'Red thai vegetable curry', ingredients: 'served with basmati rice', quantity: '350g', price: '14.90$' });
    const fettuccine =  new MenuItem({id: 'fettuccine-item', name: 'Fettucccine alfredo', ingredients: 'with a cashew based sauce, mushrooms, broccoli & peas', quantity: '350g', price: '16.90$' });
    const pumpkin = new MenuItem({id: 'pumpkin-and-spinach-item', name: 'Pumpkin and spinach risotto', ingredients: 'arborio rice, cream & parmesan', quantity: '350g', price: '17.90$' });
    const cabbageLeaf = new MenuItem({id: 'cabbage-leaf-item', name: 'Cabbage leaf', ingredients: 'filled with seasonal vegetables and walnuts served with potato, carrot, turnip and a cashew based mushroom sauce', quantity: '350g', price: '18.90$' });

    this.menus.addItemToList("menu-vegetarian",thaiCurry);
    this.menus.addItemToList("menu-vegetarian",fettuccine);
    this.menus.addItemToList("menu-vegetarian",pumpkin);
    this.menus.addItemToList("menu-vegetarian",cabbageLeaf);
  }
}

const store = new MenuStore();
export default store;