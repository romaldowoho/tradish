<template>
  <div class="home">
    <NavbarHome :key="$route.fullPath" />
    <div class="content-row">
      <div class="content">
        <h1><span class="animation stocks">Real stocks.</span> <span class="animation prices">Real prices.</span>  <span class="animation time">Real time.</span> </h1>
        <h1> <span class="animation risk">Zero risk.</span> </h1>
      </div>
      <div class="illustration">
        <img src="../../../public/illustr.svg" class="img" />
      </div>
    </div>
    <div id="canvas"></div>
  </div>
</template>

<script>
// @ is an alias to /src

import NavbarHome from "../components/navbar-home";
export default {
  name: "home",
  components: {
    NavbarHome
  }
};
</script>

<style scoped>
.home {
  background-color: white;
  height: 100vh;
  width: 100vw;
}
.content-row {
  margin-top: 10%;
  display: flex;
  flex-wrap: wrap;
}
.img {
  height: 100%;
  width: 60%;
}
.content {
  width: 50%;
  font-size: 1.3em;
  vertical-align: center;
  padding-top: 12%;
}
.illustration {
  width: 50%;
  justify-content: center;
}

.animation {
  display: inline-block;
  position: relative;
  top: -20px;
  opacity: 0;
}

.stocks {
  animation: fadein 1.5s forwards;

}
.prices {
  animation: fadein 1.5s 0.4s forwards;
}
.time {
  animation: fadein 1.5s 0.8s forwards;
}
.risk {
  animation: fadein 1.5s 1.2s forwards;
}


@keyframes fadein {
  0% {
    /* transform: translate(0,-20px); */
  }
  100% {
    transform: translate(0,20px);
    opacity: 1;
  }
}

@media (max-width: 414px) {
  .content {
    font-size: .7em;
  }

  .content {
    width: 100%;
  }

  .illustration {
    margin-top: 20%;
    width: 100%;
  }

}
</style>
