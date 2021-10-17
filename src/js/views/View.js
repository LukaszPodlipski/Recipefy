export default class View {
  _data;
  _notificationPlaceHolder = document.querySelector(".notificationPlaceHolder");
  _letsStartBox = document.querySelector(".letsStartText");

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      setTimeout(() => {
        this._parentElement.innerHTML = "";
        this._parentElement.parentElement.style.display = "none";
        this._letsStartBox.style.display = "flex";
      }, 500);
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `  <div class="loader activeLoader">
    <div class="loader loader--style1" title="0">
      <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40"
        xml:space="preserve">
        <path opacity="0.2" fill="#000"
          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
        <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                C22.32,8.481,24.301,9.057,26.013,10.047z">
          <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20"
            dur="0.5s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  </div>`;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  stopSpinner() {
    this._parentElement.innerHTML = "";
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="notificationAlert">
    <p class="alertText"><span>🔔 </span>${message}</p>
  </div>`;
    this._notificationPlaceHolder.insertAdjacentHTML("beforeend", markup);
    const alertBox = document.querySelector(".notificationAlert");
    alertBox.style.display = "flex";
    setTimeout(() => {
      alertBox.style.display = "none";
      this._notificationPlaceHolder.innerHTML = "";
    }, 4000);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="notificationAlert">
    <p class="alertText"><span>🔔 </span>${message}</p>
  </div>`;
    this._notificationPlaceHolder.insertAdjacentHTML("beforeend", markup);
    const alertBox = document.querySelector(".notificationAlert");
    alertBox.style.display = "flex";
    setTimeout(() => {
      alertBox.style.display = "none";
      this._notificationPlaceHolder.innerHTML = "";
    }, 4000);
  }
}
