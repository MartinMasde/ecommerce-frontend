// import React from 'react';
// import Sidebar from './Sidebar'; // Verifica que Sidebar.js esté en src/components
// import TableComponent from './TableComponent'; // Verifica que TableComponent.js esté en src/components

// const AdminDashboard = () => {
//   // Datos de ejemplo para la tabla
//   const products = [
//     { id: 1, name: 'Papel Crepe', description: 'Decoración de trabajos escolares', price: 14.99 },
//     { id: 2, name: 'Papel Bond A4', description: 'Ultra blanco 180gr', price: 9.99 },
//     { id: 3, name: 'Colores Faber Castell', description: 'Caja de colores x12 + 2 de regalo', price: 5.99 },
//     { id: 4, name: 'Ecolápices Faber Castell', description: 'Caja de ecolápices x60', price: 11.99 },
//     { id: 5, name: 'Estuche de lápices', description: 'Colores x5', price: 6.99 },
//   ];

//   // Función para renderizar el contenido principal
//   const renderContent = () => (
//     <TableComponent
//       data={products} // Pasamos los productos a la tabla
//       columns={[
//         { header: 'ID', accessor: 'id' },
//         { header: 'Nombre', accessor: 'name' },
//         { header: 'Descripción', accessor: 'description' },
//         { header: 'Precio', accessor: 'price' },
//       ]}
//       onEdit={(item) => console.log('Editar:', item)} // Acciones de ejemplo
//       onDelete={(item) => console.log('Eliminar:', item)} // Acciones de ejemplo
//     />
//   );

//   return (
//     <div className="d-flex">
//       {/* Sidebar a la izquierda */}
//       <Sidebar />

//       {/* Contenido principal */}
//       <div className="p-4" style={{ flexGrow: 1 }}>
//         <h1 className="mb-4">Administración</h1>
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React from "react";
import backgroundImage from "../assets/background.jpg";


function AdminDashboard() {
  return (
    <div className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="card p-4 shadow"
        style={{
            width: "800px",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}>
            <h1 className="text-center"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}>Administration Page</h1>
            <p className="text-center">You can Create, Update and Delete... Products, Users and Carts.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;