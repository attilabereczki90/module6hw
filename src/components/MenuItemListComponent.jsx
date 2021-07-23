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
      actualItem: store.menus.getMenuItemById(this.props.menuId, this.props.menuItemId),
    }
  }

  render() {
    const { actualItem } = this.state;
    const { menuItemId, showModal, removeItem } = this.props;

    return (
      <React.Fragment>
        <Container className={'content'}>
          <Row>
            <Col xs={10} key={`${menuItemId}-box`}>
              <div>
                <span key={`${actualItem.name}-span`} className={'meal-name'}>{actualItem.name}</span>
                <span key={`${actualItem.price}-span`} className={'meal-price'}>{actualItem.price}</span>
              </div>
              <div key={`${menuItemId}-text`} className={'meal-description'}>
                {actualItem.ingredients} / Quantity: {actualItem.quantity}
              </div>
            </Col>
            <Col>
            <div className="content-menu">
              <OverlayTrigger
                key={`bottom-${menuItemId}-edit`}
                placement="bottom"
                overlay={<Tooltip id={`tooltip-bottom-${menuItemId}-edit`} key={`tooltip-bottom-${menuItemId}-edit`} >Edit Dish</Tooltip>}
              >
                <BsPencil onClick={() => showModal(menuItemId)} />
              </OverlayTrigger>
              <OverlayTrigger
                key={`bottom-${menuItemId}-remove`}
                placement="bottom"
                overlay={
                  <Tooltip id={`tooltip-bottom-${menuItemId}-remove`} key={`tooltip-bottom-${menuItemId}-remove`}>Remove Dish</Tooltip>
                }
              >
                <BsFillTrashFill onClick={() => removeItem(menuItemId)} />
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