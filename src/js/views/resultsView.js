import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".recipesContainer");
  _errorMessage = `No recipes found for your query, Please try again!`;
  _message = "";
  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join("");
  }
  _generateMarkupPreview(result) {
    console.log(result.id);
    return `<a href="#${result.id}" class="recipeResult">
            <img class="recipeImage" src="${result.image}" crossOrigin="anonymous" alt="${result.title}">
            <div class="recipeBoard">
              <div class="recipeContent">
                <p class="recipeTitle">${result.title}</p>
                <hr class="line" />
                <p class="recipeAuthor">${result.publisher}o</p>
              </div>
            </div>
          </a>`;
  }
}

export default new ResultsView();
