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
        pTag.value  =   'CSS,HTML';
        pTag.focus();

        //Show inner tag value
        let tagOutput       =   document.querySelector('.tags-output');

        setInterval(function (){
            tagOutput.textContent   =   pTag.value;

        }, 1000);

        let indexLang   =  [
                'Assembler',
                'Go',
                'Java',
                'JavaScript',
                'Python',
                'C++',
                'CSS',
                'HTML'
            ];

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
