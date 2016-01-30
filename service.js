/**
 * Created by Rusak Oleg on 23.01.2016.
 */

(function (){
    'use strict';

    var ready = function ( fn ) {

        // Sanity check
        if ( typeof fn !== 'function' ) return;

        // If document is already loaded, run method
        if ( document.readyState === 'complete'  ) {
            return fn();
        }

        // Otherwise, wait until document is loaded
        document.addEventListener( 'DOMContentLoaded', fn, false );
    };

    ready(function() {
        //Init
        let pTag    =   new pTags({
            selector: "input.tags-element"
        });

        //Show inner tag value
        let tagInput        =   document.querySelector('.tags-element');
        let tagOutput       =   document.querySelector('.tags-output');
        let handlerInput    =   document.querySelector('.tag input');
        handlerInput.focus();

        setInterval(function (){
            tagOutput.textContent   =   tagInput.value;

        }, 1000);

        //Init autocomplite
        let lang;
        let indexLang   =   [];
        fetch('node_modules/list-of-programming-languages/data/data.jsonld')
            .then(function(response) {
                return response.json();
            }).then(function(data) {
                lang    =   data.itemListElement;

                lang.forEach(function(item) {
                    let data    =   item.item;
                    indexLang.push(data.name.replace(/\s/g, '_'));
                });
            })
            .catch( alert );

        var my_autoComplete = new autoComplete({
            selector: 'input.handler-tag',
            minChars: 2,
            cache: false,
            source: function(term, suggest){
                term = term.toLowerCase();
                var choices         =   indexLang;
                var matches         =   [];
                let listInputTag    =   pTag.value.split(';').map(function (name){
                    return name.toLowerCase();
                });

                for (let i=0; i<choices.length; i++) {
                    let name    =   choices[i];
                    if (listInputTag.indexOf(name.toLowerCase())==-1 && ~name.toLowerCase().indexOf(term)){
                        matches.push(name);
                    }
                }

                suggest(matches);
            }
        });
    });
})();
