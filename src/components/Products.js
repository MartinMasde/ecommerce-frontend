import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/background.jpg";
import defaultImage from "../assets/default_img_product.jpg"; // Imagen por defecto

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products'); // URL de tu API
        const data = await response.json();
        if (Array.isArray(data.response)) {
          setProducts(data.response);
        } else {
          console.error("Error: Expected an array of products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div className="col" key={product._id}>
                <div className="card h-100 p-4 shadow" style={{ backgroundColor: "#1b1b1b", color: "white", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                  <img src={product.photo && product.photo !== "../../../../public/img/photo_default.jpg" ? product.photo : defaultImage} className="card-img-top" alt={product.title} style={{ borderRadius: "8px" }} />
                  <div className="card-body text-center">
                    <h5 className="card-title" style={{ fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>{product.title}</h5>
                    <p className="card-text" style={{ fontSize: "18px", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }}>Price: ${product.price}</p>
                    <p className="card-text" style={{ fontSize: "18px", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }}>Stock: {product.stock}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">No products available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;


// import React from "react";
// import backgroundImage from "../assets/background.jpg";

// function Products() {
//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{
//         height: "100vh",
//         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div
//         className="card p-4 shadow"
//         style={{
//           width: "600px",
//           backgroundColor: "#1b1b1b",
//           color: "white",
//           borderRadius: "8px",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//           textAlign: "center",
//         }}
//       >
//         <h1
//           className="mb-4"
//           style={{
//             fontWeight: "bold",
//             textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
//           }}
//         >
//           Productos
//         </h1>
//         <p
//           style={{
//             fontSize: "18px",
//             textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
//           }}
//         >
//           Aquí están los productos disponibles.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Products;