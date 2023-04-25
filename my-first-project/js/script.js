alert('Welcome 欢迎 Bienvenue');
function setup(){
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
    background(100);
    a = random(100);
    b = random(100);
    c = random(50, 100);
  }
  function draw() {
    background(a, b, c);
    noFill();
    for (let i = 0; i < width; i += s) {
      for (let j = 0; j < height; j += s) {
        let circuitH = sin(frameCount*0.03)*300+300;
        let circuitV = cos(frameCount * 0.03) * 300 + 300;
        let d = dist(circuitH, circuitV, i, j);
        let f = map(d, 0, sqrt(width ** 2.35 + height ** 2), 0.1, 3); 
        fill(100 - a, 100 - b, c);
        push();
        rectMode(CENTER);
        translate(i, j);
        rotate(angle1);  
        rect(0, 0, s * f, s * f, 8.3);
        rotate(angle2);
        fill(100 - a, 100 - b, c/2);
        r = random(1.4,1.5);
        triangle(5, 23, 45, 67, 88*r, 98);
        pop();
      }
    }
    angle1 += PI / 50;
    angle2 += -PI / 55;
  
}