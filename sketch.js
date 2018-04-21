let video;
let artStr; //string canvas
let f; //font
let g; //graphic context
let stringOfChr;
let strInput;
let button;

let canvasW = 600;
let canvasH = 700;

function preload() {
  f = loadFont('assets/digital-7.ttf');
}

function setup() {
  //canvas
  createCanvas(canvasW,canvasW);
  
  //quickfix for retina display
  pixelDensity(1); 
  
  //video
  video = createCapture(VIDEO).size(80,60);
  video.hide();

  //video character image
  g = createGraphics(510, 1018);
  stringOfChr = " .:+LZM@";

  //gui minimal gui
  createElement("br");
  strInput = createInput(stringOfChr,700,50);
  button = createButton('change character');
  button.mousePressed(editString);
  strInput.changed(editString);
}

function editString(){
  stringOfChr = strInput.value();
}

function draw() {
  g.background(0);
  background(0);
  video.loadPixels();
  artStr = "";

  for (let y = 0 ; y < video.height ; y++){
    for(let x = (video.width -1) ; x >= 0 ; x--){
      let index = (x + y * video.width) * 4;    
      let r = video.pixels[index+0];
      let g = video.pixels[index+1];
      let b = video.pixels[index+2];
      let gray = (r + g + b ) / 3

      if (gray >= 0 && gray < 31) {
        artStr = artStr + stringOfChr.charAt(0);
      } else if (gray >= 31 && gray < 63) {
        artStr = artStr + stringOfChr.charAt(1);
      } else if (gray >= 63 && gray < 95  ) {
        artStr = artStr + stringOfChr.charAt(2);
      } else if (gray >= 95 && gray < 127  ) {
        artStr = artStr + stringOfChr.charAt(3);
      } else if (gray >= 127 && gray < 159  ) {
        artStr = artStr + stringOfChr.charAt(4);
      } else if (gray >= 159 && gray < 191  ) {
        artStr = artStr + stringOfChr.charAt(5);
      } else if (gray >= 191 && gray < 223  ) {
        artStr = artStr + stringOfChr.charAt(6);
      } else {
        artStr = artStr + stringOfChr.charAt(7);
      }
    }
    artStr = artStr + "\n";
  }
  g.textFont(f);
  g.textSize(14);
  g.fill(255);
  g.text(artStr, 0, 0);
  
  //green
  tint(0,255,0);

  //print and resize image
  image(g,0,0,canvasW,canvasW);

  //print framerate
  fill(255,0,0);
  text("fps:" + Math.floor(frameRate()),600,20); 
}