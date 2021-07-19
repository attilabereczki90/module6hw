import React, { Component } from "react";
import { observer } from "mobx-react";
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
import store from '../store/MenuStore';
import { generateId } from "../utils";
import EditDishesModal from "./modals/EditDishesModal";

@observer
class MenuListComponent extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      showEdit: false,
      actualMenu: {
        id: '',
        name: '',
        description: '',
      },
      showEditDishesModal: {
        item: {
          id: '',
          name: '',
          ingredients: '',
          quantity: '',
          price: '',
        },
        show: false,
      },
      navigate: false,
      isNew: false,
    };

    this.nameInputRef = React.createRef()
    this.descInputRef = React.createRef();
    
    this.itemNameRef = React.createRef();
    this.itemPriceRef = React.createRef();
    this.itemQuantityRef = React.createRef();
    this.ingredientsRef = React.createRef();
  }

  removeCurrentMenu = () => {
    this.setState({actualMenu: {}, navigate: true }, () => {
      store.menus.deleteMenu(this.props.id);
    });
  }

  handleMenuDetailsChange = (event) => {
    const { actualMenu } = this.state;
    const { name, value } = event.target;
    if (name === 'name') {
      this.nameInputRef.current.classList.remove('is-invalid');
      this.nameInputRef.current.placeholder = ''
      if(!actualMenu.id) {
        actualMenu.id = generateId();
      }
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
    
    if(!this.nameInputRef.current.value) {
      this.nameInputRef.current.classList.add('is-invalid');
      this.nameInputRef.current.placeholder = 'Name must not be empty'
      return;
    }
    if(!this.descInputRef.current.value) {
      this.descInputRef.current.classList.add('is-invalid');
      this.descInputRef.current.placeholder = 'Description must not be empty'
      return;
    }
    store.menus.updateMenu(actualMenu.id, 'name', actualMenu.name);
    store.menus.updateMenu(actualMenu.id, 'description', actualMenu.description);
    this.setState({showEdit: false});
  };

  saveDetailsChange = (item) => {
    const { isNew } = this.state;
    
    if(isNew) {
      store.addMenuItem(this.props.id, item);
    } else {
      store.updateMenuItem(this.props.id, item);
    }

    const showEditDishesModal = {
      item: {
        id: '',
        name: '',
        ingredients: '',
        quantity: '',
        price: '',
      }, 
      show: false
    };
    
    this.setState({ showEditDishesModal });
  };

  removeItem = (itemId) => {
    store.deleteMenuItem(this.props.id, itemId);
  }

  showModal = (id) => {
    let item = {};
    if(id) {
      item = store.menus.getMenuItemById(this.props.id,id);

      const showEditDishesModal = {
        item,
        show: true,
      };

      this.setState({ showEditDishesModal, isNew: false });
    } else {
      item = {
        id: '',
        name: '',
        ingredients: '',
        quantity: '',
        price: '',
      };
      const showEditDishesModal = {
        item, 
        show: true
      };
      this.setState({ showEditDishesModal, isNew: true });
    }
  }

  closeMenuModal() {
    this.setState({ actualMenu: store.menus.getMenuById(this.props.id), showEdit: false });
  }

  openMenuModal() {
    const menu = store.menus.getMenuById(this.props.id);
    const actualMenu = {
      id: this.props.id,
      name: menu.name,
      description: menu.description,
    };
    this.setState({ actualMenu, showEdit: true });
  }

  closeEditDishesModal = () => {
    const item = {
      id: '',
      name: '',
      ingredients: '',
      quantity: '',
      price: '',
    };
    const showEditDishesModal = {
      item,
      show: false
    };
    this.setState({ showEditDishesModal, isNew: false });
  }

  render() {
    const { id } = this.props;

    if (this.state.navigate) {
      return <Redirect to="/" push={true} />
    }

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={10} className="menu-description">
              {store.menus.getMenuById(this.props.id).description}
            </Col>
            <Col>
              <div className="control-menu">
                <OverlayTrigger
                  key={`bottom-${id}-edit`}
                  placement="bottom"
                  overlay={<Tooltip id={`tooltip-bottom-menu-${id}-edit`}>Edit Menu</Tooltip>}
                >
                  <BsPencil onClick={() => this.openMenuModal()} />
                </OverlayTrigger>
                <OverlayTrigger
                  key={`bottom-${id}-remove`}
                  placement="bottom"
                  overlay={<Tooltip id={`tooltip-bottom-menu-${id}-remove`}>Remove Menu</Tooltip>}
                >
                  <BsFillTrashFill onClick={this.removeCurrentMenu} />
                </OverlayTrigger>
                <OverlayTrigger
                  key={`bottom-${id}-addcontent`}
                  placement="bottom"
                  overlay={<Tooltip id={`tooltip-bottom-menu-${id}-add-content`}>Add Dish</Tooltip>}
                >
                  <BsFillPlusSquareFill onClick={() => this.showModal()} />
                </OverlayTrigger>
              </div>
            </Col>
          </Row>

          <hr />

          <Row>
            <Col xs={10} key={``}>
              {store.menus.getMenuById(this.props.id)?.itemList.map((menuItem) => {
                return (
                  <MenuItemListComponent key={`${menuItem.id}-list-component`} menuId={this.props.id} menuItemId={menuItem.id} removeItem={this.removeItem} showModal={this.showModal} />
                );
              })}
            </Col>
          </Row>
        </Container>

        <div>
          <Modal
            show={this.state.showEdit}
            onHide={() => this.closeMenuModal()}
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
                  id="menu-modal-name"
                  required
                  value={this.state.actualMenu.name}
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
                  id="menu-modal-description"
                  required
                  value={this.state.actualMenu.description}
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
              <Button variant="outline-danger" onClick={() => this.closeMenuModal()}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <EditDishesModal menuId={this.props.id} showEditDishesModal={this.state.showEditDishesModal} isNew={this.state.isNew} closeEditDishesModal={this.closeEditDishesModal} saveDetailsChange={this.saveDetailsChange} />

      </React.Fragment>
    );
  }
}

export default MenuListComponent;