(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Tribute = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _TributeEvents = require("./TributeEvents");

var _TributeEvents2 = _interopRequireDefault(_TributeEvents);

var _TributeMenuEvents = require("./TributeMenuEvents");

var _TributeMenuEvents2 = _interopRequireDefault(_TributeMenuEvents);

var _TributeRange = require("./TributeRange");

var _TributeRange2 = _interopRequireDefault(_TributeRange);

var _TributeSearch = require("./TributeSearch");

var _TributeSearch2 = _interopRequireDefault(_TributeSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tribute = function () {
    function Tribute(_ref) {
        var _this = this;

        var _ref$values = _ref.values,
            values = _ref$values === undefined ? null : _ref$values,
            _ref$iframe = _ref.iframe,
            iframe = _ref$iframe === undefined ? null : _ref$iframe,
            _ref$selectClass = _ref.selectClass,
            selectClass = _ref$selectClass === undefined ? 'highlight' : _ref$selectClass,
            _ref$trigger = _ref.trigger,
            trigger = _ref$trigger === undefined ? '@' : _ref$trigger,
            _ref$autoCompleteMode = _ref.autoCompleteMode,
            autoCompleteMode = _ref$autoCompleteMode === undefined ? false : _ref$autoCompleteMode,
            _ref$selectTemplate = _ref.selectTemplate,
            selectTemplate = _ref$selectTemplate === undefined ? null : _ref$selectTemplate,
            _ref$menuItemTemplate = _ref.menuItemTemplate,
            menuItemTemplate = _ref$menuItemTemplate === undefined ? null : _ref$menuItemTemplate,
            _ref$lookup = _ref.lookup,
            lookup = _ref$lookup === undefined ? 'key' : _ref$lookup,
            _ref$fillAttr = _ref.fillAttr,
            fillAttr = _ref$fillAttr === undefined ? 'value' : _ref$fillAttr,
            _ref$collection = _ref.collection,
            collection = _ref$collection === undefined ? null : _ref$collection,
            _ref$menuContainer = _ref.menuContainer,
            menuContainer = _ref$menuContainer === undefined ? null : _ref$menuContainer,
            _ref$noMatchTemplate = _ref.noMatchTemplate,
            noMatchTemplate = _ref$noMatchTemplate === undefined ? null : _ref$noMatchTemplate,
            _ref$requireLeadingSp = _ref.requireLeadingSpace,
            requireLeadingSpace = _ref$requireLeadingSp === undefined ? true : _ref$requireLeadingSp,
            _ref$allowSpaces = _ref.allowSpaces,
            allowSpaces = _ref$allowSpaces === undefined ? false : _ref$allowSpaces,
            _ref$replaceTextSuffi = _ref.replaceTextSuffix,
            replaceTextSuffix = _ref$replaceTextSuffi === undefined ? null : _ref$replaceTextSuffi,
            _ref$positionMenu = _ref.positionMenu,
            positionMenu = _ref$positionMenu === undefined ? true : _ref$positionMenu,
            _ref$spaceSelectsMatc = _ref.spaceSelectsMatch,
            spaceSelectsMatch = _ref$spaceSelectsMatc === undefined ? false : _ref$spaceSelectsMatc,
            _ref$searchOpts = _ref.searchOpts,
            searchOpts = _ref$searchOpts === undefined ? {} : _ref$searchOpts;

        _classCallCheck(this, Tribute);

        this.autoCompleteMode = autoCompleteMode;
        this.menuSelected = 0;
        this.current = {};
        this.inputEvent = false;
        this.isActive = false;
        this.menuContainer = menuContainer;
        this.allowSpaces = allowSpaces;
        this.replaceTextSuffix = replaceTextSuffix;
        this.positionMenu = positionMenu;
        this.hasTrailingSpace = false;
        this.spaceSelectsMatch = spaceSelectsMatch;

        if (this.autoCompleteMode) {
            trigger = '';
        }

        if (values) {
            this.collection = [{
                // symbol that starts the lookup
                trigger: trigger,

                // is it wrapped in an iframe
                iframe: iframe,

                // class applied to selected item
                selectClass: selectClass,

                // function called on select that retuns the content to insert
                selectTemplate: (selectTemplate || Tribute.defaultSelectTemplate).bind(this),

                // function called that returns content for an item
                menuItemTemplate: (menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(this),

                // function called when menu is empty, disables hiding of menu.
                noMatchTemplate: function (t) {
                    if (typeof t === 'function') {
                        return t.bind(_this);
                    }

                    return noMatchTemplate;
                }(noMatchTemplate),

                // column to search against in the object
                lookup: lookup,

                // column that contains the content to insert by default
                fillAttr: fillAttr,

                // array of objects or a function returning an array of objects
                values: values,

                requireLeadingSpace: requireLeadingSpace,

                searchOpts: searchOpts
            }];
        } else if (collection) {
            this.collection = collection.map(function (item) {
                return {
                    trigger: item.trigger || trigger,
                    iframe: item.iframe || iframe,
                    selectClass: item.selectClass || selectClass,
                    selectTemplate: (item.selectTemplate || Tribute.defaultSelectTemplate).bind(_this),
                    menuItemTemplate: (item.menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(_this),
                    // function called when menu is empty, disables hiding of menu.
                    noMatchTemplate: function (t) {
                        if (typeof t === 'function') {
                            return t.bind(_this);
                        }

                        return null;
                    }(noMatchTemplate),
                    lookup: item.lookup || lookup,
                    fillAttr: item.fillAttr || fillAttr,
                    values: item.values,
                    requireLeadingSpace: item.requireLeadingSpace,
                    searchOpts: item.searchOpts || searchOpts
                };
            });
        } else {
            throw new Error('[Tribute] No collection specified.');
        }

        new _TributeRange2.default(this);
        new _TributeEvents2.default(this);
        new _TributeMenuEvents2.default(this);
        new _TributeSearch2.default(this);
    }

    _createClass(Tribute, [{
        key: "triggers",
        value: function triggers() {
            return this.collection.map(function (config) {
                return config.trigger;
            });
        }
    }, {
        key: "attach",
        value: function attach(el) {
            if (!el) {
                throw new Error('[Tribute] Must pass in a DOM node or NodeList.');
            }

            // Check if it is a jQuery collection
            if (typeof jQuery !== 'undefined' && el instanceof jQuery) {
                el = el.get();
            }

            // Is el an Array/Array-like object?
            if (el.constructor === NodeList || el.constructor === HTMLCollection || el.constructor === Array) {
                var length = el.length;
                for (var i = 0; i < length; ++i) {
                    this._attach(el[i]);
                }
            } else {
                this._attach(el);
            }
        }
    }, {
        key: "_attach",
        value: function _attach(el) {
            if (el.hasAttribute('data-tribute')) {
                console.warn('Tribute was already bound to ' + el.nodeName);
            }

            this.ensureEditable(el);
            this.events.bind(el);
            el.setAttribute('data-tribute', true);
        }
    }, {
        key: "ensureEditable",
        value: function ensureEditable(element) {
            if (Tribute.inputTypes().indexOf(element.nodeName) === -1) {
                if (element.contentEditable) {
                    element.contentEditable = true;
                } else {
                    throw new Error('[Tribute] Cannot bind to ' + element.nodeName);
                }
            }
        }
    }, {
        key: "createMenu",
        value: function createMenu() {
            var wrapper = this.range.getDocument().createElement('div'),
                ul = this.range.getDocument().createElement('ul');

            wrapper.className = 'tribute-container';
            wrapper.appendChild(ul);

            if (this.menuContainer) {
                return this.menuContainer.appendChild(wrapper);
            }

            return this.range.getDocument().body.appendChild(wrapper);
        }
    }, {
        key: "showMenuFor",
        value: function showMenuFor(element, scrollTo) {
            var _this2 = this;

            // Only proceed if menu isn't already shown for the current element & mentionText
            if (this.isActive && this.current.element === element && this.current.mentionText === this.currentMentionTextSnapshot) {
                return;
            }
            this.currentMentionTextSnapshot = this.current.mentionText;

            // create the menu if it doesn't exist.
            if (!this.menu) {
                this.menu = this.createMenu();
                element.tributeMenu = this.menu;
                this.menuEvents.bind(this.menu);
            }

            this.isActive = true;
            this.menuSelected = 0;

            if (!this.current.mentionText) {
                this.current.mentionText = '';
            }

            var processValues = function processValues(values) {
                // Tribute may not be active any more by the time the value callback returns
                if (!_this2.isActive) {
                    return;
                }

                var items = _this2.search.filter(_this2.current.mentionText, values, {
                    pre: _this2.current.collection.searchOpts.pre || '<span>',
                    post: _this2.current.collection.searchOpts.post || '</span>',
                    extract: function extract(el) {
                        if (typeof _this2.current.collection.lookup === 'string') {
                            return el[_this2.current.collection.lookup];
                        } else if (typeof _this2.current.collection.lookup === 'function') {
                            return _this2.current.collection.lookup(el, _this2.current.mentionText);
                        } else {
                            throw new Error('Invalid lookup attribute, lookup must be string or function.');
                        }
                    }
                });

                _this2.current.filteredItems = items;
                var ul = _this2.menu.querySelector('ul');

                _this2.range.positionMenuAtCaret(scrollTo);

                if (!items.length) {
                    var noMatchEvent = new CustomEvent('tribute-no-match', { detail: _this2.menu });
                    _this2.current.element.dispatchEvent(noMatchEvent);
                    if (!_this2.current.collection.noMatchTemplate) {
                        _this2.hideMenu();
                    } else {
                        ul.innerHTML = _this2.current.collection.noMatchTemplate();
                    }

                    return;
                }

                ul.innerHTML = '';

                items.forEach(function (item, index) {
                    var li = _this2.range.getDocument().createElement('li');

                    li.setAttribute('data-index', index);
                    li.addEventListener('mouseenter', function (e) {
                        var li = e.target;
                        var index = li.getAttribute('data-index');
                        _this2.events.setActiveLi(index, false);
                    });
                    if (_this2.menuSelected === index) {
                        li.className = _this2.current.collection.selectClass;
                    }
                    li.innerHTML = _this2.current.collection.menuItemTemplate(item);

                    ul.appendChild(li);
                });
            };

            if (typeof this.current.collection.values === 'function') {
                this.current.collection.values(this.current.mentionText, processValues);
            } else {
                processValues(this.current.collection.values);
            }
        }
    }, {
        key: "showMenuForCollection",
        value: function showMenuForCollection(element, collectionIndex) {
            if (element !== document.activeElement) {
                this.placeCaretAtEnd(element);
            }

            this.current.collection = this.collection[collectionIndex || 0];
            this.current.externalTrigger = true;
            this.current.element = element;

            if (element.isContentEditable) this.insertTextAtCursor(this.current.collection.trigger);else this.insertAtCaret(element, this.current.collection.trigger);

            this.showMenuFor(element);
        }

        // TODO: make sure this works for inputs/textareas

    }, {
        key: "placeCaretAtEnd",
        value: function placeCaretAtEnd(el) {
            el.focus();
            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        }

        // for contenteditable

    }, {
        key: "insertTextAtCursor",
        value: function insertTextAtCursor(text) {
            var sel, range, html;
            sel = window.getSelection();
            range = sel.getRangeAt(0);
            range.deleteContents();
            var textNode = document.createTextNode(text);
            range.insertNode(textNode);
            range.selectNodeContents(textNode);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        }

        // for regular inputs

    }, {
        key: "insertAtCaret",
        value: function insertAtCaret(textarea, text) {
            var scrollPos = textarea.scrollTop;
            var caretPos = textarea.selectionStart;

            var front = textarea.value.substring(0, caretPos);
            var back = textarea.value.substring(textarea.selectionEnd, textarea.value.length);
            textarea.value = front + text + back;
            caretPos = caretPos + text.length;
            textarea.selectionStart = caretPos;
            textarea.selectionEnd = caretPos;
            textarea.focus();
            textarea.scrollTop = scrollPos;
        }
    }, {
        key: "hideMenu",
        value: function hideMenu() {
            if (this.menu) {
                this.menu.style.cssText = 'display: none;';
                this.isActive = false;
                this.menuSelected = 0;
                this.current = {};
            }
        }
    }, {
        key: "selectItemAtIndex",
        value: function selectItemAtIndex(index, originalEvent) {
            index = parseInt(index);
            if (typeof index !== 'number' || isNaN(index)) return;
            var item = this.current.filteredItems[index];
            var content = this.current.collection.selectTemplate(item);
            if (content !== null) this.replaceText(content, originalEvent, item);
        }
    }, {
        key: "replaceText",
        value: function replaceText(content, originalEvent, item) {
            this.range.replaceTriggerText(content, true, true, originalEvent, item);
        }
    }, {
        key: "_append",
        value: function _append(collection, newValues, replace) {
            if (typeof collection.values === 'function') {
                throw new Error('Unable to append to values, as it is a function.');
            } else if (!replace) {
                collection.values = collection.values.concat(newValues);
            } else {
                collection.values = newValues;
            }
        }
    }, {
        key: "append",
        value: function append(collectionIndex, newValues, replace) {
            var index = parseInt(collectionIndex);
            if (typeof index !== 'number') throw new Error('please provide an index for the collection to update.');

            var collection = this.collection[index];

            this._append(collection, newValues, replace);
        }
    }, {
        key: "appendCurrent",
        value: function appendCurrent(newValues, replace) {
            if (this.isActive) {
                this._append(this.current.collection, newValues, replace);
            } else {
                throw new Error('No active state. Please use append instead and pass an index.');
            }
        }
    }, {
        key: "detach",
        value: function detach(el) {
            if (!el) {
                throw new Error('[Tribute] Must pass in a DOM node or NodeList.');
            }

            // Check if it is a jQuery collection
            if (typeof jQuery !== 'undefined' && el instanceof jQuery) {
                el = el.get();
            }

            // Is el an Array/Array-like object?
            if (el.constructor === NodeList || el.constructor === HTMLCollection || el.constructor === Array) {
                var length = el.length;
                for (var i = 0; i < length; ++i) {
                    this._detach(el[i]);
                }
            } else {
                this._detach(el);
            }
        }
    }, {
        key: "_detach",
        value: function _detach(el) {
            var _this3 = this;

            this.events.unbind(el);
            if (el.tributeMenu) {
                this.menuEvents.unbind(el.tributeMenu);
            }

            setTimeout(function () {
                el.removeAttribute('data-tribute');
                _this3.isActive = false;
                if (el.tributeMenu) {
                    el.tributeMenu.remove();
                }
            });
        }
    }], [{
        key: "defaultSelectTemplate",
        value: function defaultSelectTemplate(item) {
            if (typeof item === 'undefined') return null;
            if (this.range.isContentEditable(this.current.element)) {
                return '<span class="tribute-mention">' + (this.current.collection.trigger + item.original[this.current.collection.fillAttr]) + '</span>';
            }

            return this.current.collection.trigger + item.original[this.current.collection.fillAttr];
        }
    }, {
        key: "defaultMenuItemTemplate",
        value: function defaultMenuItemTemplate(matchItem) {
            return matchItem.string;
        }
    }, {
        key: "inputTypes",
        value: function inputTypes() {
            return ['TEXTAREA', 'INPUT'];
        }
    }]);

    return Tribute;
}();

exports.default = Tribute;
module.exports = exports["default"];

},{"./TributeEvents":2,"./TributeMenuEvents":3,"./TributeRange":4,"./TributeSearch":5,"./utils":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TributeEvents = function () {
    function TributeEvents(tribute) {
        _classCallCheck(this, TributeEvents);

        this.tribute = tribute;
        this.tribute.events = this;
    }

    _createClass(TributeEvents, [{
        key: 'bind',
        value: function bind(element) {
            element.boundKeydown = this.keydown.bind(element, this);
            element.boundKeyup = this.keyup.bind(element, this);
            element.boundInput = this.input.bind(element, this);

            element.addEventListener('keydown', element.boundKeydown, false);
            element.addEventListener('keyup', element.boundKeyup, false);
            element.addEventListener('input', element.boundInput, false);
        }
    }, {
        key: 'unbind',
        value: function unbind(element) {
            element.removeEventListener('keydown', element.boundKeydown, false);
            element.removeEventListener('keyup', element.boundKeyup, false);
            element.removeEventListener('input', element.boundInput, false);

            delete element.boundKeydown;
            delete element.boundKeyup;
            delete element.boundInput;
        }
    }, {
        key: 'keydown',
        value: function keydown(instance, event) {
            if (instance.shouldDeactivate(event)) {
                instance.tribute.isActive = false;
                instance.tribute.hideMenu();
            }

            var element = this;
            instance.commandEvent = false;

            TributeEvents.keys().forEach(function (o) {
                if (o.key === event.keyCode) {
                    instance.commandEvent = true;
                    instance.callbacks()[o.value.toLowerCase()](event, element);
                }
            });
        }
    }, {
        key: 'input',
        value: function input(instance, event) {
            instance.inputEvent = true;
            instance.keyup.call(this, instance, event);
        }
    }, {
        key: 'click',
        value: function click(instance, event) {
            var tribute = instance.tribute;
            if (tribute.menu && tribute.menu.contains(event.target)) {
                var li = event.target;
                event.preventDefault();
                event.stopPropagation();
                while (li.nodeName.toLowerCase() !== 'li') {
                    li = li.parentNode;
                    if (!li || li === tribute.menu) {
                        throw new Error('cannot find the <li> container for the click');
                    }
                }
                tribute.selectItemAtIndex(li.getAttribute('data-index'), event);
                tribute.hideMenu();

                // TODO: should fire with externalTrigger and target is outside of menu
            } else if (tribute.current.element && !tribute.current.externalTrigger) {
                tribute.current.externalTrigger = false;
                setTimeout(function () {
                    return tribute.hideMenu();
                });
            }
        }
    }, {
        key: 'keyup',
        value: function keyup(instance, event) {
            if (instance.inputEvent) {
                instance.inputEvent = false;
            }
            instance.updateSelection(this);

            if (event.keyCode === 27) return;

            if (!instance.tribute.allowSpaces && instance.tribute.hasTrailingSpace) {
                instance.tribute.hasTrailingSpace = false;
                instance.commandEvent = true;
                instance.callbacks()["space"](event, this);
                return;
            }

            if (!instance.tribute.isActive) {
                if (instance.tribute.autoCompleteMode) {
                    instance.callbacks().triggerChar(event, this, '');
                } else {
                    var keyCode = instance.getKeyCode(instance, this, event);

                    if (isNaN(keyCode) || !keyCode) return;

                    var trigger = instance.tribute.triggers().find(function (trigger) {
                        return trigger.charCodeAt(0) === keyCode;
                    });

                    if (typeof trigger !== 'undefined') {
                        instance.callbacks().triggerChar(event, this, trigger);
                    }
                }
            }

            if ((instance.tribute.current.trigger || instance.tribute.autoCompleteMode) && instance.commandEvent === false || instance.tribute.isActive && event.keyCode === 8) {
                instance.tribute.showMenuFor(this, true);
            }
        }
    }, {
        key: 'shouldDeactivate',
        value: function shouldDeactivate(event) {
            if (!this.tribute.isActive) return false;

            if (this.tribute.current.mentionText.length === 0) {
                var eventKeyPressed = false;
                TributeEvents.keys().forEach(function (o) {
                    if (event.keyCode === o.key) eventKeyPressed = true;
                });

                return !eventKeyPressed;
            }

            return false;
        }
    }, {
        key: 'getKeyCode',
        value: function getKeyCode(instance, el, event) {
            var char = void 0;
            var tribute = instance.tribute;
            var info = tribute.range.getTriggerInfo(false, tribute.hasTrailingSpace, true, tribute.allowSpaces, tribute.autoCompleteMode);

            if (info) {
                return info.mentionTriggerChar.charCodeAt(0);
            } else {
                return false;
            }
        }
    }, {
        key: 'updateSelection',
        value: function updateSelection(el) {
            this.tribute.current.element = el;
            var info = this.tribute.range.getTriggerInfo(false, this.tribute.hasTrailingSpace, true, this.tribute.allowSpaces, this.tribute.autoCompleteMode);

            if (info) {
                this.tribute.current.selectedPath = info.mentionSelectedPath;
                this.tribute.current.mentionText = info.mentionText;
                this.tribute.current.selectedOffset = info.mentionSelectedOffset;
            }
        }
    }, {
        key: 'callbacks',
        value: function callbacks() {
            var _this = this;

            return {
                triggerChar: function triggerChar(e, el, trigger) {
                    var tribute = _this.tribute;
                    tribute.current.trigger = trigger;

                    var collectionItem = tribute.collection.find(function (item) {
                        return item.trigger === trigger;
                    });

                    tribute.current.collection = collectionItem;

                    if (tribute.inputEvent) tribute.showMenuFor(el, true);
                },
                enter: function enter(e, el) {
                    // choose selection
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        setTimeout(function () {
                            _this.tribute.selectItemAtIndex(_this.tribute.menuSelected, e);
                            _this.tribute.hideMenu();
                        }, 0);
                    }
                },
                escape: function escape(e, el) {
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this.tribute.isActive = false;
                        _this.tribute.hideMenu();
                    }
                },
                tab: function tab(e, el) {
                    // choose first match
                    _this.callbacks().enter(e, el);
                },
                space: function space(e, el) {
                    if (_this.tribute.isActive) {
                        if (_this.tribute.spaceSelectsMatch) {
                            _this.callbacks().enter(e, el);
                        } else if (!_this.tribute.allowSpaces) {
                            e.stopPropagation();
                            setTimeout(function () {
                                _this.tribute.hideMenu();
                                _this.tribute.isActive = false;
                            }, 0);
                        }
                    }
                },
                up: function up(e, el) {
                    // navigate up ul
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        var count = _this.tribute.current.filteredItems.length,
                            selected = _this.tribute.menuSelected;

                        if (count > selected && selected > 0) {
                            _this.tribute.menuSelected--;
                            _this.setActiveLi();
                        } else if (selected === 0) {
                            _this.tribute.menuSelected = count - 1;
                            _this.setActiveLi();
                            _this.tribute.menu.scrollTop = _this.tribute.menu.scrollHeight;
                        }
                    }
                },
                down: function down(e, el) {
                    // navigate down ul
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        var count = _this.tribute.current.filteredItems.length - 1,
                            selected = _this.tribute.menuSelected;

                        if (count > selected) {
                            _this.tribute.menuSelected++;
                            _this.setActiveLi();
                        } else if (count === selected) {
                            _this.tribute.menuSelected = 0;
                            _this.setActiveLi();
                            _this.tribute.menu.scrollTop = 0;
                        }
                    }
                },
                delete: function _delete(e, el) {
                    if (_this.tribute.isActive && _this.tribute.current.mentionText.length < 1) {
                        _this.tribute.hideMenu();
                    } else if (_this.tribute.isActive) {
                        _this.tribute.showMenuFor(el);
                    }
                }
            };
        }
    }, {
        key: 'setActiveLi',
        value: function setActiveLi(index) {
            var lis = this.tribute.menu.querySelectorAll('li'),
                length = lis.length >>> 0;

            if (index) this.tribute.menuSelected = parseInt(index);

            for (var i = 0; i < length; i++) {
                var li = lis[i];
                if (i === this.tribute.menuSelected) {
                    var liClientRect = li.getBoundingClientRect();
                    var menuClientRect = this.tribute.menu.getBoundingClientRect();

                    if (liClientRect.bottom > menuClientRect.bottom) {
                        var difference = liClientRect.bottom - menuClientRect.bottom;
                        this.tribute.menu.scrollBy(0, difference);
                    }
                    if (liClientRect.top < menuClientRect.top) {
                        var _difference = menuClientRect.top - liClientRect.top;
                        this.tribute.menu.scrollBy(0, -_difference);
                    }

                    li.classList.add(this.tribute.current.collection.selectClass);
                } else {
                    li.classList.remove(this.tribute.current.collection.selectClass);
                }
            }
        }
    }], [{
        key: 'keys',
        value: function keys() {
            return [{
                key: 9,
                value: 'TAB'
            }, {
                key: 8,
                value: 'DELETE'
            }, {
                key: 13,
                value: 'ENTER'
            }, {
                key: 27,
                value: 'ESCAPE'
            }, {
                key: 32,
                value: 'SPACE'
            }, {
                key: 38,
                value: 'UP'
            }, {
                key: 40,
                value: 'DOWN'
            }];
        }
    }]);

    return TributeEvents;
}();

