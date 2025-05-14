
import './App.css';
import Home from './pages/Home';
import BusinessProfile from './pages/BusinessProfile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ideas/:documentId" element={<BusinessProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
