import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import './detalleProducto.css'
import '../../../src/styles-globals.css'

const DetalleProducto = () => {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Simula una llamada a una API o base de datos
    const obtenerProductoPorId = async () => {
      try {
        // Aquí deberías realizar la lógica para obtener los detalles del producto según el ID
        // Puedes utilizar servicios, llamadas a API, etc.

        // Ejemplo: Obtener detalles de un producto de una lista simulada
        const listaProductos = [
          {
            id: "1",
            nombre: "Producto 1",
            costo: 19.99,
            imagen: "https://capacitatec.net/wp-content/uploads/2022/05/2.png",
          },
          {
            id: "2",
            nombre: "Producto 2",
            costo: 29.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/1.2-2048x1152.png",
          },
          {
            id: "3",
            nombre: "Producto 3",
            costo: 14.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/1-2048x1152.png",
          },
          {
            id: "4",
            nombre: "Producto 4",
            costo: 24.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/2.1-2048x1152.png",
          },
          {
            id: "5",
            nombre: "Producto 5",
            costo: 34.99,
            imagen: "https://capacitatec.net/wp-content/uploads/2022/05/2.png",
          },
          {
            id: "6",
            nombre: "Producto 6",
            costo: 39.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/4.1-2048x1152.png",
          },
          {
            id: "7",
            nombre: "Producto 7",
            costo: 49.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/4-2048x1152.png",
          },
          {
            id: "8",
            nombre: "Producto 8",
            costo: 19.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/peru-1-2048x1152.png",
          },
        ];

        const productoEncontrado = listaProductos.find(
          (prod) => prod.id === id
        );

        if (productoEncontrado) {
          setProducto(productoEncontrado);
        } else {
          // Manejar el caso en el que no se encuentre el producto
          console.log("Producto no encontrado");
        }
      } catch (error) {
        // Manejar errores de la llamada a la API o base de datos
        console.error("Error al obtener detalles del producto:", error);
      }
    };

    obtenerProductoPorId();
  }, [id]);

  if (!producto) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container divDetailProduct">
      <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '570px' }}/>
      <div className="divDetailProduct__info">
        <h1>{producto.nombre}</h1>
        <p>${producto.costo.toFixed(2)}</p>
        <div className="inputs">
          <input className="cant" type="number" min="1" max="100" />
          <input className="addCar" type="submit" value="Agregar al carrito" />
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
