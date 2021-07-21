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
import EditDishesModal from "./modals/EditDishesModal";
import EditMenuModal from "./modals/EditMenuModal";
import { IPropsMenuListComponent, IStateMenuListComponent, MenuItemInterface, IShowEditDishes, IShowAddMenu } from "../types";
import { MenuSchema } from "../store/MenuList";

@observer
class MenuListComponent extends Component<IPropsMenuListComponent, IStateMenuListComponent> {

  private nameInputRef = React.createRef();
  private descInputRef = React.createRef();
  
  constructor(props : IPropsMenuListComponent) {
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
  
  saveChanges = (menu : MenuSchema) => {
    store.menus.updateMenu(menu.id, 'name', menu.name);
    store.menus.updateMenu(menu.id, 'description', menu.description);

    const showEditMenu = {
      menu,
      show: false,
    }
    this.setState({showEditMenu});
  };

  saveDetailsChange = (item : MenuItemInterface) => {
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

  removeItem = (itemId : string) => {
    store.deleteMenuItem(this.props.id, itemId);
  }

  showModal = (id? : string) => {
    let item : MenuItemInterface = {
      id: '',
      name: '',
      ingredients: '',
      quantity: '',
      price: '',
    };
    if(id) {
      item = store.menus.getMenuItemById(this.props.id,id);

      const showEditDishesModal : IShowEditDishes = {
        item,
        show: true,
      };

      this.setState({ showEditDishesModal, isNew: false });
    } else {
      const showEditDishesModal = {
        item, 
        show: true
      };
      this.setState({ showEditDishesModal, isNew: true });
    }
  }

  closeMenuModal = () => {
    const showEditMenu : IShowAddMenu = {
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
        name: menu?.name,
        description: menu?.description,
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
              {store.menus.getMenuById(this.props.id)?.description}
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

        <EditMenuModal showEditMenu={this.state.showEditMenu} isNew={false} closeMenuModal={this.closeMenuModal} saveChanges={this.saveChanges} />

        <EditDishesModal menuId={this.props.id} showEditDishesModal={this.state.showEditDishesModal} isNew={this.state.isNew} closeEditDishesModal={this.closeEditDishesModal} saveDetailsChange={this.saveDetailsChange} />

      </React.Fragment>
    );
  }
}

export default MenuListComponent;