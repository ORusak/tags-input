/**
 * Created by Rusak Oleg on 30.01.2016.
 */

'use strict';

let mocha       =   require('mocha');
let should      =   require('should');

var jsdom = require('mocha-jsdom');

describe('class tags-input', function() {
    let tagsInput;
    jsdom();

    before(function () {
        tagsInput           =   require('../app/tags.js');

        let input           =   document.createElement('input');
        input.className     =   'tags-element';
        input.type          =   'text';
        input.value         =   '';

        document.body.appendChild(input);
    });

    after(function () {

    });

    describe('constructor', function () {
        it('successful create', function () {
            let tag            =   new tagsInput({
                selector: "input.tags-element"
            });

            let tagContainer   =   document.querySelector('.tag');
            tagContainer.tagName.should.be.equal('DIV');
        });
    });
});