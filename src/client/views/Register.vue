<template>
  <div class="wrap">
    <Card class="input-card">
      <div v-if="emptyFieldsError">
        <Alert
          type="error"
          show-icon
          closable
          v-on:on-close="resetEmptyFieldsError"
          >All fields are required</Alert
        >
      </div>

      <div class="input">
        First Name
        <Input v-model="fname" @on-enter="handleSubmit" />
      </div>

      <div class="input">
        Last Name
        <Input v-model="lname" @on-enter="handleSubmit" />
      </div>

      <div class="input">
        Username
        <Input v-model="username" @on-enter="handleSubmit" />
      </div>

      <div class="input">
        <div v-if="emailExistsWarning">
          <Alert type="warning" show-icon closable>
            Email already exists
            <span slot="close">
              <a href="/login">Log In</a>
            </span>
          </Alert>
        </div>
        <div>
          <div v-if="emailFormatError">
            <Alert
              type="error"
              show-icon
              closable
              v-on:on-close="resetEmailFormatError"
              >Invalid email format</Alert
            >
          </div>
        </div>
        Email
        <Input v-model="email" @on-enter="handleSubmit" />
      </div>
      <div class="input">
        <div v-if="passNoMatchError">
          <Alert
            type="error"
            show-icon
            closable
            v-on:on-close="resetPassNoMatchError"
            >Passwords do not match</Alert
          >
        </div>
        Password
        <Input
          type="password"
          :icon="passMatch ? icon : null"
          v-model="pass1"
          @on-enter="handleSubmit"
        />
      </div>

      <div class="input">
        Confirm password
        <Input
          type="password"
          :icon="passMatch ? icon : null"
          v-model="pass2"
          @on-enter="handleSubmit"
        />
      </div>

      <div class="button">
        <Button type="success" @click="handleSubmit">Sign Up</Button>
      </div>
    </Card>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "https://tradish-server.herokuapp.com";
export default {
  data() {
    return {
      fname: "",
      lname: "",
      username: "",
      email: "",
      pass1: "",
      pass2: "",
      passMatch: false,
      emailExistsWarning: false,
      emailFormatError: false,
      passNoMatchError: false,
      emptyFieldsError: false,
      icon: "ios-checkmark-circle-outline"
    };
  },
  methods: {
    handleSubmit() {
      let err = 0;
      if (!this.validateEmail(this.email)) {
        this.emailFormatError = true;
        err = 1;
      }
      if (!this.passMatch) {
        this.passNoMatchError = true;
        err = 1;
      }
      if (!this.fname || !this.lname || !this.username || !this.email) {
        this.emptyFieldsError = true;
        err = 1;
      }
      if (err) return;
      axios
        .post("/api/register", {
          firstName: this.fname,
          lastName: this.lname,
          username: this.username,
          email: this.email,
          password: this.pass1
        })
        .then(() => {
          this.$router.push("email");
        })
        .catch(err => {
          if (err.response.status === 409) {
            this.emailExistsWarning = true;
          }
        });
    },
    resetEmailFormatError() {
      this.emailFormatError = false;
    },
    resetPassNoMatchError() {
      this.passNoMatchError = false;
    },
    resetEmptyFieldsError() {
      this.emptyFieldsError = false;
    },
    validateEmail(email) {
      let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return re.test(String(email).toLowerCase());
    }
  },
  watch: {
    pass1: function() {
      let pass1 = this.pass1.split(" ").join("");
      let pass2 = this.pass2.split(" ").join("");
      if (pass1 && pass2 && pass1 == pass2) {
        this.passMatch = true;
        this.passNoMatchError = false;
      } else {
        this.passMatch = false;
      }
    },
    pass2: function() {
      let pass1 = this.pass1.split(" ").join("");
      let pass2 = this.pass2.split(" ").join("");
      if (pass1 && pass2 && pass1 == pass2) {
        this.passMatch = true;
        this.passNoMatchError = false;
      } else {
        this.passMatch = false;
      }
    }
  }
};
</script>

<style scoped>
.wrap {
  display: block;
}
.input-card {
  width: 500px;
  height: 100%;
  margin: 0 auto;
  margin-top: 5%;
}
.input {
  width: 300px;
  margin: 0 auto;
  padding-top: 10px;
}
.button {
  padding: 10px;
}
</style>
