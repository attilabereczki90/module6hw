import React, { useState } from "react";
import {
  Button,
  Modal,
} from "react-bootstrap";
import { generateId } from "../../utils";

function EditDishes({ menuId, showEditDishes, isNew, closeEditDishes, saveDetailsChange }) {
  const [ menuItem, setMenuItem ] = useState(showEditDishes.item);
  const itemNameRef = React.createRef();
  const itemPriceRef = React.createRef();
  const itemQuantityRef = React.createRef();
  const ingredientsRef = React.createRef();

  const handlemenuItemChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      itemNameRef.current.classList.remove('is-invalid');
      itemNameRef.current.placeholder = '';
      if(!menuItem.id) {
        setMenuItem({
          ...menuItem,
          id: generateId(),
          name: value,
        });
      } else {
        setMenuItem({
          ...menuItem,
          name: value,
        });
      }
    } else {
      itemPriceRef.current.classList.remove('is-invalid');
      itemPriceRef.current.placeholder = '';
      itemQuantityRef.current.classList.remove('is-invalid');
      itemQuantityRef.current.placeholder = '';
      ingredientsRef.current.classList.remove('is-invalid');
      ingredientsRef.current.placeholder = '';
      setMenuItem({
        ...menuItem,
        [name]: value,
      });
    }
  }

  const saveChanges = () => {
    if(!validateInputFields()) {
      return;
    }

    saveDetailsChange(menuItem);
  }

  const closeModal = () => {
    setMenuItem({
      id: '',
      name: '',
      price: '',
      ingredients: '',
      quantity: '',
    });
    closeEditDishes();
  }

  const validateInputFields = () => {
    let isValid = true;
    if(!itemNameRef.current.value) {
      itemNameRef.current.classList.add('is-invalid');
      itemNameRef.current.placeholder = 'Meal name is required';
      isValid = false;
    }
    if(!itemPriceRef.current.value) {
      itemPriceRef.current.classList.add('is-invalid');
      itemPriceRef.current.placeholder = 'Meal price is required';
      isValid = false;
    }
    if(!itemQuantityRef.current.value) {
      itemQuantityRef.current.classList.add('is-invalid');
      itemQuantityRef.current.placeholder = 'Quantity of the meal is required';
      isValid = false;
    }
    if(!ingredientsRef.current.value) {
      ingredientsRef.current.classList.add('is-invalid');
      ingredientsRef.current.placeholder = 'Please provide ingredients';
      isValid = false;
    }

    return isValid;
  }

  return (
    <Modal
      show={showEditDishes.show}
      onShow={() => {
        const { id, name, price, ingredients, quantity } = showEditDishes.item;
        setMenuItem({
          id,
          name,
          price,
          ingredients,
          quantity,
        });
      }}
      onHide={() => closeModal()}
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isNew && 'Add Dish'}
          {!isNew && 'Edit Dish'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="menu-item-modal-name"
            value={menuItem.name}
            onChange={handlemenuItemChange}
            name="name"
            ref={itemNameRef}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            className="form-control"
            id="menu-item-modal-price"
            value={menuItem.price}
            onChange={handlemenuItemChange}
            name="price"
            ref={itemPriceRef}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <input
            className="form-control"
            id="menu-item-modal-ingredients"
            value={menuItem.ingredients}
            onChange={handlemenuItemChange}
            name='ingredients'
            ref={ingredientsRef}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            className="form-control"
            id="menu-item-modal-quantity"
            value={menuItem.quantity}
            onChange={handlemenuItemChange}
            name="quantity"
            ref={itemQuantityRef}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={() => saveChanges()}>
          {isNew && 'Add'}
          {!isNew && 'Save'}
        </Button>
        <Button variant="outline-danger" onClick={() => closeModal()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditDishes;