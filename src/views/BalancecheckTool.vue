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
          <span>Token Quantity </span>
        </div>
        <div class="divTable">
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell">At Given Time:</div>
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
              <div class="divTableCell">Difference:</div>
              <div class="divTableCell">
                {{ balance - targetBalance }} Ether
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <div class="row">
      <p>Ether Price {{ targetBalance }} ETH =</p>

      <el-card class="box-card" shadow="hover">
        <div class="ethPrice">
          <div style="float:left; padding-right:15px;font-size:2rem;">₿</div>
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell"><span>BTC</span></div>
            </div>
            <div class="divTableRow">
              <div class="divTableCell">{{ etherPrice.ethbtc }}</div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="box-card" shadow="hover">
        <div class="ethPrice">
          <div style="float:left; padding-right:15px;">
            <img
              class="logo"
              src="../../public/img/flag-united-states.png"
              alt="OriginTrail"
              width="35"
              height="35px"
            />
          </div>
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell"><span>USD</span></div>
            </div>
            <div class="divTableRow">
              <div class="divTableCell">{{ etherPrice.ethusd }}</div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="box-card" shadow="hover">
        <div class="ethPrice">
          <div style="float:left; padding-right:15px;">
            <img
              class="logo"
              src="../../public/img/flag-european-union.png"
              alt="OriginTrail"
              width="35"
              height="35px"
            />
          </div>
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell"><span>EUR</span></div>
            </div>
            <div class="divTableRow">
              <div class="divTableCell">
                {{ exchangeCurency(etherPrice.ethusd, "EUR") }}
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="box-card" shadow="hover">
        <div class="ethPrice">
          <div style="float:left; padding-right:15px;">
            <img
              class="logo"
              src="../../public/img/flag-norway.png"
              alt="OriginTrail"
              width="35"
              height="35px"
            />
          </div>
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell"><span>NOK</span></div>
            </div>
            <div class="divTableRow">
              <div class="divTableCell">
                {{ exchangeCurency(etherPrice.ethusd, "NOK") }}
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="box-card" shadow="hover">
        <div class="ethPrice">
          <div style="float:left; padding-right:15px;">
            <img
              class="logo"
              src="../../public/img/flag-canada.png"
              alt="OriginTrail"
              width="35"
              height="35px"
            />
          </div>
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell"><span>CAD</span></div>
            </div>
            <div class="divTableRow">
              <div class="divTableCell">
                {{ exchangeCurency(etherPrice.ethusd, "CAD") }}
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="box-card" shadow="hover">
        <div class="ethPrice">
          <div style="float:left; padding-right:15px;">
            <img
              class="logo"
              src="../../public/img/flag-hong-kong.png"
              alt="OriginTrail"
              width="35"
              height="35px"
            />
          </div>

          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell"><span>HKD</span></div>
            </div>
            <div class="divTableRow">
              <div class="divTableCell">
                {{ exchangeCurency(etherPrice.ethusd, "HKD") }}
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
    etherPrice: [],
    currencyRates: [],
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
    exchangeCurency(usd, currency) {
      var eur = usd / this.currencyRates.USD;
      eur = eur * this.targetBalance;
      if (currency == "USD") {
        return usd.toFixed(2);
      }
      if (currency == "EUR") {
        var value = eur;
        return value.toFixed(2);
      }

      if (currency == "NOK") {
        value = eur * this.currencyRates.NOK;
        return value.toFixed(2);
      }
      if (currency == "CAD") {
        value = eur * this.currencyRates.CAD;
        return value.toFixed(2);
      }
      if (currency == "HKD") {
        value = eur * this.currencyRates.HKD;
        return value.toFixed(2);
      }
    },
    getEthPrice() {
      axios
        .get(
          "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" +
            config.apikey
        )
        .then((response) => (this.etherPrice = response.data.result));
    },
    getCurrencyRates() {
      axios
        .get("https://api.exchangeratesapi.io/latest")
        .then((response) => (this.currencyRates = response.data.rates));
    },
  },
  mounted() {
    this.calculateEthOnAdress();
    this.getEthPrice();
    this.getCurrencyRates();
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
  width: 406px;
  margin: 15px 7px 15px 7px;
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
span {
  color: #77838f;
}
.row {
  width: 1270px;
  height: 50px;
  padding: 295px 0px 35px 0px;
}
p {
  color: #77838f;
  margin: 0px;
  font-size: 1.21875rem;
}
.overview {
  padding: 155px 2px 0px 0px;
}
span {
  color: #77838f;
}
</style>
