import React, { Component } from "react";
import { observer } from "mobx-react";
import { Button, Modal, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuListComponent from './MenuListComponent';
import store from '../store/MenuStore';
import { generateId } from "../utils";

@observer
class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMenuObject: {
        id: '',
        name: '',
        description: '',
      },
      showAdd: false,
      selectedTab: 'home',
    }
    this.nameInputRef = React.createRef();
    this.descInputRef = React.createRef();
  }
  createRouterPath = (routerName) => {
    return `/${routerName}`;
  };

  handleInputChange = (event) => {
    const { newMenuObject } = this.state;
    const { name, value } = event.target;
    if (name === 'name') {
      this.nameInputRef.current.classList.remove('is-invalid');
      this.nameInputRef.current.placeholder = ''
      newMenuObject.id = generateId();
      newMenuObject.name = value;
    } else {
      this.descInputRef.current.classList.remove('is-invalid');
      this.descInputRef.current.placeholder = ''
      newMenuObject[name] = value;
    }
    this.setState({newMenuObject});
  };
  
  closeAddMenu = () => {
    this.resetFields();
    this.setState({showAdd: false});
  };

  resetFields = () => {
    this.setState({newMenuObject: {}});
  };
  
  saveMenu = () => {
    let { newMenuObject } = this.state;
    
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
    newMenuObject.itemList = [];
    store.menus.createMenu(newMenuObject);
    newMenuObject = {
      id: '',
      name: '',
      description: '',
    };
    this.setState({showAdd: false, newMenuObject});
  };
  
  render() {
    return (
      <Router>
        <React.Fragment>
          <h1>Restaurant Menu List</h1>
          <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                {store.menus.list.map((menu) => {
                    return (
                      <Nav.Link href={menu.id} key={menu.id}>
                        {menu.name}
                      </Nav.Link>
                    );
                  })}
              </Nav>
              <div className="add-menu">
                <Button variant="dark" onClick={() => this.setState({showAdd: true})}>
                  Add Menu
                </Button>
              </div>
            </Navbar.Collapse>
          </Navbar>
  
          <hr />
  
          <Switch>
            {store.menus.list.map((menu) => {
                return (
                  <Route path={this.createRouterPath(menu.id)} key={menu.id}>
                    <MenuListComponent id={menu.id} />
                  </Route>
                );
              })}
          </Switch>
          <Modal show={this.state.showAdd} onHide={this.closeAddMenu} centered animation={false}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-add-modal-title-vcenter">
                Add Menu
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="add-menu-name"
                  required
                  value={this.state.newMenuObject.name}
                  onChange={this.handleInputChange}
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
                  id="add-menu-description"
                  required
                  value={this.state.newMenuObject.description}
                  onChange={this.handleInputChange}
                  name="description"
                  ref={this.descInputRef}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-success" onClick={this.saveMenu}>
                Submit
              </Button>
              <Button variant="outline-danger" onClick={this.closeAddMenu}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      </Router>
    );
  }
}

export default MainPage;
