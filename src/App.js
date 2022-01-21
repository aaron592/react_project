import './App.css';
import Credentials from './components/Credentials';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Homepage from './components/Homepage';
import Player from './components/Player';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Credentials/>} />
          <Route path="/homepage" element={<Homepage/>} />
          <Route path="/player" element={<Player/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
