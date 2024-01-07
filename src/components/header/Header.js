import React from "react";

import { Link } from 'react-router-dom';

import "./header.css";

const Header = () => {
  return (
    <header>
      <div className="contain">
        <div className="logo">
          <img src="/images/logoCapacitec.jpg" alt="Logo" />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Tienda</Link>
            </li>
            <li>
              <Link to="/historialPedidos">Historial</Link>
            </li>
            <li>
              <Link to="/carritoCompras">Carrito</Link>
            </li>
          </ul>
        </nav>
        <div>Puntos: 100pts</div>
      </div>
    </header>
  );
};

export default Header;
