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

    this.actualItem = store.menus.getMenuItemById(props.menuId, props.menuItemId);
  }

  render() {
    const actualItem = store.menus.getMenuItemById(this.props.menuId, this.props.menuItemId);
    console.log('actualitem',this.actualItem)
    console.log('storeitem',store.menus.getMenuItemById(this.props.menuId, this.props.menuItemId))
    console.log('cloneditem', Object.assign({}, store.menus.getMenuItemById(this.props.menuId, this.props.menuItemId)))
    return (
      <React.Fragment>
        <Container className={'content'}>
          <Row>
            <Col xs={10}>
              <div>
                <span className={'meal-name'}>{actualItem.name}</span>
                <span className={'meal-price'}>{actualItem.price}</span>
              </div>
              <div  className={'meal-description'}>
                {actualItem.ingredients} / Quantity: {actualItem.quantity}
              </div>
            </Col>
            <Col>
            <div className="content-menu">
              <OverlayTrigger
                key={`bottom-${actualItem.id}-edit`}
                placement="bottom"
                overlay={<Tooltip id={`tooltip-bottom`}>Edit Content</Tooltip>}
              >
                <BsPencil onClick={() => this.props.showModal(actualItem.id)} />
              </OverlayTrigger>
              <OverlayTrigger
                key={`bottom-${actualItem.id}-remove`}
                placement="bottom"
                overlay={
                  <Tooltip id={`tooltip-bottom`}>Remove Content</Tooltip>
                }
              >
                <BsFillTrashFill onClick={() => this.props.removeItem(actualItem.id)} />
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