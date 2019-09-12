<template>
  <div class="terminal-wrap">
    <Card class="watchlist" :padding="0">
      <p slot="title">Watchlist</p>
      <Scroll height="400">
        <CellGroup @on-click="handleClick">
          <Cell
            class="cell"
            v-for="symbol in watchlist"
            :key="symbol"
            :title="symbol"
            :name="symbol"
            extra="$34.78"
          />
        </CellGroup>
      </Scroll>
    </Card>
  </div>
</template>

<script>
export default {
  name: "Watchlist",
  computed: {
    watchlist() {
      return this.$store.getters.GET_USER.watchlist;
    }
  },
  methods: {
    handleClick(symbol) {
      this.$router.push({ name: "stock-page", params: { symbol } });
    }
  }
};
</script>

<style scoped>
.terminal-wrap {
  position: absolute;
  width: 50%;
}
.watchlist {
  width: 100%;
  height: 500px;
  padding: 0;
}
.cell {
  font-weight: bold;
  text-align: left;
  padding-top: 13px;
  height: 50px;
}
</style>