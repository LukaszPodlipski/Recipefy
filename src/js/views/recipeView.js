import "core-js/stable";
import View from "./View.js";
import peopleIcon from "url:../../img/people_icon.svg";
import plusIcon from "url:../../img/plus_icon.svg";
import minusIcon from "url:../../img/minus_icon.svg";
import timeIcon from "url:../../img/time_icon.svg";
import bookmarkUnsigned from "url:../../img/bookmark_unsigned.svg";
import bookmarkSigned from "url:../../img/bookmark_signed.svg";
import yourRecipeIcon from "url:../../img/your_recipe.svg";
// import { Fraction } from "fractional";
// const Fraction = require("fractional").Fraction;
class RecipeView extends View {
  _parentElement = document.querySelector(".chosen_recipe_container");
  _notificationPlaceHolder = document.querySelector(
    ".notification_place_holder"
  );
  _errorMessage = `We could not find that recipe. Please try another one!`;
  _message = "";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".control_quantity");
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;

      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".bookmark_icon");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
  <div class="chosen_recipe">
      <div class="chosen_recipe_title">
        <p>${this._data.title}</p>
        <div class="recipe_icons">
          <p>BOOKMARK</p>
          <div class="icons_box">
          
<img src="${
      this._data.bookmarked ? bookmarkSigned : bookmarkUnsigned
    }" class="bookmark_icon" alt="bookmarkIcon">
<img src="${yourRecipeIcon}" class="your_recipe ${
      this._data.key ? "" : "hide_icon"
    }" alt="yourRecipeIcon">
          </div>
        </div>
      </div>
      <div class="chosen_recipe_head">
        <div class="chosen_recipe_head_info">
          <img src="${peopleIcon}" alt="people_icon" class="people_icon">
          <img src="${minusIcon}" alt="decreaseIcon" class="servings_decrease control_quantity" data-update-to="${
      this._data.servings - 1
    }">
   
          <p class="servings_quantity">${this._data.servings}</p>

              <img src="${plusIcon}" alt="increaseIcon" class="servings_increase control_quantity" data-update-to="${
      this._data.servings + 1
    }">
          <p class="persons_word">persons</p>
          <img src="${timeIcon}" alt="time_icon" class="time_icon">
          <p>${this._data.cookingTime}</p>
          <p class="min_word">min</p>
        </div>

      </div>
      <div class="chosen_recipe_content">
        <img src="${this._data.image}"   class="chosen_recipe_image" ></img>

        <div class="chosen_recipe_info">
          <div class="recipe_ingredients">
            <p class="recipe_ingredients_title">RECIPE INGRADIENTS</p>
            ${this._data.ingredients
              .map(this._generateMarkupIngredients)
              .join("")}
          </div>
          <div class="recipe_link">
            <p class="how_to_cook">HOW TO COOK IT</p>

            <p class="recipe_copyright">This recipe was created by ${
              this._data.publisher
            }
              Please check out directions at their website.</p>
            <a href="${
              this._data.sourceUrl
            }" target="_blank" class="link_button"><div ><span>DIRECTIONS</span></div></a>
          </div>
        </div>
      </div>
    </div>`;
  }
  _generateMarkupIngredients(ing) {
    return `            <p> <span>✔ </span> ${
      ing.quantity ? ing.quantity.toString() : ""
    } ${ing.unit} ${ing.description}</p>`;
  }
}

export default new RecipeView();
