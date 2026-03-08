import personalLogo from "./assets/RamenRFImg.png";
import { useRecipes } from "./features/recipes/RecipesProvider.jsx";
import SearchForm from "./components/ui/SearchForm.jsx";
import RandomButton from "./components/ui/RandomButton.jsx";
import Message from "./components/ui/Message.jsx";
import RecipeGrid from "./components/ui/RecipeGrid.jsx";
import RecipeModal from "./components/ui/RecipeModal.jsx";
import Footer from "./components/ui/Footer.jsx";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const App = () => {
  const {
    searchTerm,
    setSearchTerm,
    recipes,
    message,
    isError,
    isLoading,
    isModalOpen,
    modalRecipe,
    isRandomMode,
    activeLetter,
    handleSearch,
    getRandomRecipe,
    sortRecipesAZ,
    getRecipesByFirstLetter,
    getRecipeDetails,
    closeModal,
  } = useRecipes();

  return (
    <>
      <div className="recipe__finder--container">
        <h1>Recipe Finder</h1>

        <SearchForm
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSubmit={handleSearch}
          isLoading={isLoading}
        />

        <RandomButton onClick={getRandomRecipe} isLoading={isLoading} />

        <Message message={message} isError={isError} isLoading={isLoading} />

        <RecipeGrid
          recipes={recipes}
          isLoading={isLoading}
          isRandomMode={isRandomMode}
          onSelectRecipe={getRecipeDetails}
        />
      </div>

      <RecipeModal
        isModalOpen={isModalOpen}
        modalRecipe={modalRecipe}
        onClose={closeModal}
      />

      <Footer
        personalLogo={personalLogo}
        letters={letters}
        activeLetter={activeLetter}
        isLoading={isLoading}
        onSort={sortRecipesAZ}
        onLetterClick={getRecipesByFirstLetter}
      />
    </>
  );
};

export default App;
