const menuList = [
  {
    id: "menu-starters",
    name: "Starters",
    description: "Prepare your tummy for happy meal",
    menuContents: [
      {
        id: "component-bread",
        parentId: "menu-starters",
        name: "Bread",
        price: 16.88,
        ingredients: [
          { value: "flour", label: "Flour" },
          { value: "salt", label: "Salt" }
        ],
        quantity: 350,
        measurement: "Gr"
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
        quantity: 310,
        measurement: "Ml"
      }
    ]
  },
  {
    id: "menu-soups",
    name: "Soups",
    description: "Enjoy fancy ingredients in water",
    menuContents: [
      {
        id: "component-tomato-soup",
        parentId: "menu-soups",
        name: "Tomato Soup",
        price: 41.1,
        ingredients: [
          { value: "tomato", label: "Tomato" },
          { value: "water", label: "Water" }
        ],
        quantity: 300,
        measurement: "Ml"
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
        quantity: 322,
        measurement: "Ml"
      }
    ]
  }
];

export default menuList;