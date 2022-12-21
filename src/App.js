import logo from './logo.svg';
import './App.css';
import store from './redux/store'
import {Provider} from 'react-redux'
import Router from './routes'

function App() {
  return (
    <Provider store={store}>
      <Router/>
    </Provider>
  );
}

export default App;
