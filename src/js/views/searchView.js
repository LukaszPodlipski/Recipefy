class SearchView {
  _parentElement = document.querySelector(".controlsContainer");
  _searchForm = document.querySelector(".form__field");
  _searchButton = document.querySelector(".searchButton");
  getQuery() {
    const query = this._searchForm.value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._searchForm.value = "";
  }

  addHanlderSearch(handler) {
    this._searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
