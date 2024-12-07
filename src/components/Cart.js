import React from "react";
import backgroundImage from "../assets/background.jpg";

function Cart() {
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
    <div
      className="card p-4 shadow"
      style={{
        width: "600px",
        backgroundColor: "#1b1b1b",
        color: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
      }}
    >
      <h1
        className="mb-4"
        style={{
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
       Tu carrito de compras
      </h1>
      {/* <p
        style={{
          fontSize: "18px",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        Aquí están los productos disponibles.
      </p> */}
    </div>
  </div>
  );
}

export default Cart;