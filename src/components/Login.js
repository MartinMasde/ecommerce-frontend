import React, { useState } from "react";
import backgroundImage from "../assets/background.jpg";
import googleLogo from "../assets/google_logo_icon.svg";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = { email, password };
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };

      // URL completa para la solicitud al backend
      const response = await fetch('http://localhost:8080/api/sessions/login', options); 
      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'Success!',
          title: 'You have successfully logged in',
          text: result.message,
          timer: 3000,
          showConfirmButton: false
        });

        setTimeout(() => {
          navigate('/products'); // Redirige a la página de productos
        }, 3000); 
      } else {
        Swal.fire({
          title: 'Login failed',
          text: result.message,
          icon: 'error'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  const handleGoogleLogin = () => {
    // Redirigir al endpoint del backend para el login con Google
    window.location.href = "http://localhost:8080/api/sessions/google";
  };

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
          width: "400px",
          backgroundColor: "#1b1b1b",
          color: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
        }}>
        <h3 className="text-center mb-4"
          style={{
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
          }}>Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input   type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required/>
          </div>
          <button className="btn btn-primary w-100" id="login">Login</button>
        </form>
        {/* <!-- Agregar botón para login con Google --> */}
        <div className="my-1">
          <hr className="bg-light" />
          <p className="text-center text-light" style={{ margin: "-1rem 0" }}>Or</p>
          <hr className="bg-light" />
        </div>
        <div className="text-center">
          <button 
            className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center" 
            onClick={handleGoogleLogin}
            style={{ gap: "10px" }}>
            <img 
              src={googleLogo} 
              alt="Google Logo" 
              style={{ width: "20px", height: "20px" }} />
            Register with Google
          </button>
        </div>
        <p className="mt-3 text-center">Don't have an account? <a href="/register">Register</a> </p>
      </div>
    </div>
  );
}

export default Login;
