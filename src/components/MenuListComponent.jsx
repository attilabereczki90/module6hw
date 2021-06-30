import React, { Component } from "react";
import { observer } from "mobx-react-lite";
import {
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
  Container,
  Row,
  Col
} from "react-bootstrap";
import {
  BsPencil,
  BsFillTrashFill,
  BsFillPlusSquareFill
} from "react-icons/bs";
import { Redirect } from 'react-router';
import MenuItemListComponent from "./MenuItemListComponent";

class MenuListComponent extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      showEdit: false,
      actualMenu: props.store.menus.getMenuById(props.id),
      showContentModal: false,
      newItem: {},
      navigate: false,
      isNew: false,
    };

    this.nameInputRef = React.createRef()
    this.descInputRef = React.createRef();
    
    this.itemNameRef = React.createRef();
    this.itemPriceRef = React.createRef();
    this.itemQuantityRef = React.createRef();
  }

  removeCurrentMenu = () => {
    this.props.store.menus.deleteMenu(this.props.id);
    this.setState({ actualMenu: {}, navigate: true });
  }

  handleMenuDetailsChange = (event) => {
    const { actualMenu } = this.state;
    const { name, value } = event.target;
    if (name === 'name') {
      this.nameInputRef.current.classList.remove('is-invalid');
      this.nameInputRef.current.placeholder = ''
      actualMenu.id = value.toLowerCase().replace(/ /g, '-');
      actualMenu.name = value;
    } else {
      this.descInputRef.current.classList.remove('is-invalid');
      this.descInputRef.current.placeholder = ''
      actualMenu[name] = value;
    }
    this.setState({actualMenu});
  };
  
  saveChanges = () => {
    const { actualMenu } = this.state;
    
    if(!this.nameInputRef.current.defaultValue) {
      this.nameInputRef.current.classList.add('is-invalid');
      this.nameInputRef.current.placeholder = 'Name must not be empty'
      return;
    }
    if(!this.descInputRef.current.defaultValue) {
      this.descInputRef.current.classList.add('is-invalid');
      this.descInputRef.current.placeholder = 'Description must not be empty'
      return;
    }
    this.props.store.menus.updateMenu(actualMenu.id, 'name', actualMenu.name);
    this.props.store.menus.updateMenu(actualMenu.id, 'description', actualMenu.description);
    this.setState({showEdit: false});
  };

  saveItemChanges = () => {
    const { newItem, actualMenu, isNew } = this.state;
    
    if(!this.validateInputFields()) {
      return;
    }
    
    if(isNew) {
      this.props.store.addMenuItem(actualMenu.id, newItem);
    } else {
      this.props.store.updateMenuItem(actualMenu.id, newItem)
    }
    
    this.setState({showContentModal: false, newItem: {}});
  };

  handleNewItemChange = (event) => {
    const { newItem } = this.state;
    const { name, value } = event.target;
    if (name === 'name') {
      this.itemNameRef.current.classList.remove('is-invalid');
      this.itemNameRef.current.placeholder = '';
      if(!newItem.id) {
        newItem.id = value.toLowerCase().replace(/ /g, '-');
      }
      newItem.name = value;
    } else {
      this.itemPriceRef.current.classList.remove('is-invalid');
      this.itemPriceRef.current.placeholder = '';
      this.itemQuantityRef.current.classList.remove('is-invalid');
      this.itemQuantityRef.current.placeholder = '';
      newItem[name] = value;
    }
    this.setState({ newItem });
  }

  validateInputFields = () => {
    let isValid = true;
    if(!this.itemNameRef.current.defaultValue) {
      this.itemNameRef.current.classList.add('is-invalid');
      this.itemNameRef.current.placeholder = 'Name must not be empty'
      isValid = false;
    }
    if(!this.itemPriceRef.current.defaultValue) {
      this.itemPriceRef.current.classList.add('is-invalid');
      this.itemPriceRef.current.placeholder = 'Price field must not be empty'
      isValid = false;
    }
    if(!this.itemQuantityRef.current.defaultValue) {
      this.itemQuantityRef.current.classList.add('is-invalid');
      this.itemQuantityRef.current.placeholder = 'Quantity field must not be empty'
      isValid = false;
    }

    return isValid;
  }

  removeItem = (itemId) => {
    this.props.store.deleteMenuItem(this.state.actualMenu.id, itemId);
    this.forceUpdate();
  }

  showModal = (item) => {
    if(item) {
      this.setState({ showContentModal: true, newItem: item, isNew: false });
    } else {
      this.setState({ showContentModal: true, isNew: true, newItem: {} });
    }
  }

  render() {
    const { store, id } = this.props;
    console.log('list',store.menus)

    if (this.state.navigate) {
      return <Redirect to="/" push={true} />
    }

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={10} className="menu-description">
              {this.state.actualMenu.description}
            </Col>
            <Col>
              <div className="control-menu">
                <OverlayTrigger
                  key={`bottom-${id}-edit`}
                  placement="bottom"
                  overlay={<Tooltip id={`tooltip-bottom`}>Edit Menu</Tooltip>}
                >
                  <BsPencil onClick={() => this.setState({ showEdit: true })} />
                </OverlayTrigger>
                <OverlayTrigger
                  key={`bottom-${id}-remove`}
                  placement="bottom"
                  overlay={<Tooltip id={`tooltip-bottom`}>Remove Menu</Tooltip>}
                >
                  <BsFillTrashFill onClick={this.removeCurrentMenu} />
                </OverlayTrigger>
                <OverlayTrigger
                  key={`bottom-${id}-addcontent`}
                  placement="bottom"
                  overlay={<Tooltip id={`tooltip-bottom`}>Add Content</Tooltip>}
                >
                  <BsFillPlusSquareFill onClick={() => this.showModal()} />
                </OverlayTrigger>
              </div>
            </Col>
          </Row>

          <hr />

          <Row>
            <Col xs={10}>
              {store.menus.getMenuById(id)?.itemList.map((menuItem) => {
                console.log('adsf',menuItem)
                return (
                  <MenuItemListComponent store={store} menuId={id} menuItem={menuItem} removeItem={this.removeItem} showModal={this.showModal} />
                );
              })}
            </Col>
          </Row>
        </Container>

        <div>
          <Modal
            show={this.state.showEdit}
            centered
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Menu
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  defaultValue={this.state.actualMenu.name}
                  onChange={this.handleMenuDetailsChange}
                  name="name"
                  ref={this.nameInputRef}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  rows="10"
                  cols="100"
                  className="form-control"
                  id="description"
                  required
                  defaultValue={this.state.actualMenu.description}
                  onChange={this.handleMenuDetailsChange}
                  name="description"
                  ref={this.descInputRef}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-success" onClick={this.saveChanges}>
                Save
              </Button>
              <Button variant="outline-danger" onClick={() => this.setState({ showEdit: false })}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div>
          <Modal
            show={this.state.showContentModal}
            centered
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Content
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.newItem.name}
                  onChange={this.handleNewItemChange}
                  name="name"
                  ref={this.itemNameRef}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  className="form-control"
                  id="price"
                  required
                  value={this.state.newItem.price}
                  onChange={this.handleNewItemChange}
                  name="price"
                  ref={this.itemPriceRef}
                />
              </div>

              {
                /*<div className="form-group">
                <label htmlFor="ingredients">Ingredients</label>
                <Select
                  className="dropdown"
                  placeholder="Select Option"
                  value={this.state.newItem.ingredients}
                  options={ingredientOptions}
                  onChange={handleContentDetailsChange}
                  isMulti
                  isClearable
                />
              </div>*/
              }

              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  className="form-control"
                  id="quantity"
                  required
                  value={this.state.newItem.quantity}
                  onChange={this.handleNewItemChange}
                  name="quantity"
                  ref={this.itemQuantityRef}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-success" onClick={this.saveItemChanges}>
                Submit
              </Button>
              <Button variant="outline-danger" onClick={() => this.setState({ showContentModal: false })}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default observer(({store, id}) => <MenuListComponent store={store} id={id} />);