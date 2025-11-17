import { useEffect, useState } from 'react';
import { db } from '../utilities/firebase';
import { collection, getDocs } from 'firebase/firestore';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const MealPlanner = () => {
  const [recipes, setRecipes] = useState([]);
  const [plan, setPlan] = useState({});
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const snapshot = await getDocs(collection(db, 'recipes'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  const handleSelect = (day, recipeId) => {
    setPlan(prev => ({ ...prev, [day]: recipeId }));
  };

  const generateShoppingList = () => {
    const ingredients = [];
    daysOfWeek.forEach(day => {
      const recipe = recipes.find(r => r.id === plan[day]);
      if (recipe) {
        ingredients.push(...recipe.ingredients);
      }
    });
    const uniqueItems = [...new Set(ingredients.map(i => i.toLowerCase()))];
    setShoppingList(uniqueItems);
  };

  return (
    <div className="section meal-planner" id="meal-planner">
      <h2>Weekly Meal Planner</h2>
      {daysOfWeek.map(day => (
        <div key={day}>
          <label>{day}</label>
          <select onChange={e => handleSelect(day, e.target.value)} value={plan[day] || ''}>
            <option value="">Select a recipe</option>
            {recipes.map(recipe => (
              <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
            ))}
          </select>
        </div>
      ))}

      <button onClick={generateShoppingList}>Generate Shopping List</button>

      {shoppingList.length > 0 && (
        <div>
          <h3>Shopping List</h3>
          <ul>
            {shoppingList.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;