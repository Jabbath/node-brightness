#node-brightness

A node module for changing screen brightness on laptops and other portable devices. This module currently only works on windows.
Keep in mind that this does change your current power plan for both AC and battery power modes, so use at your own risk.

##Usage

```javascript
var changeBrightness = require(node-brightness);
changeBrightness(brightness[,callback]);
```
Where brightness is a percentage between 0 and 100

##Contributing

If you have something to add, try and follow the code style as closely as possible.

##License

Licensed under the MIT license. See license.txt.
