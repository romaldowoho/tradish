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

<style>
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
