import { Outlet } from "react-router-dom";

// Import components
import Navbar from './components/Navbar/Navbar';
import Preloader from './components/Preloader';

function App() {
  return (
    <div id="theme" className="theme-dark bg-theme text-theme">
      {/* Navbar */}
      <Navbar />

      {/* Preloader */}
      {/* <Preloader /> */}

      {/* Main content */}
      <Outlet />
    </div>
  );
}

export default App;
