import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

////
const html = document.querySelector("html");
const headBurger = document.querySelector(".burger");
const headingText = document.querySelector(".headingText");
const profile = document.querySelector(".profile");
const controlsContainer = document.querySelector(".controlsContainer");
const letsStartText = document.querySelector(".letsStartText");
const body = document.querySelector("body");
const recipeFullBox = document.querySelector(".recipeFullBox");
const recipesBox = document.querySelector(".recipesBox");
const searchButton = document.querySelector(".searchButton");

/////////////////////////////////////////////////
window.addEventListener("load", function () {
  const id = window.location.hash.slice(1);
  console.log(id);
  if (!id) {
    recipeFullBox.style.display = "none";
    recipesBox.style.display = "none";
    setTimeout(function () {
      html.style.display = "inline-block";
      headBurger.style.margin = "50px auto 30px auto";
      headingText.style.display = "block";
      profile.style.display = "flex";
      controlsContainer.style.display = "flex";
      letsStartText.style.display = "flex";
      body.style.minHeight = "84vh";
      recipeFullBox.style.display = "inline-block";
    }, 2000);
  } else {
    html.style.display = "inline-block";
    headBurger.style.margin = "50px auto 30px auto";
    headingText.style.display = "block";
    profile.style.display = "flex";
    controlsContainer.style.display = "flex";
    letsStartText.style.display = "flex";
    body.style.minHeight = "84vh";
    recipeFullBox.style.display = "inline-block";
  }
});

searchButton.addEventListener("click", function () {
  letsStartText.style.display = "none";
  recipesBox.style.display = "flex";
});
/////////////////////////////////////
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
document
  .querySelector(".addRecipeButton")
  .addEventListener("click", function () {
    addRecipeContainer.classList.toggle("addRecipeVisible");
  });

const closeAddRecipeContainer = document
  .querySelector(".closeAddRecipeContainer")
  .addEventListener("click", function () {
    addRecipeContainer.classList.toggle("addRecipeVisible");
  });

/////////////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //1. Loading recipe
    await model.loadRecipe(id);
    //2 Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
