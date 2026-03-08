const SEARCH_API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const RANDOM_API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";
const LOOKUP_API_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
const FIRST_LETTER_API_URL =
  "https://www.themealdb.com/api/json/v1/1/search.php?f=";

export async function searchRecipesApi(query) {
  const res = await fetch(`${SEARCH_API_URL}${query}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

export async function getRandomRecipeApi() {
  const res = await fetch(RANDOM_API_URL);
  if (!res.ok) throw new Error("Random failed");
  return res.json();
}

export async function getRecipeByIdApi(id) {
  const res = await fetch(`${LOOKUP_API_URL}${id}`);
  if (!res.ok) throw new Error("Lookup failed");
  return res.json();
}

export async function getRecipesByFirstLetterApi(letter) {
  const res = await fetch(`${FIRST_LETTER_API_URL}${letter.toLowerCase()}`);
  if (!res.ok) throw new Error("First-letter failed");
  return res.json();
}

export async function getRandomDessertSuggestionApi() {
  const filterRes = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert",
  );
  if (!filterRes.ok) throw new Error("Dessert filter failed");
  const filterData = await filterRes.json();
  if (!filterData.meals || filterData.meals.length === 0) return null;

  const index = Math.floor(Math.random() * filterData.meals.length);
  const dessertId = filterData.meals[index].idMeal;

  const detailsRes = await fetch(`${LOOKUP_API_URL}${dessertId}`);
  if (!detailsRes.ok) throw new Error("Dessert details failed");
  const detailsData = await detailsRes.json();
  return detailsData.meals ? detailsData.meals[0] : null;
}
