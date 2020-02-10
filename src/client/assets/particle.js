export default class Particle {
  constructor(p5) {
    this.p5 = p5;
    this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
    this.vel = p5.createVector(p5.random(-0.5, 0.5), p5.random(-0.5, 0.5));
    this.size = 1;
  }

  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  draw() {
    this.p5.noStroke();
    this.p5.fill("rgba(255, 255, 255, 0.5");
    // this.p5.circle(this.pos.x, this.pos.y, this.size * 2);
  }

  edges() {
    if (this.pos.x < 0 || this.pos.x > this.p5.width) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > this.p5.height) {
      this.vel.y *= -1;
    }
  }

  checkParticles(particles, cols) {
    particles.forEach(particle => {
      const d = this.p5.dist(
        this.pos.x,
        this.pos.y,
        particle.pos.x,
        particle.pos.y
      );
      if (d < 120) {
        const alpha = this.p5.map(d, 0, 120, 0.8, 0);
        this.p5.stroke(`rgba(${13}, ${25}, ${25}, ${alpha})`);
        this.p5.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}
