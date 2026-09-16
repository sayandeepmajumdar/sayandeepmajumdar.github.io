export type DietType = 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Egg';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type SpiceLevel = 'Mild' | 'Medium' | 'Spicy';

export type Category =
  | 'Breakfast'
  | 'Main Course'
  | 'Rice'
  | 'Dal'
  | 'Snack'
  | 'Street Food'
  | 'Dessert'
  | 'Bread'
  | 'Side Dish';

export type Region =
  | 'North Indian'
  | 'South Indian'
  | 'Bengali'
  | 'Punjabi'
  | 'Gujarati'
  | 'Maharashtrian'
  | 'Hyderabadi'
  | 'Rajasthani'
  | 'Kashmiri';

export interface IngredientItem {
  name: string;
  amount: number; // numeric amount for serving scaler calculation
  unit: string;   // e.g. 'g', 'ml', 'tbsp', 'tsp', 'cup', 'medium', 'cloves', 'pinch', 'pieces'
  notes?: string; // e.g. 'finely chopped', 'grated', 'soaked in warm water'
}

export interface IngredientGroup {
  name: string;   // e.g. 'For the Marinade', 'For the Gravy', 'For the Tadka'
  items: IngredientItem[];
}

export interface InstructionStep {
  step: number;
  title: string;
  instruction: string;
  timeMinutes?: number;
  cue?: string; // e.g. 'Oil starts separating from masala', 'Golden brown and fragrant'
}

export interface NutritionInfo {
  calories: number;
  protein: number; // grams
  carbs: number;   // grams
  fat: number;     // grams
  fiber?: number;  // grams
}

export interface Recipe {
  id: string;
  name: string;
  slug: string;
  description: string;
  region: Region;
  cuisine: string;
  category: Category;
  diet: DietType[];
  difficulty: Difficulty;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  totalTime: number; // in minutes
  servings: number;
  spiceLevel: SpiceLevel;
  rating: number;
  ratingCount: number;
  image: string;
  ingredients: IngredientGroup[];
  instructions: InstructionStep[];
  tips: string[];
  substitutions: string[];
  servingSuggestions: string[];
  nutrition: NutritionInfo;
  tags: string[];
}

export interface FilterState {
  searchQuery: string;
  region: Region | 'All';
  diet: DietType | 'All';
  category: Category | 'All';
  difficulty: Difficulty | 'All';
  cookingTime: 'All' | 'Under 30 min' | '30–60 min' | 'Over 60 min';
  spiceLevel: SpiceLevel | 'All';
  sortBy: 'popular' | 'quickest' | 'rating' | 'az';
}

export interface PantryMatchResult {
  recipe: Recipe;
  matchScore: number; // 0 - 100 percentage
  matchedCount: number;
  totalUniqueIngredients: number;
  matchedIngredients: string[];
  missingIngredients: string[];
}
