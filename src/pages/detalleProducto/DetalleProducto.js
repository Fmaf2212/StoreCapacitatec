import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./detalleProducto.css";
import "../../../src/styles-globals.css";
import InputNumber from "../../components/inputNumber/InputNumber";

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
            nombre: "Taza de cerámica clásica",
            sku: "0001",
            desc: "Taza con frases motivadoras o inspiradoras impresas. Perfecta para comenzar el día con energía positiva o como regalo motivador para alguien especial",
            costo: 19.99,
            imagen: "https://capacitatec.net/wp-content/uploads/2022/05/2.png",
          },
          {
            id: "2",
            sku: "0002",
            nombre: "Taza térmica de acero inoxidable",
            desc: "Taza con frases motivadoras o inspiradoras impresas. Perfecta para comenzar el día con energía positiva o como regalo motivador para alguien especial",
            costo: 29.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/1.2-2048x1152.png",
          },
          {
            id: "3",
            sku: "0003",
            nombre: "Taza de viaje con tapa antiderrame",
            desc: "Taza con frases motivadoras o inspiradoras impresas. Perfecta para comenzar el día con energía positiva o como regalo motivador para alguien especial",
            costo: 14.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/1-2048x1152.png",
          },
          {
            id: "4",
            sku: "0004",
            nombre: "Taza de porcelana con estampado artístico",
            desc: "Elegante taza de porcelana con un diseño artístico impreso. Perfecta para aquellos que buscan una opción estética y funcional.",
            costo: 24.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/2.1-2048x1152.png",
          },
          {
            id: "5",
            sku: "0005",
            nombre: "Set de tazas apilables",
            desc: "Conjunto de tazas diseñadas para apilarse fácilmente, ahorrando espacio en tu cocina. Variedad de colores y tamaños para adaptarse a tus necesidades.",
            costo: 34.99,
            imagen: "https://capacitatec.net/wp-content/uploads/2022/05/2.png",
          },
          {
            id: "6",
            sku: "0006",
            nombre: "Taza de cerámica esmaltada",
            desc: "Taza de cerámica con un atractivo esmaltado que le proporciona un acabado brillante y resistente. Disponible en varios colores y estilos.",
            costo: 39.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/4.1-2048x1152.png",
          },
          {
            id: "7",
            sku: "0007",
            nombre: "Taza de cristal transparente",
            desc: "Taza de cristal translúcido que permite apreciar el color y la textura de tus bebidas. Diseño elegante y moderno para ocasiones especiales.",
            costo: 49.99,
            imagen:
              "https://capacitatec.net/wp-content/uploads/2022/05/4-2048x1152.png",
          },
          {
            id: "8",
            sku: "0008",
            nombre: "Taza con mensaje motivacional",
            desc: "Taza con frases motivadoras o inspiradoras impresas. Perfecta para comenzar el día con energía positiva o como regalo motivador para alguien especial.",
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
      <img
        src={producto.imagen}
        alt={producto.nombre}
        style={{ maxWidth: "570px" }}
      />
      <div className="divDetailProduct__info">
        <section className="product-info-section">
          <h1>{producto.nombre}</h1>
          <div className="skuProduct">SKU: {producto.sku}</div>
          <p className="descProduct">{producto.desc}</p>
          <div className="moreInfoProduct">
              <div className="stacked-info-section">
                <div className="stacked-info-item">
                  <h2
                      className="info-section-title"
                  >
                      INFORMACIÓN DEL PRODUCTO
                  </h2>
                  <div className="info-section-description">
                      <p>
                      Detalles del producto. Agrega aquí más detalles sobre tu
                      producto como tamaño, material e instrucciones de
                      cuidado y de limpieza. También puedes incluir
                      especificaciones del producto, información sobre el
                      envío, ingredientes y otros aspectos.
                      </p>
                  </div>
                </div>
                <div className="stacked-info-item">
                  <h2
                    className="info-section-title"
                  >
                    POLÍTICA DE DEVOLUCIÓN Y REEMBOLSO
                  </h2>
                  <div className="info-section-description">
                    <p>
                      Soy una política de devolución y reembolso. Una
                      oportunidad ideal para explicarles a tus clientes qué
                      hacer en caso de no estar satisfechos con su compra. Al
                      ofrecerles una política de reembolso clara y sencilla,
                      generas confianza y credibilidad en tus clientes, pues
                      saben que en tu tienda pueden realizar compras con altos
                      niveles de seguridad.
                    </p>
                  </div>
                </div>
              </div>
          </div>
        </section>
        <section className="product-add-to-cart-section">
          <p className="costProduct">${producto.costo.toFixed(2)}</p>
          <div className="inputs">
            <p className="lblCant">Cantidad</p>
            <InputNumber />
            {/* <input className="cant" type="number" min="1" max="100" /> */}
            <input
              className="addCar"
              type="submit"
              value="Agregar al carrito"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetalleProducto;
