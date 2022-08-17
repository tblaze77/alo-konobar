import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import OnlinePaymentPage from './pages/OnlinePaymentPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/menu/:tableId" element={<Menu />} />
          <Route path="/menu/:tableId/checkoutOrder" element={<Checkout />} />
          <Route path="/menu/:tableId/checkoutOrder/onlinePayment" element={<OnlinePaymentPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
