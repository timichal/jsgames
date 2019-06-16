/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! exports provided: Board, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Board\", function() { return Board; });\n/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helperFunctions */ \"./src/helperFunctions.js\");\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n\n/*\nThe game board itself, comprised of cells\n*/\n\nvar Cell = function Cell() {\n  _classCallCheck(this, Cell);\n\n  this.isBomb = false; // Is the cell a bomb?\n\n  this.isExposed = false; // Is it open?\n\n  this.isFlagged = false; // Does it have a bomb flag on it?\n\n  this.isQuestion = false; // Question mark (if its used)\n\n  this.neighborBombs = 0; // # surrounding bombs.  Set for all cells.\n};\n\nvar Board =\n/*#__PURE__*/\nfunction () {\n  function Board(maxX, maxY) {\n    _classCallCheck(this, Board);\n\n    this.maxX = maxX;\n    this.maxY = maxY;\n    this.init();\n  }\n\n  _createClass(Board, [{\n    key: \"init\",\n    value: function init() {\n      var _this = this;\n\n      this.board = new Array(this.maxX + 1).fill(0).map(function () {\n        return new Array(_this.maxY + 1).fill(0).map(function () {\n          return new Cell();\n        });\n      });\n      this.shuffledPosList = Object(_helperFunctions__WEBPACK_IMPORTED_MODULE_0__[\"shuffledPosList\"])(this.maxX, this.maxY); // to pick bomb placements from\n    } // used for looking around a cell\n\n  }, {\n    key: \"boundCheck\",\n    value: function boundCheck(x, y) {\n      return x >= 0 && x <= this.maxX && y >= 0 && y <= this.maxY;\n    } // check how many neighbors are flagged, without the cell itself\n\n  }, {\n    key: \"flagsInMatrix\",\n    value: function flagsInMatrix(x, y) {\n      var _this2 = this;\n\n      return Object(_helperFunctions__WEBPACK_IMPORTED_MODULE_0__[\"cellNeighbors\"])(x, y).filter(function (neighbor) {\n        return _this2.boundCheck(neighbor[0], neighbor[1]);\n      }).map(function (neighbor) {\n        return _this2.board[neighbor[0]][neighbor[1]].isFlagged;\n      }).reduce(function (acc, val) {\n        return acc + val;\n      });\n    } // Places a bomb into a cell. isExposed is used here as a temporary\n    // measure for firstClick()\n    // returns true if bomb placed successfully, false if not\n    // TODO how does the neighborBombs thing work when it increases the cell itself's count as well?\n\n  }, {\n    key: \"placeBomb\",\n    value: function placeBomb(x, y) {\n      var _this3 = this;\n\n      var cell = this.board[x][y];\n\n      if (!cell.isBomb && !cell.isExposed) {\n        cell.isBomb = true;\n        Object(_helperFunctions__WEBPACK_IMPORTED_MODULE_0__[\"cellAndNeighbors\"])(x, y).filter(function (neighbor) {\n          return _this3.boundCheck(neighbor[0], neighbor[1]);\n        }).forEach(function (neighbor) {\n          _this3.board[neighbor[0]][neighbor[1]].neighborBombs += 1;\n        });\n        return true;\n      }\n\n      return false;\n    }\n  }, {\n    key: \"removeBomb\",\n    value: function removeBomb(x, y) {\n      var _this4 = this;\n\n      var cell = this.board[x][y];\n      cell.isBomb = false;\n      Object(_helperFunctions__WEBPACK_IMPORTED_MODULE_0__[\"cellAndNeighbors\"])(x, y).filter(function (neighbor) {\n        return _this4.boundCheck(neighbor[0], neighbor[1]);\n      }).forEach(function (neighbor) {\n        _this4.board[neighbor[0]][neighbor[1]].neighborBombs -= 1;\n      });\n    }\n  }]);\n\n  return Board;\n}();\n/* harmony default export */ __webpack_exports__[\"default\"] = (Board);\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! exports provided: Canvas, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Canvas\", function() { return Canvas; });\n/* harmony import */ var _imageDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imageDefs */ \"./src/imageDefs.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n/*\ncanvas view for the board\n*/\n\nvar Canvas =\n/*#__PURE__*/\nfunction () {\n  function Canvas(width, height, maxX, maxY) {\n    _classCallCheck(this, Canvas);\n\n    this.canvas = document.getElementById(\"boardCanvas\");\n    this.canvas.width = width;\n    this.canvas.height = height;\n    this.ctx = this.canvas.getContext(\"2d\");\n    this.clickables = [];\n    this.maxX = maxX;\n    this.maxY = maxY;\n    this.init(true); // first init to populate clickables\n  }\n\n  _createClass(Canvas, [{\n    key: \"drawInteractiveImage\",\n    value: function drawInteractiveImage(id, img, x, y, width, height, init) {\n      this.ctx.drawImage(img, x, y, width, height);\n      if (init) this.clickables.push({\n        id: id,\n        x: x,\n        y: y,\n        width: width,\n        height: height\n      });\n    }\n  }, {\n    key: \"drawFace\",\n    value: function drawFace(state, init) {\n      this.drawInteractiveImage(\"face\", _imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"][\"face\".concat(state)], this.canvas.width / 2 - 13, 10, 26, 26, init);\n    }\n  }, {\n    key: \"drawBombcount\",\n    value: function drawBombcount(value, init) {\n      var stringValue = value >= 0 ? String(value).padStart(3, \"0\") : \"-\".concat(String(-value).padStart(2, \"0\"));\n      this.drawInteractiveImage(\"bombcount\", _imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"][\"time\".concat(stringValue.substring(0, 1))], 10, 10, 13, 23, init);\n      this.drawInteractiveImage(\"bombcount\", _imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"][\"time\".concat(stringValue.substring(1, 2))], 23, 10, 13, 23, init);\n      this.drawInteractiveImage(\"bombcount\", _imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"][\"time\".concat(stringValue.substring(2, 3))], 36, 10, 13, 23, init);\n    }\n  }, {\n    key: \"drawTimer\",\n    value: function drawTimer(value) {\n      var stringValue = String(value).padStart(3, \"0\");\n      this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"][\"time\".concat(stringValue.substring(0, 1))], this.canvas.width - 49, 10, 13, 23);\n      this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"][\"time\".concat(stringValue.substring(1, 2))], this.canvas.width - 36, 10, 13, 23);\n      this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"][\"time\".concat(stringValue.substring(2, 3))], this.canvas.width - 23, 10, 13, 23);\n    }\n  }, {\n    key: \"drawCell\",\n    value: function drawCell(x, y, state, init) {\n      this.drawInteractiveImage(\"cell-\".concat(x, \"-\").concat(y), _imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"][\"cell\".concat(state)], 10 + x * 16, 46 + y * 16, 16, 16, init);\n    }\n  }, {\n    key: \"init\",\n    value: function init(firstInit) {\n      // top line\n      // height is 10, bordertb is stretched\n      this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"].bordertl, 0, 0);\n      this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"].bordertb, 10, 0, (this.maxX + 1) * 16, 10);\n      this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"].bordertr, 10 + (this.maxX + 1) * 16, 0); // top display (bomb counter, face, timer)\n      // y offset is 10, height is 26, borderlr is stretched\n\n      this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"].borderlr, 0, 10, 10, 26); // bomb counter\n\n      this.drawBombcount(0, firstInit); // face\n\n      this.drawFace(\"smile\", firstInit); // timer\n\n      this.drawTimer(0);\n      this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"].borderlr, this.canvas.width - 10, 10, 10, 26); // display-grid separator\n      // y offset is 36, height is 10, bordertb is stretched\n\n      this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"].borderjointl, 0, 36);\n      this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"].bordertb, 10, 36, (this.maxX + 1) * 16, 10);\n      this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"].borderjointr, this.canvas.width - 10, 36); // main grid\n      // y offset is 46, line height is 16\n\n      for (var i = 0; i <= this.maxY; i++) {\n        this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"].borderlr, 0, 46 + i * 16, 10, 16);\n        this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"].borderlr, this.canvas.width - 10, 46 + i * 16, 10, 16);\n\n        for (var j = 0; j <= this.maxX; j++) {\n          this.drawCell(j, i, \"blank\", firstInit);\n        }\n      } // bottom line\n      // height is 10, bordertb is stretched\n\n\n      this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"].borderbl, 0, this.canvas.height - 10, 10, 10);\n      this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"].bordertb, 10, this.canvas.height - 10, (this.maxX + 1) * 16, 10);\n      this.ctx.drawImage(_imageDefs__WEBPACK_IMPORTED_MODULE_0__[\"images\"].borderbr, this.canvas.width - 10, this.canvas.height - 10, 10, 10);\n    }\n  }]);\n\n  return Canvas;\n}();\n/* harmony default export */ __webpack_exports__[\"default\"] = (Canvas);\n\n//# sourceURL=webpack:///./src/canvas.js?");

