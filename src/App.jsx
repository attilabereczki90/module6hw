import MenuStore from "./store/MenuStore";
import MainPage from "./components/MainPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const store = new MenuStore();
  return (
    <div className="App">
      <MainPage store={store} />
    </div>
  );
}

export default App;