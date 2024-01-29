import React, { useEffect, useState } from "react";

import './listadoProductos.css'
import Producto from "../../components/product/Producto";

// import addToCart from './images/add-to-cart.png'
// import search from './images/search.png'

const ListadoProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Llamada al servicio POST cuando el componente se monta
    const fetchData = async () => {
      try {
        const response = await fetch('https://capacitatec.net/wp-admin/admin-ajax.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            action: 'getProductosGeneral',
            // Otros parámetros en el cuerpo según sea necesario
          }),
        });

        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }

        // Manejar la respuesta aquí si es necesario
        const data = await response.json();
        console.log(data);
        setProductos(data);
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container listadoProductos">
      {productos.map((producto) => (
        <Producto
          key={producto.IdProduct}  // Asegúrate de tener una propiedad 'key' única para cada producto
          nomProduct={producto.ProductName}
          number={producto.IdProduct}
          precio={producto.ProductPrice}
          img={producto.ProductImage}
        />
      ))}
    </div>
  );
};

export default ListadoProductos;
