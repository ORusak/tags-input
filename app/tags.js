/**
 * Created by Rusak Oleg on 23.01.2016.
 * Tags Input
 */

//todo: gulp задачу для генерации readme, минификации файлов

//todo: добавить стили к автокомплиту

(function (root, factory){
    if ( typeof exports === 'object' ) {
        module.exports = factory();
    } else {
        root.pTags   =   factory(root);
    }

})(typeof global !== "undefined" ? global : this.window || this.global, function (){
    'use strict';

    //
    //Variables
    //
    let support     =   !!document.querySelector && !!document.addEventListener;
    let defaults    =   {
        initClass   : 'p-tag',
        handlerInputWidth: '15em'
    };

    //todo: сохранять одинаковую последовательность тегов в инпут и визуализации
    /**
     * @exports tags-input
     * @author Oleg Rusak
     * */
    class pTags {
        /**
         * tags input plugin
         * @constructor
         * @param {object} options - plugin settings
         * @throws Not support. Required support querySelector and addEventListener!
         */
        constructor (options){
            if (!support){
                throw new Error("Not support. Required support querySelector and addEventListener!");
            }

            //Apply user options
            this.settings    =   Object.assign(defaults, options || {});

            //Init element
            this.createTagElement();

            this.initHandler();
        }

        /**
         * init handlers event tags input element
         * @private
         */
        initHandler (){
            // Listen write tags
            let ctx             =   this;
            let handlerInput    =   this.handlerInput;

            function handlerEditTag(event){
                //Cursor on start input
                if (handlerInput.selectionStart==0){
                    //backspace or <-
                    if (event.keyCode==8 || event.keyCode==37){
                        if (event.target.previousSibling!=null) {
                            event.preventDefault();
                            ctx.editTag(event.target.previousSibling);
                        }
                    }
                }

                //Cursor on end input
                if (handlerInput.selectionStart==ctx.handlerInput.value.length){
                    //->
                    if (event.keyCode==39){
                        if (event.target.nextSibling!=null) {
                            event.preventDefault();

                            let value       =   event.target.value;
                            ctx.addTagsFromString(value);

                            ctx.editTag(event.target.nextSibling);
                            event.target.setSelectionRange(0, 0);
                        }
                    }
                }

                //enter
                if (event.keyCode==13){
                    handlerFocusTag(event);
                    event.target.focus();
                }
            }
            handlerInput.addEventListener('keydown', handlerEditTag);

            function handlerWriteTag(event) {
                let value       =   event.target.value;
                let tagsList    =   value.split(/[\s;\t\,]/);
                if(tagsList.length<2) return false;

                let listTag     =   ctx.addTagsFromString(value);

                //todo: переводить на редактирование следующего элемента
                if (listTag.length>1) {
                    let lastAddTag = listTag[listTag.length - 1];
                    ctx.editTag(lastAddTag);
                }else
                    event.target.value  =   '';
            }
            handlerInput.addEventListener('input', handlerWriteTag);

            function handlerFocusTag (event) {
                let editTag     =   event.target;
                ctx.addTagsFromString(editTag.value);

                ctx.contaner.appendChild(editTag);
                editTag.value  =   '';
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
        addTag (name){
            if (name==='' || this.returnIndexTag(name)!=-1){
                return null;
            }

            let tag         =   document.createElement('span');
            tag.className   =   'post-tag';
            tag.innerHTML   =   `<span class="name-tag">${name}</span><span class="delete-tag">&nbsp;<div id="cross"></div><div></div></span>`;

            let ctx         = this;
            tag.addEventListener('click',function () {
                ctx.editTag(this);
            },false);

            tag.lastChild.addEventListener('click',function (event) {
                ctx.removeByObject(this.parentNode);

                event.stopPropagation();
            },false);

            let parent                      =   this.contaner;
            this.handlerInput.style.width   =   this.settings.handlerInputWidth;
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
        addTagsFromString (str){
            let tagsList    =   str.split(/[\s;\t\,]/);
            let listTag     =   [];

            for(let name of tagsList){
                let newTag  =   this.addTag(name);
                if (newTag)
                    listTag.push(newTag);
            }

            return listTag;
        }

        /**
         * create tag DOM element on select base input DOM element
         * @private
         */
        createTagElement  () {
            let elem    =   document.querySelector(this.settings.selector);

            //check base element
            if (!elem || elem.tagName!='INPUT') return;

            elem.style.display       =   'none';

            let tagsContainer        =   document.createElement('div');
            tagsContainer.className  =   'tag';
            tagsContainer.innerHTML  =   '<input type="text" class="handler-tag">';

            let parent               =   elem.parentNode;
            parent.insertBefore(tagsContainer, elem);

            this.originalInput       =   elem;
            this.handlerInput        =   tagsContainer.children[0];
            this.contaner            =   tagsContainer;
        }

        /**
         * remove tag by name
         * @public
         * @param {string} - name tag
         * @return {boolean} operation successful. False - name not exist in tag storage. True - remove all.
         */
        remove(name){
            let tag;
            for (tag of this.contaner){
                if (name==tag.firstChild.textContent) break;
            }

            if(!tag)
                return false;

            return this.removeByObject (tag);
        }

        /**
         * remove tag object
         * @private
         * @param tag object
         * @return {boolean} operation successful. Tag - remove always. False - name not exist in tag storage. True - remove all.
         */
        removeByObject(tag) {
            let tagName     =   tag.firstChild.textContent;

            let indexTag    =   this.returnIndexTag(tagName);
            this.contaner.removeChild(tag);

            if (indexTag==-1){
                return false;
            }

            let tags        =   this.originalInput.value;
            let tagsArray   =   tags.split(';');
            tagsArray.splice(indexTag,1);
            this.originalInput.value    =   tagsArray.join(';');

            return true;
        }

        /**
         * return index tag by name in storage
         * @public
         * @param {string} name - name tag
         * @return {Number} index. -1 - not found. Number - index base 0.
         */
        returnIndexTag (name){
            let tags        =   this.originalInput.value;
            let tagsArray   =   tags.split(';');

            return tagsArray.indexOf(name);
        }

        /**
         * focus cursor tags input element
         * @public
         */
        focus () {
            this.handlerInput.focus();
        }

        /**
         * edit tag element
         * @private
         * @param {Object} tag
         */
        editTag (tag) {
            let tagName = tag.firstChild.textContent;
            let tagWidth = tag.clientWidth;

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
        get value (){
            return this.originalInput.value;
        }

        /**
         * set value tags
         * @param {string} str - name tags through separate symbol
         * @public
         */
        set value (str){
            this.addTagsFromString(str);
        }
    }

    return pTags;
});