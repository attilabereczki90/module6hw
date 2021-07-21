import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  OverlayTrigger,
  Tooltip,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import store from '../store/MenuStore';
import { IPropsMenuItemListComponent } from "../types";

@observer
class MenuItemListComponent extends Component<IPropsMenuItemListComponent> {

  constructor(props : IPropsMenuItemListComponent) {
    super(props);

    this.state = {
      actualItem: {
        name: store.menus.getMenuItemById(this.props.menuId, this.props.menuItemId).name,
        ingredients: store.menus.getMenuItemById(this.props.menuId, this.props.menuItemId).ingredients,
        quantity: store.menus.getMenuItemById(this.props.menuId, this.props.menuItemId).quantity,
        price: store.menus.getMenuItemById(this.props.menuId, this.props.menuItemId).price,
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Container className={'content'}>
          <Row>
            <Col xs={10} key={`${this.props.menuItemId}-box`}>
              <div>
                <span key={`${store.menus.getMenuItemById(this.props.menuId, this.props.menuItemId).name}-span`} className={'meal-name'}>{store.menus.getMenuItemById(this.props.menuId, this.props.menuItemId).name}</span>
                <span key={`${store.menus.getMenuItemById(this.props.menuId, this.props.menuItemId).price}-span`} className={'meal-price'}>{store.menus.getMenuItemById(this.props.menuId, this.props.menuItemId).price}</span>
              </div>
              <div key={`${this.props.menuItemId}-text`} className={'meal-description'}>
                {store.menus.getMenuItemById(this.props.menuId, this.props.menuItemId).ingredients} / Quantity: {store.menus.getMenuItemById(this.props.menuId, this.props.menuItemId).quantity}
              </div>
            </Col>
            <Col>
            <div className="content-menu">
              <OverlayTrigger
                key={`bottom-${this.props.menuItemId}-edit`}
                placement="bottom"
                overlay={<Tooltip id={`tooltip-bottom-${this.props.menuItemId}-edit`} key={`tooltip-bottom-${this.props.menuItemId}-edit`} >Edit Dish</Tooltip>}
              >
                <BsPencil onClick={() => this.props.showModal(this.props.menuItemId)} />
              </OverlayTrigger>
              <OverlayTrigger
                key={`bottom-${this.props.menuItemId}-remove`}
                placement="bottom"
                overlay={
                  <Tooltip id={`tooltip-bottom-${this.props.menuItemId}-remove`} key={`tooltip-bottom-${this.props.menuItemId}-remove`}>Remove Dish</Tooltip>
                }
              >
                <BsFillTrashFill onClick={() => this.props.removeItem(this.props.menuItemId)} />
              </OverlayTrigger>
            </div>
          </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default MenuItemListComponent;