import React from "react";

import { Link, useNavigate } from "react-router-dom";

import "./header.css";

const Header = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    const idUsuarioLogueado = localStorage.getItem('idUsuarioLogueado');
    if (idUsuarioLogueado) {
      const url = `/?idCliente=${idUsuarioLogueado}`;
      navigate(url);
    }
  };
  return (
    <header>
      <div className="contain">
        <div className="logo">
          <img
            src="/images/logoCapacitecSinFondo.png"
            alt="Logo"
            onClick={redirectToHome}
            style={{ cursor: 'pointer' }} 
          />
        </div>
        <nav>
          <ul>
            <li className="md:mr-12 mr-5 md:text-lg text-sm flex items-center">
              <Link to="/historialPedidos">HISTORIAL</Link>
            </li>
            <li className="md:mr-12 mr-5 md:text-lg text-sm">
              <Link to="/carritoCompras">
                <svg
                  className="canasta"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="100%"
                  height="100%"
                  viewBox="221.4 359.3 267 123"
                  data-hook="svg-icon-8"
                >
                  <rect x="221.4" y="403.7" width="152.4" height="6"></rect>
                  <path d="M345.9 482.3h-96.4c-1.2 0-2.4-1.2-3-2.4l-19.6-70.8 6-1.8 19.1 68.5h92.3l19-68.5 6 1.8 -19.6 70.8C348.2 481.1 347 482.3 345.9 482.3z"></path>
                  <rect
                    x="259"
                    y="380.1"
                    transform="matrix(-0.527 -0.8498 0.8498 -0.527 109.9867 827.3946)"
                    width="52.4"
                    height="6"
                  ></rect>
                  <rect x="292.3" y="424.5" width="10.7" height="10.7"></rect>
                  <rect x="315.5" y="424.5" width="10.7" height="10.7"></rect>
                  <rect x="269.1" y="424.5" width="10.7" height="10.7"></rect>
                  <rect x="292.3" y="447.7" width="10.7" height="10.7"></rect>
                  <rect x="315.5" y="447.7" width="10.7" height="10.7"></rect>
                  <rect x="269.1" y="447.7" width="10.7" height="10.7"></rect>
                  <text
                    id="toñoPuto"
                    x="390"
                    y="460"
                    textAnchor="start"
                    className="uxskpx M846Y_"
                    data-hook="items-count"
                  >
                    {localStorage.getItem("carritoLength") ? localStorage.getItem("carritoLength") : 0}
                  </text>
                </svg>
              </Link>
            </li>
            <li className="md:mr-12 mr-5 md:text-lg text-sm flex items-center">
              {/* Aquí puedes mostrar el nombre del usuario */}
              <div id="nombre-usuario" className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap"></div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
