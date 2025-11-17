import { useEffect, useState } from 'react';
import { db } from '../../utilities/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { fakeRecipes } from '../../utilities/fakeRecipes';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'recipes'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (data.length === 0) {
          console.warn('No recipes found in Firestore. Using fakeRecipes.');
          setRecipes(fakeRecipes);
        } else {
          setRecipes(data);
        }
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setRecipes(fakeRecipes);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="section" id="recipe-list">
      <h2>All Recipes</h2>
      {recipes.map(recipe => (
        <div key={recipe.id}className="recipe-card">
          <h3>{recipe.name}</h3>
          <p><strong>Category:</strong> {recipe.category}</p>
          <p><strong>Time:</strong> {recipe.cookingTime}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;