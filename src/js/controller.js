import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import controlsView from "./views/controlsView.js";
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

document
  .querySelector(".closeAddRecipeContainer")
  .addEventListener("click", function () {
    addRecipeContainer.classList.toggle("addRecipeVisible");
  });

/////////////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    letsStartText.style.display = "none";

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
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
    resultsView.render(model.getSearchResultsPage(2));

    paginationView._controlPagination(model.state.search);
  } catch (err) {
    console.log(err);
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
    controlHideBookmarks();
  }
  recipeView.update(model.state.recipe);
  bookmarksView.renderBookmark(model.state.bookmarks);
};

const controlDisplayBookmarks = function () {
  const bookmarksBox = document.querySelector(".savedBookmarksContainer");

  if (model.state.bookmarks.length > 0)
    bookmarksBox.classList.toggle("savedBookmarksContainerVisible");
  else {
    controlsView.renderError();
  }
};

const controlHideBookmarks = function () {
  const bookmarksBox = document.querySelector(".savedBookmarksContainer");
  bookmarksBox.classList.remove("savedBookmarksContainerVisible");
};

const controlBookmarks = function () {
  if (model.state.bookmarks.length > 0)
    bookmarksView.render(model.state.bookmarks);
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
  bookmarksView.addHandlerHideBookmarks(controlHideBookmarks);
};
init();
