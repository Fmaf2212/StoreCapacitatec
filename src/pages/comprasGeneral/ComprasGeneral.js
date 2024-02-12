import React, { useEffect, useState } from 'react'
import Modal from './Modal'
// import verificarAutenticacion from '../../../src/auth';

const ComprasGeneral = () => {
  const [historialGeneralPedidos, setHistorialGeneralPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [detallePedido, setDetallePedido] = useState([]);

  const [estados, setEstados] = useState(Array(historialGeneralPedidos.length).fill('Pendiente'));

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Puedes ajustar la cantidad de elementos por página

  useEffect(() => {
    // Verifica si el usuario está autenticado
    // verificarAutenticacion();

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
              action: "getComprasGeneral"
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setHistorialGeneralPedidos(data);
        setEstados(Array(data.length).fill('Pendiente'));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDetalleClick = async (idCli, index) => {
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
            action: "getComprasGeneral",
            idCliente: idCli,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const detalleData = await response.json();
      console.log(detalleData);
      const arrayDeObjetos = JSON.parse(detalleData[index].DetalleCompra);
      setDetallePedido(arrayDeObjetos);
      console.log(arrayDeObjetos);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching detalle pedido:", error);
    }
  };

  const handleAprobarClick = async (index, idCompra) => {
    console.log(idCompra);
    try {
      const response = await fetch(
        "https://capacitatec.net/wp-admin/admin-ajax.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            action: "updateEstadoCompra",
            filtro: idCompra,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      const nuevosEstados = [...estados];
      nuevosEstados[index] = 'Aprobado';
      setEstados(nuevosEstados);

    } catch (error) {
      console.error("Error fetching aprobar compra:", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDetallePedido([]); // Limpiar detalles cuando se cierra el modal
  };

  // Función para obtener los elementos que se mostrarán en la página actual
  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return historialGeneralPedidos.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Función para cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Renderización de filas de la tabla
  const renderTableRows = () => {
    return getCurrentItems().map((pedido, index) => (
      <tr key={pedido.IdCompra} className="hover:bg-gray-100">
        <td className="py-2 px-4 border-b text-center">{pedido.IdCliente}</td>
        <td className="py-2 px-4 border-b text-center">{pedido.IdCompra}</td>
        <td className="py-2 px-4 border-b text-center">{pedido.Fecha}</td>
        <td className="py-2 px-4 border-b text-center">{`S/ ${pedido.Monto}`}</td>
        <td className="py-2 px-4 border-b text-center">{estados[index]}</td>
        <td className="py-2 px-4 border-b text-center">
          <button
            onClick={() => handleDetalleClick(pedido.IdCliente, index)}
            className="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded"
          >
            Detalle
          </button>
        </td>
        <td className="py-2 px-4 border-b text-center">
          <button
            onClick={() => handleAprobarClick(index, pedido.IdCompra)}
            className="bg-lime-500 hover:bg-lime-600 transition-colors text-white font-bold py-2 px-4 rounded"
          >
            Aprobar
          </button>
        </td>
      </tr>
    ));
  };


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Historial General de Pedidos</h1>
      <p className="text-gray-600 mb-4">
        Lista de pedidos de todos los clientes desde la creación de sus cuentas.
      </p>
      {loading ? (
        <p className="text-gray-600">Cargando historial general de pedidos...</p>
      ) : (
        <div className='md:overflow-hidden overflow-auto'>
          <table className="table-auto w-max border border-gray-300 rounded-md w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b text-center">Id Cliente</th>
                <th className="py-2 px-4 border-b text-center">Referencia del Pedido</th>
                <th className="py-2 px-4 border-b text-center">Fecha</th>
                <th className="py-2 px-4 border-b text-center">Precio total</th>
                <th className="py-2 px-4 border-b text-center">Estado</th>
                <th className="py-2 px-4 border-b text-center">Detalle de Pedido</th>
                <th className="py-2 px-4 border-b text-center"></th>
              </tr>
            </thead>
            <tbody>
              {/* {historialGeneralPedidos.map((pedido, index) => (
                <tr key={pedido.IdCompra} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">{pedido.IdCliente}</td>
                  <td className="py-2 px-4 border-b text-center">{pedido.IdCompra}</td>
                  <td className="py-2 px-4 border-b text-center">{pedido.Fecha}</td>
                  <td className="py-2 px-4 border-b text-center">{`S/ ${pedido.Monto}`}</td>
                  <td className="py-2 px-4 border-b text-center">{estados[index]}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDetalleClick(pedido.IdCliente, index)}
                      className="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded"
                    >
                      Detalle
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleAprobarClick(index, pedido.IdCompra)}
                      className="bg-lime-500 hover:bg-lime-600 transition-colors text-white font-bold py-2 px-4 rounded"
                    >
                      Aprobar
                    </button>
                  </td>
                </tr>
              ))} */}
              {renderTableRows()}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <ul className="flex space-x-2">
              {Array.from({ length: Math.ceil(historialGeneralPedidos.length / itemsPerPage) }).map((_, index) => (
                <li key={index} className={`pagination-item ${currentPage === index + 1 ? 'active focus:outline-none focus:ring focus:border-blue-300 bg-gray-600 hover:bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center transition duration-300' : 'focus:outline-none focus:ring focus:border-blue-300  text-black w-8 h-8 rounded-full flex items-center justify-center transition duration-300'}`}>
                  <button onClick={() => paginate(index + 1)} className="">
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {modalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Detalle de Pedido</h2>
            <div className='overflow-auto'>
              <table className="table-auto w-full border border-gray-300 rounded-md">
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
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ComprasGeneral