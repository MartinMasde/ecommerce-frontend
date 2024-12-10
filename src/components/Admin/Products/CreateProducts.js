import React, { useState } from "react";

function CreateProductForm() {
  const [product, setProduct] = useState({
    title: "",
    photo: "",
    price: 1,
    stock: 1,
    category: "televisores",
    code: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Producto a enviar:", product); // Log para verificar los datos
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",// agregar utorizacion
        },
        credentials: "include",
        body: JSON.stringify(product),
      });
  
      if (response.ok) {
        const result = await response.json();
        setMessage("Producto creado exitosamente");
        console.log("Producto creado:", result);
        setProduct({
          title: "",
          photo: "",
          price: 1,
          stock: 1,
          category: "televisores",
          code: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        setMessage(`Error: ${errorData.message || "No se pudo crear el producto"}`);
      }
    } catch (error) {
      console.error("Error al enviar el producto:", error);
      setMessage("Error de red o del servidor.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        {/* Título */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Título del producto
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Foto */}
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            URL de la foto
          </label>
          <input
            type="url"
            className="form-control"
            id="photo"
            name="photo"
            value={product.photo}
            onChange={handleChange}
          />
        </div>

        {/* Precio */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Precio
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            min="1"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            min="1"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>

        {/* Categoría */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Categoría
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="televisores">Televisores</option>
            <option value="audio">Audio</option>
            <option value="heladeras">Heladeras</option>
          </select>
        </div>

        {/* Código */}
        <div className="mb-3">
          <label htmlFor="code" className="form-label">
            Código único
          </label>
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            value={product.code}
            onChange={handleChange}
            required
          />
        </div>

        {/* Botón de enviar */}
        <button type="submit" className="btn btn-primary w-100">
          Crear Producto
        </button>
      </form>

      {/* Mensaje de éxito o error */}
      {message && (
        <div className={`mt-4 alert ${message.startsWith("Error") ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default CreateProductForm;