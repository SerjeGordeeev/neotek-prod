webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Component = Component;
/**
 * Декоратор для компонента
 * @param options
 * @returns {Function}
 * @constructor
 */
function Component(options) {
  return function (target) {
    return _extends({}, options, { controller: target });
  };
}

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOSAxM2gtNnY2aC0ydi02SDV2LTJoNlY1aDJ2Nmg2djJ6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg=="

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg=="

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MoviesService = function () {
	/* @ngInject */
	function MoviesService(Genres, Actors, Countries, Directors, Attachments, Api, $q) {
		_classCallCheck(this, MoviesService);

		this.services = { Genres: Genres, Actors: Actors, Countries: Countries, Directors: Directors, Attachments: Attachments, Api: Api, $q: $q };
		this.apiUrl = "/movies";
	}

	_createClass(MoviesService, [{
		key: "api",
		value: function api() {
			var Api = this.services.Api;


			return Api.service(this.apiUrl);
		}
	}, {
		key: "getMovies",
		value: function getMovies(params) {
			var _this = this;

			return this.api().getList(params).then(function (movies) {
				return _this.$$processMovies(movies);
			});
		}
	}, {
		key: "getOne",
		value: function getOne(id) {
			var _this2 = this;

			return this.api().one(id).get().then(function (movie) {
				return _this2.$$processMovies([movie]);
			}).then(function (movies) {
				return movies[0];
			});
		}
	}, {
		key: "$$processMovies",
		value: function $$processMovies(movies) {
			var _services = this.services,
			    $q = _services.$q,
			    Genres = _services.Genres,
			    Actors = _services.Actors,
			    Countries = _services.Countries,
			    Directors = _services.Directors,
			    Attachments = _services.Attachments;


			var genresIds = _.chain(movies).map("genresIds").flatten().compact().value();
			var actorsIds = _.chain(movies).map("actorsIds").flatten().compact().value();
			var countriesIds = _.chain(movies).map("countriesIds").flatten().compact().value();
			var filmDirectorsIds = _.chain(movies).map("filmDirectorsIds").flatten().compact().value();
			var previewsIds = _.chain(movies).map("previewImageId").flatten().compact().value();

			return $q.all({
				genres: Genres.api().getList({ ids: genresIds.join(",") }),
				actors: Actors.api().getList({ ids: actorsIds.join(",") }),
				countries: Countries.api().getList({ ids: countriesIds.join(",") }),
				filmDirectors: Directors.api().getList({ ids: filmDirectorsIds.join(",") }),
				previews: Attachments.api().getList({ ids: previewsIds.join(",") })
			}).then(function (response) {
				_.map(movies, function (movie) {
					movie.genres = _.filter(response.genres, function (item) {
						return movie.genresIds.includes(item.id);
					});
					movie.actors = _.filter(response.actors, function (item) {
						return movie.actorsIds.includes(item.id);
					});
					movie.countries = _.filter(response.countries, function (item) {
						return movie.countriesIds.includes(item.id);
					});
					movie.filmDirectors = _.filter(response.filmDirectors, function (item) {
						return movie.filmDirectorsIds.includes(item.id);
					});
					movie.previewImage = _.chain(response.previews).find({ id: movie.previewImageId }).get("url").value();
				});
				return movies;
			});
		}
	}]);

	return MoviesService;
}();

exports.MoviesService = MoviesService;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function MovieTemplate() {
	var self = this;
	self.movieTemplate = {
		name: "",
		filmDirectors: [],
		genres: [],
		rating: null,
		actors: [],
		previewImage: "",
		description: "",
		year: null,
		countries: [],
		budget: ""
	};

	return {
		getTemplate: function getTemplate() {
			return angular.copy(self.movieTemplate);
		}
	};
}

exports.MovieTemplate = MovieTemplate;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "<div class='alert-container'>\n  <div class='repeat-animation' ng-repeat='alert in alerts' ng-click=\"alert.remove()\">\n    <div class='alert' ng-class='alert.typeOfAlert' ng-bind='alert.msg'></div>\n  </div>\n</div>"

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(6);

var _angular2 = _interopRequireDefault(_angular);

__webpack_require__(14);

__webpack_require__(15);

__webpack_require__(18);

__webpack_require__(20);

__webpack_require__(22);

__webpack_require__(24);

__webpack_require__(42);

__webpack_require__(45);

__webpack_require__(48);

__webpack_require__(51);

__webpack_require__(54);

__webpack_require__(99);

__webpack_require__(106);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = _angular2.default.module("neotek", ["ui.router", "neotek.movies", "neotek.common", "neotek.backend", "neotek.genres", "neotek.actors", "neotek.countries", "neotek.directors", "restangular", "angular-click-outside", "ngFileUpload"]);

App.config(function ($stateProvider, $locationProvider, $urlRouterProvider, flashAlertProvider) {
	$urlRouterProvider.otherwise("/movies/list");
	flashAlertProvider.setAlertTime(2000);
	//$locationProvider.html5Mode(true);
});

App.run(function ($rootScope, $state, $document) {});

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./common.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./common.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "* {\n  font-family: Arial; }\n\nbody {\n  background: #fff;\n  color: #5c5c5c; }\n\ninput[type=\"text\"] {\n  border-radius: 3px;\n  padding: 5px;\n  box-sizing: border-box; }\n  input[type=\"text\"]:focus {\n    outline: none;\n    border: 2px solid #3DAFA1; }\n\n.btn {\n  color: #fff;\n  background: #3DAFA1;\n  border: none;\n  font-size: 18px;\n  padding: 10px;\n  border-radius: 4px;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);\n  cursor: pointer; }\n  .btn:focus {\n    outline: none; }\n  .btn:active {\n    background: #1f9183; }\n", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _moviesService = __webpack_require__(8);

var _movieFactory = __webpack_require__(9);

var _moviesListComponent = __webpack_require__(25);

var _movieListItemComponent = __webpack_require__(29);

var _moviesDetailComponent = __webpack_require__(34);

var _movieEditorComponent = __webpack_require__(38);

angular.module("neotek.movies", []).service("Movies", _moviesService.MoviesService).factory("MovieTemplate", _movieFactory.MovieTemplate).component(_moviesListComponent.MoviesListComponent.selector, _moviesListComponent.MoviesListComponent).component(_movieListItemComponent.MoviesListItemComponent.selector, _movieListItemComponent.MoviesListItemComponent).component(_moviesDetailComponent.MoviesDetailComponent.selector, _moviesDetailComponent.MoviesDetailComponent).component(_movieEditorComponent.MovieEditorComponent.selector, _movieEditorComponent.MovieEditorComponent).config(route);

