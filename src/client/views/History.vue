<template>
  <div class="hist-page">
    <div class="title">
      <h1>History</h1>
    </div>

    <div class="table" v-if="transactions.length">
      <Table
        :highlight-row="true"
        :height="700"
        :width="1200"
        :row-class-name="rowClassName"
        :columns="columns"
        :data="transactions"
      ></Table>
    </div>
    <div v-else class="message">
      <h1>Your transaction history will be shown here</h1>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DB from "../api/DB";
export default {
  data() {
    return {
      transactions: [],
      columns: []
    };
  },
  async beforeMount() {
    this.transactions = await DB.getTransactions(this);
    this.transactions.reverse();
    for (let i = 0; i < this.transactions.length; i++) {
      this.transactions[i].date = moment(this.transactions[i].date).format(
        "MMM Do, YYYY"
      );
    }
    this.setColumns(this.transactions[0]);
  },
  methods: {
    setColumns(trans) {
      let columns = [];
      let keys = Object.keys(trans);
      keys.pop();
      for (let i = 0; i < keys.length; i++) {
        let col = {
          title: this.capitalizeFirstLetter(keys[i]),
          key: keys[i]
        };
        columns.push(col);
      }
      this.columns = columns;
    },
    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    rowClassName(row, index) {
      return "demo-table-row";
    }
  }
};
</script>

<style>
.hist-page {
  height: 800px;
}
.ivu-table .demo-table-row td {
  background-color: rgba(241, 189, 167, 0.103);
}
.message {
  margin-top: 100px;
}
.title {
  position: relative;
  margin-top: 30px;
}
.table {
  margin-top: 20px;
  position: relative;
  margin-left: 8%;
  margin-right: 8%;
}
</style>
