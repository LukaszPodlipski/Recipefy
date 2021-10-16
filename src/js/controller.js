import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import View from "./views/View.js";

// if (module.hot) {
//   module.hot.accept();
// }

////
const html = document.querySelector("html");
const headBurger = document.querySelector(".burger");
const headingText = document.querySelector(".headingText");
const profile = document.querySelector(".startBox");
const controlsContainer = document.querySelector(".controlsContainer");
const letsStartText = document.querySelector(".letsStartText");
const body = document.querySelector("body");
const recipeFullBox = document.querySelector(".recipeFullBox");
const recipesBox = document.querySelector(".recipesBox");

/////////////////////////////////////////////////

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

    recipeView.renderSpinner();
    letsStartText.style.display = "none";
    if (!id) return;

    //1. Loading recipe
    await model.loadRecipe(id);
    //2 Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    setTimeout(function () {
      letsStartText.style.display = "flex";

      recipeView.stopSpinner();
    }, 500);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    letsStartText.style.display = "none";
    recipesBox.style.display = "grid";
    if (!query) {
      setTimeout(function () {
        recipeView.renderError();
        recipesBox.style.display = "none";
        letsStartText.style.display = "flex";
        resultsView.stopSpinner();
      }, 1000);
      return;
    }
    await model.loadSearchResult(query);
    resultsView.render(model.getSearchResultsPage(2));

    paginationView._controlPagination(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView._controlPagination(model.state.search);
};

const init = function () {
  window.addEventListener("load", function () {
    const id = window.location.hash.slice(1);
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
        recipeView.stopSpinner();
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

  recipeView.addHandlerRender(controlRecipes);
  searchView.addHanlderSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
