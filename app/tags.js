/**
 * Created by Rusak Oleg on 23.01.2016.
 * Tags
 */

(function (root, factory){
    if ( typeof exports === 'object' ) {
        throw new Error ("Not support");
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
        initClass   : 'p-tag'
    };



    //todo: сохранять одинаковую последовательность тегов в инпут и визуализации
    class pTags {
        constructor (options){
            if (!support){
                throw new Error("Not support. Required support querySelector and addEventListener!");
            }

            //Apply user options
            this.settings    =   Object.assign(defaults, options || {});

            //Init element
            this.createTagElement();

            this.addTag('java');
            this.addTag('java-script');
            //this.addTag('very-very-very-long-tag!!!!!');

            this.initHandler();
        }

        /*
        * @private
        * */
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
                let tagsList    =   value.split(/[\s+;\t]/);
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

        /* addTagsFromString
         * @private
         * */
        addTagsFromString (str){
            let tagsList    =   str.split(/[\s+;\t]/);
            let listTag     =   [];

            for(let name of tagsList){
                let newTag  =   this.addTag(name);
                if (newTag)
                    listTag.push(newTag);
            }

            return listTag;
        }

        /*
         * @private
         * */
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

            return elem;
        }

        /*
         * @public
         * @param name
         * @return tag object
         * */
        addTag (name){
            if (name==='' || this.returnIndexTag(name)!=-1){
                return null;
            }

            let tag         =   document.createElement('span');
            tag.className   =   'post-tag';
            tag.innerHTML   =   name + '<span class="delete-tag"><i class="fa fa-times-circle"></i></span>';

            let ctx         = this;
            tag.addEventListener('click',function () {
                ctx.editTag(this);
            },false);

            tag.lastChild.addEventListener('click',function (event) {
                ctx.removeTag(this.parentNode);

                event.stopPropagation();
            },false);

            let parent      =   this.contaner;
            parent.insertBefore(tag, this.handlerInput);

            this.originalInput.value += (this.originalInput.value ? ';' : '') + name;

            return tag;
        }

        /* removeTag
         * @public
         * @param tag object
         * @return operation successful
         * */
        removeTag (tag){
            let tagName     =   tag.textContent;

            let indexTag    =   this.returnIndexTag(tagName);
            if (indexTag==-1){
                return false;
            }

            this.contaner.removeChild(tag);

            let tags        =   this.originalInput.value;
            let tagsArray   =   tags.split(';');
            tagsArray.splice(indexTag,1);
            this.originalInput.value    =   tagsArray.join(';');

            return true;
        }

        /* existTag
         * @public
         * @param name
         * @return index
         * */
        returnIndexTag (name){
            let tags        =   this.originalInput.value;
            let tagsArray   =   tags.split(';');

            return tagsArray.indexOf(name);
        }

        /*
         * editTag
         * @public
         * @param name
         * @return index
         * */
        editTag (tag) {
            let tagName = tag.textContent;
            let tagWidth = tag.clientWidth;

            this.contaner.insertBefore(this.handlerInput, tag);
            this.handlerInput.value = tagName;
            this.handlerInput.style.width = tagWidth + 'px';
            this.handlerInput.focus();

            if (this.removeTag(tag)) return;

            //Битый тэг
            this.contaner.removeChild(tag);
        }

        /*
         * @public
         * */
        get value (){
            return this.originalInput.value;
        }

        /*
         * @public
         * */
        set value (str){
            this.addTagsFromString(str);
        }
    }

    return pTags;
});