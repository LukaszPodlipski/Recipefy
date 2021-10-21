import View from "./View.js";

class addRecipeView extends View {
  _parentElement = document.querySelector(".add_recipe_container");
  _message = "Recipe was successfully uploaded :)";

  addHandlerHideAddRecipe(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".closeAddRecipeContainer");
      if (!btn) return;
      handler();
    });
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".upload_recipe_button");
      if (!btn) return;
      const dataArr = [
        ...new FormData(document.querySelector(".add_recipe_content")),
      ];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new addRecipeView();