function route($stateProvider) {

	$stateProvider.state({
		name: 'movies',
		url: '/movies',
		template: "<ui-view></ui-view>",
		onEnter: function onEnter() {}
	});

	$stateProvider.state({
		name: 'movies.list',
		url: '/list',
		template: "<movies-list></movies-list>",
		onEnter: function onEnter() {}
	});

	$stateProvider.state({
		name: 'movies.create',
		url: '/create',
		template: "<movie-editor></movie-editor>",
		onEnter: function onEnter() {}
	});

	$stateProvider.state({
		name: 'movies.edit',
		url: '/list/:id/edit',
		template: "<movie-editor></movie-editor>",
		onEnter: function onEnter() {},
		params: {
			id: null,
			movieData: null
		}
	});

	$stateProvider.state({
		name: 'movies.detail',
		url: '/list/:id',
		template: "<movies-detail></movies-detail>",
		onEnter: function onEnter() {},
		params: {
			id: null,
			movieData: null
		}
	});
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MoviesListComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

__webpack_require__(26);

var _moviesListTemplate = __webpack_require__(28);

var _moviesListTemplate2 = _interopRequireDefault(_moviesListTemplate);

var _decorators = __webpack_require__(0);

var _ic_add_black_24px = __webpack_require__(4);

var _ic_add_black_24px2 = _interopRequireDefault(_ic_add_black_24px);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MoviesListComponent = (_dec = (0, _decorators.Component)({
	selector: "moviesList",
	template: _moviesListTemplate2.default
}), _dec(_class = function () {

	/* @ngInject */
	function MoviesListComponent($state, Movies) {
		_classCallCheck(this, MoviesListComponent);

		this.services = { $state: $state, Movies: Movies };
		this.icons = { addIcon: _ic_add_black_24px2.default };
		this.movies = [];
	}

	_createClass(MoviesListComponent, [{
		key: "$onInit",
		value: function $onInit() {
			var _this = this;

			var Movies = this.services.Movies;


			this.promise = Movies.getMovies().then(function (movies) {
				_this.movies = movies;
				console.log(_this.movies);
			});
		}
	}, {
		key: "openDetail",
		value: function openDetail(movie) {
			var $state = this.services.$state;

			$state.transitionTo("movies.detail", {
				id: movie.id,
				movieData: movie
			});
		}
	}, {
		key: "removeMovie",
		value: function removeMovie(movie, ix) {
			var _this2 = this;

			this.promise = movie.remove().then(function () {
				_this2.movies.splice(ix, 1);
			});
		}
	}]);

	return MoviesListComponent;
}()) || _class);
exports.MoviesListComponent = MoviesListComponent;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "* {\n  font-family: Arial; }\n\nbody {\n  background: #fff;\n  color: #5c5c5c; }\n\ninput[type=\"text\"] {\n  border-radius: 3px;\n  padding: 5px;\n  box-sizing: border-box; }\n  input[type=\"text\"]:focus {\n    outline: none;\n    border: 2px solid #3DAFA1; }\n\n.btn {\n  color: #fff;\n  background: #3DAFA1;\n  border: none;\n  font-size: 18px;\n  padding: 10px;\n  border-radius: 4px;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);\n  cursor: pointer; }\n  .btn:focus {\n    outline: none; }\n  .btn:active {\n    background: #1f9183; }\n\n.movies-list-wrapper h1 {\n  text-align: center; }\n\n.movies-list-wrapper .movies-list {\n  display: flex;\n  flex-wrap: wrap;\n  padding: 16px; }\n  .movies-list-wrapper .movies-list .add-new-button {\n    width: 200px;\n    height: 300px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-direction: column;\n    margin-right: 16px;\n    border: 4px dashed #6a6a6a;\n    box-sizing: border-box;\n    border-radius: 4px;\n    color: #6a6a6a;\n    transition: color .2s, border-color .2s; }\n    .movies-list-wrapper .movies-list .add-new-button:hover {\n      cursor: pointer;\n      color: #3DAFA1;\n      border-color: #3DAFA1; }\n      .movies-list-wrapper .movies-list .add-new-button:hover svg {\n        fill: #3DAFA1; }\n    .movies-list-wrapper .movies-list .add-new-button svg {\n      transition: fill .2s;\n      width: 45px;\n      height: 45px;\n      fill: #6a6a6a; }\n\n.add-new-button {\n  width: 200px;\n  height: 300px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  margin-right: 16px;\n  border: 4px dashed #6a6a6a;\n  box-sizing: border-box;\n  border-radius: 4px;\n  color: #6a6a6a;\n  transition: color .2s, border-color .2s; }\n  .add-new-button:hover {\n    cursor: pointer;\n    color: #3DAFA1;\n    border-color: #3DAFA1; }\n    .add-new-button:hover svg {\n      fill: #3DAFA1; }\n  .add-new-button svg {\n    transition: fill .2s;\n    width: 45px;\n    height: 45px;\n    fill: #6a6a6a; }\n", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = "<div class=\"movies-list-wrapper\">\n\t<ajax-loader promise=\"$ctrl.promise\"></ajax-loader>\n\t<div class=\"movies-list\">\n\t\t<div class=\"add-new-button\" ui-sref=\"movies.create\">\n\t\t\t<svg-icon encoded-str=\"$ctrl.icons.addIcon\"></svg-icon>\n\t\t\t<span>Добавить фильм</span>\n\t\t</div>\n\t\t<movies-list-item movie-data=\"movie\"\n\t\t                  ng-click=\"$ctrl.openDetail(movie)\"\n\t\t                  on-remove=\"$ctrl.removeMovie(movie, $index)\"\n\t\t                  ng-repeat=\"movie in $ctrl.movies\">\n\t\t</movies-list-item>\n\t</div>\n</div>"

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MoviesListItemComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

__webpack_require__(30);

var _movieListItemTemplate = __webpack_require__(32);

var _movieListItemTemplate2 = _interopRequireDefault(_movieListItemTemplate);

var _decorators = __webpack_require__(0);

var _ic_star_white_24px = __webpack_require__(33);

var _ic_star_white_24px2 = _interopRequireDefault(_ic_star_white_24px);

var _ic_black_24px = __webpack_require__(5);

var _ic_black_24px2 = _interopRequireDefault(_ic_black_24px);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MoviesListItemComponent = (_dec = (0, _decorators.Component)({
	selector: "moviesListItem",
	template: _movieListItemTemplate2.default,
	bindings: {
		movieData: "<",
		onRemove: "&"
	}
}), _dec(_class = function () {

	/* @ngInject */
	function MoviesListItemComponent() {
		_classCallCheck(this, MoviesListItemComponent);

		this.icons = { starIcon: _ic_star_white_24px2.default, removeIcon: _ic_black_24px2.default };
	}

	_createClass(MoviesListItemComponent, [{
		key: "removeMovie",
		value: function removeMovie(movie, ev) {
			ev.stopPropagation();
			this.onRemove({ movie: movie });
		}
	}]);

	return MoviesListItemComponent;
}()) || _class);
exports.MoviesListItemComponent = MoviesListItemComponent;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "* {\n  font-family: Arial; }\n\nbody {\n  background: #fff;\n  color: #5c5c5c; }\n\ninput[type=\"text\"] {\n  border-radius: 3px;\n  padding: 5px;\n  box-sizing: border-box; }\n  input[type=\"text\"]:focus {\n    outline: none;\n    border: 2px solid #3DAFA1; }\n\n.btn {\n  color: #fff;\n  background: #3DAFA1;\n  border: none;\n  font-size: 18px;\n  padding: 10px;\n  border-radius: 4px;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);\n  cursor: pointer; }\n  .btn:focus {\n    outline: none; }\n  .btn:active {\n    background: #1f9183; }\n\n.movies-list-item-wrapper {\n  position: relative;\n  background-color: #fff;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);\n  width: 200px;\n  height: 300px;\n  margin-right: 16px;\n  border-radius: 4px;\n  overflow: hidden;\n  transition: transform .3s, box-shadow .3s; }\n  .movies-list-item-wrapper:hover {\n    cursor: pointer;\n    box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.75);\n    transform: scale(1.1); }\n    .movies-list-item-wrapper:hover .delete-button {\n      display: block;\n      opacity: 0.8; }\n      .movies-list-item-wrapper:hover .delete-button:hover {\n        opacity: 1; }\n      .movies-list-item-wrapper:hover .delete-button svg {\n        fill: #ff5248; }\n  .movies-list-item-wrapper .delete-button {\n    position: absolute;\n    top: 5px;\n    left: 5px;\n    display: none; }\n  .movies-list-item-wrapper .movie-preview {\n    width: 100%;\n    height: 300px;\n    object-fit: cover;\n    filter: brightness(0.6);\n    -webkit-filter: brightness(0.8);\n    background: url(" + __webpack_require__(10) + ") center center; }\n  .movies-list-item-wrapper .movie-name {\n    position: absolute;\n    color: #fff;\n    bottom: 10px;\n    width: 100%;\n    text-align: center;\n    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.4); }\n  .movies-list-item-wrapper .movie-rating {\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.4);\n    color: #fff;\n    top: 5px;\n    right: 5px;\n    font-size: 18px;\n    font-weight: bold; }\n    .movies-list-item-wrapper .movie-rating img {\n      margin-right: 3px; }\n", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = "<div class=\"movies-list-item-wrapper\">\n\t<img class=\"movie-preview\" ng-src=\"{{$ctrl.movieData.previewImage}}\">\n\t<h3 class=\"movie-name\">{{$ctrl.movieData.name}}</h3>\n\t<div ng-if=\"$ctrl.movieData.rating\" class=\"movie-rating\">\n\t\t<img ng-src=\"{{$ctrl.icons.starIcon}}\">\n\t\t<span>{{$ctrl.movieData.rating}}</span>\n\t</div>\n\t<svg-icon class=\"delete-button\"\n\t          ng-click=\"$ctrl.removeMovie($ctrl.movieData, $event)\"\n\t          encoded-str=\"$ctrl.icons.removeIcon\"></svg-icon>\n</div>"

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xMiAxNy4yN0wxOC4xOCAyMWwtMS42NC03LjAzTDIyIDkuMjRsLTcuMTktLjYxTDEyIDIgOS4xOSA4LjYzIDIgOS4yNGw1LjQ2IDQuNzNMNS44MiAyMXoiLz4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+"

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MoviesDetailComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

__webpack_require__(35);

var _moviesDetailTemplate = __webpack_require__(37);

var _moviesDetailTemplate2 = _interopRequireDefault(_moviesDetailTemplate);

var _decorators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MoviesDetailComponent = (_dec = (0, _decorators.Component)({
	selector: "moviesDetail",
	template: _moviesDetailTemplate2.default
}), _dec(_class = function () {

	/* @ngInject */
	function MoviesDetailComponent($state, $stateParams, Movies) {
		_classCallCheck(this, MoviesDetailComponent);

		this.services = { $state: $state, $stateParams: $stateParams, Movies: Movies };
		this.movieData = $stateParams.movieData;
	}

	_createClass(MoviesDetailComponent, [{
		key: "$onInit",
		value: function $onInit() {
			if (!this.movieData) {
				this.promise = this.getInitialMovie();
			}
		}
	}, {
		key: "getInitialMovie",
		value: function getInitialMovie() {
			var _this = this;

			var _services = this.services,
			    Movies = _services.Movies,
			    $stateParams = _services.$stateParams;


			return Movies.getOne($stateParams.id).then(function (movie) {
				_this.movieData = movie;
				console.log(_this.movieData);
			});
		}
	}, {
		key: "editMovie",
		value: function editMovie() {
			var $state = this.services.$state;

			$state.transitionTo("movies.edit", {
				id: this.movieData.id,
				movieData: this.movieData
			});
		}
	}]);

	return MoviesDetailComponent;
}()) || _class);
exports.MoviesDetailComponent = MoviesDetailComponent;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "* {\n  font-family: Arial; }\n\nbody {\n  background: #fff;\n  color: #5c5c5c; }\n\ninput[type=\"text\"] {\n  border-radius: 3px;\n  padding: 5px;\n  box-sizing: border-box; }\n  input[type=\"text\"]:focus {\n    outline: none;\n    border: 2px solid #3DAFA1; }\n\n.btn {\n  color: #fff;\n  background: #3DAFA1;\n  border: none;\n  font-size: 18px;\n  padding: 10px;\n  border-radius: 4px;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);\n  cursor: pointer; }\n  .btn:focus {\n    outline: none; }\n  .btn:active {\n    background: #1f9183; }\n\n/*.movies-detail-wrapper{*/\n.info-wrapper {\n  display: flex; }\n  .info-wrapper .movie-preview {\n    width: 300px;\n  min-width: 300px; \n  height: 500px;\n    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);\n    border-radius: 4px;\n    background: url(" + __webpack_require__(10) + ") center center; }\n  .info-wrapper .movie-field {\n    margin-top: 5px; }\n    .info-wrapper .movie-field > span:first-child {\n      font-weight: bold; }\n  .info-wrapper .description {\n    text-align: justify; }\n  .info-wrapper > div {\n    padding-right: 16px; }\n\n/*\n}*/\n", ""]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = "<div class=\"movies-detail-wrapper\">\n\t<ajax-loader promise=\"$ctrl.promise\"></ajax-loader>\n\t<div class=\"info-wrapper\">\n\t\t<div>\n\t\t\t<h2 class=\"movie-title\">{{$ctrl.movieData.name}}</h2>\n\t\t\t<div class=\"movie-field film-directors-list\">\n\t\t\t\t<span>Режиссер:</span>\n\t\t\t\t<span ng-repeat=\"director in $ctrl.movieData.filmDirectors\">\n\t\t\t\t\t\t<span>{{director.name}}</span>\n\t\t\t\t\t<span ng-if=\"!$last\">,</span>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<div class=\"movie-field genres-list\">\n\t\t\t\t<span>Жанр:</span>\n\t\t\t\t<span ng-repeat=\"genre in $ctrl.movieData.genres\">\n\t\t\t\t\t<span>{{genre.name}}</span>\n\t\t\t\t\t<span ng-if=\"!$last\">,</span>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<div class=\"movie-field actors-list\">\n\t\t\t\t<span>В ролях:</span>\n\t\t\t\t<span ng-repeat=\"actor in $ctrl.movieData.actors\">\n\t\t\t\t\t<span>{{actor.name}}</span>\n\t\t\t\t\t<span ng-if=\"!$last\">,</span>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<div class=\"movie-field countries-list\">\n\t\t\t\t<span>Страна:</span>\n\t\t\t\t<span ng-repeat=\"country in $ctrl.movieData.countries\">\n\t\t\t\t\t<span>{{country.name}}</span>\n\t\t\t\t\t<span ng-if=\"!$last\">,</span>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<div class=\"movie-field budget\">\n\t\t\t\t<span>Бюджет:</span>\n\t\t\t\t<span>{{$ctrl.movieData.budget}}</span>\n\t\t\t</div>\n\t\t\t<div class=\"movie-field year\">\n\t\t\t\t<span>Год:</span>\n\t\t\t\t<span>{{$ctrl.movieData.year}}</span>\n\t\t\t</div>\n\t\t\t<div class=\"movie-field description\">{{$ctrl.movieData.description}}</div>\n\t\t</div>\n\t\t<img class=\"movie-preview\" ng-src=\"{{$ctrl.movieData.previewImage}}\">\n\t</div>\n\t<button class=\"btn\" ng-click=\"$ctrl.editMovie()\">Редактировать</button>\n</div>"

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MovieEditorComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

__webpack_require__(39);

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _movieEditorTemplate = __webpack_require__(41);

var _movieEditorTemplate2 = _interopRequireDefault(_movieEditorTemplate);

var _decorators = __webpack_require__(0);

var _ic_add_black_24px = __webpack_require__(4);

var _ic_add_black_24px2 = _interopRequireDefault(_ic_add_black_24px);

var _ic_black_24px = __webpack_require__(5);

