import { NavLink } from "react-router-dom";

// Task 2: navigation component with links to all three routes.
// NavLink (not a plain <a>) is what gives us client-side routing without a full page reload.
function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="brand">MedCare Plus</h2>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/doctors" className={({ isActive }) => (isActive ? "active" : "")}>
          Doctors
        </NavLink>
        <NavLink to="/booking" className={({ isActive }) => (isActive ? "active" : "")}>
          Book Appointment
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
