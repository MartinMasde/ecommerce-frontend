import React, { useState } from "react";
import backgroundImage from "../assets/background.jpg";
import Swal from "sweetalert2";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado

  // Manejar el registro
  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Mostrar el spinner
    try {
      const data = { name, email, password };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        "http://localhost:8080/api/sessions/register",
        options
      );
      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration successful",
          text: result.message,
          timer: 3000,
          showConfirmButton: false,
        });
        setShowModal(true); // Mostrar el modal
      } else {
        Swal.fire({
          title: "Registration failed",
          text: result.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setIsLoading(false); // Ocultar el spinner
    }
  };

  // Manejar la verificación del código
  const handleVerifyCode = async () => {
    try {
      const data = { email, verifyCode };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        "http://localhost:8080/api/sessions/verify",
        options
      );
      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Verification successful",
          text: "Your account has been verified!",
          timer: 3000,
          showConfirmButton: false,
        });
        setShowModal(false); // Cerrar el modal
        window.location.href = "/login"; // Redirigir al login
      } else {
        Swal.fire({
          title: "Verification failed",
          text: result.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to verify the code.",
      });
    }
  };

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
          width: "400px",
          backgroundColor: "#1b1b1b",
          color: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h3
          className="text-center mb-4"
          style={{
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Register
        </h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="btn btn-primary w-100"
            id="register"
            disabled={isLoading}
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <a href="/login">Login</a>{" "}
        </p>
      </div>

      {/* Modal de Verificación */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Verify Your Account</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  A verification code has been sent to your email. Please enter
                  it below:
                </p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter verification code"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleVerifyCode}
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
