<template>
  <div>
    <div class="input">
      <div v-if="validationErr">
        <Alert
          type="error"
          show-icon
          closable
          v-on:on-close="removeErr"
        >Email and password do not match</Alert>
      </div>
    </div>
    <div class="input">
      Email:
      <Input v-model="email" />
    </div>
    <div class="input">
      Password:
      <Input v-model="password" />
    </div>
    <div class="button">
      <Button type="success" @click="handleSubmit">Login</Button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      validationErr: false
    };
  },
  methods: {
    handleSubmit() {
      axios
        .post("http://localhost:3000/api/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          if (res.status == 200) {
            this.$router.push("about");
          }
        })
        .catch(err => {
          console.log(err);
          this.validationErr = true;
        });
    },
    removeErr() {
      this.validationErr = false;
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
