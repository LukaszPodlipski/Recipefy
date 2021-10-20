import View from "./View.js";

class controlsView extends View {
  _parentElement = document.querySelector(".controlsContainer");
  _notificationPlaceHolder = document.querySelector(".notificationPlaceHolder");
  _errorMessage = `You don't have any bookmarks yet! Find a nice recipe and bookmark it :)`;
  _message = "";

  addHandlerShowBookmarks(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".bookmarksButton");
      if (!btn) return;
      handler();
    });
  }
  addHandlerShowAddRecipe(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".addRecipeButton");
      if (!btn) return;
      handler();
    });
  }
}

export default new controlsView();
