import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import verificarAutenticacion from '../../checkAuth';
import Swal from 'sweetalert2';

import "./detalleProducto.css";
import "../../../src/styles-globals.css";
import InputNumber from "../../components/inputNumber/InputNumber";


const DetalleProducto = () => {
  const { id } = useParams();

  const [detalleProducto, setDetalleProducto] = useState(null);

  const [cantidad, setCantidad] = useState(1);
  const [MontoTotal, setMontoTotal] = useState(0);

  const [date, setDate] = useState(0);

  useEffect(() => {
    // Verifica si el usuario está autenticado
    verificarAutenticacion();
  }, [])

  // Manejador para actualizar la cantidad
  const handleCantidadChange = (nuevaCantidad) => {
    setCantidad(nuevaCantidad);
  };
  //mandar al localStorage
  const handleAddToCart = async () => {
    const carritoExistente = JSON.parse(localStorage.getItem("carrito")) || [];
    // Verificar si el producto ya existe en el carrito
    const productoExistenteIndex = carritoExistente.findIndex(
      (producto) => producto.idProducto === detalleProducto.IdProduct
    );
    if (productoExistenteIndex !== -1) {
      // Si el producto ya existe, actualizar la cantidad y el precio
      carritoExistente[productoExistenteIndex].cantidad += cantidad;
      carritoExistente[productoExistenteIndex].montoSubTotal +=
        cantidad * detalleProducto.ProductPrice;
      await Swal.fire('Agregado correctamente');
    } else {
      // Si el producto no existe, agregarlo al carrito
      const nuevoProducto = {
        idProducto: detalleProducto.IdProduct,
        Nombre: detalleProducto.ProductName,
        cantidad: cantidad,
        precio: detalleProducto.ProductPrice,
        montoSubTotal: cantidad * detalleProducto.ProductPrice,
      };
      // Utiliza SweetAlert para mostrar un mensaje de éxito
      await Swal.fire('Agregado correctamente');
      carritoExistente.push(nuevoProducto);

      /* Modificando valor de la canasta */
      const productosEnCarrito = JSON.parse(localStorage.getItem('carrito'));
      let cantidadProductosEnCarrito;

      if (productosEnCarrito === null || productosEnCarrito.length === 0) {
        cantidadProductosEnCarrito = 1;
        localStorage.setItem('carritoLength', '1');
        document.getElementById('canasta').textContent = 1;
      } else {
        cantidadProductosEnCarrito = productosEnCarrito.length + 1;
        localStorage.setItem('carritoLength', cantidadProductosEnCarrito.toString());
        document.getElementById('canasta').textContent = cantidadProductosEnCarrito;
      }
    }
    // Calcular el nuevo monto total
    const nuevoMontoTotal = carritoExistente.reduce(
      (total, producto) => total + producto.montoSubTotal,
      0
    );
    localStorage.setItem("carrito", JSON.stringify(carritoExistente));
    localStorage.setItem("montoTotal", nuevoMontoTotal);
    localStorage.setItem("fecha", date);
    localStorage.setItem('carritoLength', carritoExistente.length);
  };

  useEffect(() => {
    // let getCarritoLength = localStorage.getItem("carritoLength");
    // if(!getCarritoLength){
    //   localStorage.setItem('carritoLength', 0);
    // }
    // Simula una llamada a una API o base de datos
    const obtenerProductoPorId = async () => {
      try {
        // Aquí deberías realizar la lógica para obtener los detalles del producto según el ID
        // Puedes utilizar servicios, llamadas a API, etc.
        const response = await fetch('https://capacitatec.net/wp-admin/admin-ajax.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            action: 'getDetalleProducto',
            filtro: id
          }),
        });

        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }

        const data = await response.json();
        console.log(data);
        setDetalleProducto(data[0])
      } catch (error) {
        console.error("Error al obtener detalles del producto:", error);
      }
    };

    function obtenerFechaFormateada() {
      const fechaActual = new Date();

      // Obtenemos los componentes de la fecha
      const dia = agregarCeroAntes(fechaActual.getDate());
      const mes = agregarCeroAntes(fechaActual.getMonth() + 1);
      const anio = fechaActual.getFullYear();
      const horas = agregarCeroAntes(fechaActual.getHours());
      const minutos = agregarCeroAntes(fechaActual.getMinutes());
      const segundos = agregarCeroAntes(fechaActual.getSeconds());

      // Formateamos la fecha
      const fechaFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;

      return fechaFormateada;
    }
    function agregarCeroAntes(numero) {
      return numero < 10 ? `0${numero}` : numero;
    }
    const fechaFormateada = obtenerFechaFormateada();
    setDate(fechaFormateada);

    obtenerProductoPorId();
  }, [id]);

  useEffect(() => {
    const actualizarMontoTotal = () => {
      if (detalleProducto) {
        const precioProducto = detalleProducto.ProductPrice || 0;
        setMontoTotal(cantidad * precioProducto);
      }
    };

    actualizarMontoTotal();
  }, [cantidad, detalleProducto]);

  if (!detalleProducto) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container divDetailProduct gap-12 md:gap-24">
      <img
        src={detalleProducto.ProductImage}
        alt={detalleProducto.ProductImage}
        className="max-w-[340px] mx-auto"
      />
      <div className="divDetailProduct__info mt-4 md:mt-0 md:ml-4 md:flex-1 flex-col md:flex-row md:gap-20 gap-4">
        <section className="product-info-section">
          <h1 className="text-2xl font-bold">{detalleProducto.ProductName}</h1>
          <div className="skuProduct text-gray-600">SKU: {detalleProducto.IdProduct}</div>
          <p className="descProduct text-gray-700">{detalleProducto.ProductDescription}</p>
        </section>
        <section className="product-add-to-cart-section mt-4">
          <p className="costProduct text-5xl md:text-[2.5em] font-bold text-center md:text-start mb-12">${detalleProducto.ProductPrice}</p>
          <div className="inputs flex flex-col md:flex-row mt-2 items-center md:items-start">
            <label className="lblCant mb-2 md:mr-4 text-xl md:text-base">Cantidad</label>
            <InputNumber cantidad={cantidad} onCantidadChange={handleCantidadChange} />
            <input
              className="bg-black bg-opacity-70 text-white px-6 py-4 md:px-4 md:py-2 mt-8 md:mt-2 border-0 rounded-none transition duration-300 ease-in-out cursor-pointer text-xl md:text-base font-normal hover:bg-[#007BA0] hover:text-white"
              type="submit"
              value="Agregar al carrito"
              onClick={handleAddToCart}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetalleProducto;
