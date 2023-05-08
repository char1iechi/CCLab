//particles
let particles = [];
let numParticles = 4000;
let centerX, centerY;
//blackHole
let circleSize = 150;
let numPoints = 20; // The number of points to use in the curve
let noiseOffset = 0;
let colorOffset = 0;
//textBox
let inputBox;
let sound;


function preload(){
  sound = loadSound("munch1.mp3")
}

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent ("canvasContainer");
  centerX = width / 2;
  centerY = height / 2;
  for (let i = 0; i < numParticles; i++) {
    createParticle();
  }

  //inputBox
  inputBox = createInput();
  inputBox.position(20, 60);
  inputBox.parent ("canvasContainer");
  inputBox.style("font-size", "20px");
  inputBox.style("padding", "10px");
  inputBox.style("border-radius", "10px");
  inputBox.style("border", "none");
  inputBox.style("box-shadow", "0 0 10px rgba(0, 0, 0, 0.3)");
}

function draw() {
  background(0);
  noStroke();

// the BlackHole
  // Calculate the color based on a sine wave
  push();
  let startColor = color(255);
  let endColor = color(220);
  let colorRange = (startColor.levels[0] - endColor.levels[0]) / 2; // Calculate the range of the color oscillation
  let colorCenter = (startColor.levels[0] + endColor.levels[0]) / 2; // Calculate the center of the color oscillation
  let colorValue = sin(colorOffset) * colorRange + colorCenter; // Calculate the current color value
  let circleColor = color(colorValue);

  fill(circleColor);
  strokeWeight(4);
  stroke(circleColor);

  beginShape();
  for (let i = 0; i < numPoints; i++) {
    let angle = map(i, 0, numPoints, 0, TWO_PI);
    let x = (cos(angle) * circleSize) / 2 + width / 2;
    let y = (sin(angle) * circleSize) / 2 + height / 2;
    let noiseVal = noise(i / 10, noiseOffset) * 40 - 20; // Generate some noise to the y-coordinate of each point
    curveVertex(x + noiseVal, y + noiseVal);
  }
  endShape(CLOSE);

  // Update the noise and color offsets
  noiseOffset += 0.02;
  colorOffset += 0.03;
  pop();

//Particles  
  // create new particles to maintain constant number
  while (particles.length < numParticles) {
    createParticle();
  }

  // update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.update();
    if (particle.size <= 0) {
      particles.splice(i, 1);
    } else {
      particle.draw();
    }
  }

//TEXTBOX
  // WORDS check if the input box has text
  if (inputBox.value() !== "") {
    let textValue = inputBox.value();
    let tw = textWidth(textValue);
    // Draw the text at its current position
    let xPos = map(frameCount * 0.4, 0, 200, 20, width / 2 - tw / 2);
    let yPos = map(frameCount * 0.4, 0, 200, 20, height / 2 - 20);
    fill(255);
    textSize(20);
    text(textValue, xPos, yPos);
    if (frameCount >= 520) {
      inputBox.value("");
      frameCount = 0;
      sound.play();
    }
  }
}

//text
function mousePressed() {
  if (frameCount >= 520) {
    loop();
  }
}

//particles
function createParticle() {
  let angle = random(TWO_PI);
  let radius = random(100, 400);
  let armNum = floor(map(angle, 0, TWO_PI, 0, 4));
  let armAngle = angle + armNum * (TWO_PI / 4) + random(-PI / 4, PI / 4);
  let x = centerX + cos(armAngle) * radius;
  let y = centerY + sin(armAngle) * radius;
  let particle = new Particle(x, y);
  particles.push(particle);
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.size = random(3, 7);
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    // let particles be drawned into the hole
    let force = createVector(centerX, centerY).sub(this.pos);
    let distance = force.mag();
    let strength = map(distance, 0, 200, 0.5, 0.1);
    force.setMag(strength);
    this.acc.add(force);

    // apply friction to slow down particle
    this.vel.mult(0.08);

    // update position and velocity
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // shrink particle if it's too close to center of galaxy
    let d = dist(this.pos.x, this.pos.y, centerX, centerY);
    if (d < 75) {
      this.size -= 0.05;
      if (this.size < 0) {
        this.size = 0;
      }
    }
  }

  draw() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
