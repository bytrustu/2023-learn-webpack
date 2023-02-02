/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainController)
/* harmony export */ });
/* harmony import */ var _views_FormView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _views_ResultView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _views_TabView_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _views_KeywordView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _views_HistoryView_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _models_SearchModel_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _models_KeywordModel_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);
/* harmony import */ var _models_HistoryModel_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10);










class MainController {
  constructor() {
    const formViewEl = document.querySelector("form");
    const tabViewEl = document.querySelector("#tabs");
    const keywordViewEl = document.querySelector("#search-keyword");
    const historyViewEl = document.querySelector("#search-history");
    const resultViewEl = document.querySelector("#search-result");

    this.formView = new _views_FormView_js__WEBPACK_IMPORTED_MODULE_0__["default"](formViewEl)
      .on("@submit", e => this.search(e.detail.input))
      .on("@reset", () => this.renderView());

    this.tabView = new _views_TabView_js__WEBPACK_IMPORTED_MODULE_2__["default"](tabViewEl).on("@change", e =>
      this.onChangeTab(e.detail.tabName)
    );

    this.keywordView = new _views_KeywordView_js__WEBPACK_IMPORTED_MODULE_3__["default"](keywordViewEl).on("@click", e =>
      this.search(e.detail.keyword)
    );

    this.historyView = new _views_HistoryView_js__WEBPACK_IMPORTED_MODULE_4__["default"](historyViewEl)
      .on("@click", e => this.search(e.detail.keyword))
      .on("@remove", e => this.onRemoveHistory(e.detail.keyword));

    this.resultView = new _views_ResultView_js__WEBPACK_IMPORTED_MODULE_1__["default"](resultViewEl);

    this.selectedTab = "추천 검색어";
    this.renderView();
  }

  async search(query) {
    this.formView.setValue(query);
    const data = await _models_SearchModel_js__WEBPACK_IMPORTED_MODULE_5__["default"].list(query);
    this.onSearchResult(data);
  }

  onSearchResult(data) {
    this.tabView.hide();
    this.keywordView.hide();
    this.historyView.hide();
    this.resultView.mount(data);
  }

  onChangeTab(tabName) {
    this.selectedTab = tabName;
    this.renderView();
  }

  async renderView() {
    this.tabView.setActiveTab(this.selectedTab);

    if (this.selectedTab === "추천 검색어") {
      const data = await _models_KeywordModel_js__WEBPACK_IMPORTED_MODULE_6__["default"].list();
      this.keywordView.mount(data);
      this.historyView.hide();
    } else {
      const data = await _models_HistoryModel_js__WEBPACK_IMPORTED_MODULE_7__["default"].list();
      this.historyView.mount(data).bindRemoveBtn();
      this.keywordView.hide();
    }

    this.resultView.hide();
  }

  onRemoveHistory(keyword) {
    _models_HistoryModel_js__WEBPACK_IMPORTED_MODULE_7__["default"].remove(keyword);
    this.renderView();
  }
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormView)
/* harmony export */ });
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


class FormView extends _View_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(el) {
    super(el);
    this._inputEl = el.querySelector("[type=text]");
    this._resetEl = el.querySelector("[type=reset]");
    this.showResetBtn(false);
    this.bindEvents();
    return this;
  }

  showResetBtn(show = true) {
    this._resetEl.style.display = show ? "block" : "none";
  }

  bindEvents() {
    this.on("submit", e => e.preventDefault());
    this._inputEl.addEventListener("keyup", e => this.onKeyup(e));
    this._resetEl.addEventListener("click", () => this.onClickReset());
  }

  onKeyup(e) {
    const enter = 13;
    this.showResetBtn(this._inputEl.value.length);
    if (!this._inputEl.value.length) this.emit("@reset");
    if (e.keyCode !== enter) return;
    this.emit("@submit", { input: this._inputEl.value });
  }

  onClickReset() {
    this.emit("@reset");
    this.showResetBtn(false);
  }

  setValue(value = "") {
    this._inputEl.value = value;
    this.showResetBtn(this._inputEl.value.length);
  }
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
class View {
  constructor(el) {
    if (!el) throw el;

    this.el = el;
    return this;
  }

  on(event, handler) {
    this.el.addEventListener(event, handler);
    return this;
  }

  emit(event, data) {
    const evt = new CustomEvent(event, {
      detail: data
    });
    this.el.dispatchEvent(evt);
    return this;
  }

  hide() {
    this.el.style.display = "none";
    return this;
  }

  show() {
    this.el.style.display = "";
    return this;
  }
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResultView)
/* harmony export */ });
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


class ResultView extends _View_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(el) {
    super(el);

