import { useState } from 'react';
import { db } from '../../utilities/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'recipes'), {
        ...formData,
        ingredients: formData.ingredients.split(',').map(i => i.trim()),
        createdAt: Timestamp.now(),
      });

      alert('Recipe saved!');
      setFormData({ name: '', ingredients: '', instructions: '', cookingTime: '', category: '' });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="section" id="recipe-form">
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Recipe Name" value={formData.name} onChange={handleChange} required />
      <textarea name="ingredients" placeholder="Ingredients (comma-separated)" value={formData.ingredients} onChange={handleChange} required />
      <textarea name="instructions" placeholder="Instructions" value={formData.instructions} onChange={handleChange} required />
      <input name="cookingTime" placeholder="Cooking Time" value={formData.cookingTime} onChange={handleChange} required />
      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="Appetizer">Appetizer</option>
        <option value="Main Course">Main Course</option>
        <option value="Dessert">Dessert</option>
      </select>
      <button type="submit">Save Recipe</button>
    </form>
    </div>
  );
};

export default RecipeForm;