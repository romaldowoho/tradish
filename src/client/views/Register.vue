<template>
  <div>
    <div class="input">
      First Name:
      <Input v-model="fname" />
    </div>
    <div class="input">
      Last Name:
      <Input v-model="lname" />
    </div>
    <div class="input">
      Username:
      <Input v-model="username" />
    </div>
    <div class="input">
      <div v-if="emailExists">
        <Alert type="warning" show-icon closable v-on:on-close="emailStatus">
          Email already exists
          <span slot="close">
            <a href="/login">Log In</a>
          </span>
        </Alert>
      </div>Email:
      <Input v-model="email" />
    </div>
    <div class="input">
      Password:
      <Input v-model="password" />
    </div>
    <div class="button">
      <Button type="success" @click="handleSubmit">Sign Up</Button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      fname: "",
      lname: "",
      username: "",
      email: "",
      password: "",
      emailExists: false
    };
  },
  methods: {
    handleSubmit() {
      axios
        .post("http://localhost:3000/api/register", {
          firstName: this.fname,
          lastName: this.lname,
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push("email");
        })
        .catch(err => {
          if (err.response.status === 409) {
            this.emailExists = true;
          }
        });
    },
    emailStatus() {
      this.emailExists = false;
    }
  }
};
</script>

<style scoped>
.input {
  width: 300px;
  margin: 0 auto;
}
.button {
  padding: 10px;
}
</style>
