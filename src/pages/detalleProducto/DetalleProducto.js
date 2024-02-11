import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./detalleProducto.css";
import "../../../src/styles-globals.css";
import InputNumber from "../../components/inputNumber/InputNumber";


const DetalleProducto = () => {
  const { id } = useParams();

  const [detalleProducto, setDetalleProducto] = useState(null);

  const [cantidad, setCantidad] = useState(1);
  const [MontoTotal, setMontoTotal] = useState(0);

  const [date, setDate] = useState(0);

  // Manejador para actualizar la cantidad
  const handleCantidadChange = (nuevaCantidad) => {
    setCantidad(nuevaCantidad);
  };
  //mandar al localStorage
  const handleAddToCart = () => {
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
    } else {
      // Si el producto no existe, agregarlo al carrito
      const nuevoProducto = {
        idProducto: detalleProducto.IdProduct,
        cantidad: cantidad,
        precio: detalleProducto.ProductPrice,
        montoSubTotal: cantidad * detalleProducto.ProductPrice,
      };
      carritoExistente.push(nuevoProducto);
      /* Modificando valor de la canasta */
      const productosEnCarrito = JSON.parse(localStorage.getItem('carrito'));
      let cantidadProductosEnCarrito;

      if (productosEnCarrito === null || productosEnCarrito.length === 0) {
        cantidadProductosEnCarrito = 1;
        localStorage.setItem('carritoLength', '1');
        document.getElementById('toñoPuto').textContent = 1;
      } else {
        cantidadProductosEnCarrito = productosEnCarrito.length + 1;
        localStorage.setItem('carritoLength', cantidadProductosEnCarrito.toString());
        document.getElementById('toñoPuto').textContent = cantidadProductosEnCarrito;
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
    localStorage.setItem("idUsuarioLogueado", 14381);
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
    <div className="container divDetailProduct">
      <img
        src={detalleProducto.ProductImage}
        alt={detalleProducto.ProductImage}
        style={{ maxWidth: "370px" }}
      />
      <div className="divDetailProduct__info">
        <section className="product-info-section">
          <h1>{detalleProducto.ProductName}</h1>
          <div className="skuProduct">SKU: {detalleProducto.IdProduct}</div>
          <p className="descProduct">{detalleProducto.ProductDescription}</p>
        </section>
        <section className="product-add-to-cart-section">
          <p className="costProduct">${detalleProducto.ProductPrice}</p>
          <div className="inputs">
            <p className="lblCant">Cantidad</p>
            <InputNumber cantidad={cantidad} onCantidadChange={handleCantidadChange} />
            {/* <input className="cant" type="number" min="1" max="100" /> */}
            <input
              className="bg-black bg-opacity-70 text-white px-[25px] py-[15px] border-0 rounded-none transition duration-300 ease-in-out cursor-pointer text-xl font-normal mt-8 hover:bg-[#007BA0] hover:text-white"
              type="submit"
              value="Agregar al carrito"
              onClick={handleAddToCart}
            />
            <p>{MontoTotal}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetalleProducto;
