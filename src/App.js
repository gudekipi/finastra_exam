import { Provider } from 'react-redux';
import './App.css';
import Home from './page/Home';
import store from './store';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
