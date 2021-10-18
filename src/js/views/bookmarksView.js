import View from "./View.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarksList");
  _message = "";
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  addhandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkupPreview(result) {
    return `
          <a href="#${result.id}" class="bookmarkResult">
           <li class="bookmark"><img src="${result.image}" crossOrigin="anonymous" alt="${result.title}">
          <div class="bookmarkInfo">
            <p class="bookmarkTitle">${result.title}</p>
            <p class="bookmarkPublisher">by ${result.publisher}</p>
          </div>
        </li> </a>`;
  }
  addHandlerHideBookmarks(handler) {
    document
      .querySelector(".savedBookmarksContainer")
      .addEventListener("click", function (e) {
        const btn = e.target.closest(".closeBookmarksContainer");
        if (!btn) return;
        handler();
      });
  }
}

export default new BookmarksView();
