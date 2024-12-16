import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import Cart from './components/Cart';
import AdminDashboard from './components/Admin/AdminDashboard.js'; // Importa el AdminDashboard
import CreateProductForm from './components/Admin/Products/CreateProducts.js'

function ProtectedRoute({ children, role, authState }) {
  if (!authState.isAuthenticated || authState.role !== role) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  const [authState, setAuthState] = useState({ isAuthenticated: false, role: '' });

  return (
    <Router>
      <Navbar authState={authState} setAuthState={setAuthState} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setAuthState={setAuthState} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Rutas protegidas para ADMIN */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute authState={authState} role="ADMIN">
              <Routes>
                <Route path="" element={<AdminDashboard />} /> {/* Ruta principal del dashboard */}
                <Route path="products/create" element={<CreateProductForm />} /> {/* Ruta para crear productos */}
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;