var _ic_black_24px2 = _interopRequireDefault(_ic_black_24px);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MovieEditorComponent = (_dec = (0, _decorators.Component)({
	selector: "movieEditor",
	template: _movieEditorTemplate2.default
}), _dec(_class = function () {

	/* @ngInject */
	function MovieEditorComponent($state, $stateParams, $q, Genres, Actors, Directors, Countries, Movies, MovieTemplate, Attachments, flashAlert) {
		_classCallCheck(this, MovieEditorComponent);

		this.services = { $state: $state, $stateParams: $stateParams, $q: $q, Genres: Genres, Actors: Actors, Directors: Directors, Countries: Countries, Movies: Movies, MovieTemplate: MovieTemplate, Attachments: Attachments, flashAlert: flashAlert };
		this.icons = { addIcon: _ic_add_black_24px2.default, removeIcon: _ic_black_24px2.default };
		this.movieData = $stateParams.movieData || MovieTemplate.getTemplate();
		this.editMode = !!$stateParams.id;

		this.appSelectOptions = {
			multiple: true,
			enableSearch: true,
			enableAll: false,
			getLabel: function getLabel(item) {
				return item.name;
			}
		};
	}

	_createClass(MovieEditorComponent, [{
		key: "$onInit",
		value: function $onInit() {
			var _this = this;

			var _services = this.services,
			    $q = _services.$q,
			    Genres = _services.Genres,
			    Actors = _services.Actors,
			    Directors = _services.Directors,
			    Countries = _services.Countries;


			this.promise = $q.all({
				genres: Genres.api().getList(),
				actors: Actors.api().getList(),
				filmDirectors: Directors.api().getList(),
				countries: Countries.api().getList(),
				movieData: this.editMode ? this.getInitialMovie() : null
			}).then(function (response) {
				_this.genres = response.genres;
				_this.actors = response.actors;
				_this.filmDirectors = response.filmDirectors;
				_this.countries = response.countries;
			});
		}
	}, {
		key: "addMovie",
		value: function addMovie() {
			var _services2 = this.services,
			    $state = _services2.$state,
			    Movies = _services2.Movies;

			Movies.api().post(this.movieData).then(function (movie) {
				$state.transitionTo("movies.list");
			});
		}
	}, {
		key: "getInitialMovie",
		value: function getInitialMovie() {
			var _this2 = this;

			var _services3 = this.services,
			    Movies = _services3.Movies,
			    $stateParams = _services3.$stateParams;


			return Movies.getOne($stateParams.id).then(function (movie) {
				_this2.movieData = movie;
			});
		}
	}, {
		key: "onModelChange",
		value: function onModelChange(model, fieldName) {
			this.movieData[fieldName] = _lodash2.default.map(model, "id");
		}
	}, {
		key: "updateMovie",
		value: function updateMovie() {
			var flashAlert = this.services.flashAlert;

			this.promise = this.movieData.put().then(function () {
				flashAlert.success("Даные обновлены");
			});
		}
	}, {
		key: "uploadFile",
		value: function uploadFile(file) {
			var _this3 = this;

			var Attachments = this.services.Attachments;

			this.promise = Attachments.upload(file).then(function (attachment) {
				_this3.movieData.previewImage = attachment.url;
				_this3.movieData.previewImageId = attachment.id;
			});
		}
	}, {
		key: "removePreview",
		value: function removePreview() {
			this.movieData.previewImage = null;
			this.movieData.previewImageId = null;
		}
	}]);

	return MovieEditorComponent;
}()) || _class);
exports.MovieEditorComponent = MovieEditorComponent;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(40);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "* {\n  font-family: Arial; }\n\nbody {\n  background: #fff;\n  color: #5c5c5c; }\n\ninput[type=\"text\"] {\n  border-radius: 3px;\n  padding: 5px;\n  box-sizing: border-box; }\n  input[type=\"text\"]:focus {\n    outline: none;\n    border: 2px solid #3DAFA1; }\n\n.btn {\n  color: #fff;\n  background: #3DAFA1;\n  border: none;\n  font-size: 18px;\n  padding: 10px;\n  border-radius: 4px;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);\n  cursor: pointer; }\n  .btn:focus {\n    outline: none; }\n  .btn:active {\n    background: #1f9183; }\n\n.movie-create-wrapper .movie-detail-data {\n  min-width: 500px; }\n  .movie-create-wrapper .movie-detail-data input, .movie-create-wrapper .movie-detail-data textarea {\n    width: 100%; }\n  .movie-create-wrapper .movie-detail-data .movie-field {\n    display: flex;\n    align-items: flex-start; }\n    .movie-create-wrapper .movie-detail-data .movie-field > span:first-child {\n      margin-top: 5px;\n      margin-right: 5px;\n      width: 100px; }\n    .movie-create-wrapper .movie-detail-data .movie-field app-select {\n      width: 100%; }\n\n.movie-create-wrapper .movie-preview-wrapper {\n  position: relative;\n  display: flex;\n  flex-direction: column; }\n  .movie-create-wrapper .movie-preview-wrapper .upload-image {\n    box-shadow: none;\n    background: none !important; }\n  .movie-create-wrapper .movie-preview-wrapper .remove-preview {\n    position: absolute;\n    top: 5px;\n    right: 25px; }\n    .movie-create-wrapper .movie-preview-wrapper .remove-preview svg {\n      fill: #fff; }\n", ""]);

// exports


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = "<div class=\"movie-create-wrapper\">\n\t<ajax-loader promise=\"$ctrl.promise\"></ajax-loader>\n\t<h3 ng-if=\"!$ctrl.editMode\">Добавление фильма</h3>\n\t<h3 ng-if=\"$ctrl.editMode\">Редактирование фильма</h3>\n\t<div class=\"info-wrapper\">\n\t\t<div class=\"movie-detail-data\">\n\n\t\t\t<!--<h2 class=\"movie-title\">{{$ctrl.movieData.name}}</h2>-->\n\t\t\t<div class=\"movie-field film-name\">\n\t\t\t\t<span>Название:</span>\n\t\t\t\t<input type=\"text\" ng-model=\"$ctrl.movieData.name\" placeholder=\"Название\">\n\t\t\t</div>\n\n\t\t\t<div class=\"movie-field\">\n\t\t\t\t<span>Режиссер:</span>\n\t\t\t\t<app-select ng-if=\"$ctrl.filmDirectors.length\"\n\t\t\t\t\t\t\tng-model=\"$ctrl.movieData.filmDirectors\"\n\t\t\t\t            options-list=\"$ctrl.filmDirectors\"\n\t\t\t\t            on-change=\"$ctrl.onModelChange(model, 'filmDirectorsIds')\"\n\t\t\t\t            options=\"$ctrl.appSelectOptions\">\n\t\t\t\t</app-select>\n\t\t\t</div>\n\t\t\t<div class=\"movie-field\">\n\t\t\t\t<span>Жанр:</span>\n\t\t\t\t<app-select ng-if=\"$ctrl.genres.length\"\n\t\t\t\t\t\t\tng-model=\"$ctrl.movieData.genres\"\n\t\t\t\t            options-list=\"$ctrl.genres\"\n\t\t\t\t            on-change=\"$ctrl.onModelChange(model, 'genresIds')\"\n\t\t\t\t            options=\"$ctrl.appSelectOptions\">\n\t\t\t\t</app-select>\n\t\t\t</div>\n\t\t\t<div class=\"movie-field\">\n\t\t\t\t<span>В ролях:</span>\n\t\t\t\t<app-select ng-if=\"$ctrl.actors.length\"\n\t\t\t\t\t\t\tng-model=\"$ctrl.movieData.actors\"\n\t\t\t\t            options-list=\"$ctrl.actors\"\n\t\t\t\t            on-change=\"$ctrl.onModelChange(model, 'actorsIds')\"\n\t\t\t\t            options=\"$ctrl.appSelectOptions\">\n\t\t\t\t</app-select>\n\t\t\t</div>\n\t\t\t<div class=\"movie-field\">\n\t\t\t\t<span>Страна:</span>\n\t\t\t\t<app-select ng-if=\"$ctrl.countries.length\"\n\t\t\t\t\t\t\tng-model=\"$ctrl.movieData.countries\"\n\t\t\t\t            options-list=\"$ctrl.countries\"\n\t\t\t\t            on-change=\"$ctrl.onModelChange(model, 'countriesIds')\"\n\t\t\t\t            options=\"$ctrl.appSelectOptions\">\n\t\t\t\t</app-select>\n\t\t\t</div>\n\t\t\t<div class=\"movie-field budget\">\n\t\t\t\t<span>Бюджет:</span>\n\t\t\t\t<input type=\"text\" ng-model=\"$ctrl.movieData.budget\">\n\t\t\t</div>\n\t\t\t<div class=\"movie-field year\">\n\t\t\t\t<span>Год:</span>\n\t\t\t\t<input type=\"text\" ng-model=\"$ctrl.movieData.year\">\n\t\t\t</div>\n\t\t\t<div class=\"movie-field rating\">\n\t\t\t\t<span>Рейтинг:</span>\n\t\t\t\t<input type=\"text\" ng-model=\"$ctrl.movieData.rating\">\n\t\t\t</div>\n\t\t\t<div class=\"movie-field description\">\n\t\t\t\t<span>Описание:</span>\n\t\t\t\t<textarea rows=\"4\" type=\"text\" ng-model=\"$ctrl.movieData.description\"></textarea>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"movie-preview-wrapper\">\n\t\t\t<img ng-if=\"$ctrl.movieData.previewImage\" class=\"movie-preview\" ng-src=\"{{$ctrl.movieData.previewImage}}\">\n\t\t\t<div ng-if=\"!$ctrl.movieData.previewImage\" ngf-select=\"$ctrl.uploadFile($file)\" class=\"movie-preview add-new-button upload-image\">\n\t\t\t\t<svg-icon encoded-str=\"$ctrl.icons.addIcon\"></svg-icon>\n\t\t\t\t<span>Добавить постер</span>\n\t\t\t</div>\n\t\t\t<svg-icon ng-if=\"$ctrl.editMode\" ng-click=\"$ctrl.removePreview()\" class=\"remove-preview\" encoded-str=\"$ctrl.icons.removeIcon\"></svg-icon>\n\t\t\t<button ng-if=\"$ctrl.editMode && $ctrl.movieData.previewImage\" class=\"btn\" ngf-select=\"$ctrl.uploadFile($file)\">Изменить постер</button>\n\t\t</div>\n\n\t</div>\n\t<button ng-if=\"!$ctrl.editMode\" class=\"btn\" ng-click=\"$ctrl.addMovie()\">Добавить</button>\n\t<button ng-if=\"$ctrl.editMode\" class=\"btn\" ng-click=\"$ctrl.updateMovie()\">Сохранить</button>\n</div>"

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _genresListComponent = __webpack_require__(43);

angular.module("neotek.genres", []).component(_genresListComponent.GenresListComponent.selector, _genresListComponent.GenresListComponent).config(route);

