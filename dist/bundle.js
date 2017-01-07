/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Swipe = __webpack_require__(2);
	
	var _Swipe2 = _interopRequireDefault(_Swipe);
	
	var _PubSub = __webpack_require__(4);
	
	var _PubSub2 = _interopRequireDefault(_PubSub);
	
	var _ElementFactory = __webpack_require__(5);
	
	var _ElementFactory2 = _interopRequireDefault(_ElementFactory);
	
	var _ScreenWatcher = __webpack_require__(6);
	
	var _ScreenWatcher2 = _interopRequireDefault(_ScreenWatcher);
	
	var _ContentController = __webpack_require__(7);
	
	var _ContentController2 = _interopRequireDefault(_ContentController);
	
	var _DataService = __webpack_require__(8);
	
	var _DataService2 = _interopRequireDefault(_DataService);
	
	var _utils = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var App = function () {
	    function App() {
	        _classCallCheck(this, App);
	
	        this.pubSub = new _PubSub2.default();
	        this.screenWatcher = new _ScreenWatcher2.default(this.pubSub);
	        this.elementFactory = new _ElementFactory2.default();
	        this.dataService = new _DataService2.default();
	    }
	
	    _createClass(App, [{
	        key: 'start',
	        value: function start() {
	            var wrapper = this.elementFactory.createWrapper();
	            var videoWrapper = wrapper.querySelector('.video-wrapper');
	            document.body.appendChild(wrapper);
	            this.contentController = new _ContentController2.default(this.elementFactory, this.dataService, videoWrapper, this.pubSub);
	            this.swipe = new _Swipe2.default(this.screenWatcher.getScreenWidth(), videoWrapper, this.pubSub);
	        }
	    }]);
	
	    return App;
	}();
	
	window.app = new App();
	
	window.app.start();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Swipe = function () {
	    function Swipe(slideWidth, videoWrapper, pubSub) {
	        _classCallCheck(this, Swipe);
	
	        this.pubSub = pubSub;
	        this.videoWrapper = videoWrapper;
	        this.slideWidth = slideWidth;
	        this.currentPageNumber = 0;
	        this.mouseDownPosition = null;
	        this.mouseDownMargin = null;
	        this.moveSlideHandler = this.moveSlideHandler.bind(this);
	        this.mousedownHandler = this.mousedownHandler.bind(this);
	        this.mouseUpHandler = this.mouseUpHandler.bind(this);
	        this.pageClickHandler = this.pageClickHandler.bind(this);
	        this.pagging = this.pagging.bind(this);
	        this.saveLinksToDOMElement();
	        this.bindEvents();
	        this.calculatePagesCount();
	    }
	
	    _createClass(Swipe, [{
	        key: 'saveLinksToDOMElement',
	        value: function saveLinksToDOMElement() {
	            this.footerNavUl = document.querySelector('.footer-nav ul');
	            this.pageFooter = document.querySelector('.page-footer');
	        }
	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var _this = this;
	
	            this.footerNavUl.addEventListener('click', this.pageClickHandler);
	            document.body.addEventListener('mousedown', this.mousedownHandler);
	            document.body.addEventListener('mouseup', this.mouseUpHandler);
	            document.body.addEventListener('touchstart', this.mousedownHandler);
	            document.body.addEventListener('touchend', this.mouseUpHandler);
	            this.pubSub.on('ScreenWatcher:changeWidth', function (width) {
	                _this.slideWidth = width;
	                _this.calculatePagesCount();
	                _this.pagging();
	            });
	            this.pubSub.on('ContentController:searchHistory', function () {
	                document.body.removeEventListener('mousedown', _this.mousedownHandler);
	                document.body.removeEventListener('mouseup', _this.mouseUpHandler);
	                document.body.removeEventListener('touchstart', _this.mousedownHandler);
	                document.body.removeEventListener('touchend', _this.mouseUpHandler);
	            });
	            this.pubSub.on('ContentController:searchNow', function () {
	                document.body.addEventListener('mousedown', _this.mousedownHandler);
	                document.body.addEventListener('mouseup', _this.mouseUpHandler);
	                document.body.addEventListener('touchstart', _this.mousedownHandler);
	                document.body.addEventListener('touchend', _this.mouseUpHandler);
	                _this.calculatePagesCount();
	                setTimeout(_this.pagging, 500);
	            });
	            this.pubSub.on('ContentController:newArticles', function () {
	                _this.calculatePagesCount();
	                setTimeout(_this.pagging, 500);
	            });
	        }
	    }, {
	        key: 'calculatePagesCount',
	        value: function calculatePagesCount() {
	            this.pagesCount = Math.ceil(this.videoWrapper.children.length * 365 / this.slideWidth - 1);
	        }
	    }, {
	        key: 'mousedownHandler',
	        value: function mousedownHandler(e) {
	            if (e.target.nodeName === 'INPUT') {
	                return;
	            }
	            if (e.clientX) {
	                this.mouseDownPosition = e.clientX;
	                document.body.addEventListener('mousemove', this.moveSlideHandler);
	            } else {
	                this.mouseDownPosition = e.targetTouches[0].clientX;
	                document.body.addEventListener('touchmove', this.moveSlideHandler);
	            }
	            this.mouseDownMargin = parseInt((0, _utils.getStyle)(this.videoWrapper).marginLeft);
	        }
	    }, {
	        key: 'moveSlideHandler',
	        value: function moveSlideHandler(e) {
	            this.videoWrapper.style.transition = 'none';
	            var mouseMovePosition = e.clientX || e.targetTouches[0].clientX;
	            var positionDifference = mouseMovePosition - this.mouseDownPosition;
	            var margin = this.mouseDownMargin + positionDifference;
	            this.videoWrapper.style.marginLeft = margin + 'px';
	        }
	    }, {
	        key: 'mouseUpHandler',
	        value: function mouseUpHandler(e) {
	            if (e.target.nodeName === 'INPUT') {
	                return;
	            }
	            this.calculatePagesCount();
	            this.videoWrapper.style.transition = '0.5s';
	            var currentMargin = parseInt((0, _utils.getStyle)(this.videoWrapper).marginLeft);
	            this.slideNumber = Math.floor(currentMargin / this.slideWidth);
	            var marginLimit = -(this.slideWidth * this.pagesCount);
	            this.controlLimit(currentMargin, marginLimit);
	            this.turnPage(currentMargin, marginLimit);
	            document.body.removeEventListener('mousemove', this.moveSlideHandler);
	            document.body.removeEventListener('touchmove', this.moveSlideHandler);
	            setTimeout(this.pagging, 500);
	        }
	    }, {
	        key: 'pageClickHandler',
	        value: function pageClickHandler(e) {
	            if (e.target.nodeName !== 'LI') {
	                return;
	            }
	            if (document.querySelector('.active-header-nav').classList.contains('search')) {
	                this.pubSub.trigger('Swipe:swipeRight', e.target.innerHTML - 1, this.pagesCount);
	            }
	            var pageNumber = -(e.target.innerHTML - 1);
	            this.videoWrapper.style.marginLeft = pageNumber * this.slideWidth + 'px';
	        }
	    }, {
	        key: 'controlLimit',
	        value: function controlLimit(currentMargin, marginLimit) {
	            this.calculatePagesCount();
	            if (currentMargin >= 0) {
	                this.videoWrapper.style.marginLeft = '0px';
	            } else if (currentMargin < marginLimit) {
	                this.videoWrapper.style.marginLeft = marginLimit + 'px';
	            }
	        }
	    }, {
	        key: 'turnPage',
	        value: function turnPage(currentMargin, marginLimit) {
	            if (currentMargin < this.mouseDownMargin && currentMargin > marginLimit) {
	                var nextPageMargin = this.slideNumber * this.slideWidth;
	                this.videoWrapper.style.marginLeft = nextPageMargin + 'px';
	                if (document.querySelector('.active-header-nav').classList.contains('search')) {
	                    this.pubSub.trigger('Swipe:swipeRight', -this.slideNumber, this.pagesCount);
	                }
	            }
	            if (currentMargin > this.mouseDownMargin && currentMargin < 0) {
	                var prevPageMargin = (this.slideNumber + 1) * this.slideWidth;
	                this.videoWrapper.style.marginLeft = prevPageMargin + 'px';
	            }
	        }
	    }, {
	        key: 'pagging',
	        value: function pagging() {
	            if (this.videoWrapper.childElementCount && this.videoWrapper.firstChild.classList.contains('video-info')) {
	                this.footerNavUl.parentNode.parentNode.classList.remove('hidden');
	            } else {
	                return;
	            }
	            var currentMargin = parseInt((0, _utils.getStyle)(this.videoWrapper).marginLeft);
	            this.currentPageNumber = Math.round(Math.abs(currentMargin / this.slideWidth));
	            var pageNumberListItems = this.footerNavUl.children;
	            this.footerNavUl.querySelector('.active-page').classList.remove('active-page');
	            if (this.footerNavUl.querySelector('.no-border')) {
	                this.footerNavUl.querySelector('.no-border').classList.remove('no-border');
	            }
	            if (this.currentPageNumber < 3) {
	                pageNumberListItems[0].classList.remove('add-pseudo');
	                pageNumberListItems[this.currentPageNumber].classList.add('active-page');
	                if (pageNumberListItems[this.pagesCount]) {
	                    pageNumberListItems[this.pagesCount].classList.add('no-border');
	                }
	                for (var i = 1; i < 4; i++) {
	                    if (i > this.pagesCount) {
	                        pageNumberListItems[i].innerHTML = '';
	                    } else {
	                        pageNumberListItems[i].innerHTML = i + 1;
	                    }
	                }
	            } else {
	                pageNumberListItems[0].classList.add('add-pseudo');
	                for (var _i = 1; _i < 4; _i++) {
	                    if (this.pagesCount === this.currentPageNumber) {
	                        pageNumberListItems[_i].innerHTML = this.currentPageNumber - 2 + _i;
	                        pageNumberListItems[3].classList.add('active-page');
	                    } else {
	                        pageNumberListItems[_i].innerHTML = this.currentPageNumber - 1 + _i;
	                        pageNumberListItems[2].classList.add('active-page');
	                    }
	                }
	            }
	        }
	    }]);
	
	    return Swipe;
	}();
	
	exports.default = Swipe;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var getStyle = exports.getStyle = function getStyle(elem) {
	    return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
	};
	
	var createElem = exports.createElem = function createElem(tagName, text) {
	    for (var _len = arguments.length, classNames = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        classNames[_key - 2] = arguments[_key];
	    }
	
	    var tmp = document.createElement(tagName);
	    text = text || '';
	    if (classNames) {
	        var _tmp$classList;
	
	        (_tmp$classList = tmp.classList).add.apply(_tmp$classList, classNames);
	    }
	    var textNode = document.createTextNode(text);
	    tmp.appendChild(textNode);
	    return tmp;
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PubSub = function () {
	    function PubSub() {
	        _classCallCheck(this, PubSub);
	
	        this.subscriptions = {};
	    }
	
	    _createClass(PubSub, [{
	        key: "on",
	        value: function on(eventName, handler) {
	            if (this.subscriptions[eventName]) {
	                this.subscriptions[eventName].push(handler);
	            } else {
	                this.subscriptions[eventName] = [handler];
	            }
	            return this;
	        }
	    }, {
	        key: "trigger",
	        value: function trigger(eventName) {
	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }
	
	            if (this.subscriptions[eventName]) {
	                this.subscriptions[eventName].forEach(function (item) {
	                    setTimeout(function () {
	                        return item.apply(null, args);
	                    }, 0);
	                });
	            }
	            return this;
	        }
	    }, {
	        key: "off",
	        value: function off(eventName, handler) {
	            if (!this.subscriptions[eventName]) {
	                return;
	            } else {
	                var index = this.subscriptions[eventName].indexOf(handler);
	                this.subscriptions[eventName].splice(index, 1);
	            }
	        }
	    }]);
	
	    return PubSub;
	}();
	
	exports.default = PubSub;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ElementFactory = function () {
	    function ElementFactory() {
	        _classCallCheck(this, ElementFactory);
	    }
	
	    _createClass(ElementFactory, [{
	        key: 'createWrapper',
	        value: function createWrapper() {
	            var wrapper = (0, _utils.createElem)('div', null, 'wrapper');
	            wrapper.appendChild(this.createHeader());
	            wrapper.appendChild(this.createMain());
	            wrapper.appendChild(this.createFooter());
	            return wrapper;
	        }
	    }, {
	        key: 'createHeader',
	        value: function createHeader() {
	            var header = (0, _utils.createElem)('header', null, 'page-header');
	            var nav = (0, _utils.createElem)('nav', null, 'header-nav');
	            var ul = document.createElement('ul');
	            var liSearch = document.createElement('li');
	            var liBookmarks = document.createElement('li');
	            var liHistory = document.createElement('li');
	            liSearch.appendChild((0, _utils.createElem)('span', 'Search now', 'active-header-nav', 'search'));
	            liBookmarks.appendChild((0, _utils.createElem)('span', 'Bookmarks', 'bookmarks'));
	            liHistory.appendChild((0, _utils.createElem)('span', 'Search history', 'history'));
	            nav.appendChild(ul);
	            ul.appendChild(liSearch);
	            ul.appendChild(liBookmarks);
	            ul.appendChild(liHistory);
	            header.appendChild(nav);
	            return header;
	        }
	    }, {
	        key: 'createFooter',
	        value: function createFooter() {
	            var footer = (0, _utils.createElem)('footer', null, 'page-footer', 'hidden');
	            var nav = (0, _utils.createElem)('nav', null, 'footer-nav');
	            var ul = document.createElement('ul');
	            ul.appendChild((0, _utils.createElem)('li', 1, 'active-page'));
	            ul.appendChild((0, _utils.createElem)('li'));
	            ul.appendChild((0, _utils.createElem)('li'));
	            ul.appendChild((0, _utils.createElem)('li'));
	            nav.appendChild(ul);
	            footer.appendChild(nav);
	            return footer;
	        }
	    }, {
	        key: 'createMain',
	        value: function createMain() {
	            var main = document.createElement('main');
	            var inputWrapper = (0, _utils.createElem)('div', null, 'input-wrapper');
	            var videoWrapper = (0, _utils.createElem)('div', null, 'video-wrapper');
	            var span = document.createElement('span');
	            var input = document.createElement('input');
	            input.setAttribute('type', 'text');
	            input.setAttribute('placeholder', 'Search for YouTube videos');
	            inputWrapper.appendChild(span);
	            inputWrapper.appendChild(input);
	            main.appendChild(inputWrapper);
	            main.appendChild(videoWrapper);
	            return main;
	        }
	    }, {
	        key: 'createVideoInfo',
	        value: function createVideoInfo(data, IDs) {
	            var article = (0, _utils.createElem)('article', null, 'video-info');
	            var id = typeof data.id === 'string' ? data.id : data.id.videoId;
	            if (~IDs.indexOf(id)) {
	                article.classList.add('active-bookmark');
	            }
	            article.setAttribute('id', id);
	            var img = document.createElement('img');
	            var divDefinition = (0, _utils.createElem)('div', null, 'defenition');
	            var videoTitle = (0, _utils.createElem)('h2', data.snippet.title, 'video-title');
	            var authorBox = (0, _utils.createElem)('p', null, 'author-box');
	            var author = (0, _utils.createElem)('span', data.snippet.channelTitle, 'author');
	            var videoDate = (0, _utils.createElem)('span', data.snippet.publishedAt.slice(0, 10), 'date');
	            var videoDescription = (0, _utils.createElem)('p', data.snippet.description, 'description');
	            var divViews = (0, _utils.createElem)('div', data.statistics.viewCount, 'views');
	            var divLikes = (0, _utils.createElem)('div', data.statistics.likeCount, 'likes');
	            var divBookmark = (0, _utils.createElem)('div', null, 'bookmark');
	            var viewsIcon = (0, _utils.createElem)('i', null, 'fa', 'fa-eye');
	            var likesIcon = (0, _utils.createElem)('i', null, 'fa', 'fa-thumbs-o-up');
	            var bookmarkIcon = (0, _utils.createElem)('i', null, 'fa', 'fa-bookmark-o');
	
	            article.appendChild(img);
	            article.appendChild(divDefinition);
	            article.appendChild(divViews);
	            article.appendChild(divLikes);
	            article.appendChild(divBookmark);
	            authorBox.appendChild(author);
	            authorBox.appendChild(videoDate);
	            divDefinition.appendChild(videoTitle);
	            divDefinition.appendChild(authorBox);
	            divDefinition.appendChild(videoDescription);
	            divBookmark.appendChild(bookmarkIcon);
	            divViews.insertBefore(viewsIcon, divViews.firstChild);
	            divLikes.insertBefore(likesIcon, divLikes.firstChild);
	
	            img.setAttribute('src', data.snippet.thumbnails.medium.url);
	            img.setAttribute('alt', data.snippet.title);
	            videoTitle.setAttribute('title', data.snippet.title);
	            authorBox.setAttribute('title', data.snippet.channelTitle);
	            return article;
	        }
	    }, {
	        key: 'createArticles',
	        value: function createArticles(articles, IDs) {
	            var fragment = document.createDocumentFragment();
	            for (var i = 0; i < articles.length; i++) {
	                fragment.appendChild(this.createVideoInfo(articles[i], IDs));
	            }
	            return fragment;
	        }
	    }, {
	        key: 'createSearchHistoryList',
	        value: function createSearchHistoryList() {
	            var ul = (0, _utils.createElem)('ul', null, 'search-list');
	            if (!localStorage.getItem('youTubeSearchHistory')) {
	                ul.appendChild(createSearchListItem('There is no search history yet, please search some video ; -)'));
	                return ul;
	            }
	            var history = JSON.parse(localStorage.getItem('youTubeSearchHistory'));
	            history.reverse();
	            for (var i = 0; i < history.length; i++) {
	                ul.appendChild(createSearchListItem(history[i][0], history[i][1]));
	            }
	            return ul;
	            function createSearchListItem(text, data) {
	                var li = document.createElement('li');
	                var searchText = (0, _utils.createElem)('span', text, 'search-text');
	                var searchData = (0, _utils.createElem)('span', data, 'search-date');
	                li.appendChild(searchText);
	                li.appendChild(searchData);
	                return li;
	            }
	        }
	    }, {
	        key: 'createBookmarksList',
	        value: function createBookmarksList(articles, IDs) {
	            if (!articles.length) {
	                var ul = (0, _utils.createElem)('ul', null, 'search-list');
	                ul.appendChild((0, _utils.createElem)('li', 'There is no bookmarks yet, please add some video to bookmarks ; -)'));
	                return ul;
	            } else {
	                return this.createArticles(articles, IDs);
	            }
	        }
	    }, {
	        key: 'createNoSearchResultMessage',
	        value: function createNoSearchResultMessage() {
	            var ul = (0, _utils.createElem)('ul', null, 'search-list');
	            ul.appendChild((0, _utils.createElem)('li', 'There is no search result ; -)'));
	            return ul;
	        }
	    }]);
	
	    return ElementFactory;
	}();
	
	exports.default = ElementFactory;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ScreenWatcher = function () {
	    function ScreenWatcher(pubSub) {
	        _classCallCheck(this, ScreenWatcher);
	
	        this.pubSub = pubSub;
	        this.resizeHandler = this.resizeHandler.bind(this);
	        window.addEventListener('resize', this.resizeHandler);
	    }
	
	    _createClass(ScreenWatcher, [{
	        key: 'resizeHandler',
	        value: function resizeHandler() {
	            var screenWidth = this.getScreenWidth();
	            this.pubSub.trigger('ScreenWatcher:changeWidth', screenWidth);
	        }
	    }, {
	        key: 'getScreenWidth',
	        value: function getScreenWidth() {
	            var screenWidth = window.outerWidth;
	            if (screenWidth > 1460) {
	                return 1460;
	            } else if (screenWidth > 1095) {
	                return 1095;
	            } else if (screenWidth > 730) {
	                return 730;
	            } else if (screenWidth <= 730) {
	                return 365;
	            }
	        }
	    }]);
	
	    return ScreenWatcher;
	}();
	
	exports.default = ScreenWatcher;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ContentController = function () {
	    function ContentController(elementFactory, dataService, videoWrapper, pubSub) {
	        _classCallCheck(this, ContentController);
	
	        this.elementFactory = elementFactory;
	        this.dataService = dataService;
	        this.videoWrapper = videoWrapper;
	        this.pubSub = pubSub;
	        this.videoWrapperContent = [];
	        this.currentPageClass = 'search';
	        this.pageMargin = 0;
	        this.inputSearchHandler = this.inputSearchHandler.bind(this);
	        this.inputKeypressHandler = this.inputKeypressHandler.bind(this);
	        this.searchHistoryClickHandler = this.searchHistoryClickHandler.bind(this);
	        this.searchNowClickHandler = this.searchNowClickHandler.bind(this);
	        this.bookmarksClickHandler = this.bookmarksClickHandler.bind(this);
	        this.addToBookmarkHandler = this.addToBookmarkHandler.bind(this);
	        this.searchFormHistoryHandler = this.searchFormHistoryHandler.bind(this);
	        this.openYouTubeVideo = this.openYouTubeVideo.bind(this);
	        this.saveLinksToDOMElement();
	        this.bindEvents();
	    }
	
	    _createClass(ContentController, [{
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var _this = this;
	
	            document.querySelector('main input').addEventListener('keypress', this.inputKeypressHandler);
	            this.inputWrapperSpanElement.addEventListener('click', this.inputSearchHandler);
	            document.querySelector('.history').addEventListener('click', this.searchHistoryClickHandler);
	            this.searchElement.addEventListener('click', this.searchNowClickHandler);
	            document.querySelector('.bookmarks').addEventListener('click', this.bookmarksClickHandler);
	            this.videoWrapper.addEventListener('click', this.addToBookmarkHandler);
	            this.videoWrapper.addEventListener('click', this.searchFormHistoryHandler);
	            this.videoWrapper.addEventListener('click', this.openYouTubeVideo);
	            this.pubSub.on('Swipe:swipeRight', function (currentPage, totalPage) {
	                if (totalPage - currentPage <= 2) {
	                    _this.dataService.getItems(_this.searchValue, _this.nextPageToken).then(function (data) {
	                        var fragment = _this.elementFactory.createArticles(data.items, JSON.parse(localStorage.getItem('youTubeBookmarks')) || []);
	                        _this.videoWrapper.appendChild(fragment);
	                        _this.pubSub.trigger('ContentController:newArticles');
	                        _this.nextPageToken = data.nextPageToken;
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'saveLinksToDOMElement',
	        value: function saveLinksToDOMElement() {
	            this.searchElement = document.querySelector('.search');
	            this.inputWrapperSpanElement = document.querySelector('.input-wrapper span');
	            this.pageFooterElement = document.querySelector('.page-footer');
	            this.inputElement = document.querySelector('input');
	        }
	    }, {
	        key: 'inputKeypressHandler',
	        value: function inputKeypressHandler(e) {
	            if (e.keyCode !== 13) {
	                return;
	            }
	            var clickEvent = new Event('click');
	            this.inputWrapperSpanElement.dispatchEvent(clickEvent);
	            this.searchElement.dispatchEvent(clickEvent);
	        }
	    }, {
	        key: 'clearContent',
	        value: function clearContent(saveVideoWrapperContent, className, e) {
	            if (e.target.classList.contains('' + className) && e.target.classList.contains('active-header-nav')) {
	                return false;
	            }
	            if (saveVideoWrapperContent) {
	                if (this.currentPageClass === 'search') {
	                    this.pageMargin = parseInt((0, _utils.getStyle)(this.videoWrapper).marginLeft);
	                }
	                this.videoWrapper.style.marginLeft = '0px';
	                if (!this.videoWrapperContent.length) {
	                    while (this.videoWrapper.firstChild) {
	                        this.videoWrapperContent.push(this.videoWrapper.removeChild(this.videoWrapper.firstChild));
	                    }
	                } else {
	                    while (this.videoWrapper.firstChild) {
	                        this.videoWrapper.removeChild(this.videoWrapper.firstChild);
	                    }
	                }
	            } else {
	                this.videoWrapper.style.marginLeft = this.pageMargin + 'px';
	                while (this.videoWrapper.firstChild) {
	                    this.videoWrapper.removeChild(this.videoWrapper.firstChild);
	                }
	                for (var i = 0; i < this.videoWrapperContent.length; i++) {
	                    this.videoWrapper.appendChild(this.videoWrapperContent[i]);
	                }
	                this.videoWrapperContent = [];
	            }
	            document.querySelector('.active-header-nav').classList.remove('active-header-nav');
	            document.querySelector('.' + className).classList.add('active-header-nav');
	            this.currentPageClass = className;
	            this.pageFooterElement.classList.add('hidden');
	            return true;
	        }
	    }, {
	        key: 'searchHistoryClickHandler',
	        value: function searchHistoryClickHandler(e) {
	            if (!this.clearContent(true, 'history', e)) {
	                return;
	            } else {
	                var tmp = this.elementFactory.createSearchHistoryList();
	                this.videoWrapper.appendChild(tmp);
	                this.pubSub.trigger('ContentController:searchHistory');
	            }
	        }
	    }, {
	        key: 'searchNowClickHandler',
	        value: function searchNowClickHandler(e) {
	            if (!this.clearContent(false, 'search', e)) {
	                return;
	            } else {
	                this.pubSub.trigger('ContentController:searchNow');
	            }
	        }
	    }, {
	        key: 'bookmarksClickHandler',
	        value: function bookmarksClickHandler(e) {
	            if (!this.clearContent(true, 'bookmarks', e)) {
	                return;
	            } else {
	                this.loadBookmarks();
	            }
	        }
	    }, {
	        key: 'loadBookmarks',
	        value: function loadBookmarks() {
	            var _this2 = this;
	
	            var videoIDs = JSON.parse(localStorage.getItem('youTubeBookmarks'));
	            if (videoIDs) {
	                this.dataService.getVideoInfoById(videoIDs, ['snippet', 'statistics']).then(function (data) {
	                    var tmp = _this2.elementFactory.createBookmarksList(data.items, videoIDs);
	                    _this2.videoWrapper.appendChild(tmp);
	                    _this2.pubSub.trigger('ContentController:searchNow');
	                });
	            } else {
	                var tmp = this.elementFactory.createBookmarksList([]);
	                this.videoWrapper.appendChild(tmp);
	                this.pubSub.trigger('ContentController:searchNow');
	            }
	        }
	    }, {
	        key: 'inputSearchHandler',
	        value: function inputSearchHandler(e) {
	            var _this3 = this;
	
	            var clickEvent = new Event('click');
	            this.searchElement.dispatchEvent(clickEvent);
	            this.pubSub.trigger('ContentController:searchNow');
	            var val = e.target.nextElementSibling.value;
	            if (val === '') {
	                return;
	            }
	            if (this.searchValue === val) {
	                return;
	            }
	            this.videoWrapper.style.marginLeft = '0px';
	            while (this.videoWrapper.firstChild) {
	                this.videoWrapper.removeChild(this.videoWrapper.firstChild);
	            }
	            this.dataService.getItems(val).then(function (data) {
	                if (!data.items.length) {
	                    _this3.pubSub.trigger('ContentController:searchHistory');
	                    _this3.videoWrapper.appendChild(_this3.elementFactory.createNoSearchResultMessage());
	                }
	                var fragment = _this3.elementFactory.createArticles(data.items, JSON.parse(localStorage.getItem('youTubeBookmarks')) || []);
	                _this3.videoWrapper.appendChild(fragment);
	                _this3.searchValue = val;
	                _this3.pubSub.trigger('ContentController:newArticles');
	                _this3.nextPageToken = data.nextPageToken;
	            });
	            var youTubeSearchHistory = JSON.parse(localStorage.getItem('youTubeSearchHistory'));
	            if (youTubeSearchHistory) {
	                for (var i = 0; i < youTubeSearchHistory.length; i++) {
	                    if (youTubeSearchHistory[i][0] === val) {
	                        youTubeSearchHistory.splice(i, 1);
	                    }
	                }
	                youTubeSearchHistory.push([val, new Date().toString().substr(0, 25)]);
	                if (youTubeSearchHistory.length > 13) {
	                    youTubeSearchHistory.splice(0, 1);
	                }
	                localStorage.setItem('youTubeSearchHistory', JSON.stringify(youTubeSearchHistory));
	                return;
	            }
	            var tmp = [[val, new Date().toString().substr(0, 24)]];
	            localStorage.setItem('youTubeSearchHistory', JSON.stringify(tmp));
	        }
	    }, {
	        key: 'addToBookmarkHandler',
	        value: function addToBookmarkHandler(e) {
	            if (!e.target.classList.contains('fa-bookmark-o')) {
	                return;
	            }
	            var id = e.target.parentNode.parentNode.id;
	            e.target.parentNode.parentNode.classList.toggle('active-bookmark');
	            var youTubeBookmarks = JSON.parse(localStorage.getItem('youTubeBookmarks'));
	            if (youTubeBookmarks) {
	                for (var i = 0; i < youTubeBookmarks.length; i++) {
	                    if (youTubeBookmarks[i] === id) {
	                        youTubeBookmarks.splice(i, 1);
	                        localStorage.setItem('youTubeBookmarks', JSON.stringify(youTubeBookmarks));
	                        return;
	                    }
	                }
	                youTubeBookmarks.push(id);
	                localStorage.setItem('youTubeBookmarks', JSON.stringify(youTubeBookmarks));
	                return;
	            }
	            var tmp = [e.target.parentNode.parentNode.id];
	            localStorage.setItem('youTubeBookmarks', JSON.stringify(tmp));
	        }
	    }, {
	        key: 'searchFormHistoryHandler',
	        value: function searchFormHistoryHandler(e) {
	            if (!e.target.classList.contains('search-text') && !e.target.classList.contains('search-date')) {
	                return;
	            }
	            if (e.target.classList.contains('search-text')) {
	                this.inputElement.value = e.target.innerHTML;
	            }
	            if (e.target.classList.contains('search-date')) {
	                this.inputElement.value = e.target.previousElementSibling.innerHTML;
	            }
	            var click = new Event('click');
	            this.searchElement.dispatchEvent(click);
	            this.inputWrapperSpanElement.dispatchEvent(click);
	        }
	    }, {
	        key: 'openYouTubeVideo',
	        value: function openYouTubeVideo(e) {
	            if (!e.target.classList.contains('video-title')) {
	                return;
	            }
	            var id = e.target.parentNode.parentNode.id;
	            window.open('https://www.youtube.com/watch?v=' + id);
	        }
	    }]);
	
	    return ContentController;
	}();
	
	exports.default = ContentController;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DataService = function () {
	    function DataService() {
	        _classCallCheck(this, DataService);
	    }
	
	    _createClass(DataService, [{
	        key: 'getVideoInfoByQuery',
	        value: function getVideoInfoByQuery(val, nextPage) {
	            return new Promise(function (resolve, reject) {
	                var xhr = new XMLHttpRequest();
	                if (nextPage) {
	                    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?' + 'key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&' + 'type=video&' + 'part=snippet&' + 'maxResults=15&' + ('pageToken=' + nextPage + '&') + ('q=' + val + '?'), true);
	                } else {
	                    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?' + 'key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&' + 'type=video&' + 'part=snippet&' + 'maxResults=15&' + ('q=' + val + '?'), true);
	                }
	                xhr.send();
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState !== 4) {
	                        return;
	                    }
	                    resolve(JSON.parse(xhr.responseText));
	                };
	            });
	        }
	    }, {
	        key: 'getVideoInfoById',
	        value: function getVideoInfoById(idMovies, part) {
	            return new Promise(function (resolve, reject) {
	                var xhr = new XMLHttpRequest();
	                xhr.open('GET', 'https://www.googleapis.com/youtube/v3/videos?' + 'key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&' + ('part=' + part + '&') + ('id=' + idMovies), true);
	                xhr.send();
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState !== 4) {
	                        return;
	                    }
	                    resolve(JSON.parse(xhr.responseText));
	                };
	            });
	        }
	    }, {
	        key: 'getItems',
	        value: function getItems(val, nextPage) {
	            var _this = this;
	
	            return this.getVideoInfoByQuery(val, nextPage).then(function (data) {
	                var items = data.items;
	                var ids = items.map(function (item) {
	                    return item.id.videoId;
	                });
	                var nextPageToken = data.nextPageToken;
	                return _this.getVideoInfoById(ids, 'statistics').then(function (_data) {
	                    var _items = _data.items;
	                    for (var i = 0; i < items.length; i++) {
	                        items[i].statistics = _items[i].statistics;
	                    }
	                    return {
	                        items: items,
	                        nextPageToken: nextPageToken
	                    };
	                });
	            });
	        }
	    }]);
	
	    return DataService;
	}();
	
	exports.default = DataService;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map