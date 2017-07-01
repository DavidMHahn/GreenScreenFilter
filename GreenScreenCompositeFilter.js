//setting global variables
var fgimg = null;
var bgimg = null;
var imgcanvas = null;
var imgcanvas2 = null;
var greenthreshold = 240; // alternatively this can be set as the previous example comparing the green 
			//with the sum of red and blue pixel values: "pixel.getRed() + pixel.getBlue()"

// function to upload the foreground image
function fgImg() {
	imgcanvas = document.getElementById("can");
	var imageinput = document.getElementById("fgimage");
	fgimg = new SimpleImage(imageinput);
	fgimg.drawTo(imgcanvas);
}

// function to upload the background image
function bgImg() {
  imgcanvas = document.getElementById("can2");
  var image2input = document.getElementById("bgimage");
  bgimg = new SimpleImage(image2input);
  bgimg.drawTo(imgcanvas);
}

// function to check for two image files, and make a composite of the two based on greenthreshold value. 
//Draws the composite image to the canvas.
function makeComposite() {
  // checking foreground image field is populated
  if (fgimg == null || ! fgimg.complete()){
    alert ("foreground image not loaded");
    return;
  }
  // checking background image field is populated
  if (bgimg == null || ! bgimg.complete()) {
    alert ("background image not loaded");
    return;
  }
  // setting the output variable which holds the final composite image
  var output = new SimpleImage(fgimg.getWidth(), fgimg.getHeight());
  // setting the first canvas element variable
  imgcanvas = document.getElementById("can");
  // clearing the first canvas element
  var ctxt = imgcanvas.getContext("2d");
  ctxt.clearRect(0,0,fgimg.getWidth(),fgimg.getHeight());
  // setting the second canvas element variable
  imgcanvas2 = document.getElementById("can2");
  // clearing the second canvas element
  var ctxt2 = imgcanvas2.getContext("2d");
  ctxt2.clearRect(0,0,bgimg.getWidth(),bgimg.getHeight());
  
	// iterating through each pixel of the foreground image to check its RGB Green value and see if it's above the threshold. 
	//If it's above the threshold value, then set the foreground pixel's value to the equivalent pixel of the background image. 
	//If not above the threshold value, then just leave the pixel as it is.
	for (var pixel of fgimg.values()) {
      var x = pixel.getX();
      var y = pixel.getY();
		if (pixel.getGreen() > greenthreshold) { // greenthreshold can be replaced by: "pixel.getRed() + pixel.getBlue()"
			var bgPixel = bgimg.getPixel(x,y);
			output.setPixel(x,y,bgPixel);
		}
		else {
			output.setPixel(x,y,pixel);
		}
	}
  // using drawTo method for sending the composite image to first canvas
  output.drawTo(imgcanvas2);
}

// function to clear the images from both canvases
function clearScreen() {
  imgcanvas = document.getElementById("can");
  var ctxt = imgcanvas.getContext("2d");
  ctxt.clearRect(0,0,fgimg.getWidth(),fgimg.getHeight());
  
  imgcanvas2 = document.getElementById("can2");
  var ctxt2 = imgcanvas2.getContext("2d");
  ctxt2.clearRect(0,0,bgimg.getWidth(),bgimg.getHeight());
}