function route($stateProvider) {

	$stateProvider.state({
		name: 'genres',
		url: '/genres',
		template: "<ui-view></ui-view>",
		onEnter: function onEnter() {}
	});

	$stateProvider.state({
		name: 'genres.list',
		url: '/list',
		template: "<genres-list></genres-list>",
		onEnter: function onEnter() {}
	});
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GenresListComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _genresListTemplate = __webpack_require__(44);

var _genresListTemplate2 = _interopRequireDefault(_genresListTemplate);

var _decorators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenresListComponent = (_dec = (0, _decorators.Component)({
	selector: "genresList",
	template: _genresListTemplate2.default
}), _dec(_class = function () {

	/* @ngInject */
	function GenresListComponent($state, Genres) {
		_classCallCheck(this, GenresListComponent);

		this.services = { $state: $state, Genres: Genres };
		this.genres = [];
		this.editableListOptions = {
			modelName: "name",
			placeholder: "Название жанра",
			getLabel: function getLabel(item) {
				return item.name;
			}
		};
	}

	_createClass(GenresListComponent, [{
		key: "$onInit",
		value: function $onInit() {
			this.getGenresList();
		}
	}, {
		key: "getGenresList",
		value: function getGenresList() {
			var _this = this;

			var Genres = this.services.Genres;

			this.promise = Genres.api().getList().then(function (genres) {
				_this.genres = genres;
			});
		}
	}, {
		key: "addNew",
		value: function addNew() {
			var _this2 = this;

			var Genres = this.services.Genres;

			this.promise = Genres.api().post({}).then(function (genre) {
				_this2.genres.push(genre);
			});
		}
	}, {
		key: "updateGenre",
		value: function updateGenre(genre) {
			this.promise = genre.put().then();
		}
	}, {
		key: "removeGenre",
		value: function removeGenre(data) {
			var _this3 = this;

			this.promise = data.item.remove().then(function () {
				_this3.genres.splice(data.ix, 1);
			});
		}
	}]);

	return GenresListComponent;
}()) || _class);
exports.GenresListComponent = GenresListComponent;

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = "<div class=\"genres-list-wrapper\">\n\t<ajax-loader promise=\"$ctrl.promise\"></ajax-loader>\n\t<h3>Жанры</h3>\n\t<editable-list list-data=\"$ctrl.genres\"\n\t               on-create=\"$ctrl.addNew()\"\n\t               on-change=\"$ctrl.updateGenre(item)\"\n\t               on-remove=\"$ctrl.removeGenre(item)\"\n\t               options=\"$ctrl.editableListOptions\"></editable-list>\n</div>"

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _actorsListComponent = __webpack_require__(46);

angular.module("neotek.actors", []).component(_actorsListComponent.ActorsListComponent.selector, _actorsListComponent.ActorsListComponent).config(route);

function route($stateProvider) {

	$stateProvider.state({
		name: 'actors',
		url: '/actors',
		template: "<ui-view></ui-view>",
		onEnter: function onEnter() {}
	});

	$stateProvider.state({
		name: 'actors.list',
		url: '/list',
		template: "<actors-list></actors-list>",
		onEnter: function onEnter() {}
	});
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ActorsListComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _actorsListTemplate = __webpack_require__(47);

var _actorsListTemplate2 = _interopRequireDefault(_actorsListTemplate);

var _decorators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActorsListComponent = (_dec = (0, _decorators.Component)({
	selector: "actorsList",
	template: _actorsListTemplate2.default
}), _dec(_class = function () {

	/* @ngInject */
	function ActorsListComponent($state, Actors) {
		_classCallCheck(this, ActorsListComponent);

		this.services = { $state: $state, Actors: Actors };
		this.actors = [];
		this.editableListOptions = {
			modelName: "name",
			placeholder: "Имя актера",
			getLabel: function getLabel(item) {
				return item.name;
			}
		};
	}

	_createClass(ActorsListComponent, [{
		key: "$onInit",
		value: function $onInit() {
			this.getActorsList();
		}
	}, {
		key: "getActorsList",
		value: function getActorsList() {
			var _this = this;

			var Actors = this.services.Actors;

			this.promise = Actors.api().getList().then(function (actors) {
				_this.actors = actors;
			});
		}
	}, {
		key: "addNew",
		value: function addNew() {
			var _this2 = this;

			var Actors = this.services.Actors;

			this.promise = Actors.api().post({}).then(function (actor) {
				_this2.actors.push(actor);
			});
		}
	}, {
		key: "updateActor",
		value: function updateActor(actor) {
			this.promise = actor.put().then();
		}
	}, {
		key: "removeActor",
		value: function removeActor(data) {
			var _this3 = this;

			this.promise = data.item.remove().then(function () {
				_this3.actors.splice(data.ix, 1);
			});
		}
	}]);

	return ActorsListComponent;
}()) || _class);
exports.ActorsListComponent = ActorsListComponent;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = "<div class=\"genres-list-wrapper\">\n\t<ajax-loader promise=\"$ctrl.promise\"></ajax-loader>\n\t<h3>Актеры</h3>\n\t<editable-list list-data=\"$ctrl.actors\"\n\t               on-create=\"$ctrl.addNew()\"\n\t               on-change=\"$ctrl.updateActor(item)\"\n\t               on-remove=\"$ctrl.removeActor(item)\"\n\t               options=\"$ctrl.editableListOptions\"></editable-list>\n</div>"

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _countriesListComponent = __webpack_require__(49);

angular.module("neotek.countries", []).component(_countriesListComponent.CountriesListComponent.selector, _countriesListComponent.CountriesListComponent).config(route);

function route($stateProvider) {

	$stateProvider.state({
		name: 'countries',
		url: '/countries',
		template: "<ui-view></ui-view>",
		onEnter: function onEnter() {}
	});

	$stateProvider.state({
		name: 'countries.list',
		url: '/list',
		template: "<countries-list></countries-list>",
		onEnter: function onEnter() {}
	});
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CountriesListComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _countriesListTemplate = __webpack_require__(50);

var _countriesListTemplate2 = _interopRequireDefault(_countriesListTemplate);

var _decorators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CountriesListComponent = (_dec = (0, _decorators.Component)({
	selector: "countriesList",
	template: _countriesListTemplate2.default
}), _dec(_class = function () {

	/* @ngInject */
	function CountriesListComponent($state, Countries) {
		_classCallCheck(this, CountriesListComponent);

		this.services = { $state: $state, Countries: Countries };
		this.countries = [];
		this.editableListOptions = {
			modelName: "name",
			placeholder: "Название страны",
			getLabel: function getLabel(item) {
				return item.name;
			}
		};
	}

	_createClass(CountriesListComponent, [{
		key: "$onInit",
		value: function $onInit() {
			this.getCountryList();
		}
	}, {
		key: "getCountryList",
		value: function getCountryList() {
			var _this = this;

			var Countries = this.services.Countries;

			this.promise = Countries.api().getList().then(function (countries) {
				_this.countries = countries;
			});
		}
	}, {
		key: "addNew",
		value: function addNew() {
			var _this2 = this;

			var Countries = this.services.Countries;

			this.promise = Countries.api().post({}).then(function (actor) {
				_this2.countries.push(actor);
			});
		}
	}, {
		key: "updateCountry",
		value: function updateCountry(actor) {
			this.promise = actor.put().then();
		}
	}, {
		key: "removeCountry",
		value: function removeCountry(data) {
			var _this3 = this;

			this.promise = data.item.remove().then(function () {
				_this3.countries.splice(data.ix, 1);
			});
		}
	}]);

	return CountriesListComponent;
}()) || _class);
exports.CountriesListComponent = CountriesListComponent;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = "<div class=\"countries-list-wrapper\">\n\t<ajax-loader promise=\"$ctrl.promise\"></ajax-loader>\n\t<h3>Страны</h3>\n\t<editable-list list-data=\"$ctrl.countries\"\n\t               on-create=\"$ctrl.addNew()\"\n\t               on-change=\"$ctrl.updateCountry(item)\"\n\t               on-remove=\"$ctrl.removeCountry(item)\"\n\t               options=\"$ctrl.editableListOptions\"></editable-list>\n</div>"

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _directorsListComponent = __webpack_require__(52);

angular.module("neotek.directors", []).component(_directorsListComponent.DirectorsListComponent.selector, _directorsListComponent.DirectorsListComponent).config(route);

function route($stateProvider) {

	$stateProvider.state({
		name: 'directors',
		url: '/directors',
		template: "<ui-view></ui-view>",
		onEnter: function onEnter() {}
	});

	$stateProvider.state({
		name: 'directors.list',
		url: '/list',
		template: "<directors-list></directors-list>",
		onEnter: function onEnter() {}
	});
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DirectorsListComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; /*import "./styles.scss";*/


var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _directorsListTemplate = __webpack_require__(53);

var _directorsListTemplate2 = _interopRequireDefault(_directorsListTemplate);

var _decorators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DirectorsListComponent = (_dec = (0, _decorators.Component)({
	selector: "directorsList",
	template: _directorsListTemplate2.default
}), _dec(_class = function () {

	/* @ngInject */
	function DirectorsListComponent($state, Directors) {
		_classCallCheck(this, DirectorsListComponent);

		this.services = { $state: $state, Directors: Directors };
		this.directors = [];
		this.editableListOptions = {
			modelName: "name",
			placeholder: "Имя режиссера",
			getLabel: function getLabel(item) {
				return item.name;
			}
		};
	}

	_createClass(DirectorsListComponent, [{
		key: "$onInit",
		value: function $onInit() {
			this.getDirectorsList();
		}
	}, {
		key: "getDirectorsList",
		value: function getDirectorsList() {
			var _this = this;

			var Directors = this.services.Directors;

			this.promise = Directors.api().getList().then(function (directors) {
				_this.directors = directors;
			});
		}
	}, {
		key: "addNew",
		value: function addNew() {
			var _this2 = this;

			var Directors = this.services.Directors;

			this.promise = Directors.api().post({}).then(function (genre) {
				_this2.directors.push(genre);
			});
		}
	}, {
		key: "updateDirector",
		value: function updateDirector(genre) {
			this.promise = genre.put().then();
		}
	}, {
		key: "removeDirector",
		value: function removeDirector(data) {
			var _this3 = this;

			this.promise = data.item.remove().then(function () {
				_this3.directors.splice(data.ix, 1);
			});
		}
	}]);

	return DirectorsListComponent;
}()) || _class);
exports.DirectorsListComponent = DirectorsListComponent;

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = "<div class=\"genres-list-wrapper\">\n\t<ajax-loader promise=\"$ctrl.promise\"></ajax-loader>\n\t<h3>Режиссеры</h3>\n\t<editable-list list-data=\"$ctrl.directors\"\n\t               on-create=\"$ctrl.addNew()\"\n\t               on-change=\"$ctrl.updateDirector(item)\"\n\t               on-remove=\"$ctrl.removeDirector(item)\"\n\t               options=\"$ctrl.editableListOptions\"></editable-list>\n</div>"

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _svgIconComponent = __webpack_require__(55);

var _appHeaderComponent = __webpack_require__(59);

var _appFooterComponent = __webpack_require__(63);

var _appMainLayoutComponent = __webpack_require__(67);

var _appArrayEditorComponents = __webpack_require__(71);

var _appSelectComponent = __webpack_require__(75);

var _appCheckboxComponent = __webpack_require__(79);

var _editableListComponent = __webpack_require__(83);

var _appNavbarComponent = __webpack_require__(87);

var _ajaxLoaderComponent = __webpack_require__(91);

var _filters = __webpack_require__(95);

angular.module("neotek.common", []).filter("highlight", _filters.HighlightFilter).component(_svgIconComponent.SvgIconComponent.selector, _svgIconComponent.SvgIconComponent).component(_appHeaderComponent.AppHeaderComponent.selector, _appHeaderComponent.AppHeaderComponent).component(_appFooterComponent.AppFooterComponent.selector, _appFooterComponent.AppFooterComponent).component(_appMainLayoutComponent.AppMainLayoutComponent.selector, _appMainLayoutComponent.AppMainLayoutComponent).component(_appArrayEditorComponents.AppEditorComponent.selector, _appArrayEditorComponents.AppEditorComponent).component(_appSelectComponent.AppSelectComponent.selector, _appSelectComponent.AppSelectComponent).component(_appCheckboxComponent.AppCheckboxComponent.selector, _appCheckboxComponent.AppCheckboxComponent).component(_editableListComponent.EditableListComponent.selector, _editableListComponent.EditableListComponent).component(_appNavbarComponent.AppNavbarComponent.selector, _appNavbarComponent.AppNavbarComponent).component(_ajaxLoaderComponent.AjaxLoaderComponent.selector, _ajaxLoaderComponent.AjaxLoaderComponent);

__webpack_require__(96);

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SvgIconComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

__webpack_require__(56);

var _svgIconTemplate = __webpack_require__(58);

var _svgIconTemplate2 = _interopRequireDefault(_svgIconTemplate);

var _decorators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SvgIconComponent = (_dec = (0, _decorators.Component)({
	selector: "svgIcon",
	bindings: {
		encodedStr: "<"
	},
	template: _svgIconTemplate2.default
}), _dec(_class = function () {
	/* @ngInject */
	function SvgIconComponent($sce) {
		_classCallCheck(this, SvgIconComponent);

		this.services = { $sce: $sce };
	}

	_createClass(SvgIconComponent, [{
		key: "$onInit",
		value: function $onInit() {
			this.data = this.getSvg(this.encodedStr);
		}
	}, {
		key: "getSvg",
		value: function getSvg(encoded) {
			var $sce = this.services.$sce;

			if (/base64/i.test(encoded)) {
				return $sce.trustAsHtml(atob(encoded.replace("data:image/svg+xml;base64,", "")));
			}
			console.warn("urs-svg: Invalid svg data");
			return "Invalid Data";
		}
	}]);

	return SvgIconComponent;
}()) || _class);
exports.SvgIconComponent = SvgIconComponent;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(57);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".svg-icon-wrapper {\n  display: inline-block; }\n", ""]);

// exports


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = "<div class=\"svg-icon-wrapper\" ng-bind-html=\"$ctrl.data\">\n\n</div>"

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AppHeaderComponent = undefined;

var _dec, _class;

__webpack_require__(60);

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _appHeaderTemplate = __webpack_require__(62);

var _appHeaderTemplate2 = _interopRequireDefault(_appHeaderTemplate);

var _decorators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppHeaderComponent = (_dec = (0, _decorators.Component)({
	selector: "appHeader",
	template: _appHeaderTemplate2.default
}), _dec(_class =

/* @ngInject */
function AppHeaderComponent(Movies) {
	_classCallCheck(this, AppHeaderComponent);

	this.services = { Movies: Movies };
}) || _class);
exports.AppHeaderComponent = AppHeaderComponent;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(61);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "* {\n  font-family: Arial; }\n\nbody {\n  background: #fff;\n  color: #5c5c5c; }\n\ninput[type=\"text\"] {\n  border-radius: 3px;\n  padding: 5px;\n  box-sizing: border-box; }\n  input[type=\"text\"]:focus {\n    outline: none;\n    border: 2px solid #3DAFA1; }\n\n.btn {\n  color: #fff;\n  background: #3DAFA1;\n  border: none;\n  font-size: 18px;\n  padding: 10px;\n  border-radius: 4px;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);\n  cursor: pointer; }\n  .btn:focus {\n    outline: none; }\n  .btn:active {\n    background: #1f9183; }\n\n.app-header-wrapper {\n  display: flex;\n  justify-content: space-between;\n  background: #43C6AC;\n  /* fallback for old browsers */\n  background: -webkit-linear-gradient(to right, #191654, #43C6AC);\n  /* Chrome 10-25, Safari 5.1-6 */\n  background: linear-gradient(to right, #191654, #43C6AC);\n  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\n  color: #fff;\n  padding: 15px;\n  font-size: 18px;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75); }\n", ""]);

