<template>
  <div class="main">
    <div class="row">
      <div class="contract ">
        <p>Contract: {{ address }}</p>
      </div>
    </div>
    <div class="overview">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>Contract Overview</span>
        </div>
        <div class="divTable">
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell">Balance:</div>
              <div class="divTableCell">{{ balance }} Ether</div>
            </div>
            <div class="divTableRow">
              <div class="divTableCell">Value:</div>
              <div class="divTableCell">
                $ {{ ethToUsd(balance) }} (@ $1,140.21/ETH)
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="tableCard">
      <el-card class="box-card" shadow="hover">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Transactions" name="first">
            <el-table
              :data="NormalTransactions"
              height="590"
              style="width: 100%"
            >
              <el-table-column prop="hash" label="Txn Hash" width="280">
              </el-table-column>
              <el-table-column prop="blockNumber" label="Block" width="280">
              </el-table-column>
              <el-table-column label="Time" width="280">
                <template slot-scope="scope">
                  {{ timeConverter(scope.row.timeStamp) }}
                </template>
              </el-table-column>
              <el-table-column prop="from" label="From" width="280">
              </el-table-column>
              <el-table-column prop="to" label="To" width="280">
              </el-table-column>
              <el-table-column label="Ether" width="380">
                <template slot-scope="scope">
                  {{ scope.row.value / 1000000000000000000 }}
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              v-on:change="handleCurrentChange(handleCurrentChange)"
              :total="1000"
            >
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="Internal Txns" name="second">
            <el-table
              :data="InternalTransactions"
              height="590"
              style="width: 100%"
            >
              <el-table-column prop="hash" label="Txn Hash" width="280">
              </el-table-column>
              <el-table-column prop="blockNumber" label="Block" width="280">
              </el-table-column>
              <el-table-column label="Time" width="280">
                <template slot-scope="scope">
                  {{ timeConverter(scope.row.timeStamp) }}
                </template>
              </el-table-column>
              <el-table-column prop="from" label="From" width="280">
              </el-table-column>
              <el-table-column prop="to" label="To" width="280">
              </el-table-column>
              <el-table-column label="Ether" width="380">
                <template slot-scope="scope">
                  {{ scope.row.value / 1000000000000000000 }}
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              v-on:change="handleCurrentChange(handleCurrentChange)"
              :total="1000"
            >
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../public/config.json";

export default {
  props: {
    address: String,
    startblock: String,
    endblock: String,
  },
  data: () => ({
    config: config,
    balance: 0,
    etherPriceUsd: 0,
    activeName: "first",
    NormalTransactions: [],
    InternalTransactions: [],
  }),
  methods: {
    timeConverter(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp * 1000);
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time =
        date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
      return time;
    },
    handleCurrentChange(item) {
      this.getNormalTransactions(item);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    ethToUsd(eth) {
      var ethToUsd = 0;
      ethToUsd = eth * this.etherPriceUsd;
      return ethToUsd.toFixed(2);
    },
    getBalance() {
      axios
        .get(
          "https://api.etherscan.io/api?action=balance&address=" +
            this.address +
            "&tag=latest&module=account&apikey=" +
            config.apikey
        )
        .then(
          (response) =>
            (this.balance = response.data.result / 1000000000000000000)
        );
    },
    getEthPrice() {
      axios
        .get(
          "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" +
            config.apikey
        )
        .then((response) => (this.etherPriceUsd = response.data.result.ethusd));
    },
    getNormalTransactions(page) {
      axios
        .get(
          "https://api.etherscan.io/api?module=account&action=txlist&address=" +
            this.address +
            "&startblock=" +
            this.startblock +
            "&endblock=" +
            this.endblock +
            "&page=" +
            page +
            "&offset=10&sort=asc&apikey=" +
            config.apikey
        )
        .then((response) => (this.NormalTransactions = response.data.result));
    },
    getInternalTransactions(page) {
      axios
        .get(
          "https://api.etherscan.io/api?module=account&action=txlistinternal&address=" +
            this.address +
            "&startblock=" +
            this.startblock +
            "&endblock=" +
            this.endblock +
            "&page=" +
            page +
            "&offset=10&sort=asc&apikey=" +
            config.apikey
        )
        .then((response) => (this.InternalTransactions = response.data.result));
    },
  },
  mounted() {
    this.getBalance();
    this.getEthPrice();
    this.getNormalTransactions(1);
    this.getInternalTransactions(1);
  },
};
</script>

<style scoped>
.main {
  height: 100%;
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
.row {
  width: 1270px;
  height: 20px;
  padding: 35px 0px 15px 0px;
}
.el-card {
  margin: 25px 0px 0px 0px;
}
.el-pagination {
  margin-top: 15px;
  margin-left: 35%;
}
p {
  color: #77838f;
  margin: 0px;
  font-size: 1.21875rem;
}
span {
  color: #77838f;
}
</style>
