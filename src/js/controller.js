import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import * as selectors from "./selectors";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import controlsView from "./views/controlsView.js";
import addRecipeView from "./views/addRecipeView.js";

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    selectors.startBox.style.display = "none";
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    setTimeout(function () {
      selectors.startBox.style.display = "flex";
      recipeView.stopSpinner();
    }, 500);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    selectors.startBox.style.display = "none";
    selectors.recipesBox.style.display = "grid";
    if (!query) {
      setTimeout(function () {
        recipeView.renderError();
        selectors.recipesBox.style.display = "none";
        selectors.startBox.style.display = "flex";
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
  if (model.state.bookmarks.length > 0)
    selectors.bookmarksBox.classList.toggle(
      "saved_bookmarks_container_visible"
    );
  else {
    controlsView.renderError();
  }
};

const controlHideBookmarks = function () {
  selectors.bookmarksBox.classList.remove("saved_bookmarks_container_visible");
};

const controlBookmarks = function () {
  if (model.state.bookmarks.length > 0)
    bookmarksView.render(model.state.bookmarks);
};

const controlDisplayAddRecipe = function () {
  selectors.addRecipeBox.classList.toggle("saved_bookmarks_container_visible");
};

const controlHideAddRecipe = function () {
  selectors.addRecipeBox.classList.toggle("saved_bookmarks_container_visible");
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

selectors.startBox.addEventListener("click", function () {
  selectors.startBox.style.transform = "scale(1.1)";
  setTimeout(function () {
    selectors.startBox.style.transform = "scale(1)";
  }, 200);
});

const displayInitView = function () {
  const id = window.location.hash.slice(1);
  if (!id) {
    selectors.chosenRecipeContainer.style.display = "none";
    selectors.recipesBox.style.display = "none";
    setTimeout(function () {
      selectors.html.style.display = "inline-block";
      selectors.headBurger.style.margin = "50px auto 30px auto";
      selectors.headText.style.display = "block";
      selectors.profile.style.display = "flex";
      selectors.controlsContainer.style.display = "flex";
      selectors.startBox.style.display = "flex";
      selectors.body.style.minHeight = "84vh";
      selectors.chosenRecipeContainer.style.display = "inline-block";
      recipeView.stopSpinner();
    }, 2000);
  } else {
    selectors.html.style.display = "inline-block";
    selectors.headBurger.style.margin = "50px auto 30px auto";
    selectors.headText.style.display = "block";
    selectors.profile.style.display = "flex";
    selectors.controlsContainer.style.display = "flex";
    selectors.startBox.style.display = "flex";
    selectors.body.style.minHeight = "84vh";
    selectors.chosenRecipeContainer.style.display = "inline-block";
  }
};

const init = function () {
  window.addEventListener("load", displayInitView());
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
