/**
 * jQuery Image Mask from PNG
 * 
 * @author jason.xie@victheme.com
 * 
 * This script has been modified heavily from the original
 * script to match and working with data-* url and multiple
 * image on same page.
 * 
 * How to use :
 * 
 * Image Markup :
 * <img class="image-mask" src="http://someurl.com/someimagefile.jpg" 
 *      data-image-mask="http://someurl.com/someimagemasking-file-with-transparency.png" />
 *      
 * if the class is image-mask upon loading this script will
 * be processed automatically.
 * 
 * for other class :
 * 
 * $('.myimageclass').imageMask();
 * 
 * -- Original script author --
 * @author Almog Baku - almog.baku@gmail.com
 * @see https://github.com/AlmogBaku/imageMask
 */
(function( $ ) {

  /**
   * jQuery function
   */
	$.fn.imageMask = function() {
	
		return this.each( function() {
		  
      // Skip when no valid mask defined
      if (!$(this).data('image-mask')) {
        return true;
      }
		  
		  // Build the masking image
		  var maskObj = new Image();
          maskObj.src = $(this).data('image-mask');
      
      var $image = $(this);
      
      // Hide the source image first.
      $image.css( "visibility", "hidden" );
      
      // Wait till mask image loaded
		  $(maskObj).load( function() {
		    
	      // Define variables and reset.
	      var $canvasObj = createCanvas($image, maskObj)[0];
	      var ctx = $canvasObj.getContext("2d");
	      var $maskData = get_maskData($canvasObj, ctx, maskObj);

				// Build the image clone
				var img = new Image();
				    img.src = $image.attr( 'src' );
				
				$(img).one('load', function() {
				  
				  // Draw the clone to the canvas
					drawImg( $canvasObj, ctx, img );
					
					// Applying mask
					applyMask( $canvasObj, ctx, $maskData );

					// Inject the masked image to clone
					img.src = $canvasObj.toDataURL();
					
					// Put the cloned & masked image back to dom
					$(img)
  					.attr( {
              'id':     $image.attr('id'),
              'class':  $image.attr( "class" ),
              'style':  $image.attr( "style" ),
              'width':  $image.width(),
              'height': $image.height()
            })
            .css( "visibility", "" )
            .removeClass('imagemask')
            .insertAfter($image);
					
					// Free up memory
					$canvasObj.remove();
					$image.remove();

				});
			});
		});
	};
	
	

	/**
	 * Function for creating dummy canvas
	 */
	function createCanvas (img, mask) {
    return $( "<canvas>" )
      .attr({
        'class':  img.attr( "class" ),
        'style':  img.attr( "style" ),
        'width':  img.width(),
        'height': img.height()
      })
      .removeClass('imagemask')
      .css( "visibility", "" )
      .insertAfter(img);
	}

	
	
	
	/**
	 * Build the masking data
	 */
	function get_maskData(canvasObj, ctx, mask) {
	  
	  // Draw masking to canvas
		ctx.drawImage(mask, 0, 0, ctx.canvas.width, ctx.canvas.height);      
		
		// Retrieve masking data
		var maskData = ctx.getImageData(0, 0, canvasObj.width, canvasObj.height); 
		
		// Clear canvas
		ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);

		return maskData;
	}
	
	
	
	/**
	 * Draw Image to canvas
	 */
	function drawImg(canvasObj, ctx, img) {
		
	  // Rebuild canvas to match image ratio
		var ratio = 1;
		
		if (img.width > img.height) {
			ratio = canvasObj.height / img.height;
		} 
		else {
			ratio = canvasObj.width / img.width;
		}

		// Draw image to canvas
		ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);
	}

	
	/**
	 * Applying image masking to image on canvas
	 */
	function applyMask(canvasObj, ctx, maskData) {
		
	  // Retrieve the current image on canvas
	  var imgData = ctx.getImageData(0, 0, canvasObj.width, canvasObj.height);
	  
	  // Replacing the alpha according to the masking data
		for (var i = 0; i < imgData.data.length; i += 4) {
			imgData.data[i + 3] = maskData.data[i + 3];
		}
		
		// Place the modified data back to canvas
		ctx.putImageData(imgData, 0, 0);
	}
	
	
})(jQuery);


/**
 * Autobooting the script
 */
jQuery(document).ready(function($){ 
  setTimeout(function() {
    var Target = $('img.imagemask');
    if (Target.length != 0) {
      $('img.imagemask').imageMask();
    }
  }, 100);
});
