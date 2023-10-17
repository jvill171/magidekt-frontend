import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import RouteList from './components/RouteList/RouteList';
import UserProvider from './components/UserProvider/UserProvider';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserProvider />
      </div>
    </BrowserRouter>
  );
}

export default App;
