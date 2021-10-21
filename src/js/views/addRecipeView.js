import View from "./View.js";

class addRecipeView extends View {
  _parentElement = document.querySelector(".addRecipeContainer");
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
      const btn = e.target.closest(".uploadRecipeButton");
      if (!btn) return;
      const dataArr = [
        ...new FormData(document.querySelector(".addRecipeContentBox")),
      ];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new addRecipeView();
