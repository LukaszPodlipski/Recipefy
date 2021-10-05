import peopleIcon from "url:../img/people_icon.svg";
import arrowLeft from "url:../img/arrow_left.svg";
import arrowRight from "url:../img/arrow_right.svg";
import timeIcon from "url:../img/time_icon.svg";

import "core-js/stable";
import "regenerator-runtime/runtime";

const bookmark = false;

const bookmarkBox = document.querySelector(".bookmarkListBox");
const noBookmarkAlert = document.querySelector(".bookmarkAlert ");
const bookmarksButton = document
  .querySelector(".bookmarksButton ")
  .addEventListener("click", function () {
    if (bookmark) {
      bookmarkBox.classList.toggle("bookmarkVisible");
    } else {
      noBookmarkAlert.classList.add("notificationActive");
      setTimeout(function () {
        noBookmarkAlert.classList.remove("notificationActive");
      }, 2000);
    }
  });

const addRecipeContainer = document.querySelector(".addRecipeContainer");
const addRecipeButton = document
  .querySelector(".addRecipeButton")
  .addEventListener("click", function () {
    addRecipeContainer.classList.toggle("addRecipeVisible");
  });

const closeAddRecipeContainer = document
  .querySelector(".closeAddRecipeContainer")
  .addEventListener("click", function () {
    addRecipeContainer.classList.toggle("addRecipeVisible");
  });

//////

const recipeContainer = document.querySelector(".recipeFullBox");

const renderSpinner = function (parentEl) {
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
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

const showRecipe = async function () {
  try {
    //1. Loading recipe
    renderSpinner(recipeContainer);
    const res = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc3e"
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);
    //2 Render recipe
    const markup = `
  <div class="recipeDescription">
      <div class="recipeTitleContainer">
        <p>${recipe.title}</p>
        <div class="bookmarkContainer">
          <p>BOOKMARK</p>
          <div class="bookmark">

          </div>
        </div>
      </div>
      <div class="additionalRecipeInfo">
        <div class="additionalInfoContainer">
          <img src="${peopleIcon}" alt="people_icon" class="peopleIcon">
          <img src="${arrowLeft}" alt="arrow_left" class="servingsArrowLeft arrowQuantity">
          <p class="servingsQuantity">${recipe.servings}</p>
          <img src="${arrowRight}" alt="arrow_right" class="servingsArrowRight arrowQuantity">
          <p class="personsWord">persons</p>
          <img src="${timeIcon}" alt="time_icon" class="timeIcon">
          <p>${recipe.cookingTime}</p>
          <p class="minWord">min</p>
        </div>
      </div>
      <div class="recipeTextBox">
        <img src="${
          recipe.image
        }"  crossOrigin="anonymous" class="recipeDescriptionImage" alt="recipe photo"></img>

        <div class="recipeText">
          <div class="ingradients">
            <p class="ingradientsTitle">RECIPE INGRADIENTS</p>
            ${recipe.ingredients
              .map(ing => {
                return `            <p> <span>✔ </span> ${ing.quantity} ${ing.unit} ${ing.description}</p>`;
              })
              .join("")}
          </div>
          <div class="linkBox">
            <p class="howToCookIt">HOW TO COOK IT</p>

            <p class="recipeCopyright">This recipe was created by ${
              recipe.publisher
            }
              Please check out directions at their website.</p>
            <a href="${
              recipe.sourceUrl
            }" class="linkButton"><div ><span>DIRECTIONS</span></div></a>
          </div>
        </div>
      </div>
    </div>`;
    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    alert(err);
  }
};
showRecipe();
