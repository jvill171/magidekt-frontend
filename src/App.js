import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <h1>Magidekt</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
