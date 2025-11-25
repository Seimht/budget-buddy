import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import "./App.css";

export default function App() {
  return (
    <main>
      <div className="app-container">
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
}
