import { BrowserRouter } from 'react-router-dom';
import './App.scss';
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