exports.default = TributeEvents;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TributeMenuEvents = function () {
    function TributeMenuEvents(tribute) {
        _classCallCheck(this, TributeMenuEvents);

        this.tribute = tribute;
        this.tribute.menuEvents = this;
        this.menu = this.tribute.menu;
    }

    _createClass(TributeMenuEvents, [{
        key: 'bind',
        value: function bind(menu) {
            var _this = this;

            this.menuClickEvent = this.tribute.events.click.bind(null, this);
            this.menuContainerScrollEvent = this.debounce(function () {
                if (_this.tribute.isActive) {
                    _this.tribute.showMenuFor(_this.tribute.current.element, false);
                }
            }, 300, false);
            this.windowResizeEvent = this.debounce(function () {
                if (_this.tribute.isActive) {
                    _this.tribute.range.positionMenuAtCaret(true);
                }
            }, 300, false);

            // fixes IE11 issues with mousedown
            this.tribute.range.getDocument().addEventListener('MSPointerDown', this.menuClickEvent, false);
            this.tribute.range.getDocument().addEventListener('mousedown', this.menuClickEvent, false);
            window.addEventListener('resize', this.windowResizeEvent);

            if (this.menuContainer) {
                this.menuContainer.addEventListener('scroll', this.menuContainerScrollEvent, false);
            } else {
                window.addEventListener('scroll', this.menuContainerScrollEvent);
            }
        }
    }, {
        key: 'unbind',
        value: function unbind(menu) {
            this.tribute.range.getDocument().removeEventListener('mousedown', this.menuClickEvent, false);
            this.tribute.range.getDocument().removeEventListener('MSPointerDown', this.menuClickEvent, false);
            window.removeEventListener('resize', this.windowResizeEvent);

            if (this.menuContainer) {
                this.menuContainer.removeEventListener('scroll', this.menuContainerScrollEvent, false);
            } else {
                window.removeEventListener('scroll', this.menuContainerScrollEvent);
            }
        }
    }, {
        key: 'debounce',
        value: function debounce(func, wait, immediate) {
            var _this2 = this,
                _arguments = arguments;

            var timeout;
            return function () {
                var context = _this2,
                    args = _arguments;
                var later = function later() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
    }]);

    return TributeMenuEvents;
}();

exports.default = TributeMenuEvents;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Thanks to https://github.com/jeff-collins/ment.io
var TributeRange = function () {
    function TributeRange(tribute) {
        _classCallCheck(this, TributeRange);

        this.tribute = tribute;
        this.tribute.range = this;
    }

    _createClass(TributeRange, [{
        key: 'getDocument',
        value: function getDocument() {
            var iframe = void 0;
            if (this.tribute.current.collection) {
                iframe = this.tribute.current.collection.iframe;
            }

            if (!iframe) {
                return document;
            }

            return iframe.contentWindow.document;
        }
    }, {
        key: 'positionMenuAtCaret',
        value: function positionMenuAtCaret(scrollTo) {
            var _this = this;

            var context = this.tribute.current,
                coordinates = void 0;

            var info = this.getTriggerInfo(false, this.tribute.hasTrailingSpace, true, this.tribute.allowSpaces, this.tribute.autoCompleteMode);

            if (typeof info !== 'undefined') {

                if (!this.tribute.positionMenu) {
                    this.tribute.menu.style.cssText = 'display: block;';
                    return;
                }

                if (!this.isContentEditable(context.element)) {
                    coordinates = this.getTextAreaOrInputUnderlinePosition(this.tribute.current.element, info.mentionPosition);
                } else {
                    coordinates = this.getContentEditableCaretPosition(info.mentionPosition);
                }

                this.tribute.menu.style.cssText = 'top: ' + coordinates.top + 'px;\n                                     left: ' + coordinates.left + 'px;\n                                     right: ' + coordinates.right + 'px;\n                                     bottom: ' + coordinates.bottom + 'px;\n                                     position: absolute;\n                                     z-index: 10000;\n                                     display: block;';

                if (coordinates.left === 'auto') {
                    this.tribute.menu.style.left = 'auto';
                }

                if (coordinates.top === 'auto') {
                    this.tribute.menu.style.top = 'auto';
                }

                if (scrollTo) this.scrollIntoView();

                window.setTimeout(function () {
                    var menuDimensions = {
                        width: _this.tribute.menu.offsetWidth,
                        height: _this.tribute.menu.offsetHeight
                    };
                    var menuIsOffScreen = _this.isMenuOffScreen(coordinates, menuDimensions);

                    var menuIsOffScreenHorizontally = window.innerWidth > menuDimensions.width && (menuIsOffScreen.left || menuIsOffScreen.right);
                    var menuIsOffScreenVertically = window.innerHeight > menuDimensions.height && (menuIsOffScreen.top || menuIsOffScreen.bottom);
                    if (menuIsOffScreenHorizontally || menuIsOffScreenVertically) {
                        _this.tribute.menu.style.cssText = 'display: none';
                        _this.positionMenuAtCaret(scrollTo);
                    }
                }, 0);
            } else {
                this.tribute.menu.style.cssText = 'display: none';
            }
        }
    }, {
        key: 'selectElement',
        value: function selectElement(targetElement, path, offset) {
            var range = void 0;
            var elem = targetElement;

            if (path) {
                for (var i = 0; i < path.length; i++) {
                    elem = elem.childNodes[path[i]];
                    if (elem === undefined) {
                        return;
                    }
                    while (elem.length < offset) {
                        offset -= elem.length;
                        elem = elem.nextSibling;
                    }
                    if (elem.childNodes.length === 0 && !elem.length) {
                        elem = elem.previousSibling;
                    }
                }
            }
            var sel = this.getWindowSelection();

            range = this.getDocument().createRange();
            range.setStart(elem, offset);
            range.setEnd(elem, offset);
            range.collapse(true);

            try {
                sel.removeAllRanges();
            } catch (error) {}

            sel.addRange(range);
            targetElement.focus();
        }
    }, {
        key: 'replaceTriggerText',
        value: function replaceTriggerText(text, requireLeadingSpace, hasTrailingSpace, originalEvent, item) {
            var context = this.tribute.current;

            var info = this.getTriggerInfo(true, hasTrailingSpace, requireLeadingSpace, this.tribute.allowSpaces, this.tribute.autoCompleteMode);

            // Create the event
            var replaceEvent = new CustomEvent('tribute-replaced', {
                detail: {
                    item: item,
                    event: originalEvent
                }
            });

            if (info !== undefined) {
                if (!this.isContentEditable(context.element)) {
                    var myField = this.tribute.current.element;
                    var textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : ' ';
                    text += textSuffix;
                    var startPos = info.mentionPosition;
                    var endPos = info.mentionPosition + info.mentionText.length + textSuffix.length;
                    myField.value = myField.value.substring(0, startPos) + text + myField.value.substring(endPos, myField.value.length);
                    myField.selectionStart = startPos + text.length;
                    myField.selectionEnd = startPos + text.length;
                } else {
                    // add a space to the end of the pasted text
                    var _textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : '\xA0';
                    text += _textSuffix;

                    this.pasteHtml(text, info.mentionPosition, info.mentionPosition + info.mentionText.length + !this.tribute.autoCompleteMode);
                }

                context.element.dispatchEvent(replaceEvent);
            }
        }
    }, {
        key: 'pasteHtml',
        value: function pasteHtml(html, startPos, endPos) {
            var range = void 0,
                sel = void 0;
            sel = this.getWindowSelection();
            range = this.getDocument().createRange();
            range.setStart(sel.anchorNode, startPos);
            range.setEnd(sel.anchorNode, endPos);
            range.deleteContents();

            var el = this.getDocument().createElement('div');
            el.innerHTML = html;
            var frag = this.getDocument().createDocumentFragment(),
                node = void 0,
                lastNode = void 0;
            while (node = el.firstChild) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }, {
        key: 'getWindowSelection',
        value: function getWindowSelection() {
            if (this.tribute.collection.iframe) {
                return this.tribute.collection.iframe.contentWindow.getSelection();
            }

            return window.getSelection();
        }
    }, {
        key: 'getNodePositionInParent',
        value: function getNodePositionInParent(element) {
            if (element.parentNode === null) {
                return 0;
            }

            for (var i = 0; i < element.parentNode.childNodes.length; i++) {
                var node = element.parentNode.childNodes[i];

                if (node === element) {
                    return i;
                }
            }
        }
    }, {
        key: 'getContentEditableSelectedPath',
        value: function getContentEditableSelectedPath(ctx) {
            var sel = this.getWindowSelection();
            var selected = sel.anchorNode;
            var path = [];
            var offset = void 0;

            if (selected != null) {
                var i = void 0;
                var ce = selected.contentEditable;
                while (selected !== null && ce !== 'true') {
                    i = this.getNodePositionInParent(selected);
                    path.push(i);
                    selected = selected.parentNode;
                    if (selected !== null) {
                        ce = selected.contentEditable;
                    }
                }
                path.reverse();

                // getRangeAt may not exist, need alternative
                offset = sel.getRangeAt(0).startOffset;

                return {
                    selected: selected,
                    path: path,
                    offset: offset
                };
            }
        }
    }, {
        key: 'getTextPrecedingCurrentSelection',
        value: function getTextPrecedingCurrentSelection() {
            var context = this.tribute.current,
                text = '';

            if (!this.isContentEditable(context.element)) {
                var textComponent = this.tribute.current.element;
                if (textComponent) {
                    var startPos = textComponent.selectionStart;
                    if (textComponent.value && startPos >= 0) {
                        text = textComponent.value.substring(0, startPos);
                    }
                }
            } else {
                var selectedElem = this.getWindowSelection().anchorNode;

                if (selectedElem != null) {
                    var workingNodeContent = selectedElem.textContent;
                    var selectStartOffset = this.getWindowSelection().getRangeAt(0).startOffset;

                    if (workingNodeContent && selectStartOffset >= 0) {
                        text = workingNodeContent.substring(0, selectStartOffset);
                    }
                }
            }

            return text;
        }
    }, {
        key: 'getTriggerInfo',
        value: function getTriggerInfo(menuAlreadyActive, hasTrailingSpace, requireLeadingSpace, allowSpaces, isAutocomplete) {
            var _this2 = this;

            var ctx = this.tribute.current;
            var selected = void 0,
                path = void 0,
                offset = void 0;

            if (!this.isContentEditable(ctx.element)) {
                selected = this.tribute.current.element;
            } else {
                var selectionInfo = this.getContentEditableSelectedPath(ctx);

                if (selectionInfo) {
                    selected = selectionInfo.selected;
                    path = selectionInfo.path;
                    offset = selectionInfo.offset;
                }
            }

            var effectiveRange = this.getTextPrecedingCurrentSelection();
            var wordsArray = effectiveRange.split(' ');
            var worldsCount = wordsArray.length - 1;
            var mentionText = wordsArray[worldsCount].trim();

            if (isAutocomplete) {
                return {
                    mentionPosition: effectiveRange.length - mentionText.length,
                    mentionText: mentionText,
                    mentionSelectedElement: selected,
                    mentionSelectedPath: path,
                    mentionSelectedOffset: offset
                };
            }

            if (effectiveRange !== undefined && effectiveRange !== null) {
                var mostRecentTriggerCharPos = -1;
                var triggerChar = void 0;

                this.tribute.collection.forEach(function (config) {
                    var c = config.trigger;
                    var idx = config.requireLeadingSpace ? _this2.lastIndexWithLeadingSpace(effectiveRange, c) : effectiveRange.lastIndexOf(c);

                    if (idx > mostRecentTriggerCharPos) {
                        mostRecentTriggerCharPos = idx;
                        triggerChar = c;
                        requireLeadingSpace = config.requireLeadingSpace;
                    }
                });

                if (mostRecentTriggerCharPos >= 0 && (mostRecentTriggerCharPos === 0 || !requireLeadingSpace || /[\xA0\s]/g.test(effectiveRange.substring(mostRecentTriggerCharPos - 1, mostRecentTriggerCharPos)))) {
                    var currentTriggerSnippet = effectiveRange.substring(mostRecentTriggerCharPos + 1, effectiveRange.length);

                    triggerChar = effectiveRange.substring(mostRecentTriggerCharPos, mostRecentTriggerCharPos + 1);
                    var firstSnippetChar = currentTriggerSnippet.substring(0, 1);
                    var leadingSpace = currentTriggerSnippet.length > 0 && (firstSnippetChar === ' ' || firstSnippetChar === '\xA0');
                    if (hasTrailingSpace) {
                        currentTriggerSnippet = currentTriggerSnippet.trim();
                    }

                    var regex = allowSpaces ? /[^\S ]/g : /[\xA0\s]/g;

                    this.tribute.hasTrailingSpace = regex.test(currentTriggerSnippet);

                    if (!leadingSpace && (menuAlreadyActive || !regex.test(currentTriggerSnippet))) {
                        return {
                            mentionPosition: mostRecentTriggerCharPos,
                            mentionText: currentTriggerSnippet,
                            mentionSelectedElement: selected,
                            mentionSelectedPath: path,
                            mentionSelectedOffset: offset,
                            mentionTriggerChar: triggerChar
                        };
                    }
                }
            }
        }
    }, {
        key: 'lastIndexWithLeadingSpace',
        value: function lastIndexWithLeadingSpace(str, char) {
            var reversedStr = str.split('').reverse().join('');
            var index = -1;

            for (var cidx = 0, len = str.length; cidx < len; cidx++) {
                var firstChar = cidx === str.length - 1;
                var leadingSpace = /\s/.test(reversedStr[cidx + 1]);
                var match = char === reversedStr[cidx];

                if (match && (firstChar || leadingSpace)) {
                    index = str.length - 1 - cidx;
                    break;
                }
            }

            return index;
        }
    }, {
        key: 'isContentEditable',
        value: function isContentEditable(element) {
            return element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA';
        }
    }, {
        key: 'isMenuOffScreen',
        value: function isMenuOffScreen(coordinates, menuDimensions) {
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            var menuTop = typeof coordinates.top === 'number' ? coordinates.top : windowTop + windowHeight - coordinates.bottom - menuDimensions.height;
            var menuRight = typeof coordinates.right === 'number' ? coordinates.right : coordinates.left + menuDimensions.width;
            var menuBottom = typeof coordinates.bottom === 'number' ? coordinates.bottom : coordinates.top + menuDimensions.height;
            var menuLeft = typeof coordinates.left === 'number' ? coordinates.left : windowLeft + windowWidth - coordinates.right - menuDimensions.width;

            return {
                top: menuTop < Math.floor(windowTop),
                right: menuRight > Math.ceil(windowLeft + windowWidth),
                bottom: menuBottom > Math.ceil(windowTop + windowHeight),
                left: menuLeft < Math.floor(windowLeft)
            };
        }
    }, {
        key: 'getMenuDimensions',
        value: function getMenuDimensions() {
            // Width of the menu depends of its contents and position
            // We must check what its width would be without any obstruction
            // This way, we can achieve good positioning for flipping the menu
            var dimensions = {
                width: null,
                height: null
            };

            this.tribute.menu.style.cssText = 'top: 0px;\n                                 left: 0px;\n                                 position: fixed;\n                                 zIndex: 10000;\n                                 display: block;\n                                 visibility; hidden;';
            dimensions.width = this.tribute.menu.offsetWidth;
            dimensions.height = this.tribute.menu.offsetHeight;

            this.tribute.menu.style.cssText = 'display: none;';

            return dimensions;
        }
    }, {
        key: 'getTextAreaOrInputUnderlinePosition',
        value: function getTextAreaOrInputUnderlinePosition(element, position, flipped) {
            var properties = ['direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing'];

            var isFirefox = window.mozInnerScreenX !== null;

            var div = this.getDocument().createElement('div');
            div.id = 'input-textarea-caret-position-mirror-div';
            this.getDocument().body.appendChild(div);

            var style = div.style;
            var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;

            style.whiteSpace = 'pre-wrap';
            if (element.nodeName !== 'INPUT') {
                style.wordWrap = 'break-word';
            }

            // position off-screen
            style.position = 'absolute';
            style.visibility = 'hidden';

            // transfer the element's properties to the div
            properties.forEach(function (prop) {
                style[prop] = computed[prop];
            });

            if (isFirefox) {
                style.width = parseInt(computed.width) - 2 + 'px';
                if (element.scrollHeight > parseInt(computed.height)) style.overflowY = 'scroll';
            } else {
                style.overflow = 'hidden';
            }

            div.textContent = element.value.substring(0, position);

            if (element.nodeName === 'INPUT') {
                div.textContent = div.textContent.replace(/\s/g, ' ');
            }

            var span = this.getDocument().createElement('span');
            span.textContent = element.value.substring(position) || '.';
            div.appendChild(span);

            var rect = element.getBoundingClientRect();
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            var coordinates = {
                top: rect.top + windowTop + span.offsetTop + parseInt(computed.borderTopWidth) + parseInt(computed.fontSize) - element.scrollTop,
                left: rect.left + windowLeft + span.offsetLeft + parseInt(computed.borderLeftWidth)
            };

            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;

            var menuDimensions = this.getMenuDimensions();
            var menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

            if (menuIsOffScreen.right) {
                coordinates.right = windowWidth - coordinates.left;
                coordinates.left = 'auto';
            }

            var parentHeight = this.tribute.menuContainer ? this.tribute.menuContainer.offsetHeight : this.getDocument().body.offsetHeight;

            if (menuIsOffScreen.bottom) {
                var parentRect = this.tribute.menuContainer ? this.tribute.menuContainer.getBoundingClientRect() : this.getDocument().body.getBoundingClientRect();
                var scrollStillAvailable = parentHeight - (windowHeight - parentRect.top);

                coordinates.bottom = scrollStillAvailable + (windowHeight - rect.top - span.offsetTop);
                coordinates.top = 'auto';
            }

            menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);
            if (menuIsOffScreen.left) {
                coordinates.left = windowWidth > menuDimensions.width ? windowLeft + windowWidth - menuDimensions.width : windowLeft;
                delete coordinates.right;
            }
            if (menuIsOffScreen.top) {
                coordinates.top = windowHeight > menuDimensions.height ? windowTop + windowHeight - menuDimensions.height : windowTop;
                delete coordinates.bottom;
            }

            this.getDocument().body.removeChild(div);
            return coordinates;
        }
    }, {
        key: 'getContentEditableCaretPosition',
        value: function getContentEditableCaretPosition(selectedNodePosition) {
            var markerTextChar = '﻿';
            var markerEl = void 0,
                markerId = 'sel_' + new Date().getTime() + '_' + Math.random().toString().substr(2);
            var range = void 0;
            var sel = this.getWindowSelection();
            var prevRange = sel.getRangeAt(0);

            range = this.getDocument().createRange();
            range.setStart(sel.anchorNode, selectedNodePosition);
            range.setEnd(sel.anchorNode, selectedNodePosition);

            range.collapse(false);

            // Create the marker element containing a single invisible character using DOM methods and insert it
            markerEl = this.getDocument().createElement('span');
            markerEl.id = markerId;

            markerEl.appendChild(this.getDocument().createTextNode(markerTextChar));
            range.insertNode(markerEl);
            sel.removeAllRanges();
            sel.addRange(prevRange);

            var rect = markerEl.getBoundingClientRect();
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            var coordinates = {
                left: rect.left + windowLeft,
                top: rect.top + markerEl.offsetHeight + windowTop
            };
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;

            var menuDimensions = this.getMenuDimensions();
            var menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

            if (menuIsOffScreen.right) {
                coordinates.left = 'auto';
                coordinates.right = windowWidth - rect.left - windowLeft;
            }

            var parentHeight = this.tribute.menuContainer ? this.tribute.menuContainer.offsetHeight : this.getDocument().body.offsetHeight;

            if (menuIsOffScreen.bottom) {
                var parentRect = this.tribute.menuContainer ? this.tribute.menuContainer.getBoundingClientRect() : this.getDocument().body.getBoundingClientRect();
                var scrollStillAvailable = parentHeight - (windowHeight - parentRect.top);

                coordinates.top = 'auto';
                coordinates.bottom = scrollStillAvailable + (windowHeight - rect.top);
            }

            menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);
            if (menuIsOffScreen.left) {
                coordinates.left = windowWidth > menuDimensions.width ? windowLeft + windowWidth - menuDimensions.width : windowLeft;
                delete coordinates.right;
            }
            if (menuIsOffScreen.top) {
                coordinates.top = windowHeight > menuDimensions.height ? windowTop + windowHeight - menuDimensions.height : windowTop;
                delete coordinates.bottom;
            }

            markerEl.parentNode.removeChild(markerEl);
            return coordinates;
        }
    }, {
        key: 'scrollIntoView',
        value: function scrollIntoView(elem) {
            var reasonableBuffer = 20,
                clientRect = void 0;
            var maxScrollDisplacement = 100;
            var e = this.menu;

            if (typeof e === 'undefined') return;

            while (clientRect === undefined || clientRect.height === 0) {
                clientRect = e.getBoundingClientRect();

                if (clientRect.height === 0) {
                    e = e.childNodes[0];
                    if (e === undefined || !e.getBoundingClientRect) {
                        return;
                    }
                }
            }

            var elemTop = clientRect.top;
            var elemBottom = elemTop + clientRect.height;

            if (elemTop < 0) {
                window.scrollTo(0, window.pageYOffset + clientRect.top - reasonableBuffer);
            } else if (elemBottom > window.innerHeight) {
                var maxY = window.pageYOffset + clientRect.top - reasonableBuffer;

                if (maxY - window.pageYOffset > maxScrollDisplacement) {
                    maxY = window.pageYOffset + maxScrollDisplacement;
                }

                var targetY = window.pageYOffset - (window.innerHeight - elemBottom);

                if (targetY > maxY) {
                    targetY = maxY;
                }

                window.scrollTo(0, targetY);
            }
        }
    }]);

    return TributeRange;
}();

exports.default = TributeRange;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Thanks to https://github.com/mattyork/fuzzy
var TributeSearch = function () {
    function TributeSearch(tribute) {
        _classCallCheck(this, TributeSearch);

        this.tribute = tribute;
        this.tribute.search = this;
    }

    _createClass(TributeSearch, [{
        key: 'simpleFilter',
        value: function simpleFilter(pattern, array) {
            var _this = this;

            return array.filter(function (string) {
                return _this.test(pattern, string);
            });
        }
    }, {
        key: 'test',
        value: function test(pattern, string) {
            return this.match(pattern, string) !== null;
        }
    }, {
        key: 'match',
        value: function match(pattern, string, opts) {
            opts = opts || {};
            var patternIdx = 0,
                result = [],
                len = string.length,
                totalScore = 0,
                currScore = 0,
                pre = opts.pre || '',
                post = opts.post || '',
                compareString = opts.caseSensitive && string || string.toLowerCase(),
                ch = void 0,
                compareChar = void 0;

            pattern = opts.caseSensitive && pattern || pattern.toLowerCase();

            var patternCache = this.traverse(compareString, pattern, 0, 0, []);
            if (!patternCache) {
                return null;
            }

            return {
                rendered: this.render(string, patternCache.cache, pre, post),
                score: patternCache.score
            };
        }
    }, {
        key: 'traverse',
        value: function traverse(string, pattern, stringIndex, patternIndex, patternCache) {
            // if the pattern search at end
            if (pattern.length === patternIndex) {

                // calculate score and copy the cache containing the indices where it's found
                return {
                    score: this.calculateScore(patternCache),
                    cache: patternCache.slice()
                };
            }

            // if string at end or remaining pattern > remaining string
            if (string.length === stringIndex || pattern.length - patternIndex > string.length - stringIndex) {
                return undefined;
            }

            var c = pattern[patternIndex];
            var index = string.indexOf(c, stringIndex);
            var best = void 0,
                temp = void 0;

            while (index > -1) {
                patternCache.push(index);
                temp = this.traverse(string, pattern, index + 1, patternIndex + 1, patternCache);
                patternCache.pop();

                // if downstream traversal failed, return best answer so far
                if (!temp) {
                    return best;
                }

                if (!best || best.score < temp.score) {
                    best = temp;
                }

                index = string.indexOf(c, index + 1);
            }

            return best;
        }
    }, {
        key: 'calculateScore',
        value: function calculateScore(patternCache) {
            var score = 0;
            var temp = 1;

            patternCache.forEach(function (index, i) {
                if (i > 0) {
                    if (patternCache[i - 1] + 1 === index) {
                        temp += temp + 1;
                    } else {
                        temp = 1;
                    }
                }

                score += temp;
            });

            return score;
        }
    }, {
        key: 'render',
        value: function render(string, indices, pre, post) {
            var rendered = string.substring(0, indices[0]);

            indices.forEach(function (index, i) {
                rendered += pre + string[index] + post + string.substring(index + 1, indices[i + 1] ? indices[i + 1] : string.length);
            });

            return rendered;
        }
    }, {
        key: 'filter',
        value: function filter(pattern, arr, opts) {
            var _this2 = this;

            opts = opts || {};
            return arr.reduce(function (prev, element, idx, arr) {
                var str = element;

                if (opts.extract) {
                    str = opts.extract(element);

                    if (!str) {
                        // take care of undefineds / nulls / etc.
                        str = '';
                    }
                }

                var rendered = _this2.match(pattern, str, opts);

                if (rendered != null) {
                    prev[prev.length] = {
                        string: rendered.rendered,
                        score: rendered.score,
                        index: idx,
                        original: element
                    };
                }

                return prev;
            }, []).sort(function (a, b) {
                var compare = b.score - a.score;
                if (compare) return compare;
                return a.index - b.index;
            });
        }
    }]);

    return TributeSearch;
}();

exports.default = TributeSearch;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tribute = require("./Tribute");

var _Tribute2 = _interopRequireDefault(_Tribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Tribute2.default; /**
                                     * Tribute.js
                                     * Native ES6 JavaScript @mention Plugin
                                     **/

module.exports = exports["default"];

},{"./Tribute":1}],7:[function(require,module,exports){
'use strict';

if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

if (window && typeof window.CustomEvent !== "function") {
    var CustomEvent = function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };

    if (typeof window.Event !== 'undefined') {
        CustomEvent.prototype = window.Event.prototype;
    }

    window.CustomEvent = CustomEvent;
}

},{}]},{},[6])(6)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvVHJpYnV0ZS5qcyIsInNyYy9UcmlidXRlRXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVNZW51RXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVSYW5nZS5qcyIsInNyYy9UcmlidXRlU2VhcmNoLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNLE87QUFDRiwyQkFtQkc7QUFBQTs7QUFBQSwrQkFsQkMsTUFrQkQ7QUFBQSxZQWxCQyxNQWtCRCwrQkFsQlUsSUFrQlY7QUFBQSwrQkFqQkMsTUFpQkQ7QUFBQSxZQWpCQyxNQWlCRCwrQkFqQlUsSUFpQlY7QUFBQSxvQ0FoQkMsV0FnQkQ7QUFBQSxZQWhCQyxXQWdCRCxvQ0FoQmUsV0FnQmY7QUFBQSxnQ0FmQyxPQWVEO0FBQUEsWUFmQyxPQWVELGdDQWZXLEdBZVg7QUFBQSx5Q0FkQyxnQkFjRDtBQUFBLFlBZEMsZ0JBY0QseUNBZG9CLEtBY3BCO0FBQUEsdUNBYkMsY0FhRDtBQUFBLFlBYkMsY0FhRCx1Q0Fia0IsSUFhbEI7QUFBQSx5Q0FaQyxnQkFZRDtBQUFBLFlBWkMsZ0JBWUQseUNBWm9CLElBWXBCO0FBQUEsK0JBWEMsTUFXRDtBQUFBLFlBWEMsTUFXRCwrQkFYVSxLQVdWO0FBQUEsaUNBVkMsUUFVRDtBQUFBLFlBVkMsUUFVRCxpQ0FWWSxPQVVaO0FBQUEsbUNBVEMsVUFTRDtBQUFBLFlBVEMsVUFTRCxtQ0FUYyxJQVNkO0FBQUEsc0NBUkMsYUFRRDtBQUFBLFlBUkMsYUFRRCxzQ0FSaUIsSUFRakI7QUFBQSx3Q0FQQyxlQU9EO0FBQUEsWUFQQyxlQU9ELHdDQVBtQixJQU9uQjtBQUFBLHlDQU5DLG1CQU1EO0FBQUEsWUFOQyxtQkFNRCx5Q0FOdUIsSUFNdkI7QUFBQSxv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RUEsYUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE1BQXBCLEVBQTRCLEdBQTVCLEVBQWlDO0FBQzdCLG9CQUFRLEtBQUssQ0FBTCxDQUFSO0FBQ0EsZ0JBQUksVUFBVSxJQUFWLENBQWUsT0FBZixFQUF3QixLQUF4QixFQUErQixDQUEvQixFQUFrQyxJQUFsQyxDQUFKLEVBQTZDO0FBQ3pDLHVCQUFPLEtBQVA7QUFDSDtBQUNKO0FBQ0QsZUFBTyxTQUFQO0FBQ0gsS0FuQkQ7QUFvQkg7O0FBRUQsSUFBSSxVQUFVLE9BQU8sT0FBTyxXQUFkLEtBQThCLFVBQTVDLEVBQXdEO0FBQUEsUUFDN0MsV0FENkMsR0FDdEQsU0FBUyxXQUFULENBQXFCLEtBQXJCLEVBQTRCLE1BQTVCLEVBQW9DO0FBQ2xDLGlCQUFTLFVBQVU7QUFDakIscUJBQVMsS0FEUTtBQUVqQix3QkFBWSxLQUZLO0FBR2pCLG9CQUFRO0FBSFMsU0FBbkI7QUFLQSxZQUFJLE1BQU0sU0FBUyxXQUFULENBQXFCLGFBQXJCLENBQVY7QUFDQSxZQUFJLGVBQUosQ0FBb0IsS0FBcEIsRUFBMkIsT0FBTyxPQUFsQyxFQUEyQyxPQUFPLFVBQWxELEVBQThELE9BQU8sTUFBckU7QUFDQSxlQUFPLEdBQVA7QUFDRCxLQVZxRDs7QUFZdkQsUUFBSSxPQUFPLE9BQU8sS0FBZCxLQUF3QixXQUE1QixFQUF5QztBQUN2QyxvQkFBWSxTQUFaLEdBQXdCLE9BQU8sS0FBUCxDQUFhLFNBQXJDO0FBQ0Q7O0FBRUEsV0FBTyxXQUFQLEdBQXFCLFdBQXJCO0FBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgVHJpYnV0ZVV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgVHJpYnV0ZUV2ZW50cyBmcm9tIFwiLi9UcmlidXRlRXZlbnRzXCI7XG5pbXBvcnQgVHJpYnV0ZU1lbnVFdmVudHMgZnJvbSBcIi4vVHJpYnV0ZU1lbnVFdmVudHNcIjtcbmltcG9ydCBUcmlidXRlUmFuZ2UgZnJvbSBcIi4vVHJpYnV0ZVJhbmdlXCI7XG5pbXBvcnQgVHJpYnV0ZVNlYXJjaCBmcm9tIFwiLi9UcmlidXRlU2VhcmNoXCI7XG5cbmNsYXNzIFRyaWJ1dGUge1xuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgdmFsdWVzID0gbnVsbCxcbiAgICAgICAgaWZyYW1lID0gbnVsbCxcbiAgICAgICAgc2VsZWN0Q2xhc3MgPSAnaGlnaGxpZ2h0JyxcbiAgICAgICAgdHJpZ2dlciA9ICdAJyxcbiAgICAgICAgYXV0b0NvbXBsZXRlTW9kZSA9IGZhbHNlLFxuICAgICAgICBzZWxlY3RUZW1wbGF0ZSA9IG51bGwsXG4gICAgICAgIG1lbnVJdGVtVGVtcGxhdGUgPSBudWxsLFxuICAgICAgICBsb29rdXAgPSAna2V5JyxcbiAgICAgICAgZmlsbEF0dHIgPSAndmFsdWUnLFxuICAgICAgICBjb2xsZWN0aW9uID0gbnVsbCxcbiAgICAgICAgbWVudUNvbnRhaW5lciA9IG51bGwsXG4gICAgICAgIG5vTWF0Y2hUZW1wbGF0ZSA9IG51bGwsXG4gICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2UgPSB0cnVlLFxuICAgICAgICBhbGxvd1NwYWNlcyA9IGZhbHNlLFxuICAgICAgICByZXBsYWNlVGV4dFN1ZmZpeCA9IG51bGwsXG4gICAgICAgIHBvc2l0aW9uTWVudSA9IHRydWUsXG4gICAgICAgIHNwYWNlU2VsZWN0c01hdGNoID0gZmFsc2UsXG4gICAgICAgIHNlYXJjaE9wdHMgPSB7fVxuICAgIH0pIHtcbiAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVNb2RlID0gYXV0b0NvbXBsZXRlTW9kZVxuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IDBcbiAgICAgICAgdGhpcy5jdXJyZW50ID0ge31cbiAgICAgICAgdGhpcy5pbnB1dEV2ZW50ID0gZmFsc2VcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMubWVudUNvbnRhaW5lciA9IG1lbnVDb250YWluZXJcbiAgICAgICAgdGhpcy5hbGxvd1NwYWNlcyA9IGFsbG93U3BhY2VzXG4gICAgICAgIHRoaXMucmVwbGFjZVRleHRTdWZmaXggPSByZXBsYWNlVGV4dFN1ZmZpeFxuICAgICAgICB0aGlzLnBvc2l0aW9uTWVudSA9IHBvc2l0aW9uTWVudVxuICAgICAgICB0aGlzLmhhc1RyYWlsaW5nU3BhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGFjZVNlbGVjdHNNYXRjaCA9IHNwYWNlU2VsZWN0c01hdGNoO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dG9Db21wbGV0ZU1vZGUpIHtcbiAgICAgICAgICAgIHRyaWdnZXI9ICcnXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSBbe1xuICAgICAgICAgICAgICAgIC8vIHN5bWJvbCB0aGF0IHN0YXJ0cyB0aGUgbG9va3VwXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogdHJpZ2dlcixcblxuICAgICAgICAgICAgICAgIC8vIGlzIGl0IHdyYXBwZWQgaW4gYW4gaWZyYW1lXG4gICAgICAgICAgICAgICAgaWZyYW1lOiBpZnJhbWUsXG5cbiAgICAgICAgICAgICAgICAvLyBjbGFzcyBhcHBsaWVkIHRvIHNlbGVjdGVkIGl0ZW1cbiAgICAgICAgICAgICAgICBzZWxlY3RDbGFzczogc2VsZWN0Q2xhc3MsXG5cbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgb24gc2VsZWN0IHRoYXQgcmV0dW5zIHRoZSBjb250ZW50IHRvIGluc2VydFxuICAgICAgICAgICAgICAgIHNlbGVjdFRlbXBsYXRlOiAoc2VsZWN0VGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0U2VsZWN0VGVtcGxhdGUpLmJpbmQodGhpcyksXG5cbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgdGhhdCByZXR1cm5zIGNvbnRlbnQgZm9yIGFuIGl0ZW1cbiAgICAgICAgICAgICAgICBtZW51SXRlbVRlbXBsYXRlOiAobWVudUl0ZW1UZW1wbGF0ZSB8fCBUcmlidXRlLmRlZmF1bHRNZW51SXRlbVRlbXBsYXRlKS5iaW5kKHRoaXMpLFxuXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gbWVudSBpcyBlbXB0eSwgZGlzYWJsZXMgaGlkaW5nIG9mIG1lbnUuXG4gICAgICAgICAgICAgICAgbm9NYXRjaFRlbXBsYXRlOiAodCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vTWF0Y2hUZW1wbGF0ZVxuICAgICAgICAgICAgICAgIH0pKG5vTWF0Y2hUZW1wbGF0ZSksXG5cbiAgICAgICAgICAgICAgICAvLyBjb2x1bW4gdG8gc2VhcmNoIGFnYWluc3QgaW4gdGhlIG9iamVjdFxuICAgICAgICAgICAgICAgIGxvb2t1cDogbG9va3VwLFxuXG4gICAgICAgICAgICAgICAgLy8gY29sdW1uIHRoYXQgY29udGFpbnMgdGhlIGNvbnRlbnQgdG8gaW5zZXJ0IGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICAgICBmaWxsQXR0cjogZmlsbEF0dHIsXG5cbiAgICAgICAgICAgICAgICAvLyBhcnJheSBvZiBvYmplY3RzIG9yIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGFuIGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IHZhbHVlcyxcblxuICAgICAgICAgICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2U6IHJlcXVpcmVMZWFkaW5nU3BhY2UsXG5cbiAgICAgICAgICAgICAgICBzZWFyY2hPcHRzOiBzZWFyY2hPcHRzXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24ubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6IGl0ZW0udHJpZ2dlciB8fCB0cmlnZ2VyLFxuICAgICAgICAgICAgICAgICAgICBpZnJhbWU6IGl0ZW0uaWZyYW1lIHx8IGlmcmFtZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q2xhc3M6IGl0ZW0uc2VsZWN0Q2xhc3MgfHwgc2VsZWN0Q2xhc3MsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdFRlbXBsYXRlOiAoaXRlbS5zZWxlY3RUZW1wbGF0ZSB8fCBUcmlidXRlLmRlZmF1bHRTZWxlY3RUZW1wbGF0ZSkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1UZW1wbGF0ZTogKGl0ZW0ubWVudUl0ZW1UZW1wbGF0ZSB8fCBUcmlidXRlLmRlZmF1bHRNZW51SXRlbVRlbXBsYXRlKS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgd2hlbiBtZW51IGlzIGVtcHR5LCBkaXNhYmxlcyBoaWRpbmcgb2YgbWVudS5cbiAgICAgICAgICAgICAgICAgICAgbm9NYXRjaFRlbXBsYXRlOiAodCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH0pKG5vTWF0Y2hUZW1wbGF0ZSksXG4gICAgICAgICAgICAgICAgICAgIGxvb2t1cDogaXRlbS5sb29rdXAgfHwgbG9va3VwLFxuICAgICAgICAgICAgICAgICAgICBmaWxsQXR0cjogaXRlbS5maWxsQXR0ciB8fCBmaWxsQXR0cixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBpdGVtLnZhbHVlcyxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZUxlYWRpbmdTcGFjZTogaXRlbS5yZXF1aXJlTGVhZGluZ1NwYWNlLFxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hPcHRzOiBpdGVtLnNlYXJjaE9wdHMgfHwgc2VhcmNoT3B0c1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBObyBjb2xsZWN0aW9uIHNwZWNpZmllZC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgbmV3IFRyaWJ1dGVSYW5nZSh0aGlzKVxuICAgICAgICBuZXcgVHJpYnV0ZUV2ZW50cyh0aGlzKVxuICAgICAgICBuZXcgVHJpYnV0ZU1lbnVFdmVudHModGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVTZWFyY2godGhpcylcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFNlbGVjdFRlbXBsYXRlKGl0ZW0pIHtcbiAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHRoaXMucmFuZ2UuaXNDb250ZW50RWRpdGFibGUodGhpcy5jdXJyZW50LmVsZW1lbnQpKSB7XG4gICAgICAgICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cInRyaWJ1dGUtbWVudGlvblwiPicgKyAodGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udHJpZ2dlciArIGl0ZW0ub3JpZ2luYWxbdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uZmlsbEF0dHJdKSArICc8L3NwYW4+JztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnRyaWdnZXIgKyBpdGVtLm9yaWdpbmFsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmZpbGxBdHRyXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdE1lbnVJdGVtVGVtcGxhdGUobWF0Y2hJdGVtKSB7XG4gICAgICAgIHJldHVybiBtYXRjaEl0ZW0uc3RyaW5nXG4gICAgfVxuXG4gICAgc3RhdGljIGlucHV0VHlwZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ1RFWFRBUkVBJywgJ0lOUFVUJ11cbiAgICB9XG5cbiAgICB0cmlnZ2VycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5tYXAoY29uZmlnID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb25maWcudHJpZ2dlclxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGF0dGFjaChlbCkge1xuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBNdXN0IHBhc3MgaW4gYSBET00gbm9kZSBvciBOb2RlTGlzdC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXQgaXMgYSBqUXVlcnkgY29sbGVjdGlvblxuICAgICAgICBpZiAodHlwZW9mIGpRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgZWwgaW5zdGFuY2VvZiBqUXVlcnkpIHtcbiAgICAgICAgICAgIGVsID0gZWwuZ2V0KClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElzIGVsIGFuIEFycmF5L0FycmF5LWxpa2Ugb2JqZWN0P1xuICAgICAgICBpZiAoZWwuY29uc3RydWN0b3IgPT09IE5vZGVMaXN0IHx8IGVsLmNvbnN0cnVjdG9yID09PSBIVE1MQ29sbGVjdGlvbiB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSBlbC5sZW5ndGhcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdHRhY2goZWxbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hdHRhY2goZWwpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfYXR0YWNoKGVsKSB7XG4gICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdHJpYnV0ZScpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RyaWJ1dGUgd2FzIGFscmVhZHkgYm91bmQgdG8gJyArIGVsLm5vZGVOYW1lKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbnN1cmVFZGl0YWJsZShlbClcbiAgICAgICAgdGhpcy5ldmVudHMuYmluZChlbClcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXRyaWJ1dGUnLCB0cnVlKVxuICAgIH1cblxuICAgIGVuc3VyZUVkaXRhYmxlKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKFRyaWJ1dGUuaW5wdXRUeXBlcygpLmluZGV4T2YoZWxlbWVudC5ub2RlTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jb250ZW50RWRpdGFibGUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNvbnRlbnRFZGl0YWJsZSA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gQ2Fubm90IGJpbmQgdG8gJyArIGVsZW1lbnQubm9kZU5hbWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVNZW51KCkge1xuICAgICAgICBsZXQgd3JhcHBlciA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgIHVsID0gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICd0cmlidXRlLWNvbnRhaW5lcidcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh1bClcblxuICAgICAgICBpZiAodGhpcy5tZW51Q29udGFpbmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZW51Q29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXBwZXIpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcilcbiAgICB9XG5cbiAgICBzaG93TWVudUZvcihlbGVtZW50LCBzY3JvbGxUbykge1xuICAgICAgICAvLyBPbmx5IHByb2NlZWQgaWYgbWVudSBpc24ndCBhbHJlYWR5IHNob3duIGZvciB0aGUgY3VycmVudCBlbGVtZW50ICYgbWVudGlvblRleHRcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUgJiYgdGhpcy5jdXJyZW50LmVsZW1lbnQgPT09IGVsZW1lbnQgJiYgdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0ID09PSB0aGlzLmN1cnJlbnRNZW50aW9uVGV4dFNuYXBzaG90KSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50TWVudGlvblRleHRTbmFwc2hvdCA9IHRoaXMuY3VycmVudC5tZW50aW9uVGV4dFxuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgbWVudSBpZiBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgICBpZiAoIXRoaXMubWVudSkge1xuICAgICAgICAgICAgdGhpcy5tZW51ID0gdGhpcy5jcmVhdGVNZW51KClcbiAgICAgICAgICAgIGVsZW1lbnQudHJpYnV0ZU1lbnUgPSB0aGlzLm1lbnVcbiAgICAgICAgICAgIHRoaXMubWVudUV2ZW50cy5iaW5kKHRoaXMubWVudSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlXG4gICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gMFxuXG4gICAgICAgIGlmICghdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQubWVudGlvblRleHQgPSAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvY2Vzc1ZhbHVlcyA9ICh2YWx1ZXMpID0+IHtcbiAgICAgICAgICAgIC8vIFRyaWJ1dGUgbWF5IG5vdCBiZSBhY3RpdmUgYW55IG1vcmUgYnkgdGhlIHRpbWUgdGhlIHZhbHVlIGNhbGxiYWNrIHJldHVybnNcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLnNlYXJjaC5maWx0ZXIodGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0LCB2YWx1ZXMsIHtcbiAgICAgICAgICAgICAgICBwcmU6IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlYXJjaE9wdHMucHJlIHx8ICc8c3Bhbj4nLFxuICAgICAgICAgICAgICAgIHBvc3Q6IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlYXJjaE9wdHMucG9zdCB8fCAnPC9zcGFuPicsXG4gICAgICAgICAgICAgICAgZXh0cmFjdDogKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmxvb2t1cF1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwKGVsLCB0aGlzLmN1cnJlbnQubWVudGlvblRleHQpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbG9va3VwIGF0dHJpYnV0ZSwgbG9va3VwIG11c3QgYmUgc3RyaW5nIG9yIGZ1bmN0aW9uLicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQuZmlsdGVyZWRJdGVtcyA9IGl0ZW1zXG4gICAgICAgICAgICBsZXQgdWwgPSB0aGlzLm1lbnUucXVlcnlTZWxlY3RvcigndWwnKVxuXG4gICAgICAgICAgICB0aGlzLnJhbmdlLnBvc2l0aW9uTWVudUF0Q2FyZXQoc2Nyb2xsVG8pXG5cbiAgICAgICAgICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vTWF0Y2hFdmVudCA9IG5ldyBDdXN0b21FdmVudCgndHJpYnV0ZS1uby1tYXRjaCcsIHsgZGV0YWlsOiB0aGlzLm1lbnUgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5vTWF0Y2hFdmVudClcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY3VycmVudC5jb2xsZWN0aW9uLm5vTWF0Y2hUZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1bC5pbm5lckhUTUwgPSB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5ub01hdGNoVGVtcGxhdGUoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1bC5pbm5lckhUTUwgPSAnJ1xuXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBsaSA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpbmRleClcbiAgICAgICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLnNldEFjdGl2ZUxpKGluZGV4LCBmYWxzZSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnVTZWxlY3RlZCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3NcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGkuaW5uZXJIVE1MID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubWVudUl0ZW1UZW1wbGF0ZShpdGVtKVxuXG4gICAgICAgICAgICAgICAgdWwuYXBwZW5kQ2hpbGQobGkpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi52YWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcyh0aGlzLmN1cnJlbnQubWVudGlvblRleHQsIHByb2Nlc3NWYWx1ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9jZXNzVmFsdWVzKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dNZW51Rm9yQ29sbGVjdGlvbihlbGVtZW50LCBjb2xsZWN0aW9uSW5kZXgpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VDYXJldEF0RW5kKGVsZW1lbnQpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvbltjb2xsZWN0aW9uSW5kZXggfHwgMF1cbiAgICAgICAgdGhpcy5jdXJyZW50LmV4dGVybmFsVHJpZ2dlciA9IHRydWVcbiAgICAgICAgdGhpcy5jdXJyZW50LmVsZW1lbnQgPSBlbGVtZW50XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuaXNDb250ZW50RWRpdGFibGUpXG4gICAgICAgICAgICB0aGlzLmluc2VydFRleHRBdEN1cnNvcih0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi50cmlnZ2VyKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmluc2VydEF0Q2FyZXQoZWxlbWVudCwgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udHJpZ2dlcilcblxuICAgICAgICB0aGlzLnNob3dNZW51Rm9yKGVsZW1lbnQpXG4gICAgfVxuXG4gICAgLy8gVE9ETzogbWFrZSBzdXJlIHRoaXMgd29ya3MgZm9yIGlucHV0cy90ZXh0YXJlYXNcbiAgICBwbGFjZUNhcmV0QXRFbmQoZWwpIHtcbiAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuZ2V0U2VsZWN0aW9uICE9IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAmJiB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlUmFuZ2UgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhlbCk7XG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgICAgICAgICB2YXIgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQuYm9keS5jcmVhdGVUZXh0UmFuZ2UgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIHRleHRSYW5nZSA9IGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgICAgICB0ZXh0UmFuZ2UubW92ZVRvRWxlbWVudFRleHQoZWwpO1xuICAgICAgICAgICAgdGV4dFJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICAgICAgICAgIHRleHRSYW5nZS5zZWxlY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZvciBjb250ZW50ZWRpdGFibGVcbiAgICBpbnNlcnRUZXh0QXRDdXJzb3IodGV4dCkge1xuICAgICAgICB2YXIgc2VsLCByYW5nZSwgaHRtbDtcbiAgICAgICAgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICByYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xuICAgICAgICByYW5nZS5kZWxldGVDb250ZW50cygpO1xuICAgICAgICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZSh0ZXh0Tm9kZSk7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0ZXh0Tm9kZSlcbiAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpXG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG4gICAgfVxuXG4gICAgLy8gZm9yIHJlZ3VsYXIgaW5wdXRzXG4gICAgaW5zZXJ0QXRDYXJldCh0ZXh0YXJlYSwgdGV4dCkge1xuICAgICAgICB2YXIgc2Nyb2xsUG9zID0gdGV4dGFyZWEuc2Nyb2xsVG9wO1xuICAgICAgICB2YXIgY2FyZXRQb3MgPSB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcblxuICAgICAgICB2YXIgZnJvbnQgPSAodGV4dGFyZWEudmFsdWUpLnN1YnN0cmluZygwLCBjYXJldFBvcyk7XG4gICAgICAgIHZhciBiYWNrID0gKHRleHRhcmVhLnZhbHVlKS5zdWJzdHJpbmcodGV4dGFyZWEuc2VsZWN0aW9uRW5kLCB0ZXh0YXJlYS52YWx1ZS5sZW5ndGgpO1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IGZyb250ICsgdGV4dCArIGJhY2s7XG4gICAgICAgIGNhcmV0UG9zID0gY2FyZXRQb3MgKyB0ZXh0Lmxlbmd0aDtcbiAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgPSBjYXJldFBvcztcbiAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uRW5kID0gY2FyZXRQb3M7XG4gICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgIHRleHRhcmVhLnNjcm9sbFRvcCA9IHNjcm9sbFBvcztcbiAgICB9XG5cbiAgICBoaWRlTWVudSgpIHtcbiAgICAgICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgICAgICAgdGhpcy5tZW51LnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogbm9uZTsnXG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gMFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0ge31cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEl0ZW1BdEluZGV4KGluZGV4LCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgICAgIGluZGV4ID0gcGFyc2VJbnQoaW5kZXgpXG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInIHx8IGlzTmFOKGluZGV4KSkgcmV0dXJuXG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5jdXJyZW50LmZpbHRlcmVkSXRlbXNbaW5kZXhdXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0VGVtcGxhdGUoaXRlbSlcbiAgICAgICAgaWYgKGNvbnRlbnQgIT09IG51bGwpIHRoaXMucmVwbGFjZVRleHQoY29udGVudCwgb3JpZ2luYWxFdmVudCwgaXRlbSlcbiAgICB9XG5cbiAgICByZXBsYWNlVGV4dChjb250ZW50LCBvcmlnaW5hbEV2ZW50LCBpdGVtKSB7XG4gICAgICAgIHRoaXMucmFuZ2UucmVwbGFjZVRyaWdnZXJUZXh0KGNvbnRlbnQsIHRydWUsIHRydWUsIG9yaWdpbmFsRXZlbnQsIGl0ZW0pXG4gICAgfVxuXG4gICAgX2FwcGVuZChjb2xsZWN0aW9uLCBuZXdWYWx1ZXMsIHJlcGxhY2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uLnZhbHVlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gYXBwZW5kIHRvIHZhbHVlcywgYXMgaXQgaXMgYSBmdW5jdGlvbi4nKVxuICAgICAgICB9IGVsc2UgaWYgKCFyZXBsYWNlKSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnZhbHVlcyA9IGNvbGxlY3Rpb24udmFsdWVzLmNvbmNhdChuZXdWYWx1ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnZhbHVlcyA9IG5ld1ZhbHVlc1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kKGNvbGxlY3Rpb25JbmRleCwgbmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHBhcnNlSW50KGNvbGxlY3Rpb25JbmRleClcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHRocm93IG5ldyBFcnJvcigncGxlYXNlIHByb3ZpZGUgYW4gaW5kZXggZm9yIHRoZSBjb2xsZWN0aW9uIHRvIHVwZGF0ZS4nKVxuXG4gICAgICAgIGxldCBjb2xsZWN0aW9uID0gdGhpcy5jb2xsZWN0aW9uW2luZGV4XVxuXG4gICAgICAgIHRoaXMuX2FwcGVuZChjb2xsZWN0aW9uLCBuZXdWYWx1ZXMsIHJlcGxhY2UpXG4gICAgfVxuXG4gICAgYXBwZW5kQ3VycmVudChuZXdWYWx1ZXMsIHJlcGxhY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZCh0aGlzLmN1cnJlbnQuY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBhY3RpdmUgc3RhdGUuIFBsZWFzZSB1c2UgYXBwZW5kIGluc3RlYWQgYW5kIHBhc3MgYW4gaW5kZXguJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRldGFjaChlbCkge1xuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBNdXN0IHBhc3MgaW4gYSBET00gbm9kZSBvciBOb2RlTGlzdC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXQgaXMgYSBqUXVlcnkgY29sbGVjdGlvblxuICAgICAgICBpZiAodHlwZW9mIGpRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgZWwgaW5zdGFuY2VvZiBqUXVlcnkpIHtcbiAgICAgICAgICAgIGVsID0gZWwuZ2V0KClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElzIGVsIGFuIEFycmF5L0FycmF5LWxpa2Ugb2JqZWN0P1xuICAgICAgICBpZiAoZWwuY29uc3RydWN0b3IgPT09IE5vZGVMaXN0IHx8IGVsLmNvbnN0cnVjdG9yID09PSBIVE1MQ29sbGVjdGlvbiB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSBlbC5sZW5ndGhcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXRhY2goZWxbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kZXRhY2goZWwpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZGV0YWNoKGVsKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnVuYmluZChlbClcbiAgICAgICAgaWYgKGVsLnRyaWJ1dGVNZW51KSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVFdmVudHMudW5iaW5kKGVsLnRyaWJ1dGVNZW51KVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJpYnV0ZScpXG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChlbC50cmlidXRlTWVudSkge1xuICAgICAgICAgICAgICAgIGVsLnRyaWJ1dGVNZW51LnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlO1xuIiwiY2xhc3MgVHJpYnV0ZUV2ZW50cyB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5ldmVudHMgPSB0aGlzXG4gICAgfVxuXG4gICAgc3RhdGljIGtleXMoKSB7XG4gICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAga2V5OiA5LFxuICAgICAgICAgICAgdmFsdWU6ICdUQUInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogOCxcbiAgICAgICAgICAgIHZhbHVlOiAnREVMRVRFJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDEzLFxuICAgICAgICAgICAgdmFsdWU6ICdFTlRFUidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAyNyxcbiAgICAgICAgICAgIHZhbHVlOiAnRVNDQVBFJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDMyLFxuICAgICAgICAgICAgdmFsdWU6ICdTUEFDRSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAzOCxcbiAgICAgICAgICAgIHZhbHVlOiAnVVAnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogNDAsXG4gICAgICAgICAgICB2YWx1ZTogJ0RPV04nXG4gICAgICAgIH1dXG4gICAgfVxuXG4gICAgYmluZChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuYm91bmRLZXlkb3duID0gdGhpcy5rZXlkb3duLmJpbmQoZWxlbWVudCwgdGhpcyk7XG4gICAgICAgIGVsZW1lbnQuYm91bmRLZXl1cCA9IHRoaXMua2V5dXAuYmluZChlbGVtZW50LCB0aGlzKTtcbiAgICAgICAgZWxlbWVudC5ib3VuZElucHV0ID0gdGhpcy5pbnB1dC5iaW5kKGVsZW1lbnQsIHRoaXMpO1xuXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kS2V5ZG93biwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZEtleXVwLCBmYWxzZSlcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kSW5wdXQsIGZhbHNlKVxuICAgIH1cblxuICAgIHVuYmluZChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kS2V5ZG93biwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZEtleXVwLCBmYWxzZSlcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kSW5wdXQsIGZhbHNlKVxuXG4gICAgICAgIGRlbGV0ZSBlbGVtZW50LmJvdW5kS2V5ZG93blxuICAgICAgICBkZWxldGUgZWxlbWVudC5ib3VuZEtleXVwXG4gICAgICAgIGRlbGV0ZSBlbGVtZW50LmJvdW5kSW5wdXRcbiAgICB9XG5cbiAgICBrZXlkb3duKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBpZiAoaW5zdGFuY2Uuc2hvdWxkRGVhY3RpdmF0ZShldmVudCkpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXNcbiAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gZmFsc2VcblxuICAgICAgICBUcmlidXRlRXZlbnRzLmtleXMoKS5mb3JFYWNoKG8gPT4ge1xuICAgICAgICAgICAgaWYgKG8ua2V5ID09PSBldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpW28udmFsdWUudG9Mb3dlckNhc2UoKV0oZXZlbnQsIGVsZW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaW5wdXQoaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGluc3RhbmNlLmlucHV0RXZlbnQgPSB0cnVlXG4gICAgICAgIGluc3RhbmNlLmtleXVwLmNhbGwodGhpcywgaW5zdGFuY2UsIGV2ZW50KVxuICAgIH1cblxuICAgIGNsaWNrKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBsZXQgdHJpYnV0ZSA9IGluc3RhbmNlLnRyaWJ1dGVcbiAgICAgICAgaWYgKHRyaWJ1dGUubWVudSAmJiB0cmlidXRlLm1lbnUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbGV0IGxpID0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgd2hpbGUgKGxpLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdsaScpIHtcbiAgICAgICAgICAgICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICAgICAgICAgICAgICBpZiAoIWxpIHx8IGxpID09PSB0cmlidXRlLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgZmluZCB0aGUgPGxpPiBjb250YWluZXIgZm9yIHRoZSBjbGljaycpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJpYnV0ZS5zZWxlY3RJdGVtQXRJbmRleChsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgZXZlbnQpXG4gICAgICAgICAgICB0cmlidXRlLmhpZGVNZW51KClcblxuICAgICAgICAvLyBUT0RPOiBzaG91bGQgZmlyZSB3aXRoIGV4dGVybmFsVHJpZ2dlciBhbmQgdGFyZ2V0IGlzIG91dHNpZGUgb2YgbWVudVxuICAgICAgICB9IGVsc2UgaWYgKHRyaWJ1dGUuY3VycmVudC5lbGVtZW50ICYmICF0cmlidXRlLmN1cnJlbnQuZXh0ZXJuYWxUcmlnZ2VyKSB7XG4gICAgICAgICAgICB0cmlidXRlLmN1cnJlbnQuZXh0ZXJuYWxUcmlnZ2VyID0gZmFsc2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdHJpYnV0ZS5oaWRlTWVudSgpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAga2V5dXAoaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGlmIChpbnN0YW5jZS5pbnB1dEV2ZW50KSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5pbnB1dEV2ZW50ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZS51cGRhdGVTZWxlY3Rpb24odGhpcylcblxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHJldHVyblxuXG4gICAgICAgIGlmICghaW5zdGFuY2UudHJpYnV0ZS5hbGxvd1NwYWNlcyAmJiBpbnN0YW5jZS50cmlidXRlLmhhc1RyYWlsaW5nU3BhY2UpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuaGFzVHJhaWxpbmdTcGFjZSA9IGZhbHNlO1xuICAgICAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpW1wic3BhY2VcIl0oZXZlbnQsIHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS50cmlidXRlLmF1dG9Db21wbGV0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jYWxsYmFja3MoKS50cmlnZ2VyQ2hhcihldmVudCwgdGhpcywgJycpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBrZXlDb2RlID0gaW5zdGFuY2UuZ2V0S2V5Q29kZShpbnN0YW5jZSwgdGhpcywgZXZlbnQpXG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKGtleUNvZGUpIHx8ICFrZXlDb2RlKSByZXR1cm5cbiAgICBcbiAgICAgICAgICAgICAgICBsZXQgdHJpZ2dlciA9IGluc3RhbmNlLnRyaWJ1dGUudHJpZ2dlcnMoKS5maW5kKHRyaWdnZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJpZ2dlci5jaGFyQ29kZUF0KDApID09PSBrZXlDb2RlXG4gICAgICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRyaWdnZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpLnRyaWdnZXJDaGFyKGV2ZW50LCB0aGlzLCB0cmlnZ2VyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoaW5zdGFuY2UudHJpYnV0ZS5jdXJyZW50LnRyaWdnZXIgfHwgaW5zdGFuY2UudHJpYnV0ZS5hdXRvQ29tcGxldGVNb2RlKVxuICAgICAgICAgICAgICYmIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9PT0gZmFsc2VcbiAgICAgICAgICAgIHx8IGluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUgJiYgZXZlbnQua2V5Q29kZSA9PT0gOCkge1xuICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuc2hvd01lbnVGb3IodGhpcywgdHJ1ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZERlYWN0aXZhdGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHJldHVybiBmYWxzZVxuXG4gICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxldCBldmVudEtleVByZXNzZWQgPSBmYWxzZVxuICAgICAgICAgICAgVHJpYnV0ZUV2ZW50cy5rZXlzKCkuZm9yRWFjaChvID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gby5rZXkpIGV2ZW50S2V5UHJlc3NlZCA9IHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiAhZXZlbnRLZXlQcmVzc2VkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBnZXRLZXlDb2RlKGluc3RhbmNlLCBlbCwgZXZlbnQpIHtcbiAgICAgICAgbGV0IGNoYXJcbiAgICAgICAgbGV0IHRyaWJ1dGUgPSBpbnN0YW5jZS50cmlidXRlXG4gICAgICAgIGxldCBpbmZvID0gdHJpYnV0ZS5yYW5nZS5nZXRUcmlnZ2VySW5mbyhmYWxzZSwgdHJpYnV0ZS5oYXNUcmFpbGluZ1NwYWNlLCB0cnVlLCB0cmlidXRlLmFsbG93U3BhY2VzLCB0cmlidXRlLmF1dG9Db21wbGV0ZU1vZGUpXG5cbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiBpbmZvLm1lbnRpb25UcmlnZ2VyQ2hhci5jaGFyQ29kZUF0KDApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGlvbihlbCkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50ID0gZWxcbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIHRoaXMudHJpYnV0ZS5oYXNUcmFpbGluZ1NwYWNlLCB0cnVlLCB0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMsIHRoaXMudHJpYnV0ZS5hdXRvQ29tcGxldGVNb2RlKVxuXG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5zZWxlY3RlZFBhdGggPSBpbmZvLm1lbnRpb25TZWxlY3RlZFBhdGhcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50Lm1lbnRpb25UZXh0ID0gaW5mby5tZW50aW9uVGV4dFxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQuc2VsZWN0ZWRPZmZzZXQgPSBpbmZvLm1lbnRpb25TZWxlY3RlZE9mZnNldFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsbGJhY2tzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHJpZ2dlckNoYXI6IChlLCBlbCwgdHJpZ2dlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0cmlidXRlID0gdGhpcy50cmlidXRlXG4gICAgICAgICAgICAgICAgdHJpYnV0ZS5jdXJyZW50LnRyaWdnZXIgPSB0cmlnZ2VyXG5cbiAgICAgICAgICAgICAgICBsZXQgY29sbGVjdGlvbkl0ZW0gPSB0cmlidXRlLmNvbGxlY3Rpb24uZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udHJpZ2dlciA9PT0gdHJpZ2dlclxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB0cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb25JdGVtXG5cbiAgICAgICAgICAgICAgICBpZiAodHJpYnV0ZS5pbnB1dEV2ZW50KSB0cmlidXRlLnNob3dNZW51Rm9yKGVsLCB0cnVlKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudGVyOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjaG9vc2Ugc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5zZWxlY3RJdGVtQXRJbmRleCh0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkLCBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXNjYXBlOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIGZpcnN0IG1hdGNoXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MoKS5lbnRlcihlLCBlbClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGFjZTogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLnNwYWNlU2VsZWN0c01hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrcygpLmVudGVyKGUsIGVsKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGlkZU1lbnUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBuYXZpZ2F0ZSB1cCB1bFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy50cmlidXRlLmN1cnJlbnQuZmlsdGVyZWRJdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWRcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPiBzZWxlY3RlZCAmJiBzZWxlY3RlZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQtLVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkID0gY291bnQgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsVG9wID0gdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG93bjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbmF2aWdhdGUgZG93biB1bFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy50cmlidXRlLmN1cnJlbnQuZmlsdGVyZWRJdGVtcy5sZW5ndGggLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQrK1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zY3JvbGxUb3AgPSAwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVsZXRlOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlICYmIHRoaXMudHJpYnV0ZS5jdXJyZW50Lm1lbnRpb25UZXh0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuc2hvd01lbnVGb3IoZWwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlTGkoaW5kZXgpIHtcbiAgICAgICAgbGV0IGxpcyA9IHRoaXMudHJpYnV0ZS5tZW51LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyksXG4gICAgICAgICAgICBsZW5ndGggPSBsaXMubGVuZ3RoID4+PiAwXG5cbiAgICAgICAgaWYgKGluZGV4KSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkID0gcGFyc2VJbnQoaW5kZXgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsaSA9IGxpc1tpXVxuICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGlDbGllbnRSZWN0ID0gbGkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgbGV0IG1lbnVDbGllbnRSZWN0ID0gdGhpcy50cmlidXRlLm1lbnUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAobGlDbGllbnRSZWN0LmJvdHRvbSA+IG1lbnVDbGllbnRSZWN0LmJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGlmZmVyZW5jZSA9IGxpQ2xpZW50UmVjdC5ib3R0b20gLSBtZW51Q2xpZW50UmVjdC5ib3R0b207XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbEJ5KDAsIGRpZmZlcmVuY2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsaUNsaWVudFJlY3QudG9wIDwgbWVudUNsaWVudFJlY3QudG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWZmZXJlbmNlID0gbWVudUNsaWVudFJlY3QudG9wIC0gbGlDbGllbnRSZWN0LnRvcDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsQnkoMCwgLWRpZmZlcmVuY2UpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCh0aGlzLnRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdENsYXNzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdENsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlRXZlbnRzO1xuIiwiY2xhc3MgVHJpYnV0ZU1lbnVFdmVudHMge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUubWVudUV2ZW50cyA9IHRoaXNcbiAgICAgICAgdGhpcy5tZW51ID0gdGhpcy50cmlidXRlLm1lbnVcbiAgICB9XG5cbiAgICBiaW5kKG1lbnUpIHtcbiAgICAgICAgdGhpcy5tZW51Q2xpY2tFdmVudCA9IHRoaXMudHJpYnV0ZS5ldmVudHMuY2xpY2suYmluZChudWxsLCB0aGlzKVxuICAgICAgICB0aGlzLm1lbnVDb250YWluZXJTY3JvbGxFdmVudCA9IHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5zaG93TWVudUZvcih0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50LCBmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwLCBmYWxzZSlcbiAgICAgICAgdGhpcy53aW5kb3dSZXNpemVFdmVudCA9IHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5wb3NpdGlvbk1lbnVBdENhcmV0KHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDMwMCwgZmFsc2UpXG5cbiAgICAgICAgLy8gZml4ZXMgSUUxMSBpc3N1ZXMgd2l0aCBtb3VzZWRvd25cbiAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlLmdldERvY3VtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcignTVNQb2ludGVyRG93bicsXG4gICAgICAgICAgICB0aGlzLm1lbnVDbGlja0V2ZW50LCBmYWxzZSlcbiAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlLmdldERvY3VtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJyxcbiAgICAgICAgICAgIHRoaXMubWVudUNsaWNrRXZlbnQsIGZhbHNlKVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy53aW5kb3dSZXNpemVFdmVudClcblxuICAgICAgICBpZiAodGhpcy5tZW51Q29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5tZW51Q29udGFpbmVyU2Nyb2xsRXZlbnQsIGZhbHNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubWVudUNvbnRhaW5lclNjcm9sbEV2ZW50KVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICB1bmJpbmQobWVudSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0RG9jdW1lbnQoKS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLFxuICAgICAgICAgICAgdGhpcy5tZW51Q2xpY2tFdmVudCwgZmFsc2UpXG4gICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5nZXREb2N1bWVudCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ01TUG9pbnRlckRvd24nLFxuICAgICAgICAgICAgdGhpcy5tZW51Q2xpY2tFdmVudCwgZmFsc2UpXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLndpbmRvd1Jlc2l6ZUV2ZW50KVxuXG4gICAgICAgIGlmICh0aGlzLm1lbnVDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1lbnVDb250YWluZXJTY3JvbGxFdmVudCwgZmFsc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5tZW51Q29udGFpbmVyU2Nyb2xsRXZlbnQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICAgICAgdmFyIHRpbWVvdXRcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzXG4gICAgICAgICAgICB2YXIgbGF0ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGxcbiAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXRcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KVxuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpXG4gICAgICAgICAgICBpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVNZW51RXZlbnRzO1xuIiwiLy8gVGhhbmtzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9qZWZmLWNvbGxpbnMvbWVudC5pb1xuY2xhc3MgVHJpYnV0ZVJhbmdlIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmlidXRlKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZSA9IHRyaWJ1dGVcbiAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlID0gdGhpc1xuICAgIH1cblxuICAgIGdldERvY3VtZW50KCkge1xuICAgICAgICBsZXQgaWZyYW1lXG4gICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICBpZnJhbWUgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uLmlmcmFtZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpZnJhbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50XG4gICAgfVxuXG4gICAgcG9zaXRpb25NZW51QXRDYXJldChzY3JvbGxUbykge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LFxuICAgICAgICAgICAgY29vcmRpbmF0ZXNcblxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIHRoaXMudHJpYnV0ZS5oYXNUcmFpbGluZ1NwYWNlLCB0cnVlLCB0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMsIHRoaXMudHJpYnV0ZS5hdXRvQ29tcGxldGVNb2RlKVxuXG4gICAgICAgIGlmICh0eXBlb2YgaW5mbyAhPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgaWYoIXRoaXMudHJpYnV0ZS5wb3NpdGlvbk1lbnUpe1xuICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSBgZGlzcGxheTogYmxvY2s7YFxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUoY29udGV4dC5lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5nZXRUZXh0QXJlYU9ySW5wdXRVbmRlcmxpbmVQb3NpdGlvbih0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBpbmZvLm1lbnRpb25Qb3NpdGlvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5nZXRDb250ZW50RWRpdGFibGVDYXJldFBvc2l0aW9uKGluZm8ubWVudGlvblBvc2l0aW9uKVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSBgdG9wOiAke2Nvb3JkaW5hdGVzLnRvcH1weDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAke2Nvb3JkaW5hdGVzLmxlZnR9cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICR7Y29vcmRpbmF0ZXMucmlnaHR9cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAke2Nvb3JkaW5hdGVzLmJvdHRvbX1weDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei1pbmRleDogMTAwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7YFxuXG4gICAgICAgICAgICBpZiAoY29vcmRpbmF0ZXMubGVmdCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUubGVmdCA9ICdhdXRvJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29vcmRpbmF0ZXMudG9wID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS50b3AgPSAnYXV0bydcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvKSB0aGlzLnNjcm9sbEludG9WaWV3KClcblxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtZW51RGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy50cmlidXRlLm1lbnUub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnRyaWJ1dGUubWVudS5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG1lbnVJc09mZlNjcmVlbiA9IHRoaXMuaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucylcblxuICAgICAgICAgICAgICAgIGxldCBtZW51SXNPZmZTY3JlZW5Ib3Jpem9udGFsbHkgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IG1lbnVEaW1lbnNpb25zLndpZHRoICYmIChtZW51SXNPZmZTY3JlZW4ubGVmdCB8fCBtZW51SXNPZmZTY3JlZW4ucmlnaHQpXG4gICAgICAgICAgICAgICAgbGV0IG1lbnVJc09mZlNjcmVlblZlcnRpY2FsbHkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPiBtZW51RGltZW5zaW9ucy5oZWlnaHQgJiYgKG1lbnVJc09mZlNjcmVlbi50b3AgfHwgbWVudUlzT2ZmU2NyZWVuLmJvdHRvbSlcbiAgICAgICAgICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuSG9yaXpvbnRhbGx5IHx8IG1lbnVJc09mZlNjcmVlblZlcnRpY2FsbHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBub25lJ1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uTWVudUF0Q2FyZXQoc2Nyb2xsVG8pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMClcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBub25lJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0RWxlbWVudCh0YXJnZXRFbGVtZW50LCBwYXRoLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHJhbmdlXG4gICAgICAgIGxldCBlbGVtID0gdGFyZ2V0RWxlbWVudFxuXG4gICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS5jaGlsZE5vZGVzW3BhdGhbaV1dXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVsZW0ubGVuZ3RoIDwgb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCAtPSBlbGVtLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS5uZXh0U2libGluZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCAmJiAhZWxlbS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0ucHJldmlvdXNTaWJsaW5nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlUmFuZ2UoKVxuICAgICAgICByYW5nZS5zZXRTdGFydChlbGVtLCBvZmZzZXQpXG4gICAgICAgIHJhbmdlLnNldEVuZChlbGVtLCBvZmZzZXQpXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge31cblxuICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG4gICAgICAgIHRhcmdldEVsZW1lbnQuZm9jdXMoKVxuICAgIH1cblxuICAgIHJlcGxhY2VUcmlnZ2VyVGV4dCh0ZXh0LCByZXF1aXJlTGVhZGluZ1NwYWNlLCBoYXNUcmFpbGluZ1NwYWNlLCBvcmlnaW5hbEV2ZW50LCBpdGVtKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy50cmlidXRlLmN1cnJlbnRcblxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0VHJpZ2dlckluZm8odHJ1ZSwgaGFzVHJhaWxpbmdTcGFjZSwgcmVxdWlyZUxlYWRpbmdTcGFjZSwgdGhpcy50cmlidXRlLmFsbG93U3BhY2VzLCB0aGlzLnRyaWJ1dGUuYXV0b0NvbXBsZXRlTW9kZSlcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGV2ZW50XG4gICAgICAgIGxldCByZXBsYWNlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RyaWJ1dGUtcmVwbGFjZWQnLCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgICAgICAgIGV2ZW50OiBvcmlnaW5hbEV2ZW50XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKGluZm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGNvbnRleHQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbXlGaWVsZCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFN1ZmZpeCA9IHR5cGVvZiB0aGlzLnRyaWJ1dGUucmVwbGFjZVRleHRTdWZmaXggPT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUucmVwbGFjZVRleHRTdWZmaXhcbiAgICAgICAgICAgICAgICAgICAgOiAnICdcbiAgICAgICAgICAgICAgICB0ZXh0ICs9IHRleHRTdWZmaXhcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRQb3MgPSBpbmZvLm1lbnRpb25Qb3NpdGlvblxuICAgICAgICAgICAgICAgIGxldCBlbmRQb3MgPSBpbmZvLm1lbnRpb25Qb3NpdGlvbiArIGluZm8ubWVudGlvblRleHQubGVuZ3RoICsgdGV4dFN1ZmZpeC5sZW5ndGhcbiAgICAgICAgICAgICAgICBteUZpZWxkLnZhbHVlID0gbXlGaWVsZC52YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpICsgdGV4dCArXG4gICAgICAgICAgICAgICAgICAgIG15RmllbGQudmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgbXlGaWVsZC52YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgbXlGaWVsZC5zZWxlY3Rpb25TdGFydCA9IHN0YXJ0UG9zICsgdGV4dC5sZW5ndGhcbiAgICAgICAgICAgICAgICBteUZpZWxkLnNlbGVjdGlvbkVuZCA9IHN0YXJ0UG9zICsgdGV4dC5sZW5ndGhcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIGEgc3BhY2UgdG8gdGhlIGVuZCBvZiB0aGUgcGFzdGVkIHRleHRcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFN1ZmZpeCA9IHR5cGVvZiB0aGlzLnRyaWJ1dGUucmVwbGFjZVRleHRTdWZmaXggPT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUucmVwbGFjZVRleHRTdWZmaXhcbiAgICAgICAgICAgICAgICAgICAgOiAnXFx4QTAnXG4gICAgICAgICAgICAgICAgdGV4dCArPSB0ZXh0U3VmZml4XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBhc3RlSHRtbCh0ZXh0LCBpbmZvLm1lbnRpb25Qb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgaW5mby5tZW50aW9uUG9zaXRpb24gKyBpbmZvLm1lbnRpb25UZXh0Lmxlbmd0aCArICF0aGlzLnRyaWJ1dGUuYXV0b0NvbXBsZXRlTW9kZSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGV4dC5lbGVtZW50LmRpc3BhdGNoRXZlbnQocmVwbGFjZUV2ZW50KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFzdGVIdG1sKGh0bWwsIHN0YXJ0UG9zLCBlbmRQb3MpIHtcbiAgICAgICAgbGV0IHJhbmdlLCBzZWxcbiAgICAgICAgc2VsID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKVxuICAgICAgICByYW5nZSA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVSYW5nZSgpXG4gICAgICAgIHJhbmdlLnNldFN0YXJ0KHNlbC5hbmNob3JOb2RlLCBzdGFydFBvcylcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKHNlbC5hbmNob3JOb2RlLCBlbmRQb3MpXG4gICAgICAgIHJhbmdlLmRlbGV0ZUNvbnRlbnRzKClcblxuICAgICAgICBsZXQgZWwgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gaHRtbFxuICAgICAgICBsZXQgZnJhZyA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG4gICAgICAgICAgICBub2RlLCBsYXN0Tm9kZVxuICAgICAgICB3aGlsZSAoKG5vZGUgPSBlbC5maXJzdENoaWxkKSkge1xuICAgICAgICAgICAgbGFzdE5vZGUgPSBmcmFnLmFwcGVuZENoaWxkKG5vZGUpXG4gICAgICAgIH1cbiAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZShmcmFnKVxuXG4gICAgICAgIC8vIFByZXNlcnZlIHRoZSBzZWxlY3Rpb25cbiAgICAgICAgaWYgKGxhc3ROb2RlKSB7XG4gICAgICAgICAgICByYW5nZSA9IHJhbmdlLmNsb25lUmFuZ2UoKVxuICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnRBZnRlcihsYXN0Tm9kZSlcbiAgICAgICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpXG4gICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFdpbmRvd1NlbGVjdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5jb2xsZWN0aW9uLmlmcmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJpYnV0ZS5jb2xsZWN0aW9uLmlmcmFtZS5jb250ZW50V2luZG93LmdldFNlbGVjdGlvbigpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gd2luZG93LmdldFNlbGVjdGlvbigpXG4gICAgfVxuXG4gICAgZ2V0Tm9kZVBvc2l0aW9uSW5QYXJlbnQoZWxlbWVudCkge1xuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50LnBhcmVudE5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBlbGVtZW50LnBhcmVudE5vZGUuY2hpbGROb2Rlc1tpXVxuXG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDb250ZW50RWRpdGFibGVTZWxlY3RlZFBhdGgoY3R4KSB7XG4gICAgICAgIGxldCBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHNlbC5hbmNob3JOb2RlXG4gICAgICAgIGxldCBwYXRoID0gW11cbiAgICAgICAgbGV0IG9mZnNldFxuXG4gICAgICAgIGlmIChzZWxlY3RlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgaVxuICAgICAgICAgICAgbGV0IGNlID0gc2VsZWN0ZWQuY29udGVudEVkaXRhYmxlXG4gICAgICAgICAgICB3aGlsZSAoc2VsZWN0ZWQgIT09IG51bGwgJiYgY2UgIT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgIGkgPSB0aGlzLmdldE5vZGVQb3NpdGlvbkluUGFyZW50KHNlbGVjdGVkKVxuICAgICAgICAgICAgICAgIHBhdGgucHVzaChpKVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gc2VsZWN0ZWQucGFyZW50Tm9kZVxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZSA9IHNlbGVjdGVkLmNvbnRlbnRFZGl0YWJsZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhdGgucmV2ZXJzZSgpXG5cbiAgICAgICAgICAgIC8vIGdldFJhbmdlQXQgbWF5IG5vdCBleGlzdCwgbmVlZCBhbHRlcm5hdGl2ZVxuICAgICAgICAgICAgb2Zmc2V0ID0gc2VsLmdldFJhbmdlQXQoMCkuc3RhcnRPZmZzZXRcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IG9mZnNldFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VGV4dFByZWNlZGluZ0N1cnJlbnRTZWxlY3Rpb24oKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy50cmlidXRlLmN1cnJlbnQsXG4gICAgICAgICAgICB0ZXh0ID0gJydcblxuICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUoY29udGV4dC5lbGVtZW50KSkge1xuICAgICAgICAgICAgbGV0IHRleHRDb21wb25lbnQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50O1xuICAgICAgICAgICAgaWYgKHRleHRDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRQb3MgPSB0ZXh0Q29tcG9uZW50LnNlbGVjdGlvblN0YXJ0XG4gICAgICAgICAgICAgICAgaWYgKHRleHRDb21wb25lbnQudmFsdWUgJiYgc3RhcnRQb3MgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dENvbXBvbmVudC52YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRFbGVtID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKS5hbmNob3JOb2RlXG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEVsZW0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCB3b3JraW5nTm9kZUNvbnRlbnQgPSBzZWxlY3RlZEVsZW0udGV4dENvbnRlbnRcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0U3RhcnRPZmZzZXQgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpLmdldFJhbmdlQXQoMCkuc3RhcnRPZmZzZXRcblxuICAgICAgICAgICAgICAgIGlmICh3b3JraW5nTm9kZUNvbnRlbnQgJiYgc2VsZWN0U3RhcnRPZmZzZXQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gd29ya2luZ05vZGVDb250ZW50LnN1YnN0cmluZygwLCBzZWxlY3RTdGFydE9mZnNldClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGV4dFxuICAgIH1cblxuICAgIGdldFRyaWdnZXJJbmZvKG1lbnVBbHJlYWR5QWN0aXZlLCBoYXNUcmFpbGluZ1NwYWNlLCByZXF1aXJlTGVhZGluZ1NwYWNlLCBhbGxvd1NwYWNlcywgaXNBdXRvY29tcGxldGUpIHtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50XG4gICAgICAgIGxldCBzZWxlY3RlZCwgcGF0aCwgb2Zmc2V0XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGN0eC5lbGVtZW50KSkge1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uSW5mbyA9IHRoaXMuZ2V0Q29udGVudEVkaXRhYmxlU2VsZWN0ZWRQYXRoKGN0eClcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbkluZm8pIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHNlbGVjdGlvbkluZm8uc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICBwYXRoID0gc2VsZWN0aW9uSW5mby5wYXRoXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gc2VsZWN0aW9uSW5mby5vZmZzZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlZmZlY3RpdmVSYW5nZSA9IHRoaXMuZ2V0VGV4dFByZWNlZGluZ0N1cnJlbnRTZWxlY3Rpb24oKVxuICAgICAgICBsZXQgd29yZHNBcnJheSA9IGVmZmVjdGl2ZVJhbmdlLnNwbGl0KCcgJylcbiAgICAgICAgbGV0IHdvcmxkc0NvdW50ID0gd29yZHNBcnJheS5sZW5ndGggLSAxXG4gICAgICAgIGxldCBtZW50aW9uVGV4dCA9IHdvcmRzQXJyYXlbd29ybGRzQ291bnRdLnRyaW0oKVxuXG4gICAgICAgIGlmIChpc0F1dG9jb21wbGV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBtZW50aW9uUG9zaXRpb246IGVmZmVjdGl2ZVJhbmdlLmxlbmd0aCAtIG1lbnRpb25UZXh0Lmxlbmd0aCxcbiAgICAgICAgICAgICAgICBtZW50aW9uVGV4dDogbWVudGlvblRleHQsXG4gICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkRWxlbWVudDogc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRPZmZzZXQ6IG9mZnNldFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVmZmVjdGl2ZVJhbmdlICE9PSB1bmRlZmluZWQgJiYgZWZmZWN0aXZlUmFuZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPSAtMVxuICAgICAgICAgICAgbGV0IHRyaWdnZXJDaGFyXG5cbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jb2xsZWN0aW9uLmZvckVhY2goY29uZmlnID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYyA9IGNvbmZpZy50cmlnZ2VyXG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IGNvbmZpZy5yZXF1aXJlTGVhZGluZ1NwYWNlID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0SW5kZXhXaXRoTGVhZGluZ1NwYWNlKGVmZmVjdGl2ZVJhbmdlLCBjKSA6XG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdGl2ZVJhbmdlLmxhc3RJbmRleE9mKGMpXG5cbiAgICAgICAgICAgICAgICBpZiAoaWR4ID4gbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyA9IGlkeFxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQ2hhciA9IGNcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZUxlYWRpbmdTcGFjZSA9IGNvbmZpZy5yZXF1aXJlTGVhZGluZ1NwYWNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyA+PSAwICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgIXJlcXVpcmVMZWFkaW5nU3BhY2UgfHxcbiAgICAgICAgICAgICAgICAgICAgL1tcXHhBMFxcc10vZy50ZXN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgZWZmZWN0aXZlUmFuZ2Uuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRUcmlnZ2VyU25pcHBldCA9IGVmZmVjdGl2ZVJhbmdlLnN1YnN0cmluZyhtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgKyAxLFxuICAgICAgICAgICAgICAgICAgICBlZmZlY3RpdmVSYW5nZS5sZW5ndGgpXG5cbiAgICAgICAgICAgICAgICB0cmlnZ2VyQ2hhciA9IGVmZmVjdGl2ZVJhbmdlLnN1YnN0cmluZyhtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MsIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyArIDEpXG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0U25pcHBldENoYXIgPSBjdXJyZW50VHJpZ2dlclNuaXBwZXQuc3Vic3RyaW5nKDAsIDEpXG4gICAgICAgICAgICAgICAgbGV0IGxlYWRpbmdTcGFjZSA9IGN1cnJlbnRUcmlnZ2VyU25pcHBldC5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0U25pcHBldENoYXIgPT09ICcgJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RTbmlwcGV0Q2hhciA9PT0gJ1xceEEwJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgaWYgKGhhc1RyYWlsaW5nU3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRyaWdnZXJTbmlwcGV0ID0gY3VycmVudFRyaWdnZXJTbmlwcGV0LnRyaW0oKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCByZWdleCA9IGFsbG93U3BhY2VzID8gL1teXFxTIF0vZyA6IC9bXFx4QTBcXHNdL2c7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGFzVHJhaWxpbmdTcGFjZSA9IHJlZ2V4LnRlc3QoY3VycmVudFRyaWdnZXJTbmlwcGV0KTtcblxuICAgICAgICAgICAgICAgIGlmICghbGVhZGluZ1NwYWNlICYmIChtZW51QWxyZWFkeUFjdGl2ZSB8fCAhKHJlZ2V4LnRlc3QoY3VycmVudFRyaWdnZXJTbmlwcGV0KSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uUG9zaXRpb246IG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25UZXh0OiBjdXJyZW50VHJpZ2dlclNuaXBwZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRFbGVtZW50OiBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZFBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRPZmZzZXQ6IG9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25UcmlnZ2VyQ2hhcjogdHJpZ2dlckNoYXJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJbmRleFdpdGhMZWFkaW5nU3BhY2UgKHN0ciwgY2hhcikge1xuICAgICAgICBsZXQgcmV2ZXJzZWRTdHIgPSBzdHIuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKVxuICAgICAgICBsZXQgaW5kZXggPSAtMVxuXG4gICAgICAgIGZvciAobGV0IGNpZHggPSAwLCBsZW4gPSBzdHIubGVuZ3RoOyBjaWR4IDwgbGVuOyBjaWR4KyspIHtcbiAgICAgICAgICAgIGxldCBmaXJzdENoYXIgPSBjaWR4ID09PSBzdHIubGVuZ3RoIC0gMVxuICAgICAgICAgICAgbGV0IGxlYWRpbmdTcGFjZSA9IC9cXHMvLnRlc3QocmV2ZXJzZWRTdHJbY2lkeCArIDFdKVxuICAgICAgICAgICAgbGV0IG1hdGNoID0gY2hhciA9PT0gcmV2ZXJzZWRTdHJbY2lkeF1cblxuICAgICAgICAgICAgaWYgKG1hdGNoICYmIChmaXJzdENoYXIgfHwgbGVhZGluZ1NwYWNlKSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gc3RyLmxlbmd0aCAtIDEgLSBjaWR4XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxuICAgIGlzQ29udGVudEVkaXRhYmxlKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQubm9kZU5hbWUgIT09ICdJTlBVVCcgJiYgZWxlbWVudC5ub2RlTmFtZSAhPT0gJ1RFWFRBUkVBJ1xuICAgIH1cblxuICAgIGlzTWVudU9mZlNjcmVlbihjb29yZGluYXRlcywgbWVudURpbWVuc2lvbnMpIHtcbiAgICAgICAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgbGV0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICBsZXQgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgICAgIGxldCB3aW5kb3dMZWZ0ID0gKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2Muc2Nyb2xsTGVmdCkgLSAoZG9jLmNsaWVudExlZnQgfHwgMClcbiAgICAgICAgbGV0IHdpbmRvd1RvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKVxuXG4gICAgICAgIGxldCBtZW51VG9wID0gdHlwZW9mIGNvb3JkaW5hdGVzLnRvcCA9PT0gJ251bWJlcicgPyBjb29yZGluYXRlcy50b3AgOiB3aW5kb3dUb3AgKyB3aW5kb3dIZWlnaHQgLSBjb29yZGluYXRlcy5ib3R0b20gLSBtZW51RGltZW5zaW9ucy5oZWlnaHRcbiAgICAgICAgbGV0IG1lbnVSaWdodCA9IHR5cGVvZiBjb29yZGluYXRlcy5yaWdodCA9PT0gJ251bWJlcicgPyBjb29yZGluYXRlcy5yaWdodCA6IGNvb3JkaW5hdGVzLmxlZnQgKyBtZW51RGltZW5zaW9ucy53aWR0aFxuICAgICAgICBsZXQgbWVudUJvdHRvbSA9IHR5cGVvZiBjb29yZGluYXRlcy5ib3R0b20gPT09ICdudW1iZXInID8gY29vcmRpbmF0ZXMuYm90dG9tIDogY29vcmRpbmF0ZXMudG9wICsgbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgIGxldCBtZW51TGVmdCA9IHR5cGVvZiBjb29yZGluYXRlcy5sZWZ0ID09PSAnbnVtYmVyJyA/IGNvb3JkaW5hdGVzLmxlZnQgOiB3aW5kb3dMZWZ0ICsgd2luZG93V2lkdGggLSBjb29yZGluYXRlcy5yaWdodCAtIG1lbnVEaW1lbnNpb25zLndpZHRoXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogbWVudVRvcCA8IE1hdGguZmxvb3Iod2luZG93VG9wKSxcbiAgICAgICAgICAgIHJpZ2h0OiBtZW51UmlnaHQgPiBNYXRoLmNlaWwod2luZG93TGVmdCArIHdpbmRvd1dpZHRoKSxcbiAgICAgICAgICAgIGJvdHRvbTogbWVudUJvdHRvbSA+IE1hdGguY2VpbCh3aW5kb3dUb3AgKyB3aW5kb3dIZWlnaHQpLFxuICAgICAgICAgICAgbGVmdDogbWVudUxlZnQgPCBNYXRoLmZsb29yKHdpbmRvd0xlZnQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRNZW51RGltZW5zaW9ucygpIHtcbiAgICAgICAgLy8gV2lkdGggb2YgdGhlIG1lbnUgZGVwZW5kcyBvZiBpdHMgY29udGVudHMgYW5kIHBvc2l0aW9uXG4gICAgICAgIC8vIFdlIG11c3QgY2hlY2sgd2hhdCBpdHMgd2lkdGggd291bGQgYmUgd2l0aG91dCBhbnkgb2JzdHJ1Y3Rpb25cbiAgICAgICAgLy8gVGhpcyB3YXksIHdlIGNhbiBhY2hpZXZlIGdvb2QgcG9zaXRpb25pbmcgZm9yIGZsaXBwaW5nIHRoZSBtZW51XG4gICAgICAgIGxldCBkaW1lbnNpb25zID0ge1xuICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICBoZWlnaHQ6IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSBgdG9wOiAwcHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwcHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDEwMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OyBoaWRkZW47YFxuICAgICAgIGRpbWVuc2lvbnMud2lkdGggPSB0aGlzLnRyaWJ1dGUubWVudS5vZmZzZXRXaWR0aFxuICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ID0gdGhpcy50cmlidXRlLm1lbnUub2Zmc2V0SGVpZ2h0XG5cbiAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gYGRpc3BsYXk6IG5vbmU7YFxuXG4gICAgICAgcmV0dXJuIGRpbWVuc2lvbnNcbiAgICB9XG5cbiAgICBnZXRUZXh0QXJlYU9ySW5wdXRVbmRlcmxpbmVQb3NpdGlvbihlbGVtZW50LCBwb3NpdGlvbiwgZmxpcHBlZCkge1xuICAgICAgICBsZXQgcHJvcGVydGllcyA9IFsnZGlyZWN0aW9uJywgJ2JveFNpemluZycsICd3aWR0aCcsICdoZWlnaHQnLCAnb3ZlcmZsb3dYJyxcbiAgICAgICAgICAgICdvdmVyZmxvd1knLCAnYm9yZGVyVG9wV2lkdGgnLCAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICAgICAgICAgICAnYm9yZGVyQm90dG9tV2lkdGgnLCAnYm9yZGVyTGVmdFdpZHRoJywgJ3BhZGRpbmdUb3AnLFxuICAgICAgICAgICAgJ3BhZGRpbmdSaWdodCcsICdwYWRkaW5nQm90dG9tJywgJ3BhZGRpbmdMZWZ0JyxcbiAgICAgICAgICAgICdmb250U3R5bGUnLCAnZm9udFZhcmlhbnQnLCAnZm9udFdlaWdodCcsICdmb250U3RyZXRjaCcsXG4gICAgICAgICAgICAnZm9udFNpemUnLCAnZm9udFNpemVBZGp1c3QnLCAnbGluZUhlaWdodCcsICdmb250RmFtaWx5JyxcbiAgICAgICAgICAgICd0ZXh0QWxpZ24nLCAndGV4dFRyYW5zZm9ybScsICd0ZXh0SW5kZW50JyxcbiAgICAgICAgICAgICd0ZXh0RGVjb3JhdGlvbicsICdsZXR0ZXJTcGFjaW5nJywgJ3dvcmRTcGFjaW5nJ1xuICAgICAgICBdXG5cbiAgICAgICAgbGV0IGlzRmlyZWZveCA9ICh3aW5kb3cubW96SW5uZXJTY3JlZW5YICE9PSBudWxsKVxuXG4gICAgICAgIGxldCBkaXYgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgZGl2LmlkID0gJ2lucHV0LXRleHRhcmVhLWNhcmV0LXBvc2l0aW9uLW1pcnJvci1kaXYnXG4gICAgICAgIHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LmFwcGVuZENoaWxkKGRpdilcblxuICAgICAgICBsZXQgc3R5bGUgPSBkaXYuc3R5bGVcbiAgICAgICAgbGV0IGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIDogZWxlbWVudC5jdXJyZW50U3R5bGVcblxuICAgICAgICBzdHlsZS53aGl0ZVNwYWNlID0gJ3ByZS13cmFwJ1xuICAgICAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgICAgICAgc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCdcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBvc2l0aW9uIG9mZi1zY3JlZW5cbiAgICAgICAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgICAgIHN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xuXG4gICAgICAgIC8vIHRyYW5zZmVyIHRoZSBlbGVtZW50J3MgcHJvcGVydGllcyB0byB0aGUgZGl2XG4gICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICAgIHN0eWxlW3Byb3BdID0gY29tcHV0ZWRbcHJvcF1cbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoaXNGaXJlZm94KSB7XG4gICAgICAgICAgICBzdHlsZS53aWR0aCA9IGAkeyhwYXJzZUludChjb21wdXRlZC53aWR0aCkgLSAyKX1weGBcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnNjcm9sbEhlaWdodCA+IHBhcnNlSW50KGNvbXB1dGVkLmhlaWdodCkpXG4gICAgICAgICAgICAgICAgc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcbiAgICAgICAgfVxuXG4gICAgICAgIGRpdi50ZXh0Q29udGVudCA9IGVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKDAsIHBvc2l0aW9uKVxuXG4gICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBkaXYudGV4dENvbnRlbnQucmVwbGFjZSgvXFxzL2csICfCoCcpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3BhbiA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IGVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKHBvc2l0aW9uKSB8fCAnLidcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHNwYW4pXG5cbiAgICAgICAgbGV0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGxldCBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbiAgICAgICAgbGV0IHdpbmRvd0xlZnQgPSAod2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvYy5zY3JvbGxMZWZ0KSAtIChkb2MuY2xpZW50TGVmdCB8fCAwKVxuICAgICAgICBsZXQgd2luZG93VG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApXG5cbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIHdpbmRvd1RvcCArIHNwYW4ub2Zmc2V0VG9wICsgcGFyc2VJbnQoY29tcHV0ZWQuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VJbnQoY29tcHV0ZWQuZm9udFNpemUpIC0gZWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW5kb3dMZWZ0ICsgc3Bhbi5vZmZzZXRMZWZ0ICsgcGFyc2VJbnQoY29tcHV0ZWQuYm9yZGVyTGVmdFdpZHRoKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgbGV0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuXG4gICAgICAgIGxldCBtZW51RGltZW5zaW9ucyA9IHRoaXMuZ2V0TWVudURpbWVuc2lvbnMoKVxuICAgICAgICBsZXQgbWVudUlzT2ZmU2NyZWVuID0gdGhpcy5pc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKVxuXG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4ucmlnaHQpIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnJpZ2h0ID0gd2luZG93V2lkdGggLSBjb29yZGluYXRlcy5sZWZ0XG4gICAgICAgICAgICBjb29yZGluYXRlcy5sZWZ0ID0gJ2F1dG8nXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyZW50SGVpZ2h0ID0gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXJcbiAgICAgICAgICAgID8gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXIub2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5Lm9mZnNldEhlaWdodFxuXG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4uYm90dG9tKSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50UmVjdCA9IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyXG4gICAgICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgIDogdGhpcy5nZXREb2N1bWVudCgpLmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgIGxldCBzY3JvbGxTdGlsbEF2YWlsYWJsZSA9IHBhcmVudEhlaWdodCAtICh3aW5kb3dIZWlnaHQgLSBwYXJlbnRSZWN0LnRvcClcblxuICAgICAgICAgICAgY29vcmRpbmF0ZXMuYm90dG9tID0gc2Nyb2xsU3RpbGxBdmFpbGFibGUgKyAod2luZG93SGVpZ2h0IC0gcmVjdC50b3AgLSBzcGFuLm9mZnNldFRvcClcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnRvcCA9ICdhdXRvJ1xuICAgICAgICB9XG5cbiAgICAgICAgbWVudUlzT2ZmU2NyZWVuID0gdGhpcy5pc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKVxuICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuLmxlZnQpIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLmxlZnQgPSB3aW5kb3dXaWR0aCA+IG1lbnVEaW1lbnNpb25zLndpZHRoXG4gICAgICAgICAgICAgICAgPyB3aW5kb3dMZWZ0ICsgd2luZG93V2lkdGggLSBtZW51RGltZW5zaW9ucy53aWR0aFxuICAgICAgICAgICAgICAgIDogd2luZG93TGVmdFxuICAgICAgICAgICAgZGVsZXRlIGNvb3JkaW5hdGVzLnJpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi50b3ApIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnRvcCA9IHdpbmRvd0hlaWdodCA+IG1lbnVEaW1lbnNpb25zLmhlaWdodFxuICAgICAgICAgICAgICAgID8gd2luZG93VG9wICsgd2luZG93SGVpZ2h0IC0gbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgICAgICAgICAgOiB3aW5kb3dUb3BcbiAgICAgICAgICAgIGRlbGV0ZSBjb29yZGluYXRlcy5ib3R0b21cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LnJlbW92ZUNoaWxkKGRpdilcbiAgICAgICAgcmV0dXJuIGNvb3JkaW5hdGVzXG4gICAgfVxuXG4gICAgZ2V0Q29udGVudEVkaXRhYmxlQ2FyZXRQb3NpdGlvbihzZWxlY3RlZE5vZGVQb3NpdGlvbikge1xuICAgICAgICBsZXQgbWFya2VyVGV4dENoYXIgPSAn77u/J1xuICAgICAgICBsZXQgbWFya2VyRWwsIG1hcmtlcklkID0gYHNlbF8ke25ldyBEYXRlKCkuZ2V0VGltZSgpfV8ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHIoMil9YFxuICAgICAgICBsZXQgcmFuZ2VcbiAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcbiAgICAgICAgbGV0IHByZXZSYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApXG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlUmFuZ2UoKVxuICAgICAgICByYW5nZS5zZXRTdGFydChzZWwuYW5jaG9yTm9kZSwgc2VsZWN0ZWROb2RlUG9zaXRpb24pXG4gICAgICAgIHJhbmdlLnNldEVuZChzZWwuYW5jaG9yTm9kZSwgc2VsZWN0ZWROb2RlUG9zaXRpb24pXG5cbiAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpXG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBtYXJrZXIgZWxlbWVudCBjb250YWluaW5nIGEgc2luZ2xlIGludmlzaWJsZSBjaGFyYWN0ZXIgdXNpbmcgRE9NIG1ldGhvZHMgYW5kIGluc2VydCBpdFxuICAgICAgICBtYXJrZXJFbCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgbWFya2VyRWwuaWQgPSBtYXJrZXJJZFxuXG4gICAgICAgIG1hcmtlckVsLmFwcGVuZENoaWxkKHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVUZXh0Tm9kZShtYXJrZXJUZXh0Q2hhcikpXG4gICAgICAgIHJhbmdlLmluc2VydE5vZGUobWFya2VyRWwpXG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICBzZWwuYWRkUmFuZ2UocHJldlJhbmdlKVxuXG4gICAgICAgIGxldCByZWN0ID0gbWFya2VyRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgbGV0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgICAgICBsZXQgd2luZG93TGVmdCA9ICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApXG4gICAgICAgIGxldCB3aW5kb3dUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMClcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luZG93TGVmdCxcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBtYXJrZXJFbC5vZmZzZXRIZWlnaHQgKyB3aW5kb3dUb3BcbiAgICAgICAgfVxuICAgICAgICBsZXQgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICAgICAgbGV0IG1lbnVEaW1lbnNpb25zID0gdGhpcy5nZXRNZW51RGltZW5zaW9ucygpXG4gICAgICAgIGxldCBtZW51SXNPZmZTY3JlZW4gPSB0aGlzLmlzTWVudU9mZlNjcmVlbihjb29yZGluYXRlcywgbWVudURpbWVuc2lvbnMpXG5cbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi5yaWdodCkge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMubGVmdCA9ICdhdXRvJ1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMucmlnaHQgPSB3aW5kb3dXaWR0aCAtIHJlY3QubGVmdCAtIHdpbmRvd0xlZnRcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJlbnRIZWlnaHQgPSB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lclxuICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lci5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgIDogdGhpcy5nZXREb2N1bWVudCgpLmJvZHkub2Zmc2V0SGVpZ2h0XG5cbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi5ib3R0b20pIHtcbiAgICAgICAgICAgIGxldCBwYXJlbnRSZWN0ID0gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXJcbiAgICAgICAgICAgICAgICA/IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgOiB0aGlzLmdldERvY3VtZW50KCkuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgbGV0IHNjcm9sbFN0aWxsQXZhaWxhYmxlID0gcGFyZW50SGVpZ2h0IC0gKHdpbmRvd0hlaWdodCAtIHBhcmVudFJlY3QudG9wKVxuXG4gICAgICAgICAgICBjb29yZGluYXRlcy50b3AgPSAnYXV0bydcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLmJvdHRvbSA9IHNjcm9sbFN0aWxsQXZhaWxhYmxlICsgKHdpbmRvd0hlaWdodCAtIHJlY3QudG9wKVxuICAgICAgICB9XG5cbiAgICAgICAgbWVudUlzT2ZmU2NyZWVuID0gdGhpcy5pc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKVxuICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuLmxlZnQpIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLmxlZnQgPSB3aW5kb3dXaWR0aCA+IG1lbnVEaW1lbnNpb25zLndpZHRoXG4gICAgICAgICAgICAgICAgPyB3aW5kb3dMZWZ0ICsgd2luZG93V2lkdGggLSBtZW51RGltZW5zaW9ucy53aWR0aFxuICAgICAgICAgICAgICAgIDogd2luZG93TGVmdFxuICAgICAgICAgICAgZGVsZXRlIGNvb3JkaW5hdGVzLnJpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi50b3ApIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnRvcCA9IHdpbmRvd0hlaWdodCA+IG1lbnVEaW1lbnNpb25zLmhlaWdodFxuICAgICAgICAgICAgICAgID8gd2luZG93VG9wICsgd2luZG93SGVpZ2h0IC0gbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgICAgICAgICAgOiB3aW5kb3dUb3BcbiAgICAgICAgICAgIGRlbGV0ZSBjb29yZGluYXRlcy5ib3R0b21cbiAgICAgICAgfVxuXG4gICAgICAgIG1hcmtlckVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobWFya2VyRWwpXG4gICAgICAgIHJldHVybiBjb29yZGluYXRlc1xuICAgIH1cblxuICAgIHNjcm9sbEludG9WaWV3KGVsZW0pIHtcbiAgICAgICAgbGV0IHJlYXNvbmFibGVCdWZmZXIgPSAyMCxcbiAgICAgICAgICAgIGNsaWVudFJlY3RcbiAgICAgICAgbGV0IG1heFNjcm9sbERpc3BsYWNlbWVudCA9IDEwMFxuICAgICAgICBsZXQgZSA9IHRoaXMubWVudVxuXG4gICAgICAgIGlmICh0eXBlb2YgZSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICB3aGlsZSAoY2xpZW50UmVjdCA9PT0gdW5kZWZpbmVkIHx8IGNsaWVudFJlY3QuaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICBjbGllbnRSZWN0ID0gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgICAgICAgICBpZiAoY2xpZW50UmVjdC5oZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlID0gZS5jaGlsZE5vZGVzWzBdXG4gICAgICAgICAgICAgICAgaWYgKGUgPT09IHVuZGVmaW5lZCB8fCAhZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1Ub3AgPSBjbGllbnRSZWN0LnRvcFxuICAgICAgICBsZXQgZWxlbUJvdHRvbSA9IGVsZW1Ub3AgKyBjbGllbnRSZWN0LmhlaWdodFxuXG4gICAgICAgIGlmIChlbGVtVG9wIDwgMCkge1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHdpbmRvdy5wYWdlWU9mZnNldCArIGNsaWVudFJlY3QudG9wIC0gcmVhc29uYWJsZUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtQm90dG9tID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICBsZXQgbWF4WSA9IHdpbmRvdy5wYWdlWU9mZnNldCArIGNsaWVudFJlY3QudG9wIC0gcmVhc29uYWJsZUJ1ZmZlclxuXG4gICAgICAgICAgICBpZiAobWF4WSAtIHdpbmRvdy5wYWdlWU9mZnNldCA+IG1heFNjcm9sbERpc3BsYWNlbWVudCkge1xuICAgICAgICAgICAgICAgIG1heFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBtYXhTY3JvbGxEaXNwbGFjZW1lbnRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHRhcmdldFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgLSAod2luZG93LmlubmVySGVpZ2h0IC0gZWxlbUJvdHRvbSlcblxuICAgICAgICAgICAgaWYgKHRhcmdldFkgPiBtYXhZKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0WSA9IG1heFlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHRhcmdldFkpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZVJhbmdlO1xuIiwiLy8gVGhhbmtzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0eW9yay9mdXp6eVxuY2xhc3MgVHJpYnV0ZVNlYXJjaCB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5zZWFyY2ggPSB0aGlzXG4gICAgfVxuXG4gICAgc2ltcGxlRmlsdGVyKHBhdHRlcm4sIGFycmF5KSB7XG4gICAgICAgIHJldHVybiBhcnJheS5maWx0ZXIoc3RyaW5nID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRlc3QocGF0dGVybiwgc3RyaW5nKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRlc3QocGF0dGVybiwgc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKHBhdHRlcm4sIHN0cmluZykgIT09IG51bGxcbiAgICB9XG5cbiAgICBtYXRjaChwYXR0ZXJuLCBzdHJpbmcsIG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cbiAgICAgICAgbGV0IHBhdHRlcm5JZHggPSAwLFxuICAgICAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICBsZW4gPSBzdHJpbmcubGVuZ3RoLFxuICAgICAgICAgICAgdG90YWxTY29yZSA9IDAsXG4gICAgICAgICAgICBjdXJyU2NvcmUgPSAwLFxuICAgICAgICAgICAgcHJlID0gb3B0cy5wcmUgfHwgJycsXG4gICAgICAgICAgICBwb3N0ID0gb3B0cy5wb3N0IHx8ICcnLFxuICAgICAgICAgICAgY29tcGFyZVN0cmluZyA9IG9wdHMuY2FzZVNlbnNpdGl2ZSAmJiBzdHJpbmcgfHwgc3RyaW5nLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICBjaCwgY29tcGFyZUNoYXJcblxuICAgICAgICBwYXR0ZXJuID0gb3B0cy5jYXNlU2Vuc2l0aXZlICYmIHBhdHRlcm4gfHwgcGF0dGVybi50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgbGV0IHBhdHRlcm5DYWNoZSA9IHRoaXMudHJhdmVyc2UoY29tcGFyZVN0cmluZywgcGF0dGVybiwgMCwgMCwgW10pXG4gICAgICAgIGlmICghcGF0dGVybkNhY2hlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlbmRlcmVkOiB0aGlzLnJlbmRlcihzdHJpbmcsIHBhdHRlcm5DYWNoZS5jYWNoZSwgcHJlLCBwb3N0KSxcbiAgICAgICAgICAgIHNjb3JlOiBwYXR0ZXJuQ2FjaGUuc2NvcmVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYXZlcnNlKHN0cmluZywgcGF0dGVybiwgc3RyaW5nSW5kZXgsIHBhdHRlcm5JbmRleCwgcGF0dGVybkNhY2hlKSB7XG4gICAgICAgIC8vIGlmIHRoZSBwYXR0ZXJuIHNlYXJjaCBhdCBlbmRcbiAgICAgICAgaWYgKHBhdHRlcm4ubGVuZ3RoID09PSBwYXR0ZXJuSW5kZXgpIHtcblxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHNjb3JlIGFuZCBjb3B5IHRoZSBjYWNoZSBjb250YWluaW5nIHRoZSBpbmRpY2VzIHdoZXJlIGl0J3MgZm91bmRcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2NvcmU6IHRoaXMuY2FsY3VsYXRlU2NvcmUocGF0dGVybkNhY2hlKSxcbiAgICAgICAgICAgICAgICBjYWNoZTogcGF0dGVybkNhY2hlLnNsaWNlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHN0cmluZyBhdCBlbmQgb3IgcmVtYWluaW5nIHBhdHRlcm4gPiByZW1haW5pbmcgc3RyaW5nXG4gICAgICAgIGlmIChzdHJpbmcubGVuZ3RoID09PSBzdHJpbmdJbmRleCB8fCBwYXR0ZXJuLmxlbmd0aCAtIHBhdHRlcm5JbmRleCA+IHN0cmluZy5sZW5ndGggLSBzdHJpbmdJbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGMgPSBwYXR0ZXJuW3BhdHRlcm5JbmRleF1cbiAgICAgICAgbGV0IGluZGV4ID0gc3RyaW5nLmluZGV4T2YoYywgc3RyaW5nSW5kZXgpXG4gICAgICAgIGxldCBiZXN0LCB0ZW1wXG5cbiAgICAgICAgd2hpbGUgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHBhdHRlcm5DYWNoZS5wdXNoKGluZGV4KVxuICAgICAgICAgICAgdGVtcCA9IHRoaXMudHJhdmVyc2Uoc3RyaW5nLCBwYXR0ZXJuLCBpbmRleCArIDEsIHBhdHRlcm5JbmRleCArIDEsIHBhdHRlcm5DYWNoZSlcbiAgICAgICAgICAgIHBhdHRlcm5DYWNoZS5wb3AoKVxuXG4gICAgICAgICAgICAvLyBpZiBkb3duc3RyZWFtIHRyYXZlcnNhbCBmYWlsZWQsIHJldHVybiBiZXN0IGFuc3dlciBzbyBmYXJcbiAgICAgICAgICAgIGlmICghdGVtcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiZXN0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghYmVzdCB8fCBiZXN0LnNjb3JlIDwgdGVtcC5zY29yZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSB0ZW1wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZGV4ID0gc3RyaW5nLmluZGV4T2YoYywgaW5kZXggKyAxKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJlc3RcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVTY29yZShwYXR0ZXJuQ2FjaGUpIHtcbiAgICAgICAgbGV0IHNjb3JlID0gMFxuICAgICAgICBsZXQgdGVtcCA9IDFcblxuICAgICAgICBwYXR0ZXJuQ2FjaGUuZm9yRWFjaCgoaW5kZXgsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuQ2FjaGVbaSAtIDFdICsgMSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcCArPSB0ZW1wICsgMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3JlICs9IHRlbXBcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gc2NvcmVcbiAgICB9XG5cbiAgICByZW5kZXIoc3RyaW5nLCBpbmRpY2VzLCBwcmUsIHBvc3QpIHtcbiAgICAgICAgdmFyIHJlbmRlcmVkID0gc3RyaW5nLnN1YnN0cmluZygwLCBpbmRpY2VzWzBdKVxuXG4gICAgICAgIGluZGljZXMuZm9yRWFjaCgoaW5kZXgsIGkpID0+IHtcbiAgICAgICAgICAgIHJlbmRlcmVkICs9IHByZSArIHN0cmluZ1tpbmRleF0gKyBwb3N0ICtcbiAgICAgICAgICAgICAgICBzdHJpbmcuc3Vic3RyaW5nKGluZGV4ICsgMSwgKGluZGljZXNbaSArIDFdKSA/IGluZGljZXNbaSArIDFdIDogc3RyaW5nLmxlbmd0aClcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gcmVuZGVyZWRcbiAgICB9XG5cbiAgICBmaWx0ZXIocGF0dGVybiwgYXJyLCBvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gICAgICAgIHJldHVybiBhcnJcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXYsIGVsZW1lbnQsIGlkeCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9IGVsZW1lbnRcblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLmV4dHJhY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gb3B0cy5leHRyYWN0KGVsZW1lbnQpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHIpIHsgLy8gdGFrZSBjYXJlIG9mIHVuZGVmaW5lZHMgLyBudWxscyAvIGV0Yy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVuZGVyZWQgPSB0aGlzLm1hdGNoKHBhdHRlcm4sIHN0ciwgb3B0cylcblxuICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZbcHJldi5sZW5ndGhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nOiByZW5kZXJlZC5yZW5kZXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiByZW5kZXJlZC5zY29yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpZHgsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbDogZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZcbiAgICAgICAgICAgIH0sIFtdKVxuXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29tcGFyZSA9IGIuc2NvcmUgLSBhLnNjb3JlXG4gICAgICAgICAgICBpZiAoY29tcGFyZSkgcmV0dXJuIGNvbXBhcmVcbiAgICAgICAgICAgIHJldHVybiBhLmluZGV4IC0gYi5pbmRleFxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZVNlYXJjaDtcbiIsIi8qKlxuKiBUcmlidXRlLmpzXG4qIE5hdGl2ZSBFUzYgSmF2YVNjcmlwdCBAbWVudGlvbiBQbHVnaW5cbioqL1xuXG5pbXBvcnQgVHJpYnV0ZSBmcm9tIFwiLi9UcmlidXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGU7XG4iLCJpZiAoIUFycmF5LnByb3RvdHlwZS5maW5kKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LnByb3RvdHlwZS5maW5kIGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ID0gT2JqZWN0KHRoaXMpXG4gICAgICAgIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMFxuICAgICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXVxuICAgICAgICB2YXIgdmFsdWVcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGxpc3RbaV1cbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgbGlzdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxufVxuXG5pZiAod2luZG93ICYmIHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgIT09IFwiZnVuY3Rpb25cIikge1xuICBmdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zKSB7XG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHtcbiAgICAgIGJ1YmJsZXM6IGZhbHNlLFxuICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICBkZXRhaWw6IHVuZGVmaW5lZFxuICAgIH1cbiAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpXG4gICAgcmV0dXJuIGV2dFxuICB9XG5cbiBpZiAodHlwZW9mIHdpbmRvdy5FdmVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGVcbiB9XG5cbiAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnRcbn0iXX0=
