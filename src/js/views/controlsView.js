import View from "./View.js";

class controlsView extends View {
  _parentElement = document.querySelector(".controls_container");
  _notificationPlaceHolder = document.querySelector(
    ".notification_place_holder"
  );
  _errorMessage = `You don't have any bookmarks yet! Find a nice recipe and bookmark it :)`;
  _message = "";

  addHandlerShowBookmarks(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".bookmarks_button");
      if (!btn) return;
      handler();
    });
  }
  addHandlerShowAddRecipe(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".add_recipe_button");
      if (!btn) return;
      handler();
    });
  }
}

export default new controlsView();
