import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, ChefHat, Clock, ExternalLink, Play } from "lucide-react";
import type { MealDetail } from "../types";

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMeal(data.meals?.[0] ?? null);
        setLoading(false);
      })
      .catch(() => {
        setMeal(null);
        setLoading(false);
      });
  }, [id]);

  const getIngredients = (meal: MealDetail) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = (meal as any)[`strIngredient${i}`];
      const measure = (meal as any)[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure || ''} ${ingredient}`.trim());
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-600 font-medium">Memuat detail resep...</p>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChefHat className="w-10 h-10 text-orange-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Resep tidak ditemukan</h3>
          <p className="text-gray-500 mb-6">Maaf, resep yang Anda cari tidak tersedia.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients(meal);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
    
      <div className="shadow-sm border-b border-orange-100 sticky top-0 z-30 text-left bg-amber-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-left" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
       
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
                {meal.strMeal}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-orange-500 px-3 py-1 rounded-full text-sm font-medium">
                  {meal.strCategory}
                </span>
                {meal.strArea && (
                  <span className="bg-amber-500 px-3 py-1 rounded-full text-sm font-medium">
                    {meal.strArea}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

       
        <div className="lg:flex lg:gap-8 lg:items-start">
       
          <div className="lg:w-80 lg:flex-shrink-0 mb-8 lg:mb-0">
            <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-md p-6 lg:overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-orange-500" />
                Ingredients
              </h2>
              <ul className="space-y-3 text-left">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0 mt-2"></span>
                    <span className="text-sm leading-relaxed">{ingredient}</span>
                  </li>
                ))}
              </ul>
              
              
              
            </div>
          </div>

         
          <div className="lg:flex-1 lg:min-w-0">
           
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-orange-500" />
                How to Make
              </h2>
              <div className="space-y-4 text-left">
                {meal.strInstructions.split('\n').map((step, index) => {
                  const trimmedStep = step.trim();
                  if (!trimmedStep) return null;
                  
                  return (
                    <div key={index} className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border-l-4 border-orange-400">
                      <div className="flex items-start gap-3">
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] h-6 flex items-center justify-center">
                          {index + 1}
                        </span>
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base flex-1">
                          {trimmedStep}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

           
            {(meal.strYoutube || meal.strSource) && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <ExternalLink className="w-6 h-6 text-orange-500" />
                  Additional Sources
                </h2>
                <div className="flex flex-col sm:flex-row gap-7 justify-center">
                  {meal.strYoutube && (
                    <a
                      href={meal.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-medium transition-all hover:scale-105 shadow-lg"
                    >
                      <Play className="w-5 h-5" />
                      Watch on YouTube
                    </a>
                  )}
                  {meal.strSource && (
                    <a
                      href={meal.strSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-medium transition-all hover:scale-105 shadow-lg"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Recipe Source
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}