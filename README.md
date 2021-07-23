## Description

Pub menu

Create the front-end for a web application that manages the menus of a pub. A menu is a list of items (food, drinks, snacks, etc.) that the pub sells containing their names, main ingredients and prices.

Features:

* Create main page with all the menu titles, which are clickable and lead to the menu details pages.
* On the main page create an „Add new menu” button with that we can add a new menu with the following details:
    * Name (e.g. food menu, drinks, wine menu, cocktails, etc.)
    * Id (for routing, e.g. food-menu)
    * Description

Any number of new menus can be added.

* Clicking on the individual menus leads us to the menu details page, listing all the contents of the menu and a button for „Add new item” clicking on which we can add a new item with the following details:
    * Name
    * Main ingredients
    * Quantity (e.g. 200gr, 300ml)
    * Price

All items that we created must be editable. The create/edit features can be implemented either by using a modal dialog or a new page. Routes must be created for homepage and the menu details pages (and the edit pages if that approach is chosen).

State management should be used. Data should be saved into local storage and reloaded at browser refresh as initial state.

Possible technologies to choose from:

* Angular + NgRx/store
* React + MobX
* Vue + Vuex