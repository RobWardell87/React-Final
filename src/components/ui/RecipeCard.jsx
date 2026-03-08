import React from "react";

const RecipeCard = ({ recipe, isRandomMode, onClick }) => {
  const isDessert = recipe.strCategory === "Dessert";

  return (
    <div
      className={`recipe__item ${isDessert ? "dessert-card" : ""} ${
        isRandomMode ? "random-highlight" : ""
      }`}
      data-id={recipe.idMeal}
      onClick={() => onClick(recipe.idMeal)}
    >
      {isDessert && (
        <div className="dessert-badge">🍰 Dessert Suggestion</div>
      )}
      <img src={recipe.strMealThumb} alt={recipe.strMeal} loading="lazy" />
      <h3>{recipe.strMeal}</h3>
    </div>
  );
};

export default RecipeCard;
