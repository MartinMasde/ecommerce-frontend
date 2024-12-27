import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddEditModal = ({ section, item, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    photo: "",
    price: "",
    stock: "",
    category: "",
    code: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        photo: item.photo || "",
        price: item.price || "",
        stock: item.stock || "",
        category: item.category || "televisores", // Valor por defecto válido
        code: item.code || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    try {
      const endpoint = item
        ? `http://localhost:8080/api/${section.toLowerCase()}/${item._id}`
        : `http://localhost:8080/api/${section.toLowerCase()}`;
      const response = await fetch(endpoint, {
        method: item ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Incluye las cookies en la solicitud
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error al guardar los datos");
      }

      const updatedData = await response.json();
      onSave(updatedData);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {item ? "Editar" : "Agregar"} {section.slice(0, -1)}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Titulo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Foto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="photo"
                  name="photo"
                  value={formData.photo}
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
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="stock" className="form-label">
                  Stock
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="stock"
                  name="stock"
                  value={formData.stock}
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
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Televisores">Televisores</option>
                  <option value="Audio">Audio</option>
                  <option value="Heladera">Heladera</option>
                </select>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="featured">
                  Destacado
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditModal;
