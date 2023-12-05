import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Stations from "./pages/StationsTable";
import SideBar from "./components/Sidebar";
import StationDetails from "./pages/StationDetail";

function App() {
  return (
    <>
      <SideBar>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/stations/:code_station" element={<StationDetails />} />
      </Routes>
      </SideBar>
    </>
  );
}

export default App;
