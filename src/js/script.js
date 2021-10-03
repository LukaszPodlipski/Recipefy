const bookmark = false;

const bookmarkBox = document.querySelector(".bookmarkListBox");
const noBookmarkAlert = document.querySelector(".bookmarkAlert ");
const bookmarksButton = document
  .querySelector(".bookmarksButton ")
  .addEventListener("click", function () {
    if (bookmark) {
      bookmarkBox.classList.toggle("bookmarkVisible");
    } else {
      noBookmarkAlert.classList.add("notificationActive");
      setTimeout(function () {
        noBookmarkAlert.classList.remove("notificationActive");
      }, 2000);
    }
  });

const addRecipeContainer = document.querySelector(".addRecipeContainer");
const addRecipeButton = document
  .querySelector(".addRecipeButton")
  .addEventListener("click", function () {
    addRecipeContainer.classList.toggle("addRecipeVisible");
  });

const closeAddRecipeContainer = document
  .querySelector(".closeAddRecipeContainer")
  .addEventListener("click", function () {
    addRecipeContainer.classList.toggle("addRecipeVisible");
  });
