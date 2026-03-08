import { createContext, useContext, useState } from "react";
import {
  searchRecipesApi,
  getRandomRecipeApi,
  getRecipeByIdApi,
  getRecipesByFirstLetterApi,
  getRandomDessertSuggestionApi,
} from "./recipeService.js";

const RecipesContext = createContext(null);

export const RecipesProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState(
    "Search for a recipe or get a random one.\nYou can even search alphabetically below.",
  );
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeLetter, setActiveLetter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRecipe, setModalRecipe] = useState(null);
  const [isRandomMode, setIsRandomMode] = useState(false);

  function showMessage(msg, { error = false, loading = false } = {}) {
    setMessage(msg);
    setIsError(error);
    setIsLoading(loading);
  }

  function clearMessage() {
    setMessage("");
    setIsError(false);
  }

  function displayRecipes(newRecipes) {
    if (!newRecipes || newRecipes.length === 0) {
      showMessage("No recipes to display");
      setRecipes([]);
      return;
    }
    setRecipes(newRecipes);
  }

  async function handleSearch(e) {
    setIsRandomMode(false);
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) {
      showMessage("Please enter a search term", { error: true });
      return;
    }
    await searchRecipes(term);
  }

  async function searchRecipes(query) {
    showMessage(`Searching for "${query}"...`, { loading: true });
    setIsLoading(true);
    setRecipes([]);

    try {
      const searchData = await searchRecipesApi(query);
      if (!searchData.meals || searchData.meals.length === 0) {
        setTimeout(() => {
          clearMessage();
          showMessage(`No recipes found for "${query}".`);
          setIsLoading(false);
        }, 1000);
        return;
      }

      const detailedRecipes = await Promise.all(
        searchData.meals.map(async (recipe) => {
          try {
            const detailsData = await getRecipeByIdApi(recipe.idMeal);
            return detailsData.meals ? detailsData.meals[0] : recipe;
          } catch {
            return recipe;
          }
        }),
      );

      let dessertRecipe = null;
      try {
        dessertRecipe = await getRandomDessertSuggestionApi();
      } catch {
        dessertRecipe = null;
      }

      setTimeout(() => {
        clearMessage();
        const allRecipes = [...detailedRecipes];
        if (dessertRecipe) allRecipes.push(dessertRecipe);
        setRecipes(allRecipes);
        setIsLoading(false);
      }, 1500);
    } catch {
      setTimeout(() => {
        showMessage("Something went wrong, please try again.", { error: true });
        setIsLoading(false);
      }, 1000);
    }
  }

  async function getRandomRecipe() {
    showMessage("Fetching a random recipe...", { loading: true });
    setIsLoading(true);
    setRecipes([]);
    setIsRandomMode(true);

    try {
      const data = await getRandomRecipeApi();
      clearMessage();
      if (data.meals && data.meals.length > 0) {
        displayRecipes(data.meals);
      } else {
        showMessage("Could not fetch a random recipe. Please try again.", {
          error: true,
        });
      }
    } catch {
      showMessage(
        "Failed to fetch a random recipe. Please check your connection and try again.",
        { error: true },
      );
    } finally {
      setIsLoading(false);
    }
  }

  function sortRecipesAZ() {
    setIsRandomMode(false);
    if (!recipes || recipes.length === 0) {
      showMessage(
        "No results to sort yet – try searching or picking a letter first.",
      );
      return;
    }

    const sorted = [...recipes].sort((a, b) =>
      a.strMeal.localeCompare(b.strMeal),
    );
    showMessage("Results sorted A–Z.");
    displayRecipes(sorted);
  }

  async function getRecipesByFirstLetter(letter) {
    setIsRandomMode(false);
    setActiveLetter(letter);
    setRecipes([]);
    showMessage(`Showing recipes starting with "${letter}"`, { loading: true });
    setIsLoading(true);

    try {
      const data = await getRecipesByFirstLetterApi(letter);
      clearMessage();
      if (data.meals) {
        const shuffled = [...data.meals].sort(() => Math.random() - 0.5);
        displayRecipes(shuffled);
      } else {
        showMessage(`No recipes found starting with "${letter}".`);
      }
    } catch {
      showMessage("Something went wrong, please try again.", { error: true });
    } finally {
      setIsLoading(false);
    }
  }

  function openModal() {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setIsModalOpen(false);
    setModalRecipe(null);
    document.body.style.overflow = "";
  }

  async function getRecipeDetails(id) {
    if (!id) {
      setModalRecipe({ error: "Invalid recipe ID." });
      openModal();
      return;
    }

    setModalRecipe({ loading: true });
    openModal();

    try {
      const data = await getRecipeByIdApi(id);
      setTimeout(() => {
        if (data.meals && data.meals.length > 0) {
          displayRecipeDetails(data.meals[0]);
        } else {
          setModalRecipe({ error: "Could not load recipe details." });
        }
      }, 1000);
    } catch {
      setTimeout(() => {
        setModalRecipe({
          error:
            "Failed to load recipe details. Please check your connection or try again.",
        });
      }, 1000);
    }
  }

  function displayRecipeDetails(recipe) {
    const ingredients = [];
    for (let i = 1; i <= 20; ++i) {
      const ingredient = recipe[`strIngredient${i}`]?.trim();
      const measure = recipe[`strMeasure${i}`]?.trim();
      if (ingredient) {
        ingredients.push({
          id: i,
          text: `${measure ? `${measure} ` : ""}${ingredient}`,
        });
      } else {
        break;
      }
    }

    const safeInstructions =
      recipe.strInstructions || "Instructions not available.";

    setModalRecipe({
      ...recipe,
      ingredients,
      instructions: safeInstructions,
    });
  }

  const value = {
    searchTerm,
    setSearchTerm,
    recipes,
    message,
    isError,
    isLoading,
    activeLetter,
    isModalOpen,
    modalRecipe,
    isRandomMode,
    handleSearch,
    getRandomRecipe,
    sortRecipesAZ,
    getRecipesByFirstLetter,
    getRecipeDetails,
    closeModal,
  };

  return (
    <RecipesContext.Provider value={value}>
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipesContext);
