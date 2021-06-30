/* import React from "react";
import { observer } from "mobx-react-lite";

function MenuItemList({ store, menuId }) {
  const handleUpdateItem = (menuItem) => {
    menuItem.id = prompt("ID", menuItem.id);
    menuItem.name = prompt("name", menuItem.name);
    menuItem.price = prompt("price", menuItem.price);
    menuItem.quantity = prompt("quantity", menuItem.quantity);
    store.updateMenuItem(menuId, menuItem);
  };

  const handleDeleteItem = (menuItem) => {
    store.deleteMenuItem(menuId, menuItem.id);
  };

  return (
    <div>
      {store.storeDetails}
      <table>
        <thead>
          <tr>
            <th>##</th>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {store.getMenuById(menuId).menuItems.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    style={{ marginRight: "1rem" }}
                  >
                    Delete {item.name}
                  </button>
                  <button onClick={() => handleUpdateItem(item)}>
                    Update {item.name}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default observer(MenuItemList); */