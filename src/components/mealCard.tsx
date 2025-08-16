import { Link } from "react-router-dom";
import type { Meal } from "../types";

export default function MealCard({ meal }: { meal: Meal }) {
  return (
    <Link to={`/meal/${meal.idMeal}`} className="block group h-full">
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-orange-100 group-hover:-translate-y-1 group-hover:border-orange-300 h-full flex flex-col">
        <div className="aspect-square overflow-hidden">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h2 className="text-left font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors flex-shrink-0">
            {meal.strMeal}
          </h2>
          <div className="text-left flex items-center gap-2 mb-3 flex-shrink-0">
            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
              {meal.strCategory}
            </span>
            {meal.strArea && (
              <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
                {meal.strArea}
              </span>
            )}
          </div>
          
          <div className="text-left mt-auto">
            <span className="bg-orange-300 px-2 py-1 rounded-2xl text-center text-orange-700 text-sm font-medium group-hover:text-orange-600 transition-colors">
             See the recipe
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}