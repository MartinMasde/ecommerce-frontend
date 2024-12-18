import React, { useEffect, useState } from "react";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users", {
        credentials: "include", });
        if (!response.ok) {
          throw new Error(`Error al obtener productos: ${response.statusText}`);
        }
        const result = await response.json();
        setUsers(result.response || []);
      } catch (error) {
        console.error("Error al consumir la API:", error);
        setUsers([]); 
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="table-responsive">
        <h1>Users</h1>
      <button className="btn btn-primary mb-3">Agregar Usuario</button>
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
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isOnline ? "Online" : "Offline"}</td> 
              <td>
                <button className="btn btn-warning btn-sm me-2">Editar</button>
                <button className="btn btn-danger btn-sm">Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
