import React from 'react';
import store from './store/MenuStore';
import MainPage from './components/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

declare global {
  interface Window { store: any; }
}

export default class App extends React.Component {
  render() {
    window.store = store;
    
    console.log('render store',window.store)
    console.log('render menus',window.store.menus)
    console.log('render list',window.store.menus.list)
    
    return (
      <div className="App">
        <MainPage />
      </div>
    );
  }
}