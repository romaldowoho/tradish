<template>
  <div>
    <div class="wrap">
      <div class="logo">Tradish</div>
      <div class="search">
        <searchBar v-if="['login','register'].indexOf($route.name) === -1" />
      </div>
      <div class="links-div">
        <router-link class="link a" to="/login">Log in</router-link>
        <router-link class="link a" to="/register">Sign up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from "./searchbar";
export default {
  name: "navbar",
  components: {
    searchBar
  }
};
</script>

<style scoped>
.wrap {
  display: flex;
  width: 100%;
  height: 30px;
  background-color: white;
}
.logo {
  font-size: 20px;
  position: relative;
  left: 5%;
  display: flex;
  width: 25%;
}
.search {
  display: flex;
  width: 50%;
}
.links-div {
  position: relative;
  left: 10%;
  display: flex;
  width: 25%;
}
.link {
  margin: 5px;
  margin-left: 3px;
  font-size: 15px;
}
a:hover {
  color: red;
}
</style>