import React, { useState }  from "react";

import './producto.css'
import { Link } from "react-router-dom";

const Producto = ({number, precio, img}) => {
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const mostrarOpcionesHandler = (id) => {
      setMostrarOpciones({ ...mostrarOpciones, [id]: true });
    };
  
    const ocultarOpcionesHandler = (id) => {
      setMostrarOpciones({ ...mostrarOpciones, [id]: false });
    };
  return (
    <div
      className="product"
      onMouseEnter={() => mostrarOpcionesHandler({number})}
      onMouseLeave={() => ocultarOpcionesHandler({number})}
    >
      <div className="bloqueImg">
        <img
          src={img}
          alt={`Producto ${number}`}
        />
        {mostrarOpciones[{number}] && (
          <div className="opciones">
            <Link to={`/detalleProducto/${number}`}>
                <img src="/images/search.png" alt="" />
            </Link>
            <img src="/images/add-to-cart.png" alt="" />
          </div>
        )}
      </div>
      <div className="product-info">
        <div className="product-title">Producto {number}</div>
        <div className="product-price">${precio}</div>
      </div>
    </div>
  );
};

export default Producto;
