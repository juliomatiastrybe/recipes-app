import { useContext } from 'react';
import { RecipeType } from '../../types';
import RecipesContext from '../../context/RecipesContext';
import useRecipeDetails from '../../hooks/useRecipeDetails';
import InteractiveBtn from '../InteractiveBtn';
import share from '../../images/shareIcon.svg';
import heartBlack from '../../images/blackHeartIcon.svg';
import heartWhite from '../../images/whiteHeartIcon.svg';
import styles from './RecipeDetails.module.css';
import mealCategory from '../../images/iconMealCategory.svg';
import drinkCategory from '../../images/iconDrinkCategory.svg';
import ShowShareAlert from '../ShowShareAlert';
import Ingredients from '../Ingredients';
import CarouselRecommendation from '../CarouselRecommendation';
import ButtonRecipe from '../ButtonRecipe';

// const INITIAL_STATE: RecipeType = {
//   id: '',
//   type: 'meal',
//   nationality: '',
//   category: '',
//   alcoholicOrNot: '',
//   name: '',
//   image: '',
// };

type RecipeDetailsProps = {
  recipe: RecipeType;
};

export default function RecipeDetails({ recipe }: RecipeDetailsProps) {
  const { handleIdLink } = useContext(RecipesContext);

  const path = window.location.pathname.split('/')[1];
  const pathPage = window.location.pathname;

  const {
    isFavorite, isInProgress } = useRecipeDetails(recipe);

  return (
    <>
      <div
        className={ styles.overlap }
        style={ { backgroundImage: `url(${recipe.image})` } }
      >
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid="recipe-photo"
          className={ styles.recipe_image }
        />
        <h1
          data-testid="recipe-title"
          className={ styles.recipe_title }
        >
          { recipe.name }

        </h1>
        <div className={ styles.category_card }>
          <div className={ styles.category_icon }>
            <img
              src={ path === 'meals'
                ? mealCategory : drinkCategory }
              alt={ recipe.category }
            />
          </div>
          <p
            className={ styles.category_name }
            data-testid="recipe-category"
          >
            { recipe.category }

          </p>
        </div>
        <div className={ styles.interactive_btn }>
          <InteractiveBtn
            srcShare={ share }
            srcFavorite={ isFavorite ? heartBlack : heartWhite }
            dataShare="share-btn"
            dataFavorite="favorite-btn"
            id={ recipe.id }
            type={ recipe.type }
            recipe={ recipe }
            handleIdLink={ handleIdLink }
          />
        </div>
      </div>
      <ShowShareAlert />
      <Ingredients
        ingredients={ recipe.ingredients || [] }
      />
      <div className={ styles.instructions_card }>
        <h2>Instructions</h2>
        <div
          className="instructions"
          data-testid="instructions"
        >
          { recipe.instructions
          && recipe.instructions.split('\r\n').map((text, index) => (
            <p key={ index }>
              {text}
            </p>
          ))}
        </div>

      </div>
      {
        recipe.video && (
          <div className={ styles.video_card }>
            <h2>Video</h2>
            <iframe
              title="Recipe Video"
              width="340"
              height="315"
              className={ styles.video }
              src={ recipe.video.replace('watch?v=', 'embed/') }
              data-testid="video"
              allowFullScreen
            />
          </div>

        )
      }
      <CarouselRecommendation path={ path } />
      <ButtonRecipe
        recipe={ recipe }
        id={ recipe.id }
        path={ path }
        isProgress={ isInProgress }
        dataTestId={ pathPage.includes('in-progress') ? 'finish' : 'start' }
      />
    </>
  );
}
