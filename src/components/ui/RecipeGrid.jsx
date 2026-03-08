import React from "react";
import RecipeCard from "./RecipeCard.jsx";

const RecipeGrid = ({ recipes, isLoading, isRandomMode, onSelectRecipe }) => {
  return (
    <div className="results__wrapper">
      <div
        className={`results__grid ${isRandomMode ? "random-centered" : ""}`}
        id="results__grid"
      >
        {isLoading && recipes.length === 0 && (
          <>
            {[1, 2].map((n) => (
              <div key={n} className="recipe__item loading-skeleton">
                <div className="skeleton-image" />
                <div className="skeleton-title" />
              </div>
            ))}
          </>
        )}

        {!isLoading &&
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              isRandomMode={isRandomMode}
              onClick={onSelectRecipe}
            />
          ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
