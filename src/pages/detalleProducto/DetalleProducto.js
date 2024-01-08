import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import './detalleProducto.css'
import '../../../src/styles-globals.css'

const DetalleProducto = () => {

  const [value, setValue] = useState(1);
  const min = 1; // Puedes establecer el valor mínimo según tus necesidades
  const max = 100; // Puedes establecer el valor máximo según tus necesidades
  const step = 1; // Puedes establecer el paso según tus necesidades

  const handleStepper = (operation) => {
    const calcStep = operation === "increment" ? step : -step;
    const newValue = value + calcStep;

    if (newValue >= min && newValue <= max) {
      setValue(newValue);
    }
  };

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
            nombre: "Taza de cerámica clásica",
            desc:"Taza con frases motivadoras o inspiradoras impresas. Perfecta para comenzar el día con energía positiva o como regalo motivador para alguien especial",
            costo: 19.99,
            imagen: "https://capacitatec.net/wp-content/uploads/2022/05/2.png",
          },
          {
            id: "2",
            nombre: "Taza térmica de acero inoxidable",
            desc:"Taza con frases motivadoras o inspiradoras impresas. Perfecta para comenzar el día con energía positiva o como regalo motivador para alguien especial",
            costo: 29.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/1.2-2048x1152.png",
          },
          {
            id: "3",
            nombre: "Taza de viaje con tapa antiderrame",
            desc:"Taza con frases motivadoras o inspiradoras impresas. Perfecta para comenzar el día con energía positiva o como regalo motivador para alguien especial",
            costo: 14.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/1-2048x1152.png",
          },
          {
            id: "4",
            nombre: "Taza de porcelana con estampado artístico",
            desc:"Elegante taza de porcelana con un diseño artístico impreso. Perfecta para aquellos que buscan una opción estética y funcional.",
            costo: 24.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/2.1-2048x1152.png",
          },
          {
            id: "5",
            nombre: "Set de tazas apilables",
            desc:"Conjunto de tazas diseñadas para apilarse fácilmente, ahorrando espacio en tu cocina. Variedad de colores y tamaños para adaptarse a tus necesidades.",
            costo: 34.99,
            imagen: "https://capacitatec.net/wp-content/uploads/2022/05/2.png",
          },
          {
            id: "6",
            nombre: "Taza de cerámica esmaltada",
            desc:"Taza de cerámica con un atractivo esmaltado que le proporciona un acabado brillante y resistente. Disponible en varios colores y estilos.",
            costo: 39.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/4.1-2048x1152.png",
          },
          {
            id: "7",
            nombre: "Taza de cristal transparente",
            desc:"Taza de cristal translúcido que permite apreciar el color y la textura de tus bebidas. Diseño elegante y moderno para ocasiones especiales.",
            costo: 49.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/4-2048x1152.png",
          },
          {
            id: "8",
            nombre: "Taza con mensaje motivacional",
            desc:"Taza con frases motivadoras o inspiradoras impresas. Perfecta para comenzar el día con energía positiva o como regalo motivador para alguien especial.",
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
      <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '570px' }} />
      <div className="divDetailProduct__info">
        <h1>{producto.nombre}</h1>
        <p className="descProduct">{producto.desc}</p>
        <p>${producto.costo.toFixed(2)}</p>
        <div className="inputs">
          <div className="inputNumber">
            <button className="decrement" onClick={() => handleStepper("decrement")}> - </button>
            <input
              type="number"
              id="my-input"
              value={value}
              min={min}
              max={max}
              step={step}
              readOnly
            />
            <button className="increment" onClick={() => handleStepper("increment")}> + </button>
          </div>
          {/* <input className="cant" type="number" min="1" max="100" /> */}
          <input className="addCar" type="submit" value="Agregar al carrito" />
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
