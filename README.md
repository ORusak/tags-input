# Description
Status: release.

Vanilla JS tags plugun. Add input HTML element opportunities edit tags.
Plugin not include functionality autocomplite. Required use third-party plugin, e.g.
[JavaScript-autoComplete](https://github.com/Pixabay/JavaScript-autoComplete).

Demo: https://harebrown.herokuapp.com/demo-tags-input/index.html

# Requirement
## Plugin is implementation element edit tags to stackoverflow.com.

# Features
* Add, remove tags
* Edit any tag inline
* Separate char: whitespace, tab, comma, semicolon.

# Roadmap
* Add test
* Override hook for event plugin onBeforeTagAdd/onTagAdd и onBeforeTagRemove/onTagRemove
* Auto init element on page by the sign
* Init and destroy plugin
* Option add value tags only from list

# API Плагин Метки
    module tags input plugin

**Author:** Oleg Rusak  

* [pTags](#module_pTags)
    * [pTags](#exp_module_pTags--pTags) ⏏
        * [new pTags(options)](#new_module_pTags--pTags_new)
        * [.value](#module_pTags--pTags+value) ⇒ <code>string</code>
        * [.value](#module_pTags--pTags+value)
        * [.addTag(name)](#module_pTags--pTags+addTag) ⇒ <code>Object</code> &#124; <code>null</code>
        * [.addTagsFromString(str)](#module_pTags--pTags+addTagsFromString) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.remove(name)](#module_pTags--pTags+remove) ⇒ <code>boolean</code>
        * [.returnIndexTag(name)](#module_pTags--pTags+returnIndexTag) ⇒ <code>Number</code>
        * [.focus()](#module_pTags--pTags+focus)

<a name="exp_module_pTags--pTags"></a>
### pTags ⏏
class implementation tags input plugin

**Kind**: Exported class  
<a name="new_module_pTags--pTags_new"></a>
#### new pTags(options)
tags input plugin

**Throws**:

- Not support. Required support querySelector and addEventListener!


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | plugin settings.</br>options.selector - css selector search for init element.</br>options.handlerInputWidth - width input edit tag text. default 15em |

<a name="module_pTags--pTags+value"></a>
#### pTags.value ⇒ <code>string</code>
get value tags

**Kind**: instance property of <code>[pTags](#exp_module_pTags--pTags)</code>  
**Returns**: <code>string</code> - - name tags through separate symbol  
**Access:** public  
<a name="module_pTags--pTags+value"></a>
#### pTags.value
set value tags

**Kind**: instance property of <code>[pTags](#exp_module_pTags--pTags)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | name tags through separate symbol |

<a name="module_pTags--pTags+addTag"></a>
#### pTags.addTag(name) ⇒ <code>Object</code> &#124; <code>null</code>
add new unique tag by name

**Kind**: instance method of <code>[pTags](#exp_module_pTags--pTags)</code>  
**Returns**: <code>Object</code> - tag - object add new DOM element tag<code>null</code> - tag - name is empty or not unique  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name new tag |

<a name="module_pTags--pTags+addTagsFromString"></a>
#### pTags.addTagsFromString(str) ⇒ <code>Array.&lt;Object&gt;</code>
add tags from string

**Kind**: instance method of <code>[pTags](#exp_module_pTags--pTags)</code>  
**Returns**: <code>Array.&lt;Object&gt;</code> - listTag = list object add DOM elements tags plugin  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | name tags throw separate symbol |

**Example**  
```js
// returns [{tag1}, {tag2}]pTag.addTagsFromString("tag1 tag2 tag1");
```
<a name="module_pTags--pTags+remove"></a>
#### pTags.remove(name) ⇒ <code>boolean</code>
remove tag by name

**Kind**: instance method of <code>[pTags](#exp_module_pTags--pTags)</code>  
**Returns**: <code>boolean</code> - operation successful. False - name not exist in tag storage. True - remove all.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name tag |

<a name="module_pTags--pTags+returnIndexTag"></a>
#### pTags.returnIndexTag(name) ⇒ <code>Number</code>
return index tag by name in storage

**Kind**: instance method of <code>[pTags](#exp_module_pTags--pTags)</code>  
**Returns**: <code>Number</code> - index. -1 - not found. Number - index base 0.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name tag |

<a name="module_pTags--pTags+focus"></a>
#### pTags.focus()
focus cursor tags input element

**Kind**: instance method of <code>[pTags](#exp_module_pTags--pTags)</code>  
**Access:** public  
