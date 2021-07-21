import React, { Component } from "react";
import { observer } from "mobx-react";
import { Button, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuListComponent from './MenuListComponent';
import store from '../store/MenuStore';
import EditMenuModal from "./modals/EditMenuModal";
import { MenuSchema } from "../store/MenuList";
import { IPropsMainPage, IStateMainPage } from "../types";

@observer
class MainPage extends Component<IPropsMainPage, IStateMainPage> {
  constructor(props : IPropsMainPage) {
    super(props);

    this.state = {
      showAddMenu: {
        menu: {
          id: '',
          name: '',
          description: '',
        },
        show: false,
      },
      selectedTab: 'home',
    }
    console.log('store',store,store.menus, store.menus['list'])
  }
  createRouterPath = (routerName : string) => {
    return `/${routerName}`;
  };

  showAddMenu = () => {
    const { showAddMenu } = this.state;
    showAddMenu.show = true;
    this.setState({showAddMenu});
  }
  
  closeAddMenu = () => {
    const showAddMenu = {
      menu: {
        id: '',
        name: '',
        description: '',
      },
      show: false,
    };
    this.setState({showAddMenu});
  };
  
  saveMenu = (menu : MenuSchema) => {
    menu.itemList = [];
    store.menus.createMenu(menu);
    const showAddMenu = {
      menu: {
        id: '',
        name: '',
        description: '',
      },
      show: false,
    };
    this.setState({showAddMenu});
  };
  
  render() {
    console.log('render store',store)
    console.log('render menus',store.menus)
    console.log('render list',store.menus.list)
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
                  console.log('navs',store.menus, store.menus.list)
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

          <EditMenuModal showEditMenu={this.state.showAddMenu} isNew={false} closeMenuModal={this.closeAddMenu} saveChanges={this.saveMenu} />

          <span>Welcome to our Restaurant menu application, create your own menus and fill it with delicious dishes!</span>
        </React.Fragment>
      </Router>
    );
  }
}

export default MainPage;