    this.messages = {
      NO_RESULT: "검색 결과가 없습니다"
    };
  }

  mount(data = []) {
    this.el.innerHTML = `<div class="ResultView">
      ${data.length ? this.getSearchResultsHtml(data) : this.messages.NO_RESULT}
    </div>`;
    this.show();
  }

  getSearchResultsHtml(data) {
    return (
      data.reduce((html, item) => {
        html += this.getSearchItemHtml(item);
        return html;
      }, "<ul>") + "</ul>"
    );
  }

  getSearchItemHtml(item) {
    return `<li>
      <img src="${item.image}" onerror="this.src='src/images/default-image.jpg'"/>
      <p>${item.name}</p>
    </li>`;
  }
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TabView)
/* harmony export */ });
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);



class TabView extends _View_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(el) {
    super(el);

    this.mount();
    this.bindEvents();
  }

  mount() {
    this.el.innerHTML = `<ul class="TabView">
      <li>추천 검색어</li>
      <li>최근 검색어</li>
    </ul>`;
  }

  get tabItems() {
    return Array.from(this.el.children[0].children);
  }

  bindEvents() {
    this.tabItems.forEach(li => {
      li.addEventListener("click", () => this.onClick(li.innerHTML));
    });
  }

  onClick(tabName) {
    this.setActiveTab(tabName);
    this.emit("@change", { tabName });
  }

  setActiveTab(tabName) {
    this.tabItems.forEach(li => {
      li.className = li.innerHTML === tabName ? "active" : "";
    });
    this.show();
  }
}


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ KeywordView)
/* harmony export */ });
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


class KeywordView extends _View_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(el) {
    super(el);

    this._messages = {
      NO_KEYWORDS: "추천 검색어가 없습니다"
    };

    return this;
  }

  mount(data = []) {
    this.el.innerHTML = data.length
      ? this.getKeywordsHtml(data)
      : this._messages.NO_KEYWORDS;
    this.show();
    this._bindClickEvent();
    return this;
  }

  getKeywordsHtml(data) {
    return (
      data.reduce((html, item, index) => {
        html += `<li data-keyword="${
          item.keyword
        }"><span class="number">${index + 1}</span>${item.keyword}</li>`;
        return html;
      }, '<ul class="KeywordView">') + "</ul>"
    );
  }

  _bindClickEvent() {
    Array.from(this.el.querySelectorAll("li")).forEach(li => {
      li.addEventListener("click", e => this._onClickKeyword(e));
    });
  }

  _onClickKeyword(e) {
    const { keyword } = e.currentTarget.dataset;
    this.emit("@click", { keyword });
  }
}


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HistoryView)
/* harmony export */ });
/* harmony import */ var _KeywordView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


class HistoryView extends _KeywordView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(el) {
    super(el);
    this._messages.NO_KEYWORDS = "검색 이력이 없습니다";

    return this;
  }

  getKeywordsHtml(data) {
    return (
      data.reduce((html, item) => {
        html += `<li data-keyword="${item.keyword}">
        ${item.keyword} 
        <span class="date">${item.date}</span>
        <button class="btn-remove"></button>
        </li>`;
        return html;
      }, '<ul class="HistoryView">') + "</ul>"
    );
  }

  bindRemoveBtn() {
    Array.from(this.el.querySelectorAll("button.btn-remove")).forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        this.onRemove(btn.parentElement.dataset.keyword);
      });
    });
  }

  onRemove(keyword) {
    this.emit("@remove", { keyword });
  }
}


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const data = [
  {
    id: 1,
    name: "[버거] 치즈버거처럼 생긴 새우버거",
    image:
      "https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 2,
    name: "[피자] 썸네일 주소가 잘못된 상품",
    image: "http://foo.bar/image.jpg"
  }
];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  list() {
    return new Promise(res => {
      setTimeout(() => {
        res(data);
      }, 200);
    });
  }
});


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: [
    { keyword: "이탈리아" },
    { keyword: "세프의요리" },
    { keyword: "제철" },
    { keyword: "홈파티" }
  ],
  list() {
    return new Promise(res => {
      setTimeout(() => {
        res(this.data);
      }, 200);
    });
  }
});


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: [
    { keyword: "검색기록2", date: "12.03" },
    { keyword: "검색기록1", date: "12.02" },
    { keyword: "검색기록0", date: "12.01" }
  ],

  list() {
    return Promise.resolve(this.data);
  },

  add(keyword = "") {
    keyword = keyword.trim();
    if (!keyword) return;
    if (this.data.some(item => item.keyword === keyword)) {
      this.remove(keyword);
    }

    const date = "12.31";
    this.data = [
      {
        keyword,
        date
      },
      ...this.data
    ];
  },

  remove(keyword) {
    this.data = this.data.filter(item => item.keyword !== keyword);
  }
});


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_MainController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {
  new _controllers_MainController_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  alert('동작함');
});

})();

/******/ })()
;