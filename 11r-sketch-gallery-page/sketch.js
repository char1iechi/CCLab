let dancer;

function setup() {
  // no adjustments in the setup function needed...
  createCanvas(windowWidth, windowHeight);
  // ...except to adjust the dancer's name on the next line:
  dancer = new CaterpillarDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only
  dancer.update();
  dancer.display();
}

class CaterpillarDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }
  update() {
  }
  display() {
    push();
    translate(this.x, this.y);
    let u = [];
    let v = []

    for (let i = 0; i < 4; i++) {
      u[i] = map(sin((i * PI) / 4 + frameCount * 0.05), -1, 1, -10, 10);
      v[i] = map(sin((i * PI) / 4 + frameCount * 0.06), -1, 1, -10, 10);
      
    }

    // ⬇️ draw your dancer here ⬇️

    noStroke();
    colorMode(HSB, 100);
    this.b1 = map(sin(frameCount * 0.05), -1, 1, 0, 100);
    this.b2 = map(sin(frameCount * 0.06), -1, 1, 0, 100);
    this.b3 = map(sin(frameCount * 0.07), -1, 1, 0, 100);
    this.b4 = map(sin(frameCount * 0.08), -1, 1, 0, 100);
    this.br = map(sin(frameCount * 0.09), -1, 1, 30, 80);
    
    this.s1 = 40+ v[0];
    this.s2 = 40+ v[1];
    this.s3 = 40+ v[2];
    this.s4 = 40+ v[3];
    //size of body
    
    //body
    fill(this.b1, this.br, 80);
    circle(0 + u[0], -70, this.s1);
    fill(this.b2, this.br, 80);
    circle(0 + u[1], -25, this.s2);
    fill(this.b3, this.br, 80);
    circle(0 + u[2], +20, this.s3);
    fill(this.b4, this.br, 80);
    circle(0 + u[3], +70, this.s4);

    //face/eyes
    colorMode(RGB);
    fill(0);
    circle(-15 + u[0], -75, 7);
    circle(15 + u[0], -75, 7); //les yeux
    arc(0 + u[0], -60, -12, -15, PI, TWO_PI); //smile

    //bowtie  
    fill(233, 0, 120);
    circle(0 + u[1], -35, 12);
    triangle(0 + u[1], -35, -15+ u[1], -45, -15 + u[1], -25);
    triangle(0 + u[1], -35, 15+ u[1], -45, 15 + u[1], -25);
    pop();
  }
}
