import './App.css';
import Header from './components/header/Header';
import DetalleProducto from './pages/detalleProducto/DetalleProducto';
import ListadoProductos from './pages/listadoProductos/ListadoProductos';
import HistorialPedidos from './pages/historialPedidos/HistorialPedidos';
import CarritoCompras from './pages/carritoCompras/CarritoCompras';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComprasGeneral from './pages/comprasGeneral/ComprasGeneral';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ListadoProductos />} />
    <Route path="/historialPedidos" element={<HistorialPedidos />} />
    <Route path="/carritoCompras" element={<CarritoCompras />} />
    <Route path="/detalleProducto/:id" element={<DetalleProducto />} />
    <Route path="/comprasGeneral" element={<ComprasGeneral />} />
  </Routes>
);

function App() {
  const showHeader = window.location.pathname !== '/comprasGeneral';

  return (
    <Router>
      <div className="App">
        {showHeader && <Header />}
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
