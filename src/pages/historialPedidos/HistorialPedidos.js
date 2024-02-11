import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Reemplaza "path-to-your-modal-component" con la ruta real a tu componente modal

import "./historialPedidos.css";

const HistorialPedidos = () => {
  const [historialPedidos, setHistorialPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [detallePedido, setDetallePedido] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://capacitatec.net/wp-admin/admin-ajax.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              action: "getHistorialCompras",
              idCliente: 14582,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setHistorialPedidos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDetalleClick = async (idCli) => {
    console.log(idCli);
    try {
      const response = await fetch(
        "https://capacitatec.net/wp-admin/admin-ajax.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            action: "getHistorialCompras",
            idCliente: idCli,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const detalleData = await response.json();
      console.log(detalleData);
      console.log(detalleData[0].DetalleCompra);
      const arrayDeObjetos = JSON.parse(detalleData[0].DetalleCompra);
      setDetallePedido(arrayDeObjetos);
      console.log(arrayDeObjetos);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching detalle pedido:", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDetallePedido([]); // Limpiar detalles cuando se cierra el modal
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Historial de Pedidos</h1>
      <p className="text-gray-600 mb-4">
        Lista de pedidos desde la creación de su cuenta.
      </p>
      {loading ? (
        <p className="text-gray-600">Cargando historial de pedidos...</p>
      ) : (
        <table className="table-auto w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b text-center">Referencia del Pedido</th>
              <th className="py-2 px-4 border-b text-center">Fecha</th>
              <th className="py-2 px-4 border-b text-center">Precio total</th>
              <th className="py-2 px-4 border-b text-center">Estado</th>
              <th className="py-2 px-4 border-b text-center">Detalle de Pedido</th>
            </tr>
          </thead>
          <tbody>
            {historialPedidos.map((pedido) => (
              <tr key={pedido.IdCompra} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center">{pedido.IdCompra}</td>
                <td className="py-2 px-4 border-b text-center">{pedido.Fecha}</td>
                <td className="py-2 px-4 border-b text-center">{`S/ ${pedido.Monto}`}</td>
                <td className="py-2 px-4 border-b text-center">{pedido.Estado}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleDetalleClick(pedido.IdCliente)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Detalle de Pedido</h2>
            <table className="table-auto w-full border border-gray-300 rounded-md overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b text-center bg-slate-600 text-white">Producto</th>
                  <th className="py-2 px-4 border-b text-center bg-slate-600 text-white">Cantidad</th>
                  <th className="py-2 px-4 border-b text-center bg-slate-600 text-white">Precio</th>
                  <th className="py-2 px-4 border-b text-center bg-slate-600 text-white">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {detallePedido.map((detalle, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="py-2 px-4 border-b text-center">
                      {detalle.Nombre}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {detalle.cantidad}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      S/ {detalle.precio}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      S/ {(detalle.cantidad * detalle.precio).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default HistorialPedidos;
