import "core-js/stable";
import peopleIcon from "url:../../img/people_icon.svg";
import plusIcon from "url:../../img/plus_icon.svg";
import minusIcon from "url:../../img/minus_icon.svg";
import timeIcon from "url:../../img/time_icon.svg";
import { Fraction } from "fractional";

class RecipeView {
  #parentElement = document.querySelector(".recipeFullBox");
  #notificationPlaceHolder = document.querySelector(".notificationPlaceHolder");
  #errorMessage = `We could not find that recipe. Please try another one!`;
  #message = "";
  #data;
  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `  <div class="loader activeLoader">
    <div class="loader loader--style1" title="0">
      <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40"
        xml:space="preserve">
        <path opacity="0.2" fill="#000"
          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
        <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                C22.32,8.481,24.301,9.057,26.013,10.047z">
          <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20"
            dur="0.5s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  </div>`;
    this.#parentElement.innerHTML = "";
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach(ev => window.addEventListener(ev, handler));
  }

  renderError(message = this.#errorMessage) {
    const markup = `<div class="notificationAlert">
    <p class="alertText"><span>🔔 </span>${message}</p>
  </div>`;
    this.#notificationPlaceHolder.insertAdjacentHTML("beforeend", markup);
    const alertBox = document.querySelector(".notificationAlert");
    alertBox.style.display = "flex";
    setTimeout(() => {
      alertBox.style.display = "none";
      this.#notificationPlaceHolder.innerHTML = "";
    }, 4000);
  }

  renderMessage(message = this.#message) {
    const markup = `<div class="notificationAlert">
    <p class="alertText"><span>🔔 </span>${message}</p>
  </div>`;
    this.#notificationPlaceHolder.insertAdjacentHTML("beforeend", markup);
    const alertBox = document.querySelector(".notificationAlert");
    alertBox.style.display = "flex";
    setTimeout(() => {
      alertBox.style.display = "none";
      this.#notificationPlaceHolder.innerHTML = "";
    }, 4000);
  }

  #generateMarkup() {
    return `
  <div class="recipeDescription">
      <div class="recipeTitleContainer">
        <p>${this.#data.title}</p>
        <div class="bookmarkContainer">
          <p>BOOKMARK</p>
          <div class="bookmark">

          </div>
        </div>
      </div>
      <div class="additionalRecipeInfo">
        <div class="additionalInfoContainer">
          <img src="${peopleIcon}" alt="people_icon" class="peopleIcon">
          <img src="${plusIcon}" alt="arrow_left" class="servingsArrowLeft arrowQuantity">
          <p class="servingsQuantity">${this.#data.servings}</p>
          <img src="${minusIcon}" alt="arrow_right" class="servingsArrowRight arrowQuantity">
          <p class="personsWord">persons</p>
          <img src="${timeIcon}" alt="time_icon" class="timeIcon">
          <p>${this.#data.cookingTime}</p>
          <p class="minWord">min</p>
        </div>
      </div>
      <div class="recipeTextBox">
        <img src="${
          this.#data.image
        }"  crossOrigin="anonymous" class="recipeDescriptionImage" ></img>

        <div class="recipeText">
          <div class="ingradients">
            <p class="ingradientsTitle">RECIPE INGRADIENTS</p>
            ${this.#data.ingredients
              .map(this.#generateMarkupIngredients)
              .join("")}
          </div>
          <div class="linkBox">
            <p class="howToCookIt">HOW TO COOK IT</p>

            <p class="recipeCopyright">This recipe was created by ${
              this.#data.publisher
            }
              Please check out directions at their website.</p>
            <a href="${
              this.#data.sourceUrl
            }" class="linkButton"><div ><span>DIRECTIONS</span></div></a>
          </div>
        </div>
      </div>
    </div>`;
  }
  #generateMarkupIngredients(ing) {
    return `            <p> <span>✔ </span> ${
      ing.quantity ? new Fraction(ing.quantity).toString() : ""
    } ${ing.unit} ${ing.description}</p>`;
  }
}

export default new RecipeView();
