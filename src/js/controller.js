import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import controlsView from "./views/controlsView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import addRecipeView from "./views/addRecipeView.js";

const html = document.querySelector("html");
const headBurger = document.querySelector(".burger");
const headingText = document.querySelector(".head_text");
const profile = document.querySelector(".start_content");
const controlsContainer = document.querySelector(".controls_container");
const letsStartText = document.querySelector(".lets_start_container");
const body = document.querySelector("body");
const recipeFullBox = document.querySelector(".chosen_recipe_container");
const recipesBox = document.querySelector(".searched_recipes_container");

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    letsStartText.style.display = "none";
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    setTimeout(function () {
      letsStartText.style.display = "flex";
      recipeView.stopSpinner();
    }, 500);
    recipeView.renderError();
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
    resultsView.render(model.getSearchResultsPage(1));
    paginationView._controlPagination(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView._controlPagination(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else {
    model.deleteBookmark(model.state.recipe);
    if (model.state.bookmarks.length === 0) controlHideBookmarks();
  }
  recipeView.update(model.state.recipe);
  bookmarksView.renderBookmark(model.state.bookmarks);
};

const controlDisplayBookmarks = function () {
  const bookmarksBox = document.querySelector(".saved_bookmarks_container");
  if (model.state.bookmarks.length > 0)
    bookmarksBox.classList.toggle("saved_bookmarks_container_visible");
  else {
    controlsView.renderError();
  }
};

const controlHideBookmarks = function () {
  const bookmarksBox = document.querySelector(".saved_bookmarks_container");
  bookmarksBox.classList.remove("saved_bookmarks_container_visible");
};

const controlBookmarks = function () {
  if (model.state.bookmarks.length > 0)
    bookmarksView.render(model.state.bookmarks);
};

const controlDisplayAddRecipe = function () {
  const addRecipeBox = document.querySelector(".add_recipe_container");
  addRecipeBox.classList.toggle("saved_bookmarks_container_visible");
};

const controlHideAddRecipe = function () {
  const addRecipeBox = document.querySelector(".add_recipe_container");
  addRecipeBox.classList.toggle("saved_bookmarks_container_visible");
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    setTimeout(function () {
      controlHideAddRecipe();
    }, 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
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
  bookmarksView.addhandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHanlderSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  controlsView.addHandlerShowBookmarks(controlDisplayBookmarks);
  controlsView.addHandlerShowAddRecipe(controlDisplayAddRecipe);
  bookmarksView.addHandlerHideBookmarks(controlHideBookmarks);
  addRecipeView.addHandlerHideAddRecipe(controlHideAddRecipe);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
