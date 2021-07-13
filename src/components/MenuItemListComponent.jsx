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
import _ from "lodash";

@observer
class MenuItemListComponent extends Component {

  constructor(props) {
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
            <Col xs={10} key={`${this.state.actualItem.id}-box`}>
              <div>
                <span key={`${this.state.actualItem.name}-span`} className={'meal-name'}>{this.state.actualItem.name}</span>
                <span key={`${this.state.actualItem.price}-span`} className={'meal-price'}>{this.state.actualItem.price}</span>
              </div>
              <div key={`${this.state.actualItem.id}-text`} className={'meal-description'}>
                {this.state.actualItem.ingredients} / Quantity: {this.state.actualItem.quantity}
              </div>
            </Col>
            <Col>
            <div className="content-menu">
              <OverlayTrigger
                key={`bottom-${this.props.menuItemId}-edit`}
                placement="bottom"
                overlay={<Tooltip id={`tooltip-bottom-${this.props.menuItemId}-edit`} key={`tooltip-bottom-${this.props.menuItemId}-edit`} >Edit Content</Tooltip>}
              >
                <BsPencil onClick={() => this.props.showModal(this.props.menuItemId)} />
              </OverlayTrigger>
              <OverlayTrigger
                key={`bottom-${this.props.menuItemId}-remove`}
                placement="bottom"
                overlay={
                  <Tooltip id={`tooltip-bottom-${this.props.menuItemId}-remove`} key={`tooltip-bottom-${this.props.menuItemId}-remove`}>Remove Content</Tooltip>
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