# Viewability   
Calculate block viewability





## API

### Viewability([options])

### options.stage   
**Type**: _Object_  
`document.documentElement` or `window` object


### options.element  
**Type**: _Object_  
Block object


### options.percentage
**Type**: _Number_   
**Default**: : `50`  
Visibility of the block in percentage after which the callback will be triggered. `iab` option overrides this option.


### options.iab
**Type**: _Boolean_  
**Default**: `false`  
The callback function will be triggered when block has 50% viewability for 1 second   


### .check()
**Type**: _Function_  
**Returns**: _Object_  
Returns an object `{ vx, vy, square }`, where `vx` and `vy` is a vertical and horizontal viewability (just incase only one axis needed), and `square` is the visible square of the element.





## Usage
```javascript
var viewability = new Viewability({
   stage: document.documentElement, 
   element: document.getElementById('block'), 
   percentage: 55,
   on_visible: onVisible
});

window.onscroll = window.onresize = checkViewability;


function onVisible(){
   console.log('On visible');
}

function checkViewability(){
   var va = viewability.check();
   console.log(va.x, va.y, va.square);
}
```

