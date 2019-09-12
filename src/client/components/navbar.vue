<template>
  <div>
    <div class="wrap">
      <div class="logo" @click="goHome">
        <img class="image" src="./../../../public/tradish.png" />
      </div>
      <div class="search">
        <searchBar v-if="['login','register','email','confirmed'].indexOf($route.name) === -1 " />
      </div>
      <div class="links-div" v-if="!this.$cookie.get('tradish-session')">
        <router-link class="link" to="/login">Log in</router-link>
        <router-link class="link" to="/register">Sign up</router-link>
      </div>
      <div class="links-div" v-if="this.$cookie.get('tradish-session')">
        <router-link class="link" to @click.native="logout">Log out</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from "./searchbar";
import axios from "axios";
export default {
  name: "navbar",
  components: {
    searchBar
  },
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push({ name: "home" });
    },
    logout() {
      let token = this.$cookie.get("tradish-session");
      this.$cookie.delete("tradish-session");

      axios
        .post("http://localhost:3000/api/logout", {
          token: token
        })
        .then(res => {
          if (res.status == 200) {
            this.$router.push({ name: "login" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
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
  padding-bottom: 3 px;
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
.image {
  padding: 0;
  padding-bottom: 0;
  width: 170px;
  height: 40px;
}
.image:hover {
  cursor: pointer;
}
</style>