// exports


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-header-wrapper\">\n\t<span>Angular.js каталог фильмов</span>\n\t<app-navbar></app-navbar>\n</div>"

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AppFooterComponent = undefined;

var _dec, _class;

__webpack_require__(64);

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _appFooterTemplate = __webpack_require__(66);

var _appFooterTemplate2 = _interopRequireDefault(_appFooterTemplate);

var _decorators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppFooterComponent = (_dec = (0, _decorators.Component)({
	selector: "appFooter",
	template: _appFooterTemplate2.default
}), _dec(_class =

/* @ngInject */
function AppFooterComponent(Movies) {
	_classCallCheck(this, AppFooterComponent);

	this.services = { Movies: Movies };
}) || _class);
exports.AppFooterComponent = AppFooterComponent;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".app-footer-wrapper {\n  background: #525151;\n  color: #3d3c3c;\n  text-align: center;\n  height: 50px;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n", ""]);

// exports


/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-footer-wrapper\">\n\tSergey Gordeev 2017\n</div>"

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AppMainLayoutComponent = undefined;

var _dec, _class;

__webpack_require__(68);

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _appMainLayoutTemplate = __webpack_require__(70);

var _appMainLayoutTemplate2 = _interopRequireDefault(_appMainLayoutTemplate);

var _decorators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppMainLayoutComponent = (_dec = (0, _decorators.Component)({
	selector: "appMainLayout",
	template: _appMainLayoutTemplate2.default,
	transclude: true
}), _dec(_class =

/* @ngInject */
function AppMainLayoutComponent(Movies) {
	_classCallCheck(this, AppMainLayoutComponent);

	this.services = { Movies: Movies };
}) || _class);
exports.AppMainLayoutComponent = AppMainLayoutComponent;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(69);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".app-main-layout-wrapper {\n  height: calc(100vh - 100px);\n  overflow: auto;\n  padding-top: 16px;\n  box-sizing: border-box; }\n  .app-main-layout-wrapper .content {\n    transition: width .5s;\n    width: 1024px;\n    margin: 0 auto; }\n\n@media (min-width: 1400px) {\n  .app-main-layout-wrapper .content {\n    width: 1280px; } }\n", ""]);

// exports


/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-main-layout-wrapper\">\n\t<div class=\"content\" ng-transclude>\n\n\t</div>\n</div>"

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AppEditorComponent = undefined;

var _dec, _class;

__webpack_require__(72);

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _appArrayEditorTemplate = __webpack_require__(74);

var _appArrayEditorTemplate2 = _interopRequireDefault(_appArrayEditorTemplate);

var _decorators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppEditorComponent = (_dec = (0, _decorators.Component)({
	selector: "appArrayEditor",
	template: _appArrayEditorTemplate2.default,
	bindings: {}
}), _dec(_class =

/* @ngInject */
function AppEditorComponent() {
	_classCallCheck(this, AppEditorComponent);
}) || _class);
exports.AppEditorComponent = AppEditorComponent;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(73);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-array-editor-wrapper\">\n\n</div>"

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AppSelectComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

__webpack_require__(76);

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _appSelectTemplate = __webpack_require__(78);

var _appSelectTemplate2 = _interopRequireDefault(_appSelectTemplate);

