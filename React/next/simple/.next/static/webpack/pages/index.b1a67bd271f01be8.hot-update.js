"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ HomePage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/.pnpm/react@18.2.0/node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _s = $RefreshSig$();\n\nfunction Header(param) {\n    let { title } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n        children: title\n    }, void 0, false, {\n        fileName: \"/Users/wangzhenyu/study/frontend-study-book/React/next/simple/pages/index.js\",\n        lineNumber: 4,\n        columnNumber: 10\n    }, this);\n}\n_c = Header;\nfunction Message(param) {\n    let { count } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        children: [\n            \"The count from home page is: \",\n            count\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/wangzhenyu/study/frontend-study-book/React/next/simple/pages/index.js\",\n        lineNumber: 7,\n        columnNumber: 10\n    }, this);\n}\n_c1 = Message;\nfunction HomePage(param) {\n    let { title } = param;\n    _s();\n    const names = [\n        \"Ada Lovelace\",\n        \"Grace Hopper\",\n        \"Margaret Hamilton\"\n    ];\n    const [count, setCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    function handleClick() {\n        setCount(count + 1);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Header, {\n                title: title\n            }, void 0, false, {\n                fileName: \"/Users/wangzhenyu/study/frontend-study-book/React/next/simple/pages/index.js\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"React is a JavaScript library for building user interfaces.\"\n            }, void 0, false, {\n                fileName: \"/Users/wangzhenyu/study/frontend-study-book/React/next/simple/pages/index.js\",\n                lineNumber: 18,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                children: names.map((name, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                        children: name\n                    }, index, false, {\n                        fileName: \"/Users/wangzhenyu/study/frontend-study-book/React/next/simple/pages/index.js\",\n                        lineNumber: 21,\n                        columnNumber: 11\n                    }, this))\n            }, void 0, false, {\n                fileName: \"/Users/wangzhenyu/study/frontend-study-book/React/next/simple/pages/index.js\",\n                lineNumber: 19,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: handleClick,\n                children: \"Click me to plus count\"\n            }, void 0, false, {\n                fileName: \"/Users/wangzhenyu/study/frontend-study-book/React/next/simple/pages/index.js\",\n                lineNumber: 24,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Message, {\n                count: count\n            }, void 0, false, {\n                fileName: \"/Users/wangzhenyu/study/frontend-study-book/React/next/simple/pages/index.js\",\n                lineNumber: 25,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/wangzhenyu/study/frontend-study-book/React/next/simple/pages/index.js\",\n        lineNumber: 16,\n        columnNumber: 5\n    }, this);\n}\n_s(HomePage, \"oDgYfYHkD9Wkv4hrAPCkI/ev3YU=\");\n_c2 = HomePage;\nvar _c, _c1, _c2;\n$RefreshReg$(_c, \"Header\");\n$RefreshReg$(_c1, \"Message\");\n$RefreshReg$(_c2, \"HomePage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWdDO0FBRWhDLFNBQVNDLE9BQU8sS0FBUztRQUFULEVBQUVDLEtBQUssRUFBRSxHQUFUO0lBQ2QscUJBQU8sOERBQUNDO2tCQUFJRDs7Ozs7O0FBQ2Q7S0FGU0Q7QUFHVCxTQUFTRyxRQUFRLEtBQVM7UUFBVCxFQUFFQyxLQUFLLEVBQUUsR0FBVDtJQUNmLHFCQUFPLDhEQUFDQzs7WUFBRTtZQUE4QkQ7Ozs7Ozs7QUFDMUM7TUFGU0Q7QUFHTSxTQUFTRyxTQUFTLEtBQVM7UUFBVCxFQUFFTCxLQUFLLEVBQUUsR0FBVDs7SUFDL0IsTUFBTU0sUUFBUTtRQUFDO1FBQWdCO1FBQWdCO0tBQW9CO0lBQ25FLE1BQU0sQ0FBQ0gsT0FBT0ksU0FBUyxHQUFHVCwrQ0FBUUEsQ0FBQztJQUNuQyxTQUFTVTtRQUNQRCxTQUFTSixRQUFRO0lBQ25CO0lBQ0EscUJBQ0UsOERBQUNNOzswQkFDQyw4REFBQ1Y7Z0JBQU9DLE9BQU9BOzs7Ozs7MEJBQ2YsOERBQUNJOzBCQUFFOzs7Ozs7MEJBQ0gsOERBQUNNOzBCQUNFSixNQUFNSyxJQUFJLENBQUNDLE1BQU1DLHNCQUNoQiw4REFBQ0M7a0NBQWdCRjt1QkFBUkM7Ozs7Ozs7Ozs7MEJBR2IsOERBQUNFO2dCQUFPQyxTQUFTUjswQkFBYTs7Ozs7OzBCQUM5Qiw4REFBQ047Z0JBQVFDLE9BQU9BOzs7Ozs7Ozs7Ozs7QUFHdEI7R0FuQndCRTtNQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9pbmRleC5qcz9iZWU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5cbmZ1bmN0aW9uIEhlYWRlcih7IHRpdGxlIH0pIHtcbiAgcmV0dXJuIDxoMT57dGl0bGV9PC9oMT5cbn1cbmZ1bmN0aW9uIE1lc3NhZ2UoeyBjb3VudCB9KSB7XG4gIHJldHVybiA8cD5UaGUgY291bnQgZnJvbSBob21lIHBhZ2UgaXM6IHtjb3VudH08L3A+XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lUGFnZSh7IHRpdGxlIH0pIHtcbiAgY29uc3QgbmFtZXMgPSBbJ0FkYSBMb3ZlbGFjZScsICdHcmFjZSBIb3BwZXInLCAnTWFyZ2FyZXQgSGFtaWx0b24nXTtcbiAgY29uc3QgW2NvdW50LCBzZXRDb3VudF0gPSB1c2VTdGF0ZSgwKVxuICBmdW5jdGlvbiBoYW5kbGVDbGljaygpIHtcbiAgICBzZXRDb3VudChjb3VudCArIDEpXG4gIH1cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPEhlYWRlciB0aXRsZT17dGl0bGV9IC8+XG4gICAgICA8cD5SZWFjdCBpcyBhIEphdmFTY3JpcHQgbGlicmFyeSBmb3IgYnVpbGRpbmcgdXNlciBpbnRlcmZhY2VzLjwvcD5cbiAgICAgIDx1bD5cbiAgICAgICAge25hbWVzLm1hcCgobmFtZSwgaW5kZXgpID0+IChcbiAgICAgICAgICA8bGkga2V5PXtpbmRleH0+e25hbWV9PC9saT5cbiAgICAgICAgKSl9XG4gICAgICA8L3VsPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVDbGlja30+Q2xpY2sgbWUgdG8gcGx1cyBjb3VudDwvYnV0dG9uPlxuICAgICAgPE1lc3NhZ2UgY291bnQ9e2NvdW50fSAvPlxuICAgIDwvZGl2PlxuICApXG59Il0sIm5hbWVzIjpbInVzZVN0YXRlIiwiSGVhZGVyIiwidGl0bGUiLCJoMSIsIk1lc3NhZ2UiLCJjb3VudCIsInAiLCJIb21lUGFnZSIsIm5hbWVzIiwic2V0Q291bnQiLCJoYW5kbGVDbGljayIsImRpdiIsInVsIiwibWFwIiwibmFtZSIsImluZGV4IiwibGkiLCJidXR0b24iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n"));

/***/ })

});