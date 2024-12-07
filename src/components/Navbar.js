import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          E-Commerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li>
                {/* <!-- Badge --> */}
                <li className="nav-item me-3 me-lg-0">
                  <Link className="nav-link" to="/cart">
                    <span><i className="fas fa-shopping-cart"></i></span>
                    {/* <span className="badge rounded-pill badge-notification bg-danger">1</span> <!-- ver de integrar y que muestre los productos que voy agregando al carrito, que sea dinamico--> */}
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <span className="nav-link">Online</span>
                </li> */}
                <li className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle d-flex align-items-center btn btn-link" id="navbarDropdownMenuLink"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://mdbootstrap.com/img/Photos/Avatars/img (3).jpg" className="rounded-circle" height="22"
                      alt="" loading="lazy" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                    <li><Link className="dropdown-item" to="/profile">My profile</Link></li>
                    <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                    <li><button className="dropdown-item" onClick={handleSignOut}>Logout</button></li>
                  </ul>
                </li>
                {/* <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </li> */}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
