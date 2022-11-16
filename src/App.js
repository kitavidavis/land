import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import Dashboard from './Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard2 from './Dashboard2';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Dashboard />} />
      <Route path='/:lr' element={<Dashboard2 />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
