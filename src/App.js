// App.js (or Main.js)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes

import Navbar from './components/Navbar';
import HomeScreen from './components/HomeScreen';
import Game from './components/Game';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes> {/* Wrap your Route components in a Routes element */}
          <Route path="/" element={<HomeScreen />} /> {/* Use the "element" prop */}
          <Route path="/game" element={<Game />} /> {/* Use the "element" prop */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
