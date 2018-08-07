# Viewability   
Calculate DOM element viewability




## API

### Viewability(stage, element[, options])

### stage   
**Type**: _Object_  
`document.documentElement` or `window` object.


### element  
**Type**: _Object_  
DOM element


### options.percentage
**Type**: _Number_   
**Default**: : `50`  
Visibility of the block in percentage after which the callback will be triggered.


### options.iab
**Type**: _Boolean_  
**Default**: `false`  
The callback function will be triggered when block has 50% viewability for 1 second. `percentage` option overrides standard (50%) value.


### .check()
**Type**: _Function_  
**Returns**: `Object`  
Returned object contains `{ x, y, square }` params, where `x` and `y` is a vertical and horizontal viewability (just incase only one axis needed), and `square` that is the visible square of the element based on both axis.





## Usage
```javascript
var va;
var stage = document.documentElement
var element = document.getElementById('block');

var viewability = new Viewability(stage, element, {
   iab: true, 
   percentage: 22,
   on_visible: onVisible
});

window.onscroll = window.onresize = checkViewability;
checkViewability();


function onVisible(){
   console.log('On visible');
}

function checkViewability(){
   va = viewability.check();
   console.log(va.x, va.y, va.square);
}
```


