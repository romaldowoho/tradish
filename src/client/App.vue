<template>
  <div id="app">
    <div id="nav">
      <Navbar :key="$route.fullPath"></Navbar>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import Navbar from "./components/navbar";
import DB from "./api/DB";
export default {
  components: {
    Navbar
  },
  async created() {
    if (this.$cookie.get("tradish-session")) {
      await DB.getUserInfo(this);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgba(241, 189, 167, 0.103);
}
#nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