/***/ }),

/***/ "./src/helperFunctions.js":
/*!********************************!*\
  !*** ./src/helperFunctions.js ***!
  \********************************/
/*! exports provided: shuffledPosList, cellNeighbors, cellAndNeighbors, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"shuffledPosList\", function() { return shuffledPosList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cellNeighbors\", function() { return cellNeighbors; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cellAndNeighbors\", function() { return cellAndNeighbors; });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n// modern Fisher-Yates: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array\nfunction shuffle(arr) {\n  for (var i = arr.length - 1; i > 0; i--) {\n    var j = Math.floor(Math.random() * (i + 1));\n    var _ref = [arr[j], arr[i]];\n    arr[i] = _ref[0];\n    arr[j] = _ref[1];\n  }\n\n  return arr;\n}\n\nfunction shuffledPosList(maxX, maxY) {\n  var posList = [];\n\n  for (var x = 0; x <= maxX; x++) {\n    for (var y = 0; y <= maxY; y++) {\n      posList.push([x, y]);\n    }\n  }\n\n  return shuffle(posList);\n}\nfunction cellNeighbors(x, y) {\n  return [[x - 1, y - 1], [x - 1, y], [x - 1, y + 1], [x, y - 1], [x, y + 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]];\n}\nfunction cellAndNeighbors(x, y) {\n  return [].concat(_toConsumableArray(cellNeighbors(x, y)), [[x, y]]);\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (shuffledPosList);\n\n//# sourceURL=webpack:///./src/helperFunctions.js?");

/***/ }),

