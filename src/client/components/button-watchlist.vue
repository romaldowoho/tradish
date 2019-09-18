<template>
  <div>
    <Icon
      :title="tooltip"
      @click="handleClick"
      class="eye"
      type="md-eye"
      :color="eyeColor"
      size="30"
    />
  </div>
</template>

<script>
import DB from "./../api/DB";
import { setTimeout } from "timers";
export default {
  name: "eyeButton",
  props: {
    symbol: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      let action = this.isInList ? "remove" : "add";
      this.$Notice.success({
        title: this.isInList ? "Removed from watchlist" : "Added to watchlist",
        duration: 1.5
      });
      DB.handleWatchlist(this, this.symbol, action);
    }
  },
  computed: {
    isInList() {
      return this.$store.getters.GET_USER.watchlist.indexOf(this.symbol) > -1;
    },
    tooltip() {
      return this.isInList ? "Remove from watchlist" : "Add to watchlist";
    },
    eyeColor() {
      return this.$store.getters.GET_USER.watchlist.indexOf(this.symbol) > -1
        ? "rgb(19, 189, 137)"
        : "";
    }
  }
};
</script>

<style>
.eye:hover {
  cursor: pointer;
}
</style>