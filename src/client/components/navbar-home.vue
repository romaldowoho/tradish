<template>
  <div>
    <div class="navbar-wrap">
      <div class="logo">
        <img
          src="../../../public/tradish.png"
          alt="Tradish logo"
          height="52px"
          width="232.5px"
        />
      </div>
      <div class="links">
        <Button v-if="windowWidth() > 416" class="link btn" type="info"
          >Try Demo</Button
        >
        <Button class="link btn" size="large" to="/login">Log in</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    windowWidth() {
      return window.innerWidth;
    }
  }
};
</script>

<style scoped>
.navbar-wrap {
  display: flex;
}
.logo {
  position: relative;
  margin-right: 0;
  padding-top: 20px;
  width: 30%;
  height: 50px;
}
.links {
  width: 70%;
  padding-top: 35px;
  justify-content: flex-end;
  display: flex;
  color: greenyellow;
}
.link {
  position: relative;
  float: right;
  margin-right: 25px;
}
.btn {
  margin-top: -3px;
}
</style>