var _decorators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppSelectComponent = (_dec = (0, _decorators.Component)({
	selector: "appSelect",
	bindings: {
		options: "<",
		ngModel: "<",
		ngDisabled: "<?",
		ngRequired: "<?",

		placeholder: "@",

		/* spec options*/
		optionsList: "<?",
		getLabel: "<?",
		enableAll: "<?",
		enableSearch: "<?",

		//callback
		onChange: "&"
	},
	template: _appSelectTemplate2.default
}), _dec(_class = function () {
	/**
  * @ngInject
  */
	function AppSelectComponent($scope, $timeout, $window, $element) {
		_classCallCheck(this, AppSelectComponent);

		this.services = { $scope: $scope, $timeout: $timeout, $window: $window, $element: $element };

		this.showList = false;
		this.searchString = null;
		this.optionsCollection = [];
		this.selectedCount = 0;

		this.defaultOptions = {
			getLabel: this.getLabel || function (optionData) {
				return String(optionData);
			},
			enableAll: this.enableAll || false,
			enableSearch: this.enableSearch || false,
			multiple: false,
			placeholder: this.placeholder || null
		};
	}

	_createClass(AppSelectComponent, [{
		key: "$onInit",
		value: function $onInit() {
			var _this = this;

			var _services = this.services,
			    $scope = _services.$scope,
			    $window = _services.$window;

			this.$$options = _lodash2.default.assign({}, this.defaultOptions, this.options || {});
			this.getOptionsCollection();
			this.$$searchedStringFilter = this.$$options.enableSearch ? this.searchedStringFilter.bind(this) : function () {
				return true;
			};
			if (!this.ngModel) {
				this.ngModel = this.$$options.multiple ? [] : null;
			}

			if (this.$$options.multiple) {
				this.$$selectOption = this.toggleOptionSelection.bind(this);
				this.$$synchronizeOptions = this.synchronizeMultipleOptions.bind(this);
			} else {
				this.$$selectOption = this.selectOption.bind(this);
				this.$$synchronizeOptions = this.synchronizeNotMultipleOptions.bind(this);
			}

			this.$$checkPosition = this.checkPosition.bind(this);

			this.resizeListener = angular.element($window).on("resize", this.$$checkPosition);
			this.scrollListener = angular.element($window).on("scroll", this.$$checkPosition);

			$scope.$watch(function () {
				return _this.ngModel;
			}, function (nV) {
				_this.$$synchronizeOptions(nV);
			}, true);
		}
	}, {
		key: "$onChanges",
		value: function $onChanges(changes) {
			if (changes.optionsList && !changes.optionsList.isFirstChange()) {
				this.synchronizeOptionsList(changes.optionsList.currentValue);
			}

			if (changes.ngModel) {
				this.$checkIsAllSelected();
			}
		}
	}, {
		key: "$onDestroy",
		value: function $onDestroy() {
			this.resizeListener.unbind("resize", this.$$checkPosition);
			this.scrollListener.unbind("scroll", this.$$checkPosition);
		}
	}, {
		key: "$checkIsAllSelected",
		value: function $checkIsAllSelected() {
			if (!this.multiple) {
				return;
			}
			this.isSelectedAll = this.ngModel.length > 0 && this.ngModel.length === this.optionsCollection.length;
		}
	}, {
		key: "checkPosition",
		value: function checkPosition() {
			var _this2 = this;

			if (this.showList) {
				var _services2 = this.services,
				    $window = _services2.$window,
				    $element = _services2.$element,
				    $timeout = _services2.$timeout;

				var dropdownElem = $element[0].querySelector(".select-dropdown");

				$timeout(function () {
					var dropdownElemHeight = parseInt(getComputedStyle(dropdownElem).height, 10);

					if ($window.innerHeight < $element[0].getBoundingClientRect().top + dropdownElemHeight * 1.5) {
						_this2.$$options.overVerticalLimit = true;
					} else {
						_this2.$$options.overVerticalLimit = false;
					}
				});
			}
		}

		/**
   * Проверка одинаковости элементов
   *
   * @param items
   * @returns {boolean}
   */

	}, {
		key: "$isEqualItems",
		value: function $isEqualItems() {
			var _this3 = this;

			for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
				items[_key] = arguments[_key];
			}

			var itemsKeys = _lodash2.default.chain(items).map(function (item) {
				if (_this3.$$options.getKey) {
					return _this3.$$options.getKey(item);
				}

				return _this3.$$options.getLabel(item);
			}).uniq().compact().value();

			return itemsKeys.length === 1;
		}

		/* SIDE EFFECTS REACTION FUNCTIONS */

	}, {
		key: "synchronizeOptionsList",
		value: function synchronizeOptionsList(nV) {
			var _this4 = this;

			var newOptionsCollection = [];

			_lodash2.default.forEach(nV, function (item) {
				var existedOption = _lodash2.default.find(_this4.optionsCollection, function (option) {
					return _this4.$isEqualItems(option.data, item);
				});
				if (existedOption) {
					newOptionsCollection.push(existedOption);
				} else {
					newOptionsCollection.push({
						data: item,
						selected: false
					});
				}
			});

			this.optionsCollection = newOptionsCollection;

			if (this.$$options.multiple) {
				this.updateMultipleNgModel();
			} else {
				this.updateNotMultipleSelectedValue();
				this.updateNotMultipleNgModel();
			}
		}
	}, {
		key: "updateMultipleNgModel",
		value: function updateMultipleNgModel() {
			var selectedOptions = _lodash2.default.filter(this.optionsCollection, { selected: true });
			this.onChange({ model: _lodash2.default.map(selectedOptions, "data") });
		}
	}, {
		key: "updateNotMultipleNgModel",
		value: function updateNotMultipleNgModel() {
			var selectedOption = _lodash2.default.find(this.optionsCollection, { selected: true });
			this.onChange({ model: _lodash2.default.get(selectedOption, "data", null) });
		}
	}, {
		key: "updateNotMultipleSelectedValue",
		value: function updateNotMultipleSelectedValue() {
			var selectedOption = _lodash2.default.find(this.optionsCollection, { selected: true });
			this.searchString = selectedOption ? this.$$options.getLabel(selectedOption.data) : null;
		}
	}, {
		key: "synchronizeMultipleOptions",
		value: function synchronizeMultipleOptions(ngModel) {
			var _this5 = this;

			_lodash2.default.forEach(this.optionsCollection, function (option) {
				var exists = _lodash2.default.find(ngModel, function (value) {
					return _this5.$isEqualItems(option.data, value);
				});
				option.selected = Boolean(exists);
			});
		}
	}, {
		key: "synchronizeNotMultipleOptions",
		value: function synchronizeNotMultipleOptions(nV) {
			var _this6 = this;

			_lodash2.default.forEach(this.optionsCollection, function (option) {
				option.selected = _this6.$isEqualItems(option.data, nV);
			});

			this.updateNotMultipleSelectedValue();
		}

		/* /SIDE EFFECTS REACTION FUNCTIONS */

	}, {
		key: "searchedStringFilter",
		value: function searchedStringFilter(option) {
			return this.searchString ? _lodash2.default.includes(this.$$options.getLabel(option.data), this.searchString) : true;
		}
	}, {
		key: "toggleShowMode",
		value: function toggleShowMode() {
			this.showList = !this.showList;
			this.$$checkPosition();
		}
	}, {
		key: "getOptionsCollection",
		value: function getOptionsCollection() {
			var _this7 = this;

			_lodash2.default.forEach(this.optionsList, function (optionData) {
				_this7.optionsCollection.push({
					data: optionData,
					selected: false
				});
			});
		}

		//for multiple

	}, {
		key: "toggleOptionSelection",
		value: function toggleOptionSelection(option, ev) {
			var _this8 = this;

			ev.stopPropagation();
			if (this.ngDisabled) {
				return;
			}
			option.selected = !option.selected;
			if (option.selected) {
				this.ngModel.push(option.data);
				this.selectedCount += 1;
			} else {
				var ix = _lodash2.default.findIndex(this.ngModel, function (optionData) {
					return _this8.$isEqualItems(option.data, optionData);
				});
				this.ngModel.splice(ix, 1);
				this.selectedCount -= 1;
				this.isSelectedAll = false;
			}

			this.onChange({ model: this.ngModel });
		}

		//for not multiple

	}, {
		key: "selectOption",
		value: function selectOption(option, ev) {
			if (this.ngDisabled) {
				return;
			}
			//this.ngModel = option.data;
			this.onChange({ model: option.data });

			this.optionsCollection.forEach(function (option) {
				option.selected = false;
			});

			option.selected = true;
			this.searchString = this.$$options.getLabel(option.data);
		}
	}, {
		key: "onOutsideClick",
		value: function onOutsideClick() {
			if (this.showList) {
				this.showList = false;
			}
		}
	}, {
		key: "onInputFocus",
		value: function onInputFocus() {
			if (!this.$$options.multiple && _lodash2.default.filter(this.optionsCollection, { selected: true }).length) {
				this.searchString = null;
				this.onChange({ model: null });
				this.$clearSelectedOptions();
				//this.showList = true;
			}
		}
	}, {
		key: "selectAll",
		value: function selectAll() {
			var _this9 = this;

			var result = [];

			this.isSelectedAll = !this.isSelectedAll;

			if (this.isSelectedAll) {
				_lodash2.default.forEach(this.optionsCollection, function (option) {
					option.selected = true;
					result.push(option.data);
					_this9.ngModel.push(option.data);
				});
				this.selectedCount = this.optionsCollection.length;
			} else {
				this.$clearSelectedOptions();
				this.ngModel.splice(0, this.ngModel.length);
				result.splice(0, this.ngModel.length);
				this.selectedCount = 0;
			}

			this.onChange({ model: result });
		}
	}, {
		key: "$clearSelectedOptions",
		value: function $clearSelectedOptions() {
			this.optionsCollection.forEach(function (option) {
				option.selected = false;
			});
		}
	}]);

	return AppSelectComponent;
}()) || _class);
exports.AppSelectComponent = AppSelectComponent;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(77);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "* {\n  font-family: Arial; }\n\nbody {\n  background: #fff;\n  color: #5c5c5c; }\n\ninput[type=\"text\"] {\n  border-radius: 3px;\n  padding: 5px;\n  box-sizing: border-box; }\n  input[type=\"text\"]:focus {\n    outline: none;\n    border: 2px solid #3DAFA1; }\n\n.btn {\n  color: #fff;\n  background: #3DAFA1;\n  border: none;\n  font-size: 18px;\n  padding: 10px;\n  border-radius: 4px;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);\n  cursor: pointer; }\n  .btn:focus {\n    outline: none; }\n  .btn:active {\n    background: #1f9183; }\n\napp-select {\n  display: block; }\n\n.app-select-wrapper {\n  position: relative; }\n\n.select-wrapper {\n  position: relative;\n  width: 100%;\n  box-sizing: border-box; }\n  .select-wrapper .selected-options-list {\n    position: relative;\n    /* height: 30px;*/\n    display: flex;\n    flex-flow: row wrap;\n    justify-content: flex-start;\n    padding: 7px;\n    padding-right: 29px;\n    margin-top: 0;\n    background: #fff;\n    border-radius: 4px;\n    border: 1px solid #6a6a6a;\n    box-sizing: border-box; }\n    .select-wrapper .selected-options-list.focused {\n      border: 2px solid #3DAFA1; }\n    .select-wrapper .selected-options-list.not_empty {\n      padding: 3px 4px;\n      padding-bottom: 0 !important; }\n      .select-wrapper .selected-options-list.not_empty .search-input input {\n        height: 24px;\n        margin-bottom: 3px; }\n    .select-wrapper .selected-options-list:after {\n      content: \"\";\n      position: absolute;\n      display: block;\n      right: 10px;\n      width: 0;\n      height: 0;\n      top: 13px;\n      border-color: #999 transparent transparent;\n      border-style: solid;\n      border-width: 5px 5px 0; }\n    .select-wrapper .selected-options-list .selected-option {\n      position: relative;\n      height: 19px;\n      border-radius: 4px;\n      background-color: #f7f7f7;\n      border: solid 1px #a7a6ab;\n      padding: 0 6px;\n      padding-right: 25px;\n      margin-right: 4px;\n      margin-bottom: 3px; }\n      .select-wrapper .selected-options-list .selected-option span {\n        line-height: 1.1;\n        margin-top: -3px; }\n      .select-wrapper .selected-options-list .selected-option .remove-option {\n        position: absolute;\n        font-size: 21px;\n        right: 8px;\n        top: 2px;\n        color: #c5c5c5;\n        font-weight: bold; }\n    .select-wrapper .selected-options-list .search-input {\n      flex-grow: 1;\n      line-height: 15px; }\n      .select-wrapper .selected-options-list .search-input input {\n        height: 16px;\n        line-height: 100%;\n        font-size: 14px;\n        width: 100%;\n        border: none; }\n    .select-wrapper .selected-options-list li {\n      display: inline-block; }\n  .select-wrapper .select-dropdown {\n    position: absolute;\n    width: inherit;\n    overflow-y: scroll;\n    max-height: 200px;\n    min-width: 50px;\n    font-size: 14px;\n    background-color: #fff;\n    border-radius: 0 0 4px 4px;\n    margin-top: -1px;\n    border: #979797;\n    padding-left: 0;\n    overflow: auto;\n    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);\n    outline: 0;\n    background-clip: padding-box;\n    z-index: 1000; }\n    .select-wrapper .select-dropdown .select-option {\n      padding: 3px 6px;\n      list-style-type: none; }\n      .select-wrapper .select-dropdown .select-option .highlighted {\n        background: none !important;\n        color: #3DAFA1; }\n      .select-wrapper .select-dropdown .select-option:hover:not(.disabled) {\n        background-color: #f1f1f1;\n        cursor: pointer; }\n      .select-wrapper .select-dropdown .select-option.disabled {\n        color: #aaa; }\n      .select-wrapper .select-dropdown .select-option.selected {\n        background: #3DAFA1 !important;\n        color: #fff; }\n        .select-wrapper .select-dropdown .select-option.selected .highlighted {\n          color: #5c5c5c; }\n  .select-wrapper ul {\n    margin-bottom: 0; }\n    .select-wrapper ul li {\n      list-style-type: none;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      max-width: 100%; }\n  .select-wrapper.single_value .select-option.selected .highlighted {\n    color: #fff !important; }\n  .select-wrapper.disable_search input[disabled] {\n    background: none; }\n  .select-wrapper.disable_search .selected-options-list {\n    background-image: linear-gradient(#fff, #f7f7f7); }\n  .select-wrapper.over_vertical_limit .select-dropdown {\n    bottom: 100% !important; }\n\n.select-all-checkbox {\n  position: absolute;\n  right: 0;\n  top: 0;\n  margin-top: 6px; }\n  .select-all-checkbox .checkbox {\n    margin-bottom: 0; }\n", ""]);

// exports


