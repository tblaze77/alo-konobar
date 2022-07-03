import React, { useState, useEffect } from 'react';
import { getSpecificBranchProductByProductName } from './apis/BranchProductApi';
import { Routes, Route, Link } from 'react-router-dom';
import Order from './pages/Order';
function App() {
  return (
    <>
      <Routes>
        <Route path="/order" element={<Order />} />
      </Routes>

      <Link to="/order"></Link>
    </>
  );
}

export default App;
