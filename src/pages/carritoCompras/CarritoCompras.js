import React from "react";

import './carritoCompras.css'

const CarritoCompras = () => {
  return (
    <div>
      <h1>Carro de Compras</h1>
      <table className="tableCarritoCompras">
        <thead>
          <tr>
            <th>Descartar</th>
            <th>Imagen</th>
            <th>Nombre Producto</th>
            <th>Cantidad</th>
            <th>Precio Unit.</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button>Eliminar</button>
            </td>
            <td>
              <img src="https://capacitatec.net/wp-content/uploads/2022/05/2.png" alt="Producto 1" />
            </td>
            <td>Producto 1</td>
            <td>2</td>
            <td>$20.00</td>
            <td>$40.00</td>
          </tr>
          <tr>
            <td>
              <button>Eliminar</button>
            </td>
            <td>
              <img src="https://capacitatec.net/wp-content/uploads/2022/05/1.2-2048x1152.png" alt="Producto 2" />
            </td>
            <td>Producto 2</td>
            <td>1</td>
            <td>$30.00</td>
            <td>$30.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CarritoCompras;
