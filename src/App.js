import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CozyPortfolio from './pages/CozyPortfolio';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CozyPortfolio />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
