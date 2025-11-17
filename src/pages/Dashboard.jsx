import { useEffect, useState } from 'react';
import { db } from '../utilities/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { fakeRecipes } from '../utilities/fakeRecipes';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    topCategory: '',
    topIngredient: '',
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'recipes'));
        const data = snapshot.docs.map(doc => doc.data());

        const recipes = data.length === 0 ? fakeRecipes : data;
        generateStats(recipes);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        generateStats(fakeRecipes);
      }
    };

    const generateStats = (data) => {
      const total = data.length;
      const categoryCount = {};
      const ingredientCount = {};

      data.forEach(recipe => {
        categoryCount[recipe.category] = (categoryCount[recipe.category] || 0) + 1;
        recipe.ingredients.forEach(ing => {
          const key = ing.toLowerCase();
          ingredientCount[key] = (ingredientCount[key] || 0) + 1;
        });
      });

      const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
      const topIngredient = Object.entries(ingredientCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

      setStats({ total, topCategory, topIngredient });
    };

    fetchRecipes();
  }, []);

  return (
    <div className="section dashboard">
      <h1>Recipe Dashboard</h1>
      <p><strong>Total Recipes:</strong> {stats.total}</p>
      <p><strong>Most Popular Category:</strong> {stats.topCategory}</p>
      <p><strong>Most Used Ingredient:</strong> {stats.topIngredient}</p>
    </div>
  );
};

export default Dashboard;