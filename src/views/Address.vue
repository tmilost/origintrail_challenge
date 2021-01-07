<template>
  <div class="main">
    <div class="contract ">Contract {{ address }}</div>
    <div class="overview">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Contract Overview</span>
      </div>
      <div class="divTable">
        <div class="divTableBody">
          <div class="divTableRow">
            <div class="divTableCell">Balance:</div>
            <div class="divTableCell">{{ balance }}</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell">Value:</div>
            <div class="divTableCell">{{ ethToUsd(balance) }}</div>
          </div>
        </div>
      </div>
    </el-card>
</div>
<div class="">
       <el-card class="box-card" shadow="hover">
      
      <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label=" list of 'Normal' Transactions" name="first">
          <el-table
    :data="NormalTransactions"
    height="250"
    style="width: 100%">
     <el-table-column
      prop="hash"
      label="hash"
      width="280">
    </el-table-column>
     <el-table-column
      prop="timeStamp"
      label="timeStamp"
      width="280">
    </el-table-column>
    <el-table-column
      prop="from"
      label="from"
      width="280">
    </el-table-column>
    <el-table-column
      prop="to"
      label="to"
      width="280">
    </el-table-column>
    
  </el-table>
     </el-tab-pane>
    <el-tab-pane label="list of 'Internal' Transactions" name="second">Config</el-tab-pane>
    <el-tab-pane label="list of 'ERC20 - Token Transfer Events'" name="third">Role</el-tab-pane>
    <el-tab-pane label="list of 'ERC721 - Token Transfer Events'" name="fourth">Task</el-tab-pane>
  </el-tabs>

    </el-card>
</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    address: String,
    startblock: String,
    endblock: String,
  },
  data: () => ({
    balance: "",
    etherPriceUsd: 0,
     activeName: 'first',
     NormalTransactions:[],
  }),
  methods: {
       handleClick(tab, event) {
        console.log(tab, event);
      },
    ethToUsd(eth) {
      var ethToUsd = 0;
      ethToUsd = eth * this.etherPriceUsd;
      return ethToUsd;
    },
    getBalance() {
      axios
        .get(
          "https://api.etherscan.io/api?action=balance&address=" +
            this.address +
            "&tag=latest&module=account&apikey=568E6J3J3XHJZASJV21UFWDF8YKJG2G3JM"
        )
        .then((response) => (this.balance = response.data.result));
    },
    getEthPrice() {
      axios
        .get(
          "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=568E6J3J3XHJZASJV21UFWDF8YKJG2G3JM"
        )
        .then((response) => (this.etherPriceUsd = response.data.result.ethusd));
    },
    getNormalTransactions(){
         axios
        .get(
          "https://api.etherscan.io/api?module=account&action=txlist&address=" + this.address + "&startblock=0&endblock=99999999&sort=asc&apikey=568E6J3J3XHJZASJV21UFWDF8YKJG2G3JM"
        )
        .then((response) => (this.NormalTransactions = response.data.result));
        console.log(this.startblock);
    },
    
  },
  mounted() {
    this.getBalance();
    this.getEthPrice();
      this.getNormalTransactions();
    
  },
};
</script>

<style scoped>
.main {
  height: 100vh;
  width: 1270px;
  margin: auto;
}
.divTable {
  display: table;
}
.divTableRow {
  display: table-row;
}
.divTableHeading {
  display: table-header-group;
}
.divTableCell,
.divTableHead {
  width: 25px;
  display: table-cell;
  padding: 3px 10px;
}
.divTableHeading {
  background-color: #eee;
  display: table-header-group;
  font-weight: bold;
}
.divTableFoot {
  background-color: #eee;
  display: table-footer-group;
  font-weight: bold;
}
.divTableBody {
  display: table-row-group;
}
</style>
