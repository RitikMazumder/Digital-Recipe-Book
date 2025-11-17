import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Shared/NavBar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import RecipeForm from './components/Recipes/RecipeForm';
import RecipeList from './components/Recipes/RecipeList';
import Dashboard from './pages/Dashboard';
import MealPlanner from './pages/MealPlanner';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<RecipeForm />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
      </Routes>
    </Router>
  );
}

export default App;