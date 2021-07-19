import React, { Component } from "react";
import {
  Button,
  Modal,
} from "react-bootstrap";
import { generateId } from "../../utils";

class EditDishesModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menuItem: this.props.showEditDishesModal.item,
    };
    
    this.itemNameRef = React.createRef();
    this.itemPriceRef = React.createRef();
    this.itemQuantityRef = React.createRef();
    this.ingredientsRef = React.createRef();
  }

  handlemenuItemChange = (event) => {
    const { menuItem } = this.state;
    const { name, value } = event.target;
    if (name === 'name') {
      this.itemNameRef.current.classList.remove('is-invalid');
      this.itemNameRef.current.placeholder = '';
      if(!menuItem.id) {
        menuItem.id = generateId();
      }
      menuItem.name = value;
    } else {
      this.itemPriceRef.current.classList.remove('is-invalid');
      this.itemPriceRef.current.placeholder = '';
      this.itemQuantityRef.current.classList.remove('is-invalid');
      this.itemQuantityRef.current.placeholder = '';
      this.ingredientsRef.current.classList.remove('is-invalid');
      this.ingredientsRef.current.placeholder = '';
      menuItem[name] = value;
    }
    this.setState({ menuItem });
  }

  saveChanges = () => {
    if(!this.validateInputFields()) {
      return;
    }

    this.props.saveDetailsChange(this.state.menuItem);
  }

  closeModal = () => {
    this.setState({menuItem: {
      id: '',
      name: '',
      price: '',
      ingredients: '',
      quantity: '',
    }}, () => {
      this.props.closeEditDishesModal();
    });
  }

  validateInputFields = () => {
    let isValid = true;
    if(!this.itemNameRef.current.value) {
      this.itemNameRef.current.classList.add('is-invalid');
      this.itemNameRef.current.placeholder = 'Meal name is required';
      isValid = false;
    }
    if(!this.itemPriceRef.current.value) {
      this.itemPriceRef.current.classList.add('is-invalid');
      this.itemPriceRef.current.placeholder = 'Meal price is required';
      isValid = false;
    }
    if(!this.itemQuantityRef.current.value) {
      this.itemQuantityRef.current.classList.add('is-invalid');
      this.itemQuantityRef.current.placeholder = 'Quantity of the meal is required';
      isValid = false;
    }
    if(!this.ingredientsRef.current.value) {
      this.ingredientsRef.current.classList.add('is-invalid');
      this.ingredientsRef.current.placeholder = 'Please provide ingredients';
      isValid = false;
    }

    return isValid;
  }

  render() {
    const { menuItem } = this.state;

    return (
      <Modal
        show={this.props.showEditDishesModal.show}
        onShow={() => {
          this.setState({ menuItem: {
            id: this.props.showEditDishesModal.item.id,
            name: this.props.showEditDishesModal.item.name,
            price: this.props.showEditDishesModal.item.price,
            ingredients: this.props.showEditDishesModal.item.ingredients,
            quantity: this.props.showEditDishesModal.item.quantity,
          } });
        }}
        onHide={() => this.props.closeEditDishesModal()}
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.isNew && 'Add New Dish'}
            {!this.props.isNew && 'Edit Existing Dish'}
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
              onChange={this.handlemenuItemChange}
              name="name"
              ref={this.itemNameRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              className="form-control"
              id="menu-item-modal-price"
              value={menuItem.price}
              onChange={this.handlemenuItemChange}
              name="price"
              ref={this.itemPriceRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            <input
              className="form-control"
              id="menu-item-modal-ingredients"
              value={menuItem.ingredients}
              onChange={this.handlemenuItemChange}
              name='ingredients'
              ref={this.ingredientsRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              className="form-control"
              id="menu-item-modal-quantity"
              value={menuItem.quantity}
              onChange={this.handlemenuItemChange}
              name="quantity"
              ref={this.itemQuantityRef}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={() => this.saveChanges()}>
            Save
          </Button>
          <Button variant="outline-danger" onClick={() => this.closeModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditDishesModal;