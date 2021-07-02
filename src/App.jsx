import React from 'react';
import store from "./store/MenuStore";
import MainPage from "./components/MainPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  window.store = store;

  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;