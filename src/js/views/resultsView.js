import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".recipes_container");
  _errorMessage = `No recipes found for your query, Please try again!`;
  _message = "";
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }
  _generateMarkupPreview(result) {
    return `<a href="#${result.id}" class="recipe_result">
            <img class="recipe_image" src="${result.image}" alt="${result.title}">
            <div class="recipe_board">
              <div class="recipe_content">
                <p class="recipe_title">${result.title}</p>
                <hr class="line" />
                <p class="recipe_author">${result.publisher}o</p>
              </div>
            </div>
          </a>`;
  }
}

export default new ResultsView();
