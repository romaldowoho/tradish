<template>
  <div>
    <div class="wrap">
      <div class="logo" @click="goHome">
        <img class="image" src="./../../../public/tradish.png" />
      </div>
      <div class="search">
        <searchBar v-if="['login','register','email','confirmed'].indexOf($route.name) === -1 " />
      </div>
      <div class="total-balance">
        <div>
          <img class="coin" src="./../../../public/dollar.png" />
        </div>
        <div class="balance">${{this.$store.state.user.balance | formatNumber}}</div>
      </div>
      <div class="links-div" v-if="!this.$cookie.get('tradish-session')">
        <router-link class="link" to="/login">Log in</router-link>
        <router-link class="link" to="/register">Sign up</router-link>
      </div>
      <!-- <div class="links-div" v-if="this.$cookie.get('tradish-session')">
        <router-link class="link" to @click.native="logout">Log out</router-link>
      </div>-->
      <div class="links-div">
        <div class="link">
          <Dropdown trigger="click">
            <Icon size="30" type="md-menu"></Icon>
            <DropdownMenu slot="list" style="padding: 0; font-weight: bold;">
              <DropdownItem style="margin: 0">
                {{this.$store.getters.GET_USER.username}}
                <Icon type="ios-arrow-forward" />
              </DropdownItem>
              <DropdownItem style="padding: 0; font-size: 30px; width: 100px;">
                <Divider style="padding: 0; margin: 0; width: 125px;" />
              </DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>History</DropdownItem>
              <DropdownItem>About</DropdownItem>
              <DropdownItem>
                <router-link to @click.native="logout">Log out</router-link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
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
      this.$router.push({ name: "dashboard" });
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
  },
  filters: {
    formatNumber(num) {
      if (num) {
        return num.toString().replace(/\d(?=(\d{3})+\.)/g, "$&,");
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