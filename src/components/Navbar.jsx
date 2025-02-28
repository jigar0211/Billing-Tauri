import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link

export const Navbar = () => {
  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-lg-3 ml-auto">
          
        </div>
        <div className="col-lg order-lg-first">
          <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeclassname="active">
                <i className="fa fa-home"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" data-toggle="dropdown">
                <i className="fa fa-gear"></i> Interface
              </a>
              <div className="dropdown-menu dropdown-menu-arrow">
                <a href="#" className="dropdown-item">Cards design</a>
                <a href="#" className="dropdown-item">Charts</a>
                <a href="#" className="dropdown-item">Pricing cards</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a href="#" className="nav-link" data-toggle="dropdown">
                <i className="fa fa-calendar"></i> Components
              </a>
              <div className="dropdown-menu dropdown-menu-arrow">
                <a href="./maps.html" className="dropdown-item">Maps</a>
                <a href="./icons.html" className="dropdown-item">Icons</a>
                <a href="./store.html" className="dropdown-item">Store</a>
                <a href="./blog.html" className="dropdown-item">Blog</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a href="#" className="nav-link" data-toggle="dropdown">
                <i className="fa fa-file"></i> Pages
              </a>
              <div className="dropdown-menu dropdown-menu-arrow">
                <a href="./profile.html" className="dropdown-item">Profile</a>
                <a href="./login.html" className="dropdown-item">Login</a>
                <a href="./register.html" className="dropdown-item">Register</a>
                <a href="./forgot-password.html" className="dropdown-item">Forgot password</a>
                <a href="./400.html" className="dropdown-item">400 error</a>
                <a href="./401.html" className="dropdown-item">401 error</a>
                <a href="./403.html" className="dropdown-item">403 error</a>
                <a href="./404.html" className="dropdown-item">404 error</a>
                <a href="./500.html" className="dropdown-item">500 error</a>
                <a href="./503.html" className="dropdown-item">503 error</a>
                <a href="./email.html" className="dropdown-item">Email</a>
                <a href="./empty.html" className="dropdown-item">Empty page</a>
                <a href="./rtl.html" className="dropdown-item">RTL mode</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a href="./form-elements.html" className="nav-link">
                <i className="fa fa-check-square"></i> Forms
              </a>
            </li>
            <li className="nav-item">
              <a href="./gallery.html" className="nav-link">
                <i className="fa fa-image"></i> Gallery
              </a>
            </li>
            <li className="nav-item">
              <NavLink to="/conf" className="nav-link" activeclassname="active">
                <i className="fa fa-gear"></i> Configuration
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;