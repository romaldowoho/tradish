<template>
  <div class="home">
    <NavbarHome :key="$route.fullPath" />
    <div class="content-row">
      <div class="content">
        <h1>Real stocks. Real prices. Real time.</h1>
        <h1>Zero risk.</h1>
      </div>
      <div class="illustration">
        <img src="../../../public/illustr.svg" class="img" />
      </div>
    </div>
    <!-- <div id="canvas"></div> -->
  </div>
</template>

<script>
// @ is an alias to /src

// import Particle from "../assets/particle";
import NavbarHome from "../components/navbar-home";
export default {
  name: "home",
  components: {
    NavbarHome
  },
  data() {
    return {
      particles: []
    };
  },
  mounted() {
    // const P5 = window.p5;
    // new P5(this.p5);
  },
  methods: {
    p5(sketch) {
      sketch.setup = () => {
        const canvas = sketch.createCanvas(window.innerWidth, 500);
        canvas.parent("canvas");

        const particlesLength = window.innerWidth < 500 ? 40 : 200;
        for (let i = 0; i < particlesLength; i++) {
          this.particles.push(new Particle(sketch));
        }
      };
      sketch.draw = () => {
        sketch.background("rgb(255, 255, 255)");

        this.particles.forEach((particle, idx) => {
          particle.update();
          particle.draw();
          let cols = [this.rc(), this.rc(), this.rc()];
          particle.checkParticles(this.particles.slice(idx), cols);
        });
      };
    },
    rc() {
      return Math.floor(Math.random() * 255);
    }
  }
};
</script>

<style>
.home {
  /* display: block; */
  background-color: white;
  height: 750px;
}
.content-row {
  margin-top: 50px;
  display: flex;
}
.img {
  height: 350px;
  width: 650px;
}
.content {
  width: 720px;
  font-size: 1.3em;
  vertical-align: center;
  padding-top: 12%;
}
.illustration {
  position: relative;
  width: 720px;
  float: right;
  top: 50px;
  /* right: 100px; */
}

@media (max-width: 411px) {
  .home {
    height: 823px;
  }
  .content {
    font-size: 1em;
  }
}

@media (max-width: 1024px) {
  .home {
    height: 1024px;
  }
  .content-row {
    flex-wrap: wrap;
  }
  .content .illustration {
    width: 100%;
    margin: 0 auto;
    font-size: 1.1em;
  }
  .img {
    height: 175px;
    width: 325px;
  }
}
</style>
