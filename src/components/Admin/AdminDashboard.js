// Importaciones necesarias
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEditModal from '../Admin/AddEditModal'; // Componente para manejar el modal de agregar/editar
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [section, setSection] = useState('Products'); // Estado para manejar la sección activa
  const [data, setData] = useState([]); // Estado para almacenar los datos de la BD
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
  const [currentItem, setCurrentItem] = useState(null); // Estado para el elemento actual a editar
  const navigate = useNavigate();

  // Trae los datos desde la base de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/${section.toLowerCase()}`, {
          credentials: 'include', 
        });
         
        if (!response.ok) {
          throw new Error(`Error al obtener datos de la API: ${response.statusText}`);
        }
        const result = await response.json();
        console.log('Datos de la API:', result); // Verifica los datos recibidos
        setData(result.response || []); // Actualiza los datos
      } catch (error) {
        console.error("Error al consumir la API:", error);
        setData([]); // Resetea los datos si ocurre un error
      }
    };

    fetchData();
  }, [section]);

  // Maneja abrir el modal para agregar/editar
  const handleShowModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setShowModal(true);
    } else {
      navigate('/admin/products/create'); // Redirige a la ruta configurada
    }
  };

  // Renderiza la tabla dependiendo de la sección
  const renderTable = () => {
    if (section === 'Products') {
      return (
        <div className="table-responsive">
          <button 
            className="btn btn-primary mb-3" 
            onClick={() => handleShowModal()}>Agregar Producto</button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Título</th>
                <th>Foto</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Código</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>
                    {item.photo ? (
                      <img src={item.photo} alt={item.title} style={{ width: '50px' }} />
                    ) : 'No disponible'}
                  </td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>{item.category}</td>
                  <td>{item.code}</td>
                  <td>
                    <button 
                      className="btn btn-warning btn-sm me-2" 
                      onClick={() => handleShowModal(item)}>Editar</button>
                    <button className="btn btn-danger btn-sm">Borrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (section === 'Users') {
      return (
        <div className="table-responsive">
           <button 
            className="btn btn-primary mb-3" 
            onClick={() => handleShowModal()}>Agregar nuevo Usuario</button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>{item.isOnline ? 'Online' : 'Offline'}</td>
                  <td>
                    <button 
                      className="btn btn-warning btn-sm me-2" 
                      onClick={() => handleShowModal(item)}>Editar</button>
                    <button className="btn btn-danger btn-sm">Borrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    console.log("Sección actual:", section);
  };

  return (
    <div className="d-flex">
      {/* Barra lateral */}
      <div className="bg-dark text-white p-3" style={{ width: '250px', height: '100vh' }}>
        <h5>Admin Dashboard</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button className="nav-link btn btn-link text-white" onClick={() => setSection('Products')}>
              Products
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link text-white" onClick={() => setSection('Users')}>
              Users
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link text-white" onClick={() => setSection('Carts')}>
              Carts
            </button>
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="container-fluid p-4">
        <h3>{section}</h3>
        {renderTable()}
      </div>

      {/* Modal de agregar/editar */}
      {showModal && (
        <AddEditModal 
          section={section} 
          item={currentItem} 
          onClose={() => setShowModal(false)} 
          onSave={(newData) => {
            setData(newData);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
