import React, {useState, useEffect} from "react";
import Swal from 'sweetalert2';
import './carritoCompras.css'
import { useNavigate  } from "react-router-dom";

const CarritoCompras = () => {
  const navigate = useNavigate();
  const [detallesProductos, setDetallesProductos] = useState([]);
  const [montoTotal, setMontoTotal] = useState(0);
  const [fecha, setFecha] = useState('');
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const obtenerProductos = async () => {
      const storedMontoTotal = localStorage.getItem('montoTotal');
      const storedFecha = localStorage.getItem('fecha');
      setMontoTotal(storedMontoTotal || 0);
      setFecha(storedFecha || '');
      // Obtener el array de productos almacenado en el localStorage
      const productosGuardados = JSON.parse(localStorage.getItem('carrito')) || [];

      // Actualizar el estado con los productos
      setProductos(productosGuardados);

      // Obtener detalles de productos
      const detallesPromises = productosGuardados.map(async (producto) => {
        const detalleProducto = await obtenerDetalleProducto(producto.idProducto);
        return detalleProducto;
      });
      console.log(detallesPromises)
      // Esperar a que todas las promesas se resuelvan
      const detallesResueltos = await Promise.all(detallesPromises);
      console.log(detallesResueltos)
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
      // Verifica si hay datos válidos en la respuesta
      if (Array.isArray(data) && data.length > 0) {
        return data[0];
      } else {
        console.error('Respuesta sin datos válidos:', data);
        return null;
      }
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
        Swal.fire('Detalle de compra guardado correctamente').then(()=>{
          // Redirigir a la página de ListadoProductos
          navigate('/');
          // Limpiar el localStorage
          localStorage.clear()
        });
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

  const handleEliminarProducto = (index) => {
    // Crear copias de los arrays
    const nuevosProductos = [...productos];
    const nuevosDetallesProductos = [...detallesProductos];

    // Obtener el producto que se eliminará
    const productoEliminado = nuevosProductos[index];

    // Encontrar el índice del producto eliminado en los detalles
    const indexDetalleEliminado = nuevosDetallesProductos.findIndex((detalle) => detalle.IdProduct === productoEliminado.idProducto);
      console.log(indexDetalleEliminado)
    // Verificar si se encontró un detalle asociado al producto eliminado
    if (indexDetalleEliminado !== -1) {
      // Eliminar el producto y su detalle correspondiente
      nuevosProductos.splice(index, 1);
      nuevosDetallesProductos.splice(indexDetalleEliminado, 1);

      // Actualizar el estado con los nuevos arrays
      setProductos(nuevosProductos);
      setDetallesProductos(nuevosDetallesProductos);

      // Actualizar el localStorage
      localStorage.setItem('carrito', JSON.stringify(nuevosProductos));

      // Recalcular el monto total basándonos en los productos actuales
      const nuevoMontoTotal = nuevosProductos.reduce((total, producto) => {
        const detalleProducto = nuevosDetallesProductos.find((detalle) => detalle.IdProduct  === producto.idProducto);

        // Verificar si se encontró un detalle asociado al producto actual
        if (detalleProducto) {
          return total + detalleProducto.ProductPrice * producto.cantidad;
        } else {
          console.warn('No se encontró un detalle asociado al producto actual:', producto);
          return total;
        }
      }, 0);

      // Actualizar el estado con el nuevo monto total
      setMontoTotal(nuevoMontoTotal);
      localStorage.setItem('montoTotal', nuevoMontoTotal);
      const productosEnCarrito = JSON.parse(localStorage.getItem('carrito'))
      const cantidadProductosEnCarrito = productosEnCarrito.length;
      localStorage.setItem('carritoLength', cantidadProductosEnCarrito.toString());
      document.getElementById('toñoPuto').textContent = cantidadProductosEnCarrito;
    } else {
      console.warn('No se encontró un detalle asociado al producto eliminado:', productoEliminado);
      // Manejo adicional si es necesario
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
          {detallesProductos.map((detalleProducto, index) => {
            const producto = productos[index];
            if (!producto || !detalleProducto || typeof detalleProducto.ProductPrice === 'undefined') {
              // Si el producto o el detalleProducto son undefined, muestra un mensaje o maneja la situación de alguna manera.
              return null; // O puedes renderizar un componente vacío o un mensaje de error.
            }
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
                <button onClick={() => handleEliminarProducto(index)}>Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-4/5 my-5 mx-auto px-5 flex justify-end text-2xl">Monto Total: ${localStorage.getItem("montoTotal")}</div>
      <button className="bg-opacity-70 bg-black hover:bg-[#007BA0] text-white py-3 px-6 rounded-none border-0 transition duration-300 ease-in-out cursor-pointer font-sans text-base mt-8" onClick={handlePagarAhora}>Pagar Ahora</button>
    </div>
  );
};

export default CarritoCompras;
