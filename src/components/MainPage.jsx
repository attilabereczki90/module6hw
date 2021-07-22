import React, { Component } from "react";
import { observer } from "mobx-react";
import { Button, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuListComponent from './MenuListComponent';
import store from '../store/MenuStore';
import EditMenuModal from "./modals/EditMenuModal";

@observer
class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuObject: {
        menu: {
          id: '',
          name: '',
          description: '',
        },
        show: false,
      },
      selectedTab: 'home',
    }
  }
  createRouterPath = (routerName) => {
    return `/${routerName}`;
  };

  showAddMenu = () => {
    const { menuObject } = this.state;
    menuObject.show = true;
    this.setState({menuObject});
  }
  
  closeAddMenu = () => {
    const menuObject = {
      menu: {
        id: '',
        name: '',
        description: '',
      },
      show: false,
    };
    this.setState({menuObject});
  };
  
  saveMenu = (menu) => {
    menu.itemList = [];
    store.menus.createMenu(menu);
    const menuObject = {
      menu: {
        id: '',
        name: '',
        description: '',
      },
      show: false,
    };
    this.setState({menuObject});
  };
  
  render() {
    return (
      <Router>
        <React.Fragment>
          <h1>Restaurant Menu Application</h1>
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
                <Button variant="dark" onClick={() => this.showAddMenu()}>
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

          <EditMenuModal showEditMenu={this.state.menuObject} isNew={false} closeMenuModal={this.closeAddMenu} saveChanges={this.saveMenu} />

          <span>Welcome to our Restaurant menu application, create your own menus and fill it with delicious dishes!</span>
        </React.Fragment>
      </Router>
    );
  }
}

export default MainPage;
