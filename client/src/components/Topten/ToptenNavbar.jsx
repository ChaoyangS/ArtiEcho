import { Link } from "react-router-dom";
import "./ToptenNavbar.css";

const ToptenNavbar = () => {
  return (
    <nav className="topten-navbar">
      <Link to="/">Homepage</Link> | 
      <Link to="/topten-artists">Top 10 Artists</Link>
    </nav>
  );
};

export default ToptenNavbar;