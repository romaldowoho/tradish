<template>
  <div>
    <div class="wrap" v-if="['home'].indexOf($route.name) === -1">
      <div class="logo" @click="goHome">
        <img class="image" src="./../../../public/tradish.png" />
      </div>
      <div class="search">
        <searchBar
          v-if="
            ['login', 'register', 'email', 'confirmed'].indexOf($route.name) ===
              -1
          "
        />
      </div>
      <div class="total-balance" v-if="isLogged == true">
        <div>
          <img class="coin" src="./../../../public/dollar.png" />
        </div>
        <div class="balance">
          ${{ this.$store.state.user.balance | formatNumber }}
        </div>
      </div>
      <div class="links-div" v-if="isLogged == false">
        <router-link class="link" to="/login">Log in</router-link>
        <router-link class="link" to="/register">Sign up</router-link>
      </div>

      <div class="links-div" v-if="isLogged">
        <div class="link">
          <Icon type="ios-menu-outline" size="30" @click="drawer = true" />
          <Drawer class="drawer" v-model="drawer" :closable="false">
            <CellGroup class="cellgroup">
              <Cell @click="drawer = false" style="font-weight: bold;">{{
                this.$store.getters.GET_USER.username
              }}</Cell>
              <Cell @click="drawer = false" to="/history">History</Cell>
              <Cell @click="drawer = false" to="/settings">Settings</Cell>
              <Cell @click.native="logout">Log out</Cell>
            </CellGroup>
          </Drawer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from "./searchbar";
import axios from "axios";
axios.defaults.baseURL = "https://tradish-server.herokuapp.com";
export default {
  name: "navbar",
  components: {
    searchBar
  },
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    isLogged: function() {
      let token = this.$cookie.get("tradish-session");
      return token ? true : false;
      // return document.cookie.indexOf("tradish-session") !== -1;
    }
  },
  watch: {
    $route: function() {
      // this.$router.go(0);
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: "dashboard" });
    },
    logout() {
      this.drawer = false;
      let token = this.$cookie.get("tradish-session");
      this.$cookie.delete("tradish-session");

      axios
        .post("/api/logout", {
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
  },
  filters: {
    formatNumber(num) {
      if (num) {
        return num
          .toFixed(2)
          .toString()
          .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      }
    }
  }
};
</script>

<style scoped>
.wrap {
  display: flex;
  width: 100%;
  padding-top: 30px;
  height: 60px;
  /* background-color: white; */
  background-color: inherit;
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
  justify-content: center;
  width: 50%;
}
.links-div {
  position: relative;
  margin-top: -5px;
  left: 7%;
  display: flex;
  width: 8%;
}
.link {
  margin: 5px;
  margin-left: 3px;
  font-size: 15px;
}
.link:hover {
  cursor: pointer;
}
.image {
  padding: 0;
  padding-bottom: 0;
  margin-top: -5px;
  width: 170px;
  height: 40px;
}
.image:hover {
  cursor: pointer;
}
.total-balance {
  display: flex;
  position: relative;
  left: 3%;
}
.coin {
  width: 20px;
  height: 20px;
  margin: 5px 10px 5px 20px;
}
.balance {
  margin: 7px 10px 5px 0;
  font-weight: bold;
  font-size: 1.1em;
}
</style>
