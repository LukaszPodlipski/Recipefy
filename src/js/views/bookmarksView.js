import View from "./View.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks_list");
  _message = "";
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  addhandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkupPreview(result) {
    return `
          <a href="#${result.id}" class="bookmark_result">
           <div class="bookmark"><img src="${result.image}" alt="${result.title}">
          <div class="bookmark_content">
            <p class="bookmark_title">${result.title}</p>
            <p class="bookmark_publisher">by ${result.publisher}</p>
          </div>
        </div> </a>`;
  }
  addHandlerHideBookmarks(handler) {
    document
      .querySelector(".saved_bookmarks_container")
      .addEventListener("click", function (e) {
        const btn = e.target.closest(".close_bookmarks_button");
        if (!btn) return;
        handler();
      });
  }
}

export default new BookmarksView();
