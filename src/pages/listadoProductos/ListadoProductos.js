import React from "react";

import './listadoProductos.css'
import Producto from "../../components/product/Producto";

// import addToCart from './images/add-to-cart.png'
// import search from './images/search.png'

const ListadoProductos = () => {

  return (
    <div className="container listadoProductos">

      <Producto nomProduct={"Taza de cerámica clásica"} number={1} precio={19.99} img={'https://capacitatec.net/wp-content/uploads/2022/05/2.png'} />
      <Producto nomProduct={"Taza térmica de acero inoxidable"} number={2} precio={29.99} img={'https://capacitatec.net/wp-content/uploads/2022/05/1.2-2048x1152.png'} />
      <Producto nomProduct={"Taza de viaje con tapa antiderrame"} number={3} precio={14.99} img={'https://capacitatec.net/wp-content/uploads/2022/05/1-2048x1152.png'} />
      <Producto nomProduct={"Taza de viaje con tapa antiderrame"} number={4} precio={24.99} img={'https://capacitatec.net/wp-content/uploads/2022/05/2.1-2048x1152.png'} />
      <Producto nomProduct={"Taza de cerámica clásica"} number={5} precio={34.99} img={'https://capacitatec.net/wp-content/uploads/2022/05/2.png'} />
      <Producto nomProduct={"Taza de cerámica clásica"} number={6} precio={39.99} img={'https://capacitatec.net/wp-content/uploads/2022/05/4.1-2048x1152.png'} />
      <Producto nomProduct={"Taza de cerámica clásica"} number={7} precio={49.99} img={'https://capacitatec.net/wp-content/uploads/2022/05/4-2048x1152.png'} />
      <Producto nomProduct={"Taza de cerámica clásica"} number={8} precio={19.99} img={'https://capacitatec.net/wp-content/uploads/2022/05/peru-1-2048x1152.png'} />
    </div>
  );
};

export default ListadoProductos;
