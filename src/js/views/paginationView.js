import View from "./View.js";
class PaginationView extends View {
  _parentElement = document.querySelector(".recipesBox");
  _leftPage = document.querySelector(".arrowLeft");
  _rightPage = document.querySelector(".arrowRight");
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".arrow");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _controlPagination(data) {
    const numPages = Math.ceil(data.results.length / data.resultsPerPage);
    if (data.page === 1 && numPages > 1) {
      this._leftPage.style.display = "none";
      this._rightPage.style.display = "inline-block";
      this._rightPage.dataset.goto = data.page + 1;
      return;
    }
    if (data.page === numPages && numPages > 1) {
      this._leftPage.style.display = "inline-block";
      this._rightPage.style.display = "none";
      this._leftPage.dataset.goto = data.page - 1;
      return;
    }
    if (data.page < numPages) {
      this._leftPage.style.display = "inline-block";
      this._rightPage.style.display = "inline-block";
      this._leftPage.dataset.goto = data.page - 1;
      this._rightPage.dataset.goto = data.page + 1;
      return;
    }
    this._leftPage.style.display = "none";
    this._rightPage.style.display = "none";
  }
}

export default new PaginationView();
