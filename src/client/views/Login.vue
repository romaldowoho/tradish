<template>
  <div>
    <Card class="input-card">
      <div class="input">
        <div v-if="validationErr">
          <Alert type="error" show-icon closable v-on:on-close="removeErr">{{
            errMessage
          }}</Alert>
        </div>
      </div>
      <div class="input">
        Email
        <Input v-model="email" />
      </div>
      <div class="input">
        Password
        <Input type="password" v-model="password" />
      </div>
      <div class="button">
        <Button type="success" @click="handleSubmit">Login</Button>
      </div>
    </Card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      errMessage: "",
      validationErr: false
    };
  },
  beforeCreate() {
    if (this.$cookie.get("tradish-session")) {
      this.$router.push("dashboard");
    }
  },
  methods: {
    handleSubmit() {
      axios
        .post("/api/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          if (res.status == 200) {
            const user = res.data.userInfo;
            const token = user.token;
            this.$store.dispatch("SET_USER", user);
            this.$cookie.set("tradish-session", token, 365);
            this.$router.push("dashboard");
          }
        })
        .catch(err => {
          this.errMessage =
            err.response.data.error.message || err.response.data.error;
          this.validationErr = true;
          console.log(err);
        });
    },
    removeErr() {
      this.validationErr = false;
    }
  }
};
</script>

<style scoped>
.input-card {
  width: 500px;
  height: 300px;
  margin: 0 auto;
}
.input {
  width: 300px;
  display: inline-block;
  padding-top: 10px;
  margin: 0 auto;
}
.button {
  padding: 10px;
}
</style>
