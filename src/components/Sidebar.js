import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Para personalizar el estilo

const Sidebar = () => {
  return (
    <div className="d-flex flex-column bg-warning vh-100 p-3" style={{ width: '250px' }}>
      <h2 className="text-white mb-4">Mi tienda</h2>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/admin/dashboard" className="nav-link text-dark">Inicio</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/products" className="nav-link text-dark">Productos</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/users" className="nav-link text-dark">Usuarios</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/carts" className="nav-link text-dark">Carritos</Link>
        </li>
        <li className="nav-item mt-auto">
          <Link to="/logout" className="nav-link text-danger">Salir</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;