import "core-js/stable";
import View from "./View.js";
import peopleIcon from "url:../../img/people_icon.svg";
import plusIcon from "url:../../img/plus_icon.svg";
import minusIcon from "url:../../img/minus_icon.svg";
import timeIcon from "url:../../img/time_icon.svg";
import bookmarkUnsigned from "url:../../img/bookmark_unsigned.svg";
import bookmarkSigned from "url:../../img/bookmark_signed.svg";
import yourRecipeIcon from "url:../../img/your_recipe.svg";
import { Fraction } from "fractional";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipeFullBox");
  _notificationPlaceHolder = document.querySelector(".notificationPlaceHolder");
  _errorMessage = `We could not find that recipe. Please try another one!`;
  _message = "";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".controlQuantity");
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;

      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".bookmarkIcon");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
  <div class="recipeDescription">
      <div class="recipeTitleContainer">
        <p>${this._data.title}</p>
        <div class="bookmarkContainer">
          <p>BOOKMARK</p>
          <div class="bookmarkIcons">
          
<img src="${
      this._data.bookmarked ? bookmarkSigned : bookmarkUnsigned
    }" class="bookmarkIcon" alt="bookmarkIcon">
<img src="${yourRecipeIcon}" class="${
      this._data.key ? "" : "hideIcon"
    }" alt="yourRecipeIcon">
          </div>
        </div>
      </div>
      <div class="additionalRecipeInfo">
        <div class="additionalInfoContainer">
          <img src="${peopleIcon}" alt="people_icon" class="peopleIcon">
          <img src="${minusIcon}" alt="decreaseIcon" class="servingsDecrease controlQuantity" data-update-to="${
      this._data.servings - 1
    }">
   
          <p class="servingsQuantity">${this._data.servings}</p>

              <img src="${plusIcon}" alt="increaseIcon" class="servingsIncrease controlQuantity" data-update-to="${
      this._data.servings + 1
    }">
          <p class="personsWord">persons</p>
          <img src="${timeIcon}" alt="time_icon" class="timeIcon">
          <p>${this._data.cookingTime}</p>
          <p class="minWord">min</p>
        </div>

      </div>
      <div class="recipeTextBox">
        <img src="${this._data.image}"   class="recipeDescriptionImage" ></img>

        <div class="recipeText">
          <div class="ingradients">
            <p class="ingradientsTitle">RECIPE INGRADIENTS</p>
            ${this._data.ingredients
              .map(this._generateMarkupIngredients)
              .join("")}
          </div>
          <div class="linkBox">
            <p class="howToCookIt">HOW TO COOK IT</p>

            <p class="recipeCopyright">This recipe was created by ${
              this._data.publisher
            }
              Please check out directions at their website.</p>
            <a href="${
              this._data.sourceUrl
            }" target="_blank" class="linkButton"><div ><span>DIRECTIONS</span></div></a>
          </div>
        </div>
      </div>
    </div>`;
  }
  _generateMarkupIngredients(ing) {
    return `            <p> <span>✔ </span> ${
      ing.quantity ? new Fraction(ing.quantity).toString() : ""
    } ${ing.unit} ${ing.description}</p>`;
  }
}

export default new RecipeView();
