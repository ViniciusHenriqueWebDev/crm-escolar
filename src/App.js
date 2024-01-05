import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './pages/_LayoutShared/Header';
import AppRoutes from './Routes';
import '../src/Global.css';


function App() {
  return (
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
  );
}

export default App;
