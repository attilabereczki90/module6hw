import React, { Component } from "react";
import { observer } from "mobx-react-lite";
import {
  OverlayTrigger,
  Tooltip,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

class MenuItemListComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      actualMenu: props.store.menus.getMenuById(props.menuId),
      actualItem: props.menuItem,
    };
    console.log('menuitem', props.menuItem)
    
    this.itemNameRef = React.createRef();
    this.itemPriceRef = React.createRef();
    this.itemQuantityRef = React.createRef();
  }

  handleContentDetailsChange = (event) => {
    const { actualItem } = this.state;
    const { name, value } = event.target;
    if (name === 'name') {
      this.itemNameRef.current.classList.remove('is-invalid');
      this.itemNameRef.current.placeholder = '';
      actualItem.name = value;
    } else {
      this.itemPriceRef.current.classList.remove('is-invalid');
      this.itemPriceRef.current.placeholder = ''
      this.itemQuantityRef.current.classList.remove('is-invalid');
      this.itemQuantityRef.current.placeholder = ''
      actualItem[name] = value;
    }
    this.setState({ actualItem });
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

  render() {
    const { actualItem } = this.state;
    console.log('actual',this.props.menuItem)
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={10}>
              <div>
                {actualItem.name}
                {actualItem.price}
              </div>
              <div>
                {actualItem.quantity}
              </div>
            </Col>
            <Col>
            <div className="content-menu">
              <OverlayTrigger
                key={`bottom-${actualItem.id}-edit`}
                placement="bottom"
                overlay={<Tooltip id={`tooltip-bottom`}>Edit Content</Tooltip>}
              >
                <BsPencil onClick={() => this.props.showModal(actualItem)} />
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

export default observer(({store, menuId, menuItem, removeItem, showModal}) => <MenuItemListComponent store={store} menuId={menuId} menuItem={menuItem} removeItem={removeItem} showModal={showModal} />);