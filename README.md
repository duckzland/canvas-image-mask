Canvas Image Mask
=================

jQuery script for masking image using pre-defined masking png and process them via HTML5 Canvas element

- Tested on Firefox, Chrome, Internet Explorer 9 & 10
- Final result is not Canvas but Image
- Will not work with CORS on IE's

How to Use?
===========

Load the script as usual with `<script>` tag, modify the image markup to use :

```
<img class="image-mask" src="http://someurl.com/someimagefile.jpg" 
    data-image-mask="http://someurl.com/someimagemasking-file-with-transparency.png" />
```

Script will autoload all images with 'image-mask' css class.


How to Help?
============

- Need testing feedback on Safari and mobile browsers.
- Need example page and masking file examples
- Fork fork and fork!

Credits
=======
Almog Baku - https://github.com/AlmogBaku/imageMask
