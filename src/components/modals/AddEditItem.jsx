import React, { Component } from "react";
import {
  Button,
  Modal,
} from "react-bootstrap";
import { generateId } from "../../utils";

class AddEditItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newItem: {
        name: '',
        price: '',
        ingredients: '',
        quantity: '',
      },
    };
    
    this.itemNameRef = React.createRef();
    this.itemPriceRef = React.createRef();
    this.itemQuantityRef = React.createRef();
    this.ingredientsRef = React.createRef();
  }

  handleNewItemChange = (event) => {
    const { newItem } = this.state;
    const { name, value } = event.target;
    if (name === 'name') {
      this.itemNameRef.current.classList.remove('is-invalid');
      this.itemNameRef.current.placeholder = '';
      if(!newItem.id) {
        newItem.id = generateId();
      }
      newItem.name = value;
    } else {
      this.itemPriceRef.current.classList.remove('is-invalid');
      this.itemPriceRef.current.placeholder = '';
      this.itemQuantityRef.current.classList.remove('is-invalid');
      this.itemQuantityRef.current.placeholder = '';
      this.ingredientsRef.current.classList.remove('is-invalid');
      this.ingredientsRef.current.placeholder = '';
      newItem[name] = value;
    }
    this.setState({ newItem });
  }

  saveChanges = () => {
    if(!this.validateInputFields()) {
      return;
    }

    this.props.saveItemChanges(this.state.newItem);
  }

  closeModal = () => {
    this.setState({newItem: {
      name: '',
      price: '',
      ingredients: '',
      quantity: '',
    }}, () => {
      this.props.closeMenuItemModal();
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
    const { newItem } = this.state;

    return (
      <Modal
        show={this.props.showContentModal}
        onHide={() => this.props.closeMenuItemModal()}
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.isNew && 'Add New Content'}
            {!this.props.isNew && 'Edit Existing Content'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="menu-item-modal-name"
              value={newItem.name}
              onChange={this.handleNewItemChange}
              name="name"
              ref={this.itemNameRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              className="form-control"
              id="menu-item-modal-price"
              value={newItem.price}
              onChange={this.handleNewItemChange}
              name="price"
              ref={this.itemPriceRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            <input
              className="form-control"
              id="menu-item-modal-ingredients"
              value={newItem.ingredients}
              onChange={this.handleNewItemChange}
              name='ingredients'
              ref={this.ingredientsRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              className="form-control"
              id="menu-item-modal-quantity"
              value={newItem.quantity}
              onChange={this.handleNewItemChange}
              name="quantity"
              ref={this.itemQuantityRef}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={() => this.saveChanges()}>
            Submit
          </Button>
          <Button variant="outline-danger" onClick={() => this.closeModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddEditItem;