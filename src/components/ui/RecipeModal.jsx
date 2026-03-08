// src/components/ui/RecipeModal.jsx
import React from "react";

const RecipeModal = ({ isModalOpen, modalRecipe, onClose }) => {
  const handleBackgroundClick = (e) => {
    if (
      e.target.classList.contains("modal__container") &&
      !modalRecipe?.loading
    ) {
      onClose();
    }
  };

  if (!isModalOpen && !modalRecipe) return null;

  return (
    <div
      className={`modal__container ${isModalOpen ? "" : "hidden"}`}
      id="recipe__modal"
      onClick={handleBackgroundClick}
    >
      <div className="modal__content">
        <button
          id="modal__close--btn"
          className="modal__close--btn"
          type="button"
          onClick={() => {
            if (!modalRecipe?.loading) onClose();
          }}
        >
          +
        </button>

        <div id="recipe__details--content">
          {!modalRecipe && isModalOpen && (
            <p className="message error">Invalid recipe ID.</p>
          )}

          {modalRecipe?.loading && (
            <p className="message loading">Loading details...</p>
          )}

          {modalRecipe?.error && (
            <p className="message error">{modalRecipe.error}</p>
          )}

          {modalRecipe && !modalRecipe.loading && !modalRecipe.error && (
            <>
              <h2>{modalRecipe.strMeal}</h2>
              <img src={modalRecipe.strMealThumb} alt={modalRecipe.strMeal} />

              {modalRecipe.strCategory && (
                <h3>Category: {modalRecipe.strCategory}</h3>
              )}
              {modalRecipe.strArea && <h3>Area: {modalRecipe.strArea}</h3>}

              {modalRecipe.ingredients &&
                modalRecipe.ingredients.length > 0 && (
                  <>
                    <h3>Ingredients:</h3>
                    <ul>
                      {modalRecipe.ingredients.map((ing) => (
                        <li key={ing.id}>{ing.text}</li>
                      ))}
                    </ul>
                  </>
                )}

              <h3>Instructions:</h3>
              <p>
                {modalRecipe.instructions
                  .split(/\r?\n/)
                  .filter((line) => line.trim().length > 0)
                  .map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
              </p>

              {modalRecipe.strYoutube && (
                <>
                  <h3>Video Recipe</h3>
                  <div className="video__wrapper">
                    <a
                      href={modalRecipe.strYoutube}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch on YouTube.
                    </a>
                  </div>
                </>
              )}

              {modalRecipe.strSource && (
                <div className="source__wrapper">
                  <a
                    href={modalRecipe.strSource}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Original Source.
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
