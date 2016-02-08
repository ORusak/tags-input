var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Rusak Oleg on 23.01.2016.
 * Tags Input
 */

var pTags = function () {
    'use strict';

    //
    //Variables
    //

    var support = !!document.querySelector && !!document.addEventListener;
    var defaults = {
        initClass: 'p-tag',
        handlerInputWidth: '15em'
    };

    //todo: сохранять одинаковую последовательность тегов в инпут и визуализации
    /**
     * @exports tags-input
     * @author Oleg Rusak
     * */

    var pTags = function () {
        /**
         * tags input plugin
         * @constructor
         * @param {object} options - plugin settings
         * @throws Not support. Required support querySelector and addEventListener!
         */

        function pTags(options) {
            _classCallCheck(this, pTags);

            if (!support) {
                throw new Error("Not support. Required support querySelector and addEventListener!");
            }

            //Apply user options
            this.settings = Object.assign(defaults, options || {});

            //Init element
            this.createTagElement();

            this.initHandler();
        }

        /**
         * init handlers event tags input element
         * @private
         */

        _createClass(pTags, [{
            key: 'initHandler',
            value: function initHandler() {
                // Listen write tags
                var ctx = this;
                var handlerInput = this.handlerInput;

                function handlerEditTag(event) {
                    //Cursor on start input
                    if (handlerInput.selectionStart == 0) {
                        //backspace or <-
                        if (event.keyCode == 8 || event.keyCode == 37) {
                            if (event.target.previousSibling != null) {
                                event.preventDefault();
                                ctx.editTag(event.target.previousSibling);
                            }
                        }
                    }

                    //Cursor on end input
                    if (handlerInput.selectionStart == ctx.handlerInput.value.length) {
                        //->
                        if (event.keyCode == 39) {
                            if (event.target.nextSibling != null) {
                                event.preventDefault();

                                var value = event.target.value;
                                ctx.addTagsFromString(value);

                                ctx.editTag(event.target.nextSibling);
                                event.target.setSelectionRange(0, 0);
                            }
                        }
                    }

                    //enter
                    if (event.keyCode == 13) {
                        handlerFocusTag(event);
                        event.target.focus();
                    }
                }
                handlerInput.addEventListener('keydown', handlerEditTag);

                function handlerWriteTag(event) {
                    var value = event.target.value;
                    var tagsList = value.split(/[\s;\t\,]/);
                    if (tagsList.length < 2) return false;

                    var listTag = ctx.addTagsFromString(value);

                    //todo: переводить на редактирование следующего элемента
                    if (listTag.length > 1) {
                        var lastAddTag = listTag[listTag.length - 1];
                        ctx.editTag(lastAddTag);
                    } else event.target.value = '';
                }
                handlerInput.addEventListener('input', handlerWriteTag);

                function handlerFocusTag(event) {
                    var editTag = event.target;
                    ctx.addTagsFromString(editTag.value);

                    ctx.contaner.appendChild(editTag);
                    editTag.value = '';
                }
                handlerInput.addEventListener('blur', handlerFocusTag);
            }

            /**
             * add new unique tag by name
             * @public
             * @param {string} name - name new tag
             * @return {Object} tag - object add new DOM element tag
             * @return {null} tag - name is empty or not unique
             */

        }, {
            key: 'addTag',
            value: function addTag(name) {
                if (name === '' || this.returnIndexTag(name) != -1) {
                    return null;
                }

                var tag = document.createElement('span');
                tag.className = 'post-tag';
                tag.insertAdjacentHTML('afterBegin', '<span class="name-tag">' + name + '</span><span class="delete-tag">&nbsp;<div id="cross"></div><div></div></span>');

                var ctx = this;
                tag.addEventListener('click', function () {
                    ctx.editTag(this);
                }, false);

                tag.lastChild.addEventListener('click', function (event) {
                    ctx.removeByObject(this.parentNode);

                    event.stopPropagation();
                }, false);

                var parent = this.contaner;
                this.handlerInput.style.width = this.settings.handlerInputWidth;
                parent.insertBefore(tag, this.handlerInput);

                this.originalInput.value += (this.originalInput.value ? ';' : '') + name;

                return tag;
            }

            /**
             * add tags from string
             * @private
             * @param {string} str - name tags throw separate symbol
             * @return {Object[]} listTag = list object add DOM elements tags plugin
             * @example
             * // returns [{tag1}, {tag2}]
             * pTag.addTagsFromString("tag1 tag2 tag1");
             */

        }, {
            key: 'addTagsFromString',
            value: function addTagsFromString(str) {
                var tagsList = str.split(/[\s;\t\,]/);
                var listTag = [];

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = tagsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var name = _step.value;

                        var newTag = this.addTag(name);
                        if (newTag) listTag.push(newTag);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return listTag;
            }

            /**
             * create tag DOM element on select base input DOM element
             * @private
             */

        }, {
            key: 'createTagElement',
            value: function createTagElement() {
                var elem = document.querySelector(this.settings.selector);

                //check base element
                if (!elem || elem.tagName != 'INPUT') return;

                elem.style.display = 'none';

                var tagsContainer = document.createElement('div');
                tagsContainer.className = 'tag';
                tagsContainer.insertAdjacentHTML('afterBegin', '<input type="text" class="handler-tag">');

                var ctx = this;
                tagsContainer.addEventListener('click', function (event) {
                    ctx.handlerInput.focus();
                }, false);

                var parent = elem.parentNode;
                parent.insertBefore(tagsContainer, elem);

                this.originalInput = elem;
                this.handlerInput = tagsContainer.children[0];
                this.contaner = tagsContainer;
            }

            /**
             * remove tag by name
             * @public
             * @param {string} - name tag
             * @return {boolean} operation successful. False - name not exist in tag storage. True - remove all.
             */

        }, {
            key: 'remove',
            value: function remove(name) {
                var tag = undefined;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.contaner[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        tag = _step2.value;

                        if (name == tag.firstChild.textContent) break;
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                if (!tag) return false;

                return this.removeByObject(tag);
            }

            /**
             * remove tag object
             * @private
             * @param tag object
             * @return {boolean} operation successful. Tag - remove always. False - name not exist in tag storage. True - remove all.
             */

        }, {
            key: 'removeByObject',
            value: function removeByObject(tag) {
                var tagName = tag.firstChild.textContent;

                var indexTag = this.returnIndexTag(tagName);
                this.contaner.removeChild(tag);

                if (indexTag == -1) {
                    return false;
                }

                var tags = this.originalInput.value;
                var tagsArray = tags.split(';');
                tagsArray.splice(indexTag, 1);
                this.originalInput.value = tagsArray.join(';');

                return true;
            }

            /**
             * return index tag by name in storage
             * @public
             * @param {string} name - name tag
             * @return {Number} index. -1 - not found. Number - index base 0.
             */

        }, {
            key: 'returnIndexTag',
            value: function returnIndexTag(name) {
                if (!name) return -1;

                var tags = this.originalInput.value;
                var tagsArray = tags.toLowerCase().split(';');

                return tagsArray.indexOf(name.toLowerCase());
            }

            /**
             * focus cursor tags input element
             * @public
             */

        }, {
            key: 'focus',
            value: function focus() {
                this.handlerInput.focus();
            }

            /**
             * edit tag element
             * @private
             * @param {Object} tag
             */

        }, {
            key: 'editTag',
            value: function editTag(tag) {
                var tagName = tag.firstChild.textContent;
                var tagWidth = tag.clientWidth;

                //https://bugzilla.mozilla.org/show_bug.cgi?id=687787
                this.handlerInput.blur();

                this.contaner.insertBefore(this.handlerInput, tag);
                this.handlerInput.value = tagName;
                this.handlerInput.style.width = tagWidth + 'px';
                this.handlerInput.focus();

                this.removeByObject(tag);
            }

            /**
             * get value tags
             * @public
             * @return {string} - name tags through separate symbol
             */

        }, {
            key: 'value',
            get: function get() {
                return this.originalInput.value;
            }

            /**
             * set value tags
             * @param {string} str - name tags through separate symbol
             * @public
             */
            ,
            set: function set(str) {
                this.addTagsFromString(str);
            }
        }]);

        return pTags;
    }();

    return pTags;
}();

(function () {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = pTags;
    } else {
        window.pTags = pTags;
    }
})();