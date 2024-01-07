import './App.css';
import Header from './components/header/Header';
import DetalleProducto from './pages/detalleProducto/DetalleProducto';
import ListadoProductos from './pages/listadoProductos/ListadoProductos';
import HistorialPedidos from './pages/historialPedidos/HistorialPedidos';
import CarritoCompras from './pages/carritoCompras/CarritoCompras';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ListadoProductos />} />
          <Route path="/historialPedidos" element={<HistorialPedidos />} />
          <Route path="/carritoCompras" element={<CarritoCompras />} />
          <Route path="/detalleProducto/:id" element={<DetalleProducto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
