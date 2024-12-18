import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [ setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
  const [ setCurrentItem] = useState(null); // Estado para el elemento actual a editar
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

  // Maneja abrir el modal para agregar/editar
  const handleShowModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setShowModal(true);
    } else {
      navigate("/admin/products/create"); // Redirige a la ruta configurada
    }
  };

  return (
    <div className="table-responsive">

      <button
        className="btn btn-primary mb-3"
        onClick={() => handleShowModal()}
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

export default ProductsTable;
