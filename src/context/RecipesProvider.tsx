import { useState } from 'react';
import UserContext from './RecipesContext';
import { DrinksType,
  InProgressRecipesType, MealsType, RecipeLocalStorageType, RecipesType } from '../types';

type UserProviderProps = {
  children: React.ReactNode
};

export default function RecipesProvider({ children }: UserProviderProps) {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<RecipesType>([]);
  const [meals, setMeals] = useState<MealsType>([]);
  const [drinks, setDrinks] = useState<DrinksType>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [filterRecipesCategory, setFilterRecipesCategory] = useState<RecipesType>([]);
  const [favorites, setFavorites] = useState<RecipeLocalStorageType[]>([]);
  const [filterRecipesStorage,
    setFilterRecipesStorage] = useState<RecipeLocalStorageType[]>([]);
  const [doneRecipes, setDoneRecipes] = useState<RecipeLocalStorageType[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [idLinkAlert, setIdLinkAlert] = useState({
    id: '',
    type: '',
  });
  const [recipesInProgress, setRecipesInProgress] = useState<InProgressRecipesType>({
    meals: {},
    drinks: {},
  });

  const [isFavorite, setIsFavorite] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [ingredientsChecked, setIngredientsChecked] = useState([] as string[]);

  const handleIdLink = (idLink: string, typeLink: string) => {
    setIdLinkAlert({
      id: idLink,
      type: typeLink,
    });
  };

  const context = {
    loading,
    setLoading,
    recipes,
    setRecipes,
    meals,
    drinks,
    setDrinks,
    setMeals,
    showSearch,
    setShowSearch,
    filterRecipesCategory,
    setFilterRecipesCategory,
    favorites,
    setFavorites,
    filterRecipesStorage,
    setFilterRecipesStorage,
    doneRecipes,
    setDoneRecipes,
    showAlert,
    setShowAlert,
    idLinkAlert,
    setIdLinkAlert,
    handleIdLink,
    recipesInProgress,
    setRecipesInProgress,
    isFavorite,
    setIsFavorite,
    isDone,
    setIsDone,
    isInProgress,
    setIsInProgress,
    ingredientsChecked,
    setIngredientsChecked,
  };
  return (
    <UserContext.Provider value={ context }>
      { children }
    </UserContext.Provider>
  );
}
