import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/recipes">Recipes</Link></li>
      <li><Link to="/create">Create Recipe</Link></li>
      <li><Link to="/meal-planner">Meal Planner</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
    </ul>
  </nav>
);

export default Navbar;