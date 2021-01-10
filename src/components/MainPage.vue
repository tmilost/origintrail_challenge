<template>
  <div class="main">
    <img
      class="logo"
      src="../../public/img/logoOrigin.png"
      alt="OriginTrail"
      width="300"
      height="300px"
    />
    <div class="row">
      <p>The Ethereum Transactions Explorer</p>
      <div style="margin-top: 15px;">
        <el-input placeholder="Search Address" v-model="address">
          <el-button
            icon="el-icon-search"
            v-on:click="newPage()"
            slot="append"
          ></el-button
        ></el-input>
        <el-input
          placeholder="Start Block (optional)"
          v-model="startblock"
          style="width: 160px;"
        ></el-input>
        <el-input
          placeholder="End Block (optional)"
          v-model="endblock"
          style="width: 160px;"
        ></el-input>
      </div>
    </div>

    <div class="row">
      <p>ETH Account Balance Checker</p>
      <div style="margin-top: 15px;">
        <el-input placeholder="Search Address" v-model="addressTime">
          <el-button
            icon="el-icon-search"
            v-on:click="newPage1()"
            slot="append"
          ></el-button
        ></el-input>
        <el-date-picker
          v-model="value2"
          type="datetime"
          placeholder="Select date and time"
          :picker-options="pickerOptions"
          value-format="timestamp"
          default-time="00:00:00"
        >
        </el-date-picker>
      </div>
    </div>

    <div class="row">
      <p>Ether Price / 1 ETH =</p>

      <el-card class="box-card" shadow="hover">
        <div class="ethPrice">
          <div style="float:left; padding-right:15px;font-size:2rem;">₿</div>
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell">Btc</div>
            </div>
            <div class="divTableRow">
              <div class="divTableCell">{{ etherPrice.ethbtc }}</div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="box-card" shadow="hover">
        <div class="ethPrice">
          <div style="float:left; padding-right:15px;font-size:2rem;">🇺🇸</div>
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell">Usd</div>
            </div>
            <div class="divTableRow">
              <div class="divTableCell">{{ etherPrice.ethusd }}</div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="box-card" shadow="hover">
        <div class="ethPrice">
          <div style="float:left; padding-right:15px;font-size:2rem;">🇪🇺</div>
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell">Eur</div>
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
          <div style="float:left; padding-right:15px;font-size:2rem;">🇳🇴</div>
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell">Nok</div>
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
          <div style="float:left; padding-right:15px;font-size:2rem;">🇨🇦</div>
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell">CAD</div>
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
          <div style="float:left; padding-right:15px;font-size:2rem;">🇭🇰</div>

          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell">HKD</div>
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
  name: "HelloWorld",
  data: () => ({
    config: config,
    address: "",
    startblock: "",
    endblock: "",
    addressTime: "",
    etherPrice: [],
    currencyRates: [],
    blockNumberByTimestamp: "",
    ethBlockNumber: "",
    eur: 0,
    currencyList: [
      {
        icon: "🇺🇸",
        curency: "USD",
      },
      {
        icon: "🇪🇺",
        curency: "EUR",
      },
      {
        icon: "🇳🇴",
        curency: "NOK",
      },
      {
        icon: "🇨🇦",
        curency: "CAD",
      },
      {
        icon: "🇭🇰",
        curency: "HKD",
      },
    ],
    pickerOptions: {
      shortcuts: [
        {
          text: "Today",
          onClick(picker) {
            picker.$emit("pick", new Date());
          },
        },
        {
          text: "Yesterday",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
          },
        },
        {
          text: "A week ago",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", date);
          },
        },
      ],
    },
    value1: "",
    value2: "",
    value3: "",
  }),
  methods: {
    newPage() {
      if (this.address == "") {
        console.log("error");
      } else {
        this.address = this.address.replace(" ", "");
        if (this.startblock == "") {
          this.startblock = "0";
        }
        if (this.endblock == "") {
          this.endblock = this.ethBlockNumber.toString();
        }
        this.$router.push({
          name: "Address",
          params: {
            address: this.address,
            startblock: this.startblock,
            endblock: this.endblock,
          },
        });
      }
    },
    async newPage1() {
      if (this.addressTime == "") {
        console.log("error");
      } else {
        this.addressTime = this.addressTime.replace(" ", "");
        var timestamp = this.value2 / 1000;
        this.endblock = this.ethBlockNumber.toString();

        try {
          const response = await axios.get(
            "https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=" +
              timestamp +
              "&closest=before&apikey=" +
              config.apikey
          );
          this.startblock = response.data.result;
        } catch (e) {
          this.errors.push(e);
        }

        this.$router.push({
          name: "BalancecheckTool",
          params: {
            address: this.addressTime,
            startblock: this.startblock,
            endblock: this.endblock,
          },
        });

        console.log(this.blockNumberByTimestamp);
        console.log(timestamp);
      }
    },
    exchangeCurency(usd, currency) {
      var eur = usd / this.currencyRates.USD;
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
    //      getBlockNumberByTimestamp(timestamp){
    //  axios
    //       .get('https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp='+ timestamp +'&closest=before&apikey='+ config.apikey)
    //       .then(response => (this.startblock  = response.data.result))
    //     },

    getEthPrice() {
      axios
        .get(
          "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" +
            config.apikey
        )
        .then((response) => (this.etherPrice = response.data.result));
    },

    getEthBlockNumber() {
      axios
        .get(
          "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=" +
            config.apikey
        )
        .then(
          (response) =>
            (this.ethBlockNumber = parseInt(response.data.result, 16))
        );
    },
    getCurrencyRates() {
      axios
        .get("https://api.exchangeratesapi.io/latest")
        .then((response) => (this.currencyRates = response.data.rates));
    },
  },

  mounted() {
    this.getEthPrice();
    this.getCurrencyRates();
    this.getEthBlockNumber();
  },
};
</script>

<style scoped>
.main {
  height: calc(100vh - 57px);
  width: 1270px;
  margin: auto;
}
.logo {
  margin-left: 39%;
  padding: 5% 0% 0% 0%;
}
.row {
  width: 1270px;
  height: 50px;
  padding: 35px 0px 35px 0px;
}
.el-input {
  width: 500px;
  float: left;
  padding-right: 25px;
}
.el-card {
  width: 190px;
  margin: 15px 7px 15px 7px;
  float: left;
}
p {
  color: #77838f;
  margin: 0px;
  font-size: 1.21875rem;
}
</style>
