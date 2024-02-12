import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

import './listadoProductos.css'
import Producto from "../../components/product/Producto";

// import addToCart from './images/add-to-cart.png'
// import search from './images/search.png'

const ListadoProductos = () => {
  const [productos, setProductos] = useState([]);
  // Obtiene el historial de navegación y la ubicación actual
  const navigate = useNavigate();
  const location = useLocation();

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
    // Función para verificar la URL y el parámetro de consulta
    const verificarURL = async () => {
      const searchParams = new URLSearchParams(location.search);
      const idClienteParam = searchParams.get('idCliente');
      const idUsuarioLogueado = localStorage.getItem('idUsuarioLogueado');

      if ((!isNaN(idClienteParam) && idClienteParam > 0) || idUsuarioLogueado !== null) {
        if (!isNaN(idClienteParam) && idClienteParam > 0) {
          localStorage.setItem("idUsuarioLogueado", idClienteParam);
          try {
            // Aquí deberías realizar la lógica para obtener los detalles del producto según el ID
            // Puedes utilizar servicios, llamadas a API, etc.
            const response = await fetch('https://capacitatec.net/wp-admin/admin-ajax.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                action: 'getDatosUsuario',
                filtro: idClienteParam
              }),
            });
            if (!response.ok) {
              throw new Error('Error al obtener productos');
            }
            const data = await response.json();
            localStorage.setItem("nombres", data[0].display_name);
            document.getElementById("nombre-usuario").textContent = data[0].display_name;
            if (idUsuarioLogueado === null) {
              const fechaActual = new Date();
              const hora = fechaActual.getHours();
              const minutos = fechaActual.getMinutes();
              const segundos = fechaActual.getSeconds();
              const horaFormateada = `${hora}:${minutos}:${segundos}`;
              localStorage.setItem("horaIngreso", horaFormateada);
            } else {
              if (idClienteParam !== idUsuarioLogueado) {
                const fechaActual = new Date();
                const hora = fechaActual.getHours();
                const minutos = fechaActual.getMinutes();
                const segundos = fechaActual.getSeconds();
                const horaFormateada = `${hora}:${minutos}:${segundos}`;
                localStorage.setItem("horaIngreso", horaFormateada);
              }
            }
          } catch (error) {
            console.error("Error al obtener detalles del producto:", error);
          }
        }
        document.getElementById("nombre-usuario").textContent = localStorage.getItem('nombres');
      } else {
        // Si el parámetro es incorrecto, mostrar SweetAlert y redirigir al hacer clic en "Entendido"
        const alerta = Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'Por favor, debe loguearse e ingresar desde la opción Tienda de la página web.',
          confirmButtonText: 'Entendido',
          allowOutsideClick: false,
        });

        const redirigirAPaginaPrincipal = () => {
          window.location.href = 'https://capacitatec.net/';
        };

        const intervalo = setInterval(() => {
          if (!Swal.getContainer()) {
            redirigirAPaginaPrincipal();
            clearInterval(intervalo);
          }
        }, 500);

        alerta.then((result) => {
          if (result.isConfirmed) {
            redirigirAPaginaPrincipal();
          }
        });
      }

      const verificarHoraLimite = () => {
        // console.log("hola refrescada");
        let horaIngreso = localStorage.getItem("horaIngreso");
        if (!!idUsuarioLogueado) {
          const [hora, minutos, segundos] = horaIngreso.split(':').map(Number);

          if (idClienteParam==='null' || idClienteParam === "0" || idClienteParam === "") {
            const horaActual = new Date();

            const nuevaHoraIngreso = (hora + 1) % 24;
            const date2 = new Date();
            date2.setHours(nuevaHoraIngreso);
            date2.setMinutes(minutos);
            date2.setSeconds(segundos);
            // localStorage.setItem('horaActual',horaActual)
            // localStorage.setItem('date2',date2)
            if (horaActual > date2) {
              const alerta = Swal.fire({
                icon: 'error',
                title: '¡Alerta! La hora límite ha pasado',
                confirmButtonText: 'Entendido',
                allowOutsideClick: false,
              });
              const redirigirAPaginaPrincipal = () => {
                window.location.href = 'https://capacitatec.net/';
              };
              const intervalo = setInterval(() => {
                if (!Swal.getContainer()) {
                  redirigirAPaginaPrincipal();
                  clearInterval(intervalo);
                }
              }, 500);
              alerta.then((result) => {
                if (result.isConfirmed) {
                  redirigirAPaginaPrincipal();
                }
              });
            }
          }
        }
      };
      verificarHoraLimite();
    };

    // Llama a la función al cargar el componente o cuando cambia la ubicación
    verificarURL();
  }, [location.search, navigate]);

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
