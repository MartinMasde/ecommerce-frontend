import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

const CartsTable = () => {
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/carts");
        if (!response.ok) {
          throw new Error(`Error al obtener carritos: ${response.statusText}`);
        }
        const result = await response.json();
        setCarts(result.response || []);
      } catch (error) {
        console.error("Error al consumir la API:", error);
      }
    };

    fetchCarts();
  }, []);

  // Maneja la eliminación de un carrito
  const handleDelete = async (cartId) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto eliminará el carrito de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8080/api/carts/${cartId}`, {
          method: "DELETE",
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error("Error al eliminar el carrito");
        }
        Swal.fire("Eliminado", "El carrito ha sido eliminado.", "success");
        setCarts(carts.filter((cart) => cart._id !== cartId));
        navigate("/admin"); // Redirige a la página de administracion
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el carrito.", "error");
        console.error(error);
      }
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Carrito ID</th>
            <th>Usuario</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart) => (
            <tr key={cart._id}>
              <td>{cart._id}</td>
              <td>{cart.userId}</td>
              <td>{cart.products.length}</td>
              <td>{cart.total}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(cart._id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartsTable;