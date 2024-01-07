import React from "react";

import './historialPedidos.css'

const HistorialPedidos = () => {
  return (
    <div>
      <h1>Historial de Pedidos</h1>
      <p>Lista de pedidos desde la creación de su cuenta.</p>
      <table>
        <thead>
          <tr>
            <th>Referencia del Pedido</th>
            <th>Fecha</th>
            <th>Precio total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>123456</td>
            <td>2023-01-01</td>
            <td>$150.00</td>
            <td>En proceso</td>
          </tr>
          <tr>
            <td>789012</td>
            <td>2023-02-01</td>
            <td>$200.00</td>
            <td>Entregado</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HistorialPedidos;
