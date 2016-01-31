# Описание
Статус: в разработке.

Vanilla JS плагин для добавления input элементу функций по вводу и обработке меток.
Для функции автозавершения ввода названий меток используется сторонний
плагин [JavaScript-autoComplete](https://github.com/Pixabay/JavaScript-autoComplete).

Плагин реализует возможности схожего элемента для управления метоками на stackoverflow.com.

# Возможности
## Плагин Метки
* Ввод новых меток, удаление
* Редактирование меток по месту
* Ручная инициализация через css селектор.

# Требования для разработки
## Плагин Метки
* Добавить тесты
* Обработчики на событий плагина onBeforeTagAdd/onTagAdd и onBeforeTagRemove/onTagRemove
* Автоматическая инициализация элементов input по заданному признаку
* Подумать как задавать каждому свои настройки
* Реализовать иницициализацию и отключение плагина
* Файл иконки добавить в css для исключения зависимости от font awesome

# API Плагин Метки
    tags input plugin

**Throws**:

- Not support. Required support querySelector and addEventListener!


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | plugin settings |


* [tags-input](#module_tags-input)
    * [.value](#module_tags-input+value) ⇒ <code>string</code>
    * [.value](#module_tags-input+value)
    * [.addTag(name)](#module_tags-input+addTag) ⇒ <code>Object</code> &#124; <code>null</code>
    * [.remove(name)](#module_tags-input+remove) ⇒ <code>boolean</code>
    * [.returnIndexTag(name)](#module_tags-input+returnIndexTag) ⇒ <code>Number</code>

<a name="module_tags-input+value"></a>
### tags-input.value ⇒ <code>string</code>
get value tags

**Kind**: instance property of <code>[tags-input](#module_tags-input)</code>  
**Returns**: <code>string</code> - - name tags through separate symbol  
**Access:** public  
<a name="module_tags-input+value"></a>
### tags-input.value
set value tags

**Kind**: instance property of <code>[tags-input](#module_tags-input)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | name tags through separate symbol |

<a name="module_tags-input+addTag"></a>
### tags-input.addTag(name) ⇒ <code>Object</code> &#124; <code>null</code>
add new unique tag by name

**Kind**: instance method of <code>[tags-input](#module_tags-input)</code>  
**Returns**: <code>Object</code> - tag - object add new DOM element tag<code>null</code> - tag - name is empty or not unique  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name new tag |

<a name="module_tags-input+remove"></a>
### tags-input.remove(name) ⇒ <code>boolean</code>
remove tag by name

**Kind**: instance method of <code>[tags-input](#module_tags-input)</code>  
**Returns**: <code>boolean</code> - operation successful. False - name not exist in tag storage. True - remove all.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name tag |

<a name="module_tags-input+returnIndexTag"></a>
### tags-input.returnIndexTag(name) ⇒ <code>Number</code>
return index tag by name in storage

**Kind**: instance method of <code>[tags-input](#module_tags-input)</code>  
**Returns**: <code>Number</code> - index. -1 - not found. Number - index base 0.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name tag |

