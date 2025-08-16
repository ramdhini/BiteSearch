import { useState } from "react";
import { ChefHat } from "lucide-react";
import SearchBar from "./components/searchBar";
import MealCard from "./components/mealCard";
import type { Meal } from "./types";
import './App.css';

function App() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const searchMeals = async (query: string) => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-300">
      
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-orange-500 p-2 rounded-xl">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              BiteSearch
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2">
            Discover delicious recipes from around the world
          </p>
        </div>
      </header>

      
      <div className="h-40"></div>

      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <SearchBar onSearch={searchMeals} />

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <span className="ml-3 text-orange-600">Searching for recipes...</span>
          </div>
        )}

        {meals.length > 0 && !loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}

        {meals.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No searches yet
            </h3>
            <p className="text-black">
              Find your favorite recipes using the search bar above
            </p>
          </div>
        )}
      </main>

     
    </div>
  );
}

export default App;