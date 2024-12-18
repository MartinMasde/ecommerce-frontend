import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateProductForm() {
  const [product, setProduct] = useState(null); // Producto actual para el formulario
  const [originalProduct, setOriginalProduct] = useState(null); // Guardar los datos originales
  const { id } = useParams(); // Captura el ID del producto
  const navigate = useNavigate();

  // Función para obtener los datos del producto desde el backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Solicitando producto con ID: ${id}`); // Log para depuración
        const response = await fetch(`http://localhost:8080/api/products`);
        if (!response.ok) {
          throw new Error(`Error al obtener productos: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Respuesta del backend:", result); // Verifica la respuesta

        // Filtra el producto por su _id
        const selectedProduct = result.response.find(
          (product) => product._id === id
        );
        if (selectedProduct) {
          setProduct(selectedProduct); // Precarga el formulario
          setOriginalProduct(selectedProduct); // Guarda los datos originales
        } else {
          throw new Error("Producto no encontrado.");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        Swal.fire(
          "Error",
          "No se pudo cargar el producto. Intenta más tarde.",
          "error"
        );
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construir un objeto con los campos modificados
    const updatedFields = {};
    Object.keys(product).forEach((key) => {
      if (product[key] !== originalProduct[key]) {
        updatedFields[key] = product[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      Swal.fire("Sin cambios", "No has modificado ningún campo.", "info");
      return;
    }

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto actualizará el producto con los nuevos datos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
            credentials: "include",
          }
        );

        if (response.ok) {
          Swal.fire(
            "Actualizado",
            "El producto se actualizó correctamente.",
            "success"
          );
          navigate("/admin"); // Redirige al dashboard de admin
        } else {
          throw new Error("Error al actualizar el producto");
        }
      } catch (error) {
        Swal.fire("Error", "No se pudo actualizar el producto.", "error");
        console.error("Error al actualizar el producto:", error);
      }
    } else {
      navigate("/admin"); // Si cancela, vuelve al dashboard
    }
  };

  // Mostrar un spinner mientras los datos del producto se cargan
  if (!product) {
    return (
      <div className="text-center mt-5">Cargando datos del producto...</div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Actualizar Producto</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 shadow rounded bg-light"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Nombre del producto
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={product.title || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            URL de la foto
          </label>
          <input
            type="text"
            className="form-control"
            id="photo"
            name="photo"
            value={product.photo || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Precio
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={product.price || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            value={product.stock || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Categoría
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={product.category || ""}
            onChange={handleChange}
          >
            <option value="televisores">Televisores</option>
            <option value="audio">Audio</option>
            <option value="heladeras">Heladeras</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="code" className="form-label">
            Código único
          </label>
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            value={product.code || ""}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Actualizar Producto
        </button>
      </form>
    </div>
  );
}

export default UpdateProductForm;
