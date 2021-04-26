/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function() {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.jsx":
/*!*************************!*\
  !*** ./pages/index.jsx ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/database */ \"firebase/database\");\n/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_database__WEBPACK_IMPORTED_MODULE_3__);\n\nvar _jsxFileName = \"/Users/bober/Projects/hackernews/pages/index.jsx\";\n\n\n\nlet db;\n\nif (!(firebase_app__WEBPACK_IMPORTED_MODULE_2___default().apps.length)) {\n  firebase_app__WEBPACK_IMPORTED_MODULE_2___default().initializeApp({\n    databaseURL: 'https://hacker-news.firebaseio.com'\n  });\n  db = firebase_app__WEBPACK_IMPORTED_MODULE_2___default().database().ref('/v0');\n}\n\nfunction HomePage() {\n  const [stories, setStories] = react__WEBPACK_IMPORTED_MODULE_1___default().useState([]);\n\n  const handleFetch = async () => {\n    console.log('fetch');\n    const snap = await db.child('/topstories').once('value');\n    const allItems = snap.val();\n    const items = allItems.slice(0, 10);\n    const stories = [];\n\n    for (const id of items) {\n      console.log(id);\n      const snap = await db.child(`item/${id}`).get();\n      stories.push(snap.val());\n    }\n\n    setStories(stories);\n  };\n\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n      onClick: handleFetch,\n      children: \"fetch\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 40,\n      columnNumber: 3\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"pre\", {\n      children: JSON.stringify(stories, null, 2)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 42,\n      columnNumber: 3\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 38,\n    columnNumber: 9\n  }, this);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (HomePage);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oYWNrZXJuZXdzLy4vcGFnZXMvaW5kZXguanN4PzcwYzUiXSwibmFtZXMiOlsiZGIiLCJmaXJlYmFzZSIsImRhdGFiYXNlVVJMIiwicmVmIiwiSG9tZVBhZ2UiLCJzdG9yaWVzIiwic2V0U3RvcmllcyIsIlJlYWN0IiwiaGFuZGxlRmV0Y2giLCJjb25zb2xlIiwibG9nIiwic25hcCIsImNoaWxkIiwib25jZSIsImFsbEl0ZW1zIiwidmFsIiwiaXRlbXMiLCJzbGljZSIsImlkIiwiZ2V0IiwicHVzaCIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7QUFFQTtBQUNBO0FBRUEsSUFBSUEsRUFBSjs7QUFFQSxJQUFJLENBQUNDLGlFQUFMLEVBQTJCO0FBQzFCQSxtRUFBQSxDQUF1QjtBQUN0QkMsZUFBVyxFQUFFO0FBRFMsR0FBdkI7QUFHQUYsSUFBRSxHQUFHQyw0REFBQSxHQUFvQkUsR0FBcEIsQ0FBd0IsS0FBeEIsQ0FBTDtBQUNBOztBQUdELFNBQVNDLFFBQVQsR0FBb0I7QUFFbkIsUUFBTSxDQUFDQyxPQUFELEVBQVVDLFVBQVYsSUFBd0JDLHFEQUFBLENBQWUsRUFBZixDQUE5Qjs7QUFFQSxRQUFNQyxXQUFXLEdBQUcsWUFBWTtBQUUvQkMsV0FBTyxDQUFDQyxHQUFSLENBQVksT0FBWjtBQUNBLFVBQU1DLElBQUksR0FBRyxNQUFNWCxFQUFFLENBQUNZLEtBQUgsQ0FBUyxhQUFULEVBQXdCQyxJQUF4QixDQUE2QixPQUE3QixDQUFuQjtBQUVBLFVBQU1DLFFBQVEsR0FBR0gsSUFBSSxDQUFDSSxHQUFMLEVBQWpCO0FBQ0EsVUFBTUMsS0FBSyxHQUFHRixRQUFRLENBQUNHLEtBQVQsQ0FBZSxDQUFmLEVBQWtCLEVBQWxCLENBQWQ7QUFDQSxVQUFNWixPQUFPLEdBQUcsRUFBaEI7O0FBRUEsU0FBSyxNQUFNYSxFQUFYLElBQWlCRixLQUFqQixFQUF3QjtBQUN2QlAsYUFBTyxDQUFDQyxHQUFSLENBQVlRLEVBQVo7QUFDQSxZQUFNUCxJQUFJLEdBQUcsTUFBTVgsRUFBRSxDQUFDWSxLQUFILENBQVUsUUFBT00sRUFBRyxFQUFwQixFQUF1QkMsR0FBdkIsRUFBbkI7QUFDQWQsYUFBTyxDQUFDZSxJQUFSLENBQWFULElBQUksQ0FBQ0ksR0FBTCxFQUFiO0FBQ0E7O0FBQ0RULGNBQVUsQ0FBQ0QsT0FBRCxDQUFWO0FBQ0EsR0FmRDs7QUFpQkEsc0JBQU87QUFBQSw0QkFFTjtBQUFRLGFBQU8sRUFBRUcsV0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFGTSxlQUlOO0FBQUEsZ0JBQU9hLElBQUksQ0FBQ0MsU0FBTCxDQUFlakIsT0FBZixFQUF3QixJQUF4QixFQUE4QixDQUE5QjtBQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFKTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFBUDtBQU9BOztBQUVELCtEQUFlRCxRQUFmIiwiZmlsZSI6Ii4vcGFnZXMvaW5kZXguanN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9hcHAnXG5pbXBvcnQgJ2ZpcmViYXNlL2RhdGFiYXNlJ1xuXG5sZXQgZGJcblxuaWYgKCFmaXJlYmFzZS5hcHBzLmxlbmd0aCkge1xuXHRmaXJlYmFzZS5pbml0aWFsaXplQXBwKHtcblx0XHRkYXRhYmFzZVVSTDogJ2h0dHBzOi8vaGFja2VyLW5ld3MuZmlyZWJhc2Vpby5jb20nXG5cdH0pXG5cdGRiID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJy92MCcpXG59XG5cblxuZnVuY3Rpb24gSG9tZVBhZ2UoKSB7XG5cblx0Y29uc3QgW3N0b3JpZXMsIHNldFN0b3JpZXNdID0gUmVhY3QudXNlU3RhdGUoW10pXG5cblx0Y29uc3QgaGFuZGxlRmV0Y2ggPSBhc3luYyAoKSA9PiB7XG5cdFx0XG5cdFx0Y29uc29sZS5sb2coJ2ZldGNoJylcblx0XHRjb25zdCBzbmFwID0gYXdhaXQgZGIuY2hpbGQoJy90b3BzdG9yaWVzJykub25jZSgndmFsdWUnKVxuXG5cdFx0Y29uc3QgYWxsSXRlbXMgPSBzbmFwLnZhbCgpXG5cdFx0Y29uc3QgaXRlbXMgPSBhbGxJdGVtcy5zbGljZSgwLCAxMClcblx0XHRjb25zdCBzdG9yaWVzID0gW11cblxuXHRcdGZvciAoY29uc3QgaWQgb2YgaXRlbXMpIHtcblx0XHRcdGNvbnNvbGUubG9nKGlkKVxuXHRcdFx0Y29uc3Qgc25hcCA9IGF3YWl0IGRiLmNoaWxkKGBpdGVtLyR7aWR9YCkuZ2V0KClcblx0XHRcdHN0b3JpZXMucHVzaChzbmFwLnZhbCgpKVxuXHRcdH1cblx0XHRzZXRTdG9yaWVzKHN0b3JpZXMpXG5cdH1cblxuXHRyZXR1cm4gPGRpdj5cblx0XHRcblx0XHQ8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUZldGNofT5mZXRjaDwvYnV0dG9uPlxuXG5cdFx0PHByZT57IEpTT04uc3RyaW5naWZ5KHN0b3JpZXMsIG51bGwsIDIpIH08L3ByZT5cblx0XHRcblx0PC9kaXY+XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWVQYWdlXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.jsx\n");

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ (function(module) {

"use strict";
module.exports = require("firebase/app");;

/***/ }),

/***/ "firebase/database":
/*!************************************!*\
  !*** external "firebase/database" ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = require("firebase/database");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/index.jsx"));
module.exports = __webpack_exports__;

})();