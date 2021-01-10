<template>
  <div class="main">
    <div class="overview">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>Contract Overview</span>
        </div>
        <div class="divTable">
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell">Current Balance:</div>
              <div class="divTableCell">{{ balance }} Ether</div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>Token Quantity</span>
        </div>
        <div class="divTable">
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell"></div>
              <div class="divTableCell">{{ targetBalance }} Ether</div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>Quantity Changed</span>
        </div>
        <div class="divTable">
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell"></div>
              <div class="divTableCell">
                {{ balance - targetBalance }} Ether
              </div>
            </div>
          </div>
        </div>
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

    page: 1,
    balance: 0,
    targetBalance: 0,
    NormalTransactions: [],
  }),
  methods: {
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
    async calculateEthOnAdress() {
      try {
        const response = await axios.get(
          "https://api.etherscan.io/api?action=balance&address=" +
            this.address +
            "&tag=latest&module=account&apikey=" +
            config.apikey
        );
        this.balance = response.data.result / 1000000000000000000;
      } catch (e) {
        this.errors.push(e);
      }
      this.targetBalance = this.balance;
      var status = true;
      var page = 1;
      for (page; status == true; page++) {
        try {
          const response = await axios.get(
            "https://api.etherscan.io/api?module=account&action=txlist&address=" +
              this.address +
              "&startblock=" +
              this.startblock +
              "&endblock=" +
              this.endblock +
              "&page=" +
              page +
              "&offset=100&sort=asc&apikey=" +
              config.apikey
          );
          if (response.data.status == "1") {
            this.NormalTransactions = response.data.result;

            this.NormalTransactions.forEach((element) => {
              if (element.from == this.address) {
                this.targetBalance =
                  this.targetBalance +
                  element.value / 1000000000000000000 +
                  (element.gasPrice / 1000000000000000000) * element.gasUsed;
              } else if (element.to == this.address) {
                this.targetBalance =
                  this.targetBalance -
                  element.value / 1000000000000000000 +
                  (element.gasPrice / 1000000000000000000) * element.gasUsed;
              }
            });
          } else {
            status = false;
          }
        } catch (e) {
          this.errors.push(e);
        }
      }
    },
  },
  mounted() {
    this.calculateEthOnAdress();
  },
  created() {},
};
</script>

<style scoped>
.main {
  height: calc(100vh - 57px);
  width: 1270px;
  margin: auto;
}
.el-card {
  width: 390px;
  margin: 155px 25px 0px 0px;
  float: left;
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
</style>
