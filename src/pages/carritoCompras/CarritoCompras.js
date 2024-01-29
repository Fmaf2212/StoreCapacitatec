import React, {useState, useEffect} from "react";
import Swal from 'sweetalert2';
import './carritoCompras.css'

const CarritoCompras = () => {
  const [detallesProductos, setDetallesProductos] = useState([]);
  const [montoTotal, setMontoTotal] = useState(0);
  const [fecha, setFecha] = useState('');
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const obtenerProductos = async () => {
      const storedMontoTotal = localStorage.getItem('MontoTotal');
      const storedFecha = localStorage.getItem('fecha');
      setMontoTotal(storedMontoTotal || 0);
      setFecha(storedFecha || '');
      // Obtener el array de productos almacenado en el localStorage
      const productosGuardados = JSON.parse(localStorage.getItem('producto')) || [];

      // Actualizar el estado con los productos
      setProductos(productosGuardados);

      // Obtener detalles de productos
      const detallesPromises = productosGuardados.map(async (producto) => {
        const detalleProducto = await obtenerDetalleProducto(producto.idProducto);
        return detalleProducto;
      });

      // Esperar a que todas las promesas se resuelvan
      const detallesResueltos = await Promise.all(detallesPromises);

      // Actualizar el estado con los detalles de los productos
      setDetallesProductos(detallesResueltos);
    };

    obtenerProductos();
  }, []);
  const obtenerDetalleProducto = async (idProducto) => {
    try {
      // Realizar solicitud al servicio para obtener el detalle del producto
      const response = await fetch('https://capacitatec.net/wp-admin/admin-ajax.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          action: 'getDetalleProducto',
          filtro: idProducto
        }),
      });

      if (!response.ok) {
        throw new Error('Error al obtener detalles del producto');
      }

      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error("Error al obtener detalles del producto:", error);
      return null;
    }
  };
  const handlePagarAhora = async () => {
    // Construir objeto con la información
    const compraData = {
      fecha,
      montototal: montoTotal,
      idcliente: 14381,
      detalle: productos,
    };
    console.log(compraData);
    console.log(JSON.stringify(compraData));
    try {
      // Enviar la información al servicio
      const response = await fetch('https://capacitatec.net/wp-admin/admin-ajax.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          action: 'saveCompra',
          compra: JSON.stringify(compraData),
        }),
      });
      if (response.ok) {
        // Utiliza SweetAlert para mostrar un mensaje de éxito
        Swal.fire('Detalle de compra guardado correctamente').then(()=>{localStorage.clear()});
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar el detalle de compra',
          text: 'Hubo un problema al procesar la solicitud.',
        });
      }
    } catch (error) {
      console.error('Error en la conexión al realizar la compra:', error);
      // Maneja el error si ocurre durante la solicitud
      Swal.fire({
        icon: 'error',
        title: 'Error al procesar la solicitud',
        text: 'Hubo un problema al procesar la solicitud.',
      });
    }
  };
  return (
    <div className="my-8">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">Carro de Compras</h1>
      <table className="tableCarritoCompras w-full border border-gray-300">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre Producto</th>
            <th>Cantidad</th>
            <th>Precio Unit.</th>
            <th>Total</th>
            <th>Descartar</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>
              <img src="https://capacitatec.net/wp-content/uploads/2022/05/2.png" alt="Producto 1" />
            </td>
            <td>Producto 1</td>
            <td>2</td>
            <td>$20.00</td>
            <td>$40.00</td>
            <td>
              <button>Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>
              <img src="https://capacitatec.net/wp-content/uploads/2022/05/1.2-2048x1152.png" alt="Producto 2" />
            </td>
            <td>Producto 2</td>
            <td>1</td>
            <td>$30.00</td>
            <td>$30.00</td>
            <td>
              <button>Eliminar</button>
            </td>
          </tr> */}
          {detallesProductos.map((detalleProducto, index) => {
            const producto = productos[index];
            return (
              <tr key={index}>
                <td>
                  <img src={detalleProducto ? detalleProducto.ProductImage : ''} alt={`Producto ${index + 1}`} />
                </td>
                <td>{detalleProducto ? detalleProducto.ProductName : ''}</td>
                <td>{producto.cantidad}</td>
                <td>{detalleProducto ? `$${detalleProducto.ProductPrice}` : ''}</td>
                <td>{detalleProducto ? `$${detalleProducto.ProductPrice * producto.cantidad}` : ''}</td>
                <td>
                  <button>Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="bg-opacity-70 bg-black hover:bg-[#007BA0] text-white py-3 px-6 rounded-none border-0 transition duration-300 ease-in-out cursor-pointer font-sans text-base mt-8" onClick={handlePagarAhora}>Pagar Ahora</button>
    </div>
  );
};

export default CarritoCompras;
