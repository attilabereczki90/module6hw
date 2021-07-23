import React, { Component } from "react";
import { observer } from "mobx-react";
import {
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
import EditDishes from "./modals/EditDishes";
import EditMenu from "./modals/EditMenu";

@observer
class MenuListComponent extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      showEditMenu: {
        menu: {
          id: '',
          name: '',
          description: '',
        },
        show: false,
      },
      showEditDishes: {
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
  }

  removeCurrentMenu = () => {
    const showEditMenu = {
      menu: {
        id: '',
        name: '',
        description: '',
      },
      show: false,
    };
    this.setState({showEditMenu, navigate: true }, () => {
      store.menus.deleteMenu(this.props.id);
    });
  }
  
  saveChanges = (menu) => {
    store.menus.updateMenu(menu.id, 'name', menu.name);
    store.menus.updateMenu(menu.id, 'description', menu.description);

    const showEditMenu = {
      menu,
      show: false,
    }
    this.setState({showEditMenu});
  };

  saveDetailsChange = (item) => {
    const { isNew } = this.state;
    
    if(isNew) {
      store.addMenuItem(this.props.id, item);
    } else {
      store.updateMenuItem(this.props.id, item);
    }

    const showEditDishes = {
      item: {
        id: '',
        name: '',
        ingredients: '',
        quantity: '',
        price: '',
      }, 
      show: false
    };
    
    this.setState({ showEditDishes });
  };

  removeItem = (itemId) => {
    store.deleteMenuItem(this.props.id, itemId);
  }

  showModal = (id) => {
    let item = {};
    if(id) {
      item = store.menus.getMenuItemById(this.props.id,id);

      const showEditDishes = {
        item,
        show: true,
      };

      this.setState({ showEditDishes, isNew: false });
    } else {
      item = {
        id: '',
        name: '',
        ingredients: '',
        quantity: '',
        price: '',
      };
      const showEditDishes = {
        item, 
        show: true
      };
      this.setState({ showEditDishes, isNew: true });
    }
  }

  closeMenuModal = () => {
    const showEditMenu = {
      menu: store.menus.getMenuById(this.props.id),
      show: false,
    };
    this.setState({ showEditMenu });
  }

  openMenuModal() {
    const menu = store.menus.getMenuById(this.props.id);
    const showEditMenu = {
      menu: {
        id: this.props.id,
        name: menu.name,
        description: menu.description,
      },
      show: true,
    };
    this.setState({ showEditMenu });
  }

  closeEditDishesModal = () => {
    const item = {
      id: '',
      name: '',
      ingredients: '',
      quantity: '',
      price: '',
    };
    const showEditDishes = {
      item,
      show: false
    };
    this.setState({ showEditDishes, isNew: false });
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

        <EditMenu showEditMenu={this.state.showEditMenu} isNew={false} closeMenuModal={this.closeMenuModal} saveMenu={this.saveChanges} />

        <EditDishes menuId={this.props.id} showEditDishes={this.state.showEditDishes} isNew={this.state.isNew} closeEditDishes={this.closeEditDishesModal} saveDetailsChange={this.saveDetailsChange} />

      </React.Fragment>
    );
  }
}

export default MenuListComponent;