import React from "react";
import backgroundImage from "../assets/background.jpg";

function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="card p-4 shadow"
        style={{
            width: "800px",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}>
            <h1 className="text-center"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}>Bienvenido a nuestro E-Commerce</h1>
            <p className="text-center">Explora y disfruta de nuestras ofertas exclusivas.</p>
      </div>
    </div>
  );
}

export default Home;
