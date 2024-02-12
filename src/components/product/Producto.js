import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./producto.css";

const Producto = ({ nomProduct, number, precio, img }) => {
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const mostrarOpcionesHandler = () => {
    setMostrarOpciones(true);
  };

  const ocultarOpcionesHandler = () => {
    setMostrarOpciones(false);
  };

  return (
    <div
      className="product shadow-lg w-4"
      onMouseEnter={mostrarOpcionesHandler}
      onMouseLeave={ocultarOpcionesHandler}
    >
      <div className="bloqueImg">
        <img src={img} alt={`Producto ${number}`} />
        {mostrarOpciones && (
          <div className="opciones">
            <Link to={`/detalleProducto/${number}`}>
              <img src="/images/search.png" alt="" />
            </Link>
            {/* <img src="/images/add-to-cart.png" alt="" /> */}
          </div>
        )}
      </div>
      <div className="product-info">
        <div className="product-title">{nomProduct}</div>
        <div className="product-price">${precio}</div>
      </div>
    </div>
  );
};

export default Producto;
