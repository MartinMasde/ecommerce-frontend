import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        if (!response.ok) {
          throw new Error(`Error al obtener productos: ${response.statusText}`);
        }
        const result = await response.json();
        setProducts(result.response || []);
      } catch (error) {
        console.error("Error al consumir la API:", error);
      }
    };

    fetchProducts();
  }, []);

  // Maneja la actualizacion de un producto
  const handleEdit = (productId) => {
    navigate(`/admin/products/update/${productId}`);
  };

  // Maneja la eliminación de un producto
  const handleDelete = async (productId) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto eliminará el producto de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${productId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Error al eliminar el producto");
        }
        Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
        setProducts(products.filter((product) => product._id !== productId));
        navigate("/admin"); // Redirige a la página de administracion
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el producto.", "error");
        console.error(error);
      }
    } else {
      navigate("/admin"); // Si se cancela, regresa a la página de Administracion
    }
  };

  return (
    <div className="table-responsive">
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/admin/products/create")}
      >
        Agregar Producto
      </button>
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
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>
                {product.photo ? (
                  <img
                    src={product.photo}
                    alt={product.title}
                    style={{ width: "50px" }}
                  />
                ) : (
                  "No disponible"
                )}
              </td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>{product.code}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(product._id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product._id)}
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

export default ProductsTable;
