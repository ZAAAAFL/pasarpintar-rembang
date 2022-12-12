/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "popperGenerator": () => (/* binding */ popperGenerator)
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/validateModifiers.js */ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js");
/* harmony import */ var _utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/uniqueBy.js */ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__["default"])([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (true) {
          var modifiers = (0,_utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__["default"])([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          (0,_utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__["default"])(modifiers);

          if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.options.placement) === _enums_js__WEBPACK_IMPORTED_MODULE_7__.auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__["default"])(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__["default"])(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__["default"])(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__["default"])(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ contains)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBoundingClientRect)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    scaleX = element.offsetWidth > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !(0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__["default"])() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getClippingRect)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element, strategy) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element, strategy)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__["default"])(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__["default"])(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__["default"])(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__["default"])(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCompositeRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.width) / element.offsetWidth || 1;
  var scaleY = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent);
  var offsetParentIsScaled = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent) && isElementScaled(offsetParent);
  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__["default"])(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentElement)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentRect)
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getHTMLElementScroll)
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getLayoutRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeName)
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeScroll)
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOffsetParent)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");








function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());
  var isIE = /Trident/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(currentNode)) {
    currentNode = currentNode.host;
  }

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getParentNode)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getScrollParent)
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getViewportRect)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getViewportRect(element, strategy) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = (0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindow)
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScroll)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScrollBarX)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isElement": () => (/* binding */ isElement),
/* harmony export */   "isHTMLElement": () => (/* binding */ isHTMLElement),
/* harmony export */   "isShadowRoot": () => (/* binding */ isShadowRoot)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isLayoutViewport)
/* harmony export */ });
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__["default"])());
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isScrollParent)
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isTableElement)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listScrollParents)
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "afterMain": () => (/* binding */ afterMain),
/* harmony export */   "afterRead": () => (/* binding */ afterRead),
/* harmony export */   "afterWrite": () => (/* binding */ afterWrite),
/* harmony export */   "auto": () => (/* binding */ auto),
/* harmony export */   "basePlacements": () => (/* binding */ basePlacements),
/* harmony export */   "beforeMain": () => (/* binding */ beforeMain),
/* harmony export */   "beforeRead": () => (/* binding */ beforeRead),
/* harmony export */   "beforeWrite": () => (/* binding */ beforeWrite),
/* harmony export */   "bottom": () => (/* binding */ bottom),
/* harmony export */   "clippingParents": () => (/* binding */ clippingParents),
/* harmony export */   "end": () => (/* binding */ end),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "main": () => (/* binding */ main),
/* harmony export */   "modifierPhases": () => (/* binding */ modifierPhases),
/* harmony export */   "placements": () => (/* binding */ placements),
/* harmony export */   "popper": () => (/* binding */ popper),
/* harmony export */   "read": () => (/* binding */ read),
/* harmony export */   "reference": () => (/* binding */ reference),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "top": () => (/* binding */ top),
/* harmony export */   "variationPlacements": () => (/* binding */ variationPlacements),
/* harmony export */   "viewport": () => (/* binding */ viewport),
/* harmony export */   "write": () => (/* binding */ write)
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__.basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__.left, _enums_js__WEBPACK_IMPORTED_MODULE_2__.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.top : _enums_js__WEBPACK_IMPORTED_MODULE_2__.left;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_2__.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__.within)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (true) {
    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__.isHTMLElement)(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "mapToStyles": () => (/* binding */ mapToStyles)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(x * dpr) / dpr || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.left;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.right) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (true) {
    var transitionProperty = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.placement),
    variation: (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__["default"])(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.start;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.top, _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.right : _enums_js__WEBPACK_IMPORTED_MODULE_1__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "arrow": () => (/* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "flip": () => (/* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "hide": () => (/* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "offset": () => (/* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"])
/* harmony export */ });
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "distanceAndSkiddingToXY": () => (/* binding */ distanceAndSkiddingToXY)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__["default"])(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;

    var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [_enums_js__WEBPACK_IMPORTED_MODULE_5__.top, _enums_js__WEBPACK_IMPORTED_MODULE_5__.left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.withinMaxClamp)(_tetherMin, _offset, _tetherMax) : (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles),
/* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles),
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners),
/* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip),
/* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide),
/* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__["default"], _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__["default"], _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeAutoPlacement)
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (true) {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeOffsets)
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ detectOverflow)
/* harmony export */ });
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.elements.reference);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__["default"])(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ expandToHashMap)
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/format.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/format.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ format)
/* harmony export */ });
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getAltAxis)
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBasePlacement)
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getFreshSideObject)
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMainAxisFromPlacement)
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositePlacement)
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositeVariationPlacement)
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getVariation)
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/math.js":
/*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "round": () => (/* binding */ round)
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeByName)
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergePaddingObject)
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ orderModifiers)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rectToClientRect)
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/uniqueBy.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uniqueBy)
/* harmony export */ });
function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/userAgent.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/userAgent.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUAString)
/* harmony export */ });
function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/validateModifiers.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ validateModifiers)
/* harmony export */ });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./node_modules/@popperjs/core/lib/utils/format.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

          break;

        case 'phase':
          if (_enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.indexOf(modifier.phase) < 0) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (modifier.effect != null && typeof modifier.effect !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "within": () => (/* binding */ within),
/* harmony export */   "withinMaxClamp": () => (/* binding */ withinMaxClamp)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./node_modules/flowbite/src/flowbite.css":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./node_modules/flowbite/src/flowbite.css ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n! tailwindcss v3.2.4 | MIT License | https://tailwindcss.com\n*//*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #E5E7EB; /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: '';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n5. Use the user's configured `sans` font-feature-settings by default.\n*/\n\nhtml {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  -moz-tab-size: 4; /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4; /* 3 */\n  font-family: Nunito, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 4 */\n  font-feature-settings: normal; /* 5 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user's configured `mono` font family by default.\n2. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  font-weight: inherit; /* 1 */\n  line-height: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1; /* 1 */\n  color: #9CA3AF; /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: #9CA3AF; /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Make elements with the HTML hidden attribute stay hidden by default */\n[hidden] {\n  display: none;\n}\n\n[type='text'],[type='email'],[type='url'],[type='password'],[type='number'],[type='date'],[type='datetime-local'],[type='month'],[type='search'],[type='tel'],[type='time'],[type='week'],[multiple],textarea,select {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  background-color: #fff;\n  border-color: #6B7280;\n  border-width: 1px;\n  border-radius: 0px;\n  padding-top: 0.5rem;\n  padding-right: 0.75rem;\n  padding-bottom: 0.5rem;\n  padding-left: 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5rem;\n  --tw-shadow: 0 0 #0000;\n}\n\n[type='text']:focus, [type='email']:focus, [type='url']:focus, [type='password']:focus, [type='number']:focus, [type='date']:focus, [type='datetime-local']:focus, [type='month']:focus, [type='search']:focus, [type='tel']:focus, [type='time']:focus, [type='week']:focus, [multiple]:focus, textarea:focus, select:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: #1C64F2;\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  border-color: #1C64F2;\n}\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  color: #6B7280;\n  opacity: 1;\n}\n\ninput::placeholder,textarea::placeholder {\n  color: #6B7280;\n  opacity: 1;\n}\n\n::-webkit-datetime-edit-fields-wrapper {\n  padding: 0;\n}\n\n::-webkit-date-and-time-value {\n  min-height: 1.5em;\n}\n\n::-webkit-datetime-edit,::-webkit-datetime-edit-year-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-meridiem-field {\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\nselect {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\");\n  background-position: right 0.5rem center;\n  background-repeat: no-repeat;\n  background-size: 1.5em 1.5em;\n  padding-right: 2.5rem;\n  -webkit-print-color-adjust: exact;\n          color-adjust: exact;\n}\n\n[multiple] {\n  background-image: initial;\n  background-position: initial;\n  background-repeat: unset;\n  background-size: initial;\n  padding-right: 0.75rem;\n  -webkit-print-color-adjust: unset;\n          color-adjust: unset;\n}\n\n[type='checkbox'],[type='radio'] {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  padding: 0;\n  -webkit-print-color-adjust: exact;\n          color-adjust: exact;\n  display: inline-block;\n  vertical-align: middle;\n  background-origin: border-box;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  flex-shrink: 0;\n  height: 1rem;\n  width: 1rem;\n  color: #1C64F2;\n  background-color: #fff;\n  border-color: #6B7280;\n  border-width: 1px;\n  --tw-shadow: 0 0 #0000;\n}\n\n[type='checkbox'] {\n  border-radius: 0px;\n}\n\n[type='radio'] {\n  border-radius: 100%;\n}\n\n[type='checkbox']:focus,[type='radio']:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\n  --tw-ring-offset-width: 2px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: #1C64F2;\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n\n[type='checkbox']:checked,[type='radio']:checked {\n  border-color: transparent;\n  background-color: currentColor;\n  background-size: 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n[type='checkbox']:checked {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\");\n}\n\n[type='radio']:checked {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e\");\n}\n\n[type='checkbox']:checked:hover,[type='checkbox']:checked:focus,[type='radio']:checked:hover,[type='radio']:checked:focus {\n  border-color: transparent;\n  background-color: currentColor;\n}\n\n[type='checkbox']:indeterminate {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e\");\n  border-color: transparent;\n  background-color: currentColor;\n  background-size: 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n[type='checkbox']:indeterminate:hover,[type='checkbox']:indeterminate:focus {\n  border-color: transparent;\n  background-color: currentColor;\n}\n\n[type='file'] {\n  background: unset;\n  border-color: inherit;\n  border-width: 0;\n  border-radius: 0;\n  padding: 0;\n  font-size: unset;\n  line-height: inherit;\n}\n\n[type='file']:focus {\n  outline: 1px auto -webkit-focus-ring-color;\n}\n\n[type='text'],[type='email'],[type='url'],[type='password'],[type='number'],[type='date'],[type='datetime-local'],[type='month'],[type='search'],[type='tel'],[type='time'],[type='week'],[multiple],textarea,select {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  background-color: #fff;\n  border-color: #6B7280;\n  border-width: 1px;\n  border-radius: 0px;\n  padding-top: 0.5rem;\n  padding-right: 0.75rem;\n  padding-bottom: 0.5rem;\n  padding-left: 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5rem;\n  --tw-shadow: 0 0 #0000;\n}\n\n[type='text']:focus, [type='email']:focus, [type='url']:focus, [type='password']:focus, [type='number']:focus, [type='date']:focus, [type='datetime-local']:focus, [type='month']:focus, [type='search']:focus, [type='tel']:focus, [type='time']:focus, [type='week']:focus, [multiple]:focus, textarea:focus, select:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: #1C64F2;\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  border-color: #1C64F2;\n}\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  color: #6B7280;\n  opacity: 1;\n}\n\ninput::placeholder,textarea::placeholder {\n  color: #6B7280;\n  opacity: 1;\n}\n\n::-webkit-datetime-edit-fields-wrapper {\n  padding: 0;\n}\n\n::-webkit-date-and-time-value {\n  min-height: 1.5em;\n}\n\nselect {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\");\n  background-position: right 0.5rem center;\n  background-repeat: no-repeat;\n  background-size: 1.5em 1.5em;\n  padding-right: 2.5rem;\n  print-color-adjust: exact;\n}\n\n[multiple] {\n  background-image: initial;\n  background-position: initial;\n  background-repeat: unset;\n  background-size: initial;\n  padding-right: 0.75rem;\n  print-color-adjust: unset;\n}\n\n[type='checkbox'],[type='radio'] {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  padding: 0;\n  print-color-adjust: exact;\n  display: inline-block;\n  vertical-align: middle;\n  background-origin: border-box;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  flex-shrink: 0;\n  height: 1rem;\n  width: 1rem;\n  color: #1C64F2;\n  background-color: #fff;\n  border-color: #6B7280;\n  border-width: 1px;\n  --tw-shadow: 0 0 #0000;\n}\n\n[type='checkbox'] {\n  border-radius: 0px;\n}\n\n[type='radio'] {\n  border-radius: 100%;\n}\n\n[type='checkbox']:focus,[type='radio']:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\n  --tw-ring-offset-width: 2px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: #1C64F2;\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n\n[type='checkbox']:checked,[type='radio']:checked,.dark [type='checkbox']:checked,.dark [type='radio']:checked {\n  border-color: transparent;\n  background-color: currentColor;\n  background-size: 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n[type='checkbox']:checked {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\");\n}\n\n[type='radio']:checked {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e\");\n}\n\n[type='checkbox']:indeterminate {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e\");\n  border-color: transparent;\n  background-color: currentColor;\n  background-size: 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n[type='checkbox']:indeterminate:hover,[type='checkbox']:indeterminate:focus {\n  border-color: transparent;\n  background-color: currentColor;\n}\n\n[type='file'] {\n  background: unset;\n  border-color: inherit;\n  border-width: 0;\n  border-radius: 0;\n  padding: 0;\n  font-size: unset;\n  line-height: inherit;\n}\n\n[type='file']:focus {\n  outline: 1px auto inherit;\n}\n\ninput[type=file]::file-selector-button {\n  color: white;\n  background: #1F2937;\n  border: 0;\n  font-weight: 500;\n  font-size: 0.875rem;\n  cursor: pointer;\n  padding-top: 0.625rem;\n  padding-bottom: 0.625rem;\n  padding-left: 2rem;\n  padding-right: 1rem;\n  -webkit-margin-start: -1rem;\n          margin-inline-start: -1rem;\n  -webkit-margin-end: 1rem;\n          margin-inline-end: 1rem;\n}\n\ninput[type=file]::file-selector-button:hover {\n  background: #374151;\n}\n\n.dark input[type=file]::file-selector-button {\n  color: white;\n  background: #4B5563;\n}\n\n.dark input[type=file]::file-selector-button:hover {\n  background: #6B7280;\n}\n\ninput[type=\"range\"]::-webkit-slider-thumb {\n  height: 1.25rem;\n  width: 1.25rem;\n  background: #1C64F2;\n  border-radius: 9999px;\n  border: 0;\n  appearance: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  cursor: pointer;\n}\n\ninput[type=\"range\"]:disabled::-webkit-slider-thumb {\n  background: #9CA3AF;\n}\n\n.dark input[type=\"range\"]:disabled::-webkit-slider-thumb {\n  background: #6B7280;\n}\n\ninput[type=\"range\"]:focus::-webkit-slider-thumb {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n  --tw-ring-opacity: 1px;\n  --tw-ring-color: rgb(164 202 254 / var(--tw-ring-opacity));\n}\n\ninput[type=\"range\"]::-moz-range-thumb {\n  height: 1.25rem;\n  width: 1.25rem;\n  background: #1C64F2;\n  border-radius: 9999px;\n  border: 0;\n  appearance: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  cursor: pointer;\n}\n\ninput[type=\"range\"]:disabled::-moz-range-thumb {\n  background: #9CA3AF;\n}\n\n.dark input[type=\"range\"]:disabled::-moz-range-thumb {\n  background: #6B7280;\n}\n\ninput[type=\"range\"]::-moz-range-progress {\n  background: #3F83F8;\n}\n\ninput[type=\"range\"]::-ms-fill-lower {\n  background: #3F83F8;\n}\n\n[data-popper-arrow],[data-popper-arrow]:before {\n  position: absolute;\n  width: 8px;\n  height: 8px;\n  background: inherit;\n}\n\n[data-popper-arrow] {\n  visibility: hidden;\n}\n\n[data-popper-arrow]:before {\n  content: \"\";\n  visibility: visible;\n  transform: rotate(45deg);\n}\n\n[data-popper-arrow]:after {\n  content: \"\";\n  visibility: visible;\n  transform: rotate(45deg);\n  position: absolute;\n  width: 9px;\n  height: 9px;\n  background: inherit;\n}\n\n[role=\"tooltip\"] > [data-popper-arrow]:before {\n  border-style: solid;\n  border-color: #e5e7eb;\n}\n\n.dark [role=\"tooltip\"] > [data-popper-arrow]:before {\n  border-style: solid;\n  border-color: #4b5563;\n}\n\n[role=\"tooltip\"] > [data-popper-arrow]:after {\n  border-style: solid;\n  border-color: #e5e7eb;\n}\n\n.dark [role=\"tooltip\"] > [data-popper-arrow]:after {\n  border-style: solid;\n  border-color: #4b5563;\n}\n\n[data-popover][role=\"tooltip\"][data-popper-placement^='top'] > [data-popper-arrow]:before {\n  border-bottom-width: 1px;\n  border-right-width: 1px;\n}\n\n[data-popover][role=\"tooltip\"][data-popper-placement^='top'] > [data-popper-arrow]:after {\n  border-bottom-width: 1px;\n  border-right-width: 1px;\n}\n\n[data-popover][role=\"tooltip\"][data-popper-placement^='right'] > [data-popper-arrow]:before {\n  border-bottom-width: 1px;\n  border-left-width: 1px;\n}\n\n[data-popover][role=\"tooltip\"][data-popper-placement^='right'] > [data-popper-arrow]:after {\n  border-bottom-width: 1px;\n  border-left-width: 1px;\n}\n\n[data-popover][role=\"tooltip\"][data-popper-placement^='bottom'] > [data-popper-arrow]:before {\n  border-top-width: 1px;\n  border-left-width: 1px;\n}\n\n[data-popover][role=\"tooltip\"][data-popper-placement^='bottom'] > [data-popper-arrow]:after {\n  border-top-width: 1px;\n  border-left-width: 1px;\n}\n\n[data-popover][role=\"tooltip\"][data-popper-placement^='left'] > [data-popper-arrow]:before {\n  border-top-width: 1px;\n  border-right-width: 1px;\n}\n\n[data-popover][role=\"tooltip\"][data-popper-placement^='left'] > [data-popper-arrow]:after {\n  border-top-width: 1px;\n  border-right-width: 1px;\n}\n\n[data-popover][role=\"tooltip\"][data-popper-placement^='top'] > [data-popper-arrow] {\n  bottom: -5px;\n}\n\n[data-popover][role=\"tooltip\"][data-popper-placement^='bottom'] > [data-popper-arrow] {\n  top: -5px;\n}\n\n[data-popover][role=\"tooltip\"][data-popper-placement^='left'] > [data-popper-arrow] {\n  right: -5px;\n}\n\n[data-popover][role=\"tooltip\"][data-popper-placement^='right'] > [data-popper-arrow] {\n  left: -5px;\n}\n\n*, ::before, ::after {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(63 131 248 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n\n::backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(63 131 248 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n.container {\n  width: 100%;\n  margin-right: auto;\n  margin-left: auto;\n}\n@media (min-width: 360px) {\n\n  .container {\n    max-width: 360px;\n  }\n}\n@media (min-width: 475px) {\n\n  .container {\n    max-width: 475px;\n  }\n}\n@media (min-width: 640px) {\n\n  .container {\n    max-width: 640px;\n  }\n}\n@media (min-width: 768px) {\n\n  .container {\n    max-width: 768px;\n  }\n}\n@media (min-width: 1024px) {\n\n  .container {\n    max-width: 1024px;\n  }\n}\n@media (min-width: 1280px) {\n\n  .container {\n    max-width: 1280px;\n  }\n}\n@media (min-width: 1400px) {\n\n  .container {\n    max-width: 1400px;\n  }\n}\n@media (min-width: 1536px) {\n\n  .container {\n    max-width: 1536px;\n  }\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n.pointer-events-none {\n  pointer-events: none;\n}\n.static {\n  position: static;\n}\n.fixed {\n  position: fixed;\n}\n.absolute {\n  position: absolute;\n}\n.relative {\n  position: relative;\n}\n.sticky {\n  position: sticky;\n}\n.inset-0 {\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.inset-y-0 {\n  top: 0px;\n  bottom: 0px;\n}\n.top-0 {\n  top: 0px;\n}\n.right-0 {\n  right: 0px;\n}\n.left-0 {\n  left: 0px;\n}\n.left-48 {\n  left: 12rem;\n}\n.top-\\[-1px\\] {\n  top: -1px;\n}\n.left-\\[17px\\] {\n  left: 17px;\n}\n.top-1\\/2 {\n  top: 50%;\n}\n.left-1\\/2 {\n  left: 50%;\n}\n.z-0 {\n  z-index: 0;\n}\n.z-40 {\n  z-index: 40;\n}\n.z-50 {\n  z-index: 50;\n}\n.z-10 {\n  z-index: 10;\n}\n.z-20 {\n  z-index: 20;\n}\n.z-30 {\n  z-index: 30;\n}\n.col-span-1 {\n  grid-column: span 1 / span 1;\n}\n.m-auto {\n  margin: auto;\n}\n.m-3 {\n  margin: 0.75rem;\n}\n.m-2 {\n  margin: 0.5rem;\n}\n.m-5 {\n  margin: 1.25rem;\n}\n.mx-auto {\n  margin-left: auto;\n  margin-right: auto;\n}\n.my-6 {\n  margin-top: 1.5rem;\n  margin-bottom: 1.5rem;\n}\n.my-2 {\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.mx-2 {\n  margin-left: 0.5rem;\n  margin-right: 0.5rem;\n}\n.my-10 {\n  margin-top: 2.5rem;\n  margin-bottom: 2.5rem;\n}\n.-mx-8 {\n  margin-left: -2rem;\n  margin-right: -2rem;\n}\n.my-8 {\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n}\n.my-4 {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n}\n.ml-3 {\n  margin-left: 0.75rem;\n}\n.-ml-px {\n  margin-left: -1px;\n}\n.ml-1 {\n  margin-left: 0.25rem;\n}\n.mt-2 {\n  margin-top: 0.5rem;\n}\n.mr-2 {\n  margin-right: 0.5rem;\n}\n.ml-2 {\n  margin-left: 0.5rem;\n}\n.mt-4 {\n  margin-top: 1rem;\n}\n.ml-4 {\n  margin-left: 1rem;\n}\n.mt-8 {\n  margin-top: 2rem;\n}\n.ml-12 {\n  margin-left: 3rem;\n}\n.-mt-px {\n  margin-top: -1px;\n}\n.mr-3 {\n  margin-right: 0.75rem;\n}\n.-ml-1 {\n  margin-left: -0.25rem;\n}\n.mb-4 {\n  margin-bottom: 1rem;\n}\n.mt-3 {\n  margin-top: 0.75rem;\n}\n.-mr-0\\.5 {\n  margin-right: -0.125rem;\n}\n.-mr-0 {\n  margin-right: -0px;\n}\n.-mr-2 {\n  margin-right: -0.5rem;\n}\n.mt-10 {\n  margin-top: 2.5rem;\n}\n.mb-5 {\n  margin-bottom: 1.25rem;\n}\n.mt-1 {\n  margin-top: 0.25rem;\n}\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n.mb-3 {\n  margin-bottom: 0.75rem;\n}\n.mt-5 {\n  margin-top: 1.25rem;\n}\n.mr-1\\.5 {\n  margin-right: 0.375rem;\n}\n.mr-1 {\n  margin-right: 0.25rem;\n}\n.-mb-px {\n  margin-bottom: -1px;\n}\n.mr-5 {\n  margin-right: 1.25rem;\n}\n.block {\n  display: block;\n}\n.inline-block {\n  display: inline-block;\n}\n.inline {\n  display: inline;\n}\n.flex {\n  display: flex;\n}\n.inline-flex {\n  display: inline-flex;\n}\n.table {\n  display: table;\n}\n.grid {\n  display: grid;\n}\n.hidden {\n  display: none;\n}\n.aspect-video {\n  aspect-ratio: 16 / 9;\n}\n.h-5 {\n  height: 1.25rem;\n}\n.h-8 {\n  height: 2rem;\n}\n.h-16 {\n  height: 4rem;\n}\n.h-60 {\n  height: 15rem;\n}\n.h-9 {\n  height: 2.25rem;\n}\n.h-4 {\n  height: 1rem;\n}\n.h-6 {\n  height: 1.5rem;\n}\n.h-auto {\n  height: auto;\n}\n.h-screen {\n  height: 100vh;\n}\n.h-20 {\n  height: 5rem;\n}\n.h-24 {\n  height: 6rem;\n}\n.h-56 {\n  height: 14rem;\n}\n.h-full {\n  height: 100%;\n}\n.max-h-max {\n  max-height: -moz-max-content;\n  max-height: max-content;\n}\n.max-h-44 {\n  max-height: 11rem;\n}\n.min-h-screen {\n  min-height: 100vh;\n}\n.w-5 {\n  width: 1.25rem;\n}\n.w-8 {\n  width: 2rem;\n}\n.w-auto {\n  width: auto;\n}\n.w-48 {\n  width: 12rem;\n}\n.w-full {\n  width: 100%;\n}\n.w-9 {\n  width: 2.25rem;\n}\n.w-14 {\n  width: 3.5rem;\n}\n.w-4 {\n  width: 1rem;\n}\n.w-6 {\n  width: 1.5rem;\n}\n.w-20 {\n  width: 5rem;\n}\n.w-3\\/4 {\n  width: 75%;\n}\n.w-2\\/5 {\n  width: 40%;\n}\n.w-1\\/5 {\n  width: 20%;\n}\n.w-3 {\n  width: 0.75rem;\n}\n.w-1\\/4 {\n  width: 25%;\n}\n.w-72 {\n  width: 18rem;\n}\n.w-16 {\n  width: 4rem;\n}\n.w-0 {\n  width: 0px;\n}\n.w-1\\/2 {\n  width: 50%;\n}\n.max-w-6xl {\n  max-width: 72rem;\n}\n.max-w-7xl {\n  max-width: 80rem;\n}\n.max-w-screen-xl {\n  max-width: 1280px;\n}\n.max-w-\\[8rem\\] {\n  max-width: 8rem;\n}\n.flex-1 {\n  flex: 1 1 0%;\n}\n.flex-shrink-0 {\n  flex-shrink: 0;\n}\n.shrink-0 {\n  flex-shrink: 0;\n}\n.flex-grow {\n  flex-grow: 1;\n}\n.origin-top {\n  transform-origin: top;\n}\n.origin-top-left {\n  transform-origin: top left;\n}\n.origin-top-right {\n  transform-origin: top right;\n}\n.translate-x-28 {\n  --tw-translate-x: 7rem;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.-translate-x-full {\n  --tw-translate-x: -100%;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.-translate-x-1\\/2 {\n  --tw-translate-x: -50%;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.-translate-y-1\\/2 {\n  --tw-translate-y: -50%;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.translate-x-0 {\n  --tw-translate-x: 0px;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.scale-95 {\n  --tw-scale-x: .95;\n  --tw-scale-y: .95;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.scale-100 {\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.transform {\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.cursor-default {\n  cursor: default;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n.snap-x {\n  scroll-snap-type: x var(--tw-scroll-snap-strictness);\n}\n.snap-mandatory {\n  --tw-scroll-snap-strictness: mandatory;\n}\n.snap-start {\n  scroll-snap-align: start;\n}\n.snap-always {\n  scroll-snap-stop: always;\n}\n.list-inside {\n  list-style-position: inside;\n}\n.list-none {\n  list-style-type: none;\n}\n.list-disc {\n  list-style-type: disc;\n}\n.grid-flow-col-dense {\n  grid-auto-flow: column dense;\n}\n.grid-cols-1 {\n  grid-template-columns: repeat(1, minmax(0, 1fr));\n}\n.grid-cols-2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.grid-rows-2 {\n  grid-template-rows: repeat(2, minmax(0, 1fr));\n}\n.flex-row {\n  flex-direction: row;\n}\n.flex-col {\n  flex-direction: column;\n}\n.flex-wrap {\n  flex-wrap: wrap;\n}\n.flex-nowrap {\n  flex-wrap: nowrap;\n}\n.items-start {\n  align-items: flex-start;\n}\n.items-center {\n  align-items: center;\n}\n.justify-start {\n  justify-content: flex-start;\n}\n.justify-end {\n  justify-content: flex-end;\n}\n.justify-center {\n  justify-content: center;\n}\n.justify-between {\n  justify-content: space-between;\n}\n.justify-items-center {\n  justify-items: center;\n}\n.gap-4 {\n  gap: 1rem;\n}\n.gap-6 {\n  gap: 1.5rem;\n}\n.gap-3\\.5 {\n  gap: 0.875rem;\n}\n.gap-3 {\n  gap: 0.75rem;\n}\n.gap-1 {\n  gap: 0.25rem;\n}\n.gap-2 {\n  gap: 0.5rem;\n}\n.space-x-8 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-x-reverse: 0;\n  margin-right: calc(2rem * var(--tw-space-x-reverse));\n  margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));\n}\n.space-y-1 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));\n}\n.space-y-3 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));\n}\n.divide-y > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-y-reverse: 0;\n  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));\n  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));\n}\n.divide-slate-300 > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-opacity: 1;\n  border-color: rgb(203 213 225 / var(--tw-divide-opacity));\n}\n.self-center {\n  align-self: center;\n}\n.overflow-auto {\n  overflow: auto;\n}\n.overflow-hidden {\n  overflow: hidden;\n}\n.overflow-x-auto {\n  overflow-x: auto;\n}\n.overflow-y-auto {\n  overflow-y: auto;\n}\n.truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.text-ellipsis {\n  text-overflow: ellipsis;\n}\n.whitespace-normal {\n  white-space: normal;\n}\n.whitespace-nowrap {\n  white-space: nowrap;\n}\n.whitespace-pre {\n  white-space: pre;\n}\n.whitespace-pre-wrap {\n  white-space: pre-wrap;\n}\n.rounded-md {\n  border-radius: 0.375rem;\n}\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n.rounded {\n  border-radius: 0.25rem;\n}\n.rounded-full {\n  border-radius: 9999px;\n}\n.rounded-l-md {\n  border-top-left-radius: 0.375rem;\n  border-bottom-left-radius: 0.375rem;\n}\n.rounded-r-md {\n  border-top-right-radius: 0.375rem;\n  border-bottom-right-radius: 0.375rem;\n}\n.rounded-l-lg {\n  border-top-left-radius: 0.5rem;\n  border-bottom-left-radius: 0.5rem;\n}\n.rounded-r-lg {\n  border-top-right-radius: 0.5rem;\n  border-bottom-right-radius: 0.5rem;\n}\n.rounded-t-lg {\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n}\n.rounded-t-md {\n  border-top-left-radius: 0.375rem;\n  border-top-right-radius: 0.375rem;\n}\n.border {\n  border-width: 1px;\n}\n.border-2 {\n  border-width: 2px;\n}\n.border-0 {\n  border-width: 0px;\n}\n.border-y-2 {\n  border-top-width: 2px;\n  border-bottom-width: 2px;\n}\n.border-y {\n  border-top-width: 1px;\n  border-bottom-width: 1px;\n}\n.border-t {\n  border-top-width: 1px;\n}\n.border-t-2 {\n  border-top-width: 2px;\n}\n.border-b-2 {\n  border-bottom-width: 2px;\n}\n.border-l-4 {\n  border-left-width: 4px;\n}\n.border-b {\n  border-bottom-width: 1px;\n}\n.border-t-4 {\n  border-top-width: 4px;\n}\n.border-gray-300 {\n  --tw-border-opacity: 1;\n  border-color: rgb(209 213 219 / var(--tw-border-opacity));\n}\n.border-gray-200 {\n  --tw-border-opacity: 1;\n  border-color: rgb(229 231 235 / var(--tw-border-opacity));\n}\n.border-transparent {\n  border-color: transparent;\n}\n.border-slate-500 {\n  --tw-border-opacity: 1;\n  border-color: rgb(100 116 139 / var(--tw-border-opacity));\n}\n.border-indigo-400 {\n  --tw-border-opacity: 1;\n  border-color: rgb(141 162 251 / var(--tw-border-opacity));\n}\n.border-sky-400 {\n  --tw-border-opacity: 1;\n  border-color: rgb(56 189 248 / var(--tw-border-opacity));\n}\n.border-gray-100 {\n  --tw-border-opacity: 1;\n  border-color: rgb(243 244 246 / var(--tw-border-opacity));\n}\n.border-slate-900 {\n  --tw-border-opacity: 1;\n  border-color: rgb(15 23 42 / var(--tw-border-opacity));\n}\n.border-sky-900 {\n  --tw-border-opacity: 1;\n  border-color: rgb(12 74 110 / var(--tw-border-opacity));\n}\n.border-slate-600 {\n  --tw-border-opacity: 1;\n  border-color: rgb(71 85 105 / var(--tw-border-opacity));\n}\n.border-slate-200 {\n  --tw-border-opacity: 1;\n  border-color: rgb(226 232 240 / var(--tw-border-opacity));\n}\n.border-slate-400 {\n  --tw-border-opacity: 1;\n  border-color: rgb(148 163 184 / var(--tw-border-opacity));\n}\n.border-sky-500 {\n  --tw-border-opacity: 1;\n  border-color: rgb(14 165 233 / var(--tw-border-opacity));\n}\n.border-sky-700 {\n  --tw-border-opacity: 1;\n  border-color: rgb(3 105 161 / var(--tw-border-opacity));\n}\n.border-sky-300 {\n  --tw-border-opacity: 1;\n  border-color: rgb(125 211 252 / var(--tw-border-opacity));\n}\n.border-t-sky-600 {\n  --tw-border-opacity: 1;\n  border-top-color: rgb(2 132 199 / var(--tw-border-opacity));\n}\n.bg-white {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity));\n}\n.bg-gray-100 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 244 246 / var(--tw-bg-opacity));\n}\n.bg-blue-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(63 131 248 / var(--tw-bg-opacity));\n}\n.bg-slate-200 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(226 232 240 / var(--tw-bg-opacity));\n}\n.bg-sky-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(2 132 199 / var(--tw-bg-opacity));\n}\n.bg-blue-700 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(26 86 219 / var(--tw-bg-opacity));\n}\n.bg-transparent {\n  background-color: transparent;\n}\n.bg-indigo-50 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(240 245 255 / var(--tw-bg-opacity));\n}\n.bg-yellow-300 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(250 202 21 / var(--tw-bg-opacity));\n}\n.bg-red-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(224 36 36 / var(--tw-bg-opacity));\n}\n.bg-blue-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(28 100 242 / var(--tw-bg-opacity));\n}\n.bg-green-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(14 159 110 / var(--tw-bg-opacity));\n}\n.bg-indigo-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(104 117 245 / var(--tw-bg-opacity));\n}\n.bg-gray-50 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 250 251 / var(--tw-bg-opacity));\n}\n.bg-blue-100 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(225 239 254 / var(--tw-bg-opacity));\n}\n.bg-\\[\\#0e0e0e\\] {\n  --tw-bg-opacity: 1;\n  background-color: rgb(14 14 14 / var(--tw-bg-opacity));\n}\n.bg-sky-400 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(56 189 248 / var(--tw-bg-opacity));\n}\n.bg-slate-50 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(248 250 252 / var(--tw-bg-opacity));\n}\n.bg-red-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(240 82 82 / var(--tw-bg-opacity));\n}\n.bg-white\\/30 {\n  background-color: rgb(255 255 255 / 0.3);\n}\n.bg-sky-900 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(12 74 110 / var(--tw-bg-opacity));\n}\n.bg-gradient-to-br {\n  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));\n}\n.from-teal-300 {\n  --tw-gradient-from: #7EDCE2;\n  --tw-gradient-to: rgb(126 220 226 / 0);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n}\n.from-cyan-300 {\n  --tw-gradient-from: #67e8f9;\n  --tw-gradient-to: rgb(103 232 249 / 0);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n}\n.to-sky-400 {\n  --tw-gradient-to: #38bdf8;\n}\n.to-sky-500 {\n  --tw-gradient-to: #0ea5e9;\n}\n.bg-cover {\n  background-size: cover;\n}\n.bg-center {\n  background-position: center;\n}\n.fill-current {\n  fill: currentColor;\n}\n.object-cover {\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.p-6 {\n  padding: 1.5rem;\n}\n.p-2 {\n  padding: 0.5rem;\n}\n.p-5 {\n  padding: 1.25rem;\n}\n.p-1 {\n  padding: 0.25rem;\n}\n.p-4 {\n  padding: 1rem;\n}\n.p-2\\.5 {\n  padding: 0.625rem;\n}\n.p-3 {\n  padding: 0.75rem;\n}\n.p-0\\.5 {\n  padding: 0.125rem;\n}\n.p-0 {\n  padding: 0px;\n}\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n.py-4 {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n.px-6 {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n.py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n.px-3\\.5 {\n  padding-left: 0.875rem;\n  padding-right: 0.875rem;\n}\n.px-3 {\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\n.py-2\\.5 {\n  padding-top: 0.625rem;\n  padding-bottom: 0.625rem;\n}\n.px-5 {\n  padding-left: 1.25rem;\n  padding-right: 1.25rem;\n}\n.py-3 {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n}\n.px-1 {\n  padding-left: 0.25rem;\n  padding-right: 0.25rem;\n}\n.py-6 {\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n}\n.py-0 {\n  padding-top: 0px;\n  padding-bottom: 0px;\n}\n.px-10 {\n  padding-left: 2.5rem;\n  padding-right: 2.5rem;\n}\n.py-10 {\n  padding-top: 2.5rem;\n  padding-bottom: 2.5rem;\n}\n.py-5 {\n  padding-top: 1.25rem;\n  padding-bottom: 1.25rem;\n}\n.px-8 {\n  padding-left: 2rem;\n  padding-right: 2rem;\n}\n.py-12 {\n  padding-top: 3rem;\n  padding-bottom: 3rem;\n}\n.px-0 {\n  padding-left: 0px;\n  padding-right: 0px;\n}\n.pt-8 {\n  padding-top: 2rem;\n}\n.pt-1 {\n  padding-top: 0.25rem;\n}\n.pl-3 {\n  padding-left: 0.75rem;\n}\n.pr-4 {\n  padding-right: 1rem;\n}\n.pt-2 {\n  padding-top: 0.5rem;\n}\n.pb-3 {\n  padding-bottom: 0.75rem;\n}\n.pt-4 {\n  padding-top: 1rem;\n}\n.pb-1 {\n  padding-bottom: 0.25rem;\n}\n.pb-8 {\n  padding-bottom: 2rem;\n}\n.pl-10 {\n  padding-left: 2.5rem;\n}\n.pb-2 {\n  padding-bottom: 0.5rem;\n}\n.pr-3 {\n  padding-right: 0.75rem;\n}\n.text-left {\n  text-align: left;\n}\n.text-center {\n  text-align: center;\n}\n.align-baseline {\n  vertical-align: baseline;\n}\n.align-middle {\n  vertical-align: middle;\n}\n.font-sans {\n  font-family: Nunito, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n}\n.text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n.text-lg {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n.text-xs {\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n.text-xl {\n  font-size: 1.25rem;\n  line-height: 1.75rem;\n}\n.text-base {\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n.text-2xl {\n  font-size: 1.5rem;\n  line-height: 2rem;\n}\n.text-\\[10px\\] {\n  font-size: 10px;\n}\n.font-medium {\n  font-weight: 500;\n}\n.font-semibold {\n  font-weight: 600;\n}\n.font-normal {\n  font-weight: 400;\n}\n.font-bold {\n  font-weight: 700;\n}\n.uppercase {\n  text-transform: uppercase;\n}\n.leading-5 {\n  line-height: 1.25rem;\n}\n.leading-7 {\n  line-height: 1.75rem;\n}\n.leading-4 {\n  line-height: 1rem;\n}\n.leading-tight {\n  line-height: 1.25;\n}\n.leading-none {\n  line-height: 1;\n}\n.leading-normal {\n  line-height: 1.5;\n}\n.tracking-widest {\n  letter-spacing: 0.1em;\n}\n.tracking-tight {\n  letter-spacing: -0.025em;\n}\n.text-gray-500 {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity));\n}\n.text-gray-700 {\n  --tw-text-opacity: 1;\n  color: rgb(55 65 81 / var(--tw-text-opacity));\n}\n.text-gray-200 {\n  --tw-text-opacity: 1;\n  color: rgb(229 231 235 / var(--tw-text-opacity));\n}\n.text-gray-300 {\n  --tw-text-opacity: 1;\n  color: rgb(209 213 219 / var(--tw-text-opacity));\n}\n.text-gray-400 {\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity));\n}\n.text-gray-600 {\n  --tw-text-opacity: 1;\n  color: rgb(75 85 99 / var(--tw-text-opacity));\n}\n.text-gray-900 {\n  --tw-text-opacity: 1;\n  color: rgb(17 24 39 / var(--tw-text-opacity));\n}\n.text-white {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.text-indigo-600 {\n  --tw-text-opacity: 1;\n  color: rgb(88 80 236 / var(--tw-text-opacity));\n}\n.text-slate-700 {\n  --tw-text-opacity: 1;\n  color: rgb(51 65 85 / var(--tw-text-opacity));\n}\n.text-slate-900 {\n  --tw-text-opacity: 1;\n  color: rgb(15 23 42 / var(--tw-text-opacity));\n}\n.text-slate-800 {\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity));\n}\n.text-indigo-700 {\n  --tw-text-opacity: 1;\n  color: rgb(81 69 205 / var(--tw-text-opacity));\n}\n.text-red-600 {\n  --tw-text-opacity: 1;\n  color: rgb(224 36 36 / var(--tw-text-opacity));\n}\n.text-gray-800 {\n  --tw-text-opacity: 1;\n  color: rgb(31 41 55 / var(--tw-text-opacity));\n}\n.text-black {\n  --tw-text-opacity: 1;\n  color: rgb(0 0 0 / var(--tw-text-opacity));\n}\n.text-sky-600 {\n  --tw-text-opacity: 1;\n  color: rgb(2 132 199 / var(--tw-text-opacity));\n}\n.text-red-500 {\n  --tw-text-opacity: 1;\n  color: rgb(240 82 82 / var(--tw-text-opacity));\n}\n.text-blue-700 {\n  --tw-text-opacity: 1;\n  color: rgb(26 86 219 / var(--tw-text-opacity));\n}\n.text-gray-100 {\n  --tw-text-opacity: 1;\n  color: rgb(243 244 246 / var(--tw-text-opacity));\n}\n.text-slate-600 {\n  --tw-text-opacity: 1;\n  color: rgb(71 85 105 / var(--tw-text-opacity));\n}\n.text-cyan-500 {\n  --tw-text-opacity: 1;\n  color: rgb(6 182 212 / var(--tw-text-opacity));\n}\n.text-slate-500 {\n  --tw-text-opacity: 1;\n  color: rgb(100 116 139 / var(--tw-text-opacity));\n}\n.text-green-600 {\n  --tw-text-opacity: 1;\n  color: rgb(5 122 85 / var(--tw-text-opacity));\n}\n.underline {\n  -webkit-text-decoration-line: underline;\n          text-decoration-line: underline;\n}\n.line-through {\n  -webkit-text-decoration-line: line-through;\n          text-decoration-line: line-through;\n}\n.antialiased {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.opacity-25 {\n  opacity: 0.25;\n}\n.opacity-0 {\n  opacity: 0;\n}\n.opacity-100 {\n  opacity: 1;\n}\n.shadow-sm {\n  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow {\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow-lg {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow-md {\n  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.ring-1 {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n.ring-gray-300 {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(209 213 219 / var(--tw-ring-opacity));\n}\n.ring-black {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(0 0 0 / var(--tw-ring-opacity));\n}\n.ring-opacity-5 {\n  --tw-ring-opacity: 0.05;\n}\n.drop-shadow-lg {\n  --tw-drop-shadow: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n.transition {\n  transition-property: color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-all {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.duration-150 {\n  transition-duration: 150ms;\n}\n.duration-200 {\n  transition-duration: 200ms;\n}\n.duration-75 {\n  transition-duration: 75ms;\n}\n.duration-100 {\n  transition-duration: 100ms;\n}\n.duration-500 {\n  transition-duration: 500ms;\n}\n.ease-in-out {\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n}\n.ease-out {\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n.ease-in {\n  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);\n}\n.ease-linear {\n  transition-timing-function: linear;\n}\n.line-clamp-2 {\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n.line-clamp-3 {\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n}\n.scrollbar-hide {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.scrollbar-hide::-webkit-scrollbar {\n  display: none;\n}\n\n/*\n“Have the courage to follow your heart and intuition. They somehow already know what you truly want to become. Everything else is secondary.”\n― Steve Jobs\n*/\n\n.hover\\:cursor-pointer:hover {\n  cursor: pointer;\n}\n\n.hover\\:border-gray-300:hover {\n  --tw-border-opacity: 1;\n  border-color: rgb(209 213 219 / var(--tw-border-opacity));\n}\n\n.hover\\:border-slate-900:hover {\n  --tw-border-opacity: 1;\n  border-color: rgb(15 23 42 / var(--tw-border-opacity));\n}\n\n.hover\\:bg-gray-100:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 244 246 / var(--tw-bg-opacity));\n}\n\n.hover\\:bg-blue-800:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(30 66 159 / var(--tw-bg-opacity));\n}\n\n.hover\\:bg-slate-50:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(248 250 252 / var(--tw-bg-opacity));\n}\n\n.hover\\:bg-slate-100:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(241 245 249 / var(--tw-bg-opacity));\n}\n\n.hover\\:bg-sky-300:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(125 211 252 / var(--tw-bg-opacity));\n}\n\n.hover\\:bg-gray-50:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 250 251 / var(--tw-bg-opacity));\n}\n\n.hover\\:bg-indigo-600:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(88 80 236 / var(--tw-bg-opacity));\n}\n\n.hover\\:bg-gray-800:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(31 41 55 / var(--tw-bg-opacity));\n}\n\n.hover\\:bg-sky-800:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(7 89 133 / var(--tw-bg-opacity));\n}\n\n.hover\\:text-gray-500:hover {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity));\n}\n\n.hover\\:text-gray-400:hover {\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity));\n}\n\n.hover\\:text-slate-700:hover {\n  --tw-text-opacity: 1;\n  color: rgb(51 65 85 / var(--tw-text-opacity));\n}\n\n.hover\\:text-gray-700:hover {\n  --tw-text-opacity: 1;\n  color: rgb(55 65 81 / var(--tw-text-opacity));\n}\n\n.hover\\:text-white:hover {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n\n.hover\\:text-gray-800:hover {\n  --tw-text-opacity: 1;\n  color: rgb(31 41 55 / var(--tw-text-opacity));\n}\n\n.hover\\:text-red-500:hover {\n  --tw-text-opacity: 1;\n  color: rgb(240 82 82 / var(--tw-text-opacity));\n}\n\n.hover\\:text-slate-900:hover {\n  --tw-text-opacity: 1;\n  color: rgb(15 23 42 / var(--tw-text-opacity));\n}\n\n.hover\\:text-gray-900:hover {\n  --tw-text-opacity: 1;\n  color: rgb(17 24 39 / var(--tw-text-opacity));\n}\n\n.hover\\:underline:hover {\n  -webkit-text-decoration-line: underline;\n          text-decoration-line: underline;\n}\n\n.focus\\:z-10:focus {\n  z-index: 10;\n}\n\n.focus\\:border-blue-300:focus {\n  --tw-border-opacity: 1;\n  border-color: rgb(164 202 254 / var(--tw-border-opacity));\n}\n\n.focus\\:border-indigo-300:focus {\n  --tw-border-opacity: 1;\n  border-color: rgb(180 198 252 / var(--tw-border-opacity));\n}\n\n.focus\\:border-indigo-700:focus {\n  --tw-border-opacity: 1;\n  border-color: rgb(81 69 205 / var(--tw-border-opacity));\n}\n\n.focus\\:border-gray-300:focus {\n  --tw-border-opacity: 1;\n  border-color: rgb(209 213 219 / var(--tw-border-opacity));\n}\n\n.focus\\:border-blue-500:focus {\n  --tw-border-opacity: 1;\n  border-color: rgb(63 131 248 / var(--tw-border-opacity));\n}\n\n.focus\\:border-blue-400:focus {\n  --tw-border-opacity: 1;\n  border-color: rgb(118 169 250 / var(--tw-border-opacity));\n}\n\n.focus\\:bg-gray-100:focus {\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 244 246 / var(--tw-bg-opacity));\n}\n\n.focus\\:bg-sky-400:focus {\n  --tw-bg-opacity: 1;\n  background-color: rgb(56 189 248 / var(--tw-bg-opacity));\n}\n\n.focus\\:bg-indigo-100:focus {\n  --tw-bg-opacity: 1;\n  background-color: rgb(229 237 255 / var(--tw-bg-opacity));\n}\n\n.focus\\:text-gray-700:focus {\n  --tw-text-opacity: 1;\n  color: rgb(55 65 81 / var(--tw-text-opacity));\n}\n\n.focus\\:text-white:focus {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n\n.focus\\:text-indigo-800:focus {\n  --tw-text-opacity: 1;\n  color: rgb(66 56 157 / var(--tw-text-opacity));\n}\n\n.focus\\:text-gray-500:focus {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity));\n}\n\n.focus\\:outline-none:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n\n.focus\\:ring:focus {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.focus\\:ring-4:focus {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.focus\\:ring-2:focus {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.focus\\:ring-indigo-200:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(205 219 254 / var(--tw-ring-opacity));\n}\n\n.focus\\:ring-blue-300:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(164 202 254 / var(--tw-ring-opacity));\n}\n\n.focus\\:ring-sky-700:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(3 105 161 / var(--tw-ring-opacity));\n}\n\n.focus\\:ring-blue-500:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(63 131 248 / var(--tw-ring-opacity));\n}\n\n.focus\\:ring-slate-300:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(203 213 225 / var(--tw-ring-opacity));\n}\n\n.focus\\:ring-blue-400:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(118 169 250 / var(--tw-ring-opacity));\n}\n\n.focus\\:ring-cyan-200:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(165 243 252 / var(--tw-ring-opacity));\n}\n\n.focus\\:ring-opacity-50:focus {\n  --tw-ring-opacity: 0.5;\n}\n\n.focus-visible\\:ring-2:focus-visible {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.focus-visible\\:ring-white:focus-visible {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(255 255 255 / var(--tw-ring-opacity));\n}\n\n.focus-visible\\:ring-opacity-75:focus-visible {\n  --tw-ring-opacity: 0.75;\n}\n\n.active\\:bg-gray-100:active {\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 244 246 / var(--tw-bg-opacity));\n}\n\n.active\\:bg-blue-900:active {\n  --tw-bg-opacity: 1;\n  background-color: rgb(35 56 118 / var(--tw-bg-opacity));\n}\n\n.active\\:text-gray-700:active {\n  --tw-text-opacity: 1;\n  color: rgb(55 65 81 / var(--tw-text-opacity));\n}\n\n.active\\:text-gray-500:active {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity));\n}\n\n.group:hover .group-hover\\:left-14 {\n  left: 3.5rem;\n}\n\n.group:hover .group-hover\\:w-fit {\n  width: -moz-fit-content;\n  width: fit-content;\n}\n\n.group:hover .group-hover\\:bg-white\\/50 {\n  background-color: rgb(255 255 255 / 0.5);\n}\n\n.group:hover .group-hover\\:bg-opacity-0 {\n  --tw-bg-opacity: 0;\n}\n\n.group:hover .group-hover\\:from-cyan-500 {\n  --tw-gradient-from: #06b6d4;\n  --tw-gradient-to: rgb(6 182 212 / 0);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n}\n\n.group:hover .group-hover\\:from-cyan-300 {\n  --tw-gradient-from: #67e8f9;\n  --tw-gradient-to: rgb(103 232 249 / 0);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n}\n\n.group:hover .group-hover\\:to-blue-500 {\n  --tw-gradient-to: #3F83F8;\n}\n\n.group:hover .group-hover\\:to-sky-500 {\n  --tw-gradient-to: #0ea5e9;\n}\n\n.group:hover .group-hover\\:px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n\n.group:hover .group-hover\\:py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n\n.group:hover .group-hover\\:duration-300 {\n  transition-duration: 300ms;\n}\n\n.group:focus .group-focus\\:outline-none {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n\n.group:focus .group-focus\\:ring-4 {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.group:focus .group-focus\\:ring-white {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(255 255 255 / var(--tw-ring-opacity));\n}\n\n.dark .dark\\:border-gray-700 {\n  --tw-border-opacity: 1;\n  border-color: rgb(55 65 81 / var(--tw-border-opacity));\n}\n\n.dark .dark\\:border-gray-600 {\n  --tw-border-opacity: 1;\n  border-color: rgb(75 85 99 / var(--tw-border-opacity));\n}\n\n.dark .dark\\:bg-gray-900 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(17 24 39 / var(--tw-bg-opacity));\n}\n\n.dark .dark\\:bg-gray-800 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(31 41 55 / var(--tw-bg-opacity));\n}\n\n.dark .dark\\:bg-blue-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(28 100 242 / var(--tw-bg-opacity));\n}\n\n.dark .dark\\:bg-gray-700 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(55 65 81 / var(--tw-bg-opacity));\n}\n\n.dark .dark\\:bg-blue-200 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(195 221 253 / var(--tw-bg-opacity));\n}\n\n.dark .dark\\:bg-gray-800\\/30 {\n  background-color: rgb(31 41 55 / 0.3);\n}\n\n.dark .dark\\:text-gray-500 {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity));\n}\n\n.dark .dark\\:text-white {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n\n.dark .dark\\:text-gray-400 {\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity));\n}\n\n.dark .dark\\:text-blue-800 {\n  --tw-text-opacity: 1;\n  color: rgb(30 66 159 / var(--tw-text-opacity));\n}\n\n.dark .dark\\:text-gray-300 {\n  --tw-text-opacity: 1;\n  color: rgb(209 213 219 / var(--tw-text-opacity));\n}\n\n.dark .dark\\:text-gray-800 {\n  --tw-text-opacity: 1;\n  color: rgb(31 41 55 / var(--tw-text-opacity));\n}\n\n.dark .dark\\:placeholder-gray-400::-moz-placeholder {\n  --tw-placeholder-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-placeholder-opacity));\n}\n\n.dark .dark\\:placeholder-gray-400::placeholder {\n  --tw-placeholder-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-placeholder-opacity));\n}\n\n.dark .dark\\:hover\\:bg-blue-700:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(26 86 219 / var(--tw-bg-opacity));\n}\n\n.dark .dark\\:focus\\:border-blue-500:focus {\n  --tw-border-opacity: 1;\n  border-color: rgb(63 131 248 / var(--tw-border-opacity));\n}\n\n.dark .dark\\:focus\\:ring-blue-800:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(30 66 159 / var(--tw-ring-opacity));\n}\n\n.dark .dark\\:focus\\:ring-blue-500:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(63 131 248 / var(--tw-ring-opacity));\n}\n\n.dark .group:hover .dark\\:group-hover\\:bg-gray-800\\/60 {\n  background-color: rgb(31 41 55 / 0.6);\n}\n\n.dark .group:focus .dark\\:group-focus\\:ring-gray-800\\/70 {\n  --tw-ring-color: rgb(31 41 55 / 0.7);\n}\n\n@media (min-width: 640px) {\n\n  .sm\\:-my-px {\n    margin-top: -1px;\n    margin-bottom: -1px;\n  }\n\n  .sm\\:mx-auto {\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .sm\\:ml-0 {\n    margin-left: 0px;\n  }\n\n  .sm\\:ml-10 {\n    margin-left: 2.5rem;\n  }\n\n  .sm\\:ml-6 {\n    margin-left: 1.5rem;\n  }\n\n  .sm\\:block {\n    display: block;\n  }\n\n  .sm\\:flex {\n    display: flex;\n  }\n\n  .sm\\:grid {\n    display: grid;\n  }\n\n  .sm\\:hidden {\n    display: none;\n  }\n\n  .sm\\:h-20 {\n    height: 5rem;\n  }\n\n  .sm\\:h-10 {\n    height: 2.5rem;\n  }\n\n  .sm\\:h-6 {\n    height: 1.5rem;\n  }\n\n  .sm\\:w-auto {\n    width: auto;\n  }\n\n  .sm\\:w-10 {\n    width: 2.5rem;\n  }\n\n  .sm\\:w-6 {\n    width: 1.5rem;\n  }\n\n  .sm\\:w-1\\/4 {\n    width: 25%;\n  }\n\n  .sm\\:max-w-md {\n    max-width: 28rem;\n  }\n\n  .sm\\:max-w-2xl {\n    max-width: 42rem;\n  }\n\n  .sm\\:flex-1 {\n    flex: 1 1 0%;\n  }\n\n  .sm\\:grid-cols-3 {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n\n  .sm\\:items-center {\n    align-items: center;\n  }\n\n  .sm\\:justify-start {\n    justify-content: flex-start;\n  }\n\n  .sm\\:justify-center {\n    justify-content: center;\n  }\n\n  .sm\\:justify-between {\n    justify-content: space-between;\n  }\n\n  .sm\\:gap-2 {\n    gap: 0.5rem;\n  }\n\n  .sm\\:rounded-lg {\n    border-radius: 0.5rem;\n  }\n\n  .sm\\:px-6 {\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n  }\n\n  .sm\\:px-4 {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n\n  .sm\\:py-6 {\n    padding-top: 1.5rem;\n    padding-bottom: 1.5rem;\n  }\n\n  .sm\\:pt-0 {\n    padding-top: 0px;\n  }\n\n  .sm\\:text-left {\n    text-align: left;\n  }\n\n  .sm\\:text-center {\n    text-align: center;\n  }\n\n  .sm\\:text-right {\n    text-align: right;\n  }\n\n  .sm\\:text-2xl {\n    font-size: 1.5rem;\n    line-height: 2rem;\n  }\n}\n\n@media (min-width: 768px) {\n\n  .md\\:order-2 {\n    order: 2;\n  }\n\n  .md\\:order-1 {\n    order: 1;\n  }\n\n  .md\\:mr-0 {\n    margin-right: 0px;\n  }\n\n  .md\\:block {\n    display: block;\n  }\n\n  .md\\:flex {\n    display: flex;\n  }\n\n  .md\\:hidden {\n    display: none;\n  }\n\n  .md\\:h-full {\n    height: 100%;\n  }\n\n  .md\\:w-auto {\n    width: auto;\n  }\n\n  .md\\:w-\\[65\\%\\] {\n    width: 65%;\n  }\n\n  .md\\:w-\\[35\\%\\] {\n    width: 35%;\n  }\n\n  .md\\:max-w-\\[10rem\\] {\n    max-width: 10rem;\n  }\n\n  .md\\:grid-cols-2 {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .md\\:grid-cols-4 {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n  }\n\n  .md\\:border-t-0 {\n    border-top-width: 0px;\n  }\n\n  .md\\:border-l {\n    border-left-width: 1px;\n  }\n\n  .md\\:pl-2 {\n    padding-left: 0.5rem;\n  }\n}\n\n@media (min-width: 1024px) {\n\n  .lg\\:col-span-4 {\n    grid-column: span 4 / span 4;\n  }\n\n  .lg\\:col-span-2 {\n    grid-column: span 2 / span 2;\n  }\n\n  .lg\\:row-span-6 {\n    grid-row: span 6 / span 6;\n  }\n\n  .lg\\:row-span-3 {\n    grid-row: span 3 / span 3;\n  }\n\n  .lg\\:mb-4 {\n    margin-bottom: 1rem;\n  }\n\n  .lg\\:block {\n    display: block;\n  }\n\n  .lg\\:h-full {\n    height: 100%;\n  }\n\n  .lg\\:h-2\\/4 {\n    height: 50%;\n  }\n\n  .lg\\:max-w-\\[11rem\\] {\n    max-width: 11rem;\n  }\n\n  .lg\\:grid-cols-6 {\n    grid-template-columns: repeat(6, minmax(0, 1fr));\n  }\n\n  .lg\\:grid-rows-6 {\n    grid-template-rows: repeat(6, minmax(0, 1fr));\n  }\n\n  .lg\\:px-8 {\n    padding-left: 2rem;\n    padding-right: 2rem;\n  }\n\n  .lg\\:text-3xl {\n    font-size: 1.875rem;\n    line-height: 2.25rem;\n  }\n}\n", "",{"version":3,"sources":["webpack://./node_modules/flowbite/src/flowbite.css","<no source>"],"names":[],"mappings":"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AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,iBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,mBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,gBAAmB;EAAnB;AAAmB;AAAnB;EAAA,gBAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EA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AAnB;EAAA;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,2BAAmB;EAAnB,sCAAmB;EAAnB;AAAmB;AAAnB;EAAA,2BAAmB;EAAnB,sCAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,oBAAmB;KAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,mBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,iBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,qBAAmB;EAAnB;AAAmB;AAAnB;EAAA,qBAAmB;EAAnB;AAAmB;AAAnB;EAAA,qBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,qBAAmB;EAAnB;AAAmB;AAAnB;EAAA,mBAAmB;EAAnB;AAAmB;AAAnB;EAAA,gBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,mBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,iBAAmB;EAAnB;AAAmB;AAAnB;EAAA,iBAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,mBAAmB;EAAnB;AAAmB;AAAnB;EAAA,mBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,eAAmB;EAAnB;AAAmB;AAAnB;EAAA,iBAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,uCAAmB;UAAnB;AAAmB;AAAnB;EAAA,0CAAmB;UAAnB;AAAmB;AAAnB;EAAA,mCAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,0CAAmB;EAAnB,uDAAmB;EAAnB;AAAmB;AAAnB;EAAA,0EAAmB;EAAnB,8FAAmB;EAAnB;AAAmB;AAAnB;EAAA,+EAAmB;EAAnB,mGAAmB;EAAnB;AAAmB;AAAnB;EAAA,6EAAmB;EAAnB,iGAAmB;EAAnB;AAAmB;AAAnB;EAAA,2GAAmB;EAAnB,yGAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,mGAAmB;EAAnB;AAAmB;AAAnB;EAAA,wKAAmB;EAAnB,wJAAmB;EAAnB,gNAAmB;EAAnB,wDAAmB;EAAnB;AAAmB;AAAnB;EAAA,wBAAmB;EAAnB,wDAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,gBAAmB;EAAnB,oBAAmB;EAAnB,4BAAmB;EAAnB;AAAmB;AAAnB;EAAA,gBAAmB;EAAnB,oBAAmB;EAAnB,4BAAmB;EAAnB;AAAmB;AAAnB;EAAA,wBAAmB;EAAnB,qBAAmB;AAAA;AAAnB;EAAA;AAAmB;;AAEnB;;;CAGC;;AAPD;EAAA;CCAA;;ADAA;EAAA,uBCAA;EDAA;CCAA;;ADAA;EAAA,uBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,wCCAA;UDAA;CCAA;;ADAA;EAAA;CCAA;;ADAA;EAAA,uBCAA;EDAA;CCAA;;ADAA;EAAA,uBCAA;EDAA;CCAA;;ADAA;EAAA,uBCAA;EDAA;CCAA;;ADAA;EAAA,uBCAA;EDAA;CCAA;;ADAA;EAAA,uBCAA;EDAA;CCAA;;ADAA;EAAA,uBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,+BCAA;EDAA;CCAA;;ADAA;EAAA,4GCAA;EDAA,0GCAA;EDAA;CCAA;;ADAA;EAAA,4GCAA;EDAA,0GCAA;EDAA;CCAA;;ADAA;EAAA,4GCAA;EDAA,0GCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA;CCAA;;ADAA;EAAA,4GCAA;EDAA,0GCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA;CCAA;;ADAA;EAAA,wBCAA;EDAA;CCAA;;ADAA;EAAA;CCAA;;ADAA;EAAA;CCAA;;ADAA;EAAA,4BCAA;EDAA,qCCAA;EDAA;CCAA;;ADAA;EAAA,4BCAA;EDAA,uCCAA;EDAA;CCAA;;ADAA;EAAA;CCAA;;ADAA;EAAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA;CCAA;;ADAA;EAAA,+BCAA;EDAA;CCAA;;ADAA;EAAA,4GCAA;EDAA,0GCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,uBCAA;EDAA;CCAA;;ADAA;EAAA,uBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,4BCAA;EDAA;CCAA;;ADAA;EAAA,4BCAA;EDAA;CCAA;;ADAA;EAAA,mBCAA;EDAA;CCAA;;ADAA;EAAA,uBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA,qBCAA;EDAA;CCAA;;ADAA;EAAA;CCAA;;ADAA;EAAA;CCAA;;ADAA;;EAAA;IAAA,iBCAA;IDAA;GCAA;;EDAA;IAAA,kBCAA;IDAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA,qBCAA;IDAA;GCAA;;EDAA;IAAA,mBCAA;IDAA;GCAA;;EDAA;IAAA,oBCAA;IDAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA,kBCAA;IDAA;GCAA;CAAA;;ADAA;;EAAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;CAAA;;ADAA;;EAAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA;GCAA;;EDAA;IAAA,mBCAA;IDAA;GCAA;;EDAA;IAAA,oBCAA;IDAA;GCAA;CAAA","sourcesContent":["@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n/*\n“Have the courage to follow your heart and intuition. They somehow already know what you truly want to become. Everything else is secondary.”\n― Steve Jobs\n*/\n",null],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/flowbite/src/components/accordion/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/flowbite/src/components/accordion/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initAccordions": () => (/* binding */ initAccordions)
/* harmony export */ });
const Default = {
	alwaysOpen: false,
	activeClasses: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
	inactiveClasses: 'text-gray-500 dark:text-gray-400',
	onOpen: () => { },
	onClose: () => { },
	onToggle: () => { }
}

class Accordion {
	constructor(items = [], options = {}) {
		this._items = items
		this._options = { ...Default, ...options }
		this._init()
	}

	_init() {
		if (this._items.length) {
			// show accordion item based on click
			this._items.map(item => {

				if (item.active) {
					this.open(item.id)
				}

				item.triggerEl.addEventListener('click', () => {
					this.toggle(item.id)
				})
			})
		}
	}

	getItem(id) {
		return this._items.filter(item => item.id === id)[0]
	}

	open(id) {
		const item = this.getItem(id)

		// don't hide other accordions if always open
		if (!this._options.alwaysOpen) {
			this._items.map(i => {
				if (i !== item) {
					i.triggerEl.classList.remove(...this._options.activeClasses.split(" "))
					i.triggerEl.classList.add(...this._options.inactiveClasses.split(" "))
					i.targetEl.classList.add('hidden')
					i.triggerEl.setAttribute('aria-expanded', false)
					i.active = false

					// rotate icon if set
					if (i.iconEl) {
						i.iconEl.classList.remove('rotate-180')
					}
				}
			})
		}

		// show active item
		item.triggerEl.classList.add(...this._options.activeClasses.split(" "))
		item.triggerEl.classList.remove(...this._options.inactiveClasses.split(" "))
		item.triggerEl.setAttribute('aria-expanded', true)
		item.targetEl.classList.remove('hidden')
		item.active = true

		// rotate icon if set
		if (item.iconEl) {
			item.iconEl.classList.add('rotate-180')
		}

		// callback function
		this._options.onOpen(this, item)
	}

	toggle(id) {
		const item = this.getItem(id)

		if (item.active) {
			this.close(id)
		} else {
			this.open(id)
		}

		// callback function
		this._options.onToggle(this, item)
	}

	close(id) {
		const item = this.getItem(id)

		item.triggerEl.classList.remove(...this._options.activeClasses.split(" "))
		item.triggerEl.classList.add(...this._options.inactiveClasses.split(" "))
		item.targetEl.classList.add('hidden')
		item.triggerEl.setAttribute('aria-expanded', false)
		item.active = false

		// rotate icon if set
		if (item.iconEl) {
			item.iconEl.classList.remove('rotate-180')
		}

		// callback function
		this._options.onClose(this, item)
	}

}

window.Accordion = Accordion;

function initAccordions() {
	document.querySelectorAll('[data-accordion]').forEach(accordionEl => {

		const alwaysOpen = accordionEl.getAttribute('data-accordion')
		const activeClasses = accordionEl.getAttribute('data-active-classes')
		const inactiveClasses = accordionEl.getAttribute('data-inactive-classes')

		const items = []
		accordionEl.querySelectorAll('[data-accordion-target]').forEach(el => {
			const item = {
				id: el.getAttribute('data-accordion-target'),
				triggerEl: el,
				targetEl: document.querySelector(el.getAttribute('data-accordion-target')),
				iconEl: el.querySelector('[data-accordion-icon]'),
				active: el.getAttribute('aria-expanded') === 'true' ? true : false
			}
			items.push(item)
		})

		new Accordion(items, {
			alwaysOpen: alwaysOpen === 'open' ? true : false,
			activeClasses: activeClasses ? activeClasses : Default.activeClasses,
			inactiveClasses: inactiveClasses ? inactiveClasses : Default.inactiveClasses
		})
	})
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Accordion);

/***/ }),

/***/ "./node_modules/flowbite/src/components/carousel/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/flowbite/src/components/carousel/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initCarousels": () => (/* binding */ initCarousels)
/* harmony export */ });
const Default = {
    defaultPosition: 0,
    indicators: {
        items: [],
        activeClasses: 'bg-white dark:bg-gray-800',
        inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800'
    },
    interval: 3000,
    onNext: () => { },
    onPrev: () => { },
    onChange: () => { }
}

class Carousel {
    constructor(items = [], options = {}) {
        this._items = items
        this._options = { ...Default, ...options, indicators : { ...Default.indicators, ...options.indicators } }
        this._activeItem = this.getItem(this._options.defaultPosition)
        this._indicators = this._options.indicators.items
        this._interval = null
        this._init()
    }

    /**
     * Initialise carousel and items based on active one
     */
    _init() {
        this._items.map(item => {
            item.el.classList.add('absolute', 'inset-0', 'transition-all', 'transform')
        })

        // if no active item is set then first position is default
        if (this._getActiveItem()) {
            this.slideTo(this._getActiveItem().position)
        } else {
            this.slideTo(0)
        }

        this._indicators.map((indicator, position) => {
            indicator.el.addEventListener('click', () => {
                this.slideTo(position)
            })
        })
    }

    getItem(position) {
        return this._items[position]
    }

    /**
     * Slide to the element based on id
     * @param {*} position 
     */
    slideTo(position) {
        const nextItem = this._items[position]
        const rotationItems = {
            'left': nextItem.position === 0 ? this._items[this._items.length - 1] : this._items[nextItem.position - 1],
            'middle': nextItem,
            'right': nextItem.position === this._items.length - 1 ? this._items[0] : this._items[nextItem.position + 1]
        }
        this._rotate(rotationItems)
        this._setActiveItem(nextItem.position)
        if (this._interval) {
            this.pause()
            this.cycle()
        }

        this._options.onChange(this)
    }

    /**
     * Based on the currently active item it will go to the next position
     */
    next() {
        const activeItem = this._getActiveItem()
        let nextItem = null

        // check if last item
        if (activeItem.position === this._items.length - 1) {
            nextItem = this._items[0]
        } else {
            nextItem = this._items[activeItem.position + 1]
        }

        this.slideTo(nextItem.position)

        // callback function
        this._options.onNext(this)
    }

    /**
     * Based on the currently active item it will go to the previous position
     */
    prev() {
        const activeItem = this._getActiveItem()
        let prevItem = null

        // check if first item
        if (activeItem.position === 0) {
            prevItem = this._items[this._items.length - 1]
        } else {
            prevItem = this._items[activeItem.position - 1]
        }

        this.slideTo(prevItem.position)

        // callback function
        this._options.onPrev(this)
    }

    /**
     * This method applies the transform classes based on the left, middle, and right rotation carousel items
     * @param {*} rotationItems 
     */
    _rotate(rotationItems) {
        // reset
        this._items.map(item => {
            item.el.classList.add('hidden')
        })

        // left item (previously active)
        rotationItems.left.el.classList.remove('-translate-x-full', 'translate-x-full', 'translate-x-0', 'hidden', 'z-20')
        rotationItems.left.el.classList.add('-translate-x-full', 'z-10')

        // currently active item
        rotationItems.middle.el.classList.remove('-translate-x-full', 'translate-x-full', 'translate-x-0', 'hidden', 'z-10')
        rotationItems.middle.el.classList.add('translate-x-0', 'z-20')

        // right item (upcoming active)
        rotationItems.right.el.classList.remove('-translate-x-full', 'translate-x-full', 'translate-x-0', 'hidden', 'z-20')
        rotationItems.right.el.classList.add('translate-x-full', 'z-10')
    }

    /**
     * Set an interval to cycle through the carousel items
     */
    cycle() {
        this._interval = setInterval(() => {
            this.next();
        }, this._options.interval)
    }

    /**
     * Clears the cycling interval
     */
    pause() {
        clearInterval(this._interval);
    }

    /**
     * Get the currently active item
     */
    _getActiveItem() {
        return this._activeItem
    }

    /**
     * Set the currently active item and data attribute
     * @param {*} position 
     */
    _setActiveItem(position) {
        this._activeItem = this._items[position]

        // update the indicators if available
        if (this._indicators.length) {
            this._indicators.map(indicator => {
                indicator.el.setAttribute('aria-current', 'false')
                indicator.el.classList.remove(...this._options.indicators.activeClasses.split(" "))
                indicator.el.classList.add(...this._options.indicators.inactiveClasses.split(" "))
            })
            this._indicators[position].el.classList.add(...this._options.indicators.activeClasses.split(" "))
            this._indicators[position].el.classList.remove(...this._options.indicators.inactiveClasses.split(" "))
            this._indicators[position].el.setAttribute('aria-current', 'true')
        }
    }

}

window.Carousel = Carousel;

function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(carouselEl => {
        const interval = carouselEl.getAttribute('data-carousel-interval')
        const slide = carouselEl.getAttribute('data-carousel') === 'slide' ? true : false

        const items = []
        let defaultPosition = 0
        if (carouselEl.querySelectorAll('[data-carousel-item]').length) {
            [...carouselEl.querySelectorAll('[data-carousel-item]')].map((carouselItemEl, position) => {
                items.push({
                    position: position,
                    el: carouselItemEl
                })

                if (carouselItemEl.getAttribute('data-carousel-item') === 'active') {
                    defaultPosition = position
                }
            })
        }

        const indicators = [];
        if (carouselEl.querySelectorAll('[data-carousel-slide-to]').length) {
            [...carouselEl.querySelectorAll('[data-carousel-slide-to]')].map((indicatorEl) => {
                indicators.push({
                    position: indicatorEl.getAttribute('data-carousel-slide-to'),
                    el: indicatorEl
                })
            })
        }

        const carousel = new Carousel(items, {
            defaultPosition: defaultPosition,
            indicators: {
                items: indicators
            },
            interval: interval ? interval : Default.interval
        })

        if (slide) {
            carousel.cycle();
        }

        // check for controls
        const carouselNextEl = carouselEl.querySelector('[data-carousel-next]')
        const carouselPrevEl = carouselEl.querySelector('[data-carousel-prev]')

        if (carouselNextEl) {
            carouselNextEl.addEventListener('click', () => {
                carousel.next()
            })
        }

        if (carouselPrevEl) {
            carouselPrevEl.addEventListener('click', () => {
                carousel.prev()
            })
        }

    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Carousel);

/***/ }),

/***/ "./node_modules/flowbite/src/components/collapse/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/flowbite/src/components/collapse/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initCollapses": () => (/* binding */ initCollapses)
/* harmony export */ });
const Default = {
    triggerEl: null,
    onCollapse: () => { },
    onExpand: () => { },
    onToggle: () => { },
};

class Collapse {
    constructor(targetEl = null, options = {}) {
        this._targetEl = targetEl;
        this._triggerEl = options.triggerEl || Default.triggerEl;
        this._options = { ...Default, ...options };
        this._visible = false;
        this._init();
    }

    _init() {
        if (this._triggerEl) {
            if (this._triggerEl.hasAttribute("aria-expanded")) {
                this._visible =
                    this._triggerEl.getAttribute("aria-expanded") === "true";
            } else {
                // fix until v2 not to break previous single collapses which became dismiss
                this._visible = !this._targetEl.classList.contains("hidden");
            }

            this._triggerEl.addEventListener("click", () => {
                this._visible ? this.collapse() : this.expand();
            });
        }
    }

    collapse() {
        this._targetEl.classList.add("hidden");
        if (this._triggerEl) {
            this._triggerEl.setAttribute("aria-expanded", "false");
        }
        this._visible = false;

        // callback function
        this._options.onCollapse(this);
    }

    expand() {
        this._targetEl.
            classList.remove("hidden");
        if (this._triggerEl) {
            this._triggerEl.setAttribute("aria-expanded", "true");
        }
        this._visible = true;

        // callback function
        this._options.onExpand(this);
    }

    toggle() {
        if (this._visible) {
            this.collapse();
        } else {
            this.expand();
        }
    }
}

window.Collapse = Collapse;

function initCollapses() {
    document
        .querySelectorAll("[data-collapse-toggle]")
        .forEach((triggerEl) => {
            const targetEl = document.getElementById(
                triggerEl.getAttribute("data-collapse-toggle")
            );

            // check if the target element exists
            if (!targetEl) {
                return;
            }

            new Collapse(targetEl, {
                triggerEl,
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Collapse);

/***/ }),

/***/ "./node_modules/flowbite/src/components/dial/index.js":
/*!************************************************************!*\
  !*** ./node_modules/flowbite/src/components/dial/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initDials": () => (/* binding */ initDials)
/* harmony export */ });
const Default = {
    triggerType: 'hover',
    onShow: () => { },
    onHide: () => { },
    onToggle: () => { }
}

class Dial {
    constructor(parentEl = null, triggerEl = null, targetEl = null, options) {
        this._parentEl = parentEl
        this._triggerEl = triggerEl
        this._targetEl = targetEl
        this._options = { ...Default, ...options }
        this._visible = false
        this._init()
    }

    _init() {

        if (this._triggerEl) {
            const triggerEvents = this._getTriggerEvents()
            triggerEvents.showEvents.forEach(ev => {
                this._triggerEl.addEventListener(ev, () => {
                    this.show()
                })
                this._targetEl.addEventListener(ev, () => {
                    this.show()
                })
            })
            triggerEvents.hideEvents.forEach(ev => {
                this._parentEl.addEventListener(ev, () => {
                    setTimeout(() => {
                        if (!this._parentEl.matches(':hover')) {
                            this.hide()
                        }
                    }, 100)
                })
            })
        }

    }

    hide() {
        this._targetEl.classList.add('hidden')
        if (this._triggerEl) {
            this._triggerEl.setAttribute('aria-expanded', 'false')
        }
        this._visible = false

        // callback function
        this._options.onHide(this)
    }

    show() {
        this._targetEl.classList.remove('hidden')
        if (this._triggerEl) {
            this._triggerEl.setAttribute('aria-expanded', 'true')
        }
        this._visible = true

        // callback function
        this._options.onShow(this)
    }

    toggle() {
        if (this._visible) {
            this.hide()
        } else {
            this.show()
        }
    }

    _getTriggerEvents() {
        switch (this._options.triggerType) {
            case 'hover':
                return {
                    showEvents: ['mouseenter', 'focus'],
                    hideEvents: ['mouseleave', 'blur']
                }
            case 'click':
                return {
                    showEvents: ['click', 'focus'],
                    hideEvents: ['focusout', 'blur']
                }
            default:
                return {
                    showEvents: ['mouseenter', 'focus'],
                    hideEvents: ['mouseleave', 'blur']
                }
        }
    }

}

window.Dial = Dial;

function initDials() {
    document.querySelectorAll('[data-dial-init]').forEach(parentEl => {
        const triggerEl = parentEl.querySelector('[data-dial-toggle]')
        const targetEl = document.getElementById(triggerEl.getAttribute('data-dial-toggle'))
        const triggerType = triggerEl.getAttribute('data-dial-trigger')

        new Dial(parentEl, triggerEl, targetEl, {
            triggerType: triggerType ? triggerType : Default.triggerType
        })
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dial);

/***/ }),

/***/ "./node_modules/flowbite/src/components/dismiss/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/flowbite/src/components/dismiss/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initDismisses": () => (/* binding */ initDismisses)
/* harmony export */ });
const Default = {
    triggerEl: null,
    transition: 'transition-opacity',
    duration: 300,
    timing: 'ease-out',
    onHide: () => { }
};

class Dismiss {
    constructor(targetEl = null, options = {}) {
        this._targetEl = targetEl;
        this._triggerEl = options.triggerEl || Default.triggerEl;
        this._options = { ...Default, ...options };
        this._init();
    }

    _init() {
        if (this._triggerEl) {
            this._triggerEl.addEventListener('click', () => {
                this.hide();
            });
        }
    }

    hide() {
        this._targetEl.classList.add(
            this._options.transition,
            `duration-${this._options.duration}`,
            this._options.timing,
            'opacity-0'
        );
        setTimeout(() => {
            this._targetEl.classList.add('hidden');
        }, this._options.duration);

        // callback function
        this._options.onHide(this, this._targetEl);
    }
}

window.Dismiss = Dismiss;

function initDismisses() {
    document.querySelectorAll('[data-dismiss-target]').forEach(triggerEl => {
        const targetEl = document.querySelector(
            triggerEl.getAttribute('data-dismiss-target')
        );
        new Dismiss(targetEl, {
            triggerEl
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dismiss);

/***/ }),

/***/ "./node_modules/flowbite/src/components/drawer/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/flowbite/src/components/drawer/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initDrawers": () => (/* binding */ initDrawers)
/* harmony export */ });
const Default = {
    placement: 'left',
    bodyScrolling: false,
    backdrop: true,
    edge: false,
    edgeOffset: 'bottom-[60px]',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
    onShow: () => { },
    onHide: () => { },
    onToggle: () => { }
}

class Drawer {
    constructor(targetEl = null, options) {
        this._targetEl = targetEl
        this._options = { ...Default, ...options }
        this._visible = false
        this._init()
    }

    _init() {
        // set initial accessibility attributes
        if (this._targetEl) {
            this._targetEl.setAttribute('aria-hidden', 'true')
            this._targetEl.classList.add('transition-transform')
        }

        // set base placement classes
        this._getPlacementClasses(this._options.placement).base.map(c => {
            this._targetEl.classList.add(c)
        })

        // add keyboard event listener to document
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') { // if 'Escape' key is pressed
                if (this.isVisible()) { // if the Drawer is visible
                    this.hide() // hide the Drawer
                }
            }
        })
    }

    isVisible() {
        return this._visible
    }

    hide() {
        // based on the edge option show placement classes
        if (this._options.edge) {
            this._getPlacementClasses(this._options.placement + '-edge').active.map(c => {
                this._targetEl.classList.remove(c)
            })
            this._getPlacementClasses(this._options.placement + '-edge').inactive.map(c => {
                this._targetEl.classList.add(c)
            })
        } else {
            this._getPlacementClasses(this._options.placement).active.map(c => {
                this._targetEl.classList.remove(c)
            })
            this._getPlacementClasses(this._options.placement).inactive.map(c => {
                this._targetEl.classList.add(c)
            })
        }

        // set accessibility attributes
        this._targetEl.setAttribute('aria-hidden', 'true')
        this._targetEl.removeAttribute('aria-modal')
        this._targetEl.removeAttribute('role')

        // enable body scroll
        if (!this._options.bodyScrolling) {
            document.body.classList.remove('overflow-hidden')
        }

        // destroy backdrop
        if (this._options.backdrop) {
            this._destroyBackdropEl()
        }

        this._visible = false

        // callback function
        this._options.onHide(this)
    }

    show() {
        if (this._options.edge) {
            this._getPlacementClasses(this._options.placement + '-edge').active.map(c => {
                this._targetEl.classList.add(c)
            })
            this._getPlacementClasses(this._options.placement + '-edge').inactive.map(c => {
                this._targetEl.classList.remove(c)
            })
        } else {
            this._getPlacementClasses(this._options.placement).active.map(c => {
                this._targetEl.classList.add(c)
            })
            this._getPlacementClasses(this._options.placement).inactive.map(c => {
                this._targetEl.classList.remove(c)
            })
        }

        // set accessibility attributes
        this._targetEl.setAttribute('aria-modal', 'true')
        this._targetEl.setAttribute('role', 'dialog')
        this._targetEl.removeAttribute('aria-hidden')

        // disable body scroll
        if (!this._options.bodyScrolling) {
            document.body.classList.add('overflow-hidden')
        }

        // show backdrop
        if (this._options.backdrop) {
            this._createBackdrop()
        }

        this._visible = true

        // callback function
        this._options.onShow(this)
    }

    toggle() {
        if (this.isVisible()) {
            this.hide()
        } else {
            this.show()
        }
    }

    _createBackdrop() {
        if (!this._visible) {
            const backdropEl = document.createElement('div');
            backdropEl.setAttribute('drawer-backdrop', '');
            backdropEl.classList.add(...this._options.backdropClasses.split(" "));
            document.querySelector('body').append(backdropEl);
            backdropEl.addEventListener('click', () => {
                this.hide()
            })
        }
    }

    _destroyBackdropEl() {
        if (this._visible) {
            document.querySelector('[drawer-backdrop]').remove();
        }
    }

    _getPlacementClasses(placement) {
        switch (placement) {
            case 'top':
                return {
                    base: ['top-0', 'left-0', 'right-0'],
                    active: ['transform-none'],
                    inactive: ['-translate-y-full']
                }
            case 'right':
                return {
                    base: ['right-0', 'top-0'],
                    active: ['transform-none'],
                    inactive: ['translate-x-full']
                }
            case 'bottom':
                return {
                    base: ['bottom-0', 'left-0', 'right-0'],
                    active: ['transform-none'],
                    inactive: ['translate-y-full']
                }
            case 'left':
                return {
                    base: ['left-0', 'top-0'],
                    active: ['transform-none'],
                    inactive: ['-translate-x-full']
                }
            case 'bottom-edge':
                return {
                    base: ['left-0', 'top-0'],
                    active: ['transform-none'],
                    inactive: ['translate-y-full', this._options.edgeOffset]
                }
            default:
                return {
                    base: ['left-0', 'top-0'],
                    active: ['transform-none'],
                    inactive: ['-translate-x-full']
                }
        }
    }
}

window.Drawer = Drawer;

const getDrawerInstance = (id, instances) => {
    if (instances.some(drawerInstance => drawerInstance.id === id)) {
        return instances.find(drawerInstance => drawerInstance.id === id)
    }
    return false
}

function initDrawers() {
    let drawerInstances = []
    document.querySelectorAll('[data-drawer-target]').forEach(triggerEl => {
        // mandatory
        const targetEl = document.getElementById(triggerEl.getAttribute('data-drawer-target'))
        const drawerId = targetEl.id

        // optional
        const placement = triggerEl.getAttribute('data-drawer-placement')
        const bodyScrolling = triggerEl.getAttribute('data-drawer-body-scrolling')
        const backdrop = triggerEl.getAttribute('data-drawer-backdrop')
        const edge = triggerEl.getAttribute('data-drawer-edge')
        const edgeOffset = triggerEl.getAttribute('data-drawer-edge-offset')
        
        let drawer = null
        if (getDrawerInstance(drawerId, drawerInstances)) {
            drawer = getDrawerInstance(drawerId, drawerInstances)
            drawer = drawer.object
        } else {
            drawer = new Drawer(targetEl, {
                placement: placement ? placement : Default.placement,
                bodyScrolling: bodyScrolling ? bodyScrolling === 'true' ? true : false : Default.bodyScrolling,
                backdrop: backdrop ? backdrop === 'true' ? true : false : Default.backdrop,
                edge: edge ? edge === 'true' ? true : false : Default.edge,
                edgeOffset: edgeOffset ? edgeOffset : Default.edgeOffset
            })
            drawerInstances.push({
                id: drawerId,
                object: drawer
            })
        }
    })

    document.querySelectorAll('[data-drawer-toggle]').forEach(triggerEl => {
        const targetEl = document.getElementById(triggerEl.getAttribute('data-drawer-toggle'))
        const drawerId = targetEl.id
        const drawer = getDrawerInstance(drawerId, drawerInstances)

        triggerEl.addEventListener('click', () => {
            if (drawer.object.isVisible()) {
                drawer.object.hide()
            } else {
                drawer.object.show()
            }
        })
    })

    document.querySelectorAll('[data-drawer-dismiss]').forEach(triggerEl => {
        const targetEl = document.getElementById(triggerEl.getAttribute('data-drawer-dismiss'))
        const drawerId = targetEl.id
        const drawer = getDrawerInstance(drawerId, drawerInstances)

        triggerEl.addEventListener('click', () => {
            drawer.object.hide()
        })
    })

    document.querySelectorAll('[data-drawer-show]').forEach(triggerEl => {
        const targetEl = document.getElementById(triggerEl.getAttribute('data-drawer-show'))
        const drawerId = targetEl.id
        const drawer = getDrawerInstance(drawerId, drawerInstances)

        triggerEl.addEventListener('click', () => {
            drawer.object.show()
        })
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Drawer);

/***/ }),

/***/ "./node_modules/flowbite/src/components/dropdown/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/flowbite/src/components/dropdown/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initDropdowns": () => (/* binding */ initDropdowns)
/* harmony export */ });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");


const Default = {
    placement: 'bottom',
    triggerType: 'click',
    onShow: () => { },
    onHide: () => { }
}

class Dropdown {
    constructor(targetElement = null, triggerElement = null, options = {}) {
        this._targetEl = targetElement
        this._triggerEl = triggerElement
        this._options = { ...Default, ...options }
        this._popperInstance = this._createPopperInstace()
        this._visible = false
        this._init()
    }

    _init() {
        if (this._triggerEl) {
            this._triggerEl.addEventListener('click', () => {
                this.toggle()
            })
        }
    }

    _createPopperInstace() {
        return (0,_popperjs_core__WEBPACK_IMPORTED_MODULE_0__.createPopper)(this._triggerEl, this._targetEl, {
            placement: this._options.placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 10],
                    },
                },
            ],
        });
    }

    _handleClickOutside(ev, targetEl) {
        const clickedEl = ev.target
        if (clickedEl !== targetEl && !targetEl.contains(clickedEl) && !this._triggerEl.contains(clickedEl) && this._visible) {
            this.hide()
        }
        document.body.removeEventListener('click', this._handleClickOutside, true)
    }

    toggle() {
        if (this._visible) {
            this.hide()
            document.body.removeEventListener('click', this._handleClickOutside, true)
        } else {
            this.show()
        }
    }

    show() {
        this._targetEl.classList.remove('hidden')
        this._targetEl.classList.add('block')

        // Enable the event listeners
        this._popperInstance.setOptions(options => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: true },
            ],
        }));

        document.body.addEventListener('click', (ev) => { this._handleClickOutside(ev, this._targetEl) }, true)

        // Update its position
        this._popperInstance.update()
        this._visible = true

        // callback function
        this._options.onShow(this)
    }

    hide() {
        this._targetEl.classList.remove('block')
        this._targetEl.classList.add('hidden')

        // Disable the event listeners
        this._popperInstance.setOptions(options => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: false },
            ],
        }))

        this._visible = false

        // callback function
        this._options.onHide(this)
    }
}

window.Dropdown = Dropdown;

function initDropdowns() {
    document.querySelectorAll('[data-dropdown-toggle]').forEach(triggerEl => {
        const targetEl = document.getElementById(triggerEl.getAttribute('data-dropdown-toggle'))
        const placement = triggerEl.getAttribute('data-dropdown-placement')

        new Dropdown(targetEl, triggerEl, {
            placement: placement ? placement : Default.placement
        })
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dropdown);

/***/ }),

/***/ "./node_modules/flowbite/src/components/modal/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/flowbite/src/components/modal/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initModals": () => (/* binding */ initModals)
/* harmony export */ });
const Default = {
    placement: 'center',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    backdrop: 'dynamic',
    onHide: () => { },
    onShow: () => { },
    onToggle: () => { }
}
class Modal {
    constructor(targetEl = null, options = {}) {
        this._targetEl = targetEl
        this._options = { ...Default, ...options }
        this._isHidden = true
        this._backdropEl = null
        this._init()
    }

    _init() {
        if (this._targetEl) {
            this._getPlacementClasses().map(c => {
                this._targetEl.classList.add(c)
            })
            this._targetEl.addEventListener('click', ev => {
                this._handleOutsideClick(ev.target)
            })
            this._targetEl.addEventListener('keydown', ev => {
                if (ev.key === 'Escape') {
                    this.hide()
                }
            })
        }
    }

    _createBackdrop() {
        if (this._isHidden) {
            const backdropEl = document.createElement('div');
            backdropEl.setAttribute('modal-backdrop', '');
            backdropEl.classList.add(...this._options.backdropClasses.split(" "));
            document.querySelector('body').append(backdropEl);
            this._backdropEl = backdropEl
        }
    }

    _destroyBackdropEl() {
        if (!this._isHidden) {
            document.querySelector('[modal-backdrop]').remove();
        }
    }

    _handleOutsideClick(target) {
        if (this._options.backdrop === 'dynamic') {
            if (target === this._targetEl || target === this._backdropEl) {
                this.hide()
            }
        }
    }

    _getPlacementClasses() {
        switch (this._options.placement) {

            // top
            case 'top-left':
                return ['justify-start', 'items-start']
            case 'top-center':
                return ['justify-center', 'items-start']
            case 'top-right':
                return ['justify-end', 'items-start']

            // center
            case 'center-left':
                return ['justify-start', 'items-center']
            case 'center':
                return ['justify-center', 'items-center']
            case 'center-right':
                return ['justify-end', 'items-center']

            // bottom
            case 'bottom-left':
                return ['justify-start', 'items-end']
            case 'bottom-center':
                return ['justify-center', 'items-end']
            case 'bottom-right':
                return ['justify-end', 'items-end']

            default:
                return ['justify-center', 'items-center']
        }
    }

    toggle() {
        if (this._isHidden) {
            this.show()
        } else {
            this.hide()
        }

        // callback function
        this._options.onToggle(this)
    }

    show() {
        this._targetEl.classList.add('flex')
        this._targetEl.classList.remove('hidden')
        this._targetEl.setAttribute('aria-modal', 'true')
        this._targetEl.setAttribute('role', 'dialog')
        this._targetEl.removeAttribute('aria-hidden')
        this._createBackdrop()
        this._isHidden = false

        // prevent body scroll
        document.body.classList.add('overflow-hidden')

        // Add keyboard event listener to the document
        document.addEventListener('keydown', ev => {
            if (ev.key === 'Escape') {
                this.hide()
            }
        })

        // callback function
        this._options.onShow(this)
    }

    hide() {
        this._targetEl.classList.add('hidden')
        this._targetEl.classList.remove('flex')
        this._targetEl.setAttribute('aria-hidden', 'true')
        this._targetEl.removeAttribute('aria-modal')
        this._targetEl.removeAttribute('role')
        this._destroyBackdropEl()
        this._isHidden = true

        // re-apply body scroll
        document.body.classList.remove('overflow-hidden')

        // callback function
        this._options.onHide(this)
    }

    isHidden() {
        return this._isHidden
    }

}

window.Modal = Modal;

const getModalInstance = (id, instances) => {
    if (instances.some(modalInstance => modalInstance.id === id)) {
        return instances.find(modalInstance => modalInstance.id === id)
    }
    return false
}

function initModals() {
    let modalInstances = []
    document.querySelectorAll('[data-modal-toggle]').forEach(el => {
        const modalId = el.getAttribute('data-modal-toggle');
        const modalEl = document.getElementById(modalId);
        const placement = modalEl.getAttribute('data-modal-placement')
        const backdrop = modalEl.getAttribute('data-modal-backdrop')

        if (modalEl) {
            if (!modalEl.hasAttribute('aria-hidden') && !modalEl.hasAttribute('aria-modal')) {
                modalEl.setAttribute('aria-hidden', 'true');
            }
        }

        let modal = null
        if (getModalInstance(modalId, modalInstances)) {
            modal = getModalInstance(modalId, modalInstances)
            modal = modal.object
        } else {
            modal = new Modal(modalEl, {
                placement: placement ? placement : Default.placement,
                backdrop: backdrop ? backdrop : Default.backdrop
            })

            modalInstances.push({
                id: modalId,
                object: modal
            })
        }

        if (modalEl.hasAttribute('data-modal-show') && modalEl.getAttribute('data-modal-show') === 'true') {
            modal.show();
        }

        el.addEventListener('click', () => {
            modal.toggle()
        })
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);


/***/ }),

/***/ "./node_modules/flowbite/src/components/popover/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/flowbite/src/components/popover/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initPopovers": () => (/* binding */ initPopovers)
/* harmony export */ });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");


const Default = {
    placement: 'top',
    offset: 10,
    triggerType: 'hover',
    onShow: () => { },
    onHide: () => { }
}

class Popover {
    constructor(targetEl = null, triggerEl = null, options = {}) {
        this._targetEl = targetEl
        this._triggerEl = triggerEl
        this._options = { ...Default, ...options }
        this._popperInstance = this._createPopperInstace()
        this._init()
    }

    _init() {
        if (this._triggerEl) {
            const triggerEvents = this._getTriggerEvents()
            triggerEvents.showEvents.forEach(ev => {
                this._triggerEl.addEventListener(ev, () => {
                    this.show()
                })
                this._targetEl.addEventListener(ev, () => {
                    this.show()
                })
            })
            triggerEvents.hideEvents.forEach(ev => {
                this._triggerEl.addEventListener(ev, () => {
                    setTimeout(() => {
                        if (!this._targetEl.matches(':hover')) {
                            this.hide()
                        }
                    }, 100)
                })
                this._targetEl.addEventListener(ev, () => {
                    setTimeout(() => {
                        if (!this._triggerEl.matches(':hover')) {
                            this.hide()
                        }
                    }, 100)
                })
            })
        }
    }

    _createPopperInstace() {
        return (0,_popperjs_core__WEBPACK_IMPORTED_MODULE_0__.createPopper)(this._triggerEl, this._targetEl, {
            placement: this._options.placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, this._options.offset],
                    },
                },
            ],
        });
    }

    _getTriggerEvents() {
        switch (this._options.triggerType) {
            case 'hover':
                return {
                    showEvents: ['mouseenter', 'focus'],
                    hideEvents: ['mouseleave', 'blur']
                }
            case 'click':
                return {
                    showEvents: ['click', 'focus'],
                    hideEvents: ['focusout', 'blur']
                }
            default:
                return {
                    showEvents: ['mouseenter', 'focus'],
                    hideEvents: ['mouseleave', 'blur']
                }
        }
    }

    show() {
        this._targetEl.classList.remove('opacity-0', 'invisible')
        this._targetEl.classList.add('opacity-100', 'visible')

        // Enable the event listeners
        this._popperInstance.setOptions(options => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: true },
            ],
        }));

        // Update its position
        this._popperInstance.update()

        // callback function
        this._options.onShow(this)
    }

    hide() {
        this._targetEl.classList.remove('opacity-100', 'visible')
        this._targetEl.classList.add('opacity-0', 'invisible')

        // Disable the event listeners
        this._popperInstance.setOptions(options => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: false },
            ],
        }));

        // callback function
        this._options.onHide(this)
    }
}

window.Popover = Popover;

function initPopovers() {
    document.querySelectorAll('[data-popover-target]').forEach(triggerEl => {
        const targetEl = document.getElementById(triggerEl.getAttribute('data-popover-target'))
        const triggerType = triggerEl.getAttribute('data-popover-trigger');
        const placement = triggerEl.getAttribute('data-popover-placement');
        const offset = triggerEl.getAttribute('data-popover-offset');

        new Popover(targetEl, triggerEl, {
            placement: placement ? placement : Default.placement,
            offset: offset ? parseInt(offset) : Default.offset,
            triggerType: triggerType ? triggerType : Default.triggerType
        })
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popover);

/***/ }),

/***/ "./node_modules/flowbite/src/components/tabs/index.js":
/*!************************************************************!*\
  !*** ./node_modules/flowbite/src/components/tabs/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initTabs": () => (/* binding */ initTabs)
/* harmony export */ });
const Default = {
    defaultTabId: null,
    activeClasses: 'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500',
    inactiveClasses: 'dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
    onShow: () => { }
}

class Tabs {
    constructor(items = [], options = {}) {
        this._items = items
        this._activeTab = options ? this.getTab(options.defaultTabId) : null
        this._options = { ...Default, ...options }
        this._init()
    }

    _init() {
        if (this._items.length) {
            // set the first tab as active if not set by explicitly
            if (!this._activeTab) {
                this._setActiveTab(this._items[0])
            }

            // force show the first default tab
            this.show(this._activeTab.id, true)

            // show tab content based on click
            this._items.map(tab => {
                tab.triggerEl.addEventListener('click', () => {
                    this.show(tab.id)
                })
            })
        }
    }

    getActiveTab() {
        return this._activeTab
    }

    _setActiveTab(tab) {
        this._activeTab = tab
    }

    getTab(id) {
        return this._items.filter(t => t.id === id)[0]
    }

    show(id, forceShow = false) {
        const tab = this.getTab(id)

        // don't do anything if already active
        if (tab === this._activeTab && !forceShow) {
            return
        }

        // hide other tabs
        this._items.map(t => {
            if (t !== tab) {
                t.triggerEl.classList.remove(...this._options.activeClasses.split(" "));
                t.triggerEl.classList.add(...this._options.inactiveClasses.split(" "));
                t.targetEl.classList.add('hidden')
                t.triggerEl.setAttribute('aria-selected', false)
            }
        })

        // show active tab
        tab.triggerEl.classList.add(...this._options.activeClasses.split(" "));
        tab.triggerEl.classList.remove(...this._options.inactiveClasses.split(" "));
        tab.triggerEl.setAttribute('aria-selected', true)
        tab.targetEl.classList.remove('hidden')

        this._setActiveTab(tab)

        // callback function
        this._options.onShow(this, tab)
    }

}

window.Tabs = Tabs;

function initTabs() {
    document.querySelectorAll('[data-tabs-toggle]').forEach(triggerEl => {

        const tabElements = []
        let defaultTabId = null
        triggerEl.querySelectorAll('[role="tab"]').forEach(el => {
            const isActive = el.getAttribute('aria-selected') === 'true'
            const tab = {
                id: el.getAttribute('data-tabs-target'),
                triggerEl: el,
                targetEl: document.querySelector(el.getAttribute('data-tabs-target'))
            }
            tabElements.push(tab)

            if (isActive) {
                defaultTabId = tab.id
            }
        })
        new Tabs(tabElements, {
            defaultTabId: defaultTabId
        })
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tabs);

/***/ }),

/***/ "./node_modules/flowbite/src/components/tooltip/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/flowbite/src/components/tooltip/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initTooltips": () => (/* binding */ initTooltips)
/* harmony export */ });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");


const Default = {
    placement: 'top',
    triggerType: 'hover',
    onShow: () => { },
    onHide: () => { }
}

class Tooltip {
    constructor(targetEl = null, triggerEl = null, options = {}) {
        this._targetEl = targetEl
        this._triggerEl = triggerEl
        this._options = { ...Default, ...options }
        this._popperInstance = this._createPopperInstace()
        this._init()
    }

    _init() {
        if (this._triggerEl) {
            const triggerEvents = this._getTriggerEvents()
            triggerEvents.showEvents.forEach(ev => {
                this._triggerEl.addEventListener(ev, () => {
                    this.show()
                })
            })
            triggerEvents.hideEvents.forEach(ev => {
                this._triggerEl.addEventListener(ev, () => {
                    this.hide()
                })
            })
        }
    }

    _createPopperInstace() {
        return (0,_popperjs_core__WEBPACK_IMPORTED_MODULE_0__.createPopper)(this._triggerEl, this._targetEl, {
            placement: this._options.placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
            ],
        });
    }

    _getTriggerEvents() {
        switch (this._options.triggerType) {
            case 'hover':
                return {
                    showEvents: ['mouseenter', 'focus'],
                    hideEvents: ['mouseleave', 'blur']
                }
            case 'click':
                return {
                    showEvents: ['click', 'focus'],
                    hideEvents: ['focusout', 'blur']
                }
            default:
                return {
                    showEvents: ['mouseenter', 'focus'],
                    hideEvents: ['mouseleave', 'blur']
                }
        }
    }

    show() {
        this._targetEl.classList.remove('opacity-0', 'invisible')
        this._targetEl.classList.add('opacity-100', 'visible')

        // Enable the event listeners
        this._popperInstance.setOptions(options => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: true },
            ],
        }));

        // Update its position
        this._popperInstance.update()

        // callback function
        this._options.onShow(this)
    }

    hide() {
        this._targetEl.classList.remove('opacity-100', 'visible')
        this._targetEl.classList.add('opacity-0', 'invisible')

        // Disable the event listeners
        this._popperInstance.setOptions(options => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: false },
            ],
        }));

        // callback function
        this._options.onHide(this)
    }
}

window.Tooltip = Tooltip;

function initTooltips() {
    document.querySelectorAll('[data-tooltip-target]').forEach(triggerEl => {
        const targetEl = document.getElementById(triggerEl.getAttribute('data-tooltip-target'))
        const triggerType = triggerEl.getAttribute('data-tooltip-trigger');
        const placement = triggerEl.getAttribute('data-tooltip-placement');

        new Tooltip(targetEl, triggerEl, {
            placement: placement ? placement : Default.placement,
            triggerType: triggerType ? triggerType : Default.triggerType
        })
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tooltip);

/***/ }),

/***/ "./node_modules/flowbite/src/dom/events.js":
/*!*************************************************!*\
  !*** ./node_modules/flowbite/src/dom/events.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Events {
    constructor(eventType, eventFunctions = []) {
        this._eventType = eventType;
        this._eventFunctions = eventFunctions;
    }

    init() {
        this._eventFunctions.forEach((eventFunction) => {
            window.addEventListener(this._eventType, eventFunction);
        });
    }
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Events);

/***/ }),

/***/ "./node_modules/flowbite/src/flowbite.css":
/*!************************************************!*\
  !*** ./node_modules/flowbite/src/flowbite.css ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_flowbite_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!../../postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./flowbite.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./node_modules/flowbite/src/flowbite.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_flowbite_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_flowbite_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************************!*\
  !*** ./node_modules/flowbite/src/flowbite.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _flowbite_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flowbite.css */ "./node_modules/flowbite/src/flowbite.css");
/* harmony import */ var _components_accordion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/accordion */ "./node_modules/flowbite/src/components/accordion/index.js");
/* harmony import */ var _components_collapse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/collapse */ "./node_modules/flowbite/src/components/collapse/index.js");
/* harmony import */ var _components_carousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/carousel */ "./node_modules/flowbite/src/components/carousel/index.js");
/* harmony import */ var _components_dismiss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/dismiss */ "./node_modules/flowbite/src/components/dismiss/index.js");
/* harmony import */ var _components_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/dropdown */ "./node_modules/flowbite/src/components/dropdown/index.js");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/modal */ "./node_modules/flowbite/src/components/modal/index.js");
/* harmony import */ var _components_drawer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/drawer */ "./node_modules/flowbite/src/components/drawer/index.js");
/* harmony import */ var _components_tabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/tabs */ "./node_modules/flowbite/src/components/tabs/index.js");
/* harmony import */ var _components_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/tooltip */ "./node_modules/flowbite/src/components/tooltip/index.js");
/* harmony import */ var _components_popover__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/popover */ "./node_modules/flowbite/src/components/popover/index.js");
/* harmony import */ var _components_dial__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/dial */ "./node_modules/flowbite/src/components/dial/index.js");
/* harmony import */ var _dom_events__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dom/events */ "./node_modules/flowbite/src/dom/events.js");


// core components













const events = new _dom_events__WEBPACK_IMPORTED_MODULE_12__["default"]('load', [_components_accordion__WEBPACK_IMPORTED_MODULE_1__.initAccordions, _components_collapse__WEBPACK_IMPORTED_MODULE_2__.initCollapses, _components_carousel__WEBPACK_IMPORTED_MODULE_3__.initCarousels, _components_dismiss__WEBPACK_IMPORTED_MODULE_4__.initDismisses, _components_dropdown__WEBPACK_IMPORTED_MODULE_5__.initDropdowns, _components_modal__WEBPACK_IMPORTED_MODULE_6__.initModals, _components_drawer__WEBPACK_IMPORTED_MODULE_7__.initDrawers, _components_tabs__WEBPACK_IMPORTED_MODULE_8__.initTabs, _components_tooltip__WEBPACK_IMPORTED_MODULE_9__.initTooltips, _components_popover__WEBPACK_IMPORTED_MODULE_10__.initPopovers, _components_dial__WEBPACK_IMPORTED_MODULE_11__.initDials])
events.init()

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    Accordion: _components_accordion__WEBPACK_IMPORTED_MODULE_1__["default"],
    Collapse: _components_collapse__WEBPACK_IMPORTED_MODULE_2__["default"],
    Carousel: _components_carousel__WEBPACK_IMPORTED_MODULE_3__["default"],
    Dismiss: _components_dismiss__WEBPACK_IMPORTED_MODULE_4__["default"],
    Dropdown: _components_dropdown__WEBPACK_IMPORTED_MODULE_5__["default"],
    Modal: _components_modal__WEBPACK_IMPORTED_MODULE_6__["default"],
    Drawer: _components_drawer__WEBPACK_IMPORTED_MODULE_7__["default"],
    Tabs: _components_tabs__WEBPACK_IMPORTED_MODULE_8__["default"],
    Tooltip: _components_tooltip__WEBPACK_IMPORTED_MODULE_9__["default"],
    Popover: _components_popover__WEBPACK_IMPORTED_MODULE_10__["default"],
    Dial: _components_dial__WEBPACK_IMPORTED_MODULE_11__["default"],
    Events: _dom_events__WEBPACK_IMPORTED_MODULE_12__["default"]
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLEtBQUsscUJBQXFCLG9CQUFvQixNQUFNLE1BQU0sTUFBTSxLQUFLLFdBQVcsTUFBTSxNQUFNLE1BQU0saUJBQWlCLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLE9BQU8sV0FBVyxVQUFVLFVBQVUsTUFBTSxNQUFNLE1BQU0sS0FBSyxXQUFXLE1BQU0sT0FBTyxNQUFNLEtBQUssb0JBQW9CLG9CQUFvQixNQUFNLE1BQU0sb0JBQW9CLG9CQUFvQixNQUFNLE1BQU0sTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLEtBQUssS0FBSyxVQUFVLE1BQU0sUUFBUSxNQUFNLFlBQVksb0JBQW9CLHFCQUFxQixNQUFNLE1BQU0sTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLFdBQVcsS0FBSyxVQUFVLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLEtBQUssTUFBTSxLQUFLLFVBQVUsS0FBSyxNQUFNLEtBQUssVUFBVSxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxVQUFVLEtBQUssTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsS0FBSyxNQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsS0FBSyxNQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLEtBQUssTUFBTSxLQUFLLFVBQVUsS0FBSyxNQUFNLEtBQUssVUFBVSxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssVUFBVSxXQUFXLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsS0FBSyxNQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsS0FBSyxNQUFNLEtBQUssVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLFdBQVcsVUFBVSxVQUFVLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLFVBQVUsV0FBVyxLQUFLLE1BQU0sS0FBSyxVQUFVLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsS0FBSyxLQUFLLEtBQUssV0FBVyxhQUFhLE1BQU0sTUFBTSxPQUFPLEtBQUssS0FBSyxNQUFNLEtBQUssT0FBTyxLQUFLLEtBQUssTUFBTSxLQUFLLE9BQU8sS0FBSyxLQUFLLE1BQU0sS0FBSyxPQUFPLEtBQUssS0FBSyxNQUFNLEtBQUssT0FBTyxLQUFLLEtBQUssTUFBTSxLQUFLLE9BQU8sS0FBSyxLQUFLLE1BQU0sS0FBSyxPQUFPLEtBQUssS0FBSyxNQUFNLEtBQUssT0FBTyxLQUFLLEtBQUssTUFBTSxLQUFLLE1BQU0sWUFBWSxZQUFZLFlBQVksWUFBWSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLFdBQVcsWUFBWSxZQUFZLE1BQU0sTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksYUFBYSxNQUFNLE1BQU0sTUFBTSxXQUFXLFlBQVksTUFBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sWUFBWSxhQUFhLE1BQU0sTUFBTSxNQUFNLFlBQVksYUFBYSxNQUFNLE1BQU0sTUFBTSxZQUFZLGFBQWEsTUFBTSxNQUFNLE1BQU0sWUFBWSxhQUFhLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sWUFBWSxhQUFhLE1BQU0sTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLFlBQVksYUFBYSxNQUFNLE1BQU0sTUFBTSxZQUFZLGFBQWEsTUFBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sWUFBWSxhQUFhLE1BQU0sTUFBTSxNQUFNLFlBQVksYUFBYSxNQUFNLE1BQU0sTUFBTSxZQUFZLGFBQWEsTUFBTSxNQUFNLE1BQU0sWUFBWSxhQUFhLE1BQU0sTUFBTSxNQUFNLFlBQVksYUFBYSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sTUFBTSxNQUFNLFlBQVksYUFBYSxNQUFNLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxZQUFZLGFBQWEsYUFBYSxNQUFNLE1BQU0sTUFBTSxZQUFZLGFBQWEsYUFBYSxNQUFNLE1BQU0sTUFBTSxZQUFZLGFBQWEsS0FBSyxNQUFNLEtBQUssT0FBTyxRQUFRLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxXQUFXLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssV0FBVyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsV0FBVyxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sS0FB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QUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1UStCOztBQUU5QztBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBLHlFQUF5RTtBQUN6RTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLDREQUFZO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFFakMsbUJBQW1CLG9EQUFNLFVBQVUsaUVBQWMsRUFBRSwrREFBYSxFQUFFLCtEQUFhLEVBQUUsOERBQWEsRUFBRSwrREFBYSxFQUFFLHlEQUFVLEVBQUUsMkRBQVcsRUFBRSxzREFBUSxFQUFFLDZEQUFZLEVBQUUsOERBQVksRUFBRSx3REFBUztBQUN2TDs7QUFFQSxpRUFBZTtBQUNmLGFBQWE7QUFDYixZQUFZO0FBQ1osWUFBWTtBQUNaLFdBQVc7QUFDWCxZQUFZO0FBQ1osU0FBUztBQUNULFVBQVU7QUFDVixRQUFRO0FBQ1IsV0FBVztBQUNYLFdBQVc7QUFDWCxRQUFRO0FBQ1IsVUFBVTtBQUNWLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2NyZWF0ZVBvcHBlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9jb250YWlucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q2xpcHBpbmdSZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldENvbXBvc2l0ZVJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXREb2N1bWVudEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRSZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldExheW91dFJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Tm9kZU5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Tm9kZVNjcm9sbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0UGFyZW50Tm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRTY3JvbGxQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Vmlld3BvcnRSZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFdpbmRvdy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRXaW5kb3dTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0V2luZG93U2Nyb2xsQmFyWC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzTGF5b3V0Vmlld3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvaXNTY3JvbGxQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvaXNUYWJsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvbGlzdFNjcm9sbFBhcmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9lbnVtcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9hcHBseVN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9hcnJvdy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9jb21wdXRlU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2V2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2ZsaXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvaGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9vZmZzZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvcG9wcGVyT2Zmc2V0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9wcmV2ZW50T3ZlcmZsb3cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9wb3BwZXItbGl0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3BvcHBlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2NvbXB1dGVBdXRvUGxhY2VtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvY29tcHV0ZU9mZnNldHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZXhwYW5kVG9IYXNoTWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZm9ybWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0QWx0QXhpcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRGcmVzaFNpZGVPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRPcHBvc2l0ZVBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0VmFyaWF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWF0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL21lcmdlQnlOYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWVyZ2VQYWRkaW5nT2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvb3JkZXJNb2RpZmllcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9yZWN0VG9DbGllbnRSZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvdW5pcXVlQnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy91c2VyQWdlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy92YWxpZGF0ZU1vZGlmaWVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3dpdGhpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvc3JjL2Zsb3diaXRlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL3NyYy9jb21wb25lbnRzL2Nhcm91c2VsL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9zcmMvY29tcG9uZW50cy9jb2xsYXBzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvc3JjL2NvbXBvbmVudHMvZGlhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvc3JjL2NvbXBvbmVudHMvZGlzbWlzcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvc3JjL2NvbXBvbmVudHMvZHJhd2VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9zcmMvY29tcG9uZW50cy9kcm9wZG93bi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvc3JjL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL3NyYy9jb21wb25lbnRzL3RhYnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL3NyYy9jb21wb25lbnRzL3Rvb2x0aXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL3NyYy9kb20vZXZlbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9zcmMvZmxvd2JpdGUuY3NzPzFjYzQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9zcmMvZmxvd2JpdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdldENvbXBvc2l0ZVJlY3QgZnJvbSBcIi4vZG9tLXV0aWxzL2dldENvbXBvc2l0ZVJlY3QuanNcIjtcbmltcG9ydCBnZXRMYXlvdXRSZWN0IGZyb20gXCIuL2RvbS11dGlscy9nZXRMYXlvdXRSZWN0LmpzXCI7XG5pbXBvcnQgbGlzdFNjcm9sbFBhcmVudHMgZnJvbSBcIi4vZG9tLXV0aWxzL2xpc3RTY3JvbGxQYXJlbnRzLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2RvbS11dGlscy9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgb3JkZXJNb2RpZmllcnMgZnJvbSBcIi4vdXRpbHMvb3JkZXJNb2RpZmllcnMuanNcIjtcbmltcG9ydCBkZWJvdW5jZSBmcm9tIFwiLi91dGlscy9kZWJvdW5jZS5qc1wiO1xuaW1wb3J0IHZhbGlkYXRlTW9kaWZpZXJzIGZyb20gXCIuL3V0aWxzL3ZhbGlkYXRlTW9kaWZpZXJzLmpzXCI7XG5pbXBvcnQgdW5pcXVlQnkgZnJvbSBcIi4vdXRpbHMvdW5pcXVlQnkuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBtZXJnZUJ5TmFtZSBmcm9tIFwiLi91dGlscy9tZXJnZUJ5TmFtZS5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgeyBpc0VsZW1lbnQgfSBmcm9tIFwiLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IHsgYXV0byB9IGZyb20gXCIuL2VudW1zLmpzXCI7XG52YXIgSU5WQUxJRF9FTEVNRU5UX0VSUk9SID0gJ1BvcHBlcjogSW52YWxpZCByZWZlcmVuY2Ugb3IgcG9wcGVyIGFyZ3VtZW50IHByb3ZpZGVkLiBUaGV5IG11c3QgYmUgZWl0aGVyIGEgRE9NIGVsZW1lbnQgb3IgdmlydHVhbCBlbGVtZW50Lic7XG52YXIgSU5GSU5JVEVfTE9PUF9FUlJPUiA9ICdQb3BwZXI6IEFuIGluZmluaXRlIGxvb3AgaW4gdGhlIG1vZGlmaWVycyBjeWNsZSBoYXMgYmVlbiBkZXRlY3RlZCEgVGhlIGN5Y2xlIGhhcyBiZWVuIGludGVycnVwdGVkIHRvIHByZXZlbnQgYSBicm93c2VyIGNyYXNoLic7XG52YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICBtb2RpZmllcnM6IFtdLFxuICBzdHJhdGVneTogJ2Fic29sdXRlJ1xufTtcblxuZnVuY3Rpb24gYXJlVmFsaWRFbGVtZW50cygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiAhYXJncy5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuICEoZWxlbWVudCAmJiB0eXBlb2YgZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPT09ICdmdW5jdGlvbicpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHBlckdlbmVyYXRvcihnZW5lcmF0b3JPcHRpb25zKSB7XG4gIGlmIChnZW5lcmF0b3JPcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBnZW5lcmF0b3JPcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX2dlbmVyYXRvck9wdGlvbnMgPSBnZW5lcmF0b3JPcHRpb25zLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmID0gX2dlbmVyYXRvck9wdGlvbnMuZGVmYXVsdE1vZGlmaWVycyxcbiAgICAgIGRlZmF1bHRNb2RpZmllcnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYgPT09IHZvaWQgMCA/IFtdIDogX2dlbmVyYXRvck9wdGlvbnMkZGVmLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmMiA9IF9nZW5lcmF0b3JPcHRpb25zLmRlZmF1bHRPcHRpb25zLFxuICAgICAgZGVmYXVsdE9wdGlvbnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyID09PSB2b2lkIDAgPyBERUZBVUxUX09QVElPTlMgOiBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyO1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlUG9wcGVyKHJlZmVyZW5jZSwgcG9wcGVyLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xuICAgIH1cblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgICBvcmRlcmVkTW9kaWZpZXJzOiBbXSxcbiAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgZGVmYXVsdE9wdGlvbnMpLFxuICAgICAgbW9kaWZpZXJzRGF0YToge30sXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICByZWZlcmVuY2U6IHJlZmVyZW5jZSxcbiAgICAgICAgcG9wcGVyOiBwb3BwZXJcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9O1xuICAgIHZhciBlZmZlY3RDbGVhbnVwRm5zID0gW107XG4gICAgdmFyIGlzRGVzdHJveWVkID0gZmFsc2U7XG4gICAgdmFyIGluc3RhbmNlID0ge1xuICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgc2V0T3B0aW9uczogZnVuY3Rpb24gc2V0T3B0aW9ucyhzZXRPcHRpb25zQWN0aW9uKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIHNldE9wdGlvbnNBY3Rpb24gPT09ICdmdW5jdGlvbicgPyBzZXRPcHRpb25zQWN0aW9uKHN0YXRlLm9wdGlvbnMpIDogc2V0T3B0aW9uc0FjdGlvbjtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBzdGF0ZS5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIHN0YXRlLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBzdGF0ZS5zY3JvbGxQYXJlbnRzID0ge1xuICAgICAgICAgIHJlZmVyZW5jZTogaXNFbGVtZW50KHJlZmVyZW5jZSkgPyBsaXN0U2Nyb2xsUGFyZW50cyhyZWZlcmVuY2UpIDogcmVmZXJlbmNlLmNvbnRleHRFbGVtZW50ID8gbGlzdFNjcm9sbFBhcmVudHMocmVmZXJlbmNlLmNvbnRleHRFbGVtZW50KSA6IFtdLFxuICAgICAgICAgIHBvcHBlcjogbGlzdFNjcm9sbFBhcmVudHMocG9wcGVyKVxuICAgICAgICB9OyAvLyBPcmRlcnMgdGhlIG1vZGlmaWVycyBiYXNlZCBvbiB0aGVpciBkZXBlbmRlbmNpZXMgYW5kIGBwaGFzZWBcbiAgICAgICAgLy8gcHJvcGVydGllc1xuXG4gICAgICAgIHZhciBvcmRlcmVkTW9kaWZpZXJzID0gb3JkZXJNb2RpZmllcnMobWVyZ2VCeU5hbWUoW10uY29uY2F0KGRlZmF1bHRNb2RpZmllcnMsIHN0YXRlLm9wdGlvbnMubW9kaWZpZXJzKSkpOyAvLyBTdHJpcCBvdXQgZGlzYWJsZWQgbW9kaWZpZXJzXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyZWRNb2RpZmllcnMuZmlsdGVyKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgcmV0dXJuIG0uZW5hYmxlZDtcbiAgICAgICAgfSk7IC8vIFZhbGlkYXRlIHRoZSBwcm92aWRlZCBtb2RpZmllcnMgc28gdGhhdCB0aGUgY29uc3VtZXIgd2lsbCBnZXQgd2FybmVkXG4gICAgICAgIC8vIGlmIG9uZSBvZiB0aGUgbW9kaWZpZXJzIGlzIGludmFsaWQgZm9yIGFueSByZWFzb25cblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgdmFyIG1vZGlmaWVycyA9IHVuaXF1ZUJ5KFtdLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLCBzdGF0ZS5vcHRpb25zLm1vZGlmaWVycyksIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IF9yZWYubmFtZTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkYXRlTW9kaWZpZXJzKG1vZGlmaWVycyk7XG5cbiAgICAgICAgICBpZiAoZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5vcHRpb25zLnBsYWNlbWVudCkgPT09IGF1dG8pIHtcbiAgICAgICAgICAgIHZhciBmbGlwTW9kaWZpZXIgPSBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZpbmQoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICAgICAgICAgIHZhciBuYW1lID0gX3JlZjIubmFtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5hbWUgPT09ICdmbGlwJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIWZsaXBNb2RpZmllcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFsnUG9wcGVyOiBcImF1dG9cIiBwbGFjZW1lbnRzIHJlcXVpcmUgdGhlIFwiZmxpcFwiIG1vZGlmaWVyIGJlJywgJ3ByZXNlbnQgYW5kIGVuYWJsZWQgdG8gd29yay4nXS5qb2luKCcgJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfZ2V0Q29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUocG9wcGVyKSxcbiAgICAgICAgICAgICAgbWFyZ2luVG9wID0gX2dldENvbXB1dGVkU3R5bGUubWFyZ2luVG9wLFxuICAgICAgICAgICAgICBtYXJnaW5SaWdodCA9IF9nZXRDb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0LFxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b20gPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5Cb3R0b20sXG4gICAgICAgICAgICAgIG1hcmdpbkxlZnQgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5MZWZ0OyAvLyBXZSBubyBsb25nZXIgdGFrZSBpbnRvIGFjY291bnQgYG1hcmdpbnNgIG9uIHRoZSBwb3BwZXIsIGFuZCBpdCBjYW5cbiAgICAgICAgICAvLyBjYXVzZSBidWdzIHdpdGggcG9zaXRpb25pbmcsIHNvIHdlJ2xsIHdhcm4gdGhlIGNvbnN1bWVyXG5cblxuICAgICAgICAgIGlmIChbbWFyZ2luVG9wLCBtYXJnaW5SaWdodCwgbWFyZ2luQm90dG9tLCBtYXJnaW5MZWZ0XS5zb21lKGZ1bmN0aW9uIChtYXJnaW4pIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG1hcmdpbik7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihbJ1BvcHBlcjogQ1NTIFwibWFyZ2luXCIgc3R5bGVzIGNhbm5vdCBiZSB1c2VkIHRvIGFwcGx5IHBhZGRpbmcnLCAnYmV0d2VlbiB0aGUgcG9wcGVyIGFuZCBpdHMgcmVmZXJlbmNlIGVsZW1lbnQgb3IgYm91bmRhcnkuJywgJ1RvIHJlcGxpY2F0ZSBtYXJnaW4sIHVzZSB0aGUgYG9mZnNldGAgbW9kaWZpZXIsIGFzIHdlbGwgYXMnLCAndGhlIGBwYWRkaW5nYCBvcHRpb24gaW4gdGhlIGBwcmV2ZW50T3ZlcmZsb3dgIGFuZCBgZmxpcGAnLCAnbW9kaWZpZXJzLiddLmpvaW4oJyAnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcnVuTW9kaWZpZXJFZmZlY3RzKCk7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgIH0sXG4gICAgICAvLyBTeW5jIHVwZGF0ZSDigJMgaXQgd2lsbCBhbHdheXMgYmUgZXhlY3V0ZWQsIGV2ZW4gaWYgbm90IG5lY2Vzc2FyeS4gVGhpc1xuICAgICAgLy8gaXMgdXNlZnVsIGZvciBsb3cgZnJlcXVlbmN5IHVwZGF0ZXMgd2hlcmUgc3luYyBiZWhhdmlvciBzaW1wbGlmaWVzIHRoZVxuICAgICAgLy8gbG9naWMuXG4gICAgICAvLyBGb3IgaGlnaCBmcmVxdWVuY3kgdXBkYXRlcyAoZS5nLiBgcmVzaXplYCBhbmQgYHNjcm9sbGAgZXZlbnRzKSwgYWx3YXlzXG4gICAgICAvLyBwcmVmZXIgdGhlIGFzeW5jIFBvcHBlciN1cGRhdGUgbWV0aG9kXG4gICAgICBmb3JjZVVwZGF0ZTogZnVuY3Rpb24gZm9yY2VVcGRhdGUoKSB7XG4gICAgICAgIGlmIChpc0Rlc3Ryb3llZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfc3RhdGUkZWxlbWVudHMgPSBzdGF0ZS5lbGVtZW50cyxcbiAgICAgICAgICAgIHJlZmVyZW5jZSA9IF9zdGF0ZSRlbGVtZW50cy5yZWZlcmVuY2UsXG4gICAgICAgICAgICBwb3BwZXIgPSBfc3RhdGUkZWxlbWVudHMucG9wcGVyOyAvLyBEb24ndCBwcm9jZWVkIGlmIGByZWZlcmVuY2VgIG9yIGBwb3BwZXJgIGFyZSBub3QgdmFsaWQgZWxlbWVudHNcbiAgICAgICAgLy8gYW55bW9yZVxuXG4gICAgICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKElOVkFMSURfRUxFTUVOVF9FUlJPUik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIFN0b3JlIHRoZSByZWZlcmVuY2UgYW5kIHBvcHBlciByZWN0cyB0byBiZSByZWFkIGJ5IG1vZGlmaWVyc1xuXG5cbiAgICAgICAgc3RhdGUucmVjdHMgPSB7XG4gICAgICAgICAgcmVmZXJlbmNlOiBnZXRDb21wb3NpdGVSZWN0KHJlZmVyZW5jZSwgZ2V0T2Zmc2V0UGFyZW50KHBvcHBlciksIHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3kgPT09ICdmaXhlZCcpLFxuICAgICAgICAgIHBvcHBlcjogZ2V0TGF5b3V0UmVjdChwb3BwZXIpXG4gICAgICAgIH07IC8vIE1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIHJlc2V0IHRoZSBjdXJyZW50IHVwZGF0ZSBjeWNsZS4gVGhlXG4gICAgICAgIC8vIG1vc3QgY29tbW9uIHVzZSBjYXNlIGZvciB0aGlzIGlzIHRoZSBgZmxpcGAgbW9kaWZpZXIgY2hhbmdpbmcgdGhlXG4gICAgICAgIC8vIHBsYWNlbWVudCwgd2hpY2ggdGhlbiBuZWVkcyB0byByZS1ydW4gYWxsIHRoZSBtb2RpZmllcnMsIGJlY2F1c2UgdGhlXG4gICAgICAgIC8vIGxvZ2ljIHdhcyBwcmV2aW91c2x5IHJhbiBmb3IgdGhlIHByZXZpb3VzIHBsYWNlbWVudCBhbmQgaXMgdGhlcmVmb3JlXG4gICAgICAgIC8vIHN0YWxlL2luY29ycmVjdFxuXG4gICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLnBsYWNlbWVudCA9IHN0YXRlLm9wdGlvbnMucGxhY2VtZW50OyAvLyBPbiBlYWNoIHVwZGF0ZSBjeWNsZSwgdGhlIGBtb2RpZmllcnNEYXRhYCBwcm9wZXJ0eSBmb3IgZWFjaCBtb2RpZmllclxuICAgICAgICAvLyBpcyBmaWxsZWQgd2l0aCB0aGUgaW5pdGlhbCBkYXRhIHNwZWNpZmllZCBieSB0aGUgbW9kaWZpZXIuIFRoaXMgbWVhbnNcbiAgICAgICAgLy8gaXQgZG9lc24ndCBwZXJzaXN0IGFuZCBpcyBmcmVzaCBvbiBlYWNoIHVwZGF0ZS5cbiAgICAgICAgLy8gVG8gZW5zdXJlIHBlcnNpc3RlbnQgZGF0YSwgdXNlIGAke25hbWV9I3BlcnNpc3RlbnRgXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5tb2RpZmllcnNEYXRhW21vZGlmaWVyLm5hbWVdID0gT2JqZWN0LmFzc2lnbih7fSwgbW9kaWZpZXIuZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgX19kZWJ1Z19sb29wc19fID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBfX2RlYnVnX2xvb3BzX18gKz0gMTtcblxuICAgICAgICAgICAgaWYgKF9fZGVidWdfbG9vcHNfXyA+IDEwMCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKElORklOSVRFX0xPT1BfRVJST1IpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3RhdGUucmVzZXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIF9zdGF0ZSRvcmRlcmVkTW9kaWZpZSA9IHN0YXRlLm9yZGVyZWRNb2RpZmllcnNbaW5kZXhdLFxuICAgICAgICAgICAgICBmbiA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5mbixcbiAgICAgICAgICAgICAgX3N0YXRlJG9yZGVyZWRNb2RpZmllMiA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5vcHRpb25zLFxuICAgICAgICAgICAgICBfb3B0aW9ucyA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIgPT09IHZvaWQgMCA/IHt9IDogX3N0YXRlJG9yZGVyZWRNb2RpZmllMixcbiAgICAgICAgICAgICAgbmFtZSA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5uYW1lO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgc3RhdGUgPSBmbih7XG4gICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgICAgb3B0aW9uczogX29wdGlvbnMsXG4gICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZVxuICAgICAgICAgICAgfSkgfHwgc3RhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gQXN5bmMgYW5kIG9wdGltaXN0aWNhbGx5IG9wdGltaXplZCB1cGRhdGUg4oCTIGl0IHdpbGwgbm90IGJlIGV4ZWN1dGVkIGlmXG4gICAgICAvLyBub3QgbmVjZXNzYXJ5IChkZWJvdW5jZWQgdG8gcnVuIGF0IG1vc3Qgb25jZS1wZXItdGljaylcbiAgICAgIHVwZGF0ZTogZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICBpbnN0YW5jZS5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgIHJlc29sdmUoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBpc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihJTlZBTElEX0VMRU1FTlRfRVJST1IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgaW5zdGFuY2Uuc2V0T3B0aW9ucyhvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgaWYgKCFpc0Rlc3Ryb3llZCAmJiBvcHRpb25zLm9uRmlyc3RVcGRhdGUpIHtcbiAgICAgICAgb3B0aW9ucy5vbkZpcnN0VXBkYXRlKHN0YXRlKTtcbiAgICAgIH1cbiAgICB9KTsgLy8gTW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSBiZWZvcmUgdGhlIGZpcnN0XG4gICAgLy8gdXBkYXRlIGN5Y2xlIHJ1bnMuIFRoZXkgd2lsbCBiZSBleGVjdXRlZCBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgdXBkYXRlXG4gICAgLy8gY3ljbGUuIFRoaXMgaXMgdXNlZnVsIHdoZW4gYSBtb2RpZmllciBhZGRzIHNvbWUgcGVyc2lzdGVudCBkYXRhIHRoYXRcbiAgICAvLyBvdGhlciBtb2RpZmllcnMgbmVlZCB0byB1c2UsIGJ1dCB0aGUgbW9kaWZpZXIgaXMgcnVuIGFmdGVyIHRoZSBkZXBlbmRlbnRcbiAgICAvLyBvbmUuXG5cbiAgICBmdW5jdGlvbiBydW5Nb2RpZmllckVmZmVjdHMoKSB7XG4gICAgICBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICAgIHZhciBuYW1lID0gX3JlZjMubmFtZSxcbiAgICAgICAgICAgIF9yZWYzJG9wdGlvbnMgPSBfcmVmMy5vcHRpb25zLFxuICAgICAgICAgICAgb3B0aW9ucyA9IF9yZWYzJG9wdGlvbnMgPT09IHZvaWQgMCA/IHt9IDogX3JlZjMkb3B0aW9ucyxcbiAgICAgICAgICAgIGVmZmVjdCA9IF9yZWYzLmVmZmVjdDtcblxuICAgICAgICBpZiAodHlwZW9mIGVmZmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBjbGVhbnVwRm4gPSBlZmZlY3Qoe1xuICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhciBub29wRm4gPSBmdW5jdGlvbiBub29wRm4oKSB7fTtcblxuICAgICAgICAgIGVmZmVjdENsZWFudXBGbnMucHVzaChjbGVhbnVwRm4gfHwgbm9vcEZuKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpIHtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICB9KTtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMgPSBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG59XG5leHBvcnQgdmFyIGNyZWF0ZVBvcHBlciA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3IoKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBkZXRlY3RPdmVyZmxvdyB9OyIsImltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRhaW5zKHBhcmVudCwgY2hpbGQpIHtcbiAgdmFyIHJvb3ROb2RlID0gY2hpbGQuZ2V0Um9vdE5vZGUgJiYgY2hpbGQuZ2V0Um9vdE5vZGUoKTsgLy8gRmlyc3QsIGF0dGVtcHQgd2l0aCBmYXN0ZXIgbmF0aXZlIG1ldGhvZFxuXG4gIGlmIChwYXJlbnQuY29udGFpbnMoY2hpbGQpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gdGhlbiBmYWxsYmFjayB0byBjdXN0b20gaW1wbGVtZW50YXRpb24gd2l0aCBTaGFkb3cgRE9NIHN1cHBvcnRcbiAgZWxzZSBpZiAocm9vdE5vZGUgJiYgaXNTaGFkb3dSb290KHJvb3ROb2RlKSkge1xuICAgICAgdmFyIG5leHQgPSBjaGlsZDtcblxuICAgICAgZG8ge1xuICAgICAgICBpZiAobmV4dCAmJiBwYXJlbnQuaXNTYW1lTm9kZShuZXh0KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXTogbmVlZCBhIGJldHRlciB3YXkgdG8gaGFuZGxlIHRoaXMuLi5cblxuXG4gICAgICAgIG5leHQgPSBuZXh0LnBhcmVudE5vZGUgfHwgbmV4dC5ob3N0O1xuICAgICAgfSB3aGlsZSAobmV4dCk7XG4gICAgfSAvLyBHaXZlIHVwLCB0aGUgcmVzdWx0IGlzIGZhbHNlXG5cblxuICByZXR1cm4gZmFsc2U7XG59IiwiaW1wb3J0IHsgaXNFbGVtZW50LCBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc0xheW91dFZpZXdwb3J0IGZyb20gXCIuL2lzTGF5b3V0Vmlld3BvcnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50LCBpbmNsdWRlU2NhbGUsIGlzRml4ZWRTdHJhdGVneSkge1xuICBpZiAoaW5jbHVkZVNjYWxlID09PSB2b2lkIDApIHtcbiAgICBpbmNsdWRlU2NhbGUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc0ZpeGVkU3RyYXRlZ3kgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWRTdHJhdGVneSA9IGZhbHNlO1xuICB9XG5cbiAgdmFyIGNsaWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgc2NhbGVYID0gMTtcbiAgdmFyIHNjYWxlWSA9IDE7XG5cbiAgaWYgKGluY2x1ZGVTY2FsZSAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgc2NhbGVYID0gZWxlbWVudC5vZmZzZXRXaWR0aCA+IDAgPyByb3VuZChjbGllbnRSZWN0LndpZHRoKSAvIGVsZW1lbnQub2Zmc2V0V2lkdGggfHwgMSA6IDE7XG4gICAgc2NhbGVZID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgPiAwID8gcm91bmQoY2xpZW50UmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMSA6IDE7XG4gIH1cblxuICB2YXIgX3JlZiA9IGlzRWxlbWVudChlbGVtZW50KSA/IGdldFdpbmRvdyhlbGVtZW50KSA6IHdpbmRvdyxcbiAgICAgIHZpc3VhbFZpZXdwb3J0ID0gX3JlZi52aXN1YWxWaWV3cG9ydDtcblxuICB2YXIgYWRkVmlzdWFsT2Zmc2V0cyA9ICFpc0xheW91dFZpZXdwb3J0KCkgJiYgaXNGaXhlZFN0cmF0ZWd5O1xuICB2YXIgeCA9IChjbGllbnRSZWN0LmxlZnQgKyAoYWRkVmlzdWFsT2Zmc2V0cyAmJiB2aXN1YWxWaWV3cG9ydCA/IHZpc3VhbFZpZXdwb3J0Lm9mZnNldExlZnQgOiAwKSkgLyBzY2FsZVg7XG4gIHZhciB5ID0gKGNsaWVudFJlY3QudG9wICsgKGFkZFZpc3VhbE9mZnNldHMgJiYgdmlzdWFsVmlld3BvcnQgPyB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3AgOiAwKSkgLyBzY2FsZVk7XG4gIHZhciB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGggLyBzY2FsZVg7XG4gIHZhciBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodCAvIHNjYWxlWTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgdG9wOiB5LFxuICAgIHJpZ2h0OiB4ICsgd2lkdGgsXG4gICAgYm90dG9tOiB5ICsgaGVpZ2h0LFxuICAgIGxlZnQ6IHgsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59IiwiaW1wb3J0IHsgdmlld3BvcnQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRWaWV3cG9ydFJlY3QgZnJvbSBcIi4vZ2V0Vmlld3BvcnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRSZWN0IGZyb20gXCIuL2dldERvY3VtZW50UmVjdC5qc1wiO1xuaW1wb3J0IGxpc3RTY3JvbGxQYXJlbnRzIGZyb20gXCIuL2xpc3RTY3JvbGxQYXJlbnRzLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuL2dldE9mZnNldFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgY29udGFpbnMgZnJvbSBcIi4vY29udGFpbnMuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHJlY3RUb0NsaWVudFJlY3QgZnJvbSBcIi4uL3V0aWxzL3JlY3RUb0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCB7IG1heCwgbWluIH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjtcblxuZnVuY3Rpb24gZ2V0SW5uZXJCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpIHtcbiAgdmFyIHJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgZmFsc2UsIHN0cmF0ZWd5ID09PSAnZml4ZWQnKTtcbiAgcmVjdC50b3AgPSByZWN0LnRvcCArIGVsZW1lbnQuY2xpZW50VG9wO1xuICByZWN0LmxlZnQgPSByZWN0LmxlZnQgKyBlbGVtZW50LmNsaWVudExlZnQ7XG4gIHJlY3QuYm90dG9tID0gcmVjdC50b3AgKyBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgcmVjdC5yaWdodCA9IHJlY3QubGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIHJlY3Qud2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICByZWN0LmhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICByZWN0LnggPSByZWN0LmxlZnQ7XG4gIHJlY3QueSA9IHJlY3QudG9wO1xuICByZXR1cm4gcmVjdDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgY2xpcHBpbmdQYXJlbnQsIHN0cmF0ZWd5KSB7XG4gIHJldHVybiBjbGlwcGluZ1BhcmVudCA9PT0gdmlld3BvcnQgPyByZWN0VG9DbGllbnRSZWN0KGdldFZpZXdwb3J0UmVjdChlbGVtZW50LCBzdHJhdGVneSkpIDogaXNFbGVtZW50KGNsaXBwaW5nUGFyZW50KSA/IGdldElubmVyQm91bmRpbmdDbGllbnRSZWN0KGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSkgOiByZWN0VG9DbGllbnRSZWN0KGdldERvY3VtZW50UmVjdChnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkpKTtcbn0gLy8gQSBcImNsaXBwaW5nIHBhcmVudFwiIGlzIGFuIG92ZXJmbG93YWJsZSBjb250YWluZXIgd2l0aCB0aGUgY2hhcmFjdGVyaXN0aWMgb2Zcbi8vIGNsaXBwaW5nIChvciBoaWRpbmcpIG92ZXJmbG93aW5nIGVsZW1lbnRzIHdpdGggYSBwb3NpdGlvbiBkaWZmZXJlbnQgZnJvbVxuLy8gYGluaXRpYWxgXG5cblxuZnVuY3Rpb24gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIHtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IGxpc3RTY3JvbGxQYXJlbnRzKGdldFBhcmVudE5vZGUoZWxlbWVudCkpO1xuICB2YXIgY2FuRXNjYXBlQ2xpcHBpbmcgPSBbJ2Fic29sdXRlJywgJ2ZpeGVkJ10uaW5kZXhPZihnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uKSA+PSAwO1xuICB2YXIgY2xpcHBlckVsZW1lbnQgPSBjYW5Fc2NhcGVDbGlwcGluZyAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpID8gZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQpIDogZWxlbWVudDtcblxuICBpZiAoIWlzRWxlbWVudChjbGlwcGVyRWxlbWVudCkpIHtcbiAgICByZXR1cm4gW107XG4gIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzE0MTRcblxuXG4gIHJldHVybiBjbGlwcGluZ1BhcmVudHMuZmlsdGVyKGZ1bmN0aW9uIChjbGlwcGluZ1BhcmVudCkge1xuICAgIHJldHVybiBpc0VsZW1lbnQoY2xpcHBpbmdQYXJlbnQpICYmIGNvbnRhaW5zKGNsaXBwaW5nUGFyZW50LCBjbGlwcGVyRWxlbWVudCkgJiYgZ2V0Tm9kZU5hbWUoY2xpcHBpbmdQYXJlbnQpICE9PSAnYm9keSc7XG4gIH0pO1xufSAvLyBHZXRzIHRoZSBtYXhpbXVtIGFyZWEgdGhhdCB0aGUgZWxlbWVudCBpcyB2aXNpYmxlIGluIGR1ZSB0byBhbnkgbnVtYmVyIG9mXG4vLyBjbGlwcGluZyBwYXJlbnRzXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q2xpcHBpbmdSZWN0KGVsZW1lbnQsIGJvdW5kYXJ5LCByb290Qm91bmRhcnksIHN0cmF0ZWd5KSB7XG4gIHZhciBtYWluQ2xpcHBpbmdQYXJlbnRzID0gYm91bmRhcnkgPT09ICdjbGlwcGluZ1BhcmVudHMnID8gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIDogW10uY29uY2F0KGJvdW5kYXJ5KTtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IFtdLmNvbmNhdChtYWluQ2xpcHBpbmdQYXJlbnRzLCBbcm9vdEJvdW5kYXJ5XSk7XG4gIHZhciBmaXJzdENsaXBwaW5nUGFyZW50ID0gY2xpcHBpbmdQYXJlbnRzWzBdO1xuICB2YXIgY2xpcHBpbmdSZWN0ID0gY2xpcHBpbmdQYXJlbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjUmVjdCwgY2xpcHBpbmdQYXJlbnQpIHtcbiAgICB2YXIgcmVjdCA9IGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSk7XG4gICAgYWNjUmVjdC50b3AgPSBtYXgocmVjdC50b3AsIGFjY1JlY3QudG9wKTtcbiAgICBhY2NSZWN0LnJpZ2h0ID0gbWluKHJlY3QucmlnaHQsIGFjY1JlY3QucmlnaHQpO1xuICAgIGFjY1JlY3QuYm90dG9tID0gbWluKHJlY3QuYm90dG9tLCBhY2NSZWN0LmJvdHRvbSk7XG4gICAgYWNjUmVjdC5sZWZ0ID0gbWF4KHJlY3QubGVmdCwgYWNjUmVjdC5sZWZ0KTtcbiAgICByZXR1cm4gYWNjUmVjdDtcbiAgfSwgZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgZmlyc3RDbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpKTtcbiAgY2xpcHBpbmdSZWN0LndpZHRoID0gY2xpcHBpbmdSZWN0LnJpZ2h0IC0gY2xpcHBpbmdSZWN0LmxlZnQ7XG4gIGNsaXBwaW5nUmVjdC5oZWlnaHQgPSBjbGlwcGluZ1JlY3QuYm90dG9tIC0gY2xpcHBpbmdSZWN0LnRvcDtcbiAgY2xpcHBpbmdSZWN0LnggPSBjbGlwcGluZ1JlY3QubGVmdDtcbiAgY2xpcHBpbmdSZWN0LnkgPSBjbGlwcGluZ1JlY3QudG9wO1xuICByZXR1cm4gY2xpcHBpbmdSZWN0O1xufSIsImltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZVNjcm9sbCBmcm9tIFwiLi9nZXROb2RlU2Nyb2xsLmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGlzU2Nyb2xsUGFyZW50IGZyb20gXCIuL2lzU2Nyb2xsUGFyZW50LmpzXCI7XG5pbXBvcnQgeyByb3VuZCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7XG5cbmZ1bmN0aW9uIGlzRWxlbWVudFNjYWxlZChlbGVtZW50KSB7XG4gIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHNjYWxlWCA9IHJvdW5kKHJlY3Qud2lkdGgpIC8gZWxlbWVudC5vZmZzZXRXaWR0aCB8fCAxO1xuICB2YXIgc2NhbGVZID0gcm91bmQocmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMTtcbiAgcmV0dXJuIHNjYWxlWCAhPT0gMSB8fCBzY2FsZVkgIT09IDE7XG59IC8vIFJldHVybnMgdGhlIGNvbXBvc2l0ZSByZWN0IG9mIGFuIGVsZW1lbnQgcmVsYXRpdmUgdG8gaXRzIG9mZnNldFBhcmVudC5cbi8vIENvbXBvc2l0ZSBtZWFucyBpdCB0YWtlcyBpbnRvIGFjY291bnQgdHJhbnNmb3JtcyBhcyB3ZWxsIGFzIGxheW91dC5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wb3NpdGVSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnQsIGlzRml4ZWQpIHtcbiAgaWYgKGlzRml4ZWQgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBpc09mZnNldFBhcmVudEFuRWxlbWVudCA9IGlzSFRNTEVsZW1lbnQob2Zmc2V0UGFyZW50KTtcbiAgdmFyIG9mZnNldFBhcmVudElzU2NhbGVkID0gaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpICYmIGlzRWxlbWVudFNjYWxlZChvZmZzZXRQYXJlbnQpO1xuICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KG9mZnNldFBhcmVudCk7XG4gIHZhciByZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnRJc1NjYWxlZCwgaXNGaXhlZCk7XG4gIHZhciBzY3JvbGwgPSB7XG4gICAgc2Nyb2xsTGVmdDogMCxcbiAgICBzY3JvbGxUb3A6IDBcbiAgfTtcbiAgdmFyIG9mZnNldHMgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgaWYgKGlzT2Zmc2V0UGFyZW50QW5FbGVtZW50IHx8ICFpc09mZnNldFBhcmVudEFuRWxlbWVudCAmJiAhaXNGaXhlZCkge1xuICAgIGlmIChnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpICE9PSAnYm9keScgfHwgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMDc4XG4gICAgaXNTY3JvbGxQYXJlbnQoZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgc2Nyb2xsID0gZ2V0Tm9kZVNjcm9sbChvZmZzZXRQYXJlbnQpO1xuICAgIH1cblxuICAgIGlmIChpc0hUTUxFbGVtZW50KG9mZnNldFBhcmVudCkpIHtcbiAgICAgIG9mZnNldHMgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qob2Zmc2V0UGFyZW50LCB0cnVlKTtcbiAgICAgIG9mZnNldHMueCArPSBvZmZzZXRQYXJlbnQuY2xpZW50TGVmdDtcbiAgICAgIG9mZnNldHMueSArPSBvZmZzZXRQYXJlbnQuY2xpZW50VG9wO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICBvZmZzZXRzLnggPSBnZXRXaW5kb3dTY3JvbGxCYXJYKGRvY3VtZW50RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4OiByZWN0LmxlZnQgKyBzY3JvbGwuc2Nyb2xsTGVmdCAtIG9mZnNldHMueCxcbiAgICB5OiByZWN0LnRvcCArIHNjcm9sbC5zY3JvbGxUb3AgLSBvZmZzZXRzLnksXG4gICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiByZWN0LmhlaWdodFxuICB9O1xufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGdldFdpbmRvdyhlbGVtZW50KS5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xufSIsImltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSB7XG4gIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl06IGFzc3VtZSBib2R5IGlzIGFsd2F5cyBhdmFpbGFibGVcbiAgcmV0dXJuICgoaXNFbGVtZW50KGVsZW1lbnQpID8gZWxlbWVudC5vd25lckRvY3VtZW50IDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gIGVsZW1lbnQuZG9jdW1lbnQpIHx8IHdpbmRvdy5kb2N1bWVudCkuZG9jdW1lbnRFbGVtZW50O1xufSIsImltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbC5qc1wiO1xuaW1wb3J0IHsgbWF4IH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjsgLy8gR2V0cyB0aGUgZW50aXJlIHNpemUgb2YgdGhlIHNjcm9sbGFibGUgZG9jdW1lbnQgYXJlYSwgZXZlbiBleHRlbmRpbmcgb3V0c2lkZVxuLy8gb2YgdGhlIGA8aHRtbD5gIGFuZCBgPGJvZHk+YCByZWN0IGJvdW5kcyBpZiBob3Jpem9udGFsbHkgc2Nyb2xsYWJsZVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXREb2N1bWVudFJlY3QoZWxlbWVudCkge1xuICB2YXIgX2VsZW1lbnQkb3duZXJEb2N1bWVuO1xuXG4gIHZhciBodG1sID0gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpO1xuICB2YXIgd2luU2Nyb2xsID0gZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpO1xuICB2YXIgYm9keSA9IChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keTtcbiAgdmFyIHdpZHRoID0gbWF4KGh0bWwuc2Nyb2xsV2lkdGgsIGh0bWwuY2xpZW50V2lkdGgsIGJvZHkgPyBib2R5LnNjcm9sbFdpZHRoIDogMCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKTtcbiAgdmFyIGhlaWdodCA9IG1heChodG1sLnNjcm9sbEhlaWdodCwgaHRtbC5jbGllbnRIZWlnaHQsIGJvZHkgPyBib2R5LnNjcm9sbEhlaWdodCA6IDAsIGJvZHkgPyBib2R5LmNsaWVudEhlaWdodCA6IDApO1xuICB2YXIgeCA9IC13aW5TY3JvbGwuc2Nyb2xsTGVmdCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCk7XG4gIHZhciB5ID0gLXdpblNjcm9sbC5zY3JvbGxUb3A7XG5cbiAgaWYgKGdldENvbXB1dGVkU3R5bGUoYm9keSB8fCBodG1sKS5kaXJlY3Rpb24gPT09ICdydGwnKSB7XG4gICAgeCArPSBtYXgoaHRtbC5jbGllbnRXaWR0aCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKSAtIHdpZHRoO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0SFRNTEVsZW1lbnRTY3JvbGwoZWxlbWVudCkge1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IGVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICBzY3JvbGxUb3A6IGVsZW1lbnQuc2Nyb2xsVG9wXG4gIH07XG59IiwiaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjsgLy8gUmV0dXJucyB0aGUgbGF5b3V0IHJlY3Qgb2YgYW4gZWxlbWVudCByZWxhdGl2ZSB0byBpdHMgb2Zmc2V0UGFyZW50LiBMYXlvdXRcbi8vIG1lYW5zIGl0IGRvZXNuJ3QgdGFrZSBpbnRvIGFjY291bnQgdHJhbnNmb3Jtcy5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TGF5b3V0UmVjdChlbGVtZW50KSB7XG4gIHZhciBjbGllbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQpOyAvLyBVc2UgdGhlIGNsaWVudFJlY3Qgc2l6ZXMgaWYgaXQncyBub3QgYmVlbiB0cmFuc2Zvcm1lZC5cbiAgLy8gRml4ZXMgaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMjIzXG5cbiAgdmFyIHdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gIGlmIChNYXRoLmFicyhjbGllbnRSZWN0LndpZHRoIC0gd2lkdGgpIDw9IDEpIHtcbiAgICB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGg7XG4gIH1cblxuICBpZiAoTWF0aC5hYnMoY2xpZW50UmVjdC5oZWlnaHQgLSBoZWlnaHQpIDw9IDEpIHtcbiAgICBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeDogZWxlbWVudC5vZmZzZXRMZWZ0LFxuICAgIHk6IGVsZW1lbnQub2Zmc2V0VG9wLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE5vZGVOYW1lKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgPyAoZWxlbWVudC5ub2RlTmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKSA6IG51bGw7XG59IiwiaW1wb3J0IGdldFdpbmRvd1Njcm9sbCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGwuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGdldEhUTUxFbGVtZW50U2Nyb2xsIGZyb20gXCIuL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlU2Nyb2xsKG5vZGUpIHtcbiAgaWYgKG5vZGUgPT09IGdldFdpbmRvdyhub2RlKSB8fCAhaXNIVE1MRWxlbWVudChub2RlKSkge1xuICAgIHJldHVybiBnZXRXaW5kb3dTY3JvbGwobm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50U2Nyb2xsKG5vZGUpO1xuICB9XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGlzVGFibGVFbGVtZW50IGZyb20gXCIuL2lzVGFibGVFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgZ2V0VUFTdHJpbmcgZnJvbSBcIi4uL3V0aWxzL3VzZXJBZ2VudC5qc1wiO1xuXG5mdW5jdGlvbiBnZXRUcnVlT2Zmc2V0UGFyZW50KGVsZW1lbnQpIHtcbiAgaWYgKCFpc0hUTUxFbGVtZW50KGVsZW1lbnQpIHx8IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvODM3XG4gIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50Lm9mZnNldFBhcmVudDtcbn0gLy8gYC5vZmZzZXRQYXJlbnRgIHJlcG9ydHMgYG51bGxgIGZvciBmaXhlZCBlbGVtZW50cywgd2hpbGUgYWJzb2x1dGUgZWxlbWVudHNcbi8vIHJldHVybiB0aGUgY29udGFpbmluZyBibG9ja1xuXG5cbmZ1bmN0aW9uIGdldENvbnRhaW5pbmdCbG9jayhlbGVtZW50KSB7XG4gIHZhciBpc0ZpcmVmb3ggPSAvZmlyZWZveC9pLnRlc3QoZ2V0VUFTdHJpbmcoKSk7XG4gIHZhciBpc0lFID0gL1RyaWRlbnQvaS50ZXN0KGdldFVBU3RyaW5nKCkpO1xuXG4gIGlmIChpc0lFICYmIGlzSFRNTEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAvLyBJbiBJRSA5LCAxMCBhbmQgMTEgZml4ZWQgZWxlbWVudHMgY29udGFpbmluZyBibG9jayBpcyBhbHdheXMgZXN0YWJsaXNoZWQgYnkgdGhlIHZpZXdwb3J0XG4gICAgdmFyIGVsZW1lbnRDc3MgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgaWYgKGVsZW1lbnRDc3MucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjdXJyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoZWxlbWVudCk7XG5cbiAgaWYgKGlzU2hhZG93Um9vdChjdXJyZW50Tm9kZSkpIHtcbiAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLmhvc3Q7XG4gIH1cblxuICB3aGlsZSAoaXNIVE1MRWxlbWVudChjdXJyZW50Tm9kZSkgJiYgWydodG1sJywgJ2JvZHknXS5pbmRleE9mKGdldE5vZGVOYW1lKGN1cnJlbnROb2RlKSkgPCAwKSB7XG4gICAgdmFyIGNzcyA9IGdldENvbXB1dGVkU3R5bGUoY3VycmVudE5vZGUpOyAvLyBUaGlzIGlzIG5vbi1leGhhdXN0aXZlIGJ1dCBjb3ZlcnMgdGhlIG1vc3QgY29tbW9uIENTUyBwcm9wZXJ0aWVzIHRoYXRcbiAgICAvLyBjcmVhdGUgYSBjb250YWluaW5nIGJsb2NrLlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9Db250YWluaW5nX2Jsb2NrI2lkZW50aWZ5aW5nX3RoZV9jb250YWluaW5nX2Jsb2NrXG5cbiAgICBpZiAoY3NzLnRyYW5zZm9ybSAhPT0gJ25vbmUnIHx8IGNzcy5wZXJzcGVjdGl2ZSAhPT0gJ25vbmUnIHx8IGNzcy5jb250YWluID09PSAncGFpbnQnIHx8IFsndHJhbnNmb3JtJywgJ3BlcnNwZWN0aXZlJ10uaW5kZXhPZihjc3Mud2lsbENoYW5nZSkgIT09IC0xIHx8IGlzRmlyZWZveCAmJiBjc3Mud2lsbENoYW5nZSA9PT0gJ2ZpbHRlcicgfHwgaXNGaXJlZm94ICYmIGNzcy5maWx0ZXIgJiYgY3NzLmZpbHRlciAhPT0gJ25vbmUnKSB7XG4gICAgICByZXR1cm4gY3VycmVudE5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn0gLy8gR2V0cyB0aGUgY2xvc2VzdCBhbmNlc3RvciBwb3NpdGlvbmVkIGVsZW1lbnQuIEhhbmRsZXMgc29tZSBlZGdlIGNhc2VzLFxuLy8gc3VjaCBhcyB0YWJsZSBhbmNlc3RvcnMgYW5kIGNyb3NzIGJyb3dzZXIgYnVncy5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICB2YXIgd2luZG93ID0gZ2V0V2luZG93KGVsZW1lbnQpO1xuICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0VHJ1ZU9mZnNldFBhcmVudChlbGVtZW50KTtcblxuICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIGlzVGFibGVFbGVtZW50KG9mZnNldFBhcmVudCkgJiYgZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgIG9mZnNldFBhcmVudCA9IGdldFRydWVPZmZzZXRQYXJlbnQob2Zmc2V0UGFyZW50KTtcbiAgfVxuXG4gIGlmIChvZmZzZXRQYXJlbnQgJiYgKGdldE5vZGVOYW1lKG9mZnNldFBhcmVudCkgPT09ICdodG1sJyB8fCBnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpID09PSAnYm9keScgJiYgZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG9mZnNldFBhcmVudCB8fCBnZXRDb250YWluaW5nQmxvY2soZWxlbWVudCkgfHwgd2luZG93O1xufSIsImltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhcmVudE5vZGUoZWxlbWVudCkge1xuICBpZiAoZ2V0Tm9kZU5hbWUoZWxlbWVudCkgPT09ICdodG1sJykge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcmV0dXJuICgvLyB0aGlzIGlzIGEgcXVpY2tlciAoYnV0IGxlc3MgdHlwZSBzYWZlKSB3YXkgdG8gc2F2ZSBxdWl0ZSBzb21lIGJ5dGVzIGZyb20gdGhlIGJ1bmRsZVxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl1cbiAgICAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICBlbGVtZW50LmFzc2lnbmVkU2xvdCB8fCAvLyBzdGVwIGludG8gdGhlIHNoYWRvdyBET00gb2YgdGhlIHBhcmVudCBvZiBhIHNsb3R0ZWQgbm9kZVxuICAgIGVsZW1lbnQucGFyZW50Tm9kZSB8fCAoIC8vIERPTSBFbGVtZW50IGRldGVjdGVkXG4gICAgaXNTaGFkb3dSb290KGVsZW1lbnQpID8gZWxlbWVudC5ob3N0IDogbnVsbCkgfHwgLy8gU2hhZG93Um9vdCBkZXRlY3RlZFxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBIVE1MRWxlbWVudCBpcyBhIE5vZGVcbiAgICBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkgLy8gZmFsbGJhY2tcblxuICApO1xufSIsImltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50KG5vZGUpIHtcbiAgaWYgKFsnaHRtbCcsICdib2R5JywgJyNkb2N1bWVudCddLmluZGV4T2YoZ2V0Tm9kZU5hbWUobm9kZSkpID49IDApIHtcbiAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBhc3N1bWUgYm9keSBpcyBhbHdheXMgYXZhaWxhYmxlXG4gICAgcmV0dXJuIG5vZGUub3duZXJEb2N1bWVudC5ib2R5O1xuICB9XG5cbiAgaWYgKGlzSFRNTEVsZW1lbnQobm9kZSkgJiYgaXNTY3JvbGxQYXJlbnQobm9kZSkpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHJldHVybiBnZXRTY3JvbGxQYXJlbnQoZ2V0UGFyZW50Tm9kZShub2RlKSk7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgaXNMYXlvdXRWaWV3cG9ydCBmcm9tIFwiLi9pc0xheW91dFZpZXdwb3J0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRWaWV3cG9ydFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpIHtcbiAgdmFyIHdpbiA9IGdldFdpbmRvdyhlbGVtZW50KTtcbiAgdmFyIGh0bWwgPSBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCk7XG4gIHZhciB2aXN1YWxWaWV3cG9ydCA9IHdpbi52aXN1YWxWaWV3cG9ydDtcbiAgdmFyIHdpZHRoID0gaHRtbC5jbGllbnRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGh0bWwuY2xpZW50SGVpZ2h0O1xuICB2YXIgeCA9IDA7XG4gIHZhciB5ID0gMDtcblxuICBpZiAodmlzdWFsVmlld3BvcnQpIHtcbiAgICB3aWR0aCA9IHZpc3VhbFZpZXdwb3J0LndpZHRoO1xuICAgIGhlaWdodCA9IHZpc3VhbFZpZXdwb3J0LmhlaWdodDtcbiAgICB2YXIgbGF5b3V0Vmlld3BvcnQgPSBpc0xheW91dFZpZXdwb3J0KCk7XG5cbiAgICBpZiAobGF5b3V0Vmlld3BvcnQgfHwgIWxheW91dFZpZXdwb3J0ICYmIHN0cmF0ZWd5ID09PSAnZml4ZWQnKSB7XG4gICAgICB4ID0gdmlzdWFsVmlld3BvcnQub2Zmc2V0TGVmdDtcbiAgICAgIHkgPSB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3A7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCksXG4gICAgeTogeVxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvdyhub2RlKSB7XG4gIGlmIChub2RlID09IG51bGwpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgaWYgKG5vZGUudG9TdHJpbmcoKSAhPT0gJ1tvYmplY3QgV2luZG93XScpIHtcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICByZXR1cm4gb3duZXJEb2N1bWVudCA/IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93IDogd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvd1Njcm9sbChub2RlKSB7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3cobm9kZSk7XG4gIHZhciBzY3JvbGxMZWZ0ID0gd2luLnBhZ2VYT2Zmc2V0O1xuICB2YXIgc2Nyb2xsVG9wID0gd2luLnBhZ2VZT2Zmc2V0O1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgfTtcbn0iLCJpbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGwgZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpIHtcbiAgLy8gSWYgPGh0bWw+IGhhcyBhIENTUyB3aWR0aCBncmVhdGVyIHRoYW4gdGhlIHZpZXdwb3J0LCB0aGVuIHRoaXMgd2lsbCBiZVxuICAvLyBpbmNvcnJlY3QgZm9yIFJUTC5cbiAgLy8gUG9wcGVyIDEgaXMgYnJva2VuIGluIHRoaXMgY2FzZSBhbmQgbmV2ZXIgaGFkIGEgYnVnIHJlcG9ydCBzbyBsZXQncyBhc3N1bWVcbiAgLy8gaXQncyBub3QgYW4gaXNzdWUuIEkgZG9uJ3QgdGhpbmsgYW55b25lIGV2ZXIgc3BlY2lmaWVzIHdpZHRoIG9uIDxodG1sPlxuICAvLyBhbnl3YXkuXG4gIC8vIEJyb3dzZXJzIHdoZXJlIHRoZSBsZWZ0IHNjcm9sbGJhciBkb2Vzbid0IGNhdXNlIGFuIGlzc3VlIHJlcG9ydCBgMGAgZm9yXG4gIC8vIHRoaXMgKGUuZy4gRWRnZSAyMDE5LCBJRTExLCBTYWZhcmkpXG4gIHJldHVybiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpKS5sZWZ0ICsgZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpLnNjcm9sbExlZnQ7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcblxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuRWxlbWVudDtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBpc0hUTUxFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuSFRNTEVsZW1lbnQ7XG4gIHJldHVybiBub2RlIGluc3RhbmNlb2YgT3duRWxlbWVudCB8fCBub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGlzU2hhZG93Um9vdChub2RlKSB7XG4gIC8vIElFIDExIGhhcyBubyBTaGFkb3dSb290XG4gIGlmICh0eXBlb2YgU2hhZG93Um9vdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgT3duRWxlbWVudCA9IGdldFdpbmRvdyhub2RlKS5TaGFkb3dSb290O1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE93bkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q7XG59XG5cbmV4cG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH07IiwiaW1wb3J0IGdldFVBU3RyaW5nIGZyb20gXCIuLi91dGlscy91c2VyQWdlbnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTGF5b3V0Vmlld3BvcnQoKSB7XG4gIHJldHVybiAhL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChnZXRVQVN0cmluZygpKTtcbn0iLCJpbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1Njcm9sbFBhcmVudChlbGVtZW50KSB7XG4gIC8vIEZpcmVmb3ggd2FudHMgdXMgdG8gY2hlY2sgYC14YCBhbmQgYC15YCB2YXJpYXRpb25zIGFzIHdlbGxcbiAgdmFyIF9nZXRDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSxcbiAgICAgIG92ZXJmbG93ID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3csXG4gICAgICBvdmVyZmxvd1ggPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1gsXG4gICAgICBvdmVyZmxvd1kgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1k7XG5cbiAgcmV0dXJuIC9hdXRvfHNjcm9sbHxvdmVybGF5fGhpZGRlbi8udGVzdChvdmVyZmxvdyArIG92ZXJmbG93WSArIG92ZXJmbG93WCk7XG59IiwiaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1RhYmxlRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBbJ3RhYmxlJywgJ3RkJywgJ3RoJ10uaW5kZXhPZihnZXROb2RlTmFtZShlbGVtZW50KSkgPj0gMDtcbn0iLCJpbXBvcnQgZ2V0U2Nyb2xsUGFyZW50IGZyb20gXCIuL2dldFNjcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldFBhcmVudE5vZGUgZnJvbSBcIi4vZ2V0UGFyZW50Tm9kZS5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuLypcbmdpdmVuIGEgRE9NIGVsZW1lbnQsIHJldHVybiB0aGUgbGlzdCBvZiBhbGwgc2Nyb2xsIHBhcmVudHMsIHVwIHRoZSBsaXN0IG9mIGFuY2Vzb3JzXG51bnRpbCB3ZSBnZXQgdG8gdGhlIHRvcCB3aW5kb3cgb2JqZWN0LiBUaGlzIGxpc3QgaXMgd2hhdCB3ZSBhdHRhY2ggc2Nyb2xsIGxpc3RlbmVyc1xudG8sIGJlY2F1c2UgaWYgYW55IG9mIHRoZXNlIHBhcmVudCBlbGVtZW50cyBzY3JvbGwsIHdlJ2xsIG5lZWQgdG8gcmUtY2FsY3VsYXRlIHRoZVxucmVmZXJlbmNlIGVsZW1lbnQncyBwb3NpdGlvbi5cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpc3RTY3JvbGxQYXJlbnRzKGVsZW1lbnQsIGxpc3QpIHtcbiAgdmFyIF9lbGVtZW50JG93bmVyRG9jdW1lbjtcblxuICBpZiAobGlzdCA9PT0gdm9pZCAwKSB7XG4gICAgbGlzdCA9IFtdO1xuICB9XG5cbiAgdmFyIHNjcm9sbFBhcmVudCA9IGdldFNjcm9sbFBhcmVudChlbGVtZW50KTtcbiAgdmFyIGlzQm9keSA9IHNjcm9sbFBhcmVudCA9PT0gKChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keSk7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3coc2Nyb2xsUGFyZW50KTtcbiAgdmFyIHRhcmdldCA9IGlzQm9keSA/IFt3aW5dLmNvbmNhdCh3aW4udmlzdWFsVmlld3BvcnQgfHwgW10sIGlzU2Nyb2xsUGFyZW50KHNjcm9sbFBhcmVudCkgPyBzY3JvbGxQYXJlbnQgOiBbXSkgOiBzY3JvbGxQYXJlbnQ7XG4gIHZhciB1cGRhdGVkTGlzdCA9IGxpc3QuY29uY2F0KHRhcmdldCk7XG4gIHJldHVybiBpc0JvZHkgPyB1cGRhdGVkTGlzdCA6IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBpc0JvZHkgdGVsbHMgdXMgdGFyZ2V0IHdpbGwgYmUgYW4gSFRNTEVsZW1lbnQgaGVyZVxuICB1cGRhdGVkTGlzdC5jb25jYXQobGlzdFNjcm9sbFBhcmVudHMoZ2V0UGFyZW50Tm9kZSh0YXJnZXQpKSk7XG59IiwiZXhwb3J0IHZhciB0b3AgPSAndG9wJztcbmV4cG9ydCB2YXIgYm90dG9tID0gJ2JvdHRvbSc7XG5leHBvcnQgdmFyIHJpZ2h0ID0gJ3JpZ2h0JztcbmV4cG9ydCB2YXIgbGVmdCA9ICdsZWZ0JztcbmV4cG9ydCB2YXIgYXV0byA9ICdhdXRvJztcbmV4cG9ydCB2YXIgYmFzZVBsYWNlbWVudHMgPSBbdG9wLCBib3R0b20sIHJpZ2h0LCBsZWZ0XTtcbmV4cG9ydCB2YXIgc3RhcnQgPSAnc3RhcnQnO1xuZXhwb3J0IHZhciBlbmQgPSAnZW5kJztcbmV4cG9ydCB2YXIgY2xpcHBpbmdQYXJlbnRzID0gJ2NsaXBwaW5nUGFyZW50cyc7XG5leHBvcnQgdmFyIHZpZXdwb3J0ID0gJ3ZpZXdwb3J0JztcbmV4cG9ydCB2YXIgcG9wcGVyID0gJ3BvcHBlcic7XG5leHBvcnQgdmFyIHJlZmVyZW5jZSA9ICdyZWZlcmVuY2UnO1xuZXhwb3J0IHZhciB2YXJpYXRpb25QbGFjZW1lbnRzID0gLyojX19QVVJFX18qL2Jhc2VQbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCArIFwiLVwiICsgc3RhcnQsIHBsYWNlbWVudCArIFwiLVwiICsgZW5kXSk7XG59LCBbXSk7XG5leHBvcnQgdmFyIHBsYWNlbWVudHMgPSAvKiNfX1BVUkVfXyovW10uY29uY2F0KGJhc2VQbGFjZW1lbnRzLCBbYXV0b10pLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCwgcGxhY2VtZW50ICsgXCItXCIgKyBzdGFydCwgcGxhY2VtZW50ICsgXCItXCIgKyBlbmRdKTtcbn0sIFtdKTsgLy8gbW9kaWZpZXJzIHRoYXQgbmVlZCB0byByZWFkIHRoZSBET01cblxuZXhwb3J0IHZhciBiZWZvcmVSZWFkID0gJ2JlZm9yZVJlYWQnO1xuZXhwb3J0IHZhciByZWFkID0gJ3JlYWQnO1xuZXhwb3J0IHZhciBhZnRlclJlYWQgPSAnYWZ0ZXJSZWFkJzsgLy8gcHVyZS1sb2dpYyBtb2RpZmllcnNcblxuZXhwb3J0IHZhciBiZWZvcmVNYWluID0gJ2JlZm9yZU1haW4nO1xuZXhwb3J0IHZhciBtYWluID0gJ21haW4nO1xuZXhwb3J0IHZhciBhZnRlck1haW4gPSAnYWZ0ZXJNYWluJzsgLy8gbW9kaWZpZXIgd2l0aCB0aGUgcHVycG9zZSB0byB3cml0ZSB0byB0aGUgRE9NIChvciB3cml0ZSBpbnRvIGEgZnJhbWV3b3JrIHN0YXRlKVxuXG5leHBvcnQgdmFyIGJlZm9yZVdyaXRlID0gJ2JlZm9yZVdyaXRlJztcbmV4cG9ydCB2YXIgd3JpdGUgPSAnd3JpdGUnO1xuZXhwb3J0IHZhciBhZnRlcldyaXRlID0gJ2FmdGVyV3JpdGUnO1xuZXhwb3J0IHZhciBtb2RpZmllclBoYXNlcyA9IFtiZWZvcmVSZWFkLCByZWFkLCBhZnRlclJlYWQsIGJlZm9yZU1haW4sIG1haW4sIGFmdGVyTWFpbiwgYmVmb3JlV3JpdGUsIHdyaXRlLCBhZnRlcldyaXRlXTsiLCJpbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4uL2RvbS11dGlscy9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiOyAvLyBUaGlzIG1vZGlmaWVyIHRha2VzIHRoZSBzdHlsZXMgcHJlcGFyZWQgYnkgdGhlIGBjb21wdXRlU3R5bGVzYCBtb2RpZmllclxuLy8gYW5kIGFwcGxpZXMgdGhlbSB0byB0aGUgSFRNTEVsZW1lbnRzIHN1Y2ggYXMgcG9wcGVyIGFuZCBhcnJvd1xuXG5mdW5jdGlvbiBhcHBseVN0eWxlcyhfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGU7XG4gIE9iamVjdC5rZXlzKHN0YXRlLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIHN0eWxlID0gc3RhdGUuc3R5bGVzW25hbWVdIHx8IHt9O1xuICAgIHZhciBhdHRyaWJ1dGVzID0gc3RhdGUuYXR0cmlidXRlc1tuYW1lXSB8fCB7fTtcbiAgICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW25hbWVdOyAvLyBhcnJvdyBpcyBvcHRpb25hbCArIHZpcnR1YWwgZWxlbWVudHNcblxuICAgIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAhZ2V0Tm9kZU5hbWUoZWxlbWVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIEZsb3cgZG9lc24ndCBzdXBwb3J0IHRvIGV4dGVuZCB0aGlzIHByb3BlcnR5LCBidXQgaXQncyB0aGUgbW9zdFxuICAgIC8vIGVmZmVjdGl2ZSB3YXkgdG8gYXBwbHkgc3R5bGVzIHRvIGFuIEhUTUxFbGVtZW50XG4gICAgLy8gJEZsb3dGaXhNZVtjYW5ub3Qtd3JpdGVdXG5cblxuICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgc3R5bGUpO1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGF0dHJpYnV0ZXNbbmFtZV07XG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogdmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlO1xuICB2YXIgaW5pdGlhbFN0eWxlcyA9IHtcbiAgICBwb3BwZXI6IHtcbiAgICAgIHBvc2l0aW9uOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgbGVmdDogJzAnLFxuICAgICAgdG9wOiAnMCcsXG4gICAgICBtYXJnaW46ICcwJ1xuICAgIH0sXG4gICAgYXJyb3c6IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgfSxcbiAgICByZWZlcmVuY2U6IHt9XG4gIH07XG4gIE9iamVjdC5hc3NpZ24oc3RhdGUuZWxlbWVudHMucG9wcGVyLnN0eWxlLCBpbml0aWFsU3R5bGVzLnBvcHBlcik7XG4gIHN0YXRlLnN0eWxlcyA9IGluaXRpYWxTdHlsZXM7XG5cbiAgaWYgKHN0YXRlLmVsZW1lbnRzLmFycm93KSB7XG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZS5lbGVtZW50cy5hcnJvdy5zdHlsZSwgaW5pdGlhbFN0eWxlcy5hcnJvdyk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIE9iamVjdC5rZXlzKHN0YXRlLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW25hbWVdO1xuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBzdGF0ZS5hdHRyaWJ1dGVzW25hbWVdIHx8IHt9O1xuICAgICAgdmFyIHN0eWxlUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHN0YXRlLnN0eWxlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IHN0YXRlLnN0eWxlc1tuYW1lXSA6IGluaXRpYWxTdHlsZXNbbmFtZV0pOyAvLyBTZXQgYWxsIHZhbHVlcyB0byBhbiBlbXB0eSBzdHJpbmcgdG8gdW5zZXQgdGhlbVxuXG4gICAgICB2YXIgc3R5bGUgPSBzdHlsZVByb3BlcnRpZXMucmVkdWNlKGZ1bmN0aW9uIChzdHlsZSwgcHJvcGVydHkpIHtcbiAgICAgICAgc3R5bGVbcHJvcGVydHldID0gJyc7XG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgIH0sIHt9KTsgLy8gYXJyb3cgaXMgb3B0aW9uYWwgKyB2aXJ0dWFsIGVsZW1lbnRzXG5cbiAgICAgIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAhZ2V0Tm9kZU5hbWUoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHN0eWxlKTtcbiAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdhcHBseVN0eWxlcycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbjogYXBwbHlTdHlsZXMsXG4gIGVmZmVjdDogZWZmZWN0LFxuICByZXF1aXJlczogWydjb21wdXRlU3R5bGVzJ11cbn07IiwiaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRMYXlvdXRSZWN0IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qc1wiO1xuaW1wb3J0IGNvbnRhaW5zIGZyb20gXCIuLi9kb20tdXRpbHMvY29udGFpbnMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgd2l0aGluIH0gZnJvbSBcIi4uL3V0aWxzL3dpdGhpbi5qc1wiO1xuaW1wb3J0IG1lcmdlUGFkZGluZ09iamVjdCBmcm9tIFwiLi4vdXRpbHMvbWVyZ2VQYWRkaW5nT2JqZWN0LmpzXCI7XG5pbXBvcnQgZXhwYW5kVG9IYXNoTWFwIGZyb20gXCIuLi91dGlscy9leHBhbmRUb0hhc2hNYXAuanNcIjtcbmltcG9ydCB7IGxlZnQsIHJpZ2h0LCBiYXNlUGxhY2VtZW50cywgdG9wLCBib3R0b20gfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi4vZG9tLXV0aWxzL2luc3RhbmNlT2YuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgdG9QYWRkaW5nT2JqZWN0ID0gZnVuY3Rpb24gdG9QYWRkaW5nT2JqZWN0KHBhZGRpbmcsIHN0YXRlKSB7XG4gIHBhZGRpbmcgPSB0eXBlb2YgcGFkZGluZyA9PT0gJ2Z1bmN0aW9uJyA/IHBhZGRpbmcoT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVjdHMsIHtcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KSkgOiBwYWRkaW5nO1xuICByZXR1cm4gbWVyZ2VQYWRkaW5nT2JqZWN0KHR5cGVvZiBwYWRkaW5nICE9PSAnbnVtYmVyJyA/IHBhZGRpbmcgOiBleHBhbmRUb0hhc2hNYXAocGFkZGluZywgYmFzZVBsYWNlbWVudHMpKTtcbn07XG5cbmZ1bmN0aW9uIGFycm93KF9yZWYpIHtcbiAgdmFyIF9zdGF0ZSRtb2RpZmllcnNEYXRhJDtcblxuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgbmFtZSA9IF9yZWYubmFtZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gIHZhciBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5hcnJvdztcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHM7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5wbGFjZW1lbnQpO1xuICB2YXIgYXhpcyA9IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KTtcbiAgdmFyIGlzVmVydGljYWwgPSBbbGVmdCwgcmlnaHRdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMDtcbiAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgaWYgKCFhcnJvd0VsZW1lbnQgfHwgIXBvcHBlck9mZnNldHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcGFkZGluZ09iamVjdCA9IHRvUGFkZGluZ09iamVjdChvcHRpb25zLnBhZGRpbmcsIHN0YXRlKTtcbiAgdmFyIGFycm93UmVjdCA9IGdldExheW91dFJlY3QoYXJyb3dFbGVtZW50KTtcbiAgdmFyIG1pblByb3AgPSBheGlzID09PSAneScgPyB0b3AgOiBsZWZ0O1xuICB2YXIgbWF4UHJvcCA9IGF4aXMgPT09ICd5JyA/IGJvdHRvbSA6IHJpZ2h0O1xuICB2YXIgZW5kRGlmZiA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtsZW5dICsgc3RhdGUucmVjdHMucmVmZXJlbmNlW2F4aXNdIC0gcG9wcGVyT2Zmc2V0c1theGlzXSAtIHN0YXRlLnJlY3RzLnBvcHBlcltsZW5dO1xuICB2YXIgc3RhcnREaWZmID0gcG9wcGVyT2Zmc2V0c1theGlzXSAtIHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtheGlzXTtcbiAgdmFyIGFycm93T2Zmc2V0UGFyZW50ID0gZ2V0T2Zmc2V0UGFyZW50KGFycm93RWxlbWVudCk7XG4gIHZhciBjbGllbnRTaXplID0gYXJyb3dPZmZzZXRQYXJlbnQgPyBheGlzID09PSAneScgPyBhcnJvd09mZnNldFBhcmVudC5jbGllbnRIZWlnaHQgfHwgMCA6IGFycm93T2Zmc2V0UGFyZW50LmNsaWVudFdpZHRoIHx8IDAgOiAwO1xuICB2YXIgY2VudGVyVG9SZWZlcmVuY2UgPSBlbmREaWZmIC8gMiAtIHN0YXJ0RGlmZiAvIDI7IC8vIE1ha2Ugc3VyZSB0aGUgYXJyb3cgZG9lc24ndCBvdmVyZmxvdyB0aGUgcG9wcGVyIGlmIHRoZSBjZW50ZXIgcG9pbnQgaXNcbiAgLy8gb3V0c2lkZSBvZiB0aGUgcG9wcGVyIGJvdW5kc1xuXG4gIHZhciBtaW4gPSBwYWRkaW5nT2JqZWN0W21pblByb3BdO1xuICB2YXIgbWF4ID0gY2xpZW50U2l6ZSAtIGFycm93UmVjdFtsZW5dIC0gcGFkZGluZ09iamVjdFttYXhQcm9wXTtcbiAgdmFyIGNlbnRlciA9IGNsaWVudFNpemUgLyAyIC0gYXJyb3dSZWN0W2xlbl0gLyAyICsgY2VudGVyVG9SZWZlcmVuY2U7XG4gIHZhciBvZmZzZXQgPSB3aXRoaW4obWluLCBjZW50ZXIsIG1heCk7IC8vIFByZXZlbnRzIGJyZWFraW5nIHN5bnRheCBoaWdobGlnaHRpbmcuLi5cblxuICB2YXIgYXhpc1Byb3AgPSBheGlzO1xuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gKF9zdGF0ZSRtb2RpZmllcnNEYXRhJCA9IHt9LCBfc3RhdGUkbW9kaWZpZXJzRGF0YSRbYXhpc1Byb3BdID0gb2Zmc2V0LCBfc3RhdGUkbW9kaWZpZXJzRGF0YSQuY2VudGVyT2Zmc2V0ID0gb2Zmc2V0IC0gY2VudGVyLCBfc3RhdGUkbW9kaWZpZXJzRGF0YSQpO1xufVxuXG5mdW5jdGlvbiBlZmZlY3QoX3JlZjIpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjIuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZjIub3B0aW9ucztcbiAgdmFyIF9vcHRpb25zJGVsZW1lbnQgPSBvcHRpb25zLmVsZW1lbnQsXG4gICAgICBhcnJvd0VsZW1lbnQgPSBfb3B0aW9ucyRlbGVtZW50ID09PSB2b2lkIDAgPyAnW2RhdGEtcG9wcGVyLWFycm93XScgOiBfb3B0aW9ucyRlbGVtZW50O1xuXG4gIGlmIChhcnJvd0VsZW1lbnQgPT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfSAvLyBDU1Mgc2VsZWN0b3JcblxuXG4gIGlmICh0eXBlb2YgYXJyb3dFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLnBvcHBlci5xdWVyeVNlbGVjdG9yKGFycm93RWxlbWVudCk7XG5cbiAgICBpZiAoIWFycm93RWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBpZiAoIWlzSFRNTEVsZW1lbnQoYXJyb3dFbGVtZW50KSkge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogXCJhcnJvd1wiIGVsZW1lbnQgbXVzdCBiZSBhbiBIVE1MRWxlbWVudCAobm90IGFuIFNWR0VsZW1lbnQpLicsICdUbyB1c2UgYW4gU1ZHIGFycm93LCB3cmFwIGl0IGluIGFuIEhUTUxFbGVtZW50IHRoYXQgd2lsbCBiZSB1c2VkIGFzJywgJ3RoZSBhcnJvdy4nXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29udGFpbnMoc3RhdGUuZWxlbWVudHMucG9wcGVyLCBhcnJvd0VsZW1lbnQpKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogXCJhcnJvd1wiIG1vZGlmaWVyXFwncyBgZWxlbWVudGAgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBwb3BwZXInLCAnZWxlbWVudC4nXS5qb2luKCcgJykpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIHN0YXRlLmVsZW1lbnRzLmFycm93ID0gYXJyb3dFbGVtZW50O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYXJyb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogYXJyb3csXG4gIGVmZmVjdDogZWZmZWN0LFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsncHJldmVudE92ZXJmbG93J11cbn07IiwiaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCBlbmQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbnZhciB1bnNldFNpZGVzID0ge1xuICB0b3A6ICdhdXRvJyxcbiAgcmlnaHQ6ICdhdXRvJyxcbiAgYm90dG9tOiAnYXV0bycsXG4gIGxlZnQ6ICdhdXRvJ1xufTsgLy8gUm91bmQgdGhlIG9mZnNldHMgdG8gdGhlIG5lYXJlc3Qgc3VpdGFibGUgc3VicGl4ZWwgYmFzZWQgb24gdGhlIERQUi5cbi8vIFpvb21pbmcgY2FuIGNoYW5nZSB0aGUgRFBSLCBidXQgaXQgc2VlbXMgdG8gcmVwb3J0IGEgdmFsdWUgdGhhdCB3aWxsXG4vLyBjbGVhbmx5IGRpdmlkZSB0aGUgdmFsdWVzIGludG8gdGhlIGFwcHJvcHJpYXRlIHN1YnBpeGVscy5cblxuZnVuY3Rpb24gcm91bmRPZmZzZXRzQnlEUFIoX3JlZikge1xuICB2YXIgeCA9IF9yZWYueCxcbiAgICAgIHkgPSBfcmVmLnk7XG4gIHZhciB3aW4gPSB3aW5kb3c7XG4gIHZhciBkcHIgPSB3aW4uZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICByZXR1cm4ge1xuICAgIHg6IHJvdW5kKHggKiBkcHIpIC8gZHByIHx8IDAsXG4gICAgeTogcm91bmQoeSAqIGRwcikgLyBkcHIgfHwgMFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9TdHlsZXMoX3JlZjIpIHtcbiAgdmFyIF9PYmplY3QkYXNzaWduMjtcblxuICB2YXIgcG9wcGVyID0gX3JlZjIucG9wcGVyLFxuICAgICAgcG9wcGVyUmVjdCA9IF9yZWYyLnBvcHBlclJlY3QsXG4gICAgICBwbGFjZW1lbnQgPSBfcmVmMi5wbGFjZW1lbnQsXG4gICAgICB2YXJpYXRpb24gPSBfcmVmMi52YXJpYXRpb24sXG4gICAgICBvZmZzZXRzID0gX3JlZjIub2Zmc2V0cyxcbiAgICAgIHBvc2l0aW9uID0gX3JlZjIucG9zaXRpb24sXG4gICAgICBncHVBY2NlbGVyYXRpb24gPSBfcmVmMi5ncHVBY2NlbGVyYXRpb24sXG4gICAgICBhZGFwdGl2ZSA9IF9yZWYyLmFkYXB0aXZlLFxuICAgICAgcm91bmRPZmZzZXRzID0gX3JlZjIucm91bmRPZmZzZXRzLFxuICAgICAgaXNGaXhlZCA9IF9yZWYyLmlzRml4ZWQ7XG4gIHZhciBfb2Zmc2V0cyR4ID0gb2Zmc2V0cy54LFxuICAgICAgeCA9IF9vZmZzZXRzJHggPT09IHZvaWQgMCA/IDAgOiBfb2Zmc2V0cyR4LFxuICAgICAgX29mZnNldHMkeSA9IG9mZnNldHMueSxcbiAgICAgIHkgPSBfb2Zmc2V0cyR5ID09PSB2b2lkIDAgPyAwIDogX29mZnNldHMkeTtcblxuICB2YXIgX3JlZjMgPSB0eXBlb2Ygcm91bmRPZmZzZXRzID09PSAnZnVuY3Rpb24nID8gcm91bmRPZmZzZXRzKHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfSkgOiB7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG5cbiAgeCA9IF9yZWYzLng7XG4gIHkgPSBfcmVmMy55O1xuICB2YXIgaGFzWCA9IG9mZnNldHMuaGFzT3duUHJvcGVydHkoJ3gnKTtcbiAgdmFyIGhhc1kgPSBvZmZzZXRzLmhhc093blByb3BlcnR5KCd5Jyk7XG4gIHZhciBzaWRlWCA9IGxlZnQ7XG4gIHZhciBzaWRlWSA9IHRvcDtcbiAgdmFyIHdpbiA9IHdpbmRvdztcblxuICBpZiAoYWRhcHRpdmUpIHtcbiAgICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0T2Zmc2V0UGFyZW50KHBvcHBlcik7XG4gICAgdmFyIGhlaWdodFByb3AgPSAnY2xpZW50SGVpZ2h0JztcbiAgICB2YXIgd2lkdGhQcm9wID0gJ2NsaWVudFdpZHRoJztcblxuICAgIGlmIChvZmZzZXRQYXJlbnQgPT09IGdldFdpbmRvdyhwb3BwZXIpKSB7XG4gICAgICBvZmZzZXRQYXJlbnQgPSBnZXREb2N1bWVudEVsZW1lbnQocG9wcGVyKTtcblxuICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KS5wb3NpdGlvbiAhPT0gJ3N0YXRpYycgJiYgcG9zaXRpb24gPT09ICdhYnNvbHV0ZScpIHtcbiAgICAgICAgaGVpZ2h0UHJvcCA9ICdzY3JvbGxIZWlnaHQnO1xuICAgICAgICB3aWR0aFByb3AgPSAnc2Nyb2xsV2lkdGgnO1xuICAgICAgfVxuICAgIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtY2FzdF06IGZvcmNlIHR5cGUgcmVmaW5lbWVudCwgd2UgY29tcGFyZSBvZmZzZXRQYXJlbnQgd2l0aCB3aW5kb3cgYWJvdmUsIGJ1dCBGbG93IGRvZXNuJ3QgZGV0ZWN0IGl0XG5cblxuICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudDtcblxuICAgIGlmIChwbGFjZW1lbnQgPT09IHRvcCB8fCAocGxhY2VtZW50ID09PSBsZWZ0IHx8IHBsYWNlbWVudCA9PT0gcmlnaHQpICYmIHZhcmlhdGlvbiA9PT0gZW5kKSB7XG4gICAgICBzaWRlWSA9IGJvdHRvbTtcbiAgICAgIHZhciBvZmZzZXRZID0gaXNGaXhlZCAmJiBvZmZzZXRQYXJlbnQgPT09IHdpbiAmJiB3aW4udmlzdWFsVmlld3BvcnQgPyB3aW4udmlzdWFsVmlld3BvcnQuaGVpZ2h0IDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gICAgICBvZmZzZXRQYXJlbnRbaGVpZ2h0UHJvcF07XG4gICAgICB5IC09IG9mZnNldFkgLSBwb3BwZXJSZWN0LmhlaWdodDtcbiAgICAgIHkgKj0gZ3B1QWNjZWxlcmF0aW9uID8gMSA6IC0xO1xuICAgIH1cblxuICAgIGlmIChwbGFjZW1lbnQgPT09IGxlZnQgfHwgKHBsYWNlbWVudCA9PT0gdG9wIHx8IHBsYWNlbWVudCA9PT0gYm90dG9tKSAmJiB2YXJpYXRpb24gPT09IGVuZCkge1xuICAgICAgc2lkZVggPSByaWdodDtcbiAgICAgIHZhciBvZmZzZXRYID0gaXNGaXhlZCAmJiBvZmZzZXRQYXJlbnQgPT09IHdpbiAmJiB3aW4udmlzdWFsVmlld3BvcnQgPyB3aW4udmlzdWFsVmlld3BvcnQud2lkdGggOiAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICAgIG9mZnNldFBhcmVudFt3aWR0aFByb3BdO1xuICAgICAgeCAtPSBvZmZzZXRYIC0gcG9wcGVyUmVjdC53aWR0aDtcbiAgICAgIHggKj0gZ3B1QWNjZWxlcmF0aW9uID8gMSA6IC0xO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb21tb25TdHlsZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICBwb3NpdGlvbjogcG9zaXRpb25cbiAgfSwgYWRhcHRpdmUgJiYgdW5zZXRTaWRlcyk7XG5cbiAgdmFyIF9yZWY0ID0gcm91bmRPZmZzZXRzID09PSB0cnVlID8gcm91bmRPZmZzZXRzQnlEUFIoe1xuICAgIHg6IHgsXG4gICAgeTogeVxuICB9KSA6IHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfTtcblxuICB4ID0gX3JlZjQueDtcbiAgeSA9IF9yZWY0Lnk7XG5cbiAgaWYgKGdwdUFjY2VsZXJhdGlvbikge1xuICAgIHZhciBfT2JqZWN0JGFzc2lnbjtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIChfT2JqZWN0JGFzc2lnbiA9IHt9LCBfT2JqZWN0JGFzc2lnbltzaWRlWV0gPSBoYXNZID8gJzAnIDogJycsIF9PYmplY3QkYXNzaWduW3NpZGVYXSA9IGhhc1ggPyAnMCcgOiAnJywgX09iamVjdCRhc3NpZ24udHJhbnNmb3JtID0gKHdpbi5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpIDw9IDEgPyBcInRyYW5zbGF0ZShcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4KVwiIDogXCJ0cmFuc2xhdGUzZChcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4LCAwKVwiLCBfT2JqZWN0JGFzc2lnbikpO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywgKF9PYmplY3QkYXNzaWduMiA9IHt9LCBfT2JqZWN0JGFzc2lnbjJbc2lkZVldID0gaGFzWSA/IHkgKyBcInB4XCIgOiAnJywgX09iamVjdCRhc3NpZ24yW3NpZGVYXSA9IGhhc1ggPyB4ICsgXCJweFwiIDogJycsIF9PYmplY3QkYXNzaWduMi50cmFuc2Zvcm0gPSAnJywgX09iamVjdCRhc3NpZ24yKSk7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVTdHlsZXMoX3JlZjUpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjUuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZjUub3B0aW9ucztcbiAgdmFyIF9vcHRpb25zJGdwdUFjY2VsZXJhdCA9IG9wdGlvbnMuZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgZ3B1QWNjZWxlcmF0aW9uID0gX29wdGlvbnMkZ3B1QWNjZWxlcmF0ID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkZ3B1QWNjZWxlcmF0LFxuICAgICAgX29wdGlvbnMkYWRhcHRpdmUgPSBvcHRpb25zLmFkYXB0aXZlLFxuICAgICAgYWRhcHRpdmUgPSBfb3B0aW9ucyRhZGFwdGl2ZSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGFkYXB0aXZlLFxuICAgICAgX29wdGlvbnMkcm91bmRPZmZzZXRzID0gb3B0aW9ucy5yb3VuZE9mZnNldHMsXG4gICAgICByb3VuZE9mZnNldHMgPSBfb3B0aW9ucyRyb3VuZE9mZnNldHMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRyb3VuZE9mZnNldHM7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIHZhciB0cmFuc2l0aW9uUHJvcGVydHkgPSBnZXRDb21wdXRlZFN0eWxlKHN0YXRlLmVsZW1lbnRzLnBvcHBlcikudHJhbnNpdGlvblByb3BlcnR5IHx8ICcnO1xuXG4gICAgaWYgKGFkYXB0aXZlICYmIFsndHJhbnNmb3JtJywgJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddLnNvbWUoZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gdHJhbnNpdGlvblByb3BlcnR5LmluZGV4T2YocHJvcGVydHkpID49IDA7XG4gICAgfSkpIHtcbiAgICAgIGNvbnNvbGUud2FybihbJ1BvcHBlcjogRGV0ZWN0ZWQgQ1NTIHRyYW5zaXRpb25zIG9uIGF0IGxlYXN0IG9uZSBvZiB0aGUgZm9sbG93aW5nJywgJ0NTUyBwcm9wZXJ0aWVzOiBcInRyYW5zZm9ybVwiLCBcInRvcFwiLCBcInJpZ2h0XCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLicsICdcXG5cXG4nLCAnRGlzYWJsZSB0aGUgXCJjb21wdXRlU3R5bGVzXCIgbW9kaWZpZXJcXCdzIGBhZGFwdGl2ZWAgb3B0aW9uIHRvIGFsbG93JywgJ2ZvciBzbW9vdGggdHJhbnNpdGlvbnMsIG9yIHJlbW92ZSB0aGVzZSBwcm9wZXJ0aWVzIGZyb20gdGhlIENTUycsICd0cmFuc2l0aW9uIGRlY2xhcmF0aW9uIG9uIHRoZSBwb3BwZXIgZWxlbWVudCBpZiBvbmx5IHRyYW5zaXRpb25pbmcnLCAnb3BhY2l0eSBvciBiYWNrZ3JvdW5kLWNvbG9yIGZvciBleGFtcGxlLicsICdcXG5cXG4nLCAnV2UgcmVjb21tZW5kIHVzaW5nIHRoZSBwb3BwZXIgZWxlbWVudCBhcyBhIHdyYXBwZXIgYXJvdW5kIGFuIGlubmVyJywgJ2VsZW1lbnQgdGhhdCBjYW4gaGF2ZSBhbnkgQ1NTIHByb3BlcnR5IHRyYW5zaXRpb25lZCBmb3IgYW5pbWF0aW9ucy4nXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb21tb25TdHlsZXMgPSB7XG4gICAgcGxhY2VtZW50OiBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCksXG4gICAgdmFyaWF0aW9uOiBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KSxcbiAgICBwb3BwZXI6IHN0YXRlLmVsZW1lbnRzLnBvcHBlcixcbiAgICBwb3BwZXJSZWN0OiBzdGF0ZS5yZWN0cy5wb3BwZXIsXG4gICAgZ3B1QWNjZWxlcmF0aW9uOiBncHVBY2NlbGVyYXRpb24sXG4gICAgaXNGaXhlZDogc3RhdGUub3B0aW9ucy5zdHJhdGVneSA9PT0gJ2ZpeGVkJ1xuICB9O1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMgIT0gbnVsbCkge1xuICAgIHN0YXRlLnN0eWxlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zdHlsZXMucG9wcGVyLCBtYXBUb1N0eWxlcyhPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIHtcbiAgICAgIG9mZnNldHM6IHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyxcbiAgICAgIHBvc2l0aW9uOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgYWRhcHRpdmU6IGFkYXB0aXZlLFxuICAgICAgcm91bmRPZmZzZXRzOiByb3VuZE9mZnNldHNcbiAgICB9KSkpO1xuICB9XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEuYXJyb3cgIT0gbnVsbCkge1xuICAgIHN0YXRlLnN0eWxlcy5hcnJvdyA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnN0eWxlcy5hcnJvdywgbWFwVG9TdHlsZXMoT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCB7XG4gICAgICBvZmZzZXRzOiBzdGF0ZS5tb2RpZmllcnNEYXRhLmFycm93LFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBhZGFwdGl2ZTogZmFsc2UsXG4gICAgICByb3VuZE9mZnNldHM6IHJvdW5kT2Zmc2V0c1xuICAgIH0pKSk7XG4gIH1cblxuICBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyLCB7XG4gICAgJ2RhdGEtcG9wcGVyLXBsYWNlbWVudCc6IHN0YXRlLnBsYWNlbWVudFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2NvbXB1dGVTdHlsZXMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ2JlZm9yZVdyaXRlJyxcbiAgZm46IGNvbXB1dGVTdHlsZXMsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRXaW5kb3cuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgcGFzc2l2ZSA9IHtcbiAgcGFzc2l2ZTogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIGluc3RhbmNlID0gX3JlZi5pbnN0YW5jZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRzY3JvbGwgPSBvcHRpb25zLnNjcm9sbCxcbiAgICAgIHNjcm9sbCA9IF9vcHRpb25zJHNjcm9sbCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHNjcm9sbCxcbiAgICAgIF9vcHRpb25zJHJlc2l6ZSA9IG9wdGlvbnMucmVzaXplLFxuICAgICAgcmVzaXplID0gX29wdGlvbnMkcmVzaXplID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkcmVzaXplO1xuICB2YXIgd2luZG93ID0gZ2V0V2luZG93KHN0YXRlLmVsZW1lbnRzLnBvcHBlcik7XG4gIHZhciBzY3JvbGxQYXJlbnRzID0gW10uY29uY2F0KHN0YXRlLnNjcm9sbFBhcmVudHMucmVmZXJlbmNlLCBzdGF0ZS5zY3JvbGxQYXJlbnRzLnBvcHBlcik7XG5cbiAgaWYgKHNjcm9sbCkge1xuICAgIHNjcm9sbFBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAoc2Nyb2xsUGFyZW50KSB7XG4gICAgICBzY3JvbGxQYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChyZXNpemUpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzY3JvbGxQYXJlbnQpIHtcbiAgICAgICAgc2Nyb2xsUGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVzaXplKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9XG4gIH07XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdldmVudExpc3RlbmVycycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbjogZnVuY3Rpb24gZm4oKSB7fSxcbiAgZWZmZWN0OiBlZmZlY3QsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCBnZXRPcHBvc2l0ZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0T3Bwb3NpdGVQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4uL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgY29tcHV0ZUF1dG9QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2NvbXB1dGVBdXRvUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyBib3R0b20sIHRvcCwgc3RhcnQsIHJpZ2h0LCBsZWZ0LCBhdXRvIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuLi91dGlscy9nZXRWYXJpYXRpb24uanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5mdW5jdGlvbiBnZXRFeHBhbmRlZEZhbGxiYWNrUGxhY2VtZW50cyhwbGFjZW1lbnQpIHtcbiAgaWYgKGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0bykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBvcHBvc2l0ZVBsYWNlbWVudCA9IGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCk7XG4gIHJldHVybiBbZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQocGxhY2VtZW50KSwgb3Bwb3NpdGVQbGFjZW1lbnQsIGdldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50KG9wcG9zaXRlUGxhY2VtZW50KV07XG59XG5cbmZ1bmN0aW9uIGZsaXAoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0uX3NraXApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgX29wdGlvbnMkbWFpbkF4aXMgPSBvcHRpb25zLm1haW5BeGlzLFxuICAgICAgY2hlY2tNYWluQXhpcyA9IF9vcHRpb25zJG1haW5BeGlzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkbWFpbkF4aXMsXG4gICAgICBfb3B0aW9ucyRhbHRBeGlzID0gb3B0aW9ucy5hbHRBeGlzLFxuICAgICAgY2hlY2tBbHRBeGlzID0gX29wdGlvbnMkYWx0QXhpcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBzcGVjaWZpZWRGYWxsYmFja1BsYWNlbWVudHMgPSBvcHRpb25zLmZhbGxiYWNrUGxhY2VtZW50cyxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJGZsaXBWYXJpYXRpbyA9IG9wdGlvbnMuZmxpcFZhcmlhdGlvbnMsXG4gICAgICBmbGlwVmFyaWF0aW9ucyA9IF9vcHRpb25zJGZsaXBWYXJpYXRpbyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGZsaXBWYXJpYXRpbyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50cyA9IG9wdGlvbnMuYWxsb3dlZEF1dG9QbGFjZW1lbnRzO1xuICB2YXIgcHJlZmVycmVkUGxhY2VtZW50ID0gc3RhdGUub3B0aW9ucy5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwcmVmZXJyZWRQbGFjZW1lbnQpO1xuICB2YXIgaXNCYXNlUGxhY2VtZW50ID0gYmFzZVBsYWNlbWVudCA9PT0gcHJlZmVycmVkUGxhY2VtZW50O1xuICB2YXIgZmFsbGJhY2tQbGFjZW1lbnRzID0gc3BlY2lmaWVkRmFsbGJhY2tQbGFjZW1lbnRzIHx8IChpc0Jhc2VQbGFjZW1lbnQgfHwgIWZsaXBWYXJpYXRpb25zID8gW2dldE9wcG9zaXRlUGxhY2VtZW50KHByZWZlcnJlZFBsYWNlbWVudCldIDogZ2V0RXhwYW5kZWRGYWxsYmFja1BsYWNlbWVudHMocHJlZmVycmVkUGxhY2VtZW50KSk7XG4gIHZhciBwbGFjZW1lbnRzID0gW3ByZWZlcnJlZFBsYWNlbWVudF0uY29uY2F0KGZhbGxiYWNrUGxhY2VtZW50cykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIHJldHVybiBhY2MuY29uY2F0KGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0byA/IGNvbXB1dGVBdXRvUGxhY2VtZW50KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZyxcbiAgICAgIGZsaXBWYXJpYXRpb25zOiBmbGlwVmFyaWF0aW9ucyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50czogYWxsb3dlZEF1dG9QbGFjZW1lbnRzXG4gICAgfSkgOiBwbGFjZW1lbnQpO1xuICB9LCBbXSk7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIGNoZWNrc01hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIG1ha2VGYWxsYmFja0NoZWNrcyA9IHRydWU7XG4gIHZhciBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBwbGFjZW1lbnRzWzBdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwbGFjZW1lbnQgPSBwbGFjZW1lbnRzW2ldO1xuXG4gICAgdmFyIF9iYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuXG4gICAgdmFyIGlzU3RhcnRWYXJpYXRpb24gPSBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSA9PT0gc3RhcnQ7XG4gICAgdmFyIGlzVmVydGljYWwgPSBbdG9wLCBib3R0b21dLmluZGV4T2YoX2Jhc2VQbGFjZW1lbnQpID49IDA7XG4gICAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG4gICAgdmFyIG92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeTogYWx0Qm91bmRhcnksXG4gICAgICBwYWRkaW5nOiBwYWRkaW5nXG4gICAgfSk7XG4gICAgdmFyIG1haW5WYXJpYXRpb25TaWRlID0gaXNWZXJ0aWNhbCA/IGlzU3RhcnRWYXJpYXRpb24gPyByaWdodCA6IGxlZnQgOiBpc1N0YXJ0VmFyaWF0aW9uID8gYm90dG9tIDogdG9wO1xuXG4gICAgaWYgKHJlZmVyZW5jZVJlY3RbbGVuXSA+IHBvcHBlclJlY3RbbGVuXSkge1xuICAgICAgbWFpblZhcmlhdGlvblNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluVmFyaWF0aW9uU2lkZSk7XG4gICAgfVxuXG4gICAgdmFyIGFsdFZhcmlhdGlvblNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluVmFyaWF0aW9uU2lkZSk7XG4gICAgdmFyIGNoZWNrcyA9IFtdO1xuXG4gICAgaWYgKGNoZWNrTWFpbkF4aXMpIHtcbiAgICAgIGNoZWNrcy5wdXNoKG92ZXJmbG93W19iYXNlUGxhY2VtZW50XSA8PSAwKTtcbiAgICB9XG5cbiAgICBpZiAoY2hlY2tBbHRBeGlzKSB7XG4gICAgICBjaGVja3MucHVzaChvdmVyZmxvd1ttYWluVmFyaWF0aW9uU2lkZV0gPD0gMCwgb3ZlcmZsb3dbYWx0VmFyaWF0aW9uU2lkZV0gPD0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrcy5ldmVyeShmdW5jdGlvbiAoY2hlY2spIHtcbiAgICAgIHJldHVybiBjaGVjaztcbiAgICB9KSkge1xuICAgICAgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50O1xuICAgICAgbWFrZUZhbGxiYWNrQ2hlY2tzID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjaGVja3NNYXAuc2V0KHBsYWNlbWVudCwgY2hlY2tzKTtcbiAgfVxuXG4gIGlmIChtYWtlRmFsbGJhY2tDaGVja3MpIHtcbiAgICAvLyBgMmAgbWF5IGJlIGRlc2lyZWQgaW4gc29tZSBjYXNlcyDigJMgcmVzZWFyY2ggbGF0ZXJcbiAgICB2YXIgbnVtYmVyT2ZDaGVja3MgPSBmbGlwVmFyaWF0aW9ucyA/IDMgOiAxO1xuXG4gICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoX2kpIHtcbiAgICAgIHZhciBmaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50cy5maW5kKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICAgICAgdmFyIGNoZWNrcyA9IGNoZWNrc01hcC5nZXQocGxhY2VtZW50KTtcblxuICAgICAgICBpZiAoY2hlY2tzKSB7XG4gICAgICAgICAgcmV0dXJuIGNoZWNrcy5zbGljZSgwLCBfaSkuZXZlcnkoZnVuY3Rpb24gKGNoZWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZml0dGluZ1BsYWNlbWVudCkge1xuICAgICAgICBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBmaXR0aW5nUGxhY2VtZW50O1xuICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBfaSA9IG51bWJlck9mQ2hlY2tzOyBfaSA+IDA7IF9pLS0pIHtcbiAgICAgIHZhciBfcmV0ID0gX2xvb3AoX2kpO1xuXG4gICAgICBpZiAoX3JldCA9PT0gXCJicmVha1wiKSBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdGUucGxhY2VtZW50ICE9PSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQpIHtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdLl9za2lwID0gdHJ1ZTtcbiAgICBzdGF0ZS5wbGFjZW1lbnQgPSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQ7XG4gICAgc3RhdGUucmVzZXQgPSB0cnVlO1xuICB9XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdmbGlwJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgZm46IGZsaXAsXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsnb2Zmc2V0J10sXG4gIGRhdGE6IHtcbiAgICBfc2tpcDogZmFsc2VcbiAgfVxufTsiLCJpbXBvcnQgeyB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcblxuZnVuY3Rpb24gZ2V0U2lkZU9mZnNldHMob3ZlcmZsb3csIHJlY3QsIHByZXZlbnRlZE9mZnNldHMpIHtcbiAgaWYgKHByZXZlbnRlZE9mZnNldHMgPT09IHZvaWQgMCkge1xuICAgIHByZXZlbnRlZE9mZnNldHMgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcDogb3ZlcmZsb3cudG9wIC0gcmVjdC5oZWlnaHQgLSBwcmV2ZW50ZWRPZmZzZXRzLnksXG4gICAgcmlnaHQ6IG92ZXJmbG93LnJpZ2h0IC0gcmVjdC53aWR0aCArIHByZXZlbnRlZE9mZnNldHMueCxcbiAgICBib3R0b206IG92ZXJmbG93LmJvdHRvbSAtIHJlY3QuaGVpZ2h0ICsgcHJldmVudGVkT2Zmc2V0cy55LFxuICAgIGxlZnQ6IG92ZXJmbG93LmxlZnQgLSByZWN0LndpZHRoIC0gcHJldmVudGVkT2Zmc2V0cy54XG4gIH07XG59XG5cbmZ1bmN0aW9uIGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChvdmVyZmxvdykge1xuICByZXR1cm4gW3RvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdF0uc29tZShmdW5jdGlvbiAoc2lkZSkge1xuICAgIHJldHVybiBvdmVyZmxvd1tzaWRlXSA+PSAwO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaGlkZShfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciBwcmV2ZW50ZWRPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wcmV2ZW50T3ZlcmZsb3c7XG4gIHZhciByZWZlcmVuY2VPdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgZWxlbWVudENvbnRleHQ6ICdyZWZlcmVuY2UnXG4gIH0pO1xuICB2YXIgcG9wcGVyQWx0T3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGFsdEJvdW5kYXJ5OiB0cnVlXG4gIH0pO1xuICB2YXIgcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzID0gZ2V0U2lkZU9mZnNldHMocmVmZXJlbmNlT3ZlcmZsb3csIHJlZmVyZW5jZVJlY3QpO1xuICB2YXIgcG9wcGVyRXNjYXBlT2Zmc2V0cyA9IGdldFNpZGVPZmZzZXRzKHBvcHBlckFsdE92ZXJmbG93LCBwb3BwZXJSZWN0LCBwcmV2ZW50ZWRPZmZzZXRzKTtcbiAgdmFyIGlzUmVmZXJlbmNlSGlkZGVuID0gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyk7XG4gIHZhciBoYXNQb3BwZXJFc2NhcGVkID0gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKHBvcHBlckVzY2FwZU9mZnNldHMpO1xuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0ge1xuICAgIHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0czogcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzLFxuICAgIHBvcHBlckVzY2FwZU9mZnNldHM6IHBvcHBlckVzY2FwZU9mZnNldHMsXG4gICAgaXNSZWZlcmVuY2VIaWRkZW46IGlzUmVmZXJlbmNlSGlkZGVuLFxuICAgIGhhc1BvcHBlckVzY2FwZWQ6IGhhc1BvcHBlckVzY2FwZWRcbiAgfTtcbiAgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciwge1xuICAgICdkYXRhLXBvcHBlci1yZWZlcmVuY2UtaGlkZGVuJzogaXNSZWZlcmVuY2VIaWRkZW4sXG4gICAgJ2RhdGEtcG9wcGVyLWVzY2FwZWQnOiBoYXNQb3BwZXJFc2NhcGVkXG4gIH0pO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnaGlkZScsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsncHJldmVudE92ZXJmbG93J10sXG4gIGZuOiBoaWRlXG59OyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgYXBwbHlTdHlsZXMgfSBmcm9tIFwiLi9hcHBseVN0eWxlcy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBhcnJvdyB9IGZyb20gXCIuL2Fycm93LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNvbXB1dGVTdHlsZXMgfSBmcm9tIFwiLi9jb21wdXRlU3R5bGVzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZmxpcCB9IGZyb20gXCIuL2ZsaXAuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgaGlkZSB9IGZyb20gXCIuL2hpZGUuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgb2Zmc2V0IH0gZnJvbSBcIi4vb2Zmc2V0LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHBvcHBlck9mZnNldHMgfSBmcm9tIFwiLi9wb3BwZXJPZmZzZXRzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHByZXZlbnRPdmVyZmxvdyB9IGZyb20gXCIuL3ByZXZlbnRPdmVyZmxvdy5qc1wiOyIsImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBwbGFjZW1lbnRzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlQW5kU2tpZGRpbmdUb1hZKHBsYWNlbWVudCwgcmVjdHMsIG9mZnNldCkge1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgdmFyIGludmVydERpc3RhbmNlID0gW2xlZnQsIHRvcF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSA+PSAwID8gLTEgOiAxO1xuXG4gIHZhciBfcmVmID0gdHlwZW9mIG9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IG9mZnNldChPYmplY3QuYXNzaWduKHt9LCByZWN0cywge1xuICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gIH0pKSA6IG9mZnNldCxcbiAgICAgIHNraWRkaW5nID0gX3JlZlswXSxcbiAgICAgIGRpc3RhbmNlID0gX3JlZlsxXTtcblxuICBza2lkZGluZyA9IHNraWRkaW5nIHx8IDA7XG4gIGRpc3RhbmNlID0gKGRpc3RhbmNlIHx8IDApICogaW52ZXJ0RGlzdGFuY2U7XG4gIHJldHVybiBbbGVmdCwgcmlnaHRdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMCA/IHtcbiAgICB4OiBkaXN0YW5jZSxcbiAgICB5OiBza2lkZGluZ1xuICB9IDoge1xuICAgIHg6IHNraWRkaW5nLFxuICAgIHk6IGRpc3RhbmNlXG4gIH07XG59XG5cbmZ1bmN0aW9uIG9mZnNldChfcmVmMikge1xuICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmMi5vcHRpb25zLFxuICAgICAgbmFtZSA9IF9yZWYyLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRvZmZzZXQgPSBvcHRpb25zLm9mZnNldCxcbiAgICAgIG9mZnNldCA9IF9vcHRpb25zJG9mZnNldCA9PT0gdm9pZCAwID8gWzAsIDBdIDogX29wdGlvbnMkb2Zmc2V0O1xuICB2YXIgZGF0YSA9IHBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIGFjY1twbGFjZW1lbnRdID0gZGlzdGFuY2VBbmRTa2lkZGluZ1RvWFkocGxhY2VtZW50LCBzdGF0ZS5yZWN0cywgb2Zmc2V0KTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIHZhciBfZGF0YSRzdGF0ZSRwbGFjZW1lbnQgPSBkYXRhW3N0YXRlLnBsYWNlbWVudF0sXG4gICAgICB4ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50LngsXG4gICAgICB5ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50Lnk7XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyAhPSBudWxsKSB7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLnggKz0geDtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMueSArPSB5O1xuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdvZmZzZXQnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIGZuOiBvZmZzZXRcbn07IiwiaW1wb3J0IGNvbXB1dGVPZmZzZXRzIGZyb20gXCIuLi91dGlscy9jb21wdXRlT2Zmc2V0cy5qc1wiO1xuXG5mdW5jdGlvbiBwb3BwZXJPZmZzZXRzKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIC8vIE9mZnNldHMgYXJlIHRoZSBhY3R1YWwgcG9zaXRpb24gdGhlIHBvcHBlciBuZWVkcyB0byBoYXZlIHRvIGJlXG4gIC8vIHByb3Blcmx5IHBvc2l0aW9uZWQgbmVhciBpdHMgcmVmZXJlbmNlIGVsZW1lbnRcbiAgLy8gVGhpcyBpcyB0aGUgbW9zdCBiYXNpYyBwbGFjZW1lbnQsIGFuZCB3aWxsIGJlIGFkanVzdGVkIGJ5XG4gIC8vIHRoZSBtb2RpZmllcnMgaW4gdGhlIG5leHQgc3RlcFxuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gY29tcHV0ZU9mZnNldHMoe1xuICAgIHJlZmVyZW5jZTogc3RhdGUucmVjdHMucmVmZXJlbmNlLFxuICAgIGVsZW1lbnQ6IHN0YXRlLnJlY3RzLnBvcHBlcixcbiAgICBzdHJhdGVneTogJ2Fic29sdXRlJyxcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3BvcHBlck9mZnNldHMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3JlYWQnLFxuICBmbjogcG9wcGVyT2Zmc2V0cyxcbiAgZGF0YToge31cbn07IiwiaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCBzdGFydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldEFsdEF4aXMgZnJvbSBcIi4uL3V0aWxzL2dldEFsdEF4aXMuanNcIjtcbmltcG9ydCB7IHdpdGhpbiwgd2l0aGluTWF4Q2xhbXAgfSBmcm9tIFwiLi4vdXRpbHMvd2l0aGluLmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldEZyZXNoU2lkZU9iamVjdCBmcm9tIFwiLi4vdXRpbHMvZ2V0RnJlc2hTaWRlT2JqZWN0LmpzXCI7XG5pbXBvcnQgeyBtaW4gYXMgbWF0aE1pbiwgbWF4IGFzIG1hdGhNYXggfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuXG5mdW5jdGlvbiBwcmV2ZW50T3ZlcmZsb3coX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRtYWluQXhpcyA9IG9wdGlvbnMubWFpbkF4aXMsXG4gICAgICBjaGVja01haW5BeGlzID0gX29wdGlvbnMkbWFpbkF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRtYWluQXhpcyxcbiAgICAgIF9vcHRpb25zJGFsdEF4aXMgPSBvcHRpb25zLmFsdEF4aXMsXG4gICAgICBjaGVja0FsdEF4aXMgPSBfb3B0aW9ucyRhbHRBeGlzID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBfb3B0aW9ucyR0ZXRoZXIgPSBvcHRpb25zLnRldGhlcixcbiAgICAgIHRldGhlciA9IF9vcHRpb25zJHRldGhlciA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHRldGhlcixcbiAgICAgIF9vcHRpb25zJHRldGhlck9mZnNldCA9IG9wdGlvbnMudGV0aGVyT2Zmc2V0LFxuICAgICAgdGV0aGVyT2Zmc2V0ID0gX29wdGlvbnMkdGV0aGVyT2Zmc2V0ID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkdGV0aGVyT2Zmc2V0O1xuICB2YXIgb3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICBwYWRkaW5nOiBwYWRkaW5nLFxuICAgIGFsdEJvdW5kYXJ5OiBhbHRCb3VuZGFyeVxuICB9KTtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCk7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGlzQmFzZVBsYWNlbWVudCA9ICF2YXJpYXRpb247XG4gIHZhciBtYWluQXhpcyA9IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KTtcbiAgdmFyIGFsdEF4aXMgPSBnZXRBbHRBeGlzKG1haW5BeGlzKTtcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHM7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIHRldGhlck9mZnNldFZhbHVlID0gdHlwZW9mIHRldGhlck9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IHRldGhlck9mZnNldChPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZWN0cywge1xuICAgIHBsYWNlbWVudDogc3RhdGUucGxhY2VtZW50XG4gIH0pKSA6IHRldGhlck9mZnNldDtcbiAgdmFyIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZSA9IHR5cGVvZiB0ZXRoZXJPZmZzZXRWYWx1ZSA9PT0gJ251bWJlcicgPyB7XG4gICAgbWFpbkF4aXM6IHRldGhlck9mZnNldFZhbHVlLFxuICAgIGFsdEF4aXM6IHRldGhlck9mZnNldFZhbHVlXG4gIH0gOiBPYmplY3QuYXNzaWduKHtcbiAgICBtYWluQXhpczogMCxcbiAgICBhbHRBeGlzOiAwXG4gIH0sIHRldGhlck9mZnNldFZhbHVlKTtcbiAgdmFyIG9mZnNldE1vZGlmaWVyU3RhdGUgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldCA/IHN0YXRlLm1vZGlmaWVyc0RhdGEub2Zmc2V0W3N0YXRlLnBsYWNlbWVudF0gOiBudWxsO1xuICB2YXIgZGF0YSA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcblxuICBpZiAoIXBvcHBlck9mZnNldHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY2hlY2tNYWluQXhpcykge1xuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQ7XG5cbiAgICB2YXIgbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgICB2YXIgYWx0U2lkZSA9IG1haW5BeGlzID09PSAneScgPyBib3R0b20gOiByaWdodDtcbiAgICB2YXIgbGVuID0gbWFpbkF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICB2YXIgb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1ttYWluQXhpc107XG4gICAgdmFyIG1pbiA9IG9mZnNldCArIG92ZXJmbG93W21haW5TaWRlXTtcbiAgICB2YXIgbWF4ID0gb2Zmc2V0IC0gb3ZlcmZsb3dbYWx0U2lkZV07XG4gICAgdmFyIGFkZGl0aXZlID0gdGV0aGVyID8gLXBvcHBlclJlY3RbbGVuXSAvIDIgOiAwO1xuICAgIHZhciBtaW5MZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gcmVmZXJlbmNlUmVjdFtsZW5dIDogcG9wcGVyUmVjdFtsZW5dO1xuICAgIHZhciBtYXhMZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gLXBvcHBlclJlY3RbbGVuXSA6IC1yZWZlcmVuY2VSZWN0W2xlbl07IC8vIFdlIG5lZWQgdG8gaW5jbHVkZSB0aGUgYXJyb3cgaW4gdGhlIGNhbGN1bGF0aW9uIHNvIHRoZSBhcnJvdyBkb2Vzbid0IGdvXG4gICAgLy8gb3V0c2lkZSB0aGUgcmVmZXJlbmNlIGJvdW5kc1xuXG4gICAgdmFyIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93O1xuICAgIHZhciBhcnJvd1JlY3QgPSB0ZXRoZXIgJiYgYXJyb3dFbGVtZW50ID8gZ2V0TGF5b3V0UmVjdChhcnJvd0VsZW1lbnQpIDoge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDBcbiAgICB9O1xuICAgIHZhciBhcnJvd1BhZGRpbmdPYmplY3QgPSBzdGF0ZS5tb2RpZmllcnNEYXRhWydhcnJvdyNwZXJzaXN0ZW50J10gPyBzdGF0ZS5tb2RpZmllcnNEYXRhWydhcnJvdyNwZXJzaXN0ZW50J10ucGFkZGluZyA6IGdldEZyZXNoU2lkZU9iamVjdCgpO1xuICAgIHZhciBhcnJvd1BhZGRpbmdNaW4gPSBhcnJvd1BhZGRpbmdPYmplY3RbbWFpblNpZGVdO1xuICAgIHZhciBhcnJvd1BhZGRpbmdNYXggPSBhcnJvd1BhZGRpbmdPYmplY3RbYWx0U2lkZV07IC8vIElmIHRoZSByZWZlcmVuY2UgbGVuZ3RoIGlzIHNtYWxsZXIgdGhhbiB0aGUgYXJyb3cgbGVuZ3RoLCB3ZSBkb24ndCB3YW50XG4gICAgLy8gdG8gaW5jbHVkZSBpdHMgZnVsbCBzaXplIGluIHRoZSBjYWxjdWxhdGlvbi4gSWYgdGhlIHJlZmVyZW5jZSBpcyBzbWFsbFxuICAgIC8vIGFuZCBuZWFyIHRoZSBlZGdlIG9mIGEgYm91bmRhcnksIHRoZSBwb3BwZXIgY2FuIG92ZXJmbG93IGV2ZW4gaWYgdGhlXG4gICAgLy8gcmVmZXJlbmNlIGlzIG5vdCBvdmVyZmxvd2luZyBhcyB3ZWxsIChlLmcuIHZpcnR1YWwgZWxlbWVudHMgd2l0aCBub1xuICAgIC8vIHdpZHRoIG9yIGhlaWdodClcblxuICAgIHZhciBhcnJvd0xlbiA9IHdpdGhpbigwLCByZWZlcmVuY2VSZWN0W2xlbl0sIGFycm93UmVjdFtsZW5dKTtcbiAgICB2YXIgbWluT2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gcmVmZXJlbmNlUmVjdFtsZW5dIC8gMiAtIGFkZGl0aXZlIC0gYXJyb3dMZW4gLSBhcnJvd1BhZGRpbmdNaW4gLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXMgOiBtaW5MZW4gLSBhcnJvd0xlbiAtIGFycm93UGFkZGluZ01pbiAtIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcztcbiAgICB2YXIgbWF4T2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gLXJlZmVyZW5jZVJlY3RbbGVuXSAvIDIgKyBhZGRpdGl2ZSArIGFycm93TGVuICsgYXJyb3dQYWRkaW5nTWF4ICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzIDogbWF4TGVuICsgYXJyb3dMZW4gKyBhcnJvd1BhZGRpbmdNYXggKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXM7XG4gICAgdmFyIGFycm93T2Zmc2V0UGFyZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3cgJiYgZ2V0T2Zmc2V0UGFyZW50KHN0YXRlLmVsZW1lbnRzLmFycm93KTtcbiAgICB2YXIgY2xpZW50T2Zmc2V0ID0gYXJyb3dPZmZzZXRQYXJlbnQgPyBtYWluQXhpcyA9PT0gJ3knID8gYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50VG9wIHx8IDAgOiBhcnJvd09mZnNldFBhcmVudC5jbGllbnRMZWZ0IHx8IDAgOiAwO1xuICAgIHZhciBvZmZzZXRNb2RpZmllclZhbHVlID0gKF9vZmZzZXRNb2RpZmllclN0YXRlJCA9IG9mZnNldE1vZGlmaWVyU3RhdGUgPT0gbnVsbCA/IHZvaWQgMCA6IG9mZnNldE1vZGlmaWVyU3RhdGVbbWFpbkF4aXNdKSAhPSBudWxsID8gX29mZnNldE1vZGlmaWVyU3RhdGUkIDogMDtcbiAgICB2YXIgdGV0aGVyTWluID0gb2Zmc2V0ICsgbWluT2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZSAtIGNsaWVudE9mZnNldDtcbiAgICB2YXIgdGV0aGVyTWF4ID0gb2Zmc2V0ICsgbWF4T2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZTtcbiAgICB2YXIgcHJldmVudGVkT2Zmc2V0ID0gd2l0aGluKHRldGhlciA/IG1hdGhNaW4obWluLCB0ZXRoZXJNaW4pIDogbWluLCBvZmZzZXQsIHRldGhlciA/IG1hdGhNYXgobWF4LCB0ZXRoZXJNYXgpIDogbWF4KTtcbiAgICBwb3BwZXJPZmZzZXRzW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldDtcbiAgICBkYXRhW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldCAtIG9mZnNldDtcbiAgfVxuXG4gIGlmIChjaGVja0FsdEF4aXMpIHtcbiAgICB2YXIgX29mZnNldE1vZGlmaWVyU3RhdGUkMjtcblxuICAgIHZhciBfbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3gnID8gdG9wIDogbGVmdDtcblxuICAgIHZhciBfYWx0U2lkZSA9IG1haW5BeGlzID09PSAneCcgPyBib3R0b20gOiByaWdodDtcblxuICAgIHZhciBfb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1thbHRBeGlzXTtcblxuICAgIHZhciBfbGVuID0gYWx0QXhpcyA9PT0gJ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gICAgdmFyIF9taW4gPSBfb2Zmc2V0ICsgb3ZlcmZsb3dbX21haW5TaWRlXTtcblxuICAgIHZhciBfbWF4ID0gX29mZnNldCAtIG92ZXJmbG93W19hbHRTaWRlXTtcblxuICAgIHZhciBpc09yaWdpblNpZGUgPSBbdG9wLCBsZWZ0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpICE9PSAtMTtcblxuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJWYWx1ZSA9IChfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQyID0gb2Zmc2V0TW9kaWZpZXJTdGF0ZSA9PSBudWxsID8gdm9pZCAwIDogb2Zmc2V0TW9kaWZpZXJTdGF0ZVthbHRBeGlzXSkgIT0gbnVsbCA/IF9vZmZzZXRNb2RpZmllclN0YXRlJDIgOiAwO1xuXG4gICAgdmFyIF90ZXRoZXJNaW4gPSBpc09yaWdpblNpZGUgPyBfbWluIDogX29mZnNldCAtIHJlZmVyZW5jZVJlY3RbX2xlbl0gLSBwb3BwZXJSZWN0W19sZW5dIC0gX29mZnNldE1vZGlmaWVyVmFsdWUgKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUuYWx0QXhpcztcblxuICAgIHZhciBfdGV0aGVyTWF4ID0gaXNPcmlnaW5TaWRlID8gX29mZnNldCArIHJlZmVyZW5jZVJlY3RbX2xlbl0gKyBwb3BwZXJSZWN0W19sZW5dIC0gX29mZnNldE1vZGlmaWVyVmFsdWUgLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUuYWx0QXhpcyA6IF9tYXg7XG5cbiAgICB2YXIgX3ByZXZlbnRlZE9mZnNldCA9IHRldGhlciAmJiBpc09yaWdpblNpZGUgPyB3aXRoaW5NYXhDbGFtcChfdGV0aGVyTWluLCBfb2Zmc2V0LCBfdGV0aGVyTWF4KSA6IHdpdGhpbih0ZXRoZXIgPyBfdGV0aGVyTWluIDogX21pbiwgX29mZnNldCwgdGV0aGVyID8gX3RldGhlck1heCA6IF9tYXgpO1xuXG4gICAgcG9wcGVyT2Zmc2V0c1thbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQ7XG4gICAgZGF0YVthbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQgLSBfb2Zmc2V0O1xuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdwcmV2ZW50T3ZlcmZsb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogcHJldmVudE92ZXJmbG93LFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddXG59OyIsImltcG9ydCB7IHBvcHBlckdlbmVyYXRvciwgZGV0ZWN0T3ZlcmZsb3cgfSBmcm9tIFwiLi9jcmVhdGVQb3BwZXIuanNcIjtcbmltcG9ydCBldmVudExpc3RlbmVycyBmcm9tIFwiLi9tb2RpZmllcnMvZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmltcG9ydCBwb3BwZXJPZmZzZXRzIGZyb20gXCIuL21vZGlmaWVycy9wb3BwZXJPZmZzZXRzLmpzXCI7XG5pbXBvcnQgY29tcHV0ZVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvY29tcHV0ZVN0eWxlcy5qc1wiO1xuaW1wb3J0IGFwcGx5U3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9hcHBseVN0eWxlcy5qc1wiO1xudmFyIGRlZmF1bHRNb2RpZmllcnMgPSBbZXZlbnRMaXN0ZW5lcnMsIHBvcHBlck9mZnNldHMsIGNvbXB1dGVTdHlsZXMsIGFwcGx5U3R5bGVzXTtcbnZhciBjcmVhdGVQb3BwZXIgPSAvKiNfX1BVUkVfXyovcG9wcGVyR2VuZXJhdG9yKHtcbiAgZGVmYXVsdE1vZGlmaWVyczogZGVmYXVsdE1vZGlmaWVyc1xufSk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgY3JlYXRlUG9wcGVyLCBwb3BwZXJHZW5lcmF0b3IsIGRlZmF1bHRNb2RpZmllcnMsIGRldGVjdE92ZXJmbG93IH07IiwiaW1wb3J0IHsgcG9wcGVyR2VuZXJhdG9yLCBkZXRlY3RPdmVyZmxvdyB9IGZyb20gXCIuL2NyZWF0ZVBvcHBlci5qc1wiO1xuaW1wb3J0IGV2ZW50TGlzdGVuZXJzIGZyb20gXCIuL21vZGlmaWVycy9ldmVudExpc3RlbmVycy5qc1wiO1xuaW1wb3J0IHBvcHBlck9mZnNldHMgZnJvbSBcIi4vbW9kaWZpZXJzL3BvcHBlck9mZnNldHMuanNcIjtcbmltcG9ydCBjb21wdXRlU3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9jb21wdXRlU3R5bGVzLmpzXCI7XG5pbXBvcnQgYXBwbHlTdHlsZXMgZnJvbSBcIi4vbW9kaWZpZXJzL2FwcGx5U3R5bGVzLmpzXCI7XG5pbXBvcnQgb2Zmc2V0IGZyb20gXCIuL21vZGlmaWVycy9vZmZzZXQuanNcIjtcbmltcG9ydCBmbGlwIGZyb20gXCIuL21vZGlmaWVycy9mbGlwLmpzXCI7XG5pbXBvcnQgcHJldmVudE92ZXJmbG93IGZyb20gXCIuL21vZGlmaWVycy9wcmV2ZW50T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBhcnJvdyBmcm9tIFwiLi9tb2RpZmllcnMvYXJyb3cuanNcIjtcbmltcG9ydCBoaWRlIGZyb20gXCIuL21vZGlmaWVycy9oaWRlLmpzXCI7XG52YXIgZGVmYXVsdE1vZGlmaWVycyA9IFtldmVudExpc3RlbmVycywgcG9wcGVyT2Zmc2V0cywgY29tcHV0ZVN0eWxlcywgYXBwbHlTdHlsZXMsIG9mZnNldCwgZmxpcCwgcHJldmVudE92ZXJmbG93LCBhcnJvdywgaGlkZV07XG52YXIgY3JlYXRlUG9wcGVyID0gLyojX19QVVJFX18qL3BvcHBlckdlbmVyYXRvcih7XG4gIGRlZmF1bHRNb2RpZmllcnM6IGRlZmF1bHRNb2RpZmllcnNcbn0pOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciwgcG9wcGVyR2VuZXJhdG9yLCBkZWZhdWx0TW9kaWZpZXJzLCBkZXRlY3RPdmVyZmxvdyB9OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciBhcyBjcmVhdGVQb3BwZXJMaXRlIH0gZnJvbSBcIi4vcG9wcGVyLWxpdGUuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgKiBmcm9tIFwiLi9tb2RpZmllcnMvaW5kZXguanNcIjsiLCJpbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IHsgdmFyaWF0aW9uUGxhY2VtZW50cywgYmFzZVBsYWNlbWVudHMsIHBsYWNlbWVudHMgYXMgYWxsUGxhY2VtZW50cyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wdXRlQXV0b1BsYWNlbWVudChzdGF0ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5ID0gX29wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBfb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICBwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgIGZsaXBWYXJpYXRpb25zID0gX29wdGlvbnMuZmxpcFZhcmlhdGlvbnMsXG4gICAgICBfb3B0aW9ucyRhbGxvd2VkQXV0b1AgPSBfb3B0aW9ucy5hbGxvd2VkQXV0b1BsYWNlbWVudHMsXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHMgPSBfb3B0aW9ucyRhbGxvd2VkQXV0b1AgPT09IHZvaWQgMCA/IGFsbFBsYWNlbWVudHMgOiBfb3B0aW9ucyRhbGxvd2VkQXV0b1A7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24ocGxhY2VtZW50KTtcbiAgdmFyIHBsYWNlbWVudHMgPSB2YXJpYXRpb24gPyBmbGlwVmFyaWF0aW9ucyA/IHZhcmlhdGlvblBsYWNlbWVudHMgOiB2YXJpYXRpb25QbGFjZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgcmV0dXJuIGdldFZhcmlhdGlvbihwbGFjZW1lbnQpID09PSB2YXJpYXRpb247XG4gIH0pIDogYmFzZVBsYWNlbWVudHM7XG4gIHZhciBhbGxvd2VkUGxhY2VtZW50cyA9IHBsYWNlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gYWxsb3dlZEF1dG9QbGFjZW1lbnRzLmluZGV4T2YocGxhY2VtZW50KSA+PSAwO1xuICB9KTtcblxuICBpZiAoYWxsb3dlZFBsYWNlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgYWxsb3dlZFBsYWNlbWVudHMgPSBwbGFjZW1lbnRzO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogVGhlIGBhbGxvd2VkQXV0b1BsYWNlbWVudHNgIG9wdGlvbiBkaWQgbm90IGFsbG93IGFueScsICdwbGFjZW1lbnRzLiBFbnN1cmUgdGhlIGBwbGFjZW1lbnRgIG9wdGlvbiBtYXRjaGVzIHRoZSB2YXJpYXRpb24nLCAnb2YgdGhlIGFsbG93ZWQgcGxhY2VtZW50cy4nLCAnRm9yIGV4YW1wbGUsIFwiYXV0b1wiIGNhbm5vdCBiZSB1c2VkIHRvIGFsbG93IFwiYm90dG9tLXN0YXJ0XCIuJywgJ1VzZSBcImF1dG8tc3RhcnRcIiBpbnN0ZWFkLiddLmpvaW4oJyAnKSk7XG4gICAgfVxuICB9IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXR5cGVdOiBGbG93IHNlZW1zIHRvIGhhdmUgcHJvYmxlbXMgd2l0aCB0d28gYXJyYXkgdW5pb25zLi4uXG5cblxuICB2YXIgb3ZlcmZsb3dzID0gYWxsb3dlZFBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIGFjY1twbGFjZW1lbnRdID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICBwYWRkaW5nOiBwYWRkaW5nXG4gICAgfSlbZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpXTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvdmVyZmxvd3MpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gb3ZlcmZsb3dzW2FdIC0gb3ZlcmZsb3dzW2JdO1xuICB9KTtcbn0iLCJpbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudCBmcm9tIFwiLi9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCB7IHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCwgc3RhcnQsIGVuZCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcHV0ZU9mZnNldHMoX3JlZikge1xuICB2YXIgcmVmZXJlbmNlID0gX3JlZi5yZWZlcmVuY2UsXG4gICAgICBlbGVtZW50ID0gX3JlZi5lbGVtZW50LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZi5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50ID8gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIDogbnVsbDtcbiAgdmFyIHZhcmlhdGlvbiA9IHBsYWNlbWVudCA/IGdldFZhcmlhdGlvbihwbGFjZW1lbnQpIDogbnVsbDtcbiAgdmFyIGNvbW1vblggPSByZWZlcmVuY2UueCArIHJlZmVyZW5jZS53aWR0aCAvIDIgLSBlbGVtZW50LndpZHRoIC8gMjtcbiAgdmFyIGNvbW1vblkgPSByZWZlcmVuY2UueSArIHJlZmVyZW5jZS5oZWlnaHQgLyAyIC0gZWxlbWVudC5oZWlnaHQgLyAyO1xuICB2YXIgb2Zmc2V0cztcblxuICBzd2l0Y2ggKGJhc2VQbGFjZW1lbnQpIHtcbiAgICBjYXNlIHRvcDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IGNvbW1vblgsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55IC0gZWxlbWVudC5oZWlnaHRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgYm90dG9tOlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogY29tbW9uWCxcbiAgICAgICAgeTogcmVmZXJlbmNlLnkgKyByZWZlcmVuY2UuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHJpZ2h0OlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogcmVmZXJlbmNlLnggKyByZWZlcmVuY2Uud2lkdGgsXG4gICAgICAgIHk6IGNvbW1vbllcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgbGVmdDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54IC0gZWxlbWVudC53aWR0aCxcbiAgICAgICAgeTogY29tbW9uWVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54LFxuICAgICAgICB5OiByZWZlcmVuY2UueVxuICAgICAgfTtcbiAgfVxuXG4gIHZhciBtYWluQXhpcyA9IGJhc2VQbGFjZW1lbnQgPyBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCkgOiBudWxsO1xuXG4gIGlmIChtYWluQXhpcyAhPSBudWxsKSB7XG4gICAgdmFyIGxlbiA9IG1haW5BeGlzID09PSAneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgICBzd2l0Y2ggKHZhcmlhdGlvbikge1xuICAgICAgY2FzZSBzdGFydDpcbiAgICAgICAgb2Zmc2V0c1ttYWluQXhpc10gPSBvZmZzZXRzW21haW5BeGlzXSAtIChyZWZlcmVuY2VbbGVuXSAvIDIgLSBlbGVtZW50W2xlbl0gLyAyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgZW5kOlxuICAgICAgICBvZmZzZXRzW21haW5BeGlzXSA9IG9mZnNldHNbbWFpbkF4aXNdICsgKHJlZmVyZW5jZVtsZW5dIC8gMiAtIGVsZW1lbnRbbGVuXSAvIDIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0cztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShmbikge1xuICB2YXIgcGVuZGluZztcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXBlbmRpbmcpIHtcbiAgICAgIHBlbmRpbmcgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwZW5kaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHJlc29sdmUoZm4oKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBlbmRpbmc7XG4gIH07XG59IiwiaW1wb3J0IGdldENsaXBwaW5nUmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldENsaXBwaW5nUmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGNvbXB1dGVPZmZzZXRzIGZyb20gXCIuL2NvbXB1dGVPZmZzZXRzLmpzXCI7XG5pbXBvcnQgcmVjdFRvQ2xpZW50UmVjdCBmcm9tIFwiLi9yZWN0VG9DbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgeyBjbGlwcGluZ1BhcmVudHMsIHJlZmVyZW5jZSwgcG9wcGVyLCBib3R0b20sIHRvcCwgcmlnaHQsIGJhc2VQbGFjZW1lbnRzLCB2aWV3cG9ydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IHsgaXNFbGVtZW50IH0gZnJvbSBcIi4uL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgbWVyZ2VQYWRkaW5nT2JqZWN0IGZyb20gXCIuL21lcmdlUGFkZGluZ09iamVjdC5qc1wiO1xuaW1wb3J0IGV4cGFuZFRvSGFzaE1hcCBmcm9tIFwiLi9leHBhbmRUb0hhc2hNYXAuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIF9vcHRpb25zJHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgIHBsYWNlbWVudCA9IF9vcHRpb25zJHBsYWNlbWVudCA9PT0gdm9pZCAwID8gc3RhdGUucGxhY2VtZW50IDogX29wdGlvbnMkcGxhY2VtZW50LFxuICAgICAgX29wdGlvbnMkc3RyYXRlZ3kgPSBfb3B0aW9ucy5zdHJhdGVneSxcbiAgICAgIHN0cmF0ZWd5ID0gX29wdGlvbnMkc3RyYXRlZ3kgPT09IHZvaWQgMCA/IHN0YXRlLnN0cmF0ZWd5IDogX29wdGlvbnMkc3RyYXRlZ3ksXG4gICAgICBfb3B0aW9ucyRib3VuZGFyeSA9IF9vcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgYm91bmRhcnkgPSBfb3B0aW9ucyRib3VuZGFyeSA9PT0gdm9pZCAwID8gY2xpcHBpbmdQYXJlbnRzIDogX29wdGlvbnMkYm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRyb290Qm91bmRhcnkgPSBfb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBfb3B0aW9ucyRyb290Qm91bmRhcnkgPT09IHZvaWQgMCA/IHZpZXdwb3J0IDogX29wdGlvbnMkcm9vdEJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkZWxlbWVudENvbnRlID0gX29wdGlvbnMuZWxlbWVudENvbnRleHQsXG4gICAgICBlbGVtZW50Q29udGV4dCA9IF9vcHRpb25zJGVsZW1lbnRDb250ZSA9PT0gdm9pZCAwID8gcG9wcGVyIDogX29wdGlvbnMkZWxlbWVudENvbnRlLFxuICAgICAgX29wdGlvbnMkYWx0Qm91bmRhcnkgPSBfb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gX29wdGlvbnMkYWx0Qm91bmRhcnkgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkYWx0Qm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgIHBhZGRpbmcgPSBfb3B0aW9ucyRwYWRkaW5nID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkcGFkZGluZztcbiAgdmFyIHBhZGRpbmdPYmplY3QgPSBtZXJnZVBhZGRpbmdPYmplY3QodHlwZW9mIHBhZGRpbmcgIT09ICdudW1iZXInID8gcGFkZGluZyA6IGV4cGFuZFRvSGFzaE1hcChwYWRkaW5nLCBiYXNlUGxhY2VtZW50cykpO1xuICB2YXIgYWx0Q29udGV4dCA9IGVsZW1lbnRDb250ZXh0ID09PSBwb3BwZXIgPyByZWZlcmVuY2UgOiBwb3BwZXI7XG4gIHZhciBwb3BwZXJSZWN0ID0gc3RhdGUucmVjdHMucG9wcGVyO1xuICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW2FsdEJvdW5kYXJ5ID8gYWx0Q29udGV4dCA6IGVsZW1lbnRDb250ZXh0XTtcbiAgdmFyIGNsaXBwaW5nQ2xpZW50UmVjdCA9IGdldENsaXBwaW5nUmVjdChpc0VsZW1lbnQoZWxlbWVudCkgPyBlbGVtZW50IDogZWxlbWVudC5jb250ZXh0RWxlbWVudCB8fCBnZXREb2N1bWVudEVsZW1lbnQoc3RhdGUuZWxlbWVudHMucG9wcGVyKSwgYm91bmRhcnksIHJvb3RCb3VuZGFyeSwgc3RyYXRlZ3kpO1xuICB2YXIgcmVmZXJlbmNlQ2xpZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChzdGF0ZS5lbGVtZW50cy5yZWZlcmVuY2UpO1xuICB2YXIgcG9wcGVyT2Zmc2V0cyA9IGNvbXB1dGVPZmZzZXRzKHtcbiAgICByZWZlcmVuY2U6IHJlZmVyZW5jZUNsaWVudFJlY3QsXG4gICAgZWxlbWVudDogcG9wcGVyUmVjdCxcbiAgICBzdHJhdGVneTogJ2Fic29sdXRlJyxcbiAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudFxuICB9KTtcbiAgdmFyIHBvcHBlckNsaWVudFJlY3QgPSByZWN0VG9DbGllbnRSZWN0KE9iamVjdC5hc3NpZ24oe30sIHBvcHBlclJlY3QsIHBvcHBlck9mZnNldHMpKTtcbiAgdmFyIGVsZW1lbnRDbGllbnRSZWN0ID0gZWxlbWVudENvbnRleHQgPT09IHBvcHBlciA/IHBvcHBlckNsaWVudFJlY3QgOiByZWZlcmVuY2VDbGllbnRSZWN0OyAvLyBwb3NpdGl2ZSA9IG92ZXJmbG93aW5nIHRoZSBjbGlwcGluZyByZWN0XG4gIC8vIDAgb3IgbmVnYXRpdmUgPSB3aXRoaW4gdGhlIGNsaXBwaW5nIHJlY3RcblxuICB2YXIgb3ZlcmZsb3dPZmZzZXRzID0ge1xuICAgIHRvcDogY2xpcHBpbmdDbGllbnRSZWN0LnRvcCAtIGVsZW1lbnRDbGllbnRSZWN0LnRvcCArIHBhZGRpbmdPYmplY3QudG9wLFxuICAgIGJvdHRvbTogZWxlbWVudENsaWVudFJlY3QuYm90dG9tIC0gY2xpcHBpbmdDbGllbnRSZWN0LmJvdHRvbSArIHBhZGRpbmdPYmplY3QuYm90dG9tLFxuICAgIGxlZnQ6IGNsaXBwaW5nQ2xpZW50UmVjdC5sZWZ0IC0gZWxlbWVudENsaWVudFJlY3QubGVmdCArIHBhZGRpbmdPYmplY3QubGVmdCxcbiAgICByaWdodDogZWxlbWVudENsaWVudFJlY3QucmlnaHQgLSBjbGlwcGluZ0NsaWVudFJlY3QucmlnaHQgKyBwYWRkaW5nT2JqZWN0LnJpZ2h0XG4gIH07XG4gIHZhciBvZmZzZXREYXRhID0gc3RhdGUubW9kaWZpZXJzRGF0YS5vZmZzZXQ7IC8vIE9mZnNldHMgY2FuIGJlIGFwcGxpZWQgb25seSB0byB0aGUgcG9wcGVyIGVsZW1lbnRcblxuICBpZiAoZWxlbWVudENvbnRleHQgPT09IHBvcHBlciAmJiBvZmZzZXREYXRhKSB7XG4gICAgdmFyIG9mZnNldCA9IG9mZnNldERhdGFbcGxhY2VtZW50XTtcbiAgICBPYmplY3Qua2V5cyhvdmVyZmxvd09mZnNldHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIG11bHRpcGx5ID0gW3JpZ2h0LCBib3R0b21dLmluZGV4T2Yoa2V5KSA+PSAwID8gMSA6IC0xO1xuICAgICAgdmFyIGF4aXMgPSBbdG9wLCBib3R0b21dLmluZGV4T2Yoa2V5KSA+PSAwID8gJ3knIDogJ3gnO1xuICAgICAgb3ZlcmZsb3dPZmZzZXRzW2tleV0gKz0gb2Zmc2V0W2F4aXNdICogbXVsdGlwbHk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gb3ZlcmZsb3dPZmZzZXRzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4cGFuZFRvSGFzaE1hcCh2YWx1ZSwga2V5cykge1xuICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKGhhc2hNYXAsIGtleSkge1xuICAgIGhhc2hNYXBba2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiBoYXNoTWFwO1xuICB9LCB7fSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0KHN0cikge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gW10uY29uY2F0KGFyZ3MpLnJlZHVjZShmdW5jdGlvbiAocCwgYykge1xuICAgIHJldHVybiBwLnJlcGxhY2UoLyVzLywgYyk7XG4gIH0sIHN0cik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0QWx0QXhpcyhheGlzKSB7XG4gIHJldHVybiBheGlzID09PSAneCcgPyAneScgOiAneCc7XG59IiwiaW1wb3J0IHsgYXV0byB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEZyZXNoU2lkZU9iamVjdCgpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIGxlZnQ6IDBcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgPj0gMCA/ICd4JyA6ICd5Jztcbn0iLCJ2YXIgaGFzaCA9IHtcbiAgbGVmdDogJ3JpZ2h0JyxcbiAgcmlnaHQ6ICdsZWZ0JyxcbiAgYm90dG9tOiAndG9wJyxcbiAgdG9wOiAnYm90dG9tJ1xufTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL2xlZnR8cmlnaHR8Ym90dG9tfHRvcC9nLCBmdW5jdGlvbiAobWF0Y2hlZCkge1xuICAgIHJldHVybiBoYXNoW21hdGNoZWRdO1xuICB9KTtcbn0iLCJ2YXIgaGFzaCA9IHtcbiAgc3RhcnQ6ICdlbmQnLFxuICBlbmQ6ICdzdGFydCdcbn07XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9zdGFydHxlbmQvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICByZXR1cm4gaGFzaFttYXRjaGVkXTtcbiAgfSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnNwbGl0KCctJylbMV07XG59IiwiZXhwb3J0IHZhciBtYXggPSBNYXRoLm1heDtcbmV4cG9ydCB2YXIgbWluID0gTWF0aC5taW47XG5leHBvcnQgdmFyIHJvdW5kID0gTWF0aC5yb3VuZDsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZUJ5TmFtZShtb2RpZmllcnMpIHtcbiAgdmFyIG1lcmdlZCA9IG1vZGlmaWVycy5yZWR1Y2UoZnVuY3Rpb24gKG1lcmdlZCwgY3VycmVudCkge1xuICAgIHZhciBleGlzdGluZyA9IG1lcmdlZFtjdXJyZW50Lm5hbWVdO1xuICAgIG1lcmdlZFtjdXJyZW50Lm5hbWVdID0gZXhpc3RpbmcgPyBPYmplY3QuYXNzaWduKHt9LCBleGlzdGluZywgY3VycmVudCwge1xuICAgICAgb3B0aW9uczogT2JqZWN0LmFzc2lnbih7fSwgZXhpc3Rpbmcub3B0aW9ucywgY3VycmVudC5vcHRpb25zKSxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLmRhdGEsIGN1cnJlbnQuZGF0YSlcbiAgICB9KSA6IGN1cnJlbnQ7XG4gICAgcmV0dXJuIG1lcmdlZDtcbiAgfSwge30pOyAvLyBJRTExIGRvZXMgbm90IHN1cHBvcnQgT2JqZWN0LnZhbHVlc1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhtZXJnZWQpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIG1lcmdlZFtrZXldO1xuICB9KTtcbn0iLCJpbXBvcnQgZ2V0RnJlc2hTaWRlT2JqZWN0IGZyb20gXCIuL2dldEZyZXNoU2lkZU9iamVjdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VQYWRkaW5nT2JqZWN0KHBhZGRpbmdPYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGdldEZyZXNoU2lkZU9iamVjdCgpLCBwYWRkaW5nT2JqZWN0KTtcbn0iLCJpbXBvcnQgeyBtb2RpZmllclBoYXNlcyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiOyAvLyBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ5ODc1MjU1XG5cbmZ1bmN0aW9uIG9yZGVyKG1vZGlmaWVycykge1xuICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICB2YXIgdmlzaXRlZCA9IG5ldyBTZXQoKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBtYXAuc2V0KG1vZGlmaWVyLm5hbWUsIG1vZGlmaWVyKTtcbiAgfSk7IC8vIE9uIHZpc2l0aW5nIG9iamVjdCwgY2hlY2sgZm9yIGl0cyBkZXBlbmRlbmNpZXMgYW5kIHZpc2l0IHRoZW0gcmVjdXJzaXZlbHlcblxuICBmdW5jdGlvbiBzb3J0KG1vZGlmaWVyKSB7XG4gICAgdmlzaXRlZC5hZGQobW9kaWZpZXIubmFtZSk7XG4gICAgdmFyIHJlcXVpcmVzID0gW10uY29uY2F0KG1vZGlmaWVyLnJlcXVpcmVzIHx8IFtdLCBtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzIHx8IFtdKTtcbiAgICByZXF1aXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChkZXApIHtcbiAgICAgIGlmICghdmlzaXRlZC5oYXMoZGVwKSkge1xuICAgICAgICB2YXIgZGVwTW9kaWZpZXIgPSBtYXAuZ2V0KGRlcCk7XG5cbiAgICAgICAgaWYgKGRlcE1vZGlmaWVyKSB7XG4gICAgICAgICAgc29ydChkZXBNb2RpZmllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXN1bHQucHVzaChtb2RpZmllcik7XG4gIH1cblxuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBpZiAoIXZpc2l0ZWQuaGFzKG1vZGlmaWVyLm5hbWUpKSB7XG4gICAgICAvLyBjaGVjayBmb3IgdmlzaXRlZCBvYmplY3RcbiAgICAgIHNvcnQobW9kaWZpZXIpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9yZGVyTW9kaWZpZXJzKG1vZGlmaWVycykge1xuICAvLyBvcmRlciBiYXNlZCBvbiBkZXBlbmRlbmNpZXNcbiAgdmFyIG9yZGVyZWRNb2RpZmllcnMgPSBvcmRlcihtb2RpZmllcnMpOyAvLyBvcmRlciBiYXNlZCBvbiBwaGFzZVxuXG4gIHJldHVybiBtb2RpZmllclBoYXNlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGhhc2UpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLmZpbHRlcihmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICAgIHJldHVybiBtb2RpZmllci5waGFzZSA9PT0gcGhhc2U7XG4gICAgfSkpO1xuICB9LCBbXSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVjdFRvQ2xpZW50UmVjdChyZWN0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZWN0LCB7XG4gICAgbGVmdDogcmVjdC54LFxuICAgIHRvcDogcmVjdC55LFxuICAgIHJpZ2h0OiByZWN0LnggKyByZWN0LndpZHRoLFxuICAgIGJvdHRvbTogcmVjdC55ICsgcmVjdC5oZWlnaHRcbiAgfSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5pcXVlQnkoYXJyLCBmbikge1xuICB2YXIgaWRlbnRpZmllcnMgPSBuZXcgU2V0KCk7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBmbihpdGVtKTtcblxuICAgIGlmICghaWRlbnRpZmllcnMuaGFzKGlkZW50aWZpZXIpKSB7XG4gICAgICBpZGVudGlmaWVycy5hZGQoaWRlbnRpZmllcik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVBU3RyaW5nKCkge1xuICB2YXIgdWFEYXRhID0gbmF2aWdhdG9yLnVzZXJBZ2VudERhdGE7XG5cbiAgaWYgKHVhRGF0YSAhPSBudWxsICYmIHVhRGF0YS5icmFuZHMpIHtcbiAgICByZXR1cm4gdWFEYXRhLmJyYW5kcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLmJyYW5kICsgXCIvXCIgKyBpdGVtLnZlcnNpb247XG4gICAgfSkuam9pbignICcpO1xuICB9XG5cbiAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQ7XG59IiwiaW1wb3J0IGZvcm1hdCBmcm9tIFwiLi9mb3JtYXQuanNcIjtcbmltcG9ydCB7IG1vZGlmaWVyUGhhc2VzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG52YXIgSU5WQUxJRF9NT0RJRklFUl9FUlJPUiA9ICdQb3BwZXI6IG1vZGlmaWVyIFwiJXNcIiBwcm92aWRlZCBhbiBpbnZhbGlkICVzIHByb3BlcnR5LCBleHBlY3RlZCAlcyBidXQgZ290ICVzJztcbnZhciBNSVNTSU5HX0RFUEVOREVOQ1lfRVJST1IgPSAnUG9wcGVyOiBtb2RpZmllciBcIiVzXCIgcmVxdWlyZXMgXCIlc1wiLCBidXQgXCIlc1wiIG1vZGlmaWVyIGlzIG5vdCBhdmFpbGFibGUnO1xudmFyIFZBTElEX1BST1BFUlRJRVMgPSBbJ25hbWUnLCAnZW5hYmxlZCcsICdwaGFzZScsICdmbicsICdlZmZlY3QnLCAncmVxdWlyZXMnLCAnb3B0aW9ucyddO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmFsaWRhdGVNb2RpZmllcnMobW9kaWZpZXJzKSB7XG4gIG1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIFtdLmNvbmNhdChPYmplY3Qua2V5cyhtb2RpZmllciksIFZBTElEX1BST1BFUlRJRVMpIC8vIElFMTEtY29tcGF0aWJsZSByZXBsYWNlbWVudCBmb3IgYG5ldyBTZXQoaXRlcmFibGUpYFxuICAgIC5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgc2VsZikge1xuICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgICAgaWYgKHR5cGVvZiBtb2RpZmllci5uYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgU3RyaW5nKG1vZGlmaWVyLm5hbWUpLCAnXCJuYW1lXCInLCAnXCJzdHJpbmdcIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLm5hbWUpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdlbmFibGVkJzpcbiAgICAgICAgICBpZiAodHlwZW9mIG1vZGlmaWVyLmVuYWJsZWQgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wiZW5hYmxlZFwiJywgJ1wiYm9vbGVhblwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIuZW5hYmxlZCkgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3BoYXNlJzpcbiAgICAgICAgICBpZiAobW9kaWZpZXJQaGFzZXMuaW5kZXhPZihtb2RpZmllci5waGFzZSkgPCAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJwaGFzZVwiJywgXCJlaXRoZXIgXCIgKyBtb2RpZmllclBoYXNlcy5qb2luKCcsICcpLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5waGFzZSkgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2ZuJzpcbiAgICAgICAgICBpZiAodHlwZW9mIG1vZGlmaWVyLmZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJmblwiJywgJ1wiZnVuY3Rpb25cIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLmZuKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZWZmZWN0JzpcbiAgICAgICAgICBpZiAobW9kaWZpZXIuZWZmZWN0ICE9IG51bGwgJiYgdHlwZW9mIG1vZGlmaWVyLmVmZmVjdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wiZWZmZWN0XCInLCAnXCJmdW5jdGlvblwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIuZm4pICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyZXF1aXJlcyc6XG4gICAgICAgICAgaWYgKG1vZGlmaWVyLnJlcXVpcmVzICE9IG51bGwgJiYgIUFycmF5LmlzQXJyYXkobW9kaWZpZXIucmVxdWlyZXMpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJyZXF1aXJlc1wiJywgJ1wiYXJyYXlcIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLnJlcXVpcmVzKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncmVxdWlyZXNJZkV4aXN0cyc6XG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG1vZGlmaWVyLnJlcXVpcmVzSWZFeGlzdHMpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJyZXF1aXJlc0lmRXhpc3RzXCInLCAnXCJhcnJheVwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIucmVxdWlyZXNJZkV4aXN0cykgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ29wdGlvbnMnOlxuICAgICAgICBjYXNlICdkYXRhJzpcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQb3BwZXJKUzogYW4gaW52YWxpZCBwcm9wZXJ0eSBoYXMgYmVlbiBwcm92aWRlZCB0byB0aGUgXFxcIlwiICsgbW9kaWZpZXIubmFtZSArIFwiXFxcIiBtb2RpZmllciwgdmFsaWQgcHJvcGVydGllcyBhcmUgXCIgKyBWQUxJRF9QUk9QRVJUSUVTLm1hcChmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgcmV0dXJuIFwiXFxcIlwiICsgcyArIFwiXFxcIlwiO1xuICAgICAgICAgIH0pLmpvaW4oJywgJykgKyBcIjsgYnV0IFxcXCJcIiArIGtleSArIFwiXFxcIiB3YXMgcHJvdmlkZWQuXCIpO1xuICAgICAgfVxuXG4gICAgICBtb2RpZmllci5yZXF1aXJlcyAmJiBtb2RpZmllci5yZXF1aXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXF1aXJlbWVudCkge1xuICAgICAgICBpZiAobW9kaWZpZXJzLmZpbmQoZnVuY3Rpb24gKG1vZCkge1xuICAgICAgICAgIHJldHVybiBtb2QubmFtZSA9PT0gcmVxdWlyZW1lbnQ7XG4gICAgICAgIH0pID09IG51bGwpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChNSVNTSU5HX0RFUEVOREVOQ1lfRVJST1IsIFN0cmluZyhtb2RpZmllci5uYW1lKSwgcmVxdWlyZW1lbnQsIHJlcXVpcmVtZW50KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0iLCJpbXBvcnQgeyBtYXggYXMgbWF0aE1heCwgbWluIGFzIG1hdGhNaW4gfSBmcm9tIFwiLi9tYXRoLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gd2l0aGluKG1pbiwgdmFsdWUsIG1heCkge1xuICByZXR1cm4gbWF0aE1heChtaW4sIG1hdGhNaW4odmFsdWUsIG1heCkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhpbk1heENsYW1wKG1pbiwgdmFsdWUsIG1heCkge1xuICB2YXIgdiA9IHdpdGhpbihtaW4sIHZhbHVlLCBtYXgpO1xuICByZXR1cm4gdiA+IG1heCA/IG1heCA6IHY7XG59IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLypcXG4hIHRhaWx3aW5kY3NzIHYzLjIuNCB8IE1JVCBMaWNlbnNlIHwgaHR0cHM6Ly90YWlsd2luZGNzcy5jb21cXG4qLy8qXFxuMS4gUHJldmVudCBwYWRkaW5nIGFuZCBib3JkZXIgZnJvbSBhZmZlY3RpbmcgZWxlbWVudCB3aWR0aC4gKGh0dHBzOi8vZ2l0aHViLmNvbS9tb3pkZXZzL2Nzc3JlbWVkeS9pc3N1ZXMvNClcXG4yLiBBbGxvdyBhZGRpbmcgYSBib3JkZXIgdG8gYW4gZWxlbWVudCBieSBqdXN0IGFkZGluZyBhIGJvcmRlci13aWR0aC4gKGh0dHBzOi8vZ2l0aHViLmNvbS90YWlsd2luZGNzcy90YWlsd2luZGNzcy9wdWxsLzExNilcXG4qL1xcblxcbiosXFxuOjpiZWZvcmUsXFxuOjphZnRlciB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBib3JkZXItd2lkdGg6IDA7IC8qIDIgKi9cXG4gIGJvcmRlci1zdHlsZTogc29saWQ7IC8qIDIgKi9cXG4gIGJvcmRlci1jb2xvcjogI0U1RTdFQjsgLyogMiAqL1xcbn1cXG5cXG46OmJlZm9yZSxcXG46OmFmdGVyIHtcXG4gIC0tdHctY29udGVudDogJyc7XFxufVxcblxcbi8qXFxuMS4gVXNlIGEgY29uc2lzdGVudCBzZW5zaWJsZSBsaW5lLWhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuMy4gVXNlIGEgbW9yZSByZWFkYWJsZSB0YWIgc2l6ZS5cXG40LiBVc2UgdGhlIHVzZXIncyBjb25maWd1cmVkIGBzYW5zYCBmb250LWZhbWlseSBieSBkZWZhdWx0LlxcbjUuIFVzZSB0aGUgdXNlcidzIGNvbmZpZ3VyZWQgYHNhbnNgIGZvbnQtZmVhdHVyZS1zZXR0aW5ncyBieSBkZWZhdWx0LlxcbiovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS41OyAvKiAxICovXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXG4gIC1tb3otdGFiLXNpemU6IDQ7IC8qIDMgKi9cXG4gIC1vLXRhYi1zaXplOiA0O1xcbiAgICAgdGFiLXNpemU6IDQ7IC8qIDMgKi9cXG4gIGZvbnQtZmFtaWx5OiBOdW5pdG8sIHVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcXFwiU2Vnb2UgVUlcXFwiLCBSb2JvdG8sIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIEFyaWFsLCBcXFwiTm90byBTYW5zXFxcIiwgc2Fucy1zZXJpZiwgXFxcIkFwcGxlIENvbG9yIEVtb2ppXFxcIiwgXFxcIlNlZ29lIFVJIEVtb2ppXFxcIiwgXFxcIlNlZ29lIFVJIFN5bWJvbFxcXCIsIFxcXCJOb3RvIENvbG9yIEVtb2ppXFxcIjsgLyogNCAqL1xcbiAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiBub3JtYWw7IC8qIDUgKi9cXG59XFxuXFxuLypcXG4xLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuMi4gSW5oZXJpdCBsaW5lLWhlaWdodCBmcm9tIGBodG1sYCBzbyB1c2VycyBjYW4gc2V0IHRoZW0gYXMgYSBjbGFzcyBkaXJlY3RseSBvbiB0aGUgYGh0bWxgIGVsZW1lbnQuXFxuKi9cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDsgLyogMSAqL1xcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7IC8qIDIgKi9cXG59XFxuXFxuLypcXG4xLiBBZGQgdGhlIGNvcnJlY3QgaGVpZ2h0IGluIEZpcmVmb3guXFxuMi4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2Ugb2YgYm9yZGVyIGNvbG9yIGluIEZpcmVmb3guIChodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xOTA2NTUpXFxuMy4gRW5zdXJlIGhvcml6b250YWwgcnVsZXMgYXJlIHZpc2libGUgYnkgZGVmYXVsdC5cXG4qL1xcblxcbmhyIHtcXG4gIGhlaWdodDogMDsgLyogMSAqL1xcbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cXG4gIGJvcmRlci10b3Atd2lkdGg6IDFweDsgLyogMyAqL1xcbn1cXG5cXG4vKlxcbkFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcbiovXFxuXFxuYWJicjp3aGVyZShbdGl0bGVdKSB7XFxuICAtd2Via2l0LXRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDtcXG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkO1xcbn1cXG5cXG4vKlxcblJlbW92ZSB0aGUgZGVmYXVsdCBmb250IHNpemUgYW5kIHdlaWdodCBmb3IgaGVhZGluZ3MuXFxuKi9cXG5cXG5oMSxcXG5oMixcXG5oMyxcXG5oNCxcXG5oNSxcXG5oNiB7XFxuICBmb250LXNpemU6IGluaGVyaXQ7XFxuICBmb250LXdlaWdodDogaW5oZXJpdDtcXG59XFxuXFxuLypcXG5SZXNldCBsaW5rcyB0byBvcHRpbWl6ZSBmb3Igb3B0LWluIHN0eWxpbmcgaW5zdGVhZCBvZiBvcHQtb3V0LlxcbiovXFxuXFxuYSB7XFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcXG59XFxuXFxuLypcXG5BZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gRWRnZSBhbmQgU2FmYXJpLlxcbiovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLypcXG4xLiBVc2UgdGhlIHVzZXIncyBjb25maWd1cmVkIGBtb25vYCBmb250IGZhbWlseSBieSBkZWZhdWx0LlxcbjIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4qL1xcblxcbmNvZGUsXFxua2JkLFxcbnNhbXAsXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiB1aS1tb25vc3BhY2UsIFNGTW9uby1SZWd1bGFyLCBNZW5sbywgTW9uYWNvLCBDb25zb2xhcywgXFxcIkxpYmVyYXRpb24gTW9ub1xcXCIsIFxcXCJDb3VyaWVyIE5ld1xcXCIsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLypcXG5BZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4qL1xcblxcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG4vKlxcblByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuKi9cXG5cXG5zdWIsXFxuc3VwIHtcXG4gIGZvbnQtc2l6ZTogNzUlO1xcbiAgbGluZS1oZWlnaHQ6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbnN1YiB7XFxuICBib3R0b206IC0wLjI1ZW07XFxufVxcblxcbnN1cCB7XFxuICB0b3A6IC0wLjVlbTtcXG59XFxuXFxuLypcXG4xLiBSZW1vdmUgdGV4dCBpbmRlbnRhdGlvbiBmcm9tIHRhYmxlIGNvbnRlbnRzIGluIENocm9tZSBhbmQgU2FmYXJpLiAoaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9OTk5MDg4LCBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjAxMjk3KVxcbjIuIENvcnJlY3QgdGFibGUgYm9yZGVyIGNvbG9yIGluaGVyaXRhbmNlIGluIGFsbCBDaHJvbWUgYW5kIFNhZmFyaS4gKGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTkzNTcyOSwgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE5NTAxNilcXG4zLiBSZW1vdmUgZ2FwcyBiZXR3ZWVuIHRhYmxlIGJvcmRlcnMgYnkgZGVmYXVsdC5cXG4qL1xcblxcbnRhYmxlIHtcXG4gIHRleHQtaW5kZW50OiAwOyAvKiAxICovXFxuICBib3JkZXItY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IC8qIDMgKi9cXG59XFxuXFxuLypcXG4xLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cXG4yLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxuMy4gUmVtb3ZlIGRlZmF1bHQgcGFkZGluZyBpbiBhbGwgYnJvd3NlcnMuXFxuKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGZvbnQtd2VpZ2h0OiBpbmhlcml0OyAvKiAxICovXFxuICBsaW5lLWhlaWdodDogaW5oZXJpdDsgLyogMSAqL1xcbiAgY29sb3I6IGluaGVyaXQ7IC8qIDEgKi9cXG4gIG1hcmdpbjogMDsgLyogMiAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbn1cXG5cXG4vKlxcblJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSBhbmQgRmlyZWZveC5cXG4qL1xcblxcbmJ1dHRvbixcXG5zZWxlY3Qge1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi8qXFxuMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4yLiBSZW1vdmUgZGVmYXVsdCBidXR0b24gc3R5bGVzLlxcbiovXFxuXFxuYnV0dG9uLFxcblt0eXBlPSdidXR0b24nXSxcXG5bdHlwZT0ncmVzZXQnXSxcXG5bdHlwZT0nc3VibWl0J10ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyAvKiAyICovXFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lOyAvKiAyICovXFxufVxcblxcbi8qXFxuVXNlIHRoZSBtb2Rlcm4gRmlyZWZveCBmb2N1cyBzdHlsZSBmb3IgYWxsIGZvY3VzYWJsZSBlbGVtZW50cy5cXG4qL1xcblxcbjotbW96LWZvY3VzcmluZyB7XFxuICBvdXRsaW5lOiBhdXRvO1xcbn1cXG5cXG4vKlxcblJlbW92ZSB0aGUgYWRkaXRpb25hbCBgOmludmFsaWRgIHN0eWxlcyBpbiBGaXJlZm94LiAoaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvZ2Vja28tZGV2L2Jsb2IvMmY5ZWFjZDlkM2Q5OTVjOTM3YjQyNTFhNTU1N2Q5NWQ0OTRjOWJlMS9sYXlvdXQvc3R5bGUvcmVzL2Zvcm1zLmNzcyNMNzI4LUw3MzcpXFxuKi9cXG5cXG46LW1vei11aS1pbnZhbGlkIHtcXG4gIGJveC1zaGFkb3c6IG5vbmU7XFxufVxcblxcbi8qXFxuQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUgYW5kIEZpcmVmb3guXFxuKi9cXG5cXG5wcm9ncmVzcyB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbi8qXFxuQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gU2FmYXJpLlxcbiovXFxuXFxuOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcbjo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcblxcbi8qXFxuMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuKi9cXG5cXG5bdHlwZT0nc2VhcmNoJ10ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXFxufVxcblxcbi8qXFxuUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcbiovXFxuXFxuOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLypcXG4xLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbjIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4qL1xcblxcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cXG59XFxuXFxuLypcXG5BZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cXG4qL1xcblxcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcbn1cXG5cXG4vKlxcblJlbW92ZXMgdGhlIGRlZmF1bHQgc3BhY2luZyBhbmQgYm9yZGVyIGZvciBhcHByb3ByaWF0ZSBlbGVtZW50cy5cXG4qL1xcblxcbmJsb2NrcXVvdGUsXFxuZGwsXFxuZGQsXFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYsXFxuaHIsXFxuZmlndXJlLFxcbnAsXFxucHJlIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuZmllbGRzZXQge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxubGVnZW5kIHtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbm9sLFxcbnVsLFxcbm1lbnUge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8qXFxuUHJldmVudCByZXNpemluZyB0ZXh0YXJlYXMgaG9yaXpvbnRhbGx5IGJ5IGRlZmF1bHQuXFxuKi9cXG5cXG50ZXh0YXJlYSB7XFxuICByZXNpemU6IHZlcnRpY2FsO1xcbn1cXG5cXG4vKlxcbjEuIFJlc2V0IHRoZSBkZWZhdWx0IHBsYWNlaG9sZGVyIG9wYWNpdHkgaW4gRmlyZWZveC4gKGh0dHBzOi8vZ2l0aHViLmNvbS90YWlsd2luZGxhYnMvdGFpbHdpbmRjc3MvaXNzdWVzLzMzMDApXFxuMi4gU2V0IHRoZSBkZWZhdWx0IHBsYWNlaG9sZGVyIGNvbG9yIHRvIHRoZSB1c2VyJ3MgY29uZmlndXJlZCBncmF5IDQwMCBjb2xvci5cXG4qL1xcblxcbmlucHV0OjotbW96LXBsYWNlaG9sZGVyLCB0ZXh0YXJlYTo6LW1vei1wbGFjZWhvbGRlciB7XFxuICBvcGFjaXR5OiAxOyAvKiAxICovXFxuICBjb2xvcjogIzlDQTNBRjsgLyogMiAqL1xcbn1cXG5cXG5pbnB1dDo6cGxhY2Vob2xkZXIsXFxudGV4dGFyZWE6OnBsYWNlaG9sZGVyIHtcXG4gIG9wYWNpdHk6IDE7IC8qIDEgKi9cXG4gIGNvbG9yOiAjOUNBM0FGOyAvKiAyICovXFxufVxcblxcbi8qXFxuU2V0IHRoZSBkZWZhdWx0IGN1cnNvciBmb3IgYnV0dG9ucy5cXG4qL1xcblxcbmJ1dHRvbixcXG5bcm9sZT1cXFwiYnV0dG9uXFxcIl0ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4vKlxcbk1ha2Ugc3VyZSBkaXNhYmxlZCBidXR0b25zIGRvbid0IGdldCB0aGUgcG9pbnRlciBjdXJzb3IuXFxuKi9cXG46ZGlzYWJsZWQge1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4vKlxcbjEuIE1ha2UgcmVwbGFjZWQgZWxlbWVudHMgYGRpc3BsYXk6IGJsb2NrYCBieSBkZWZhdWx0LiAoaHR0cHM6Ly9naXRodWIuY29tL21vemRldnMvY3NzcmVtZWR5L2lzc3Vlcy8xNClcXG4yLiBBZGQgYHZlcnRpY2FsLWFsaWduOiBtaWRkbGVgIHRvIGFsaWduIHJlcGxhY2VkIGVsZW1lbnRzIG1vcmUgc2Vuc2libHkgYnkgZGVmYXVsdC4gKGh0dHBzOi8vZ2l0aHViLmNvbS9qZW5zaW1tb25zL2Nzc3JlbWVkeS9pc3N1ZXMvMTQjaXNzdWVjb21tZW50LTYzNDkzNDIxMClcXG4gICBUaGlzIGNhbiB0cmlnZ2VyIGEgcG9vcmx5IGNvbnNpZGVyZWQgbGludCBlcnJvciBpbiBzb21lIHRvb2xzIGJ1dCBpcyBpbmNsdWRlZCBieSBkZXNpZ24uXFxuKi9cXG5cXG5pbWcsXFxuc3ZnLFxcbnZpZGVvLFxcbmNhbnZhcyxcXG5hdWRpbyxcXG5pZnJhbWUsXFxuZW1iZWQsXFxub2JqZWN0IHtcXG4gIGRpc3BsYXk6IGJsb2NrOyAvKiAxICovXFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyAvKiAyICovXFxufVxcblxcbi8qXFxuQ29uc3RyYWluIGltYWdlcyBhbmQgdmlkZW9zIHRvIHRoZSBwYXJlbnQgd2lkdGggYW5kIHByZXNlcnZlIHRoZWlyIGludHJpbnNpYyBhc3BlY3QgcmF0aW8uIChodHRwczovL2dpdGh1Yi5jb20vbW96ZGV2cy9jc3NyZW1lZHkvaXNzdWVzLzE0KVxcbiovXFxuXFxuaW1nLFxcbnZpZGVvIHtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyogTWFrZSBlbGVtZW50cyB3aXRoIHRoZSBIVE1MIGhpZGRlbiBhdHRyaWJ1dGUgc3RheSBoaWRkZW4gYnkgZGVmYXVsdCAqL1xcbltoaWRkZW5dIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcblt0eXBlPSd0ZXh0J10sW3R5cGU9J2VtYWlsJ10sW3R5cGU9J3VybCddLFt0eXBlPSdwYXNzd29yZCddLFt0eXBlPSdudW1iZXInXSxbdHlwZT0nZGF0ZSddLFt0eXBlPSdkYXRldGltZS1sb2NhbCddLFt0eXBlPSdtb250aCddLFt0eXBlPSdzZWFyY2gnXSxbdHlwZT0ndGVsJ10sW3R5cGU9J3RpbWUnXSxbdHlwZT0nd2VlayddLFttdWx0aXBsZV0sdGV4dGFyZWEsc2VsZWN0IHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgICAgICAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXItY29sb3I6ICM2QjcyODA7XFxuICBib3JkZXItd2lkdGg6IDFweDtcXG4gIGJvcmRlci1yYWRpdXM6IDBweDtcXG4gIHBhZGRpbmctdG9wOiAwLjVyZW07XFxuICBwYWRkaW5nLXJpZ2h0OiAwLjc1cmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDAuNXJlbTtcXG4gIHBhZGRpbmctbGVmdDogMC43NXJlbTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XFxuICAtLXR3LXNoYWRvdzogMCAwICMwMDAwO1xcbn1cXG5cXG5bdHlwZT0ndGV4dCddOmZvY3VzLCBbdHlwZT0nZW1haWwnXTpmb2N1cywgW3R5cGU9J3VybCddOmZvY3VzLCBbdHlwZT0ncGFzc3dvcmQnXTpmb2N1cywgW3R5cGU9J251bWJlciddOmZvY3VzLCBbdHlwZT0nZGF0ZSddOmZvY3VzLCBbdHlwZT0nZGF0ZXRpbWUtbG9jYWwnXTpmb2N1cywgW3R5cGU9J21vbnRoJ106Zm9jdXMsIFt0eXBlPSdzZWFyY2gnXTpmb2N1cywgW3R5cGU9J3RlbCddOmZvY3VzLCBbdHlwZT0ndGltZSddOmZvY3VzLCBbdHlwZT0nd2VlayddOmZvY3VzLCBbbXVsdGlwbGVdOmZvY3VzLCB0ZXh0YXJlYTpmb2N1cywgc2VsZWN0OmZvY3VzIHtcXG4gIG91dGxpbmU6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIG91dGxpbmUtb2Zmc2V0OiAycHg7XFxuICAtLXR3LXJpbmctaW5zZXQ6IHZhcigtLXR3LWVtcHR5LC8qISovIC8qISovKTtcXG4gIC0tdHctcmluZy1vZmZzZXQtd2lkdGg6IDBweDtcXG4gIC0tdHctcmluZy1vZmZzZXQtY29sb3I6ICNmZmY7XFxuICAtLXR3LXJpbmctY29sb3I6ICMxQzY0RjI7XFxuICAtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdzogdmFyKC0tdHctcmluZy1pbnNldCkgMCAwIDAgdmFyKC0tdHctcmluZy1vZmZzZXQtd2lkdGgpIHZhcigtLXR3LXJpbmctb2Zmc2V0LWNvbG9yKTtcXG4gIC0tdHctcmluZy1zaGFkb3c6IHZhcigtLXR3LXJpbmctaW5zZXQpIDAgMCAwIGNhbGMoMXB4ICsgdmFyKC0tdHctcmluZy1vZmZzZXQtd2lkdGgpKSB2YXIoLS10dy1yaW5nLWNvbG9yKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdyksIHZhcigtLXR3LXJpbmctc2hhZG93KSwgdmFyKC0tdHctc2hhZG93KTtcXG4gIGJvcmRlci1jb2xvcjogIzFDNjRGMjtcXG59XFxuXFxuaW5wdXQ6Oi1tb3otcGxhY2Vob2xkZXIsIHRleHRhcmVhOjotbW96LXBsYWNlaG9sZGVyIHtcXG4gIGNvbG9yOiAjNkI3MjgwO1xcbiAgb3BhY2l0eTogMTtcXG59XFxuXFxuaW5wdXQ6OnBsYWNlaG9sZGVyLHRleHRhcmVhOjpwbGFjZWhvbGRlciB7XFxuICBjb2xvcjogIzZCNzI4MDtcXG4gIG9wYWNpdHk6IDE7XFxufVxcblxcbjo6LXdlYmtpdC1kYXRldGltZS1lZGl0LWZpZWxkcy13cmFwcGVyIHtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbjo6LXdlYmtpdC1kYXRlLWFuZC10aW1lLXZhbHVlIHtcXG4gIG1pbi1oZWlnaHQ6IDEuNWVtO1xcbn1cXG5cXG46Oi13ZWJraXQtZGF0ZXRpbWUtZWRpdCw6Oi13ZWJraXQtZGF0ZXRpbWUtZWRpdC15ZWFyLWZpZWxkLDo6LXdlYmtpdC1kYXRldGltZS1lZGl0LW1vbnRoLWZpZWxkLDo6LXdlYmtpdC1kYXRldGltZS1lZGl0LWRheS1maWVsZCw6Oi13ZWJraXQtZGF0ZXRpbWUtZWRpdC1ob3VyLWZpZWxkLDo6LXdlYmtpdC1kYXRldGltZS1lZGl0LW1pbnV0ZS1maWVsZCw6Oi13ZWJraXQtZGF0ZXRpbWUtZWRpdC1zZWNvbmQtZmllbGQsOjotd2Via2l0LWRhdGV0aW1lLWVkaXQtbWlsbGlzZWNvbmQtZmllbGQsOjotd2Via2l0LWRhdGV0aW1lLWVkaXQtbWVyaWRpZW0tZmllbGQge1xcbiAgcGFkZGluZy10b3A6IDA7XFxuICBwYWRkaW5nLWJvdHRvbTogMDtcXG59XFxuXFxuc2VsZWN0IHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sLCUzY3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGZpbGw9J25vbmUnIHZpZXdCb3g9JzAgMCAyMCAyMCclM2UlM2NwYXRoIHN0cm9rZT0nJTIzNkI3MjgwJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMS41JyBkPSdNNiA4bDQgNCA0LTQnLyUzZSUzYy9zdmclM2VcXFwiKTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IDAuNXJlbSBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxLjVlbSAxLjVlbTtcXG4gIHBhZGRpbmctcmlnaHQ6IDIuNXJlbTtcXG4gIC13ZWJraXQtcHJpbnQtY29sb3ItYWRqdXN0OiBleGFjdDtcXG4gICAgICAgICAgY29sb3ItYWRqdXN0OiBleGFjdDtcXG59XFxuXFxuW211bHRpcGxlXSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBpbml0aWFsO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogaW5pdGlhbDtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiB1bnNldDtcXG4gIGJhY2tncm91bmQtc2l6ZTogaW5pdGlhbDtcXG4gIHBhZGRpbmctcmlnaHQ6IDAuNzVyZW07XFxuICAtd2Via2l0LXByaW50LWNvbG9yLWFkanVzdDogdW5zZXQ7XFxuICAgICAgICAgIGNvbG9yLWFkanVzdDogdW5zZXQ7XFxufVxcblxcblt0eXBlPSdjaGVja2JveCddLFt0eXBlPSdyYWRpbyddIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgICAgICAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIHBhZGRpbmc6IDA7XFxuICAtd2Via2l0LXByaW50LWNvbG9yLWFkanVzdDogZXhhY3Q7XFxuICAgICAgICAgIGNvbG9yLWFkanVzdDogZXhhY3Q7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgYmFja2dyb3VuZC1vcmlnaW46IGJvcmRlci1ib3g7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICBmbGV4LXNocmluazogMDtcXG4gIGhlaWdodDogMXJlbTtcXG4gIHdpZHRoOiAxcmVtO1xcbiAgY29sb3I6ICMxQzY0RjI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyLWNvbG9yOiAjNkI3MjgwO1xcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XFxuICAtLXR3LXNoYWRvdzogMCAwICMwMDAwO1xcbn1cXG5cXG5bdHlwZT0nY2hlY2tib3gnXSB7XFxuICBib3JkZXItcmFkaXVzOiAwcHg7XFxufVxcblxcblt0eXBlPSdyYWRpbyddIHtcXG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxufVxcblxcblt0eXBlPSdjaGVja2JveCddOmZvY3VzLFt0eXBlPSdyYWRpbyddOmZvY3VzIHtcXG4gIG91dGxpbmU6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIG91dGxpbmUtb2Zmc2V0OiAycHg7XFxuICAtLXR3LXJpbmctaW5zZXQ6IHZhcigtLXR3LWVtcHR5LC8qISovIC8qISovKTtcXG4gIC0tdHctcmluZy1vZmZzZXQtd2lkdGg6IDJweDtcXG4gIC0tdHctcmluZy1vZmZzZXQtY29sb3I6ICNmZmY7XFxuICAtLXR3LXJpbmctY29sb3I6ICMxQzY0RjI7XFxuICAtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdzogdmFyKC0tdHctcmluZy1pbnNldCkgMCAwIDAgdmFyKC0tdHctcmluZy1vZmZzZXQtd2lkdGgpIHZhcigtLXR3LXJpbmctb2Zmc2V0LWNvbG9yKTtcXG4gIC0tdHctcmluZy1zaGFkb3c6IHZhcigtLXR3LXJpbmctaW5zZXQpIDAgMCAwIGNhbGMoMnB4ICsgdmFyKC0tdHctcmluZy1vZmZzZXQtd2lkdGgpKSB2YXIoLS10dy1yaW5nLWNvbG9yKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdyksIHZhcigtLXR3LXJpbmctc2hhZG93KSwgdmFyKC0tdHctc2hhZG93KTtcXG59XFxuXFxuW3R5cGU9J2NoZWNrYm94J106Y2hlY2tlZCxbdHlwZT0ncmFkaW8nXTpjaGVja2VkIHtcXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBjdXJyZW50Q29sb3I7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxufVxcblxcblt0eXBlPSdjaGVja2JveCddOmNoZWNrZWQge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNjc3ZnIHZpZXdCb3g9JzAgMCAxNiAxNicgZmlsbD0nd2hpdGUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyclM2UlM2NwYXRoIGQ9J00xMi4yMDcgNC43OTNhMSAxIDAgMDEwIDEuNDE0bC01IDVhMSAxIDAgMDEtMS40MTQgMGwtMi0yYTEgMSAwIDAxMS40MTQtMS40MTRMNi41IDkuMDg2bDQuMjkzLTQuMjkzYTEgMSAwIDAxMS40MTQgMHonLyUzZSUzYy9zdmclM2VcXFwiKTtcXG59XFxuXFxuW3R5cGU9J3JhZGlvJ106Y2hlY2tlZCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM2Nzdmcgdmlld0JveD0nMCAwIDE2IDE2JyBmaWxsPSd3aGl0ZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyUzZSUzY2NpcmNsZSBjeD0nOCcgY3k9JzgnIHI9JzMnLyUzZSUzYy9zdmclM2VcXFwiKTtcXG59XFxuXFxuW3R5cGU9J2NoZWNrYm94J106Y2hlY2tlZDpob3ZlcixbdHlwZT0nY2hlY2tib3gnXTpjaGVja2VkOmZvY3VzLFt0eXBlPSdyYWRpbyddOmNoZWNrZWQ6aG92ZXIsW3R5cGU9J3JhZGlvJ106Y2hlY2tlZDpmb2N1cyB7XFxuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogY3VycmVudENvbG9yO1xcbn1cXG5cXG5bdHlwZT0nY2hlY2tib3gnXTppbmRldGVybWluYXRlIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sLCUzY3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGZpbGw9J25vbmUnIHZpZXdCb3g9JzAgMCAxNiAxNiclM2UlM2NwYXRoIHN0cm9rZT0nd2hpdGUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgc3Ryb2tlLXdpZHRoPScyJyBkPSdNNCA4aDgnLyUzZSUzYy9zdmclM2VcXFwiKTtcXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBjdXJyZW50Q29sb3I7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxufVxcblxcblt0eXBlPSdjaGVja2JveCddOmluZGV0ZXJtaW5hdGU6aG92ZXIsW3R5cGU9J2NoZWNrYm94J106aW5kZXRlcm1pbmF0ZTpmb2N1cyB7XFxuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogY3VycmVudENvbG9yO1xcbn1cXG5cXG5bdHlwZT0nZmlsZSddIHtcXG4gIGJhY2tncm91bmQ6IHVuc2V0O1xcbiAgYm9yZGVyLWNvbG9yOiBpbmhlcml0O1xcbiAgYm9yZGVyLXdpZHRoOiAwO1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBmb250LXNpemU6IHVuc2V0O1xcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XFxufVxcblxcblt0eXBlPSdmaWxlJ106Zm9jdXMge1xcbiAgb3V0bGluZTogMXB4IGF1dG8gLXdlYmtpdC1mb2N1cy1yaW5nLWNvbG9yO1xcbn1cXG5cXG5bdHlwZT0ndGV4dCddLFt0eXBlPSdlbWFpbCddLFt0eXBlPSd1cmwnXSxbdHlwZT0ncGFzc3dvcmQnXSxbdHlwZT0nbnVtYmVyJ10sW3R5cGU9J2RhdGUnXSxbdHlwZT0nZGF0ZXRpbWUtbG9jYWwnXSxbdHlwZT0nbW9udGgnXSxbdHlwZT0nc2VhcmNoJ10sW3R5cGU9J3RlbCddLFt0eXBlPSd0aW1lJ10sW3R5cGU9J3dlZWsnXSxbbXVsdGlwbGVdLHRleHRhcmVhLHNlbGVjdCB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XFxuICAgICAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyLWNvbG9yOiAjNkI3MjgwO1xcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XFxuICBib3JkZXItcmFkaXVzOiAwcHg7XFxuICBwYWRkaW5nLXRvcDogMC41cmVtO1xcbiAgcGFkZGluZy1yaWdodDogMC43NXJlbTtcXG4gIHBhZGRpbmctYm90dG9tOiAwLjVyZW07XFxuICBwYWRkaW5nLWxlZnQ6IDAuNzVyZW07XFxuICBmb250LXNpemU6IDFyZW07XFxuICBsaW5lLWhlaWdodDogMS41cmVtO1xcbiAgLS10dy1zaGFkb3c6IDAgMCAjMDAwMDtcXG59XFxuXFxuW3R5cGU9J3RleHQnXTpmb2N1cywgW3R5cGU9J2VtYWlsJ106Zm9jdXMsIFt0eXBlPSd1cmwnXTpmb2N1cywgW3R5cGU9J3Bhc3N3b3JkJ106Zm9jdXMsIFt0eXBlPSdudW1iZXInXTpmb2N1cywgW3R5cGU9J2RhdGUnXTpmb2N1cywgW3R5cGU9J2RhdGV0aW1lLWxvY2FsJ106Zm9jdXMsIFt0eXBlPSdtb250aCddOmZvY3VzLCBbdHlwZT0nc2VhcmNoJ106Zm9jdXMsIFt0eXBlPSd0ZWwnXTpmb2N1cywgW3R5cGU9J3RpbWUnXTpmb2N1cywgW3R5cGU9J3dlZWsnXTpmb2N1cywgW211bHRpcGxlXTpmb2N1cywgdGV4dGFyZWE6Zm9jdXMsIHNlbGVjdDpmb2N1cyB7XFxuICBvdXRsaW5lOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICBvdXRsaW5lLW9mZnNldDogMnB4O1xcbiAgLS10dy1yaW5nLWluc2V0OiB2YXIoLS10dy1lbXB0eSwvKiEqLyAvKiEqLyk7XFxuICAtLXR3LXJpbmctb2Zmc2V0LXdpZHRoOiAwcHg7XFxuICAtLXR3LXJpbmctb2Zmc2V0LWNvbG9yOiAjZmZmO1xcbiAgLS10dy1yaW5nLWNvbG9yOiAjMUM2NEYyO1xcbiAgLS10dy1yaW5nLW9mZnNldC1zaGFkb3c6IHZhcigtLXR3LXJpbmctaW5zZXQpIDAgMCAwIHZhcigtLXR3LXJpbmctb2Zmc2V0LXdpZHRoKSB2YXIoLS10dy1yaW5nLW9mZnNldC1jb2xvcik7XFxuICAtLXR3LXJpbmctc2hhZG93OiB2YXIoLS10dy1yaW5nLWluc2V0KSAwIDAgMCBjYWxjKDFweCArIHZhcigtLXR3LXJpbmctb2Zmc2V0LXdpZHRoKSkgdmFyKC0tdHctcmluZy1jb2xvcik7XFxuICBib3gtc2hhZG93OiB2YXIoLS10dy1yaW5nLW9mZnNldC1zaGFkb3cpLCB2YXIoLS10dy1yaW5nLXNoYWRvdyksIHZhcigtLXR3LXNoYWRvdyk7XFxuICBib3JkZXItY29sb3I6ICMxQzY0RjI7XFxufVxcblxcbmlucHV0OjotbW96LXBsYWNlaG9sZGVyLCB0ZXh0YXJlYTo6LW1vei1wbGFjZWhvbGRlciB7XFxuICBjb2xvcjogIzZCNzI4MDtcXG4gIG9wYWNpdHk6IDE7XFxufVxcblxcbmlucHV0OjpwbGFjZWhvbGRlcix0ZXh0YXJlYTo6cGxhY2Vob2xkZXIge1xcbiAgY29sb3I6ICM2QjcyODA7XFxuICBvcGFjaXR5OiAxO1xcbn1cXG5cXG46Oi13ZWJraXQtZGF0ZXRpbWUtZWRpdC1maWVsZHMtd3JhcHBlciB7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG46Oi13ZWJraXQtZGF0ZS1hbmQtdGltZS12YWx1ZSB7XFxuICBtaW4taGVpZ2h0OiAxLjVlbTtcXG59XFxuXFxuc2VsZWN0IHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sLCUzY3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGZpbGw9J25vbmUnIHZpZXdCb3g9JzAgMCAyMCAyMCclM2UlM2NwYXRoIHN0cm9rZT0nJTIzNkI3MjgwJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMS41JyBkPSdNNiA4bDQgNCA0LTQnLyUzZSUzYy9zdmclM2VcXFwiKTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IDAuNXJlbSBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxLjVlbSAxLjVlbTtcXG4gIHBhZGRpbmctcmlnaHQ6IDIuNXJlbTtcXG4gIHByaW50LWNvbG9yLWFkanVzdDogZXhhY3Q7XFxufVxcblxcblttdWx0aXBsZV0ge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogaW5pdGlhbDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGluaXRpYWw7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogdW5zZXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGluaXRpYWw7XFxuICBwYWRkaW5nLXJpZ2h0OiAwLjc1cmVtO1xcbiAgcHJpbnQtY29sb3ItYWRqdXN0OiB1bnNldDtcXG59XFxuXFxuW3R5cGU9J2NoZWNrYm94J10sW3R5cGU9J3JhZGlvJ10ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xcbiAgICAgICAgICBhcHBlYXJhbmNlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG4gIHByaW50LWNvbG9yLWFkanVzdDogZXhhY3Q7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgYmFja2dyb3VuZC1vcmlnaW46IGJvcmRlci1ib3g7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICBmbGV4LXNocmluazogMDtcXG4gIGhlaWdodDogMXJlbTtcXG4gIHdpZHRoOiAxcmVtO1xcbiAgY29sb3I6ICMxQzY0RjI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyLWNvbG9yOiAjNkI3MjgwO1xcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XFxuICAtLXR3LXNoYWRvdzogMCAwICMwMDAwO1xcbn1cXG5cXG5bdHlwZT0nY2hlY2tib3gnXSB7XFxuICBib3JkZXItcmFkaXVzOiAwcHg7XFxufVxcblxcblt0eXBlPSdyYWRpbyddIHtcXG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxufVxcblxcblt0eXBlPSdjaGVja2JveCddOmZvY3VzLFt0eXBlPSdyYWRpbyddOmZvY3VzIHtcXG4gIG91dGxpbmU6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIG91dGxpbmUtb2Zmc2V0OiAycHg7XFxuICAtLXR3LXJpbmctaW5zZXQ6IHZhcigtLXR3LWVtcHR5LC8qISovIC8qISovKTtcXG4gIC0tdHctcmluZy1vZmZzZXQtd2lkdGg6IDJweDtcXG4gIC0tdHctcmluZy1vZmZzZXQtY29sb3I6ICNmZmY7XFxuICAtLXR3LXJpbmctY29sb3I6ICMxQzY0RjI7XFxuICAtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdzogdmFyKC0tdHctcmluZy1pbnNldCkgMCAwIDAgdmFyKC0tdHctcmluZy1vZmZzZXQtd2lkdGgpIHZhcigtLXR3LXJpbmctb2Zmc2V0LWNvbG9yKTtcXG4gIC0tdHctcmluZy1zaGFkb3c6IHZhcigtLXR3LXJpbmctaW5zZXQpIDAgMCAwIGNhbGMoMnB4ICsgdmFyKC0tdHctcmluZy1vZmZzZXQtd2lkdGgpKSB2YXIoLS10dy1yaW5nLWNvbG9yKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdyksIHZhcigtLXR3LXJpbmctc2hhZG93KSwgdmFyKC0tdHctc2hhZG93KTtcXG59XFxuXFxuW3R5cGU9J2NoZWNrYm94J106Y2hlY2tlZCxbdHlwZT0ncmFkaW8nXTpjaGVja2VkLC5kYXJrIFt0eXBlPSdjaGVja2JveCddOmNoZWNrZWQsLmRhcmsgW3R5cGU9J3JhZGlvJ106Y2hlY2tlZCB7XFxuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogY3VycmVudENvbG9yO1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDEwMCU7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbn1cXG5cXG5bdHlwZT0nY2hlY2tib3gnXTpjaGVja2VkIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sLCUzY3N2ZyB2aWV3Qm94PScwIDAgMTYgMTYnIGZpbGw9J3doaXRlJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnJTNlJTNjcGF0aCBkPSdNMTIuMjA3IDQuNzkzYTEgMSAwIDAxMCAxLjQxNGwtNSA1YTEgMSAwIDAxLTEuNDE0IDBsLTItMmExIDEgMCAwMTEuNDE0LTEuNDE0TDYuNSA5LjA4Nmw0LjI5My00LjI5M2ExIDEgMCAwMTEuNDE0IDB6Jy8lM2UlM2Mvc3ZnJTNlXFxcIik7XFxufVxcblxcblt0eXBlPSdyYWRpbyddOmNoZWNrZWQge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNjc3ZnIHZpZXdCb3g9JzAgMCAxNiAxNicgZmlsbD0nd2hpdGUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyclM2UlM2NjaXJjbGUgY3g9JzgnIGN5PSc4JyByPSczJy8lM2UlM2Mvc3ZnJTNlXFxcIik7XFxufVxcblxcblt0eXBlPSdjaGVja2JveCddOmluZGV0ZXJtaW5hdGUge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNjc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgZmlsbD0nbm9uZScgdmlld0JveD0nMCAwIDE2IDE2JyUzZSUzY3BhdGggc3Ryb2tlPSd3aGl0ZScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBzdHJva2Utd2lkdGg9JzInIGQ9J000IDhoOCcvJTNlJTNjL3N2ZyUzZVxcXCIpO1xcbiAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGN1cnJlbnRDb2xvcjtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG59XFxuXFxuW3R5cGU9J2NoZWNrYm94J106aW5kZXRlcm1pbmF0ZTpob3ZlcixbdHlwZT0nY2hlY2tib3gnXTppbmRldGVybWluYXRlOmZvY3VzIHtcXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBjdXJyZW50Q29sb3I7XFxufVxcblxcblt0eXBlPSdmaWxlJ10ge1xcbiAgYmFja2dyb3VuZDogdW5zZXQ7XFxuICBib3JkZXItY29sb3I6IGluaGVyaXQ7XFxuICBib3JkZXItd2lkdGg6IDA7XFxuICBib3JkZXItcmFkaXVzOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGZvbnQtc2l6ZTogdW5zZXQ7XFxuICBsaW5lLWhlaWdodDogaW5oZXJpdDtcXG59XFxuXFxuW3R5cGU9J2ZpbGUnXTpmb2N1cyB7XFxuICBvdXRsaW5lOiAxcHggYXV0byBpbmhlcml0O1xcbn1cXG5cXG5pbnB1dFt0eXBlPWZpbGVdOjpmaWxlLXNlbGVjdG9yLWJ1dHRvbiB7XFxuICBjb2xvcjogd2hpdGU7XFxuICBiYWNrZ3JvdW5kOiAjMUYyOTM3O1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBwYWRkaW5nLXRvcDogMC42MjVyZW07XFxuICBwYWRkaW5nLWJvdHRvbTogMC42MjVyZW07XFxuICBwYWRkaW5nLWxlZnQ6IDJyZW07XFxuICBwYWRkaW5nLXJpZ2h0OiAxcmVtO1xcbiAgLXdlYmtpdC1tYXJnaW4tc3RhcnQ6IC0xcmVtO1xcbiAgICAgICAgICBtYXJnaW4taW5saW5lLXN0YXJ0OiAtMXJlbTtcXG4gIC13ZWJraXQtbWFyZ2luLWVuZDogMXJlbTtcXG4gICAgICAgICAgbWFyZ2luLWlubGluZS1lbmQ6IDFyZW07XFxufVxcblxcbmlucHV0W3R5cGU9ZmlsZV06OmZpbGUtc2VsZWN0b3ItYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6ICMzNzQxNTE7XFxufVxcblxcbi5kYXJrIGlucHV0W3R5cGU9ZmlsZV06OmZpbGUtc2VsZWN0b3ItYnV0dG9uIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGJhY2tncm91bmQ6ICM0QjU1NjM7XFxufVxcblxcbi5kYXJrIGlucHV0W3R5cGU9ZmlsZV06OmZpbGUtc2VsZWN0b3ItYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6ICM2QjcyODA7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInJhbmdlXFxcIl06Oi13ZWJraXQtc2xpZGVyLXRodW1iIHtcXG4gIGhlaWdodDogMS4yNXJlbTtcXG4gIHdpZHRoOiAxLjI1cmVtO1xcbiAgYmFja2dyb3VuZDogIzFDNjRGMjtcXG4gIGJvcmRlci1yYWRpdXM6IDk5OTlweDtcXG4gIGJvcmRlcjogMDtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInJhbmdlXFxcIl06ZGlzYWJsZWQ6Oi13ZWJraXQtc2xpZGVyLXRodW1iIHtcXG4gIGJhY2tncm91bmQ6ICM5Q0EzQUY7XFxufVxcblxcbi5kYXJrIGlucHV0W3R5cGU9XFxcInJhbmdlXFxcIl06ZGlzYWJsZWQ6Oi13ZWJraXQtc2xpZGVyLXRodW1iIHtcXG4gIGJhY2tncm91bmQ6ICM2QjcyODA7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInJhbmdlXFxcIl06Zm9jdXM6Oi13ZWJraXQtc2xpZGVyLXRodW1iIHtcXG4gIG91dGxpbmU6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIG91dGxpbmUtb2Zmc2V0OiAycHg7XFxuICAtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdzogdmFyKC0tdHctcmluZy1pbnNldCkgMCAwIDAgdmFyKC0tdHctcmluZy1vZmZzZXQtd2lkdGgpIHZhcigtLXR3LXJpbmctb2Zmc2V0LWNvbG9yKTtcXG4gIC0tdHctcmluZy1zaGFkb3c6IHZhcigtLXR3LXJpbmctaW5zZXQpIDAgMCAwIGNhbGMoNHB4ICsgdmFyKC0tdHctcmluZy1vZmZzZXQtd2lkdGgpKSB2YXIoLS10dy1yaW5nLWNvbG9yKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdyksIHZhcigtLXR3LXJpbmctc2hhZG93KSwgdmFyKC0tdHctc2hhZG93LCAwIDAgIzAwMDApO1xcbiAgLS10dy1yaW5nLW9wYWNpdHk6IDFweDtcXG4gIC0tdHctcmluZy1jb2xvcjogcmdiKDE2NCAyMDIgMjU0IC8gdmFyKC0tdHctcmluZy1vcGFjaXR5KSk7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInJhbmdlXFxcIl06Oi1tb3otcmFuZ2UtdGh1bWIge1xcbiAgaGVpZ2h0OiAxLjI1cmVtO1xcbiAgd2lkdGg6IDEuMjVyZW07XFxuICBiYWNrZ3JvdW5kOiAjMUM2NEYyO1xcbiAgYm9yZGVyLXJhZGl1czogOTk5OXB4O1xcbiAgYm9yZGVyOiAwO1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwicmFuZ2VcXFwiXTpkaXNhYmxlZDo6LW1vei1yYW5nZS10aHVtYiB7XFxuICBiYWNrZ3JvdW5kOiAjOUNBM0FGO1xcbn1cXG5cXG4uZGFyayBpbnB1dFt0eXBlPVxcXCJyYW5nZVxcXCJdOmRpc2FibGVkOjotbW96LXJhbmdlLXRodW1iIHtcXG4gIGJhY2tncm91bmQ6ICM2QjcyODA7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInJhbmdlXFxcIl06Oi1tb3otcmFuZ2UtcHJvZ3Jlc3Mge1xcbiAgYmFja2dyb3VuZDogIzNGODNGODtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwicmFuZ2VcXFwiXTo6LW1zLWZpbGwtbG93ZXIge1xcbiAgYmFja2dyb3VuZDogIzNGODNGODtcXG59XFxuXFxuW2RhdGEtcG9wcGVyLWFycm93XSxbZGF0YS1wb3BwZXItYXJyb3ddOmJlZm9yZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogOHB4O1xcbiAgaGVpZ2h0OiA4cHg7XFxuICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xcbn1cXG5cXG5bZGF0YS1wb3BwZXItYXJyb3ddIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuW2RhdGEtcG9wcGVyLWFycm93XTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xcbn1cXG5cXG5bZGF0YS1wb3BwZXItYXJyb3ddOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiA5cHg7XFxuICBoZWlnaHQ6IDlweDtcXG4gIGJhY2tncm91bmQ6IGluaGVyaXQ7XFxufVxcblxcbltyb2xlPVxcXCJ0b29sdGlwXFxcIl0gPiBbZGF0YS1wb3BwZXItYXJyb3ddOmJlZm9yZSB7XFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLWNvbG9yOiAjZTVlN2ViO1xcbn1cXG5cXG4uZGFyayBbcm9sZT1cXFwidG9vbHRpcFxcXCJdID4gW2RhdGEtcG9wcGVyLWFycm93XTpiZWZvcmUge1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci1jb2xvcjogIzRiNTU2MztcXG59XFxuXFxuW3JvbGU9XFxcInRvb2x0aXBcXFwiXSA+IFtkYXRhLXBvcHBlci1hcnJvd106YWZ0ZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci1jb2xvcjogI2U1ZTdlYjtcXG59XFxuXFxuLmRhcmsgW3JvbGU9XFxcInRvb2x0aXBcXFwiXSA+IFtkYXRhLXBvcHBlci1hcnJvd106YWZ0ZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci1jb2xvcjogIzRiNTU2MztcXG59XFxuXFxuW2RhdGEtcG9wb3Zlcl1bcm9sZT1cXFwidG9vbHRpcFxcXCJdW2RhdGEtcG9wcGVyLXBsYWNlbWVudF49J3RvcCddID4gW2RhdGEtcG9wcGVyLWFycm93XTpiZWZvcmUge1xcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMXB4O1xcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAxcHg7XFxufVxcblxcbltkYXRhLXBvcG92ZXJdW3JvbGU9XFxcInRvb2x0aXBcXFwiXVtkYXRhLXBvcHBlci1wbGFjZW1lbnRePSd0b3AnXSA+IFtkYXRhLXBvcHBlci1hcnJvd106YWZ0ZXIge1xcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMXB4O1xcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAxcHg7XFxufVxcblxcbltkYXRhLXBvcG92ZXJdW3JvbGU9XFxcInRvb2x0aXBcXFwiXVtkYXRhLXBvcHBlci1wbGFjZW1lbnRePSdyaWdodCddID4gW2RhdGEtcG9wcGVyLWFycm93XTpiZWZvcmUge1xcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMXB4O1xcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDFweDtcXG59XFxuXFxuW2RhdGEtcG9wb3Zlcl1bcm9sZT1cXFwidG9vbHRpcFxcXCJdW2RhdGEtcG9wcGVyLXBsYWNlbWVudF49J3JpZ2h0J10gPiBbZGF0YS1wb3BwZXItYXJyb3ddOmFmdGVyIHtcXG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDFweDtcXG4gIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7XFxufVxcblxcbltkYXRhLXBvcG92ZXJdW3JvbGU9XFxcInRvb2x0aXBcXFwiXVtkYXRhLXBvcHBlci1wbGFjZW1lbnRePSdib3R0b20nXSA+IFtkYXRhLXBvcHBlci1hcnJvd106YmVmb3JlIHtcXG4gIGJvcmRlci10b3Atd2lkdGg6IDFweDtcXG4gIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7XFxufVxcblxcbltkYXRhLXBvcG92ZXJdW3JvbGU9XFxcInRvb2x0aXBcXFwiXVtkYXRhLXBvcHBlci1wbGFjZW1lbnRePSdib3R0b20nXSA+IFtkYXRhLXBvcHBlci1hcnJvd106YWZ0ZXIge1xcbiAgYm9yZGVyLXRvcC13aWR0aDogMXB4O1xcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDFweDtcXG59XFxuXFxuW2RhdGEtcG9wb3Zlcl1bcm9sZT1cXFwidG9vbHRpcFxcXCJdW2RhdGEtcG9wcGVyLXBsYWNlbWVudF49J2xlZnQnXSA+IFtkYXRhLXBvcHBlci1hcnJvd106YmVmb3JlIHtcXG4gIGJvcmRlci10b3Atd2lkdGg6IDFweDtcXG4gIGJvcmRlci1yaWdodC13aWR0aDogMXB4O1xcbn1cXG5cXG5bZGF0YS1wb3BvdmVyXVtyb2xlPVxcXCJ0b29sdGlwXFxcIl1bZGF0YS1wb3BwZXItcGxhY2VtZW50Xj0nbGVmdCddID4gW2RhdGEtcG9wcGVyLWFycm93XTphZnRlciB7XFxuICBib3JkZXItdG9wLXdpZHRoOiAxcHg7XFxuICBib3JkZXItcmlnaHQtd2lkdGg6IDFweDtcXG59XFxuXFxuW2RhdGEtcG9wb3Zlcl1bcm9sZT1cXFwidG9vbHRpcFxcXCJdW2RhdGEtcG9wcGVyLXBsYWNlbWVudF49J3RvcCddID4gW2RhdGEtcG9wcGVyLWFycm93XSB7XFxuICBib3R0b206IC01cHg7XFxufVxcblxcbltkYXRhLXBvcG92ZXJdW3JvbGU9XFxcInRvb2x0aXBcXFwiXVtkYXRhLXBvcHBlci1wbGFjZW1lbnRePSdib3R0b20nXSA+IFtkYXRhLXBvcHBlci1hcnJvd10ge1xcbiAgdG9wOiAtNXB4O1xcbn1cXG5cXG5bZGF0YS1wb3BvdmVyXVtyb2xlPVxcXCJ0b29sdGlwXFxcIl1bZGF0YS1wb3BwZXItcGxhY2VtZW50Xj0nbGVmdCddID4gW2RhdGEtcG9wcGVyLWFycm93XSB7XFxuICByaWdodDogLTVweDtcXG59XFxuXFxuW2RhdGEtcG9wb3Zlcl1bcm9sZT1cXFwidG9vbHRpcFxcXCJdW2RhdGEtcG9wcGVyLXBsYWNlbWVudF49J3JpZ2h0J10gPiBbZGF0YS1wb3BwZXItYXJyb3ddIHtcXG4gIGxlZnQ6IC01cHg7XFxufVxcblxcbiosIDo6YmVmb3JlLCA6OmFmdGVyIHtcXG4gIC0tdHctYm9yZGVyLXNwYWNpbmcteDogMDtcXG4gIC0tdHctYm9yZGVyLXNwYWNpbmcteTogMDtcXG4gIC0tdHctdHJhbnNsYXRlLXg6IDA7XFxuICAtLXR3LXRyYW5zbGF0ZS15OiAwO1xcbiAgLS10dy1yb3RhdGU6IDA7XFxuICAtLXR3LXNrZXcteDogMDtcXG4gIC0tdHctc2tldy15OiAwO1xcbiAgLS10dy1zY2FsZS14OiAxO1xcbiAgLS10dy1zY2FsZS15OiAxO1xcbiAgLS10dy1wYW4teDogIDtcXG4gIC0tdHctcGFuLXk6ICA7XFxuICAtLXR3LXBpbmNoLXpvb206ICA7XFxuICAtLXR3LXNjcm9sbC1zbmFwLXN0cmljdG5lc3M6IHByb3hpbWl0eTtcXG4gIC0tdHctb3JkaW5hbDogIDtcXG4gIC0tdHctc2xhc2hlZC16ZXJvOiAgO1xcbiAgLS10dy1udW1lcmljLWZpZ3VyZTogIDtcXG4gIC0tdHctbnVtZXJpYy1zcGFjaW5nOiAgO1xcbiAgLS10dy1udW1lcmljLWZyYWN0aW9uOiAgO1xcbiAgLS10dy1yaW5nLWluc2V0OiAgO1xcbiAgLS10dy1yaW5nLW9mZnNldC13aWR0aDogMHB4O1xcbiAgLS10dy1yaW5nLW9mZnNldC1jb2xvcjogI2ZmZjtcXG4gIC0tdHctcmluZy1jb2xvcjogcmdiKDYzIDEzMSAyNDggLyAwLjUpO1xcbiAgLS10dy1yaW5nLW9mZnNldC1zaGFkb3c6IDAgMCAjMDAwMDtcXG4gIC0tdHctcmluZy1zaGFkb3c6IDAgMCAjMDAwMDtcXG4gIC0tdHctc2hhZG93OiAwIDAgIzAwMDA7XFxuICAtLXR3LXNoYWRvdy1jb2xvcmVkOiAwIDAgIzAwMDA7XFxuICAtLXR3LWJsdXI6ICA7XFxuICAtLXR3LWJyaWdodG5lc3M6ICA7XFxuICAtLXR3LWNvbnRyYXN0OiAgO1xcbiAgLS10dy1ncmF5c2NhbGU6ICA7XFxuICAtLXR3LWh1ZS1yb3RhdGU6ICA7XFxuICAtLXR3LWludmVydDogIDtcXG4gIC0tdHctc2F0dXJhdGU6ICA7XFxuICAtLXR3LXNlcGlhOiAgO1xcbiAgLS10dy1kcm9wLXNoYWRvdzogIDtcXG4gIC0tdHctYmFja2Ryb3AtYmx1cjogIDtcXG4gIC0tdHctYmFja2Ryb3AtYnJpZ2h0bmVzczogIDtcXG4gIC0tdHctYmFja2Ryb3AtY29udHJhc3Q6ICA7XFxuICAtLXR3LWJhY2tkcm9wLWdyYXlzY2FsZTogIDtcXG4gIC0tdHctYmFja2Ryb3AtaHVlLXJvdGF0ZTogIDtcXG4gIC0tdHctYmFja2Ryb3AtaW52ZXJ0OiAgO1xcbiAgLS10dy1iYWNrZHJvcC1vcGFjaXR5OiAgO1xcbiAgLS10dy1iYWNrZHJvcC1zYXR1cmF0ZTogIDtcXG4gIC0tdHctYmFja2Ryb3Atc2VwaWE6ICA7XFxufVxcblxcbjo6YmFja2Ryb3Age1xcbiAgLS10dy1ib3JkZXItc3BhY2luZy14OiAwO1xcbiAgLS10dy1ib3JkZXItc3BhY2luZy15OiAwO1xcbiAgLS10dy10cmFuc2xhdGUteDogMDtcXG4gIC0tdHctdHJhbnNsYXRlLXk6IDA7XFxuICAtLXR3LXJvdGF0ZTogMDtcXG4gIC0tdHctc2tldy14OiAwO1xcbiAgLS10dy1za2V3LXk6IDA7XFxuICAtLXR3LXNjYWxlLXg6IDE7XFxuICAtLXR3LXNjYWxlLXk6IDE7XFxuICAtLXR3LXBhbi14OiAgO1xcbiAgLS10dy1wYW4teTogIDtcXG4gIC0tdHctcGluY2gtem9vbTogIDtcXG4gIC0tdHctc2Nyb2xsLXNuYXAtc3RyaWN0bmVzczogcHJveGltaXR5O1xcbiAgLS10dy1vcmRpbmFsOiAgO1xcbiAgLS10dy1zbGFzaGVkLXplcm86ICA7XFxuICAtLXR3LW51bWVyaWMtZmlndXJlOiAgO1xcbiAgLS10dy1udW1lcmljLXNwYWNpbmc6ICA7XFxuICAtLXR3LW51bWVyaWMtZnJhY3Rpb246ICA7XFxuICAtLXR3LXJpbmctaW5zZXQ6ICA7XFxuICAtLXR3LXJpbmctb2Zmc2V0LXdpZHRoOiAwcHg7XFxuICAtLXR3LXJpbmctb2Zmc2V0LWNvbG9yOiAjZmZmO1xcbiAgLS10dy1yaW5nLWNvbG9yOiByZ2IoNjMgMTMxIDI0OCAvIDAuNSk7XFxuICAtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdzogMCAwICMwMDAwO1xcbiAgLS10dy1yaW5nLXNoYWRvdzogMCAwICMwMDAwO1xcbiAgLS10dy1zaGFkb3c6IDAgMCAjMDAwMDtcXG4gIC0tdHctc2hhZG93LWNvbG9yZWQ6IDAgMCAjMDAwMDtcXG4gIC0tdHctYmx1cjogIDtcXG4gIC0tdHctYnJpZ2h0bmVzczogIDtcXG4gIC0tdHctY29udHJhc3Q6ICA7XFxuICAtLXR3LWdyYXlzY2FsZTogIDtcXG4gIC0tdHctaHVlLXJvdGF0ZTogIDtcXG4gIC0tdHctaW52ZXJ0OiAgO1xcbiAgLS10dy1zYXR1cmF0ZTogIDtcXG4gIC0tdHctc2VwaWE6ICA7XFxuICAtLXR3LWRyb3Atc2hhZG93OiAgO1xcbiAgLS10dy1iYWNrZHJvcC1ibHVyOiAgO1xcbiAgLS10dy1iYWNrZHJvcC1icmlnaHRuZXNzOiAgO1xcbiAgLS10dy1iYWNrZHJvcC1jb250cmFzdDogIDtcXG4gIC0tdHctYmFja2Ryb3AtZ3JheXNjYWxlOiAgO1xcbiAgLS10dy1iYWNrZHJvcC1odWUtcm90YXRlOiAgO1xcbiAgLS10dy1iYWNrZHJvcC1pbnZlcnQ6ICA7XFxuICAtLXR3LWJhY2tkcm9wLW9wYWNpdHk6ICA7XFxuICAtLXR3LWJhY2tkcm9wLXNhdHVyYXRlOiAgO1xcbiAgLS10dy1iYWNrZHJvcC1zZXBpYTogIDtcXG59XFxuLmNvbnRhaW5lciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogMzYwcHgpIHtcXG5cXG4gIC5jb250YWluZXIge1xcbiAgICBtYXgtd2lkdGg6IDM2MHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNDc1cHgpIHtcXG5cXG4gIC5jb250YWluZXIge1xcbiAgICBtYXgtd2lkdGg6IDQ3NXB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNjQwcHgpIHtcXG5cXG4gIC5jb250YWluZXIge1xcbiAgICBtYXgtd2lkdGg6IDY0MHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG5cXG4gIC5jb250YWluZXIge1xcbiAgICBtYXgtd2lkdGg6IDc2OHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogMTAyNHB4KSB7XFxuXFxuICAuY29udGFpbmVyIHtcXG4gICAgbWF4LXdpZHRoOiAxMDI0cHg7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxMjgwcHgpIHtcXG5cXG4gIC5jb250YWluZXIge1xcbiAgICBtYXgtd2lkdGg6IDEyODBweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDE0MDBweCkge1xcblxcbiAgLmNvbnRhaW5lciB7XFxuICAgIG1heC13aWR0aDogMTQwMHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogMTUzNnB4KSB7XFxuXFxuICAuY29udGFpbmVyIHtcXG4gICAgbWF4LXdpZHRoOiAxNTM2cHg7XFxuICB9XFxufVxcbi5zci1vbmx5IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAxcHg7XFxuICBoZWlnaHQ6IDFweDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IC0xcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICBib3JkZXItd2lkdGg6IDA7XFxufVxcbi5wb2ludGVyLWV2ZW50cy1ub25lIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG4uc3RhdGljIHtcXG4gIHBvc2l0aW9uOiBzdGF0aWM7XFxufVxcbi5maXhlZCB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxufVxcbi5hYnNvbHV0ZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxufVxcbi5yZWxhdGl2ZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5zdGlja3kge1xcbiAgcG9zaXRpb246IHN0aWNreTtcXG59XFxuLmluc2V0LTAge1xcbiAgdG9wOiAwcHg7XFxuICByaWdodDogMHB4O1xcbiAgYm90dG9tOiAwcHg7XFxuICBsZWZ0OiAwcHg7XFxufVxcbi5pbnNldC15LTAge1xcbiAgdG9wOiAwcHg7XFxuICBib3R0b206IDBweDtcXG59XFxuLnRvcC0wIHtcXG4gIHRvcDogMHB4O1xcbn1cXG4ucmlnaHQtMCB7XFxuICByaWdodDogMHB4O1xcbn1cXG4ubGVmdC0wIHtcXG4gIGxlZnQ6IDBweDtcXG59XFxuLmxlZnQtNDgge1xcbiAgbGVmdDogMTJyZW07XFxufVxcbi50b3AtXFxcXFstMXB4XFxcXF0ge1xcbiAgdG9wOiAtMXB4O1xcbn1cXG4ubGVmdC1cXFxcWzE3cHhcXFxcXSB7XFxuICBsZWZ0OiAxN3B4O1xcbn1cXG4udG9wLTFcXFxcLzIge1xcbiAgdG9wOiA1MCU7XFxufVxcbi5sZWZ0LTFcXFxcLzIge1xcbiAgbGVmdDogNTAlO1xcbn1cXG4uei0wIHtcXG4gIHotaW5kZXg6IDA7XFxufVxcbi56LTQwIHtcXG4gIHotaW5kZXg6IDQwO1xcbn1cXG4uei01MCB7XFxuICB6LWluZGV4OiA1MDtcXG59XFxuLnotMTAge1xcbiAgei1pbmRleDogMTA7XFxufVxcbi56LTIwIHtcXG4gIHotaW5kZXg6IDIwO1xcbn1cXG4uei0zMCB7XFxuICB6LWluZGV4OiAzMDtcXG59XFxuLmNvbC1zcGFuLTEge1xcbiAgZ3JpZC1jb2x1bW46IHNwYW4gMSAvIHNwYW4gMTtcXG59XFxuLm0tYXV0byB7XFxuICBtYXJnaW46IGF1dG87XFxufVxcbi5tLTMge1xcbiAgbWFyZ2luOiAwLjc1cmVtO1xcbn1cXG4ubS0yIHtcXG4gIG1hcmdpbjogMC41cmVtO1xcbn1cXG4ubS01IHtcXG4gIG1hcmdpbjogMS4yNXJlbTtcXG59XFxuLm14LWF1dG8ge1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcbi5teS02IHtcXG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcXG59XFxuLm15LTIge1xcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG4ubXgtMiB7XFxuICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbiAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XFxufVxcbi5teS0xMCB7XFxuICBtYXJnaW4tdG9wOiAyLjVyZW07XFxuICBtYXJnaW4tYm90dG9tOiAyLjVyZW07XFxufVxcbi4tbXgtOCB7XFxuICBtYXJnaW4tbGVmdDogLTJyZW07XFxuICBtYXJnaW4tcmlnaHQ6IC0ycmVtO1xcbn1cXG4ubXktOCB7XFxuICBtYXJnaW4tdG9wOiAycmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXG59XFxuLm15LTQge1xcbiAgbWFyZ2luLXRvcDogMXJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcbi5tbC0zIHtcXG4gIG1hcmdpbi1sZWZ0OiAwLjc1cmVtO1xcbn1cXG4uLW1sLXB4IHtcXG4gIG1hcmdpbi1sZWZ0OiAtMXB4O1xcbn1cXG4ubWwtMSB7XFxuICBtYXJnaW4tbGVmdDogMC4yNXJlbTtcXG59XFxuLm10LTIge1xcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG4ubXItMiB7XFxuICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcXG59XFxuLm1sLTIge1xcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG59XFxuLm10LTQge1xcbiAgbWFyZ2luLXRvcDogMXJlbTtcXG59XFxuLm1sLTQge1xcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XFxufVxcbi5tdC04IHtcXG4gIG1hcmdpbi10b3A6IDJyZW07XFxufVxcbi5tbC0xMiB7XFxuICBtYXJnaW4tbGVmdDogM3JlbTtcXG59XFxuLi1tdC1weCB7XFxuICBtYXJnaW4tdG9wOiAtMXB4O1xcbn1cXG4ubXItMyB7XFxuICBtYXJnaW4tcmlnaHQ6IDAuNzVyZW07XFxufVxcbi4tbWwtMSB7XFxuICBtYXJnaW4tbGVmdDogLTAuMjVyZW07XFxufVxcbi5tYi00IHtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcbi5tdC0zIHtcXG4gIG1hcmdpbi10b3A6IDAuNzVyZW07XFxufVxcbi4tbXItMFxcXFwuNSB7XFxuICBtYXJnaW4tcmlnaHQ6IC0wLjEyNXJlbTtcXG59XFxuLi1tci0wIHtcXG4gIG1hcmdpbi1yaWdodDogLTBweDtcXG59XFxuLi1tci0yIHtcXG4gIG1hcmdpbi1yaWdodDogLTAuNXJlbTtcXG59XFxuLm10LTEwIHtcXG4gIG1hcmdpbi10b3A6IDIuNXJlbTtcXG59XFxuLm1iLTUge1xcbiAgbWFyZ2luLWJvdHRvbTogMS4yNXJlbTtcXG59XFxuLm10LTEge1xcbiAgbWFyZ2luLXRvcDogMC4yNXJlbTtcXG59XFxuLm1iLTIge1xcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG4ubWItMyB7XFxuICBtYXJnaW4tYm90dG9tOiAwLjc1cmVtO1xcbn1cXG4ubXQtNSB7XFxuICBtYXJnaW4tdG9wOiAxLjI1cmVtO1xcbn1cXG4ubXItMVxcXFwuNSB7XFxuICBtYXJnaW4tcmlnaHQ6IDAuMzc1cmVtO1xcbn1cXG4ubXItMSB7XFxuICBtYXJnaW4tcmlnaHQ6IDAuMjVyZW07XFxufVxcbi4tbWItcHgge1xcbiAgbWFyZ2luLWJvdHRvbTogLTFweDtcXG59XFxuLm1yLTUge1xcbiAgbWFyZ2luLXJpZ2h0OiAxLjI1cmVtO1xcbn1cXG4uYmxvY2sge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5pbmxpbmUtYmxvY2sge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG4uaW5saW5lIHtcXG4gIGRpc3BsYXk6IGlubGluZTtcXG59XFxuLmZsZXgge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuLmlubGluZS1mbGV4IHtcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbn1cXG4udGFibGUge1xcbiAgZGlzcGxheTogdGFibGU7XFxufVxcbi5ncmlkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxufVxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuLmFzcGVjdC12aWRlbyB7XFxuICBhc3BlY3QtcmF0aW86IDE2IC8gOTtcXG59XFxuLmgtNSB7XFxuICBoZWlnaHQ6IDEuMjVyZW07XFxufVxcbi5oLTgge1xcbiAgaGVpZ2h0OiAycmVtO1xcbn1cXG4uaC0xNiB7XFxuICBoZWlnaHQ6IDRyZW07XFxufVxcbi5oLTYwIHtcXG4gIGhlaWdodDogMTVyZW07XFxufVxcbi5oLTkge1xcbiAgaGVpZ2h0OiAyLjI1cmVtO1xcbn1cXG4uaC00IHtcXG4gIGhlaWdodDogMXJlbTtcXG59XFxuLmgtNiB7XFxuICBoZWlnaHQ6IDEuNXJlbTtcXG59XFxuLmgtYXV0byB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcbi5oLXNjcmVlbiB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG4uaC0yMCB7XFxuICBoZWlnaHQ6IDVyZW07XFxufVxcbi5oLTI0IHtcXG4gIGhlaWdodDogNnJlbTtcXG59XFxuLmgtNTYge1xcbiAgaGVpZ2h0OiAxNHJlbTtcXG59XFxuLmgtZnVsbCB7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcbi5tYXgtaC1tYXgge1xcbiAgbWF4LWhlaWdodDogLW1vei1tYXgtY29udGVudDtcXG4gIG1heC1oZWlnaHQ6IG1heC1jb250ZW50O1xcbn1cXG4ubWF4LWgtNDQge1xcbiAgbWF4LWhlaWdodDogMTFyZW07XFxufVxcbi5taW4taC1zY3JlZW4ge1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxufVxcbi53LTUge1xcbiAgd2lkdGg6IDEuMjVyZW07XFxufVxcbi53LTgge1xcbiAgd2lkdGg6IDJyZW07XFxufVxcbi53LWF1dG8ge1xcbiAgd2lkdGg6IGF1dG87XFxufVxcbi53LTQ4IHtcXG4gIHdpZHRoOiAxMnJlbTtcXG59XFxuLnctZnVsbCB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLnctOSB7XFxuICB3aWR0aDogMi4yNXJlbTtcXG59XFxuLnctMTQge1xcbiAgd2lkdGg6IDMuNXJlbTtcXG59XFxuLnctNCB7XFxuICB3aWR0aDogMXJlbTtcXG59XFxuLnctNiB7XFxuICB3aWR0aDogMS41cmVtO1xcbn1cXG4udy0yMCB7XFxuICB3aWR0aDogNXJlbTtcXG59XFxuLnctM1xcXFwvNCB7XFxuICB3aWR0aDogNzUlO1xcbn1cXG4udy0yXFxcXC81IHtcXG4gIHdpZHRoOiA0MCU7XFxufVxcbi53LTFcXFxcLzUge1xcbiAgd2lkdGg6IDIwJTtcXG59XFxuLnctMyB7XFxuICB3aWR0aDogMC43NXJlbTtcXG59XFxuLnctMVxcXFwvNCB7XFxuICB3aWR0aDogMjUlO1xcbn1cXG4udy03MiB7XFxuICB3aWR0aDogMThyZW07XFxufVxcbi53LTE2IHtcXG4gIHdpZHRoOiA0cmVtO1xcbn1cXG4udy0wIHtcXG4gIHdpZHRoOiAwcHg7XFxufVxcbi53LTFcXFxcLzIge1xcbiAgd2lkdGg6IDUwJTtcXG59XFxuLm1heC13LTZ4bCB7XFxuICBtYXgtd2lkdGg6IDcycmVtO1xcbn1cXG4ubWF4LXctN3hsIHtcXG4gIG1heC13aWR0aDogODByZW07XFxufVxcbi5tYXgtdy1zY3JlZW4teGwge1xcbiAgbWF4LXdpZHRoOiAxMjgwcHg7XFxufVxcbi5tYXgtdy1cXFxcWzhyZW1cXFxcXSB7XFxuICBtYXgtd2lkdGg6IDhyZW07XFxufVxcbi5mbGV4LTEge1xcbiAgZmxleDogMSAxIDAlO1xcbn1cXG4uZmxleC1zaHJpbmstMCB7XFxuICBmbGV4LXNocmluazogMDtcXG59XFxuLnNocmluay0wIHtcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbn1cXG4uZmxleC1ncm93IHtcXG4gIGZsZXgtZ3JvdzogMTtcXG59XFxuLm9yaWdpbi10b3Age1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogdG9wO1xcbn1cXG4ub3JpZ2luLXRvcC1sZWZ0IHtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IHRvcCBsZWZ0O1xcbn1cXG4ub3JpZ2luLXRvcC1yaWdodCB7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgcmlnaHQ7XFxufVxcbi50cmFuc2xhdGUteC0yOCB7XFxuICAtLXR3LXRyYW5zbGF0ZS14OiA3cmVtO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUodmFyKC0tdHctdHJhbnNsYXRlLXgpLCB2YXIoLS10dy10cmFuc2xhdGUteSkpIHJvdGF0ZSh2YXIoLS10dy1yb3RhdGUpKSBza2V3WCh2YXIoLS10dy1za2V3LXgpKSBza2V3WSh2YXIoLS10dy1za2V3LXkpKSBzY2FsZVgodmFyKC0tdHctc2NhbGUteCkpIHNjYWxlWSh2YXIoLS10dy1zY2FsZS15KSk7XFxufVxcbi4tdHJhbnNsYXRlLXgtZnVsbCB7XFxuICAtLXR3LXRyYW5zbGF0ZS14OiAtMTAwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKHZhcigtLXR3LXRyYW5zbGF0ZS14KSwgdmFyKC0tdHctdHJhbnNsYXRlLXkpKSByb3RhdGUodmFyKC0tdHctcm90YXRlKSkgc2tld1godmFyKC0tdHctc2tldy14KSkgc2tld1kodmFyKC0tdHctc2tldy15KSkgc2NhbGVYKHZhcigtLXR3LXNjYWxlLXgpKSBzY2FsZVkodmFyKC0tdHctc2NhbGUteSkpO1xcbn1cXG4uLXRyYW5zbGF0ZS14LTFcXFxcLzIge1xcbiAgLS10dy10cmFuc2xhdGUteDogLTUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKHZhcigtLXR3LXRyYW5zbGF0ZS14KSwgdmFyKC0tdHctdHJhbnNsYXRlLXkpKSByb3RhdGUodmFyKC0tdHctcm90YXRlKSkgc2tld1godmFyKC0tdHctc2tldy14KSkgc2tld1kodmFyKC0tdHctc2tldy15KSkgc2NhbGVYKHZhcigtLXR3LXNjYWxlLXgpKSBzY2FsZVkodmFyKC0tdHctc2NhbGUteSkpO1xcbn1cXG4uLXRyYW5zbGF0ZS15LTFcXFxcLzIge1xcbiAgLS10dy10cmFuc2xhdGUteTogLTUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKHZhcigtLXR3LXRyYW5zbGF0ZS14KSwgdmFyKC0tdHctdHJhbnNsYXRlLXkpKSByb3RhdGUodmFyKC0tdHctcm90YXRlKSkgc2tld1godmFyKC0tdHctc2tldy14KSkgc2tld1kodmFyKC0tdHctc2tldy15KSkgc2NhbGVYKHZhcigtLXR3LXNjYWxlLXgpKSBzY2FsZVkodmFyKC0tdHctc2NhbGUteSkpO1xcbn1cXG4udHJhbnNsYXRlLXgtMCB7XFxuICAtLXR3LXRyYW5zbGF0ZS14OiAwcHg7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSh2YXIoLS10dy10cmFuc2xhdGUteCksIHZhcigtLXR3LXRyYW5zbGF0ZS15KSkgcm90YXRlKHZhcigtLXR3LXJvdGF0ZSkpIHNrZXdYKHZhcigtLXR3LXNrZXcteCkpIHNrZXdZKHZhcigtLXR3LXNrZXcteSkpIHNjYWxlWCh2YXIoLS10dy1zY2FsZS14KSkgc2NhbGVZKHZhcigtLXR3LXNjYWxlLXkpKTtcXG59XFxuLnNjYWxlLTk1IHtcXG4gIC0tdHctc2NhbGUteDogLjk1O1xcbiAgLS10dy1zY2FsZS15OiAuOTU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSh2YXIoLS10dy10cmFuc2xhdGUteCksIHZhcigtLXR3LXRyYW5zbGF0ZS15KSkgcm90YXRlKHZhcigtLXR3LXJvdGF0ZSkpIHNrZXdYKHZhcigtLXR3LXNrZXcteCkpIHNrZXdZKHZhcigtLXR3LXNrZXcteSkpIHNjYWxlWCh2YXIoLS10dy1zY2FsZS14KSkgc2NhbGVZKHZhcigtLXR3LXNjYWxlLXkpKTtcXG59XFxuLnNjYWxlLTEwMCB7XFxuICAtLXR3LXNjYWxlLXg6IDE7XFxuICAtLXR3LXNjYWxlLXk6IDE7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSh2YXIoLS10dy10cmFuc2xhdGUteCksIHZhcigtLXR3LXRyYW5zbGF0ZS15KSkgcm90YXRlKHZhcigtLXR3LXJvdGF0ZSkpIHNrZXdYKHZhcigtLXR3LXNrZXcteCkpIHNrZXdZKHZhcigtLXR3LXNrZXcteSkpIHNjYWxlWCh2YXIoLS10dy1zY2FsZS14KSkgc2NhbGVZKHZhcigtLXR3LXNjYWxlLXkpKTtcXG59XFxuLnRyYW5zZm9ybSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSh2YXIoLS10dy10cmFuc2xhdGUteCksIHZhcigtLXR3LXRyYW5zbGF0ZS15KSkgcm90YXRlKHZhcigtLXR3LXJvdGF0ZSkpIHNrZXdYKHZhcigtLXR3LXNrZXcteCkpIHNrZXdZKHZhcigtLXR3LXNrZXcteSkpIHNjYWxlWCh2YXIoLS10dy1zY2FsZS14KSkgc2NhbGVZKHZhcigtLXR3LXNjYWxlLXkpKTtcXG59XFxuLmN1cnNvci1kZWZhdWx0IHtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuLmN1cnNvci1wb2ludGVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnNuYXAteCB7XFxuICBzY3JvbGwtc25hcC10eXBlOiB4IHZhcigtLXR3LXNjcm9sbC1zbmFwLXN0cmljdG5lc3MpO1xcbn1cXG4uc25hcC1tYW5kYXRvcnkge1xcbiAgLS10dy1zY3JvbGwtc25hcC1zdHJpY3RuZXNzOiBtYW5kYXRvcnk7XFxufVxcbi5zbmFwLXN0YXJ0IHtcXG4gIHNjcm9sbC1zbmFwLWFsaWduOiBzdGFydDtcXG59XFxuLnNuYXAtYWx3YXlzIHtcXG4gIHNjcm9sbC1zbmFwLXN0b3A6IGFsd2F5cztcXG59XFxuLmxpc3QtaW5zaWRlIHtcXG4gIGxpc3Qtc3R5bGUtcG9zaXRpb246IGluc2lkZTtcXG59XFxuLmxpc3Qtbm9uZSB7XFxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxufVxcbi5saXN0LWRpc2Mge1xcbiAgbGlzdC1zdHlsZS10eXBlOiBkaXNjO1xcbn1cXG4uZ3JpZC1mbG93LWNvbC1kZW5zZSB7XFxuICBncmlkLWF1dG8tZmxvdzogY29sdW1uIGRlbnNlO1xcbn1cXG4uZ3JpZC1jb2xzLTEge1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgbWlubWF4KDAsIDFmcikpO1xcbn1cXG4uZ3JpZC1jb2xzLTIge1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpO1xcbn1cXG4uZ3JpZC1yb3dzLTIge1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpO1xcbn1cXG4uZmxleC1yb3cge1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG59XFxuLmZsZXgtY29sIHtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5mbGV4LXdyYXAge1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG4uZmxleC1ub3dyYXAge1xcbiAgZmxleC13cmFwOiBub3dyYXA7XFxufVxcbi5pdGVtcy1zdGFydCB7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuLml0ZW1zLWNlbnRlciB7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4uanVzdGlmeS1zdGFydCB7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcbi5qdXN0aWZ5LWVuZCB7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbn1cXG4uanVzdGlmeS1jZW50ZXIge1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5qdXN0aWZ5LWJldHdlZW4ge1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG4uanVzdGlmeS1pdGVtcy1jZW50ZXIge1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbn1cXG4uZ2FwLTQge1xcbiAgZ2FwOiAxcmVtO1xcbn1cXG4uZ2FwLTYge1xcbiAgZ2FwOiAxLjVyZW07XFxufVxcbi5nYXAtM1xcXFwuNSB7XFxuICBnYXA6IDAuODc1cmVtO1xcbn1cXG4uZ2FwLTMge1xcbiAgZ2FwOiAwLjc1cmVtO1xcbn1cXG4uZ2FwLTEge1xcbiAgZ2FwOiAwLjI1cmVtO1xcbn1cXG4uZ2FwLTIge1xcbiAgZ2FwOiAwLjVyZW07XFxufVxcbi5zcGFjZS14LTggPiA6bm90KFtoaWRkZW5dKSB+IDpub3QoW2hpZGRlbl0pIHtcXG4gIC0tdHctc3BhY2UteC1yZXZlcnNlOiAwO1xcbiAgbWFyZ2luLXJpZ2h0OiBjYWxjKDJyZW0gKiB2YXIoLS10dy1zcGFjZS14LXJldmVyc2UpKTtcXG4gIG1hcmdpbi1sZWZ0OiBjYWxjKDJyZW0gKiBjYWxjKDEgLSB2YXIoLS10dy1zcGFjZS14LXJldmVyc2UpKSk7XFxufVxcbi5zcGFjZS15LTEgPiA6bm90KFtoaWRkZW5dKSB+IDpub3QoW2hpZGRlbl0pIHtcXG4gIC0tdHctc3BhY2UteS1yZXZlcnNlOiAwO1xcbiAgbWFyZ2luLXRvcDogY2FsYygwLjI1cmVtICogY2FsYygxIC0gdmFyKC0tdHctc3BhY2UteS1yZXZlcnNlKSkpO1xcbiAgbWFyZ2luLWJvdHRvbTogY2FsYygwLjI1cmVtICogdmFyKC0tdHctc3BhY2UteS1yZXZlcnNlKSk7XFxufVxcbi5zcGFjZS15LTMgPiA6bm90KFtoaWRkZW5dKSB+IDpub3QoW2hpZGRlbl0pIHtcXG4gIC0tdHctc3BhY2UteS1yZXZlcnNlOiAwO1xcbiAgbWFyZ2luLXRvcDogY2FsYygwLjc1cmVtICogY2FsYygxIC0gdmFyKC0tdHctc3BhY2UteS1yZXZlcnNlKSkpO1xcbiAgbWFyZ2luLWJvdHRvbTogY2FsYygwLjc1cmVtICogdmFyKC0tdHctc3BhY2UteS1yZXZlcnNlKSk7XFxufVxcbi5kaXZpZGUteSA+IDpub3QoW2hpZGRlbl0pIH4gOm5vdChbaGlkZGVuXSkge1xcbiAgLS10dy1kaXZpZGUteS1yZXZlcnNlOiAwO1xcbiAgYm9yZGVyLXRvcC13aWR0aDogY2FsYygxcHggKiBjYWxjKDEgLSB2YXIoLS10dy1kaXZpZGUteS1yZXZlcnNlKSkpO1xcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogY2FsYygxcHggKiB2YXIoLS10dy1kaXZpZGUteS1yZXZlcnNlKSk7XFxufVxcbi5kaXZpZGUtc2xhdGUtMzAwID4gOm5vdChbaGlkZGVuXSkgfiA6bm90KFtoaWRkZW5dKSB7XFxuICAtLXR3LWRpdmlkZS1vcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2IoMjAzIDIxMyAyMjUgLyB2YXIoLS10dy1kaXZpZGUtb3BhY2l0eSkpO1xcbn1cXG4uc2VsZi1jZW50ZXIge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG4ub3ZlcmZsb3ctYXV0byB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuLm92ZXJmbG93LWhpZGRlbiB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG4ub3ZlcmZsb3cteC1hdXRvIHtcXG4gIG92ZXJmbG93LXg6IGF1dG87XFxufVxcbi5vdmVyZmxvdy15LWF1dG8ge1xcbiAgb3ZlcmZsb3cteTogYXV0bztcXG59XFxuLnRydW5jYXRlIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxufVxcbi50ZXh0LWVsbGlwc2lzIHtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbn1cXG4ud2hpdGVzcGFjZS1ub3JtYWwge1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcXG59XFxuLndoaXRlc3BhY2Utbm93cmFwIHtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxufVxcbi53aGl0ZXNwYWNlLXByZSB7XFxuICB3aGl0ZS1zcGFjZTogcHJlO1xcbn1cXG4ud2hpdGVzcGFjZS1wcmUtd3JhcCB7XFxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxufVxcbi5yb3VuZGVkLW1kIHtcXG4gIGJvcmRlci1yYWRpdXM6IDAuMzc1cmVtO1xcbn1cXG4ucm91bmRlZC1sZyB7XFxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxufVxcbi5yb3VuZGVkIHtcXG4gIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XFxufVxcbi5yb3VuZGVkLWZ1bGwge1xcbiAgYm9yZGVyLXJhZGl1czogOTk5OXB4O1xcbn1cXG4ucm91bmRlZC1sLW1kIHtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDAuMzc1cmVtO1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMC4zNzVyZW07XFxufVxcbi5yb3VuZGVkLXItbWQge1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDAuMzc1cmVtO1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDAuMzc1cmVtO1xcbn1cXG4ucm91bmRlZC1sLWxnIHtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDAuNXJlbTtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDAuNXJlbTtcXG59XFxuLnJvdW5kZWQtci1sZyB7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMC41cmVtO1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDAuNXJlbTtcXG59XFxuLnJvdW5kZWQtdC1sZyB7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwLjVyZW07XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMC41cmVtO1xcbn1cXG4ucm91bmRlZC10LW1kIHtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDAuMzc1cmVtO1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDAuMzc1cmVtO1xcbn1cXG4uYm9yZGVyIHtcXG4gIGJvcmRlci13aWR0aDogMXB4O1xcbn1cXG4uYm9yZGVyLTIge1xcbiAgYm9yZGVyLXdpZHRoOiAycHg7XFxufVxcbi5ib3JkZXItMCB7XFxuICBib3JkZXItd2lkdGg6IDBweDtcXG59XFxuLmJvcmRlci15LTIge1xcbiAgYm9yZGVyLXRvcC13aWR0aDogMnB4O1xcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMnB4O1xcbn1cXG4uYm9yZGVyLXkge1xcbiAgYm9yZGVyLXRvcC13aWR0aDogMXB4O1xcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMXB4O1xcbn1cXG4uYm9yZGVyLXQge1xcbiAgYm9yZGVyLXRvcC13aWR0aDogMXB4O1xcbn1cXG4uYm9yZGVyLXQtMiB7XFxuICBib3JkZXItdG9wLXdpZHRoOiAycHg7XFxufVxcbi5ib3JkZXItYi0yIHtcXG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDJweDtcXG59XFxuLmJvcmRlci1sLTQge1xcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDRweDtcXG59XFxuLmJvcmRlci1iIHtcXG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDFweDtcXG59XFxuLmJvcmRlci10LTQge1xcbiAgYm9yZGVyLXRvcC13aWR0aDogNHB4O1xcbn1cXG4uYm9yZGVyLWdyYXktMzAwIHtcXG4gIC0tdHctYm9yZGVyLW9wYWNpdHk6IDE7XFxuICBib3JkZXItY29sb3I6IHJnYigyMDkgMjEzIDIxOSAvIHZhcigtLXR3LWJvcmRlci1vcGFjaXR5KSk7XFxufVxcbi5ib3JkZXItZ3JheS0yMDAge1xcbiAgLS10dy1ib3JkZXItb3BhY2l0eTogMTtcXG4gIGJvcmRlci1jb2xvcjogcmdiKDIyOSAyMzEgMjM1IC8gdmFyKC0tdHctYm9yZGVyLW9wYWNpdHkpKTtcXG59XFxuLmJvcmRlci10cmFuc3BhcmVudCB7XFxuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4uYm9yZGVyLXNsYXRlLTUwMCB7XFxuICAtLXR3LWJvcmRlci1vcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2IoMTAwIDExNiAxMzkgLyB2YXIoLS10dy1ib3JkZXItb3BhY2l0eSkpO1xcbn1cXG4uYm9yZGVyLWluZGlnby00MDAge1xcbiAgLS10dy1ib3JkZXItb3BhY2l0eTogMTtcXG4gIGJvcmRlci1jb2xvcjogcmdiKDE0MSAxNjIgMjUxIC8gdmFyKC0tdHctYm9yZGVyLW9wYWNpdHkpKTtcXG59XFxuLmJvcmRlci1za3ktNDAwIHtcXG4gIC0tdHctYm9yZGVyLW9wYWNpdHk6IDE7XFxuICBib3JkZXItY29sb3I6IHJnYig1NiAxODkgMjQ4IC8gdmFyKC0tdHctYm9yZGVyLW9wYWNpdHkpKTtcXG59XFxuLmJvcmRlci1ncmF5LTEwMCB7XFxuICAtLXR3LWJvcmRlci1vcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2IoMjQzIDI0NCAyNDYgLyB2YXIoLS10dy1ib3JkZXItb3BhY2l0eSkpO1xcbn1cXG4uYm9yZGVyLXNsYXRlLTkwMCB7XFxuICAtLXR3LWJvcmRlci1vcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2IoMTUgMjMgNDIgLyB2YXIoLS10dy1ib3JkZXItb3BhY2l0eSkpO1xcbn1cXG4uYm9yZGVyLXNreS05MDAge1xcbiAgLS10dy1ib3JkZXItb3BhY2l0eTogMTtcXG4gIGJvcmRlci1jb2xvcjogcmdiKDEyIDc0IDExMCAvIHZhcigtLXR3LWJvcmRlci1vcGFjaXR5KSk7XFxufVxcbi5ib3JkZXItc2xhdGUtNjAwIHtcXG4gIC0tdHctYm9yZGVyLW9wYWNpdHk6IDE7XFxuICBib3JkZXItY29sb3I6IHJnYig3MSA4NSAxMDUgLyB2YXIoLS10dy1ib3JkZXItb3BhY2l0eSkpO1xcbn1cXG4uYm9yZGVyLXNsYXRlLTIwMCB7XFxuICAtLXR3LWJvcmRlci1vcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2IoMjI2IDIzMiAyNDAgLyB2YXIoLS10dy1ib3JkZXItb3BhY2l0eSkpO1xcbn1cXG4uYm9yZGVyLXNsYXRlLTQwMCB7XFxuICAtLXR3LWJvcmRlci1vcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2IoMTQ4IDE2MyAxODQgLyB2YXIoLS10dy1ib3JkZXItb3BhY2l0eSkpO1xcbn1cXG4uYm9yZGVyLXNreS01MDAge1xcbiAgLS10dy1ib3JkZXItb3BhY2l0eTogMTtcXG4gIGJvcmRlci1jb2xvcjogcmdiKDE0IDE2NSAyMzMgLyB2YXIoLS10dy1ib3JkZXItb3BhY2l0eSkpO1xcbn1cXG4uYm9yZGVyLXNreS03MDAge1xcbiAgLS10dy1ib3JkZXItb3BhY2l0eTogMTtcXG4gIGJvcmRlci1jb2xvcjogcmdiKDMgMTA1IDE2MSAvIHZhcigtLXR3LWJvcmRlci1vcGFjaXR5KSk7XFxufVxcbi5ib3JkZXItc2t5LTMwMCB7XFxuICAtLXR3LWJvcmRlci1vcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2IoMTI1IDIxMSAyNTIgLyB2YXIoLS10dy1ib3JkZXItb3BhY2l0eSkpO1xcbn1cXG4uYm9yZGVyLXQtc2t5LTYwMCB7XFxuICAtLXR3LWJvcmRlci1vcGFjaXR5OiAxO1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogcmdiKDIgMTMyIDE5OSAvIHZhcigtLXR3LWJvcmRlci1vcGFjaXR5KSk7XFxufVxcbi5iZy13aGl0ZSB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1IDI1NSAyNTUgLyB2YXIoLS10dy1iZy1vcGFjaXR5KSk7XFxufVxcbi5iZy1ncmF5LTEwMCB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQzIDI0NCAyNDYgLyB2YXIoLS10dy1iZy1vcGFjaXR5KSk7XFxufVxcbi5iZy1ibHVlLTUwMCB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNjMgMTMxIDI0OCAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuLmJnLXNsYXRlLTIwMCB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjI2IDIzMiAyNDAgLyB2YXIoLS10dy1iZy1vcGFjaXR5KSk7XFxufVxcbi5iZy1za3ktNjAwIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyIDEzMiAxOTkgLyB2YXIoLS10dy1iZy1vcGFjaXR5KSk7XFxufVxcbi5iZy1ibHVlLTcwMCB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYgODYgMjE5IC8gdmFyKC0tdHctYmctb3BhY2l0eSkpO1xcbn1cXG4uYmctdHJhbnNwYXJlbnQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbi5iZy1pbmRpZ28tNTAge1xcbiAgLS10dy1iZy1vcGFjaXR5OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCAyNDUgMjU1IC8gdmFyKC0tdHctYmctb3BhY2l0eSkpO1xcbn1cXG4uYmcteWVsbG93LTMwMCB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUwIDIwMiAyMSAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuLmJnLXJlZC02MDAge1xcbiAgLS10dy1iZy1vcGFjaXR5OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyNCAzNiAzNiAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuLmJnLWJsdWUtNjAwIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyOCAxMDAgMjQyIC8gdmFyKC0tdHctYmctb3BhY2l0eSkpO1xcbn1cXG4uYmctZ3JlZW4tNTAwIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNCAxNTkgMTEwIC8gdmFyKC0tdHctYmctb3BhY2l0eSkpO1xcbn1cXG4uYmctaW5kaWdvLTUwMCB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTA0IDExNyAyNDUgLyB2YXIoLS10dy1iZy1vcGFjaXR5KSk7XFxufVxcbi5iZy1ncmF5LTUwIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDkgMjUwIDI1MSAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuLmJnLWJsdWUtMTAwIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjUgMjM5IDI1NCAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuLmJnLVxcXFxbXFxcXCMwZTBlMGVcXFxcXSB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQgMTQgMTQgLyB2YXIoLS10dy1iZy1vcGFjaXR5KSk7XFxufVxcbi5iZy1za3ktNDAwIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1NiAxODkgMjQ4IC8gdmFyKC0tdHctYmctb3BhY2l0eSkpO1xcbn1cXG4uYmctc2xhdGUtNTAge1xcbiAgLS10dy1iZy1vcGFjaXR5OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0OCAyNTAgMjUyIC8gdmFyKC0tdHctYmctb3BhY2l0eSkpO1xcbn1cXG4uYmctcmVkLTUwMCB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwIDgyIDgyIC8gdmFyKC0tdHctYmctb3BhY2l0eSkpO1xcbn1cXG4uYmctd2hpdGVcXFxcLzMwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUgMjU1IDI1NSAvIDAuMyk7XFxufVxcbi5iZy1za3ktOTAwIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxMiA3NCAxMTAgLyB2YXIoLS10dy1iZy1vcGFjaXR5KSk7XFxufVxcbi5iZy1ncmFkaWVudC10by1iciB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tIHJpZ2h0LCB2YXIoLS10dy1ncmFkaWVudC1zdG9wcykpO1xcbn1cXG4uZnJvbS10ZWFsLTMwMCB7XFxuICAtLXR3LWdyYWRpZW50LWZyb206ICM3RURDRTI7XFxuICAtLXR3LWdyYWRpZW50LXRvOiByZ2IoMTI2IDIyMCAyMjYgLyAwKTtcXG4gIC0tdHctZ3JhZGllbnQtc3RvcHM6IHZhcigtLXR3LWdyYWRpZW50LWZyb20pLCB2YXIoLS10dy1ncmFkaWVudC10byk7XFxufVxcbi5mcm9tLWN5YW4tMzAwIHtcXG4gIC0tdHctZ3JhZGllbnQtZnJvbTogIzY3ZThmOTtcXG4gIC0tdHctZ3JhZGllbnQtdG86IHJnYigxMDMgMjMyIDI0OSAvIDApO1xcbiAgLS10dy1ncmFkaWVudC1zdG9wczogdmFyKC0tdHctZ3JhZGllbnQtZnJvbSksIHZhcigtLXR3LWdyYWRpZW50LXRvKTtcXG59XFxuLnRvLXNreS00MDAge1xcbiAgLS10dy1ncmFkaWVudC10bzogIzM4YmRmODtcXG59XFxuLnRvLXNreS01MDAge1xcbiAgLS10dy1ncmFkaWVudC10bzogIzBlYTVlOTtcXG59XFxuLmJnLWNvdmVyIHtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcbi5iZy1jZW50ZXIge1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbn1cXG4uZmlsbC1jdXJyZW50IHtcXG4gIGZpbGw6IGN1cnJlbnRDb2xvcjtcXG59XFxuLm9iamVjdC1jb3ZlciB7XFxuICAtby1vYmplY3QtZml0OiBjb3ZlcjtcXG4gICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcbn1cXG4ucC02IHtcXG4gIHBhZGRpbmc6IDEuNXJlbTtcXG59XFxuLnAtMiB7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxufVxcbi5wLTUge1xcbiAgcGFkZGluZzogMS4yNXJlbTtcXG59XFxuLnAtMSB7XFxuICBwYWRkaW5nOiAwLjI1cmVtO1xcbn1cXG4ucC00IHtcXG4gIHBhZGRpbmc6IDFyZW07XFxufVxcbi5wLTJcXFxcLjUge1xcbiAgcGFkZGluZzogMC42MjVyZW07XFxufVxcbi5wLTMge1xcbiAgcGFkZGluZzogMC43NXJlbTtcXG59XFxuLnAtMFxcXFwuNSB7XFxuICBwYWRkaW5nOiAwLjEyNXJlbTtcXG59XFxuLnAtMCB7XFxuICBwYWRkaW5nOiAwcHg7XFxufVxcbi5weC00IHtcXG4gIHBhZGRpbmctbGVmdDogMXJlbTtcXG4gIHBhZGRpbmctcmlnaHQ6IDFyZW07XFxufVxcbi5weS0yIHtcXG4gIHBhZGRpbmctdG9wOiAwLjVyZW07XFxuICBwYWRkaW5nLWJvdHRvbTogMC41cmVtO1xcbn1cXG4ucHgtMiB7XFxuICBwYWRkaW5nLWxlZnQ6IDAuNXJlbTtcXG4gIHBhZGRpbmctcmlnaHQ6IDAuNXJlbTtcXG59XFxuLnB5LTQge1xcbiAgcGFkZGluZy10b3A6IDFyZW07XFxuICBwYWRkaW5nLWJvdHRvbTogMXJlbTtcXG59XFxuLnB4LTYge1xcbiAgcGFkZGluZy1sZWZ0OiAxLjVyZW07XFxuICBwYWRkaW5nLXJpZ2h0OiAxLjVyZW07XFxufVxcbi5weS0xIHtcXG4gIHBhZGRpbmctdG9wOiAwLjI1cmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDAuMjVyZW07XFxufVxcbi5weC0zXFxcXC41IHtcXG4gIHBhZGRpbmctbGVmdDogMC44NzVyZW07XFxuICBwYWRkaW5nLXJpZ2h0OiAwLjg3NXJlbTtcXG59XFxuLnB4LTMge1xcbiAgcGFkZGluZy1sZWZ0OiAwLjc1cmVtO1xcbiAgcGFkZGluZy1yaWdodDogMC43NXJlbTtcXG59XFxuLnB5LTJcXFxcLjUge1xcbiAgcGFkZGluZy10b3A6IDAuNjI1cmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDAuNjI1cmVtO1xcbn1cXG4ucHgtNSB7XFxuICBwYWRkaW5nLWxlZnQ6IDEuMjVyZW07XFxuICBwYWRkaW5nLXJpZ2h0OiAxLjI1cmVtO1xcbn1cXG4ucHktMyB7XFxuICBwYWRkaW5nLXRvcDogMC43NXJlbTtcXG4gIHBhZGRpbmctYm90dG9tOiAwLjc1cmVtO1xcbn1cXG4ucHgtMSB7XFxuICBwYWRkaW5nLWxlZnQ6IDAuMjVyZW07XFxuICBwYWRkaW5nLXJpZ2h0OiAwLjI1cmVtO1xcbn1cXG4ucHktNiB7XFxuICBwYWRkaW5nLXRvcDogMS41cmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDEuNXJlbTtcXG59XFxuLnB5LTAge1xcbiAgcGFkZGluZy10b3A6IDBweDtcXG4gIHBhZGRpbmctYm90dG9tOiAwcHg7XFxufVxcbi5weC0xMCB7XFxuICBwYWRkaW5nLWxlZnQ6IDIuNXJlbTtcXG4gIHBhZGRpbmctcmlnaHQ6IDIuNXJlbTtcXG59XFxuLnB5LTEwIHtcXG4gIHBhZGRpbmctdG9wOiAyLjVyZW07XFxuICBwYWRkaW5nLWJvdHRvbTogMi41cmVtO1xcbn1cXG4ucHktNSB7XFxuICBwYWRkaW5nLXRvcDogMS4yNXJlbTtcXG4gIHBhZGRpbmctYm90dG9tOiAxLjI1cmVtO1xcbn1cXG4ucHgtOCB7XFxuICBwYWRkaW5nLWxlZnQ6IDJyZW07XFxuICBwYWRkaW5nLXJpZ2h0OiAycmVtO1xcbn1cXG4ucHktMTIge1xcbiAgcGFkZGluZy10b3A6IDNyZW07XFxuICBwYWRkaW5nLWJvdHRvbTogM3JlbTtcXG59XFxuLnB4LTAge1xcbiAgcGFkZGluZy1sZWZ0OiAwcHg7XFxuICBwYWRkaW5nLXJpZ2h0OiAwcHg7XFxufVxcbi5wdC04IHtcXG4gIHBhZGRpbmctdG9wOiAycmVtO1xcbn1cXG4ucHQtMSB7XFxuICBwYWRkaW5nLXRvcDogMC4yNXJlbTtcXG59XFxuLnBsLTMge1xcbiAgcGFkZGluZy1sZWZ0OiAwLjc1cmVtO1xcbn1cXG4ucHItNCB7XFxuICBwYWRkaW5nLXJpZ2h0OiAxcmVtO1xcbn1cXG4ucHQtMiB7XFxuICBwYWRkaW5nLXRvcDogMC41cmVtO1xcbn1cXG4ucGItMyB7XFxuICBwYWRkaW5nLWJvdHRvbTogMC43NXJlbTtcXG59XFxuLnB0LTQge1xcbiAgcGFkZGluZy10b3A6IDFyZW07XFxufVxcbi5wYi0xIHtcXG4gIHBhZGRpbmctYm90dG9tOiAwLjI1cmVtO1xcbn1cXG4ucGItOCB7XFxuICBwYWRkaW5nLWJvdHRvbTogMnJlbTtcXG59XFxuLnBsLTEwIHtcXG4gIHBhZGRpbmctbGVmdDogMi41cmVtO1xcbn1cXG4ucGItMiB7XFxuICBwYWRkaW5nLWJvdHRvbTogMC41cmVtO1xcbn1cXG4ucHItMyB7XFxuICBwYWRkaW5nLXJpZ2h0OiAwLjc1cmVtO1xcbn1cXG4udGV4dC1sZWZ0IHtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcbi50ZXh0LWNlbnRlciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5hbGlnbi1iYXNlbGluZSB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi5hbGlnbi1taWRkbGUge1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG59XFxuLmZvbnQtc2FucyB7XFxuICBmb250LWZhbWlseTogTnVuaXRvLCB1aS1zYW5zLXNlcmlmLCBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXFxcIlNlZ29lIFVJXFxcIiwgUm9ib3RvLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBBcmlhbCwgXFxcIk5vdG8gU2Fuc1xcXCIsIHNhbnMtc2VyaWYsIFxcXCJBcHBsZSBDb2xvciBFbW9qaVxcXCIsIFxcXCJTZWdvZSBVSSBFbW9qaVxcXCIsIFxcXCJTZWdvZSBVSSBTeW1ib2xcXFwiLCBcXFwiTm90byBDb2xvciBFbW9qaVxcXCI7XFxufVxcbi50ZXh0LXNtIHtcXG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XFxuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcXG59XFxuLnRleHQtbGcge1xcbiAgZm9udC1zaXplOiAxLjEyNXJlbTtcXG4gIGxpbmUtaGVpZ2h0OiAxLjc1cmVtO1xcbn1cXG4udGV4dC14cyB7XFxuICBmb250LXNpemU6IDAuNzVyZW07XFxuICBsaW5lLWhlaWdodDogMXJlbTtcXG59XFxuLnRleHQteGwge1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgbGluZS1oZWlnaHQ6IDEuNzVyZW07XFxufVxcbi50ZXh0LWJhc2Uge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcXG59XFxuLnRleHQtMnhsIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgbGluZS1oZWlnaHQ6IDJyZW07XFxufVxcbi50ZXh0LVxcXFxbMTBweFxcXFxdIHtcXG4gIGZvbnQtc2l6ZTogMTBweDtcXG59XFxuLmZvbnQtbWVkaXVtIHtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxufVxcbi5mb250LXNlbWlib2xkIHtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxufVxcbi5mb250LW5vcm1hbCB7XFxuICBmb250LXdlaWdodDogNDAwO1xcbn1cXG4uZm9udC1ib2xkIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi51cHBlcmNhc2Uge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuLmxlYWRpbmctNSB7XFxuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcXG59XFxuLmxlYWRpbmctNyB7XFxuICBsaW5lLWhlaWdodDogMS43NXJlbTtcXG59XFxuLmxlYWRpbmctNCB7XFxuICBsaW5lLWhlaWdodDogMXJlbTtcXG59XFxuLmxlYWRpbmctdGlnaHQge1xcbiAgbGluZS1oZWlnaHQ6IDEuMjU7XFxufVxcbi5sZWFkaW5nLW5vbmUge1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxufVxcbi5sZWFkaW5nLW5vcm1hbCB7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbn1cXG4udHJhY2tpbmctd2lkZXN0IHtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjFlbTtcXG59XFxuLnRyYWNraW5nLXRpZ2h0IHtcXG4gIGxldHRlci1zcGFjaW5nOiAtMC4wMjVlbTtcXG59XFxuLnRleHQtZ3JheS01MDAge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDEwNyAxMTQgMTI4IC8gdmFyKC0tdHctdGV4dC1vcGFjaXR5KSk7XFxufVxcbi50ZXh0LWdyYXktNzAwIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYig1NSA2NSA4MSAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG4udGV4dC1ncmF5LTIwMCB7XFxuICAtLXR3LXRleHQtb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoMjI5IDIzMSAyMzUgLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuLnRleHQtZ3JheS0zMDAge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDIwOSAyMTMgMjE5IC8gdmFyKC0tdHctdGV4dC1vcGFjaXR5KSk7XFxufVxcbi50ZXh0LWdyYXktNDAwIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYigxNTYgMTYzIDE3NSAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG4udGV4dC1ncmF5LTYwMCB7XFxuICAtLXR3LXRleHQtb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoNzUgODUgOTkgLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuLnRleHQtZ3JheS05MDAge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDE3IDI0IDM5IC8gdmFyKC0tdHctdGV4dC1vcGFjaXR5KSk7XFxufVxcbi50ZXh0LXdoaXRlIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYigyNTUgMjU1IDI1NSAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG4udGV4dC1pbmRpZ28tNjAwIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYig4OCA4MCAyMzYgLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuLnRleHQtc2xhdGUtNzAwIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYig1MSA2NSA4NSAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG4udGV4dC1zbGF0ZS05MDAge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDE1IDIzIDQyIC8gdmFyKC0tdHctdGV4dC1vcGFjaXR5KSk7XFxufVxcbi50ZXh0LXNsYXRlLTgwMCB7XFxuICAtLXR3LXRleHQtb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoMzAgNDEgNTkgLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuLnRleHQtaW5kaWdvLTcwMCB7XFxuICAtLXR3LXRleHQtb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoODEgNjkgMjA1IC8gdmFyKC0tdHctdGV4dC1vcGFjaXR5KSk7XFxufVxcbi50ZXh0LXJlZC02MDAge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDIyNCAzNiAzNiAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG4udGV4dC1ncmF5LTgwMCB7XFxuICAtLXR3LXRleHQtb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoMzEgNDEgNTUgLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuLnRleHQtYmxhY2sge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDAgMCAwIC8gdmFyKC0tdHctdGV4dC1vcGFjaXR5KSk7XFxufVxcbi50ZXh0LXNreS02MDAge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDIgMTMyIDE5OSAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG4udGV4dC1yZWQtNTAwIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYigyNDAgODIgODIgLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuLnRleHQtYmx1ZS03MDAge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDI2IDg2IDIxOSAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG4udGV4dC1ncmF5LTEwMCB7XFxuICAtLXR3LXRleHQtb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoMjQzIDI0NCAyNDYgLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuLnRleHQtc2xhdGUtNjAwIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYig3MSA4NSAxMDUgLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuLnRleHQtY3lhbi01MDAge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDYgMTgyIDIxMiAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG4udGV4dC1zbGF0ZS01MDAge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDEwMCAxMTYgMTM5IC8gdmFyKC0tdHctdGV4dC1vcGFjaXR5KSk7XFxufVxcbi50ZXh0LWdyZWVuLTYwMCB7XFxuICAtLXR3LXRleHQtb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoNSAxMjIgODUgLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuLnVuZGVybGluZSB7XFxuICAtd2Via2l0LXRleHQtZGVjb3JhdGlvbi1saW5lOiB1bmRlcmxpbmU7XFxuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbi1saW5lOiB1bmRlcmxpbmU7XFxufVxcbi5saW5lLXRocm91Z2gge1xcbiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb24tbGluZTogbGluZS10aHJvdWdoO1xcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb24tbGluZTogbGluZS10aHJvdWdoO1xcbn1cXG4uYW50aWFsaWFzZWQge1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcbn1cXG4ub3BhY2l0eS0yNSB7XFxuICBvcGFjaXR5OiAwLjI1O1xcbn1cXG4ub3BhY2l0eS0wIHtcXG4gIG9wYWNpdHk6IDA7XFxufVxcbi5vcGFjaXR5LTEwMCB7XFxuICBvcGFjaXR5OiAxO1xcbn1cXG4uc2hhZG93LXNtIHtcXG4gIC0tdHctc2hhZG93OiAwIDFweCAycHggMCByZ2IoMCAwIDAgLyAwLjA1KTtcXG4gIC0tdHctc2hhZG93LWNvbG9yZWQ6IDAgMXB4IDJweCAwIHZhcigtLXR3LXNoYWRvdy1jb2xvcik7XFxuICBib3gtc2hhZG93OiB2YXIoLS10dy1yaW5nLW9mZnNldC1zaGFkb3csIDAgMCAjMDAwMCksIHZhcigtLXR3LXJpbmctc2hhZG93LCAwIDAgIzAwMDApLCB2YXIoLS10dy1zaGFkb3cpO1xcbn1cXG4uc2hhZG93IHtcXG4gIC0tdHctc2hhZG93OiAwIDFweCAzcHggMCByZ2IoMCAwIDAgLyAwLjEpLCAwIDFweCAycHggLTFweCByZ2IoMCAwIDAgLyAwLjEpO1xcbiAgLS10dy1zaGFkb3ctY29sb3JlZDogMCAxcHggM3B4IDAgdmFyKC0tdHctc2hhZG93LWNvbG9yKSwgMCAxcHggMnB4IC0xcHggdmFyKC0tdHctc2hhZG93LWNvbG9yKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdywgMCAwICMwMDAwKSwgdmFyKC0tdHctcmluZy1zaGFkb3csIDAgMCAjMDAwMCksIHZhcigtLXR3LXNoYWRvdyk7XFxufVxcbi5zaGFkb3ctbGcge1xcbiAgLS10dy1zaGFkb3c6IDAgMTBweCAxNXB4IC0zcHggcmdiKDAgMCAwIC8gMC4xKSwgMCA0cHggNnB4IC00cHggcmdiKDAgMCAwIC8gMC4xKTtcXG4gIC0tdHctc2hhZG93LWNvbG9yZWQ6IDAgMTBweCAxNXB4IC0zcHggdmFyKC0tdHctc2hhZG93LWNvbG9yKSwgMCA0cHggNnB4IC00cHggdmFyKC0tdHctc2hhZG93LWNvbG9yKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdywgMCAwICMwMDAwKSwgdmFyKC0tdHctcmluZy1zaGFkb3csIDAgMCAjMDAwMCksIHZhcigtLXR3LXNoYWRvdyk7XFxufVxcbi5zaGFkb3ctbWQge1xcbiAgLS10dy1zaGFkb3c6IDAgNHB4IDZweCAtMXB4IHJnYigwIDAgMCAvIDAuMSksIDAgMnB4IDRweCAtMnB4IHJnYigwIDAgMCAvIDAuMSk7XFxuICAtLXR3LXNoYWRvdy1jb2xvcmVkOiAwIDRweCA2cHggLTFweCB2YXIoLS10dy1zaGFkb3ctY29sb3IpLCAwIDJweCA0cHggLTJweCB2YXIoLS10dy1zaGFkb3ctY29sb3IpO1xcbiAgYm94LXNoYWRvdzogdmFyKC0tdHctcmluZy1vZmZzZXQtc2hhZG93LCAwIDAgIzAwMDApLCB2YXIoLS10dy1yaW5nLXNoYWRvdywgMCAwICMwMDAwKSwgdmFyKC0tdHctc2hhZG93KTtcXG59XFxuLnJpbmctMSB7XFxuICAtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdzogdmFyKC0tdHctcmluZy1pbnNldCkgMCAwIDAgdmFyKC0tdHctcmluZy1vZmZzZXQtd2lkdGgpIHZhcigtLXR3LXJpbmctb2Zmc2V0LWNvbG9yKTtcXG4gIC0tdHctcmluZy1zaGFkb3c6IHZhcigtLXR3LXJpbmctaW5zZXQpIDAgMCAwIGNhbGMoMXB4ICsgdmFyKC0tdHctcmluZy1vZmZzZXQtd2lkdGgpKSB2YXIoLS10dy1yaW5nLWNvbG9yKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdyksIHZhcigtLXR3LXJpbmctc2hhZG93KSwgdmFyKC0tdHctc2hhZG93LCAwIDAgIzAwMDApO1xcbn1cXG4ucmluZy1ncmF5LTMwMCB7XFxuICAtLXR3LXJpbmctb3BhY2l0eTogMTtcXG4gIC0tdHctcmluZy1jb2xvcjogcmdiKDIwOSAyMTMgMjE5IC8gdmFyKC0tdHctcmluZy1vcGFjaXR5KSk7XFxufVxcbi5yaW5nLWJsYWNrIHtcXG4gIC0tdHctcmluZy1vcGFjaXR5OiAxO1xcbiAgLS10dy1yaW5nLWNvbG9yOiByZ2IoMCAwIDAgLyB2YXIoLS10dy1yaW5nLW9wYWNpdHkpKTtcXG59XFxuLnJpbmctb3BhY2l0eS01IHtcXG4gIC0tdHctcmluZy1vcGFjaXR5OiAwLjA1O1xcbn1cXG4uZHJvcC1zaGFkb3ctbGcge1xcbiAgLS10dy1kcm9wLXNoYWRvdzogZHJvcC1zaGFkb3coMCAxMHB4IDhweCByZ2IoMCAwIDAgLyAwLjA0KSkgZHJvcC1zaGFkb3coMCA0cHggM3B4IHJnYigwIDAgMCAvIDAuMSkpO1xcbiAgZmlsdGVyOiB2YXIoLS10dy1ibHVyKSB2YXIoLS10dy1icmlnaHRuZXNzKSB2YXIoLS10dy1jb250cmFzdCkgdmFyKC0tdHctZ3JheXNjYWxlKSB2YXIoLS10dy1odWUtcm90YXRlKSB2YXIoLS10dy1pbnZlcnQpIHZhcigtLXR3LXNhdHVyYXRlKSB2YXIoLS10dy1zZXBpYSkgdmFyKC0tdHctZHJvcC1zaGFkb3cpO1xcbn1cXG4udHJhbnNpdGlvbiB7XFxuICB0cmFuc2l0aW9uLXByb3BlcnR5OiBjb2xvciwgYmFja2dyb3VuZC1jb2xvciwgYm9yZGVyLWNvbG9yLCBmaWxsLCBzdHJva2UsIG9wYWNpdHksIGJveC1zaGFkb3csIHRyYW5zZm9ybSwgZmlsdGVyLCAtd2Via2l0LXRleHQtZGVjb3JhdGlvbi1jb2xvciwgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI7XFxuICB0cmFuc2l0aW9uLXByb3BlcnR5OiBjb2xvciwgYmFja2dyb3VuZC1jb2xvciwgYm9yZGVyLWNvbG9yLCB0ZXh0LWRlY29yYXRpb24tY29sb3IsIGZpbGwsIHN0cm9rZSwgb3BhY2l0eSwgYm94LXNoYWRvdywgdHJhbnNmb3JtLCBmaWx0ZXIsIGJhY2tkcm9wLWZpbHRlcjtcXG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3IsIHRleHQtZGVjb3JhdGlvbi1jb2xvciwgZmlsbCwgc3Ryb2tlLCBvcGFjaXR5LCBib3gtc2hhZG93LCB0cmFuc2Zvcm0sIGZpbHRlciwgYmFja2Ryb3AtZmlsdGVyLCAtd2Via2l0LXRleHQtZGVjb3JhdGlvbi1jb2xvciwgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI7XFxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDE1MG1zO1xcbn1cXG4udHJhbnNpdGlvbi1hbGwge1xcbiAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogYWxsO1xcbiAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAxNTBtcztcXG59XFxuLmR1cmF0aW9uLTE1MCB7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAxNTBtcztcXG59XFxuLmR1cmF0aW9uLTIwMCB7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAyMDBtcztcXG59XFxuLmR1cmF0aW9uLTc1IHtcXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDc1bXM7XFxufVxcbi5kdXJhdGlvbi0xMDAge1xcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMTAwbXM7XFxufVxcbi5kdXJhdGlvbi01MDAge1xcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogNTAwbXM7XFxufVxcbi5lYXNlLWluLW91dCB7XFxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcXG59XFxuLmVhc2Utb3V0IHtcXG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcXG59XFxuLmVhc2UtaW4ge1xcbiAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAsIDEsIDEpO1xcbn1cXG4uZWFzZS1saW5lYXIge1xcbiAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcXG59XFxuLmxpbmUtY2xhbXAtMiB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xcbiAgLXdlYmtpdC1saW5lLWNsYW1wOiAyO1xcbn1cXG4ubGluZS1jbGFtcC0zIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWxpbmUtY2xhbXA6IDM7XFxufVxcbi5zY3JvbGxiYXItaGlkZSB7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IG5vbmU7XFxuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XFxufVxcbi5zY3JvbGxiYXItaGlkZTo6LXdlYmtpdC1zY3JvbGxiYXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLypcXG7igJxIYXZlIHRoZSBjb3VyYWdlIHRvIGZvbGxvdyB5b3VyIGhlYXJ0IGFuZCBpbnR1aXRpb24uIFRoZXkgc29tZWhvdyBhbHJlYWR5IGtub3cgd2hhdCB5b3UgdHJ1bHkgd2FudCB0byBiZWNvbWUuIEV2ZXJ5dGhpbmcgZWxzZSBpcyBzZWNvbmRhcnku4oCdXFxu4oCVIFN0ZXZlIEpvYnNcXG4qL1xcblxcbi5ob3ZlclxcXFw6Y3Vyc29yLXBvaW50ZXI6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uaG92ZXJcXFxcOmJvcmRlci1ncmF5LTMwMDpob3ZlciB7XFxuICAtLXR3LWJvcmRlci1vcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2IoMjA5IDIxMyAyMTkgLyB2YXIoLS10dy1ib3JkZXItb3BhY2l0eSkpO1xcbn1cXG5cXG4uaG92ZXJcXFxcOmJvcmRlci1zbGF0ZS05MDA6aG92ZXIge1xcbiAgLS10dy1ib3JkZXItb3BhY2l0eTogMTtcXG4gIGJvcmRlci1jb2xvcjogcmdiKDE1IDIzIDQyIC8gdmFyKC0tdHctYm9yZGVyLW9wYWNpdHkpKTtcXG59XFxuXFxuLmhvdmVyXFxcXDpiZy1ncmF5LTEwMDpob3ZlciB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQzIDI0NCAyNDYgLyB2YXIoLS10dy1iZy1vcGFjaXR5KSk7XFxufVxcblxcbi5ob3ZlclxcXFw6YmctYmx1ZS04MDA6aG92ZXIge1xcbiAgLS10dy1iZy1vcGFjaXR5OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMwIDY2IDE1OSAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuXFxuLmhvdmVyXFxcXDpiZy1zbGF0ZS01MDpob3ZlciB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ4IDI1MCAyNTIgLyB2YXIoLS10dy1iZy1vcGFjaXR5KSk7XFxufVxcblxcbi5ob3ZlclxcXFw6Ymctc2xhdGUtMTAwOmhvdmVyIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDEgMjQ1IDI0OSAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuXFxuLmhvdmVyXFxcXDpiZy1za3ktMzAwOmhvdmVyIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxMjUgMjExIDI1MiAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuXFxuLmhvdmVyXFxcXDpiZy1ncmF5LTUwOmhvdmVyIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDkgMjUwIDI1MSAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuXFxuLmhvdmVyXFxcXDpiZy1pbmRpZ28tNjAwOmhvdmVyIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig4OCA4MCAyMzYgLyB2YXIoLS10dy1iZy1vcGFjaXR5KSk7XFxufVxcblxcbi5ob3ZlclxcXFw6YmctZ3JheS04MDA6aG92ZXIge1xcbiAgLS10dy1iZy1vcGFjaXR5OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMxIDQxIDU1IC8gdmFyKC0tdHctYmctb3BhY2l0eSkpO1xcbn1cXG5cXG4uaG92ZXJcXFxcOmJnLXNreS04MDA6aG92ZXIge1xcbiAgLS10dy1iZy1vcGFjaXR5OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDcgODkgMTMzIC8gdmFyKC0tdHctYmctb3BhY2l0eSkpO1xcbn1cXG5cXG4uaG92ZXJcXFxcOnRleHQtZ3JheS01MDA6aG92ZXIge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDEwNyAxMTQgMTI4IC8gdmFyKC0tdHctdGV4dC1vcGFjaXR5KSk7XFxufVxcblxcbi5ob3ZlclxcXFw6dGV4dC1ncmF5LTQwMDpob3ZlciB7XFxuICAtLXR3LXRleHQtb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoMTU2IDE2MyAxNzUgLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuXFxuLmhvdmVyXFxcXDp0ZXh0LXNsYXRlLTcwMDpob3ZlciB7XFxuICAtLXR3LXRleHQtb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoNTEgNjUgODUgLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuXFxuLmhvdmVyXFxcXDp0ZXh0LWdyYXktNzAwOmhvdmVyIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYig1NSA2NSA4MSAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG5cXG4uaG92ZXJcXFxcOnRleHQtd2hpdGU6aG92ZXIge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDI1NSAyNTUgMjU1IC8gdmFyKC0tdHctdGV4dC1vcGFjaXR5KSk7XFxufVxcblxcbi5ob3ZlclxcXFw6dGV4dC1ncmF5LTgwMDpob3ZlciB7XFxuICAtLXR3LXRleHQtb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoMzEgNDEgNTUgLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuXFxuLmhvdmVyXFxcXDp0ZXh0LXJlZC01MDA6aG92ZXIge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDI0MCA4MiA4MiAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG5cXG4uaG92ZXJcXFxcOnRleHQtc2xhdGUtOTAwOmhvdmVyIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYigxNSAyMyA0MiAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG5cXG4uaG92ZXJcXFxcOnRleHQtZ3JheS05MDA6aG92ZXIge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDE3IDI0IDM5IC8gdmFyKC0tdHctdGV4dC1vcGFjaXR5KSk7XFxufVxcblxcbi5ob3ZlclxcXFw6dW5kZXJsaW5lOmhvdmVyIHtcXG4gIC13ZWJraXQtdGV4dC1kZWNvcmF0aW9uLWxpbmU6IHVuZGVybGluZTtcXG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uLWxpbmU6IHVuZGVybGluZTtcXG59XFxuXFxuLmZvY3VzXFxcXDp6LTEwOmZvY3VzIHtcXG4gIHotaW5kZXg6IDEwO1xcbn1cXG5cXG4uZm9jdXNcXFxcOmJvcmRlci1ibHVlLTMwMDpmb2N1cyB7XFxuICAtLXR3LWJvcmRlci1vcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2IoMTY0IDIwMiAyNTQgLyB2YXIoLS10dy1ib3JkZXItb3BhY2l0eSkpO1xcbn1cXG5cXG4uZm9jdXNcXFxcOmJvcmRlci1pbmRpZ28tMzAwOmZvY3VzIHtcXG4gIC0tdHctYm9yZGVyLW9wYWNpdHk6IDE7XFxuICBib3JkZXItY29sb3I6IHJnYigxODAgMTk4IDI1MiAvIHZhcigtLXR3LWJvcmRlci1vcGFjaXR5KSk7XFxufVxcblxcbi5mb2N1c1xcXFw6Ym9yZGVyLWluZGlnby03MDA6Zm9jdXMge1xcbiAgLS10dy1ib3JkZXItb3BhY2l0eTogMTtcXG4gIGJvcmRlci1jb2xvcjogcmdiKDgxIDY5IDIwNSAvIHZhcigtLXR3LWJvcmRlci1vcGFjaXR5KSk7XFxufVxcblxcbi5mb2N1c1xcXFw6Ym9yZGVyLWdyYXktMzAwOmZvY3VzIHtcXG4gIC0tdHctYm9yZGVyLW9wYWNpdHk6IDE7XFxuICBib3JkZXItY29sb3I6IHJnYigyMDkgMjEzIDIxOSAvIHZhcigtLXR3LWJvcmRlci1vcGFjaXR5KSk7XFxufVxcblxcbi5mb2N1c1xcXFw6Ym9yZGVyLWJsdWUtNTAwOmZvY3VzIHtcXG4gIC0tdHctYm9yZGVyLW9wYWNpdHk6IDE7XFxuICBib3JkZXItY29sb3I6IHJnYig2MyAxMzEgMjQ4IC8gdmFyKC0tdHctYm9yZGVyLW9wYWNpdHkpKTtcXG59XFxuXFxuLmZvY3VzXFxcXDpib3JkZXItYmx1ZS00MDA6Zm9jdXMge1xcbiAgLS10dy1ib3JkZXItb3BhY2l0eTogMTtcXG4gIGJvcmRlci1jb2xvcjogcmdiKDExOCAxNjkgMjUwIC8gdmFyKC0tdHctYm9yZGVyLW9wYWNpdHkpKTtcXG59XFxuXFxuLmZvY3VzXFxcXDpiZy1ncmF5LTEwMDpmb2N1cyB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQzIDI0NCAyNDYgLyB2YXIoLS10dy1iZy1vcGFjaXR5KSk7XFxufVxcblxcbi5mb2N1c1xcXFw6Ymctc2t5LTQwMDpmb2N1cyB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTYgMTg5IDI0OCAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuXFxuLmZvY3VzXFxcXDpiZy1pbmRpZ28tMTAwOmZvY3VzIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjkgMjM3IDI1NSAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuXFxuLmZvY3VzXFxcXDp0ZXh0LWdyYXktNzAwOmZvY3VzIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYig1NSA2NSA4MSAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG5cXG4uZm9jdXNcXFxcOnRleHQtd2hpdGU6Zm9jdXMge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDI1NSAyNTUgMjU1IC8gdmFyKC0tdHctdGV4dC1vcGFjaXR5KSk7XFxufVxcblxcbi5mb2N1c1xcXFw6dGV4dC1pbmRpZ28tODAwOmZvY3VzIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYig2NiA1NiAxNTcgLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuXFxuLmZvY3VzXFxcXDp0ZXh0LWdyYXktNTAwOmZvY3VzIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYigxMDcgMTE0IDEyOCAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG5cXG4uZm9jdXNcXFxcOm91dGxpbmUtbm9uZTpmb2N1cyB7XFxuICBvdXRsaW5lOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICBvdXRsaW5lLW9mZnNldDogMnB4O1xcbn1cXG5cXG4uZm9jdXNcXFxcOnJpbmc6Zm9jdXMge1xcbiAgLS10dy1yaW5nLW9mZnNldC1zaGFkb3c6IHZhcigtLXR3LXJpbmctaW5zZXQpIDAgMCAwIHZhcigtLXR3LXJpbmctb2Zmc2V0LXdpZHRoKSB2YXIoLS10dy1yaW5nLW9mZnNldC1jb2xvcik7XFxuICAtLXR3LXJpbmctc2hhZG93OiB2YXIoLS10dy1yaW5nLWluc2V0KSAwIDAgMCBjYWxjKDNweCArIHZhcigtLXR3LXJpbmctb2Zmc2V0LXdpZHRoKSkgdmFyKC0tdHctcmluZy1jb2xvcik7XFxuICBib3gtc2hhZG93OiB2YXIoLS10dy1yaW5nLW9mZnNldC1zaGFkb3cpLCB2YXIoLS10dy1yaW5nLXNoYWRvdyksIHZhcigtLXR3LXNoYWRvdywgMCAwICMwMDAwKTtcXG59XFxuXFxuLmZvY3VzXFxcXDpyaW5nLTQ6Zm9jdXMge1xcbiAgLS10dy1yaW5nLW9mZnNldC1zaGFkb3c6IHZhcigtLXR3LXJpbmctaW5zZXQpIDAgMCAwIHZhcigtLXR3LXJpbmctb2Zmc2V0LXdpZHRoKSB2YXIoLS10dy1yaW5nLW9mZnNldC1jb2xvcik7XFxuICAtLXR3LXJpbmctc2hhZG93OiB2YXIoLS10dy1yaW5nLWluc2V0KSAwIDAgMCBjYWxjKDRweCArIHZhcigtLXR3LXJpbmctb2Zmc2V0LXdpZHRoKSkgdmFyKC0tdHctcmluZy1jb2xvcik7XFxuICBib3gtc2hhZG93OiB2YXIoLS10dy1yaW5nLW9mZnNldC1zaGFkb3cpLCB2YXIoLS10dy1yaW5nLXNoYWRvdyksIHZhcigtLXR3LXNoYWRvdywgMCAwICMwMDAwKTtcXG59XFxuXFxuLmZvY3VzXFxcXDpyaW5nLTI6Zm9jdXMge1xcbiAgLS10dy1yaW5nLW9mZnNldC1zaGFkb3c6IHZhcigtLXR3LXJpbmctaW5zZXQpIDAgMCAwIHZhcigtLXR3LXJpbmctb2Zmc2V0LXdpZHRoKSB2YXIoLS10dy1yaW5nLW9mZnNldC1jb2xvcik7XFxuICAtLXR3LXJpbmctc2hhZG93OiB2YXIoLS10dy1yaW5nLWluc2V0KSAwIDAgMCBjYWxjKDJweCArIHZhcigtLXR3LXJpbmctb2Zmc2V0LXdpZHRoKSkgdmFyKC0tdHctcmluZy1jb2xvcik7XFxuICBib3gtc2hhZG93OiB2YXIoLS10dy1yaW5nLW9mZnNldC1zaGFkb3cpLCB2YXIoLS10dy1yaW5nLXNoYWRvdyksIHZhcigtLXR3LXNoYWRvdywgMCAwICMwMDAwKTtcXG59XFxuXFxuLmZvY3VzXFxcXDpyaW5nLWluZGlnby0yMDA6Zm9jdXMge1xcbiAgLS10dy1yaW5nLW9wYWNpdHk6IDE7XFxuICAtLXR3LXJpbmctY29sb3I6IHJnYigyMDUgMjE5IDI1NCAvIHZhcigtLXR3LXJpbmctb3BhY2l0eSkpO1xcbn1cXG5cXG4uZm9jdXNcXFxcOnJpbmctYmx1ZS0zMDA6Zm9jdXMge1xcbiAgLS10dy1yaW5nLW9wYWNpdHk6IDE7XFxuICAtLXR3LXJpbmctY29sb3I6IHJnYigxNjQgMjAyIDI1NCAvIHZhcigtLXR3LXJpbmctb3BhY2l0eSkpO1xcbn1cXG5cXG4uZm9jdXNcXFxcOnJpbmctc2t5LTcwMDpmb2N1cyB7XFxuICAtLXR3LXJpbmctb3BhY2l0eTogMTtcXG4gIC0tdHctcmluZy1jb2xvcjogcmdiKDMgMTA1IDE2MSAvIHZhcigtLXR3LXJpbmctb3BhY2l0eSkpO1xcbn1cXG5cXG4uZm9jdXNcXFxcOnJpbmctYmx1ZS01MDA6Zm9jdXMge1xcbiAgLS10dy1yaW5nLW9wYWNpdHk6IDE7XFxuICAtLXR3LXJpbmctY29sb3I6IHJnYig2MyAxMzEgMjQ4IC8gdmFyKC0tdHctcmluZy1vcGFjaXR5KSk7XFxufVxcblxcbi5mb2N1c1xcXFw6cmluZy1zbGF0ZS0zMDA6Zm9jdXMge1xcbiAgLS10dy1yaW5nLW9wYWNpdHk6IDE7XFxuICAtLXR3LXJpbmctY29sb3I6IHJnYigyMDMgMjEzIDIyNSAvIHZhcigtLXR3LXJpbmctb3BhY2l0eSkpO1xcbn1cXG5cXG4uZm9jdXNcXFxcOnJpbmctYmx1ZS00MDA6Zm9jdXMge1xcbiAgLS10dy1yaW5nLW9wYWNpdHk6IDE7XFxuICAtLXR3LXJpbmctY29sb3I6IHJnYigxMTggMTY5IDI1MCAvIHZhcigtLXR3LXJpbmctb3BhY2l0eSkpO1xcbn1cXG5cXG4uZm9jdXNcXFxcOnJpbmctY3lhbi0yMDA6Zm9jdXMge1xcbiAgLS10dy1yaW5nLW9wYWNpdHk6IDE7XFxuICAtLXR3LXJpbmctY29sb3I6IHJnYigxNjUgMjQzIDI1MiAvIHZhcigtLXR3LXJpbmctb3BhY2l0eSkpO1xcbn1cXG5cXG4uZm9jdXNcXFxcOnJpbmctb3BhY2l0eS01MDpmb2N1cyB7XFxuICAtLXR3LXJpbmctb3BhY2l0eTogMC41O1xcbn1cXG5cXG4uZm9jdXMtdmlzaWJsZVxcXFw6cmluZy0yOmZvY3VzLXZpc2libGUge1xcbiAgLS10dy1yaW5nLW9mZnNldC1zaGFkb3c6IHZhcigtLXR3LXJpbmctaW5zZXQpIDAgMCAwIHZhcigtLXR3LXJpbmctb2Zmc2V0LXdpZHRoKSB2YXIoLS10dy1yaW5nLW9mZnNldC1jb2xvcik7XFxuICAtLXR3LXJpbmctc2hhZG93OiB2YXIoLS10dy1yaW5nLWluc2V0KSAwIDAgMCBjYWxjKDJweCArIHZhcigtLXR3LXJpbmctb2Zmc2V0LXdpZHRoKSkgdmFyKC0tdHctcmluZy1jb2xvcik7XFxuICBib3gtc2hhZG93OiB2YXIoLS10dy1yaW5nLW9mZnNldC1zaGFkb3cpLCB2YXIoLS10dy1yaW5nLXNoYWRvdyksIHZhcigtLXR3LXNoYWRvdywgMCAwICMwMDAwKTtcXG59XFxuXFxuLmZvY3VzLXZpc2libGVcXFxcOnJpbmctd2hpdGU6Zm9jdXMtdmlzaWJsZSB7XFxuICAtLXR3LXJpbmctb3BhY2l0eTogMTtcXG4gIC0tdHctcmluZy1jb2xvcjogcmdiKDI1NSAyNTUgMjU1IC8gdmFyKC0tdHctcmluZy1vcGFjaXR5KSk7XFxufVxcblxcbi5mb2N1cy12aXNpYmxlXFxcXDpyaW5nLW9wYWNpdHktNzU6Zm9jdXMtdmlzaWJsZSB7XFxuICAtLXR3LXJpbmctb3BhY2l0eTogMC43NTtcXG59XFxuXFxuLmFjdGl2ZVxcXFw6YmctZ3JheS0xMDA6YWN0aXZlIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDMgMjQ0IDI0NiAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuXFxuLmFjdGl2ZVxcXFw6YmctYmx1ZS05MDA6YWN0aXZlIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzNSA1NiAxMTggLyB2YXIoLS10dy1iZy1vcGFjaXR5KSk7XFxufVxcblxcbi5hY3RpdmVcXFxcOnRleHQtZ3JheS03MDA6YWN0aXZlIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYig1NSA2NSA4MSAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG5cXG4uYWN0aXZlXFxcXDp0ZXh0LWdyYXktNTAwOmFjdGl2ZSB7XFxuICAtLXR3LXRleHQtb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoMTA3IDExNCAxMjggLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuXFxuLmdyb3VwOmhvdmVyIC5ncm91cC1ob3ZlclxcXFw6bGVmdC0xNCB7XFxuICBsZWZ0OiAzLjVyZW07XFxufVxcblxcbi5ncm91cDpob3ZlciAuZ3JvdXAtaG92ZXJcXFxcOnctZml0IHtcXG4gIHdpZHRoOiAtbW96LWZpdC1jb250ZW50O1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbn1cXG5cXG4uZ3JvdXA6aG92ZXIgLmdyb3VwLWhvdmVyXFxcXDpiZy13aGl0ZVxcXFwvNTAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSAyNTUgMjU1IC8gMC41KTtcXG59XFxuXFxuLmdyb3VwOmhvdmVyIC5ncm91cC1ob3ZlclxcXFw6Ymctb3BhY2l0eS0wIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMDtcXG59XFxuXFxuLmdyb3VwOmhvdmVyIC5ncm91cC1ob3ZlclxcXFw6ZnJvbS1jeWFuLTUwMCB7XFxuICAtLXR3LWdyYWRpZW50LWZyb206ICMwNmI2ZDQ7XFxuICAtLXR3LWdyYWRpZW50LXRvOiByZ2IoNiAxODIgMjEyIC8gMCk7XFxuICAtLXR3LWdyYWRpZW50LXN0b3BzOiB2YXIoLS10dy1ncmFkaWVudC1mcm9tKSwgdmFyKC0tdHctZ3JhZGllbnQtdG8pO1xcbn1cXG5cXG4uZ3JvdXA6aG92ZXIgLmdyb3VwLWhvdmVyXFxcXDpmcm9tLWN5YW4tMzAwIHtcXG4gIC0tdHctZ3JhZGllbnQtZnJvbTogIzY3ZThmOTtcXG4gIC0tdHctZ3JhZGllbnQtdG86IHJnYigxMDMgMjMyIDI0OSAvIDApO1xcbiAgLS10dy1ncmFkaWVudC1zdG9wczogdmFyKC0tdHctZ3JhZGllbnQtZnJvbSksIHZhcigtLXR3LWdyYWRpZW50LXRvKTtcXG59XFxuXFxuLmdyb3VwOmhvdmVyIC5ncm91cC1ob3ZlclxcXFw6dG8tYmx1ZS01MDAge1xcbiAgLS10dy1ncmFkaWVudC10bzogIzNGODNGODtcXG59XFxuXFxuLmdyb3VwOmhvdmVyIC5ncm91cC1ob3ZlclxcXFw6dG8tc2t5LTUwMCB7XFxuICAtLXR3LWdyYWRpZW50LXRvOiAjMGVhNWU5O1xcbn1cXG5cXG4uZ3JvdXA6aG92ZXIgLmdyb3VwLWhvdmVyXFxcXDpweC0yIHtcXG4gIHBhZGRpbmctbGVmdDogMC41cmVtO1xcbiAgcGFkZGluZy1yaWdodDogMC41cmVtO1xcbn1cXG5cXG4uZ3JvdXA6aG92ZXIgLmdyb3VwLWhvdmVyXFxcXDpweS0xIHtcXG4gIHBhZGRpbmctdG9wOiAwLjI1cmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDAuMjVyZW07XFxufVxcblxcbi5ncm91cDpob3ZlciAuZ3JvdXAtaG92ZXJcXFxcOmR1cmF0aW9uLTMwMCB7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAzMDBtcztcXG59XFxuXFxuLmdyb3VwOmZvY3VzIC5ncm91cC1mb2N1c1xcXFw6b3V0bGluZS1ub25lIHtcXG4gIG91dGxpbmU6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIG91dGxpbmUtb2Zmc2V0OiAycHg7XFxufVxcblxcbi5ncm91cDpmb2N1cyAuZ3JvdXAtZm9jdXNcXFxcOnJpbmctNCB7XFxuICAtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdzogdmFyKC0tdHctcmluZy1pbnNldCkgMCAwIDAgdmFyKC0tdHctcmluZy1vZmZzZXQtd2lkdGgpIHZhcigtLXR3LXJpbmctb2Zmc2V0LWNvbG9yKTtcXG4gIC0tdHctcmluZy1zaGFkb3c6IHZhcigtLXR3LXJpbmctaW5zZXQpIDAgMCAwIGNhbGMoNHB4ICsgdmFyKC0tdHctcmluZy1vZmZzZXQtd2lkdGgpKSB2YXIoLS10dy1yaW5nLWNvbG9yKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLXR3LXJpbmctb2Zmc2V0LXNoYWRvdyksIHZhcigtLXR3LXJpbmctc2hhZG93KSwgdmFyKC0tdHctc2hhZG93LCAwIDAgIzAwMDApO1xcbn1cXG5cXG4uZ3JvdXA6Zm9jdXMgLmdyb3VwLWZvY3VzXFxcXDpyaW5nLXdoaXRlIHtcXG4gIC0tdHctcmluZy1vcGFjaXR5OiAxO1xcbiAgLS10dy1yaW5nLWNvbG9yOiByZ2IoMjU1IDI1NSAyNTUgLyB2YXIoLS10dy1yaW5nLW9wYWNpdHkpKTtcXG59XFxuXFxuLmRhcmsgLmRhcmtcXFxcOmJvcmRlci1ncmF5LTcwMCB7XFxuICAtLXR3LWJvcmRlci1vcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2IoNTUgNjUgODEgLyB2YXIoLS10dy1ib3JkZXItb3BhY2l0eSkpO1xcbn1cXG5cXG4uZGFyayAuZGFya1xcXFw6Ym9yZGVyLWdyYXktNjAwIHtcXG4gIC0tdHctYm9yZGVyLW9wYWNpdHk6IDE7XFxuICBib3JkZXItY29sb3I6IHJnYig3NSA4NSA5OSAvIHZhcigtLXR3LWJvcmRlci1vcGFjaXR5KSk7XFxufVxcblxcbi5kYXJrIC5kYXJrXFxcXDpiZy1ncmF5LTkwMCB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTcgMjQgMzkgLyB2YXIoLS10dy1iZy1vcGFjaXR5KSk7XFxufVxcblxcbi5kYXJrIC5kYXJrXFxcXDpiZy1ncmF5LTgwMCB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzEgNDEgNTUgLyB2YXIoLS10dy1iZy1vcGFjaXR5KSk7XFxufVxcblxcbi5kYXJrIC5kYXJrXFxcXDpiZy1ibHVlLTYwMCB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjggMTAwIDI0MiAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuXFxuLmRhcmsgLmRhcmtcXFxcOmJnLWdyYXktNzAwIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1NSA2NSA4MSAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuXFxuLmRhcmsgLmRhcmtcXFxcOmJnLWJsdWUtMjAwIHtcXG4gIC0tdHctYmctb3BhY2l0eTogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTUgMjIxIDI1MyAvIHZhcigtLXR3LWJnLW9wYWNpdHkpKTtcXG59XFxuXFxuLmRhcmsgLmRhcmtcXFxcOmJnLWdyYXktODAwXFxcXC8zMCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzEgNDEgNTUgLyAwLjMpO1xcbn1cXG5cXG4uZGFyayAuZGFya1xcXFw6dGV4dC1ncmF5LTUwMCB7XFxuICAtLXR3LXRleHQtb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoMTA3IDExNCAxMjggLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuXFxuLmRhcmsgLmRhcmtcXFxcOnRleHQtd2hpdGUge1xcbiAgLS10dy10ZXh0LW9wYWNpdHk6IDE7XFxuICBjb2xvcjogcmdiKDI1NSAyNTUgMjU1IC8gdmFyKC0tdHctdGV4dC1vcGFjaXR5KSk7XFxufVxcblxcbi5kYXJrIC5kYXJrXFxcXDp0ZXh0LWdyYXktNDAwIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYigxNTYgMTYzIDE3NSAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG5cXG4uZGFyayAuZGFya1xcXFw6dGV4dC1ibHVlLTgwMCB7XFxuICAtLXR3LXRleHQtb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoMzAgNjYgMTU5IC8gdmFyKC0tdHctdGV4dC1vcGFjaXR5KSk7XFxufVxcblxcbi5kYXJrIC5kYXJrXFxcXDp0ZXh0LWdyYXktMzAwIHtcXG4gIC0tdHctdGV4dC1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYigyMDkgMjEzIDIxOSAvIHZhcigtLXR3LXRleHQtb3BhY2l0eSkpO1xcbn1cXG5cXG4uZGFyayAuZGFya1xcXFw6dGV4dC1ncmF5LTgwMCB7XFxuICAtLXR3LXRleHQtb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoMzEgNDEgNTUgLyB2YXIoLS10dy10ZXh0LW9wYWNpdHkpKTtcXG59XFxuXFxuLmRhcmsgLmRhcmtcXFxcOnBsYWNlaG9sZGVyLWdyYXktNDAwOjotbW96LXBsYWNlaG9sZGVyIHtcXG4gIC0tdHctcGxhY2Vob2xkZXItb3BhY2l0eTogMTtcXG4gIGNvbG9yOiByZ2IoMTU2IDE2MyAxNzUgLyB2YXIoLS10dy1wbGFjZWhvbGRlci1vcGFjaXR5KSk7XFxufVxcblxcbi5kYXJrIC5kYXJrXFxcXDpwbGFjZWhvbGRlci1ncmF5LTQwMDo6cGxhY2Vob2xkZXIge1xcbiAgLS10dy1wbGFjZWhvbGRlci1vcGFjaXR5OiAxO1xcbiAgY29sb3I6IHJnYigxNTYgMTYzIDE3NSAvIHZhcigtLXR3LXBsYWNlaG9sZGVyLW9wYWNpdHkpKTtcXG59XFxuXFxuLmRhcmsgLmRhcmtcXFxcOmhvdmVyXFxcXDpiZy1ibHVlLTcwMDpob3ZlciB7XFxuICAtLXR3LWJnLW9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYgODYgMjE5IC8gdmFyKC0tdHctYmctb3BhY2l0eSkpO1xcbn1cXG5cXG4uZGFyayAuZGFya1xcXFw6Zm9jdXNcXFxcOmJvcmRlci1ibHVlLTUwMDpmb2N1cyB7XFxuICAtLXR3LWJvcmRlci1vcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2IoNjMgMTMxIDI0OCAvIHZhcigtLXR3LWJvcmRlci1vcGFjaXR5KSk7XFxufVxcblxcbi5kYXJrIC5kYXJrXFxcXDpmb2N1c1xcXFw6cmluZy1ibHVlLTgwMDpmb2N1cyB7XFxuICAtLXR3LXJpbmctb3BhY2l0eTogMTtcXG4gIC0tdHctcmluZy1jb2xvcjogcmdiKDMwIDY2IDE1OSAvIHZhcigtLXR3LXJpbmctb3BhY2l0eSkpO1xcbn1cXG5cXG4uZGFyayAuZGFya1xcXFw6Zm9jdXNcXFxcOnJpbmctYmx1ZS01MDA6Zm9jdXMge1xcbiAgLS10dy1yaW5nLW9wYWNpdHk6IDE7XFxuICAtLXR3LXJpbmctY29sb3I6IHJnYig2MyAxMzEgMjQ4IC8gdmFyKC0tdHctcmluZy1vcGFjaXR5KSk7XFxufVxcblxcbi5kYXJrIC5ncm91cDpob3ZlciAuZGFya1xcXFw6Z3JvdXAtaG92ZXJcXFxcOmJnLWdyYXktODAwXFxcXC82MCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzEgNDEgNTUgLyAwLjYpO1xcbn1cXG5cXG4uZGFyayAuZ3JvdXA6Zm9jdXMgLmRhcmtcXFxcOmdyb3VwLWZvY3VzXFxcXDpyaW5nLWdyYXktODAwXFxcXC83MCB7XFxuICAtLXR3LXJpbmctY29sb3I6IHJnYigzMSA0MSA1NSAvIDAuNyk7XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA2NDBweCkge1xcblxcbiAgLnNtXFxcXDotbXktcHgge1xcbiAgICBtYXJnaW4tdG9wOiAtMXB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiAtMXB4O1xcbiAgfVxcblxcbiAgLnNtXFxcXDpteC1hdXRvIHtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIH1cXG5cXG4gIC5zbVxcXFw6bWwtMCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwcHg7XFxuICB9XFxuXFxuICAuc21cXFxcOm1sLTEwIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDIuNXJlbTtcXG4gIH1cXG5cXG4gIC5zbVxcXFw6bWwtNiB7XFxuICAgIG1hcmdpbi1sZWZ0OiAxLjVyZW07XFxuICB9XFxuXFxuICAuc21cXFxcOmJsb2NrIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICB9XFxuXFxuICAuc21cXFxcOmZsZXgge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgfVxcblxcbiAgLnNtXFxcXDpncmlkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gIH1cXG5cXG4gIC5zbVxcXFw6aGlkZGVuIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG5cXG4gIC5zbVxcXFw6aC0yMCB7XFxuICAgIGhlaWdodDogNXJlbTtcXG4gIH1cXG5cXG4gIC5zbVxcXFw6aC0xMCB7XFxuICAgIGhlaWdodDogMi41cmVtO1xcbiAgfVxcblxcbiAgLnNtXFxcXDpoLTYge1xcbiAgICBoZWlnaHQ6IDEuNXJlbTtcXG4gIH1cXG5cXG4gIC5zbVxcXFw6dy1hdXRvIHtcXG4gICAgd2lkdGg6IGF1dG87XFxuICB9XFxuXFxuICAuc21cXFxcOnctMTAge1xcbiAgICB3aWR0aDogMi41cmVtO1xcbiAgfVxcblxcbiAgLnNtXFxcXDp3LTYge1xcbiAgICB3aWR0aDogMS41cmVtO1xcbiAgfVxcblxcbiAgLnNtXFxcXDp3LTFcXFxcLzQge1xcbiAgICB3aWR0aDogMjUlO1xcbiAgfVxcblxcbiAgLnNtXFxcXDptYXgtdy1tZCB7XFxuICAgIG1heC13aWR0aDogMjhyZW07XFxuICB9XFxuXFxuICAuc21cXFxcOm1heC13LTJ4bCB7XFxuICAgIG1heC13aWR0aDogNDJyZW07XFxuICB9XFxuXFxuICAuc21cXFxcOmZsZXgtMSB7XFxuICAgIGZsZXg6IDEgMSAwJTtcXG4gIH1cXG5cXG4gIC5zbVxcXFw6Z3JpZC1jb2xzLTMge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCBtaW5tYXgoMCwgMWZyKSk7XFxuICB9XFxuXFxuICAuc21cXFxcOml0ZW1zLWNlbnRlciB7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAuc21cXFxcOmp1c3RpZnktc3RhcnQge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICB9XFxuXFxuICAuc21cXFxcOmp1c3RpZnktY2VudGVyIHtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB9XFxuXFxuICAuc21cXFxcOmp1c3RpZnktYmV0d2VlbiB7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIH1cXG5cXG4gIC5zbVxcXFw6Z2FwLTIge1xcbiAgICBnYXA6IDAuNXJlbTtcXG4gIH1cXG5cXG4gIC5zbVxcXFw6cm91bmRlZC1sZyB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXG4gIH1cXG5cXG4gIC5zbVxcXFw6cHgtNiB7XFxuICAgIHBhZGRpbmctbGVmdDogMS41cmVtO1xcbiAgICBwYWRkaW5nLXJpZ2h0OiAxLjVyZW07XFxuICB9XFxuXFxuICAuc21cXFxcOnB4LTQge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XFxuICAgIHBhZGRpbmctcmlnaHQ6IDFyZW07XFxuICB9XFxuXFxuICAuc21cXFxcOnB5LTYge1xcbiAgICBwYWRkaW5nLXRvcDogMS41cmVtO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMS41cmVtO1xcbiAgfVxcblxcbiAgLnNtXFxcXDpwdC0wIHtcXG4gICAgcGFkZGluZy10b3A6IDBweDtcXG4gIH1cXG5cXG4gIC5zbVxcXFw6dGV4dC1sZWZ0IHtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIH1cXG5cXG4gIC5zbVxcXFw6dGV4dC1jZW50ZXIge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuXFxuICAuc21cXFxcOnRleHQtcmlnaHQge1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG4gIH1cXG5cXG4gIC5zbVxcXFw6dGV4dC0yeGwge1xcbiAgICBmb250LXNpemU6IDEuNXJlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDJyZW07XFxuICB9XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcblxcbiAgLm1kXFxcXDpvcmRlci0yIHtcXG4gICAgb3JkZXI6IDI7XFxuICB9XFxuXFxuICAubWRcXFxcOm9yZGVyLTEge1xcbiAgICBvcmRlcjogMTtcXG4gIH1cXG5cXG4gIC5tZFxcXFw6bXItMCB7XFxuICAgIG1hcmdpbi1yaWdodDogMHB4O1xcbiAgfVxcblxcbiAgLm1kXFxcXDpibG9jayB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgfVxcblxcbiAgLm1kXFxcXDpmbGV4IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gIH1cXG5cXG4gIC5tZFxcXFw6aGlkZGVuIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG5cXG4gIC5tZFxcXFw6aC1mdWxsIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgfVxcblxcbiAgLm1kXFxcXDp3LWF1dG8ge1xcbiAgICB3aWR0aDogYXV0bztcXG4gIH1cXG5cXG4gIC5tZFxcXFw6dy1cXFxcWzY1XFxcXCVcXFxcXSB7XFxuICAgIHdpZHRoOiA2NSU7XFxuICB9XFxuXFxuICAubWRcXFxcOnctXFxcXFszNVxcXFwlXFxcXF0ge1xcbiAgICB3aWR0aDogMzUlO1xcbiAgfVxcblxcbiAgLm1kXFxcXDptYXgtdy1cXFxcWzEwcmVtXFxcXF0ge1xcbiAgICBtYXgtd2lkdGg6IDEwcmVtO1xcbiAgfVxcblxcbiAgLm1kXFxcXDpncmlkLWNvbHMtMiB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIG1pbm1heCgwLCAxZnIpKTtcXG4gIH1cXG5cXG4gIC5tZFxcXFw6Z3JpZC1jb2xzLTQge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCBtaW5tYXgoMCwgMWZyKSk7XFxuICB9XFxuXFxuICAubWRcXFxcOmJvcmRlci10LTAge1xcbiAgICBib3JkZXItdG9wLXdpZHRoOiAwcHg7XFxuICB9XFxuXFxuICAubWRcXFxcOmJvcmRlci1sIHtcXG4gICAgYm9yZGVyLWxlZnQtd2lkdGg6IDFweDtcXG4gIH1cXG5cXG4gIC5tZFxcXFw6cGwtMiB7XFxuICAgIHBhZGRpbmctbGVmdDogMC41cmVtO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTAyNHB4KSB7XFxuXFxuICAubGdcXFxcOmNvbC1zcGFuLTQge1xcbiAgICBncmlkLWNvbHVtbjogc3BhbiA0IC8gc3BhbiA0O1xcbiAgfVxcblxcbiAgLmxnXFxcXDpjb2wtc3Bhbi0yIHtcXG4gICAgZ3JpZC1jb2x1bW46IHNwYW4gMiAvIHNwYW4gMjtcXG4gIH1cXG5cXG4gIC5sZ1xcXFw6cm93LXNwYW4tNiB7XFxuICAgIGdyaWQtcm93OiBzcGFuIDYgLyBzcGFuIDY7XFxuICB9XFxuXFxuICAubGdcXFxcOnJvdy1zcGFuLTMge1xcbiAgICBncmlkLXJvdzogc3BhbiAzIC8gc3BhbiAzO1xcbiAgfVxcblxcbiAgLmxnXFxcXDptYi00IHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG4gIH1cXG5cXG4gIC5sZ1xcXFw6YmxvY2sge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gIH1cXG5cXG4gIC5sZ1xcXFw6aC1mdWxsIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgfVxcblxcbiAgLmxnXFxcXDpoLTJcXFxcLzQge1xcbiAgICBoZWlnaHQ6IDUwJTtcXG4gIH1cXG5cXG4gIC5sZ1xcXFw6bWF4LXctXFxcXFsxMXJlbVxcXFxdIHtcXG4gICAgbWF4LXdpZHRoOiAxMXJlbTtcXG4gIH1cXG5cXG4gIC5sZ1xcXFw6Z3JpZC1jb2xzLTYge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCBtaW5tYXgoMCwgMWZyKSk7XFxuICB9XFxuXFxuICAubGdcXFxcOmdyaWQtcm93cy02IHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgbWlubWF4KDAsIDFmcikpO1xcbiAgfVxcblxcbiAgLmxnXFxcXDpweC04IHtcXG4gICAgcGFkZGluZy1sZWZ0OiAycmVtO1xcbiAgICBwYWRkaW5nLXJpZ2h0OiAycmVtO1xcbiAgfVxcblxcbiAgLmxnXFxcXDp0ZXh0LTN4bCB7XFxuICAgIGZvbnQtc2l6ZTogMS44NzVyZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAyLjI1cmVtO1xcbiAgfVxcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvc3JjL2Zsb3diaXRlLmNzc1wiLFwiPG5vIHNvdXJjZT5cIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7O0NBQWMsQ0FBZDs7O0NBQWM7O0FBQWQ7OztFQUFBLHNCQUFjLEVBQWQsTUFBYztFQUFkLGVBQWMsRUFBZCxNQUFjO0VBQWQsbUJBQWMsRUFBZCxNQUFjO0VBQWQscUJBQWMsRUFBZCxNQUFjO0FBQUE7O0FBQWQ7O0VBQUEsZ0JBQWM7QUFBQTs7QUFBZDs7Ozs7O0NBQWM7O0FBQWQ7RUFBQSxnQkFBYyxFQUFkLE1BQWM7RUFBZCw4QkFBYyxFQUFkLE1BQWM7RUFBZCxnQkFBYyxFQUFkLE1BQWM7RUFBZCxjQUFjO0tBQWQsV0FBYyxFQUFkLE1BQWM7RUFBZCxvT0FBYyxFQUFkLE1BQWM7RUFBZCw2QkFBYyxFQUFkLE1BQWM7QUFBQTs7QUFBZDs7O0NBQWM7O0FBQWQ7RUFBQSxTQUFjLEVBQWQsTUFBYztFQUFkLG9CQUFjLEVBQWQsTUFBYztBQUFBOztBQUFkOzs7O0NBQWM7O0FBQWQ7RUFBQSxTQUFjLEVBQWQsTUFBYztFQUFkLGNBQWMsRUFBZCxNQUFjO0VBQWQscUJBQWMsRUFBZCxNQUFjO0FBQUE7O0FBQWQ7O0NBQWM7O0FBQWQ7RUFBQSx5Q0FBYztVQUFkLGlDQUFjO0FBQUE7O0FBQWQ7O0NBQWM7O0FBQWQ7Ozs7OztFQUFBLGtCQUFjO0VBQWQsb0JBQWM7QUFBQTs7QUFBZDs7Q0FBYzs7QUFBZDtFQUFBLGNBQWM7RUFBZCx3QkFBYztBQUFBOztBQUFkOztDQUFjOztBQUFkOztFQUFBLG1CQUFjO0FBQUE7O0FBQWQ7OztDQUFjOztBQUFkOzs7O0VBQUEsK0dBQWMsRUFBZCxNQUFjO0VBQWQsY0FBYyxFQUFkLE1BQWM7QUFBQTs7QUFBZDs7Q0FBYzs7QUFBZDtFQUFBLGNBQWM7QUFBQTs7QUFBZDs7Q0FBYzs7QUFBZDs7RUFBQSxjQUFjO0VBQWQsY0FBYztFQUFkLGtCQUFjO0VBQWQsd0JBQWM7QUFBQTs7QUFBZDtFQUFBLGVBQWM7QUFBQTs7QUFBZDtFQUFBLFdBQWM7QUFBQTs7QUFBZDs7OztDQUFjOztBQUFkO0VBQUEsY0FBYyxFQUFkLE1BQWM7RUFBZCxxQkFBYyxFQUFkLE1BQWM7RUFBZCx5QkFBYyxFQUFkLE1BQWM7QUFBQTs7QUFBZDs7OztDQUFjOztBQUFkOzs7OztFQUFBLG9CQUFjLEVBQWQsTUFBYztFQUFkLGVBQWMsRUFBZCxNQUFjO0VBQWQsb0JBQWMsRUFBZCxNQUFjO0VBQWQsb0JBQWMsRUFBZCxNQUFjO0VBQWQsY0FBYyxFQUFkLE1BQWM7RUFBZCxTQUFjLEVBQWQsTUFBYztFQUFkLFVBQWMsRUFBZCxNQUFjO0FBQUE7O0FBQWQ7O0NBQWM7O0FBQWQ7O0VBQUEsb0JBQWM7QUFBQTs7QUFBZDs7O0NBQWM7O0FBQWQ7Ozs7RUFBQSwwQkFBYyxFQUFkLE1BQWM7RUFBZCw2QkFBYyxFQUFkLE1BQWM7RUFBZCxzQkFBYyxFQUFkLE1BQWM7QUFBQTs7QUFBZDs7Q0FBYzs7QUFBZDtFQUFBLGFBQWM7QUFBQTs7QUFBZDs7Q0FBYzs7QUFBZDtFQUFBLGdCQUFjO0FBQUE7O0FBQWQ7O0NBQWM7O0FBQWQ7RUFBQSx3QkFBYztBQUFBOztBQUFkOztDQUFjOztBQUFkOztFQUFBLFlBQWM7QUFBQTs7QUFBZDs7O0NBQWM7O0FBQWQ7RUFBQSw2QkFBYyxFQUFkLE1BQWM7RUFBZCxvQkFBYyxFQUFkLE1BQWM7QUFBQTs7QUFBZDs7Q0FBYzs7QUFBZDtFQUFBLHdCQUFjO0FBQUE7O0FBQWQ7OztDQUFjOztBQUFkO0VBQUEsMEJBQWMsRUFBZCxNQUFjO0VBQWQsYUFBYyxFQUFkLE1BQWM7QUFBQTs7QUFBZDs7Q0FBYzs7QUFBZDtFQUFBLGtCQUFjO0FBQUE7O0FBQWQ7O0NBQWM7O0FBQWQ7Ozs7Ozs7Ozs7Ozs7RUFBQSxTQUFjO0FBQUE7O0FBQWQ7RUFBQSxTQUFjO0VBQWQsVUFBYztBQUFBOztBQUFkO0VBQUEsVUFBYztBQUFBOztBQUFkOzs7RUFBQSxnQkFBYztFQUFkLFNBQWM7RUFBZCxVQUFjO0FBQUE7O0FBQWQ7O0NBQWM7O0FBQWQ7RUFBQSxnQkFBYztBQUFBOztBQUFkOzs7Q0FBYzs7QUFBZDtFQUFBLFVBQWMsRUFBZCxNQUFjO0VBQWQsY0FBYyxFQUFkLE1BQWM7QUFBQTs7QUFBZDs7RUFBQSxVQUFjLEVBQWQsTUFBYztFQUFkLGNBQWMsRUFBZCxNQUFjO0FBQUE7O0FBQWQ7O0NBQWM7O0FBQWQ7O0VBQUEsZUFBYztBQUFBOztBQUFkOztDQUFjO0FBQWQ7RUFBQSxlQUFjO0FBQUE7O0FBQWQ7Ozs7Q0FBYzs7QUFBZDs7Ozs7Ozs7RUFBQSxjQUFjLEVBQWQsTUFBYztFQUFkLHNCQUFjLEVBQWQsTUFBYztBQUFBOztBQUFkOztDQUFjOztBQUFkOztFQUFBLGVBQWM7RUFBZCxZQUFjO0FBQUE7O0FBQWQsd0VBQWM7QUFBZDtFQUFBLGFBQWM7QUFBQTs7QUFBZDtFQUFBLHdCQUFjO0tBQWQscUJBQWM7VUFBZCxnQkFBYztFQUFkLHNCQUFjO0VBQWQscUJBQWM7RUFBZCxpQkFBYztFQUFkLGtCQUFjO0VBQWQsbUJBQWM7RUFBZCxzQkFBYztFQUFkLHNCQUFjO0VBQWQscUJBQWM7RUFBZCxlQUFjO0VBQWQsbUJBQWM7RUFBZCxzQkFBYztBQUFBOztBQUFkO0VBQUEsOEJBQWM7RUFBZCxtQkFBYztFQUFkLDRDQUFjO0VBQWQsMkJBQWM7RUFBZCw0QkFBYztFQUFkLHdCQUFjO0VBQWQsMkdBQWM7RUFBZCx5R0FBYztFQUFkLGlGQUFjO0VBQWQ7QUFBYzs7QUFBZDtFQUFBLGNBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEsY0FBYztFQUFkO0FBQWM7O0FBQWQ7RUFBQTtBQUFjOztBQUFkO0VBQUE7QUFBYzs7QUFBZDtFQUFBLGNBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEsbVBBQWM7RUFBZCx3Q0FBYztFQUFkLDRCQUFjO0VBQWQsNEJBQWM7RUFBZCxxQkFBYztFQUFkLGlDQUFjO1VBQWQ7QUFBYzs7QUFBZDtFQUFBLHlCQUFjO0VBQWQsNEJBQWM7RUFBZCx3QkFBYztFQUFkLHdCQUFjO0VBQWQsc0JBQWM7RUFBZCxpQ0FBYztVQUFkO0FBQWM7O0FBQWQ7RUFBQSx3QkFBYztLQUFkLHFCQUFjO1VBQWQsZ0JBQWM7RUFBZCxVQUFjO0VBQWQsaUNBQWM7VUFBZCxtQkFBYztFQUFkLHFCQUFjO0VBQWQsc0JBQWM7RUFBZCw2QkFBYztFQUFkLHlCQUFjO0tBQWQsc0JBQWM7VUFBZCxpQkFBYztFQUFkLGNBQWM7RUFBZCxZQUFjO0VBQWQsV0FBYztFQUFkLGNBQWM7RUFBZCxzQkFBYztFQUFkLHFCQUFjO0VBQWQsaUJBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUE7QUFBYzs7QUFBZDtFQUFBO0FBQWM7O0FBQWQ7RUFBQSw4QkFBYztFQUFkLG1CQUFjO0VBQWQsNENBQWM7RUFBZCwyQkFBYztFQUFkLDRCQUFjO0VBQWQsd0JBQWM7RUFBZCwyR0FBYztFQUFkLHlHQUFjO0VBQWQ7QUFBYzs7QUFBZDtFQUFBLHlCQUFjO0VBQWQsOEJBQWM7RUFBZCwwQkFBYztFQUFkLDJCQUFjO0VBQWQ7QUFBYzs7QUFBZDtFQUFBO0FBQWM7O0FBQWQ7RUFBQTtBQUFjOztBQUFkO0VBQUEseUJBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEsdU9BQWM7RUFBZCx5QkFBYztFQUFkLDhCQUFjO0VBQWQsMEJBQWM7RUFBZCwyQkFBYztFQUFkO0FBQWM7O0FBQWQ7RUFBQSx5QkFBYztFQUFkO0FBQWM7O0FBQWQ7RUFBQSxpQkFBYztFQUFkLHFCQUFjO0VBQWQsZUFBYztFQUFkLGdCQUFjO0VBQWQsVUFBYztFQUFkLGdCQUFjO0VBQWQ7QUFBYzs7QUFBZDtFQUFBO0FBQWM7O0FBQWQ7RUFBQSx3QkFBYztLQUFkLHFCQUFjO1VBQWQsZ0JBQWM7RUFBZCxzQkFBYztFQUFkLHFCQUFjO0VBQWQsaUJBQWM7RUFBZCxrQkFBYztFQUFkLG1CQUFjO0VBQWQsc0JBQWM7RUFBZCxzQkFBYztFQUFkLHFCQUFjO0VBQWQsZUFBYztFQUFkLG1CQUFjO0VBQWQsc0JBQWM7QUFBQTs7QUFBZDtFQUFBLDhCQUFjO0VBQWQsbUJBQWM7RUFBZCw0Q0FBYztFQUFkLDJCQUFjO0VBQWQsNEJBQWM7RUFBZCx3QkFBYztFQUFkLDJHQUFjO0VBQWQseUdBQWM7RUFBZCxpRkFBYztFQUFkO0FBQWM7O0FBQWQ7RUFBQSxjQUFjO0VBQWQ7QUFBYzs7QUFBZDtFQUFBLGNBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUE7QUFBYzs7QUFBZDtFQUFBO0FBQWM7O0FBQWQ7RUFBQSxtUEFBYztFQUFkLHdDQUFjO0VBQWQsNEJBQWM7RUFBZCw0QkFBYztFQUFkLHFCQUFjO0VBQWQ7QUFBYzs7QUFBZDtFQUFBLHlCQUFjO0VBQWQsNEJBQWM7RUFBZCx3QkFBYztFQUFkLHdCQUFjO0VBQWQsc0JBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEsd0JBQWM7S0FBZCxxQkFBYztVQUFkLGdCQUFjO0VBQWQsVUFBYztFQUFkLHlCQUFjO0VBQWQscUJBQWM7RUFBZCxzQkFBYztFQUFkLDZCQUFjO0VBQWQseUJBQWM7S0FBZCxzQkFBYztVQUFkLGlCQUFjO0VBQWQsY0FBYztFQUFkLFlBQWM7RUFBZCxXQUFjO0VBQWQsY0FBYztFQUFkLHNCQUFjO0VBQWQscUJBQWM7RUFBZCxpQkFBYztFQUFkO0FBQWM7O0FBQWQ7RUFBQTtBQUFjOztBQUFkO0VBQUE7QUFBYzs7QUFBZDtFQUFBLDhCQUFjO0VBQWQsbUJBQWM7RUFBZCw0Q0FBYztFQUFkLDJCQUFjO0VBQWQsNEJBQWM7RUFBZCx3QkFBYztFQUFkLDJHQUFjO0VBQWQseUdBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEseUJBQWM7RUFBZCw4QkFBYztFQUFkLDBCQUFjO0VBQWQsMkJBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUE7QUFBYzs7QUFBZDtFQUFBO0FBQWM7O0FBQWQ7RUFBQSx1T0FBYztFQUFkLHlCQUFjO0VBQWQsOEJBQWM7RUFBZCwwQkFBYztFQUFkLDJCQUFjO0VBQWQ7QUFBYzs7QUFBZDtFQUFBLHlCQUFjO0VBQWQ7QUFBYzs7QUFBZDtFQUFBLGlCQUFjO0VBQWQscUJBQWM7RUFBZCxlQUFjO0VBQWQsZ0JBQWM7RUFBZCxVQUFjO0VBQWQsZ0JBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUE7QUFBYzs7QUFBZDtFQUFBLFlBQWM7RUFBZCxtQkFBYztFQUFkLFNBQWM7RUFBZCxnQkFBYztFQUFkLG1CQUFjO0VBQWQsZUFBYztFQUFkLHFCQUFjO0VBQWQsd0JBQWM7RUFBZCxrQkFBYztFQUFkLG1CQUFjO0VBQWQsMkJBQWM7VUFBZCwwQkFBYztFQUFkLHdCQUFjO1VBQWQsdUJBQWM7QUFBQTs7QUFBZDtFQUFBO0FBQWM7O0FBQWQ7RUFBQSxZQUFjO0VBQWQsbUJBQWM7QUFBQTs7QUFBZDtFQUFBO0FBQWM7O0FBQWQ7RUFBQSxlQUFjO0VBQWQsY0FBYztFQUFkLG1CQUFjO0VBQWQscUJBQWM7RUFBZCxTQUFjO0VBQWQsZ0JBQWM7RUFBZCxxQkFBYztFQUFkLHdCQUFjO0VBQWQ7QUFBYzs7QUFBZDtFQUFBO0FBQWM7O0FBQWQ7RUFBQTtBQUFjOztBQUFkO0VBQUEsOEJBQWM7RUFBZCxtQkFBYztFQUFkLDJHQUFjO0VBQWQseUdBQWM7RUFBZCw0RkFBYztFQUFkLHNCQUFjO0VBQWQ7QUFBYzs7QUFBZDtFQUFBLGVBQWM7RUFBZCxjQUFjO0VBQWQsbUJBQWM7RUFBZCxxQkFBYztFQUFkLFNBQWM7RUFBZCxnQkFBYztFQUFkLHFCQUFjO0VBQWQsd0JBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUE7QUFBYzs7QUFBZDtFQUFBO0FBQWM7O0FBQWQ7RUFBQTtBQUFjOztBQUFkO0VBQUE7QUFBYzs7QUFBZDtFQUFBLGtCQUFjO0VBQWQsVUFBYztFQUFkLFdBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUE7QUFBYzs7QUFBZDtFQUFBLFdBQWM7RUFBZCxtQkFBYztFQUFkO0FBQWM7O0FBQWQ7RUFBQSxXQUFjO0VBQWQsbUJBQWM7RUFBZCx3QkFBYztFQUFkLGtCQUFjO0VBQWQsVUFBYztFQUFkLFdBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEsbUJBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEsbUJBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEsbUJBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEsbUJBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEsd0JBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEsd0JBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEsd0JBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEsd0JBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEscUJBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEscUJBQWM7RUFBZDtBQUFjOztBQUFkO0VBQUEscUJBQWM7RUFBZDtBQUFjOztBQUFkO0VB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QUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBLGlCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGtCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGtCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLG1CQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGtCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGtCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGdCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGdCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQSw0QkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUEsc0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsdUJBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsc0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsc0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEscUJBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsaUJBQW1CO0VBQW5CLGlCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGVBQW1CO0VBQW5CLGVBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQSx1QkFBbUI7RUFBbkIsb0RBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsdUJBQW1CO0VBQW5CLCtEQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHVCQUFtQjtFQUFuQiwrREFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSx3QkFBbUI7RUFBbkIsa0VBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsc0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBLGdCQUFtQjtFQUFuQix1QkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQSxnQ0FBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxpQ0FBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSw4QkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSwrQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSw4QkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxnQ0FBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQSxxQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxxQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQSxzQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxzQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBLHNCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHNCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHNCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHNCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHNCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHNCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHNCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHNCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHNCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHNCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHNCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHNCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHNCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGtCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGtCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGtCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGtCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGtCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGtCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUEsa0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsa0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsa0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsa0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsa0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsa0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsa0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsa0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsa0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsa0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsa0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsa0JBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQSxrQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBLDJCQUFtQjtFQUFuQixzQ0FBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSwyQkFBbUI7RUFBbkIsc0NBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBLG9CQUFtQjtLQUFuQjtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBLGtCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLG1CQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLG9CQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGlCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLG9CQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLG9CQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHNCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHFCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHFCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHFCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLG9CQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLHFCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLG1CQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGdCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLG9CQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLG1CQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLG9CQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGtCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGlCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGlCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQSxtQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxtQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxrQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxrQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxlQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLGlCQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSx1Q0FBbUI7VUFBbkI7QUFBbUI7QUFBbkI7RUFBQSwwQ0FBbUI7VUFBbkI7QUFBbUI7QUFBbkI7RUFBQSxtQ0FBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQSwwQ0FBbUI7RUFBbkIsdURBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsMEVBQW1CO0VBQW5CLDhGQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLCtFQUFtQjtFQUFuQixtR0FBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSw2RUFBbUI7RUFBbkIsaUdBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsMkdBQW1CO0VBQW5CLHlHQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLG9CQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBLG9CQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUEsbUdBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsd0tBQW1CO0VBQW5CLHdKQUFtQjtFQUFuQixnTkFBbUI7RUFBbkIsd0RBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsd0JBQW1CO0VBQW5CLHdEQUFtQjtFQUFuQjtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBO0FBQW1CO0FBQW5CO0VBQUE7QUFBbUI7QUFBbkI7RUFBQTtBQUFtQjtBQUFuQjtFQUFBLGdCQUFtQjtFQUFuQixvQkFBbUI7RUFBbkIsNEJBQW1CO0VBQW5CO0FBQW1CO0FBQW5CO0VBQUEsZ0JBQW1CO0VBQW5CLG9CQUFtQjtFQUFuQiw0QkFBbUI7RUFBbkI7QUFBbUI7QUFBbkI7RUFBQSx3QkFBbUI7RUFBbkIscUJBQW1CO0FBQUE7QUFBbkI7RUFBQTtBQUFtQjs7QUFFbkI7OztDQUdDOztBQVBEO0VBQUE7Q0NBQTs7QURBQTtFQUFBLHVCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHVCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLG1CQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLG1CQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLG1CQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLG1CQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLG1CQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLG1CQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLG1CQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLG1CQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLG1CQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHdDQ0FBO1VEQUE7Q0NBQTs7QURBQTtFQUFBO0NDQUE7O0FEQUE7RUFBQSx1QkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSx1QkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSx1QkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSx1QkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSx1QkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSx1QkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxtQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxtQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxtQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxxQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxxQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxxQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxxQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSwrQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSw0R0NBQTtFREFBLDBHQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLDRHQ0FBO0VEQUEsMEdDQUE7RURBQTtDQ0FBOztBREFBO0VBQUEsNEdDQUE7RURBQSwwR0NBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxxQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxxQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxxQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxxQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxxQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxxQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxxQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQTtDQ0FBOztBREFBO0VBQUEsNEdDQUE7RURBQSwwR0NBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSxxQkNBQTtFREFBO0NDQUE7O0FEQUE7RUFBQTtDQ0FBOztBREFBO0VBQUEsbUJDQUE7RURBQTtDQ0FBOztBREFBO0VBQUEsbUJDQUE7RURBQTtDQ0FBOztBREFBO0VBQUEscUJDQUE7RURBQTtDQ0FBOztBREFBO0VBQUEscUJDQUE7RURBQTtDQ0FBOztBREFBO0VBQUE7Q0NBQTs7QURBQTtFQUFBLHdCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBO0NDQUE7O0FEQUE7RUFBQTtDQ0FBOztBREFBO0VBQUEsNEJDQUE7RURBQSxxQ0NBQTtFREFBO0NDQUE7O0FEQUE7RUFBQSw0QkNBQTtFREFBLHVDQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBO0NDQUE7O0FEQUE7RUFBQTtDQ0FBOztBREFBO0VBQUEscUJDQUE7RURBQTtDQ0FBOztBREFBO0VBQUEscUJDQUE7RURBQTtDQ0FBOztBREFBO0VBQUE7Q0NBQTs7QURBQTtFQUFBLCtCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLDRHQ0FBO0VEQUEsMEdDQUE7RURBQTtDQ0FBOztBREFBO0VBQUEscUJDQUE7RURBQTtDQ0FBOztBREFBO0VBQUEsdUJDQUE7RURBQTtDQ0FBOztBREFBO0VBQUEsdUJDQUE7RURBQTtDQ0FBOztBREFBO0VBQUEsbUJDQUE7RURBQTtDQ0FBOztBREFBO0VBQUEsbUJDQUE7RURBQTtDQ0FBOztBREFBO0VBQUEsbUJDQUE7RURBQTtDQ0FBOztBREFBO0VBQUEsbUJDQUE7RURBQTtDQ0FBOztBREFBO0VBQUEsbUJDQUE7RURBQTtDQ0FBOztBREFBO0VBQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLDRCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLDRCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLG1CQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHVCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBLHFCQ0FBO0VEQUE7Q0NBQTs7QURBQTtFQUFBO0NDQUE7O0FEQUE7RUFBQTtDQ0FBOztBREFBOztFQUFBO0lBQUEsaUJDQUE7SURBQTtHQ0FBOztFREFBO0lBQUEsa0JDQUE7SURBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUEscUJDQUE7SURBQTtHQ0FBOztFREFBO0lBQUEsbUJDQUE7SURBQTtHQ0FBOztFREFBO0lBQUEsb0JDQUE7SURBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBLGtCQ0FBO0lEQUE7R0NBQTtDQUFBOztBREFBOztFQUFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTtDQUFBOztBREFBOztFQUFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQTtHQ0FBOztFREFBO0lBQUE7R0NBQTs7RURBQTtJQUFBO0dDQUE7O0VEQUE7SUFBQSxtQkNBQTtJREFBO0dDQUE7O0VEQUE7SUFBQSxvQkNBQTtJREFBO0dDQUE7Q0FBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAdGFpbHdpbmQgYmFzZTtcXG5AdGFpbHdpbmQgY29tcG9uZW50cztcXG5AdGFpbHdpbmQgdXRpbGl0aWVzO1xcblxcbi8qXFxu4oCcSGF2ZSB0aGUgY291cmFnZSB0byBmb2xsb3cgeW91ciBoZWFydCBhbmQgaW50dWl0aW9uLiBUaGV5IHNvbWVob3cgYWxyZWFkeSBrbm93IHdoYXQgeW91IHRydWx5IHdhbnQgdG8gYmVjb21lLiBFdmVyeXRoaW5nIGVsc2UgaXMgc2Vjb25kYXJ5LuKAnVxcbuKAlSBTdGV2ZSBKb2JzXFxuKi9cXG5cIixudWxsXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgJiYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXSk7IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKSB7XG4gIHZhciBfaXRlbSA9IF9zbGljZWRUb0FycmF5KGl0ZW0sIDQpLFxuICAgICAgY29udGVudCA9IF9pdGVtWzFdLFxuICAgICAgY3NzTWFwcGluZyA9IF9pdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiY29uc3QgRGVmYXVsdCA9IHtcblx0YWx3YXlzT3BlbjogZmFsc2UsXG5cdGFjdGl2ZUNsYXNzZXM6ICdiZy1ncmF5LTEwMCBkYXJrOmJnLWdyYXktODAwIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlJyxcblx0aW5hY3RpdmVDbGFzc2VzOiAndGV4dC1ncmF5LTUwMCBkYXJrOnRleHQtZ3JheS00MDAnLFxuXHRvbk9wZW46ICgpID0+IHsgfSxcblx0b25DbG9zZTogKCkgPT4geyB9LFxuXHRvblRvZ2dsZTogKCkgPT4geyB9XG59XG5cbmNsYXNzIEFjY29yZGlvbiB7XG5cdGNvbnN0cnVjdG9yKGl0ZW1zID0gW10sIG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuX2l0ZW1zID0gaXRlbXNcblx0XHR0aGlzLl9vcHRpb25zID0geyAuLi5EZWZhdWx0LCAuLi5vcHRpb25zIH1cblx0XHR0aGlzLl9pbml0KClcblx0fVxuXG5cdF9pbml0KCkge1xuXHRcdGlmICh0aGlzLl9pdGVtcy5sZW5ndGgpIHtcblx0XHRcdC8vIHNob3cgYWNjb3JkaW9uIGl0ZW0gYmFzZWQgb24gY2xpY2tcblx0XHRcdHRoaXMuX2l0ZW1zLm1hcChpdGVtID0+IHtcblxuXHRcdFx0XHRpZiAoaXRlbS5hY3RpdmUpIHtcblx0XHRcdFx0XHR0aGlzLm9wZW4oaXRlbS5pZClcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGl0ZW0udHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMudG9nZ2xlKGl0ZW0uaWQpXG5cdFx0XHRcdH0pXG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG5cdGdldEl0ZW0oaWQpIHtcblx0XHRyZXR1cm4gdGhpcy5faXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpWzBdXG5cdH1cblxuXHRvcGVuKGlkKSB7XG5cdFx0Y29uc3QgaXRlbSA9IHRoaXMuZ2V0SXRlbShpZClcblxuXHRcdC8vIGRvbid0IGhpZGUgb3RoZXIgYWNjb3JkaW9ucyBpZiBhbHdheXMgb3BlblxuXHRcdGlmICghdGhpcy5fb3B0aW9ucy5hbHdheXNPcGVuKSB7XG5cdFx0XHR0aGlzLl9pdGVtcy5tYXAoaSA9PiB7XG5cdFx0XHRcdGlmIChpICE9PSBpdGVtKSB7XG5cdFx0XHRcdFx0aS50cmlnZ2VyRWwuY2xhc3NMaXN0LnJlbW92ZSguLi50aGlzLl9vcHRpb25zLmFjdGl2ZUNsYXNzZXMuc3BsaXQoXCIgXCIpKVxuXHRcdFx0XHRcdGkudHJpZ2dlckVsLmNsYXNzTGlzdC5hZGQoLi4udGhpcy5fb3B0aW9ucy5pbmFjdGl2ZUNsYXNzZXMuc3BsaXQoXCIgXCIpKVxuXHRcdFx0XHRcdGkudGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcblx0XHRcdFx0XHRpLnRyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSlcblx0XHRcdFx0XHRpLmFjdGl2ZSA9IGZhbHNlXG5cblx0XHRcdFx0XHQvLyByb3RhdGUgaWNvbiBpZiBzZXRcblx0XHRcdFx0XHRpZiAoaS5pY29uRWwpIHtcblx0XHRcdFx0XHRcdGkuaWNvbkVsLmNsYXNzTGlzdC5yZW1vdmUoJ3JvdGF0ZS0xODAnKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cblx0XHQvLyBzaG93IGFjdGl2ZSBpdGVtXG5cdFx0aXRlbS50cmlnZ2VyRWwuY2xhc3NMaXN0LmFkZCguLi50aGlzLl9vcHRpb25zLmFjdGl2ZUNsYXNzZXMuc3BsaXQoXCIgXCIpKVxuXHRcdGl0ZW0udHJpZ2dlckVsLmNsYXNzTGlzdC5yZW1vdmUoLi4udGhpcy5fb3B0aW9ucy5pbmFjdGl2ZUNsYXNzZXMuc3BsaXQoXCIgXCIpKVxuXHRcdGl0ZW0udHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpXG5cdFx0aXRlbS50YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuXHRcdGl0ZW0uYWN0aXZlID0gdHJ1ZVxuXG5cdFx0Ly8gcm90YXRlIGljb24gaWYgc2V0XG5cdFx0aWYgKGl0ZW0uaWNvbkVsKSB7XG5cdFx0XHRpdGVtLmljb25FbC5jbGFzc0xpc3QuYWRkKCdyb3RhdGUtMTgwJylcblx0XHR9XG5cblx0XHQvLyBjYWxsYmFjayBmdW5jdGlvblxuXHRcdHRoaXMuX29wdGlvbnMub25PcGVuKHRoaXMsIGl0ZW0pXG5cdH1cblxuXHR0b2dnbGUoaWQpIHtcblx0XHRjb25zdCBpdGVtID0gdGhpcy5nZXRJdGVtKGlkKVxuXG5cdFx0aWYgKGl0ZW0uYWN0aXZlKSB7XG5cdFx0XHR0aGlzLmNsb3NlKGlkKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLm9wZW4oaWQpXG5cdFx0fVxuXG5cdFx0Ly8gY2FsbGJhY2sgZnVuY3Rpb25cblx0XHR0aGlzLl9vcHRpb25zLm9uVG9nZ2xlKHRoaXMsIGl0ZW0pXG5cdH1cblxuXHRjbG9zZShpZCkge1xuXHRcdGNvbnN0IGl0ZW0gPSB0aGlzLmdldEl0ZW0oaWQpXG5cblx0XHRpdGVtLnRyaWdnZXJFbC5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX29wdGlvbnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdChcIiBcIikpXG5cdFx0aXRlbS50cmlnZ2VyRWwuY2xhc3NMaXN0LmFkZCguLi50aGlzLl9vcHRpb25zLmluYWN0aXZlQ2xhc3Nlcy5zcGxpdChcIiBcIikpXG5cdFx0aXRlbS50YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuXHRcdGl0ZW0udHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuXHRcdGl0ZW0uYWN0aXZlID0gZmFsc2VcblxuXHRcdC8vIHJvdGF0ZSBpY29uIGlmIHNldFxuXHRcdGlmIChpdGVtLmljb25FbCkge1xuXHRcdFx0aXRlbS5pY29uRWwuY2xhc3NMaXN0LnJlbW92ZSgncm90YXRlLTE4MCcpXG5cdFx0fVxuXG5cdFx0Ly8gY2FsbGJhY2sgZnVuY3Rpb25cblx0XHR0aGlzLl9vcHRpb25zLm9uQ2xvc2UodGhpcywgaXRlbSlcblx0fVxuXG59XG5cbndpbmRvdy5BY2NvcmRpb24gPSBBY2NvcmRpb247XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0QWNjb3JkaW9ucygpIHtcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWNjb3JkaW9uXScpLmZvckVhY2goYWNjb3JkaW9uRWwgPT4ge1xuXG5cdFx0Y29uc3QgYWx3YXlzT3BlbiA9IGFjY29yZGlvbkVsLmdldEF0dHJpYnV0ZSgnZGF0YS1hY2NvcmRpb24nKVxuXHRcdGNvbnN0IGFjdGl2ZUNsYXNzZXMgPSBhY2NvcmRpb25FbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlLWNsYXNzZXMnKVxuXHRcdGNvbnN0IGluYWN0aXZlQ2xhc3NlcyA9IGFjY29yZGlvbkVsLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmFjdGl2ZS1jbGFzc2VzJylcblxuXHRcdGNvbnN0IGl0ZW1zID0gW11cblx0XHRhY2NvcmRpb25FbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hY2NvcmRpb24tdGFyZ2V0XScpLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0Y29uc3QgaXRlbSA9IHtcblx0XHRcdFx0aWQ6IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1hY2NvcmRpb24tdGFyZ2V0JyksXG5cdFx0XHRcdHRyaWdnZXJFbDogZWwsXG5cdFx0XHRcdHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1hY2NvcmRpb24tdGFyZ2V0JykpLFxuXHRcdFx0XHRpY29uRWw6IGVsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFjY29yZGlvbi1pY29uXScpLFxuXHRcdFx0XHRhY3RpdmU6IGVsLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2Vcblx0XHRcdH1cblx0XHRcdGl0ZW1zLnB1c2goaXRlbSlcblx0XHR9KVxuXG5cdFx0bmV3IEFjY29yZGlvbihpdGVtcywge1xuXHRcdFx0YWx3YXlzT3BlbjogYWx3YXlzT3BlbiA9PT0gJ29wZW4nID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdFx0YWN0aXZlQ2xhc3NlczogYWN0aXZlQ2xhc3NlcyA/IGFjdGl2ZUNsYXNzZXMgOiBEZWZhdWx0LmFjdGl2ZUNsYXNzZXMsXG5cdFx0XHRpbmFjdGl2ZUNsYXNzZXM6IGluYWN0aXZlQ2xhc3NlcyA/IGluYWN0aXZlQ2xhc3NlcyA6IERlZmF1bHQuaW5hY3RpdmVDbGFzc2VzXG5cdFx0fSlcblx0fSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgQWNjb3JkaW9uIiwiY29uc3QgRGVmYXVsdCA9IHtcbiAgICBkZWZhdWx0UG9zaXRpb246IDAsXG4gICAgaW5kaWNhdG9yczoge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIGFjdGl2ZUNsYXNzZXM6ICdiZy13aGl0ZSBkYXJrOmJnLWdyYXktODAwJyxcbiAgICAgICAgaW5hY3RpdmVDbGFzc2VzOiAnYmctd2hpdGUvNTAgZGFyazpiZy1ncmF5LTgwMC81MCBob3ZlcjpiZy13aGl0ZSBkYXJrOmhvdmVyOmJnLWdyYXktODAwJ1xuICAgIH0sXG4gICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgb25OZXh0OiAoKSA9PiB7IH0sXG4gICAgb25QcmV2OiAoKSA9PiB7IH0sXG4gICAgb25DaGFuZ2U6ICgpID0+IHsgfVxufVxuXG5jbGFzcyBDYXJvdXNlbCB7XG4gICAgY29uc3RydWN0b3IoaXRlbXMgPSBbXSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXNcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHsgLi4uRGVmYXVsdCwgLi4ub3B0aW9ucywgaW5kaWNhdG9ycyA6IHsgLi4uRGVmYXVsdC5pbmRpY2F0b3JzLCAuLi5vcHRpb25zLmluZGljYXRvcnMgfSB9XG4gICAgICAgIHRoaXMuX2FjdGl2ZUl0ZW0gPSB0aGlzLmdldEl0ZW0odGhpcy5fb3B0aW9ucy5kZWZhdWx0UG9zaXRpb24pXG4gICAgICAgIHRoaXMuX2luZGljYXRvcnMgPSB0aGlzLl9vcHRpb25zLmluZGljYXRvcnMuaXRlbXNcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSBudWxsXG4gICAgICAgIHRoaXMuX2luaXQoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpc2UgY2Fyb3VzZWwgYW5kIGl0ZW1zIGJhc2VkIG9uIGFjdGl2ZSBvbmVcbiAgICAgKi9cbiAgICBfaW5pdCgpIHtcbiAgICAgICAgdGhpcy5faXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5lbC5jbGFzc0xpc3QuYWRkKCdhYnNvbHV0ZScsICdpbnNldC0wJywgJ3RyYW5zaXRpb24tYWxsJywgJ3RyYW5zZm9ybScpXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gaWYgbm8gYWN0aXZlIGl0ZW0gaXMgc2V0IHRoZW4gZmlyc3QgcG9zaXRpb24gaXMgZGVmYXVsdFxuICAgICAgICBpZiAodGhpcy5fZ2V0QWN0aXZlSXRlbSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5fZ2V0QWN0aXZlSXRlbSgpLnBvc2l0aW9uKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zbGlkZVRvKDApXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pbmRpY2F0b3JzLm1hcCgoaW5kaWNhdG9yLCBwb3NpdGlvbikgPT4ge1xuICAgICAgICAgICAgaW5kaWNhdG9yLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVUbyhwb3NpdGlvbilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0SXRlbShwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNbcG9zaXRpb25dXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2xpZGUgdG8gdGhlIGVsZW1lbnQgYmFzZWQgb24gaWRcbiAgICAgKiBAcGFyYW0geyp9IHBvc2l0aW9uIFxuICAgICAqL1xuICAgIHNsaWRlVG8ocG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgbmV4dEl0ZW0gPSB0aGlzLl9pdGVtc1twb3NpdGlvbl1cbiAgICAgICAgY29uc3Qgcm90YXRpb25JdGVtcyA9IHtcbiAgICAgICAgICAgICdsZWZ0JzogbmV4dEl0ZW0ucG9zaXRpb24gPT09IDAgPyB0aGlzLl9pdGVtc1t0aGlzLl9pdGVtcy5sZW5ndGggLSAxXSA6IHRoaXMuX2l0ZW1zW25leHRJdGVtLnBvc2l0aW9uIC0gMV0sXG4gICAgICAgICAgICAnbWlkZGxlJzogbmV4dEl0ZW0sXG4gICAgICAgICAgICAncmlnaHQnOiBuZXh0SXRlbS5wb3NpdGlvbiA9PT0gdGhpcy5faXRlbXMubGVuZ3RoIC0gMSA/IHRoaXMuX2l0ZW1zWzBdIDogdGhpcy5faXRlbXNbbmV4dEl0ZW0ucG9zaXRpb24gKyAxXVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JvdGF0ZShyb3RhdGlvbkl0ZW1zKVxuICAgICAgICB0aGlzLl9zZXRBY3RpdmVJdGVtKG5leHRJdGVtLnBvc2l0aW9uKVxuICAgICAgICBpZiAodGhpcy5faW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKVxuICAgICAgICAgICAgdGhpcy5jeWNsZSgpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uQ2hhbmdlKHRoaXMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQmFzZWQgb24gdGhlIGN1cnJlbnRseSBhY3RpdmUgaXRlbSBpdCB3aWxsIGdvIHRvIHRoZSBuZXh0IHBvc2l0aW9uXG4gICAgICovXG4gICAgbmV4dCgpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMuX2dldEFjdGl2ZUl0ZW0oKVxuICAgICAgICBsZXQgbmV4dEl0ZW0gPSBudWxsXG5cbiAgICAgICAgLy8gY2hlY2sgaWYgbGFzdCBpdGVtXG4gICAgICAgIGlmIChhY3RpdmVJdGVtLnBvc2l0aW9uID09PSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBuZXh0SXRlbSA9IHRoaXMuX2l0ZW1zWzBdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0SXRlbSA9IHRoaXMuX2l0ZW1zW2FjdGl2ZUl0ZW0ucG9zaXRpb24gKyAxXVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zbGlkZVRvKG5leHRJdGVtLnBvc2l0aW9uKVxuXG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25OZXh0KHRoaXMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQmFzZWQgb24gdGhlIGN1cnJlbnRseSBhY3RpdmUgaXRlbSBpdCB3aWxsIGdvIHRvIHRoZSBwcmV2aW91cyBwb3NpdGlvblxuICAgICAqL1xuICAgIHByZXYoKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLl9nZXRBY3RpdmVJdGVtKClcbiAgICAgICAgbGV0IHByZXZJdGVtID0gbnVsbFxuXG4gICAgICAgIC8vIGNoZWNrIGlmIGZpcnN0IGl0ZW1cbiAgICAgICAgaWYgKGFjdGl2ZUl0ZW0ucG9zaXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIHByZXZJdGVtID0gdGhpcy5faXRlbXNbdGhpcy5faXRlbXMubGVuZ3RoIC0gMV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZXZJdGVtID0gdGhpcy5faXRlbXNbYWN0aXZlSXRlbS5wb3NpdGlvbiAtIDFdXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNsaWRlVG8ocHJldkl0ZW0ucG9zaXRpb24pXG5cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblByZXYodGhpcylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBhcHBsaWVzIHRoZSB0cmFuc2Zvcm0gY2xhc3NlcyBiYXNlZCBvbiB0aGUgbGVmdCwgbWlkZGxlLCBhbmQgcmlnaHQgcm90YXRpb24gY2Fyb3VzZWwgaXRlbXNcbiAgICAgKiBAcGFyYW0geyp9IHJvdGF0aW9uSXRlbXMgXG4gICAgICovXG4gICAgX3JvdGF0ZShyb3RhdGlvbkl0ZW1zKSB7XG4gICAgICAgIC8vIHJlc2V0XG4gICAgICAgIHRoaXMuX2l0ZW1zLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBsZWZ0IGl0ZW0gKHByZXZpb3VzbHkgYWN0aXZlKVxuICAgICAgICByb3RhdGlvbkl0ZW1zLmxlZnQuZWwuY2xhc3NMaXN0LnJlbW92ZSgnLXRyYW5zbGF0ZS14LWZ1bGwnLCAndHJhbnNsYXRlLXgtZnVsbCcsICd0cmFuc2xhdGUteC0wJywgJ2hpZGRlbicsICd6LTIwJylcbiAgICAgICAgcm90YXRpb25JdGVtcy5sZWZ0LmVsLmNsYXNzTGlzdC5hZGQoJy10cmFuc2xhdGUteC1mdWxsJywgJ3otMTAnKVxuXG4gICAgICAgIC8vIGN1cnJlbnRseSBhY3RpdmUgaXRlbVxuICAgICAgICByb3RhdGlvbkl0ZW1zLm1pZGRsZS5lbC5jbGFzc0xpc3QucmVtb3ZlKCctdHJhbnNsYXRlLXgtZnVsbCcsICd0cmFuc2xhdGUteC1mdWxsJywgJ3RyYW5zbGF0ZS14LTAnLCAnaGlkZGVuJywgJ3otMTAnKVxuICAgICAgICByb3RhdGlvbkl0ZW1zLm1pZGRsZS5lbC5jbGFzc0xpc3QuYWRkKCd0cmFuc2xhdGUteC0wJywgJ3otMjAnKVxuXG4gICAgICAgIC8vIHJpZ2h0IGl0ZW0gKHVwY29taW5nIGFjdGl2ZSlcbiAgICAgICAgcm90YXRpb25JdGVtcy5yaWdodC5lbC5jbGFzc0xpc3QucmVtb3ZlKCctdHJhbnNsYXRlLXgtZnVsbCcsICd0cmFuc2xhdGUteC1mdWxsJywgJ3RyYW5zbGF0ZS14LTAnLCAnaGlkZGVuJywgJ3otMjAnKVxuICAgICAgICByb3RhdGlvbkl0ZW1zLnJpZ2h0LmVsLmNsYXNzTGlzdC5hZGQoJ3RyYW5zbGF0ZS14LWZ1bGwnLCAnei0xMCcpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGFuIGludGVydmFsIHRvIGN5Y2xlIHRocm91Z2ggdGhlIGNhcm91c2VsIGl0ZW1zXG4gICAgICovXG4gICAgY3ljbGUoKSB7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIH0sIHRoaXMuX29wdGlvbnMuaW50ZXJ2YWwpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBjeWNsaW5nIGludGVydmFsXG4gICAgICovXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudGx5IGFjdGl2ZSBpdGVtXG4gICAgICovXG4gICAgX2dldEFjdGl2ZUl0ZW0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJdGVtXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjdXJyZW50bHkgYWN0aXZlIGl0ZW0gYW5kIGRhdGEgYXR0cmlidXRlXG4gICAgICogQHBhcmFtIHsqfSBwb3NpdGlvbiBcbiAgICAgKi9cbiAgICBfc2V0QWN0aXZlSXRlbShwb3NpdGlvbikge1xuICAgICAgICB0aGlzLl9hY3RpdmVJdGVtID0gdGhpcy5faXRlbXNbcG9zaXRpb25dXG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBpbmRpY2F0b3JzIGlmIGF2YWlsYWJsZVxuICAgICAgICBpZiAodGhpcy5faW5kaWNhdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2luZGljYXRvcnMubWFwKGluZGljYXRvciA9PiB7XG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yLmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50JywgJ2ZhbHNlJylcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3IuZWwuY2xhc3NMaXN0LnJlbW92ZSguLi50aGlzLl9vcHRpb25zLmluZGljYXRvcnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdChcIiBcIikpXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yLmVsLmNsYXNzTGlzdC5hZGQoLi4udGhpcy5fb3B0aW9ucy5pbmRpY2F0b3JzLmluYWN0aXZlQ2xhc3Nlcy5zcGxpdChcIiBcIikpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5faW5kaWNhdG9yc1twb3NpdGlvbl0uZWwuY2xhc3NMaXN0LmFkZCguLi50aGlzLl9vcHRpb25zLmluZGljYXRvcnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdChcIiBcIikpXG4gICAgICAgICAgICB0aGlzLl9pbmRpY2F0b3JzW3Bvc2l0aW9uXS5lbC5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX29wdGlvbnMuaW5kaWNhdG9ycy5pbmFjdGl2ZUNsYXNzZXMuc3BsaXQoXCIgXCIpKVxuICAgICAgICAgICAgdGhpcy5faW5kaWNhdG9yc1twb3NpdGlvbl0uZWwuc2V0QXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCAndHJ1ZScpXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxud2luZG93LkNhcm91c2VsID0gQ2Fyb3VzZWw7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0Q2Fyb3VzZWxzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNhcm91c2VsXScpLmZvckVhY2goY2Fyb3VzZWxFbCA9PiB7XG4gICAgICAgIGNvbnN0IGludGVydmFsID0gY2Fyb3VzZWxFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2Fyb3VzZWwtaW50ZXJ2YWwnKVxuICAgICAgICBjb25zdCBzbGlkZSA9IGNhcm91c2VsRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWNhcm91c2VsJykgPT09ICdzbGlkZScgPyB0cnVlIDogZmFsc2VcblxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdXG4gICAgICAgIGxldCBkZWZhdWx0UG9zaXRpb24gPSAwXG4gICAgICAgIGlmIChjYXJvdXNlbEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNhcm91c2VsLWl0ZW1dJykubGVuZ3RoKSB7XG4gICAgICAgICAgICBbLi4uY2Fyb3VzZWxFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jYXJvdXNlbC1pdGVtXScpXS5tYXAoKGNhcm91c2VsSXRlbUVsLCBwb3NpdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGVsOiBjYXJvdXNlbEl0ZW1FbFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBpZiAoY2Fyb3VzZWxJdGVtRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWNhcm91c2VsLWl0ZW0nKSA9PT0gJ2FjdGl2ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFBvc2l0aW9uID0gcG9zaXRpb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW5kaWNhdG9ycyA9IFtdO1xuICAgICAgICBpZiAoY2Fyb3VzZWxFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jYXJvdXNlbC1zbGlkZS10b10nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIFsuLi5jYXJvdXNlbEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNhcm91c2VsLXNsaWRlLXRvXScpXS5tYXAoKGluZGljYXRvckVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kaWNhdG9ycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGluZGljYXRvckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jYXJvdXNlbC1zbGlkZS10bycpLFxuICAgICAgICAgICAgICAgICAgICBlbDogaW5kaWNhdG9yRWxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNhcm91c2VsID0gbmV3IENhcm91c2VsKGl0ZW1zLCB7XG4gICAgICAgICAgICBkZWZhdWx0UG9zaXRpb246IGRlZmF1bHRQb3NpdGlvbixcbiAgICAgICAgICAgIGluZGljYXRvcnM6IHtcbiAgICAgICAgICAgICAgICBpdGVtczogaW5kaWNhdG9yc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGludGVydmFsOiBpbnRlcnZhbCA/IGludGVydmFsIDogRGVmYXVsdC5pbnRlcnZhbFxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChzbGlkZSkge1xuICAgICAgICAgICAgY2Fyb3VzZWwuY3ljbGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGZvciBjb250cm9sc1xuICAgICAgICBjb25zdCBjYXJvdXNlbE5leHRFbCA9IGNhcm91c2VsRWwucXVlcnlTZWxlY3RvcignW2RhdGEtY2Fyb3VzZWwtbmV4dF0nKVxuICAgICAgICBjb25zdCBjYXJvdXNlbFByZXZFbCA9IGNhcm91c2VsRWwucXVlcnlTZWxlY3RvcignW2RhdGEtY2Fyb3VzZWwtcHJldl0nKVxuXG4gICAgICAgIGlmIChjYXJvdXNlbE5leHRFbCkge1xuICAgICAgICAgICAgY2Fyb3VzZWxOZXh0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2Fyb3VzZWwubmV4dCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhcm91c2VsUHJldkVsKSB7XG4gICAgICAgICAgICBjYXJvdXNlbFByZXZFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjYXJvdXNlbC5wcmV2KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IENhcm91c2VsIiwiY29uc3QgRGVmYXVsdCA9IHtcbiAgICB0cmlnZ2VyRWw6IG51bGwsXG4gICAgb25Db2xsYXBzZTogKCkgPT4geyB9LFxuICAgIG9uRXhwYW5kOiAoKSA9PiB7IH0sXG4gICAgb25Ub2dnbGU6ICgpID0+IHsgfSxcbn07XG5cbmNsYXNzIENvbGxhcHNlIHtcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXRFbCA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsO1xuICAgICAgICB0aGlzLl90cmlnZ2VyRWwgPSBvcHRpb25zLnRyaWdnZXJFbCB8fCBEZWZhdWx0LnRyaWdnZXJFbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHsgLi4uRGVmYXVsdCwgLi4ub3B0aW9ucyB9O1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG5cbiAgICBfaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbC5oYXNBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlzaWJsZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIpID09PSBcInRydWVcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZml4IHVudGlsIHYyIG5vdCB0byBicmVhayBwcmV2aW91cyBzaW5nbGUgY29sbGFwc2VzIHdoaWNoIGJlY2FtZSBkaXNtaXNzXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlzaWJsZSA9ICF0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Zpc2libGUgPyB0aGlzLmNvbGxhcHNlKCkgOiB0aGlzLmV4cGFuZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2xsYXBzZSgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkNvbGxhcHNlKHRoaXMpO1xuICAgIH1cblxuICAgIGV4cGFuZCgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuXG4gICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHRydWU7XG5cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkV4cGFuZCh0aGlzKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG53aW5kb3cuQ29sbGFwc2UgPSBDb2xsYXBzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDb2xsYXBzZXMoKSB7XG4gICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1jb2xsYXBzZS10b2dnbGVdXCIpXG4gICAgICAgIC5mb3JFYWNoKCh0cmlnZ2VyRWwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICAgICAgdHJpZ2dlckVsLmdldEF0dHJpYnV0ZShcImRhdGEtY29sbGFwc2UtdG9nZ2xlXCIpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgdGFyZ2V0IGVsZW1lbnQgZXhpc3RzXG4gICAgICAgICAgICBpZiAoIXRhcmdldEVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXcgQ29sbGFwc2UodGFyZ2V0RWwsIHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyRWwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxhcHNlOyIsImNvbnN0IERlZmF1bHQgPSB7XG4gICAgdHJpZ2dlclR5cGU6ICdob3ZlcicsXG4gICAgb25TaG93OiAoKSA9PiB7IH0sXG4gICAgb25IaWRlOiAoKSA9PiB7IH0sXG4gICAgb25Ub2dnbGU6ICgpID0+IHsgfVxufVxuXG5jbGFzcyBEaWFsIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRFbCA9IG51bGwsIHRyaWdnZXJFbCA9IG51bGwsIHRhcmdldEVsID0gbnVsbCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9wYXJlbnRFbCA9IHBhcmVudEVsXG4gICAgICAgIHRoaXMuX3RyaWdnZXJFbCA9IHRyaWdnZXJFbFxuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB7IC4uLkRlZmF1bHQsIC4uLm9wdGlvbnMgfVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2VcbiAgICAgICAgdGhpcy5faW5pdCgpXG4gICAgfVxuXG4gICAgX2luaXQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IHRoaXMuX2dldFRyaWdnZXJFdmVudHMoKVxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cy5zaG93RXZlbnRzLmZvckVhY2goZXYgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKGV2LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5hZGRFdmVudExpc3RlbmVyKGV2LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzLmhpZGVFdmVudHMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50RWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fcGFyZW50RWwubWF0Y2hlcygnOmhvdmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZVxuXG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25IaWRlKHRoaXMpXG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdHJ1ZVxuXG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25TaG93KHRoaXMpXG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZ2V0VHJpZ2dlckV2ZW50cygpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9vcHRpb25zLnRyaWdnZXJUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdob3Zlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydtb3VzZWVudGVyJywgJ2ZvY3VzJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnbW91c2VsZWF2ZScsICdibHVyJ11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydjbGljaycsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ2ZvY3Vzb3V0JywgJ2JsdXInXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydtb3VzZWVudGVyJywgJ2ZvY3VzJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnbW91c2VsZWF2ZScsICdibHVyJ11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxud2luZG93LkRpYWwgPSBEaWFsO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdERpYWxzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRpYWwtaW5pdF0nKS5mb3JFYWNoKHBhcmVudEVsID0+IHtcbiAgICAgICAgY29uc3QgdHJpZ2dlckVsID0gcGFyZW50RWwucXVlcnlTZWxlY3RvcignW2RhdGEtZGlhbC10b2dnbGVdJylcbiAgICAgICAgY29uc3QgdGFyZ2V0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRpYWwtdG9nZ2xlJykpXG4gICAgICAgIGNvbnN0IHRyaWdnZXJUeXBlID0gdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kaWFsLXRyaWdnZXInKVxuXG4gICAgICAgIG5ldyBEaWFsKHBhcmVudEVsLCB0cmlnZ2VyRWwsIHRhcmdldEVsLCB7XG4gICAgICAgICAgICB0cmlnZ2VyVHlwZTogdHJpZ2dlclR5cGUgPyB0cmlnZ2VyVHlwZSA6IERlZmF1bHQudHJpZ2dlclR5cGVcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaWFsIiwiY29uc3QgRGVmYXVsdCA9IHtcbiAgICB0cmlnZ2VyRWw6IG51bGwsXG4gICAgdHJhbnNpdGlvbjogJ3RyYW5zaXRpb24tb3BhY2l0eScsXG4gICAgZHVyYXRpb246IDMwMCxcbiAgICB0aW1pbmc6ICdlYXNlLW91dCcsXG4gICAgb25IaWRlOiAoKSA9PiB7IH1cbn07XG5cbmNsYXNzIERpc21pc3Mge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldEVsID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsID0gdGFyZ2V0RWw7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJFbCA9IG9wdGlvbnMudHJpZ2dlckVsIHx8IERlZmF1bHQudHJpZ2dlckVsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0geyAuLi5EZWZhdWx0LCAuLi5vcHRpb25zIH07XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG5cbiAgICBfaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy50cmFuc2l0aW9uLFxuICAgICAgICAgICAgYGR1cmF0aW9uLSR7dGhpcy5fb3B0aW9ucy5kdXJhdGlvbn1gLFxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy50aW1pbmcsXG4gICAgICAgICAgICAnb3BhY2l0eS0wJ1xuICAgICAgICApO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB9LCB0aGlzLl9vcHRpb25zLmR1cmF0aW9uKTtcblxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uSGlkZSh0aGlzLCB0aGlzLl90YXJnZXRFbCk7XG4gICAgfVxufVxuXG53aW5kb3cuRGlzbWlzcyA9IERpc21pc3M7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0RGlzbWlzc2VzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRpc21pc3MtdGFyZ2V0XScpLmZvckVhY2godHJpZ2dlckVsID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNtaXNzLXRhcmdldCcpXG4gICAgICAgICk7XG4gICAgICAgIG5ldyBEaXNtaXNzKHRhcmdldEVsLCB7XG4gICAgICAgICAgICB0cmlnZ2VyRWxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IERpc21pc3M7IiwiY29uc3QgRGVmYXVsdCA9IHtcbiAgICBwbGFjZW1lbnQ6ICdsZWZ0JyxcbiAgICBib2R5U2Nyb2xsaW5nOiBmYWxzZSxcbiAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICBlZGdlOiBmYWxzZSxcbiAgICBlZGdlT2Zmc2V0OiAnYm90dG9tLVs2MHB4XScsXG4gICAgYmFja2Ryb3BDbGFzc2VzOiAnYmctZ3JheS05MDAgYmctb3BhY2l0eS01MCBkYXJrOmJnLW9wYWNpdHktODAgZml4ZWQgaW5zZXQtMCB6LTMwJyxcbiAgICBvblNob3c6ICgpID0+IHsgfSxcbiAgICBvbkhpZGU6ICgpID0+IHsgfSxcbiAgICBvblRvZ2dsZTogKCkgPT4geyB9XG59XG5cbmNsYXNzIERyYXdlciB7XG4gICAgY29uc3RydWN0b3IodGFyZ2V0RWwgPSBudWxsLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsID0gdGFyZ2V0RWxcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHsgLi4uRGVmYXVsdCwgLi4ub3B0aW9ucyB9XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZVxuICAgICAgICB0aGlzLl9pbml0KClcbiAgICB9XG5cbiAgICBfaW5pdCgpIHtcbiAgICAgICAgLy8gc2V0IGluaXRpYWwgYWNjZXNzaWJpbGl0eSBhdHRyaWJ1dGVzXG4gICAgICAgIGlmICh0aGlzLl90YXJnZXRFbCkge1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ3RyYW5zaXRpb24tdHJhbnNmb3JtJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCBiYXNlIHBsYWNlbWVudCBjbGFzc2VzXG4gICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQpLmJhc2UubWFwKGMgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChjKVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIGFkZCBrZXlib2FyZCBldmVudCBsaXN0ZW5lciB0byBkb2N1bWVudFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykgeyAvLyBpZiAnRXNjYXBlJyBrZXkgaXMgcHJlc3NlZFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSgpKSB7IC8vIGlmIHRoZSBEcmF3ZXIgaXMgdmlzaWJsZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKSAvLyBoaWRlIHRoZSBEcmF3ZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaXNWaXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZVxuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIC8vIGJhc2VkIG9uIHRoZSBlZGdlIG9wdGlvbiBzaG93IHBsYWNlbWVudCBjbGFzc2VzXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmVkZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQgKyAnLWVkZ2UnKS5hY3RpdmUubWFwKGMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoYylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50ICsgJy1lZGdlJykuaW5hY3RpdmUubWFwKGMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoYylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50KS5hY3RpdmUubWFwKGMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoYylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50KS5pbmFjdGl2ZS5tYXAoYyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChjKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCBhY2Nlc3NpYmlsaXR5IGF0dHJpYnV0ZXNcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwucmVtb3ZlQXR0cmlidXRlKCdhcmlhLW1vZGFsJylcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwucmVtb3ZlQXR0cmlidXRlKCdyb2xlJylcblxuICAgICAgICAvLyBlbmFibGUgYm9keSBzY3JvbGxcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLmJvZHlTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcmZsb3ctaGlkZGVuJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlc3Ryb3kgYmFja2Ryb3BcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYmFja2Ryb3ApIHtcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lCYWNrZHJvcEVsKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZVxuXG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25IaWRlKHRoaXMpXG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuZWRnZSkge1xuICAgICAgICAgICAgdGhpcy5fZ2V0UGxhY2VtZW50Q2xhc3Nlcyh0aGlzLl9vcHRpb25zLnBsYWNlbWVudCArICctZWRnZScpLmFjdGl2ZS5tYXAoYyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChjKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQgKyAnLWVkZ2UnKS5pbmFjdGl2ZS5tYXAoYyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZShjKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQpLmFjdGl2ZS5tYXAoYyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChjKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQpLmluYWN0aXZlLm1hcChjID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKGMpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IGFjY2Vzc2liaWxpdHkgYXR0cmlidXRlc1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnLCAndHJ1ZScpXG4gICAgICAgIHRoaXMuX3RhcmdldEVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKVxuICAgICAgICB0aGlzLl90YXJnZXRFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJylcblxuICAgICAgICAvLyBkaXNhYmxlIGJvZHkgc2Nyb2xsXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucy5ib2R5U2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93LWhpZGRlbicpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBzaG93IGJhY2tkcm9wXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmJhY2tkcm9wKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVCYWNrZHJvcCgpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdHJ1ZVxuXG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25TaG93KHRoaXMpXG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY3JlYXRlQmFja2Ryb3AoKSB7XG4gICAgICAgIGlmICghdGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgY29uc3QgYmFja2Ryb3BFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYmFja2Ryb3BFbC5zZXRBdHRyaWJ1dGUoJ2RyYXdlci1iYWNrZHJvcCcsICcnKTtcbiAgICAgICAgICAgIGJhY2tkcm9wRWwuY2xhc3NMaXN0LmFkZCguLi50aGlzLl9vcHRpb25zLmJhY2tkcm9wQ2xhc3Nlcy5zcGxpdChcIiBcIikpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZChiYWNrZHJvcEVsKTtcbiAgICAgICAgICAgIGJhY2tkcm9wRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZGVzdHJveUJhY2tkcm9wRWwoKSB7XG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZHJhd2VyLWJhY2tkcm9wXScpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2dldFBsYWNlbWVudENsYXNzZXMocGxhY2VtZW50KSB7XG4gICAgICAgIHN3aXRjaCAocGxhY2VtZW50KSB7XG4gICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2U6IFsndG9wLTAnLCAnbGVmdC0wJywgJ3JpZ2h0LTAnXSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBbJ3RyYW5zZm9ybS1ub25lJ10sXG4gICAgICAgICAgICAgICAgICAgIGluYWN0aXZlOiBbJy10cmFuc2xhdGUteS1mdWxsJ11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZTogWydyaWdodC0wJywgJ3RvcC0wJ10sXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogWyd0cmFuc2Zvcm0tbm9uZSddLFxuICAgICAgICAgICAgICAgICAgICBpbmFjdGl2ZTogWyd0cmFuc2xhdGUteC1mdWxsJ11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2U6IFsnYm90dG9tLTAnLCAnbGVmdC0wJywgJ3JpZ2h0LTAnXSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBbJ3RyYW5zZm9ybS1ub25lJ10sXG4gICAgICAgICAgICAgICAgICAgIGluYWN0aXZlOiBbJ3RyYW5zbGF0ZS15LWZ1bGwnXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2U6IFsnbGVmdC0wJywgJ3RvcC0wJ10sXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogWyd0cmFuc2Zvcm0tbm9uZSddLFxuICAgICAgICAgICAgICAgICAgICBpbmFjdGl2ZTogWyctdHJhbnNsYXRlLXgtZnVsbCddXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnYm90dG9tLWVkZ2UnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2U6IFsnbGVmdC0wJywgJ3RvcC0wJ10sXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogWyd0cmFuc2Zvcm0tbm9uZSddLFxuICAgICAgICAgICAgICAgICAgICBpbmFjdGl2ZTogWyd0cmFuc2xhdGUteS1mdWxsJywgdGhpcy5fb3B0aW9ucy5lZGdlT2Zmc2V0XVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZTogWydsZWZ0LTAnLCAndG9wLTAnXSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBbJ3RyYW5zZm9ybS1ub25lJ10sXG4gICAgICAgICAgICAgICAgICAgIGluYWN0aXZlOiBbJy10cmFuc2xhdGUteC1mdWxsJ11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbndpbmRvdy5EcmF3ZXIgPSBEcmF3ZXI7XG5cbmNvbnN0IGdldERyYXdlckluc3RhbmNlID0gKGlkLCBpbnN0YW5jZXMpID0+IHtcbiAgICBpZiAoaW5zdGFuY2VzLnNvbWUoZHJhd2VySW5zdGFuY2UgPT4gZHJhd2VySW5zdGFuY2UuaWQgPT09IGlkKSkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2VzLmZpbmQoZHJhd2VySW5zdGFuY2UgPT4gZHJhd2VySW5zdGFuY2UuaWQgPT09IGlkKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXREcmF3ZXJzKCkge1xuICAgIGxldCBkcmF3ZXJJbnN0YW5jZXMgPSBbXVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyYXdlci10YXJnZXRdJykuZm9yRWFjaCh0cmlnZ2VyRWwgPT4ge1xuICAgICAgICAvLyBtYW5kYXRvcnlcbiAgICAgICAgY29uc3QgdGFyZ2V0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci10YXJnZXQnKSlcbiAgICAgICAgY29uc3QgZHJhd2VySWQgPSB0YXJnZXRFbC5pZFxuXG4gICAgICAgIC8vIG9wdGlvbmFsXG4gICAgICAgIGNvbnN0IHBsYWNlbWVudCA9IHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLXBsYWNlbWVudCcpXG4gICAgICAgIGNvbnN0IGJvZHlTY3JvbGxpbmcgPSB0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci1ib2R5LXNjcm9sbGluZycpXG4gICAgICAgIGNvbnN0IGJhY2tkcm9wID0gdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItYmFja2Ryb3AnKVxuICAgICAgICBjb25zdCBlZGdlID0gdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItZWRnZScpXG4gICAgICAgIGNvbnN0IGVkZ2VPZmZzZXQgPSB0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci1lZGdlLW9mZnNldCcpXG4gICAgICAgIFxuICAgICAgICBsZXQgZHJhd2VyID0gbnVsbFxuICAgICAgICBpZiAoZ2V0RHJhd2VySW5zdGFuY2UoZHJhd2VySWQsIGRyYXdlckluc3RhbmNlcykpIHtcbiAgICAgICAgICAgIGRyYXdlciA9IGdldERyYXdlckluc3RhbmNlKGRyYXdlcklkLCBkcmF3ZXJJbnN0YW5jZXMpXG4gICAgICAgICAgICBkcmF3ZXIgPSBkcmF3ZXIub2JqZWN0XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmF3ZXIgPSBuZXcgRHJhd2VyKHRhcmdldEVsLCB7XG4gICAgICAgICAgICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQgPyBwbGFjZW1lbnQgOiBEZWZhdWx0LnBsYWNlbWVudCxcbiAgICAgICAgICAgICAgICBib2R5U2Nyb2xsaW5nOiBib2R5U2Nyb2xsaW5nID8gYm9keVNjcm9sbGluZyA9PT0gJ3RydWUnID8gdHJ1ZSA6IGZhbHNlIDogRGVmYXVsdC5ib2R5U2Nyb2xsaW5nLFxuICAgICAgICAgICAgICAgIGJhY2tkcm9wOiBiYWNrZHJvcCA/IGJhY2tkcm9wID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2UgOiBEZWZhdWx0LmJhY2tkcm9wLFxuICAgICAgICAgICAgICAgIGVkZ2U6IGVkZ2UgPyBlZGdlID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2UgOiBEZWZhdWx0LmVkZ2UsXG4gICAgICAgICAgICAgICAgZWRnZU9mZnNldDogZWRnZU9mZnNldCA/IGVkZ2VPZmZzZXQgOiBEZWZhdWx0LmVkZ2VPZmZzZXRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBkcmF3ZXJJbnN0YW5jZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IGRyYXdlcklkLFxuICAgICAgICAgICAgICAgIG9iamVjdDogZHJhd2VyXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyYXdlci10b2dnbGVdJykuZm9yRWFjaCh0cmlnZ2VyRWwgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLXRvZ2dsZScpKVxuICAgICAgICBjb25zdCBkcmF3ZXJJZCA9IHRhcmdldEVsLmlkXG4gICAgICAgIGNvbnN0IGRyYXdlciA9IGdldERyYXdlckluc3RhbmNlKGRyYXdlcklkLCBkcmF3ZXJJbnN0YW5jZXMpXG5cbiAgICAgICAgdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGRyYXdlci5vYmplY3QuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgICAgICBkcmF3ZXIub2JqZWN0LmhpZGUoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkcmF3ZXIub2JqZWN0LnNob3coKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcmF3ZXItZGlzbWlzc10nKS5mb3JFYWNoKHRyaWdnZXJFbCA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItZGlzbWlzcycpKVxuICAgICAgICBjb25zdCBkcmF3ZXJJZCA9IHRhcmdldEVsLmlkXG4gICAgICAgIGNvbnN0IGRyYXdlciA9IGdldERyYXdlckluc3RhbmNlKGRyYXdlcklkLCBkcmF3ZXJJbnN0YW5jZXMpXG5cbiAgICAgICAgdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZHJhd2VyLm9iamVjdC5oaWRlKClcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJhd2VyLXNob3ddJykuZm9yRWFjaCh0cmlnZ2VyRWwgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLXNob3cnKSlcbiAgICAgICAgY29uc3QgZHJhd2VySWQgPSB0YXJnZXRFbC5pZFxuICAgICAgICBjb25zdCBkcmF3ZXIgPSBnZXREcmF3ZXJJbnN0YW5jZShkcmF3ZXJJZCwgZHJhd2VySW5zdGFuY2VzKVxuXG4gICAgICAgIHRyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGRyYXdlci5vYmplY3Quc2hvdygpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJhd2VyIiwiaW1wb3J0IHsgY3JlYXRlUG9wcGVyIH0gZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xuXG5jb25zdCBEZWZhdWx0ID0ge1xuICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgdHJpZ2dlclR5cGU6ICdjbGljaycsXG4gICAgb25TaG93OiAoKSA9PiB7IH0sXG4gICAgb25IaWRlOiAoKSA9PiB7IH1cbn1cblxuY2xhc3MgRHJvcGRvd24ge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldEVsZW1lbnQgPSBudWxsLCB0cmlnZ2VyRWxlbWVudCA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsZW1lbnRcbiAgICAgICAgdGhpcy5fdHJpZ2dlckVsID0gdHJpZ2dlckVsZW1lbnRcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHsgLi4uRGVmYXVsdCwgLi4ub3B0aW9ucyB9XG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlID0gdGhpcy5fY3JlYXRlUG9wcGVySW5zdGFjZSgpXG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZVxuICAgICAgICB0aGlzLl9pbml0KClcbiAgICB9XG5cbiAgICBfaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY3JlYXRlUG9wcGVySW5zdGFjZSgpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVBvcHBlcih0aGlzLl90cmlnZ2VyRWwsIHRoaXMuX3RhcmdldEVsLCB7XG4gICAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMuX29wdGlvbnMucGxhY2VtZW50LFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnb2Zmc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBbMCwgMTBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfaGFuZGxlQ2xpY2tPdXRzaWRlKGV2LCB0YXJnZXRFbCkge1xuICAgICAgICBjb25zdCBjbGlja2VkRWwgPSBldi50YXJnZXRcbiAgICAgICAgaWYgKGNsaWNrZWRFbCAhPT0gdGFyZ2V0RWwgJiYgIXRhcmdldEVsLmNvbnRhaW5zKGNsaWNrZWRFbCkgJiYgIXRoaXMuX3RyaWdnZXJFbC5jb250YWlucyhjbGlja2VkRWwpICYmIHRoaXMuX3Zpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUNsaWNrT3V0c2lkZSwgdHJ1ZSlcbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUNsaWNrT3V0c2lkZSwgdHJ1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdibG9jaycpXG5cbiAgICAgICAgLy8gRW5hYmxlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2Uuc2V0T3B0aW9ucyhvcHRpb25zID0+ICh7XG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBbXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9ucy5tb2RpZmllcnMsXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLCBlbmFibGVkOiB0cnVlIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4geyB0aGlzLl9oYW5kbGVDbGlja091dHNpZGUoZXYsIHRoaXMuX3RhcmdldEVsKSB9LCB0cnVlKVxuXG4gICAgICAgIC8vIFVwZGF0ZSBpdHMgcG9zaXRpb25cbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2UudXBkYXRlKClcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHRydWVcblxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uU2hvdyh0aGlzKVxuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2NrJylcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcblxuICAgICAgICAvLyBEaXNhYmxlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2Uuc2V0T3B0aW9ucyhvcHRpb25zID0+ICh7XG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBbXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9ucy5tb2RpZmllcnMsXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLCBlbmFibGVkOiBmYWxzZSB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSkpXG5cbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlXG5cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkhpZGUodGhpcylcbiAgICB9XG59XG5cbndpbmRvdy5Ecm9wZG93biA9IERyb3Bkb3duO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdERyb3Bkb3ducygpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi10b2dnbGVdJykuZm9yRWFjaCh0cmlnZ2VyRWwgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJvcGRvd24tdG9nZ2xlJykpXG4gICAgICAgIGNvbnN0IHBsYWNlbWVudCA9IHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJvcGRvd24tcGxhY2VtZW50JylcblxuICAgICAgICBuZXcgRHJvcGRvd24odGFyZ2V0RWwsIHRyaWdnZXJFbCwge1xuICAgICAgICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQgPyBwbGFjZW1lbnQgOiBEZWZhdWx0LnBsYWNlbWVudFxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duIiwiY29uc3QgRGVmYXVsdCA9IHtcbiAgICBwbGFjZW1lbnQ6ICdjZW50ZXInLFxuICAgIGJhY2tkcm9wQ2xhc3NlczogJ2JnLWdyYXktOTAwIGJnLW9wYWNpdHktNTAgZGFyazpiZy1vcGFjaXR5LTgwIGZpeGVkIGluc2V0LTAgei00MCcsXG4gICAgYmFja2Ryb3A6ICdkeW5hbWljJyxcbiAgICBvbkhpZGU6ICgpID0+IHsgfSxcbiAgICBvblNob3c6ICgpID0+IHsgfSxcbiAgICBvblRvZ2dsZTogKCkgPT4geyB9XG59XG5jbGFzcyBNb2RhbCB7XG4gICAgY29uc3RydWN0b3IodGFyZ2V0RWwgPSBudWxsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwgPSB0YXJnZXRFbFxuICAgICAgICB0aGlzLl9vcHRpb25zID0geyAuLi5EZWZhdWx0LCAuLi5vcHRpb25zIH1cbiAgICAgICAgdGhpcy5faXNIaWRkZW4gPSB0cnVlXG4gICAgICAgIHRoaXMuX2JhY2tkcm9wRWwgPSBudWxsXG4gICAgICAgIHRoaXMuX2luaXQoKVxuICAgIH1cblxuICAgIF9pbml0KCkge1xuICAgICAgICBpZiAodGhpcy5fdGFyZ2V0RWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXMoKS5tYXAoYyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChjKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXYgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZU91dHNpZGVDbGljayhldi50YXJnZXQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXYua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY3JlYXRlQmFja2Ryb3AoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0hpZGRlbikge1xuICAgICAgICAgICAgY29uc3QgYmFja2Ryb3BFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYmFja2Ryb3BFbC5zZXRBdHRyaWJ1dGUoJ21vZGFsLWJhY2tkcm9wJywgJycpO1xuICAgICAgICAgICAgYmFja2Ryb3BFbC5jbGFzc0xpc3QuYWRkKC4uLnRoaXMuX29wdGlvbnMuYmFja2Ryb3BDbGFzc2VzLnNwbGl0KFwiIFwiKSk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kKGJhY2tkcm9wRWwpO1xuICAgICAgICAgICAgdGhpcy5fYmFja2Ryb3BFbCA9IGJhY2tkcm9wRWxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9kZXN0cm95QmFja2Ryb3BFbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0hpZGRlbikge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW21vZGFsLWJhY2tkcm9wXScpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2hhbmRsZU91dHNpZGVDbGljayh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYmFja2Ryb3AgPT09ICdkeW5hbWljJykge1xuICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gdGhpcy5fdGFyZ2V0RWwgfHwgdGFyZ2V0ID09PSB0aGlzLl9iYWNrZHJvcEVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9nZXRQbGFjZW1lbnRDbGFzc2VzKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX29wdGlvbnMucGxhY2VtZW50KSB7XG5cbiAgICAgICAgICAgIC8vIHRvcFxuICAgICAgICAgICAgY2FzZSAndG9wLWxlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktc3RhcnQnLCAnaXRlbXMtc3RhcnQnXVxuICAgICAgICAgICAgY2FzZSAndG9wLWNlbnRlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1jZW50ZXInLCAnaXRlbXMtc3RhcnQnXVxuICAgICAgICAgICAgY2FzZSAndG9wLXJpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LWVuZCcsICdpdGVtcy1zdGFydCddXG5cbiAgICAgICAgICAgIC8vIGNlbnRlclxuICAgICAgICAgICAgY2FzZSAnY2VudGVyLWxlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktc3RhcnQnLCAnaXRlbXMtY2VudGVyJ11cbiAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1jZW50ZXInLCAnaXRlbXMtY2VudGVyJ11cbiAgICAgICAgICAgIGNhc2UgJ2NlbnRlci1yaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1lbmQnLCAnaXRlbXMtY2VudGVyJ11cblxuICAgICAgICAgICAgLy8gYm90dG9tXG4gICAgICAgICAgICBjYXNlICdib3R0b20tbGVmdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1zdGFydCcsICdpdGVtcy1lbmQnXVxuICAgICAgICAgICAgY2FzZSAnYm90dG9tLWNlbnRlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1jZW50ZXInLCAnaXRlbXMtZW5kJ11cbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbS1yaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1lbmQnLCAnaXRlbXMtZW5kJ11cblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LWNlbnRlcicsICdpdGVtcy1jZW50ZXInXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICBpZiAodGhpcy5faXNIaWRkZW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblRvZ2dsZSh0aGlzKVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2ZsZXgnKVxuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICB0aGlzLl90YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnLCAndHJ1ZScpXG4gICAgICAgIHRoaXMuX3RhcmdldEVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKVxuICAgICAgICB0aGlzLl90YXJnZXRFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJylcbiAgICAgICAgdGhpcy5fY3JlYXRlQmFja2Ryb3AoKVxuICAgICAgICB0aGlzLl9pc0hpZGRlbiA9IGZhbHNlXG5cbiAgICAgICAgLy8gcHJldmVudCBib2R5IHNjcm9sbFxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93LWhpZGRlbicpXG5cbiAgICAgICAgLy8gQWRkIGtleWJvYXJkIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBkb2N1bWVudFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXYgPT4ge1xuICAgICAgICAgICAgaWYgKGV2LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25TaG93KHRoaXMpXG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnZmxleCcpXG4gICAgICAgIHRoaXMuX3RhcmdldEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAgIHRoaXMuX3RhcmdldEVsLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcpXG4gICAgICAgIHRoaXMuX3RhcmdldEVsLnJlbW92ZUF0dHJpYnV0ZSgncm9sZScpXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lCYWNrZHJvcEVsKClcbiAgICAgICAgdGhpcy5faXNIaWRkZW4gPSB0cnVlXG5cbiAgICAgICAgLy8gcmUtYXBwbHkgYm9keSBzY3JvbGxcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyZmxvdy1oaWRkZW4nKVxuXG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25IaWRlKHRoaXMpXG4gICAgfVxuXG4gICAgaXNIaWRkZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0hpZGRlblxuICAgIH1cblxufVxuXG53aW5kb3cuTW9kYWwgPSBNb2RhbDtcblxuY29uc3QgZ2V0TW9kYWxJbnN0YW5jZSA9IChpZCwgaW5zdGFuY2VzKSA9PiB7XG4gICAgaWYgKGluc3RhbmNlcy5zb21lKG1vZGFsSW5zdGFuY2UgPT4gbW9kYWxJbnN0YW5jZS5pZCA9PT0gaWQpKSB7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZXMuZmluZChtb2RhbEluc3RhbmNlID0+IG1vZGFsSW5zdGFuY2UuaWQgPT09IGlkKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRNb2RhbHMoKSB7XG4gICAgbGV0IG1vZGFsSW5zdGFuY2VzID0gW11cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC10b2dnbGVdJykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGFsSWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtdG9nZ2xlJyk7XG4gICAgICAgIGNvbnN0IG1vZGFsRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElkKTtcbiAgICAgICAgY29uc3QgcGxhY2VtZW50ID0gbW9kYWxFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtcGxhY2VtZW50JylcbiAgICAgICAgY29uc3QgYmFja2Ryb3AgPSBtb2RhbEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC1iYWNrZHJvcCcpXG5cbiAgICAgICAgaWYgKG1vZGFsRWwpIHtcbiAgICAgICAgICAgIGlmICghbW9kYWxFbC5oYXNBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJykgJiYgIW1vZGFsRWwuaGFzQXR0cmlidXRlKCdhcmlhLW1vZGFsJykpIHtcbiAgICAgICAgICAgICAgICBtb2RhbEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1vZGFsID0gbnVsbFxuICAgICAgICBpZiAoZ2V0TW9kYWxJbnN0YW5jZShtb2RhbElkLCBtb2RhbEluc3RhbmNlcykpIHtcbiAgICAgICAgICAgIG1vZGFsID0gZ2V0TW9kYWxJbnN0YW5jZShtb2RhbElkLCBtb2RhbEluc3RhbmNlcylcbiAgICAgICAgICAgIG1vZGFsID0gbW9kYWwub2JqZWN0XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RhbCA9IG5ldyBNb2RhbChtb2RhbEVsLCB7XG4gICAgICAgICAgICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQgPyBwbGFjZW1lbnQgOiBEZWZhdWx0LnBsYWNlbWVudCxcbiAgICAgICAgICAgICAgICBiYWNrZHJvcDogYmFja2Ryb3AgPyBiYWNrZHJvcCA6IERlZmF1bHQuYmFja2Ryb3BcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2VzLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiBtb2RhbElkLFxuICAgICAgICAgICAgICAgIG9iamVjdDogbW9kYWxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9kYWxFbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtc2hvdycpICYmIG1vZGFsRWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLXNob3cnKSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBtb2RhbC5zaG93KCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG1vZGFsLnRvZ2dsZSgpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxcbiIsImltcG9ydCB7IGNyZWF0ZVBvcHBlciB9IGZyb20gJ0Bwb3BwZXJqcy9jb3JlJztcblxuY29uc3QgRGVmYXVsdCA9IHtcbiAgICBwbGFjZW1lbnQ6ICd0b3AnLFxuICAgIG9mZnNldDogMTAsXG4gICAgdHJpZ2dlclR5cGU6ICdob3ZlcicsXG4gICAgb25TaG93OiAoKSA9PiB7IH0sXG4gICAgb25IaWRlOiAoKSA9PiB7IH1cbn1cblxuY2xhc3MgUG9wb3ZlciB7XG4gICAgY29uc3RydWN0b3IodGFyZ2V0RWwgPSBudWxsLCB0cmlnZ2VyRWwgPSBudWxsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwgPSB0YXJnZXRFbFxuICAgICAgICB0aGlzLl90cmlnZ2VyRWwgPSB0cmlnZ2VyRWxcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHsgLi4uRGVmYXVsdCwgLi4ub3B0aW9ucyB9XG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlID0gdGhpcy5fY3JlYXRlUG9wcGVySW5zdGFjZSgpXG4gICAgICAgIHRoaXMuX2luaXQoKVxuICAgIH1cblxuICAgIF9pbml0KCkge1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICBjb25zdCB0cmlnZ2VyRXZlbnRzID0gdGhpcy5fZ2V0VHJpZ2dlckV2ZW50cygpXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzLnNob3dFdmVudHMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMuaGlkZUV2ZW50cy5mb3JFYWNoKGV2ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fdGFyZ2V0RWwubWF0Y2hlcygnOmhvdmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5hZGRFdmVudExpc3RlbmVyKGV2LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl90cmlnZ2VyRWwubWF0Y2hlcygnOmhvdmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY3JlYXRlUG9wcGVySW5zdGFjZSgpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVBvcHBlcih0aGlzLl90cmlnZ2VyRWwsIHRoaXMuX3RhcmdldEVsLCB7XG4gICAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMuX29wdGlvbnMucGxhY2VtZW50LFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnb2Zmc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBbMCwgdGhpcy5fb3B0aW9ucy5vZmZzZXRdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfZ2V0VHJpZ2dlckV2ZW50cygpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9vcHRpb25zLnRyaWdnZXJUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdob3Zlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydtb3VzZWVudGVyJywgJ2ZvY3VzJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnbW91c2VsZWF2ZScsICdibHVyJ11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydjbGljaycsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ2ZvY3Vzb3V0JywgJ2JsdXInXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydtb3VzZWVudGVyJywgJ2ZvY3VzJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnbW91c2VsZWF2ZScsICdibHVyJ11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGFjaXR5LTAnLCAnaW52aXNpYmxlJylcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnb3BhY2l0eS0xMDAnLCAndmlzaWJsZScpXG5cbiAgICAgICAgLy8gRW5hYmxlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2Uuc2V0T3B0aW9ucyhvcHRpb25zID0+ICh7XG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBbXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9ucy5tb2RpZmllcnMsXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLCBlbmFibGVkOiB0cnVlIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gVXBkYXRlIGl0cyBwb3NpdGlvblxuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS51cGRhdGUoKVxuXG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25TaG93KHRoaXMpXG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BhY2l0eS0xMDAnLCAndmlzaWJsZScpXG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ29wYWNpdHktMCcsICdpbnZpc2libGUnKVxuXG4gICAgICAgIC8vIERpc2FibGUgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS5zZXRPcHRpb25zKG9wdGlvbnMgPT4gKHtcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICBtb2RpZmllcnM6IFtcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25zLm1vZGlmaWVycyxcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICdldmVudExpc3RlbmVycycsIGVuYWJsZWQ6IGZhbHNlIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkhpZGUodGhpcylcbiAgICB9XG59XG5cbndpbmRvdy5Qb3BvdmVyID0gUG9wb3ZlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRQb3BvdmVycygpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wb3BvdmVyLXRhcmdldF0nKS5mb3JFYWNoKHRyaWdnZXJFbCA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3BvdmVyLXRhcmdldCcpKVxuICAgICAgICBjb25zdCB0cmlnZ2VyVHlwZSA9IHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9wb3Zlci10cmlnZ2VyJyk7XG4gICAgICAgIGNvbnN0IHBsYWNlbWVudCA9IHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9wb3Zlci1wbGFjZW1lbnQnKTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3BvdmVyLW9mZnNldCcpO1xuXG4gICAgICAgIG5ldyBQb3BvdmVyKHRhcmdldEVsLCB0cmlnZ2VyRWwsIHtcbiAgICAgICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50ID8gcGxhY2VtZW50IDogRGVmYXVsdC5wbGFjZW1lbnQsXG4gICAgICAgICAgICBvZmZzZXQ6IG9mZnNldCA/IHBhcnNlSW50KG9mZnNldCkgOiBEZWZhdWx0Lm9mZnNldCxcbiAgICAgICAgICAgIHRyaWdnZXJUeXBlOiB0cmlnZ2VyVHlwZSA/IHRyaWdnZXJUeXBlIDogRGVmYXVsdC50cmlnZ2VyVHlwZVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcG92ZXIiLCJjb25zdCBEZWZhdWx0ID0ge1xuICAgIGRlZmF1bHRUYWJJZDogbnVsbCxcbiAgICBhY3RpdmVDbGFzc2VzOiAndGV4dC1ibHVlLTYwMCBob3Zlcjp0ZXh0LWJsdWUtNjAwIGRhcms6dGV4dC1ibHVlLTUwMCBkYXJrOmhvdmVyOnRleHQtYmx1ZS01MDAgYm9yZGVyLWJsdWUtNjAwIGRhcms6Ym9yZGVyLWJsdWUtNTAwJyxcbiAgICBpbmFjdGl2ZUNsYXNzZXM6ICdkYXJrOmJvcmRlci10cmFuc3BhcmVudCB0ZXh0LWdyYXktNTAwIGhvdmVyOnRleHQtZ3JheS02MDAgZGFyazp0ZXh0LWdyYXktNDAwIGJvcmRlci1ncmF5LTEwMCBob3Zlcjpib3JkZXItZ3JheS0zMDAgZGFyazpib3JkZXItZ3JheS03MDAgZGFyazpob3Zlcjp0ZXh0LWdyYXktMzAwJyxcbiAgICBvblNob3c6ICgpID0+IHsgfVxufVxuXG5jbGFzcyBUYWJzIHtcbiAgICBjb25zdHJ1Y3RvcihpdGVtcyA9IFtdLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5faXRlbXMgPSBpdGVtc1xuICAgICAgICB0aGlzLl9hY3RpdmVUYWIgPSBvcHRpb25zID8gdGhpcy5nZXRUYWIob3B0aW9ucy5kZWZhdWx0VGFiSWQpIDogbnVsbFxuICAgICAgICB0aGlzLl9vcHRpb25zID0geyAuLi5EZWZhdWx0LCAuLi5vcHRpb25zIH1cbiAgICAgICAgdGhpcy5faW5pdCgpXG4gICAgfVxuXG4gICAgX2luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIHNldCB0aGUgZmlyc3QgdGFiIGFzIGFjdGl2ZSBpZiBub3Qgc2V0IGJ5IGV4cGxpY2l0bHlcbiAgICAgICAgICAgIGlmICghdGhpcy5fYWN0aXZlVGFiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0QWN0aXZlVGFiKHRoaXMuX2l0ZW1zWzBdKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmb3JjZSBzaG93IHRoZSBmaXJzdCBkZWZhdWx0IHRhYlxuICAgICAgICAgICAgdGhpcy5zaG93KHRoaXMuX2FjdGl2ZVRhYi5pZCwgdHJ1ZSlcblxuICAgICAgICAgICAgLy8gc2hvdyB0YWIgY29udGVudCBiYXNlZCBvbiBjbGlja1xuICAgICAgICAgICAgdGhpcy5faXRlbXMubWFwKHRhYiA9PiB7XG4gICAgICAgICAgICAgICAgdGFiLnRyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KHRhYi5pZClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFjdGl2ZVRhYigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYlxuICAgIH1cblxuICAgIF9zZXRBY3RpdmVUYWIodGFiKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRhYiA9IHRhYlxuICAgIH1cblxuICAgIGdldFRhYihpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuZmlsdGVyKHQgPT4gdC5pZCA9PT0gaWQpWzBdXG4gICAgfVxuXG4gICAgc2hvdyhpZCwgZm9yY2VTaG93ID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdGFiID0gdGhpcy5nZXRUYWIoaWQpXG5cbiAgICAgICAgLy8gZG9uJ3QgZG8gYW55dGhpbmcgaWYgYWxyZWFkeSBhY3RpdmVcbiAgICAgICAgaWYgKHRhYiA9PT0gdGhpcy5fYWN0aXZlVGFiICYmICFmb3JjZVNob3cpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGlkZSBvdGhlciB0YWJzXG4gICAgICAgIHRoaXMuX2l0ZW1zLm1hcCh0ID0+IHtcbiAgICAgICAgICAgIGlmICh0ICE9PSB0YWIpIHtcbiAgICAgICAgICAgICAgICB0LnRyaWdnZXJFbC5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX29wdGlvbnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdChcIiBcIikpO1xuICAgICAgICAgICAgICAgIHQudHJpZ2dlckVsLmNsYXNzTGlzdC5hZGQoLi4udGhpcy5fb3B0aW9ucy5pbmFjdGl2ZUNsYXNzZXMuc3BsaXQoXCIgXCIpKTtcbiAgICAgICAgICAgICAgICB0LnRhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICAgICAgICAgICAgdC50cmlnZ2VyRWwuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgZmFsc2UpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gc2hvdyBhY3RpdmUgdGFiXG4gICAgICAgIHRhYi50cmlnZ2VyRWwuY2xhc3NMaXN0LmFkZCguLi50aGlzLl9vcHRpb25zLmFjdGl2ZUNsYXNzZXMuc3BsaXQoXCIgXCIpKTtcbiAgICAgICAgdGFiLnRyaWdnZXJFbC5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX29wdGlvbnMuaW5hY3RpdmVDbGFzc2VzLnNwbGl0KFwiIFwiKSk7XG4gICAgICAgIHRhYi50cmlnZ2VyRWwuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSlcbiAgICAgICAgdGFiLnRhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG5cbiAgICAgICAgdGhpcy5fc2V0QWN0aXZlVGFiKHRhYilcblxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uU2hvdyh0aGlzLCB0YWIpXG4gICAgfVxuXG59XG5cbndpbmRvdy5UYWJzID0gVGFicztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUYWJzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnMtdG9nZ2xlXScpLmZvckVhY2godHJpZ2dlckVsID0+IHtcblxuICAgICAgICBjb25zdCB0YWJFbGVtZW50cyA9IFtdXG4gICAgICAgIGxldCBkZWZhdWx0VGFiSWQgPSBudWxsXG4gICAgICAgIHRyaWdnZXJFbC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYlwiXScpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKSA9PT0gJ3RydWUnXG4gICAgICAgICAgICBjb25zdCB0YWIgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10YWJzLXRhcmdldCcpLFxuICAgICAgICAgICAgICAgIHRyaWdnZXJFbDogZWwsXG4gICAgICAgICAgICAgICAgdGFyZ2V0RWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYnMtdGFyZ2V0JykpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJFbGVtZW50cy5wdXNoKHRhYilcblxuICAgICAgICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRhYklkID0gdGFiLmlkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIG5ldyBUYWJzKHRhYkVsZW1lbnRzLCB7XG4gICAgICAgICAgICBkZWZhdWx0VGFiSWQ6IGRlZmF1bHRUYWJJZFxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYnMiLCJpbXBvcnQgeyBjcmVhdGVQb3BwZXIgfSBmcm9tICdAcG9wcGVyanMvY29yZSc7XG5cbmNvbnN0IERlZmF1bHQgPSB7XG4gICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICB0cmlnZ2VyVHlwZTogJ2hvdmVyJyxcbiAgICBvblNob3c6ICgpID0+IHsgfSxcbiAgICBvbkhpZGU6ICgpID0+IHsgfVxufVxuXG5jbGFzcyBUb29sdGlwIHtcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXRFbCA9IG51bGwsIHRyaWdnZXJFbCA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsXG4gICAgICAgIHRoaXMuX3RyaWdnZXJFbCA9IHRyaWdnZXJFbFxuICAgICAgICB0aGlzLl9vcHRpb25zID0geyAuLi5EZWZhdWx0LCAuLi5vcHRpb25zIH1cbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2UgPSB0aGlzLl9jcmVhdGVQb3BwZXJJbnN0YWNlKClcbiAgICAgICAgdGhpcy5faW5pdCgpXG4gICAgfVxuXG4gICAgX2luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJFdmVudHMgPSB0aGlzLl9nZXRUcmlnZ2VyRXZlbnRzKClcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMuc2hvd0V2ZW50cy5mb3JFYWNoKGV2ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cy5oaWRlRXZlbnRzLmZvckVhY2goZXYgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKGV2LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY3JlYXRlUG9wcGVySW5zdGFjZSgpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVBvcHBlcih0aGlzLl90cmlnZ2VyRWwsIHRoaXMuX3RhcmdldEVsLCB7XG4gICAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMuX29wdGlvbnMucGxhY2VtZW50LFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnb2Zmc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBbMCwgOF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9nZXRUcmlnZ2VyRXZlbnRzKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX29wdGlvbnMudHJpZ2dlclR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hvdmVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ21vdXNlZW50ZXInLCAnZm9jdXMnXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydtb3VzZWxlYXZlJywgJ2JsdXInXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ2NsaWNrJywgJ2ZvY3VzJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnZm9jdXNvdXQnLCAnYmx1ciddXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ21vdXNlZW50ZXInLCAnZm9jdXMnXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydtb3VzZWxlYXZlJywgJ2JsdXInXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wYWNpdHktMCcsICdpbnZpc2libGUnKVxuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdvcGFjaXR5LTEwMCcsICd2aXNpYmxlJylcblxuICAgICAgICAvLyBFbmFibGUgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS5zZXRPcHRpb25zKG9wdGlvbnMgPT4gKHtcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICBtb2RpZmllcnM6IFtcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25zLm1vZGlmaWVycyxcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICdldmVudExpc3RlbmVycycsIGVuYWJsZWQ6IHRydWUgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pKTtcblxuICAgICAgICAvLyBVcGRhdGUgaXRzIHBvc2l0aW9uXG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlLnVwZGF0ZSgpXG5cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblNob3codGhpcylcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGFjaXR5LTEwMCcsICd2aXNpYmxlJylcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnb3BhY2l0eS0wJywgJ2ludmlzaWJsZScpXG5cbiAgICAgICAgLy8gRGlzYWJsZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlLnNldE9wdGlvbnMob3B0aW9ucyA9PiAoe1xuICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgIG1vZGlmaWVyczogW1xuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnMubW9kaWZpZXJzLFxuICAgICAgICAgICAgICAgIHsgbmFtZTogJ2V2ZW50TGlzdGVuZXJzJywgZW5hYmxlZDogZmFsc2UgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pKTtcblxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uSGlkZSh0aGlzKVxuICAgIH1cbn1cblxud2luZG93LlRvb2x0aXAgPSBUb29sdGlwO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFRvb2x0aXBzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvb2x0aXAtdGFyZ2V0XScpLmZvckVhY2godHJpZ2dlckVsID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAtdGFyZ2V0JykpXG4gICAgICAgIGNvbnN0IHRyaWdnZXJUeXBlID0gdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwLXRyaWdnZXInKTtcbiAgICAgICAgY29uc3QgcGxhY2VtZW50ID0gdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwLXBsYWNlbWVudCcpO1xuXG4gICAgICAgIG5ldyBUb29sdGlwKHRhcmdldEVsLCB0cmlnZ2VyRWwsIHtcbiAgICAgICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50ID8gcGxhY2VtZW50IDogRGVmYXVsdC5wbGFjZW1lbnQsXG4gICAgICAgICAgICB0cmlnZ2VyVHlwZTogdHJpZ2dlclR5cGUgPyB0cmlnZ2VyVHlwZSA6IERlZmF1bHQudHJpZ2dlclR5cGVcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBUb29sdGlwIiwiY2xhc3MgRXZlbnRzIHtcbiAgICBjb25zdHJ1Y3RvcihldmVudFR5cGUsIGV2ZW50RnVuY3Rpb25zID0gW10pIHtcbiAgICAgICAgdGhpcy5fZXZlbnRUeXBlID0gZXZlbnRUeXBlO1xuICAgICAgICB0aGlzLl9ldmVudEZ1bmN0aW9ucyA9IGV2ZW50RnVuY3Rpb25zO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50RnVuY3Rpb25zLmZvckVhY2goKGV2ZW50RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKHRoaXMuX2V2ZW50VHlwZSwgZXZlbnRGdW5jdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRzIiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICAgICAgICBpbXBvcnQgY29udGVudCBmcm9tIFwiISEuLi8uLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzZdLm9uZU9mWzFdLnVzZVsxXSEuLi8uLi9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1s2XS5vbmVPZlsxXS51c2VbMl0hLi9mbG93Yml0ZS5jc3NcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzT2xkSUUgPSBmdW5jdGlvbiBpc09sZElFKCkge1xuICB2YXIgbWVtbztcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKCkge1xuICAgIGlmICh0eXBlb2YgbWVtbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG4gICAgICAvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG4gICAgICAvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuICAgICAgbWVtbyA9IEJvb2xlYW4od2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2IpO1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufSgpO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gZ2V0VGFyZ2V0KCkge1xuICB2YXIgbWVtbyA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUodGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vW3RhcmdldF07XG4gIH07XG59KCk7XG5cbnZhciBzdHlsZXNJbkRvbSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRG9tLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRG9tW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM11cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlc0luRG9tLnB1c2goe1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiBhZGRTdHlsZShvYmosIG9wdGlvbnMpLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICB2YXIgYXR0cmlidXRlcyA9IG9wdGlvbnMuYXR0cmlidXRlcyB8fCB7fTtcblxuICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMubm9uY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJyA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgYXR0cmlidXRlcy5ub25jZSA9IG5vbmNlO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gIH0pO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zLmluc2VydChzdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChvcHRpb25zLmluc2VydCB8fCAnaGVhZCcpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxudmFyIHJlcGxhY2VUZXh0ID0gZnVuY3Rpb24gcmVwbGFjZVRleHQoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2UoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuICB9O1xufSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLm1lZGlhID8gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKS5jb25jYXQob2JqLmNzcywgXCJ9XCIpIDogb2JqLmNzczsgLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlLCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3M7XG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYTtcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ21lZGlhJyk7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGUuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXIgc2luZ2xldG9uQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgc3R5bGU7XG4gIHZhciB1cGRhdGU7XG4gIHZhciByZW1vdmU7XG5cbiAgaWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG4gICAgc3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZSA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlKG9iaik7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTsgLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4gIC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcblxuICBpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG4gIH1cblxuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5ld0xpc3QpICE9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRG9tW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRvbVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRvbS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9mbG93Yml0ZS5jc3MnO1xuXG4vLyBjb3JlIGNvbXBvbmVudHNcbmltcG9ydCBBY2NvcmRpb24sIHsgaW5pdEFjY29yZGlvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvYWNjb3JkaW9uJ1xuaW1wb3J0IENvbGxhcHNlLCB7IGluaXRDb2xsYXBzZXMgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sbGFwc2UnXG5pbXBvcnQgQ2Fyb3VzZWwsIHsgaW5pdENhcm91c2VscyB9IGZyb20gJy4vY29tcG9uZW50cy9jYXJvdXNlbCdcbmltcG9ydCBEaXNtaXNzLCB7IGluaXREaXNtaXNzZXMgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzbWlzcydcbmltcG9ydCBEcm9wZG93biwgeyBpbml0RHJvcGRvd25zIH0gZnJvbSAnLi9jb21wb25lbnRzL2Ryb3Bkb3duJ1xuaW1wb3J0IE1vZGFsLCB7IGluaXRNb2RhbHMgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwnXG5pbXBvcnQgRHJhd2VyLCB7IGluaXREcmF3ZXJzIH0gZnJvbSAnLi9jb21wb25lbnRzL2RyYXdlcidcbmltcG9ydCBUYWJzLCB7IGluaXRUYWJzIH0gZnJvbSAnLi9jb21wb25lbnRzL3RhYnMnXG5pbXBvcnQgVG9vbHRpcCwgeyBpbml0VG9vbHRpcHMgfSBmcm9tICcuL2NvbXBvbmVudHMvdG9vbHRpcCdcbmltcG9ydCBQb3BvdmVyLCB7IGluaXRQb3BvdmVycyB9IGZyb20gJy4vY29tcG9uZW50cy9wb3BvdmVyJ1xuaW1wb3J0IERpYWwsIHsgaW5pdERpYWxzIH0gZnJvbSAnLi9jb21wb25lbnRzL2RpYWwnXG5pbXBvcnQgRXZlbnRzIGZyb20gJy4vZG9tL2V2ZW50cydcblxuY29uc3QgZXZlbnRzID0gbmV3IEV2ZW50cygnbG9hZCcsIFtpbml0QWNjb3JkaW9ucywgaW5pdENvbGxhcHNlcywgaW5pdENhcm91c2VscywgaW5pdERpc21pc3NlcywgaW5pdERyb3Bkb3ducywgaW5pdE1vZGFscywgaW5pdERyYXdlcnMsIGluaXRUYWJzLCBpbml0VG9vbHRpcHMsIGluaXRQb3BvdmVycywgaW5pdERpYWxzXSlcbmV2ZW50cy5pbml0KClcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIEFjY29yZGlvbixcbiAgICBDb2xsYXBzZSxcbiAgICBDYXJvdXNlbCxcbiAgICBEaXNtaXNzLFxuICAgIERyb3Bkb3duLFxuICAgIE1vZGFsLFxuICAgIERyYXdlcixcbiAgICBUYWJzLFxuICAgIFRvb2x0aXAsXG4gICAgUG9wb3ZlcixcbiAgICBEaWFsLFxuICAgIEV2ZW50c1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9