/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-select-wrapper\">\n        <div class=\"select-wrapper\"\n             ng-class=\"{\n                'single_value': !$ctrl.$$options.multiple,\n                'disable_search': !$ctrl.$$options.enableSearch,\n                'over_vertical_limit': $ctrl.$$options.overVerticalLimit\n            }\"\n            ng-style=\"{\n                'padding-right': $ctrl.$$options.enableAll?'60px':'0'\n            }\"\n            >\n            <ul class=\"form-control selected-options-list\"\n                ng-class=\"{\n                'focused': $ctrl.showList,\n                'disabled': $ctrl.ngDisabled,\n                'not_empty': $ctrl.selectedCount\n            }\">\n                <!-- СПИСОК ВЫБРАННЫХ ОПЦИЙ -->\n                <li class=\"selected-option\"\n                    ng-repeat=\"option in $ctrl.optionsCollection\"\n                    ng-if=\"$ctrl.$$options.multiple && option.selected\"\n                    ng-click=\"$ctrl.$$selectOption(option, $event)\">\n                    {{$ctrl.$$options.getLabel(option.data)}}\n                    <span class=\"remove-option\">×</span>\n                </li>\n                <!-- /СПИСОК ВЫБРАННЫХ ОПЦИЙ -->\n                <!-- ИНПУТ ДЛЯ ВВОДА ПОИСКОВОГО ЗАПРОСА -->\n                <li class=\"search-input\" ng-click=\"!$ctrl.ngDisabled?$ctrl.toggleShowMode():null\">\n                    <input type=\"text\"\n                           class=\"search-input\"\n                           placeholder=\"{{$ctrl.$$options.placeholder}}\"\n                           click-outside=\"$ctrl.onOutsideClick()\"\n\n                           ng-change=\"$ctrl.onSearch()\"\n                           ng-disabled=\"!$ctrl.$$options.enableSearch || $ctrl.ngDisabled\"\n                           ng-focus=\"$ctrl.onInputFocus()\"\n                           ng-model=\"$ctrl.searchString\">\n                </li>\n                <!-- /ИНПУТ ДЛЯ ВВОДА ПОИСКОВОГО ЗАПРОСА -->\n            </ul>\n            <!-- СПИСОК ДОСТУПНЫХ ОПЦИЙ -->\n            <ul class=\"select-dropdown\" ng-show=\"$ctrl.showList\">\n                <li class=\"select-option\"\n                    ng-repeat=\"option in $ctrl.optionsCollection | filter: $ctrl.$$searchedStringFilter\"\n                    ng-value=\"option.data\"\n                    ng-click=\"$ctrl.$$selectOption(option, $event)\"\n                    ng-class=\"{\n                    'selected': option.selected\n                }\">\n                    <span ng-bind-html=\"$ctrl.$$options.getLabel(option.data) | highlight: $ctrl.searchString\"></span>\n                </li>\n            </ul>\n            <!-- /СПИСОК ДОСТУПНЫХ ОПЦИЙ -->\n        </div>\n        <!-- ЧЕКБОКС ДЛЯ ВЫБОРА ВСЕХ ОПЦИЙ -->\n        <app-checkbox class=\"select-all-checkbox\"\n                        ng-if=\"$ctrl.$$options.enableAll && $ctrl.$$options.multiple\"\n                        item-value=\"$ctrl.isSelectedAll\"\n                        item-title=\"Все\"\n                        is-selected=\"$ctrl.isSelectedAll\"\n                        on-toggle=\"$ctrl.selectAll()\"></app-checkbox>\n        <!-- /ЧЕКБОКС ДЛЯ ВЫБОРА ВСЕХ ОПЦИЙ -->\n</div>\n\n\n"

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AppCheckboxComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

__webpack_require__(80);

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _appCheckbox = __webpack_require__(82);

var _appCheckbox2 = _interopRequireDefault(_appCheckbox);

var _decorators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppCheckboxComponent = exports.AppCheckboxComponent = (_dec = (0, _decorators.Component)({
	selector: "appCheckbox",
	template: _appCheckbox2.default,
	bindings: {
		itemValue: "<",
		itemTitle: "@",
		isDisabled: "<",
		isSelected: "<",
		onToggle: "&",
		options: "<?" /* {hint, required: {enabled, text}, warning: {enabled, text}} */
	}
}), _dec(_class = function () {
	function AppCheckboxComponent() {
		_classCallCheck(this, AppCheckboxComponent);

		this.checked = false;
		this.hasError = false;
		this.hasWarning = false;
		this.showingHelpBlock = false;
		this.helpBlockText = "";
	}

	_createClass(AppCheckboxComponent, [{
		key: "$onInit",
		value: function $onInit() {
			this.$setChecked();
		}
	}, {
		key: "$onChanges",
		value: function $onChanges(changes) {
			if (changes.isSelected) {
				this.$setChecked();
			}
		}
	}, {
		key: "toggle",
		value: function toggle(event) {
			event.preventDefault();
			event.stopPropagation();

			if (this.isDisabled) {
				return;
			}

			this.checked = !this.checked;
			this.onToggle({ value: this.itemValue });
		}
	}, {
		key: "$setChecked",
		value: function $setChecked() {
			this.checked = this.isSelected || false;
		}
	}]);

	return AppCheckboxComponent;
}()) || _class);

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(81);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "/*@import \"components/common/styles/variables.scss\";*/\n.checkbox {\n  margin: 0 0 12px 8px;\n  font-weight: normal; }\n  .checkbox label {\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;\n    padding: 0;\n    font-size: 15px;\n    color: #6a6a6a; }\n  .checkbox input {\n    display: none; }\n  .checkbox span {\n    display: inline-block; }\n  .checkbox .input-icon {\n    height: 20px;\n    width: 20px;\n    box-sizing: border-box;\n    margin-right: 8px;\n    -webkit-border-radius: 2px;\n    -moz-border-radius: 2px;\n    border-radius: 2px;\n    border: solid #6a6a6a 1px; }\n  .checkbox.disabled {\n    color: #6a6a6a;\n    opacity: 0.5; }\n  .checkbox.checked .input-icon {\n    position: relative;\n    border: solid #3781e0 1px;\n    background-color: #3781e0;\n    color: #fff !important;\n    animation: checkboxActiveAnimation .3s;\n    animation-iteration-count: 1;\n    animation-fill-mode: forwards; }\n    .checkbox.checked .input-icon:after {\n      box-sizing: border-box;\n      -webkit-transform: rotate(40deg);\n      transform: rotate(40deg);\n      position: absolute;\n      left: calc(50% - 3px);\n      top: calc(50% - 8px);\n      display: table;\n      width: 6px;\n      height: 13px;\n      border-width: 2px;\n      border-style: solid;\n      border-top: 0;\n      border-left: 0;\n      content: ''; }\n  .checkbox.has-error .input-icon {\n    border: red; }\n  .checkbox.has-warning .input-icon {\n    border: yellow; }\n\n@keyframes checkboxActiveAnimation {\n  from {\n    opacity: 0.2; }\n  to {\n    opacity: 1; } }\n", ""]);

// exports


/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = "<div class=\"checkbox\"\n     ng-class=\"{\n        'has-error': $ctrl.hasError,\n        'has-warning': $ctrl.hasWarning,\n        'checked': $ctrl.checked,\n        'disabled': $ctrl.isDisabled\n     }\">\n\t<label ng-click=\"$ctrl.toggle($event)\">\n\t\t<span class=\"input-icon\"></span>\n\t\t<span class=\"input-title\" ng-bind=\"$ctrl.itemTitle\"></span>\n\t</label>\n</div>"

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EditableListComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

__webpack_require__(84);

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _editableListTemplate = __webpack_require__(86);

var _editableListTemplate2 = _interopRequireDefault(_editableListTemplate);

var _decorators = __webpack_require__(0);

var _ic_add_black_24px = __webpack_require__(4);

var _ic_add_black_24px2 = _interopRequireDefault(_ic_add_black_24px);

var _ic_black_24px = __webpack_require__(5);

var _ic_black_24px2 = _interopRequireDefault(_ic_black_24px);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EditableListComponent = (_dec = (0, _decorators.Component)({
	selector: "editableList",
	template: _editableListTemplate2.default,
	bindings: {
		listData: "<",
		onRemove: "&",
		onCreate: "&",
		onChange: "&",
		options: "<"
	}
}), _dec(_class = function () {

	/* @ngInject */
	function EditableListComponent() {
		_classCallCheck(this, EditableListComponent);

		this.icons = { addIcon: _ic_add_black_24px2.default, removeIcon: _ic_black_24px2.default };
	}

	_createClass(EditableListComponent, [{
		key: "getLabel",
		value: function getLabel(item) {
			if (this.options.getLabel) {
				return this.options.getLabel(item);
			}

			return item;
		}
	}, {
		key: "createNewItem",
		value: function createNewItem() {
			this.onCreate();
		}
	}]);

	return EditableListComponent;
}()) || _class);
exports.EditableListComponent = EditableListComponent;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(85);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "* {\n  font-family: Arial; }\n\nbody {\n  background: #fff;\n  color: #5c5c5c; }\n\ninput[type=\"text\"] {\n  border-radius: 3px;\n  padding: 5px;\n  box-sizing: border-box; }\n  input[type=\"text\"]:focus {\n    outline: none;\n    border: 2px solid #3DAFA1; }\n\n.btn {\n  color: #fff;\n  background: #3DAFA1;\n  border: none;\n  font-size: 18px;\n  padding: 10px;\n  border-radius: 4px;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);\n  cursor: pointer; }\n  .btn:focus {\n    outline: none; }\n  .btn:active {\n    background: #1f9183; }\n\n.editable-list-wrapper .add-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 300px;\n  border: 3px dashed #6a6a6a;\n  border-radius: 4px;\n  padding: 3px;\n  transition: color .2s, border-color .2s; }\n  .editable-list-wrapper .add-button:hover {\n    cursor: pointer;\n    color: #3DAFA1;\n    border-color: #3DAFA1; }\n    .editable-list-wrapper .add-button:hover svg {\n      fill: #3DAFA1; }\n  .editable-list-wrapper .add-button svg-icon, .editable-list-wrapper .add-button svg {\n    width: 25px;\n    height: 25px;\n    fill: #6a6a6a; }\n\n.editable-list-wrapper .editable-list {\n  display: flex;\n  flex-wrap: wrap; }\n  .editable-list-wrapper .editable-list .editable-list-item {\n    position: relative;\n    margin-right: 35px;\n    margin-top: 10px;\n    display: flex;\n    align-items: center; }\n    .editable-list-wrapper .editable-list .editable-list-item svg-icon {\n      position: absolute;\n      display: none;\n      cursor: pointer; }\n      .editable-list-wrapper .editable-list .editable-list-item svg-icon svg {\n        fill: #ff5248;\n        opacity: 0.8; }\n        .editable-list-wrapper .editable-list .editable-list-item svg-icon svg:hover {\n          opacity: 1; }\n    .editable-list-wrapper .editable-list .editable-list-item:hover svg-icon {\n      display: block; }\n", ""]);

// exports


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = "<div class=\"editable-list-wrapper\">\n\t<div class=\"add-button\" ng-click=\"$ctrl.createNewItem()\">\n\t\t<span>Добавить</span>\n\t\t<svg-icon encoded-str=\"$ctrl.icons.addIcon\"></svg-icon>\n\t</div>\n\t<div class=\"editable-list\">\n\t\t<div ng-repeat=\"item in $ctrl.listData | orderBy: 'name'\" class=\"editable-list-item\">\n\t\t\t<!--<span>{{$ctrl.getLabel(item)}}</span>-->\n\t\t\t<input type=\"text\"\n\t\t\t       ng-model=\"item[$ctrl.options.modelName]\"\n\t\t\t       placeholder=\"{{$ctrl.options.placeholder}}\"\n\t\t\t       ng-blur=\"$ctrl.onChange({item})\">\n\t\t\t<svg-icon encoded-str=\"$ctrl.icons.removeIcon\"\n\t\t\t          ng-click=\"$ctrl.onRemove({item: {item, ix: $index}})\"></svg-icon>\n\t\t</div>\n\t</div>\n</div>"

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AppNavbarComponent = undefined;

var _dec, _class;

__webpack_require__(88);

var _appNavbarTemplate = __webpack_require__(90);

var _appNavbarTemplate2 = _interopRequireDefault(_appNavbarTemplate);