/***/ "./src/imageDefs.js":
/*!**************************!*\
  !*** ./src/imageDefs.js ***!
  \**************************/
/*! exports provided: images, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"images\", function() { return images; });\n// a simple compression algorithm:\n// {number} translates to number * \"/\"\nfunction decompress(b64compressed) {\n  return b64compressed.replace(/\\{(\\d*)\\}/, function (str, groups) {\n    return \"/\".repeat(groups);\n  });\n}\n\nfunction genImage(b64, svg) {\n  var img = new Image();\n  img.src = \"data:image/gif;base64,\".concat(decompress(b64));\n  if (svg) img.src = b64;\n  return img;\n}\n\nvar images = {\n  bordertl: genImage(\"R0lGODlhCgAKAPcAAHt7e729vf{1015}ywAAAAACgAKAAAIJgAFCBxIsKBBAQESKkwocOHChg4ZIowYAGJEiw4xJgQAQGMAjgEBADs=\"),\n  bordertb: genImage(\"R0lGODlhBAAKAPcAAHt7e729vf{1015}ywAAAAABAAKAAAIFAAFCBwoMIDBgwgTKjwIoKHDhgEBADs=\"),\n  bordertr: genImage(\"R0lGODlhCgAKAPcAAHt7e729vf{1015}ywAAAAACgAKAAAIKAAFCBw4MABBggEABFjIcCEAhQ0ZPowoESLFiRQTWoz4cGNFgxcBBAQAOw==\"),\n  borderlr: genImage(\"R0lGODlhCgAEAPcAAHt7e729vf{1015}ywAAAAACgAEAAAIFwAFCAhAsCAAAAILGkQ4UGGAgwkdHgwIADs=\"),\n  borderbl: genImage(\"R0lGODlhCgAKAPcAAHt7e729vf{1015}ywAAAAACgAKAAAIKAAFCAhAsCCAAAILKhQ4UGHBhA4JQow40WHFhQ0pBgDAsSPHjR49BgQAOw==\"),\n  borderbr: genImage(\"R0lGODlhCgAKAPcAAHt7e729vf{1015}ywAAAAACgAKAAAIJQAFCAhAsCAAAAILGgSgUOHBhgshEnwokSJEiw0PatzIsePBgAAAOw==\"),\n  borderjointl: genImage(\"R0lGODlhCgAKAPcAAHt7e729vf{1015}ywAAAAACgAKAAAIJwAFCAhAsCCAAAILKhQ4UGHBhA4JQow40WHFhQ0pZjQI4GIAAAACAgA7\"),\n  borderjointr: genImage(\"R0lGODlhCgAKAPcAAHt7e729vf{1015}ywAAAAACgAKAAAIJgAFCAhAsCAAAAILGgSgUOHBhgshEnwokSJEiw0PMrzIcGBGAAEBADs=\"),\n  cellblank: genImage(\"R0lGODlhEAAQAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAAEAAQAAAIRgAVCBxIsKCBgggHGigg0IDDhxAdFmCoIKLFhRQvRpzYUONDjhU9SswoEmNHkSBLmgyJkmTLkx5TluSIcaLNmzZr4txZICAAOw==\"),\n  cellbombdeath: genImage(\"R0lGODlhEAAQAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAAEAAQAAAIVAALCBxIsKBABAgTKlxYYCFCAA4RNHQI0eFEBBABaNSIMeFFjBs3KryoUYGCkBUlJix5MqRHkChjqnwYkyNCkjVTfqw5ciVMjjojpuxJMeLHiAoDAgA7\"),\n  cellbombflagged: genImage(\"R0lGODlhEAAPAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAAEAAPAAAIVwAVCBxIsKCBgggHGigg0IDDhxAdFmCoICICBBEnNnR48WJGihw7YoSosWJIjyRBQkT5sGREAwA+boQYM+VMmABy2jSZs2dPiSp9+gR68yXRhROTKlUaEAA7\"),\n  cellbombmisflagged: genImage(\"R0lGODlhEAAQAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAAEAAQAAAIZgALCBxIsKBAAwgTKlxYYCFCAA4NNESAQCHEhBQlIswIoGNHAxk1bkTgsWNIkQYAUFRgkmTChg9VkqT4EWHDkjJJlkTpkaLOizxlCgUKc2TPii8x/myZFCTSlEptOrWoMGPRiAsDAgA7\"),\n  cellbombquestion: genImage(\"R0lGODlhEAAQAPcAAAAAAHt7e729vf{1011}ywAAAAAEAAQAAAIWgAHCBxIsKCAgggHCgggUIDDhxAdBmA4ACKAiwAgTmzo8GLHjBIpPvQogORCkRFLgjzJ0eJKlhVdRtwYc+RLmClT0oxoMmTLjzNR5ny48eTEo0iPGk3KNEBAAAA7\"),\n  cellbombrevealed: genImage(\"R0lGODlhEAAQAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAAEAAQAAAIVAALCBxIsKBAAwgTKlxYYCFCAA4NNHQI0eFEAxABaNSIMeFFjBs3KryoUYGCkBUlJix5MqRHkChjqnwYkyNCkjVTfqw5ciVMjjojpuxJMeLHiAoDAgA7\"),\n  cellopen0: genImage(\"R0lGODlhEAAQAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAAEAAQAAAINAALCBxIsKBAAwgTKlxYYKFDhQ0fPowokWFFhxQvIsyokeNFjxVBShQ5USNEkwlJYkSJMCAAOw==\"),\n  cellopen1: genImage(\"R0lGODlhEAAQAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAAEAAQAAAIRQALCBxIsKBAAwgTKlxYYKFDhQ0dChDgMKLCiRQZLsSYEeJFjhUlTgy5caTGkh0TWkyIkSRCji1VfoTp8eHDlTZl5lwYEAA7\"),\n  cellopen2: genImage(\"R0lGODlhEAAQAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAAEAAQAAAISwALCBxIsKBAAwgTKlxYYKFDhQ0RDphIcSJEiRUzJoxIUWFHhBEffjQQ0uNIkgs1XsR4ciPLAQ9BvswIU6YBmhVdxnRYcqdNnwkDAgA7\"),\n  cellopen3: genImage(\"R0lGODlhEAAQAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAAEAAQAAAISgALCBxIsKBAAwgTKlxYYKFDhQ0NIJhIkSJEhBUzIkgY8aFFhB0dfjQQUmLGiwo1ovQ4keNDjC1BwtQYk+RMlS5fOiyp02ZPhQEBADs=\"),\n  cellopen4: genImage(\"R0lGODlhEAAQAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAAEAAQAAAITAALCBxIsKBAAwgTKlxYYKFDhQ0TBphoYGIAiAotVqSYMOLGix8xItQYsuNIiyg5GoiYMqXJhyQRelwYc+XDkjJv1px582VPkT8TBgQAOw==\"),\n  cellopen5: genImage(\"R0lGODlhEAAQAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAAEAAQAAAIRQALCBxIsKBAAwgTKlxYYKFDhQ0NEJhIsWLCiBUzEriIkOJDjhInfkSIUaNIkCY9khyp0kDEhy1LpkQ5E+RIiDcZ5lQYEAA7\"),\n  cellopen6: genImage(\"R0lGODlhEAAQAPcAAAB7e3t7e729vf{1011}ywAAAAAEAAQAAAISgADCBxIsKBAAQgTKlwYYKFDhQ0RAphIcSJEiRUrXhRA8WHCiB09CgCZMSRCkiUtnsQIQKFJlC5VjmSZ8mPClC1timS4k2fPhAEBADs=\"),\n  cellopen7: genImage(\"R0lGODlhEAAQAPcAAAAAAHt7e729vf{1011}ywAAAAAEAAQAAAIRgADCBxIsKBAAQgTKlwYYKFDhQ0FAJhIsWLCiBUzArj4ECFFjh0/IozoUOTIkBMhPjR5smRKlQtZtlQoUwDJjjBx5tSJMCAAOw==\"),\n  cellopen8: genImage(\"R0lGODlhEAAQAPcAAHt7e729vf{1015}ywAAAAAEAAQAAAIRQABCBxIsKDAAAgTKlwIYKFDhQ0RGjyYMOLEgRUlUtQYMYDFjR43drwIseLEkiE7psy40uRIjicluiyI8qFDlTZZ5lQYEAA7\"),\n  facedead: genImage(\"R0lGODlhGgAaAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAAGgAaAAAIrgALCBxIsKBBggYKKFjIsKHDhwsTKoRI8aHEiQYyatzIkSPBiB1DdvyoQCSAkydDkux4MoFLlyk3rtwI4KVNmDIHgsxY8+ZNABpnGuhZs2eCojgvYuT50ijMphlnGkX6dKpSkE59/rxacqjWr0ClftUaVmfXrChb2iwrcOfUn1C5aiRKNqlQr2OPBjXLMevanG270kQLFPBSlmlV8hXJOKpOpQcjF4QsuTLlypIDAgA7\"),\n  faceooh: genImage(\"R0lGODdhGgAaAHcAACwAAAAAGgAaAIcAAACAAAAAgACAgAAAAICAAIAAgIDAwMDA3MCmyvAAAACAgAD//wCAgIDAwMD////QpDxDM/AS9GAS9GDQpDxDW/sS9GDQpDzQpDxDXIgS9EwAvTMS9JTQqKRDM/AAvTMAAAsAAAABC/QAABgAAAHQqKQS82z0Mv4BC/QAAAAAAAAAAAAAAAAS85QAAAAAAAsAABYAAAAAAAsA//8S85QAAAES9ejkIzMBC/QAAAAAAAAS85QAAAsAAAABC/T0HPBoAENuAGFlAGdTACB6AGkAAGVDWK8S89hDWMZDWM4S9dBDWNgS89gAAAAAvTNenGjQqKQS8/BEXy4AvTMBCQ83BHAQDHoS9BDjopA3BHAAvTMAAAH/CuAUEQD3V8AAAAAAAAAAAAAAAAAS9FD0Q20AAAAAA8Bf07AAAFIAAAAAAADQZZAS9IgAAAtf07AS9oj0RAsBC/Rf07AAAAsS9uwAAAHitIwBC/Rf07AAAAsAAAEBC/Rf0tBoAENuAGFlAGdTACB6AGkAAGUAvTUBC/QUBCIAvTUAvTUS9oAUBCIAMZgS9ODhaGRf0tAAvTUBC/QUBCIAAAHQNsAUBCJDXEkUBCIAvTUBC/QUBCIS9kgU5BgS9oDQNsBDM/AU5BgS9oDQNsBDW/sU5Bhf0tDQNsA3BHAS9nwAQAAS9rTQNsBDM/AAQAAS9rTQNsBDW/sAQAAUN3jQNsAAvTcBDwAeBLIAvTcAvTcS9zweBLIAOFgS9ZzhaGRf1FAAvTcBDwAeBLIAAAHQNsAeBLJDXEkeBLIAvTcBDwAAAIFA+3HQCmRB3dFB3dkS9fQAAAD4OOUTAAAWyzgAAAAS9dATBogS9oQS9gjkIswBC/QAAAAAAAAAAAEAAAAAAAMS9lgS9kz0YS4AABj0VMoFBmQAAFQS+eD0WYoFBmQAAFQS+eDQZbgS+iDR7gQAAAAAAADQZZAAAAAAACgAAAAAAAAS+NjQZbgS+iCgoKSAgID/AAAA/wD//wAAAP//AP8A///////cwUYIugAbCBxIsKBBggcaPFjIsKHDhwsTKoRI8aHEiQcyatzIkSPBiB1Ddvz4QCSAkydDkux4koFLlyk3rtwI4KVNmDIHgsxY8+ZNABpnHug5AMCAl0WPMgB6ESNPmC2h9mQ6syeDpEiNvgRa1adXnF2/+uSqs+TQsVFtkhUI0qrLokuVbm26061VuxmFuoWrdS5ds0+3pl0atCxHtz9zsgWscfBSpoUXm0QJWbFTkZjpNj3IueDmzqA/g+4cEAA7\"),\n  facesmile: genImage(\"R0lGODlhGgAaAPcAAAAAAHt7e729vf//AP{1007}ywAAAAAGgAaAAAIrQADCBxIsKBBggICEFjIsKHDhwsTKoRI8aHEiQIyatzIkSPBiB1DdvxIQCSAkydDkux4coBLlyk3rtwI4KVNmDIHgsxY8+ZNABpnCujp82dGoURbwkx6VGfJoTaVDpA69SJGqEWLAp1JNGtUqyC7esXJ9aVYmGbBPsU69WdatRq7oqQKFG7csVWbCtzJ02tdvVdpio0Z1KnJuSoNi1wMuOTBx5CtQp4cQDJlyAEBADs=\"),\n  facewin: genImage(\"R0lGODlhGgAaAPcAAAAAAHt7AHt7e729vf//AP{1003}ywAAAAAGgAaAAAIsgAFCBxIsKBBggMEFFjIsKHDhwsTKoRI8aHEiQMyatzIkSPBiB1DdvxYQCSAkydDkux4koBLlyk3rtwI4KVNmDIHgsxY8+ZNABpnDujp82dGoT1RKm1JAOhFjENhKm06telTkDWzoqTaMuvVkkN7BmBKNYDUrzyLqgU6k6ham2x1go0K8+dLp0jhVsWJVqPbok77+n0bWLDfvzGDyjWpVOVikZCP6nx6sHJBypYzY85sOSAAOw==\"),\n  \"time-\": genImage(\"R0lGODlhDQAXAPcAAAAAAHsAAP8AAP{1011}ywAAAAADQAXAAAIUQABCBxIsCCAAAcTIhy4EKFDgQsTKoTIUGLFiBEJYrRIcaPBjRknUvxYUYDJkwIsolxZcmVKjwVBxrQYcqTIixVJdpzp8SHNnQ01TqxpkGBAAAA7\"),\n  time0: genImage(\"R0lGODlhDQAXAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAADQAXAAAIWwABCBxIsCCCgwgRDkQAIKFChg0ZOowoUCFBixYXHqy48WLHjBwhgowoEqJBkQIJAFCpsiFBlitjLkwZs2XJghxDnixpUifJnT418gRKceJHkgldhnTYE2fBgAAAOw==\"),\n  time1: genImage(\"R0lGODlhDQAXAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAADQAXAAAIVwABCBxIsCAAAgcTIhy4EKFDgQgYCnwIAEFEhQUtXkyY0eJEjgM1Sux4kWJIjx8NomyIsSLBhyY5woQ4suPHhSc34sx5k2RNni2ByuS4sufCjRhjGjQYEAA7\"),\n  time2: genImage(\"R0lGODlhDQAXAPcAAAAAAHsAAP8AAP{1011}ywAAAAADQAXAAAIXgABCBxIsKCAgwgRDgwAIKFCAQsbJpQokCFDggorFpQIEYBFgwcjguz4EWNIjRtPMnQYsiNHlgMhsoR48WTBixxvehSYkSDOnhpr2hSZ0+dOig6PNnyp8OdMlxs3BgQAOw==\"),\n  time3: genImage(\"R0lGODlhDQAXAPcAAAAAAHsAAP8AAP{1011}ywAAAAADQAXAAAIWwABCBxIsKCAgwgRDgwAIKFCAQsbJpQokCFDggorFpQIEYBFgwcjguz4EWNIjRtPMnQYsiNHlhFZQnR5EaTGmgIzekypcqdJmjxJ+hyoc+XEnjIbEpXpcuPGgAAAOw==\"),\n  time4: genImage(\"R0lGODlhDQAXAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAADQAXAAAIXgABCBxIsCAAAgcTIhyIQCDChwIbAkAgEeJEiRQlMqQYkSPBjB01hhz50SPIkhhFbox4MSNHjS5jDkQY8+VMgxcdJkR5s+BJixs1LuSp0KfHnRY9LoS4UCTTnThxBgQAOw==\"),\n  time5: genImage(\"R0lGODlhDQAXAPcAAAAAAHsAAP8AAP{1011}ywAAAAADQAXAAAIWwABCBxIsKCAgwgRDhQAIKHCAAIPNkwIAGJEiQQhWlRY0OJEhhkrXgQZcmRHkRMLCvTI0KFEli4xiozZcKBHghg1GpR506TInhxR4swp1OdMikRpkowpU6XKgAAAOw==\"),\n  time6: genImage(\"R0lGODlhDQAXAPcAAAAAAHsAAP8AAP{1011}ywAAAAADQAXAAAIWwABCBxIsKCAgwgRDhQAIKHCAAIPNkwIAGJEiQQhWlRY0OJEhhkrXgQZcmRHkRMLCvTI0KFEli4xNvxIEaRMghg5Lsx586NJnDxJ/tQ5tGVNmzQVkozZUyXBgAAAOw==\"),\n  time7: genImage(\"R0lGODlhDQAXAPcAAAAAAHsAAP8AAP{1011}ywAAAAADQAXAAAIWwABCBxIsKCAgwgRDgwAIKFCAQsbJpQokCFDggorFpQIEYBFgwcjguz4EWNIjRtPXvx4saNGlgRXepzZUCTIlyNtDsxYcudJmiZJAhWYkWZJlThbxpzZc6PTgAAAOw==\"),\n  time8: genImage(\"R0lGODlhDQAXAPcAAAAAAAAAewAA/wB7AHsAAHt7e729vd7e3v8AAP//AP{983}ywAAAAADQAXAAAIVAABCBxIsCCCgwgRDkQAIKFChg0ZOowoUCFBixYXHqy48WLHjBwhgowoEqJBkSQTNtTosOPKlhI5FpRJ8mRJkyFzerxpUydLmRM/pnzIsuXMowIDAgA7\"),\n  time9: genImage(\"R0lGODlhDQAXAPcAAAAAAHsAAP8AAP{1011}ywAAAAADQAXAAAIXAABCBxIsKCAgwgRDhQAIKFChg0ZOowoUCFBixYXHqy48WLHjBwhgowoEqJBkSQTNtTosCOAACkfDoRZkOLLmx5N0swpEObOkDNrWvR5UmdMmzBbSmTZsqZTgQEBADs=\")\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (images);\n\n//# sourceURL=webpack:///./src/imageDefs.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timer */ \"./src/timer.js\");\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helperFunctions */ \"./src/helperFunctions.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n\n\n\n // disable the right click button's menu so cells can be right clicked\n\nfunction pressRightClick() {\n  return false;\n}\n\ndocument.oncontextmenu = pressRightClick; // default difficulty levels; should be changed by the menu & custom difficulty should be available\n// 0 is counted, ie if maxX === 7, then 8 cols\n// original custom difficulty: 7 <= maxY/maxX <= 99;\n// bombCount = maxLegalBombs = Math.round((maxX + 1) * (maxY + 1) / 3)\n// TODO saner names (rows, cols?)\n\nvar maxX;\nvar maxY;\nvar bombCount;\n\nvar difficulty = _toConsumableArray(document.querySelectorAll(\"input[type=radio]\")).filter(function (el) {\n  return el.checked;\n})[0].value;\n\nif (difficulty === \"beginner\") {\n  maxX = 7;\n  maxY = 7;\n  bombCount = 10;\n} else if (difficulty === \"intermediate\") {\n  maxX = 15;\n  maxY = 15;\n  bombCount = 40;\n} else if (difficulty === \"expert\") {\n  maxX = 30;\n  maxY = 15;\n  bombCount = 99;\n} // menu options\n\n\nvar useQuestionMarks = document.getElementById(\"qmarks\").checked; // TODO reset the board without reloading - class Game\n\ndocument.querySelectorAll(\"input[type=radio]\").forEach(function (el) {\n  return el.addEventListener(\"click\", function () {\n    difficulty = el.value;\n    window.location.reload();\n  });\n});\ndocument.getElementById(\"qmarks\").addEventListener(\"click\", function (e) {\n  useQuestionMarks = e.target.checked;\n  window.location.reload();\n}); // canvas init\n// width = left border + grid + right border\n// height = top display + grid + bottom border\n\nvar width = 10 + (maxX + 1) * 16 + 10;\nvar height = 46 + (maxY + 1) * 16 + 10;\nvar canvas = new _canvas__WEBPACK_IMPORTED_MODULE_0__[\"Canvas\"](width, height, maxX, maxY); // board and timer init\n\nvar board = new _board__WEBPACK_IMPORTED_MODULE_2__[\"Board\"](maxX, maxY);\nvar maxCells = (maxX + 1) * (maxY + 1) - 1;\nvar timer = new _timer__WEBPACK_IMPORTED_MODULE_1__[\"Timer\"](canvas); // round variables\n\nvar moves = 0;\nvar cellsOpen = 0;\nvar bombsFlagged = 0;\nvar dead = false;\nvar win = false; // Updates the display w/ the current number of bombs left.\n\nfunction updateBombCount() {\n  canvas.drawBombcount(bombCount - bombsFlagged);\n} // When you open a cell w/ 0 neighbors or click on a completely flagged\n// cell, open all neighbors (not flagged)\n\n\nfunction uncoverMatrix(x, y) {\n  Object(_helperFunctions__WEBPACK_IMPORTED_MODULE_3__[\"cellAndNeighbors\"])(x, y).filter(function (neighbor) {\n    return board.boundCheck(neighbor[0], neighbor[1]);\n  }).forEach(function (neighbor) {\n    var cell = board.board[neighbor[0]][neighbor[1]];\n\n    if (!cell.isExposed && !cell.isFlagged) {\n      uncoverCell(neighbor[0], neighbor[1]);\n    }\n  });\n} // upon dying, show all bombs\n\n\nfunction showBombs() {\n  for (var i = 0; i <= maxX; i++) {\n    for (var j = 0; j <= maxY; j++) {\n      var cell = board.board[i][j];\n\n      if (!cell.isExposed) {\n        if (cell.isBomb && !cell.isFlagged) {\n          canvas.drawCell(i, j, \"bombrevealed\");\n        } else if (!cell.isBomb && cell.isFlagged) {\n          canvas.drawCell(i, j, \"bombmisflagged\");\n        }\n      }\n    }\n  }\n}\n\nfunction finishGame() {\n  // when there are no bombs left, flag unflagged cells\n  for (var i = 0; i <= maxX; i++) {\n    for (var j = 0; j <= maxY; j++) {\n      var cell = board.board[i][j];\n\n      if (!cell.isExposed && !cell.isFlagged) {\n        cell.isFlagged = true;\n        canvas.drawCell(i, j, \"bombflagged\");\n      }\n    }\n  }\n\n  win = true;\n  console.log(\"Victory! \".concat(timer.currentTime, \" time, \").concat(moves, \" moves\"));\n  canvas.drawFace(\"win\");\n}\n\nfunction uncoverCell(x, y) {\n  var cell = board.board[x][y]; // game over\n\n  if (cell.isBomb) {\n    timer.stop();\n    canvas.drawCell(x, y, \"bombdeath\");\n    canvas.drawFace(\"dead\");\n    cell.isExposed = true;\n    dead = true;\n    updateBombCount();\n    showBombs();\n  } else {\n    canvas.drawCell(x, y, \"open\".concat(cell.neighborBombs));\n    cell.isExposed = true;\n    cellsOpen += 1;\n\n    if (cell.neighborBombs === 0 && !cell.isBomb) {\n      uncoverMatrix(x, y);\n    } // victory check\n\n\n    if (cellsOpen + bombCount - 1 === maxCells) {\n      timer.stop();\n      win = true;\n      finishGame();\n    }\n  }\n} // first click: starts the timer, ensures a safe start\n// TODO sometimes matrix opening doesn't work\n\n\nfunction firstClick(x, y) {\n  // we use isExposed as bomb placement prevention\n  // then remove bombs from around the first click and replace them\n  var removedBombs = 0;\n  Object(_helperFunctions__WEBPACK_IMPORTED_MODULE_3__[\"cellAndNeighbors\"])(x, y).filter(function (neighbor) {\n    return board.boundCheck(neighbor[0], neighbor[1]);\n  }).forEach(function (neighbor) {\n    var cell = board.board[neighbor[0]][neighbor[1]];\n    cell.isExposed = true;\n\n    if (cell.isBomb) {\n      board.removeBomb(neighbor[0], neighbor[1]);\n      removedBombs += 1;\n      var newBomb = board.shuffledPosList[bombCount + removedBombs];\n      board.placeBomb(newBomb[0], newBomb[1]);\n    }\n\n    cell.isExposed = false;\n  });\n  timer.start();\n} // left click function for uncovering cells\n\n\nfunction leftClick(x, y) {\n  var cell = board.board[x][y]; // special case for the first click\n\n  if (!timer.active) firstClick(x, y); // if clicking an uncovered cell, uncover neighbors if deemed safe\n  // if not, uncover the cell\n\n  if (cell.isExposed) {\n    if (board.flagsInMatrix(x, y) === board.board[x][y].neighborBombs) {\n      uncoverMatrix(x, y);\n    }\n  } else if (!cell.isFlagged) uncoverCell(x, y);\n\n  if (win) {\n    bombsFlagged = bombCount;\n    updateBombCount();\n  }\n\n  if (!dead && !win) {\n    canvas.drawFace(\"smile\"); // Count the moves\n\n    moves += 1;\n  }\n} // right click function for cycling states\n\n\nfunction rightClick(x, y) {\n  var cell = board.board[x][y];\n\n  if (!cell.isExposed) {\n    // three possible states: flagged, question, blank\n    if (cell.isFlagged) {\n      bombsFlagged -= 1;\n      cell.isFlagged = false;\n      if (!useQuestionMarks) canvas.drawCell(x, y, \"blank\");else {\n        cell.isQuestion = true;\n        canvas.drawCell(x, y, \"bombquestion\");\n      }\n    } else if (cell.isQuestion) {\n      cell.isQuestion = false;\n      canvas.drawCell(x, y, \"blank\");\n    } else {\n      cell.isFlagged = true;\n      bombsFlagged += 1;\n      canvas.drawCell(x, y, \"bombflagged\");\n    }\n  }\n\n  updateBombCount(); // repeat from leftClick - move elsewhere?\n\n  if (!dead && !win) {\n    canvas.drawFace(\"smile\"); // Count the moves\n\n    moves += 1;\n  }\n} // clicking on the bomb count reveals all cells when all flags are used\n\n\nfunction bombCountClick() {\n  function openAll() {\n    // TODO foreach\n    var allOK = true;\n\n    for (var i = 0; i <= maxX; i++) {\n      for (var j = 0; j <= maxY; j++) {\n        var cell = board.board[i][j];\n\n        if (!cell.isExposed) {\n          if (cell.isBomb && !cell.isFlagged) {\n            canvas.drawCell(i, j, \"bombdeath\");\n            allOK = false;\n          } else if (!cell.isBomb && cell.isFlagged) {\n            canvas.drawCell(i, j, \"bombmisflagged\");\n          } else if (!cell.isBomb) {\n            canvas.drawCell(i, j, \"open\".concat(cell.neighborBombs));\n          }\n        }\n      }\n    }\n\n    return allOK;\n  } // TODO: this is a confusing alternate way to win\n\n\n  if (!dead && !win && bombCount - bombsFlagged === 0) {\n    timer.stop();\n    moves += 1;\n\n    if (openAll()) {\n      updateBombCount();\n      console.log(\"Victory! \".concat(timer.currentTime, \" time, \").concat(moves, \" moves\"));\n      canvas.drawFace(\"win\");\n    } else {\n      dead = true;\n      updateBombCount();\n      canvas.drawFace(\"dead\");\n    }\n  }\n}\n\nfunction handleEvent(id, event) {\n  // console.log(id, event.type);\n  if (id.startsWith(\"cell\")) {\n    if (event.type === \"mousedown\") canvas.drawFace(\"ooh\");\n\n    if (event.type === \"mouseup\") {\n      var clickArgs = [Number(id.split(\"-\")[1]), Number(id.split(\"-\")[2]), event];\n      if (event.button === 0) leftClick.apply(void 0, clickArgs);\n      if (event.button === 2) rightClick.apply(void 0, clickArgs);\n    }\n  }\n\n  if (id === \"bombcount\" && event.type === \"click\") bombCountClick();\n  if (id === \"face\" && event.type === \"click\") initGame();\n}\n\n[\"click\", \"mousedown\", \"mouseup\"].forEach(function (event) {\n  canvas.canvas.addEventListener(event, function (e) {\n    var clickPos = {\n      x: e.offsetX,\n      y: e.offsetY\n    };\n    canvas.clickables.forEach(function (clickable) {\n      if (clickPos.x >= clickable.x && clickPos.x < clickable.x + clickable.width && clickPos.y >= clickable.y && clickPos.y < clickable.y + clickable.height) handleEvent(clickable.id, e);\n    });\n  });\n}); // preparing the game board\n\nfunction makeBoard() {\n  board.init();\n  bombsFlagged = 0;\n  cellsOpen = 0;\n  updateBombCount(); // placing the bombs on the board\n\n  board.shuffledPosList.slice(0, bombCount).forEach(function (pos) {\n    return board.placeBomb(pos[0], pos[1]);\n  });\n} // imitating the initGame() now\n\n\nfunction initGame() {\n  width = 10 + (maxX + 1) * 16 + 10;\n  height = 46 + (maxY + 1) * 16 + 10;\n  canvas.init();\n  moves = 0;\n  timer.stop();\n  timer.currentTime = 0;\n  makeBoard();\n  canvas.drawFace(\"smile\");\n  dead = false;\n  win = false;\n}\n\ninitGame();\n\n//# sourceURL=webpack:///./src/script.js?");

/***/ }),

/***/ "./src/timer.js":
/*!**********************!*\
  !*** ./src/timer.js ***!
  \**********************/
/*! exports provided: Timer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timer\", function() { return Timer; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n//TODO reset capabilities\nvar Timer =\n/*#__PURE__*/\nfunction () {\n  function Timer(canvas) {\n    _classCallCheck(this, Timer);\n\n    this.currentTime = 0;\n    this.active = false;\n    this.canvas = canvas;\n  }\n\n  _createClass(Timer, [{\n    key: \"tick\",\n    value: function tick() {\n      var _this = this;\n\n      if (this.active && this.currentTime < 1000) {\n        this.currentTime += 1;\n        this.canvas.drawTimer(this.currentTime);\n        setTimeout(function () {\n          return _this.tick();\n        }, 1000);\n      }\n    }\n  }, {\n    key: \"start\",\n    value: function start() {\n      this.active = true;\n      this.tick();\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      this.active = false;\n    }\n  }]);\n\n  return Timer;\n}();\n/* harmony default export */ __webpack_exports__[\"default\"] = (Timer);\n\n//# sourceURL=webpack:///./src/timer.js?");

/***/ })

/******/ });