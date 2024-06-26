/* eslint-disable react-hooks/exhaustive-deps */
// esse componente renderizará os botões para filtrar as receitas;
import { useContext, useEffect, useState } from 'react';
import ALLRecipes from '../../images/filtros/storage/allRecipes.svg';
import Foots from '../../images/filtros/storage/foods.svg';
import Drinks from '../../images/filtros/storage/drinks.svg';
import styles from './FilterRecipesStorage.module.css';
import RecipesContext from '../../context/RecipesContext';

// type FilterRecipesProps = {
//   testIDAll: string;
//   testIDMeal: string;
//   testIDDrink: string;
// };

export default function FilterRecipesStorage() {
  const { favorites, doneRecipes, setFilterRecipesStorage } = useContext(RecipesContext);
  const [checkFilteredCategories, setCheckFilteredCategories] = useState('');

  useEffect(() => {
    const filterRecipeDefault = () => {
      setFilterRecipesStorage([]);
    };
    filterRecipeDefault();
  }, []);

  // pegar o pathName para saber qual pagina está sendo renderizada
  const pathName = window.location.pathname;

  const checkFilteredExist = (category: string) => {
    const checkFiltered = checkFilteredCategories === category;
    return checkFiltered
      ? setCheckFilteredCategories('') : setCheckFilteredCategories(category);
  };

  const handleFilter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = event.currentTarget;
    const altIgm = button.children[0].getAttribute('alt');
    switch (altIgm) {
      case 'All Recipes Filter Icon':
        setFilterRecipesStorage([]);
        setCheckFilteredCategories('');
        break;
      case 'Meals Filter Icon':
        checkFilteredExist(altIgm);
        if (checkFilteredCategories === altIgm) {
          setCheckFilteredCategories('');
          setFilterRecipesStorage([]);
          return;
        }
        if (pathName === '/favorite-recipes') {
          const filterMeals = favorites.filter((item) => item.type === 'meal');
          setFilterRecipesStorage(filterMeals);
        } else {
          const filterMeals = doneRecipes.filter((item) => item.type === 'meal');
          setFilterRecipesStorage(filterMeals);
        }
        break;
      case 'Drinks Filter Icon':
        checkFilteredExist(altIgm);
        if (checkFilteredCategories === altIgm) {
          setCheckFilteredCategories('');
          setFilterRecipesStorage([]);
          return;
        }
        if (pathName === '/favorite-recipes') {
          const filterDrinks = favorites.filter((item) => item.type === 'drink');
          setFilterRecipesStorage(filterDrinks);
        } else {
          const filterDrinks = doneRecipes.filter((item) => item.type === 'drink');
          setFilterRecipesStorage(filterDrinks);
        }
        break;
      default:
    }
  };
  return (
    <div className={ styles.filters_Recipes }>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ (event) => handleFilter(event) }
      >
        <img src={ ALLRecipes } alt="All Recipes Filter Icon" />
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ (event) => handleFilter(event) }
      >
        <img src={ Foots } alt="Meals Filter Icon" />
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ (event) => handleFilter(event) }
      >
        <img src={ Drinks } alt="Drinks Filter Icon" />
      </button>
    </div>
  );
}
