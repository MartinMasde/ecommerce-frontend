// import React from 'react';

// const AdminLayout = ({ setSection, children }) => {
//   return (
//     <div className="d-flex">
//       {/* Barra lateral */}
//       <div className="bg-dark text-white p-3" style={{ width: '250px', height: '100vh' }}>
//         <h5>Admin Dashboard</h5>
//         <ul className="nav flex-column">
//           <li className="nav-item">
//             <button className="nav-link btn btn-link text-white" onClick={() => setSection('Products')}>
//               Products
//             </button>
//           </li>
//           <li className="nav-item">
//             <button className="nav-link btn btn-link text-white" onClick={() => setSection('Users')}>
//               Users
//             </button>
//           </li>
//           <li className="nav-item">
//             <button className="nav-link btn btn-link text-white" onClick={() => setSection('Carts')}>
//               Carts
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Contenido principal */}
//       <div className="container-fluid p-4">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

// import React from 'react';

// const AdminLayout = ({ setSection, children }) => {
//   return (
//     <div className="d-flex">
//       {/* Barra lateral */}
//       <div className="bg-dark text-white p-3" style={{ width: '250px', height: '100vh' }}>
//         <h5>Admin Dashboard</h5>
//         <ul className="nav flex-column">
//           <li className="nav-item">
//             <button
//               className="nav-link btn btn-link text-white"
//               onClick={() => setSection && setSection('Products')}
//             >
//               Products
//             </button>
//           </li>
//           <li className="nav-item">
//             <button
//               className="nav-link btn btn-link text-white"
//               onClick={() => setSection && setSection('Users')}
//             >
//               Users
//             </button>
//           </li>
//           <li className="nav-item">
//             <button
//               className="nav-link btn btn-link text-white"
//               onClick={() => setSection && setSection('Carts')}
//             >
//               Carts
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Contenido principal */}
//       <div className="container-fluid p-4">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;



import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate(); // Hook para manejar la navegación

  return (
    <div className="d-flex">
      {/* Barra lateral */}
      <div className="bg-dark text-white p-3" style={{ width: '250px', height: '100vh' }}>
        <h5>Admin Dashboard</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className="nav-link btn btn-link text-white"
              onClick={() => navigate('/admin')}
            >
              Products
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link btn btn-link text-white"
              onClick={() => navigate('/admin/users')}
            >
              Users
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link btn btn-link text-white"
              onClick={() => navigate('/admin/carts')}
            >
              Carts
            </button>
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="container-fluid p-4">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;