
export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea?: string;
}

export interface MealDetail extends Meal {
  strInstructions: string;
  strYoutube?: string;
  strArea?: string;
  strSource?:string;
}