var _decorators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppNavbarComponent = (_dec = (0, _decorators.Component)({
	selector: "appNavbar",
	template: _appNavbarTemplate2.default
}), _dec(_class =

/* @ngInject */
function AppNavbarComponent() {
	_classCallCheck(this, AppNavbarComponent);

	this.routes = [{
		state: "movies.list",
		title: "Фильмы"
	}, {
		state: "genres.list",
		title: "Жанры"
	}, {
		state: "countries.list",
		title: "Страны"
	}, {
		state: "actors.list",
		title: "Актеры"
	}, {
		state: "directors.list",
		title: "Режиссеры"
	}];
}) || _class);
exports.AppNavbarComponent = AppNavbarComponent;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(89);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "* {\n  font-family: Arial; }\n\nbody {\n  background: #fff;\n  color: #5c5c5c; }\n\ninput[type=\"text\"] {\n  border-radius: 3px;\n  padding: 5px;\n  box-sizing: border-box; }\n  input[type=\"text\"]:focus {\n    outline: none;\n    border: 2px solid #3DAFA1; }\n\n.btn {\n  color: #fff;\n  background: #3DAFA1;\n  border: none;\n  font-size: 18px;\n  padding: 10px;\n  border-radius: 4px;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);\n  cursor: pointer; }\n  .btn:focus {\n    outline: none; }\n  .btn:active {\n    background: #1f9183; }\n\n.app-navbar-wrapper .app-navbar-item {\n  cursor: pointer;\n  display: inline-block;\n  margin-right: 15px;\n  opacity: 0.8; }\n  .app-navbar-wrapper .app-navbar-item:hover {\n    opacity: 1; }\n", ""]);

// exports


/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-navbar-wrapper\">\n\t<div class=\"app-navbar-item\" ng-repeat=\"route in $ctrl.routes\" ui-sref=\"{{route.state}}\">\n\t\t<span>{{route.title}}</span>\n\t</div>\n</div>"

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AjaxLoaderComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

__webpack_require__(92);

var _ajaxLoader = __webpack_require__(94);

var _ajaxLoader2 = _interopRequireDefault(_ajaxLoader);

var _decorators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AjaxLoaderComponent = (_dec = (0, _decorators.Component)({
	selector: "ajaxLoader",
	template: _ajaxLoader2.default,
	bindings: {
		promise: "<"
	}
}), _dec(_class = function () {
	function AjaxLoaderComponent() {
		_classCallCheck(this, AjaxLoaderComponent);

		/*
   promise.$$state.status === 0 // pending
   promise.$$state.status === 1 // resolved
   promise.$$state.status === 2 // rejected
   */
		this.state = 1;
	}

	_createClass(AjaxLoaderComponent, [{
		key: "$onChanges",
		value: function $onChanges() {
			var _this = this;

			if (!this.promise) {
				this.state = 1;

				return;
			}

			this.state = 0;
			this.promise.then(function () {
				_this.state = 1;
			});
		}
	}]);

	return AjaxLoaderComponent;
}()) || _class);
exports.AjaxLoaderComponent = AjaxLoaderComponent;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(93);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "* {\n  font-family: Arial; }\n\nbody {\n  background: #fff;\n  color: #5c5c5c; }\n\ninput[type=\"text\"] {\n  border-radius: 3px;\n  padding: 5px;\n  box-sizing: border-box; }\n  input[type=\"text\"]:focus {\n    outline: none;\n    border: 2px solid #3DAFA1; }\n\n.btn {\n  color: #fff;\n  background: #3DAFA1;\n  border: none;\n  font-size: 18px;\n  padding: 10px;\n  border-radius: 4px;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);\n  cursor: pointer; }\n  .btn:focus {\n    outline: none; }\n  .btn:active {\n    background: #1f9183; }\n\n.ajax-loader {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 7000;\n  width: 100%;\n  height: 100%;\n  background: rgba(255, 255, 255, 0.8);\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n  .ajax-loader .preloader {\n    margin: 50px auto;\n    box-sizing: border-box;\n    width: 50px;\n    height: 50px;\n    border-radius: 50%;\n    background: linear-gradient(#3DAFA1 -50%, rgba(61, 175, 161, 0.2) 60%);\n    animation: roll-r 6s linear infinite; }\n  .ajax-loader .preloader > div {\n    padding: 5px;\n    animation: roll-l 1s linear infinite; }\n  .ajax-loader .preloader > div:after {\n    content: \"\";\n    display: block;\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    background: #fff; }\n\n@keyframes roll-r {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(360deg); } }\n\n@keyframes roll-l {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(-360deg); } }\n", ""]);

// exports


/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ajax-loader\" ng-if=\"$ctrl.state === 0\" layout=\"row\" layout-align=\"center center\">\n\t<div class=\"preloader\">\n\t\t<div></div>\n\t</div>\n</div>"

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/* @ngInject */
function HighlightFilter($sce) {
	return function (text, phrase) {
		var result = phrase ? text.replace(new RegExp("(" + phrase + ")", "gi"), "<span class='highlighted'>$1</span>") : text;

		return $sce.trustAsHtml(result);
	};
}

exports.HighlightFilter = HighlightFilter;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(97);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module("neotek.common").constant("alertConfig", {
  success: "alert-success",
  error: "alert-danger",
  info: "alert-info"
}).provider("flashAlert", function () {
  var a = [],
      b = 5e3;
  return {
    setAlertTime: function setAlertTime(a) {
      b = a;
    },
    $get: ["$timeout", "alertConfig", function (c, d) {
      return {
        success: function success(a) {
          this.add("success", a);
        },
        error: function error(a) {
          this.add("error", a);
        },
        info: function info(a) {
          this.add("info", a);
        },
        getAlert: function getAlert() {
          return a;
        },
        add: function add(b, c) {
          var e = {
            typeOfAlert: d[b],
            msg: c,
            remove: function remove() {
              a.splice(0, 1);
            }
          };

          a.push(e);
          this.hideAlert(e);
        },
        hideAlert: function hideAlert() {
          c(function () {
            a.shift();
          }, b);
        }
      };
    }]
  };
}).directive("alertFlash", ["flashAlert", function (a) {
  return {
    restrict: "E",
    template: __webpack_require__(11),
    scope: {},
    link: function link(b) {
      b.$watch(a.getAlert, function () {
        b.alerts = a.getAlert();
      });
    }
  };
}]);

var alertFlashDirective = function () {
  function alertFlashDirective() {
    _classCallCheck(this, alertFlashDirective);

    this.restrict = "E";
    this.template = __webpack_require__(11);
    this.scope = {};
  }

  _createClass(alertFlashDirective, [{
    key: "link",
    value: function link(b) {
      b.$watch(a.getAlert, function () {
        b.alerts = a.getAlert();
      });
    }
  }]);

  return alertFlashDirective;
}();

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(98);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./alert.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./alert.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "* {\n  font-family: Arial; }\n\nbody {\n  background: #fff;\n  color: #5c5c5c; }\n\ninput[type=\"text\"] {\n  border-radius: 3px;\n  padding: 5px;\n  box-sizing: border-box; }\n  input[type=\"text\"]:focus {\n    outline: none;\n    border: 2px solid #3DAFA1; }\n\n.btn {\n  color: #fff;\n  background: #3DAFA1;\n  border: none;\n  font-size: 18px;\n  padding: 10px;\n  border-radius: 4px;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);\n  cursor: pointer; }\n  .btn:focus {\n    outline: none; }\n  .btn:active {\n    background: #1f9183; }\n\nalert-flash {\n  position: absolute;\n  left: 50%;\n  top: 35px;\n  width: 500px;\n  margin-left: -250px;\n  color: #fff;\n  z-index: 99999; }\n  alert-flash .alert {\n    padding: .3em;\n    font-size: 1.3em;\n    opacity: .8;\n    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.5); }\n  alert-flash .alert-success {\n    background-color: #3DAFA1; }\n  alert-flash .alert-danger {\n    background-color: #ff5248; }\n  alert-flash .alert-info {\n    background-color: rgba(10, 160, 255, 0.75); }\n", ""]);

// exports


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _moviesService = __webpack_require__(8);

var _actorsService = __webpack_require__(100);

var _countriesService = __webpack_require__(101);

var _directorsService = __webpack_require__(102);

var _genresService = __webpack_require__(103);

var _attachmentsService = __webpack_require__(104);

var _movieFactory = __webpack_require__(9);

var _Api = __webpack_require__(105);

angular.module("neotek.backend", []).service("Movies", _moviesService.MoviesService).service("Actors", _actorsService.ActorsService).service("Countries", _countriesService.CountriesService).service("Directors", _directorsService.DirectorsService).service("Genres", _genresService.GenresService).service("Attachments", _attachmentsService.AttachmentsService).factory("Api", _Api.Api).factory("MovieTemplate", _movieFactory.MovieTemplate);

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActorsService = function () {
	/* @ngInject */
	function ActorsService(Api, $q) {
		_classCallCheck(this, ActorsService);

		this.services = { Api: Api, $q: $q };
		this.apiUrl = "/actors";
	}

	_createClass(ActorsService, [{
		key: "api",
		value: function api() {
			var Api = this.services.Api;


			return Api.service(this.apiUrl);
		}
	}]);

	return ActorsService;
}();

exports.ActorsService = ActorsService;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CountriesService = function () {
	/* @ngInject */
	function CountriesService(Api, $q) {
		_classCallCheck(this, CountriesService);

		this.services = { Api: Api, $q: $q };
		this.apiUrl = "/countries";
	}

	_createClass(CountriesService, [{
		key: "api",
		value: function api() {
			var Api = this.services.Api;


			return Api.service(this.apiUrl);
		}
	}]);

	return CountriesService;
}();

exports.CountriesService = CountriesService;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DirectorsService = function () {
	/* @ngInject */
	function DirectorsService(Api, $q) {
		_classCallCheck(this, DirectorsService);

		this.services = { Api: Api, $q: $q };
		this.apiUrl = "/directors";
	}

	_createClass(DirectorsService, [{
		key: "api",
		value: function api() {
			var Api = this.services.Api;


			return Api.service(this.apiUrl);
		}
	}]);

	return DirectorsService;
}();

exports.DirectorsService = DirectorsService;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenresService = function () {
	/* @ngInject */
	function GenresService(Api, $q) {
		_classCallCheck(this, GenresService);

		this.services = { Api: Api, $q: $q };
		this.apiUrl = "/genres";
	}

	_createClass(GenresService, [{
		key: "api",
		value: function api() {
			var Api = this.services.Api;


			return Api.service(this.apiUrl);
		}
	}]);

	return GenresService;
}();

exports.GenresService = GenresService;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AttachmentsService = function () {
	/* @ngInject */
	function AttachmentsService(Api, Upload) {
		_classCallCheck(this, AttachmentsService);

		this.services = { Api: Api, Upload: Upload };
		this.apiUrl = "/attachments";
	}

	_createClass(AttachmentsService, [{
		key: "api",
		value: function api() {
			var Api = this.services.Api;


			return Api.service(this.apiUrl);
		}
	}, {
		key: "upload",
		value: function upload(file) {
			var Upload = this.services.Upload;

			return Upload.upload({
				url: "api/" + this.apiUrl,
				data: { file: file }
			}).then(function (response) {
				return response.data;
			});
		}
	}]);

	return AttachmentsService;
}();

exports.AttachmentsService = AttachmentsService;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * @ngInject
 */
function Api(Restangular) {
	return Restangular.withConfig(function (RestangularConfigurer) {
		RestangularConfigurer.setDefaultHeaders({ Accept: "application/json" });
		RestangularConfigurer.setBaseUrl("/api");
	});
}

exports.Api = Api;

/***/ })
],[12]);