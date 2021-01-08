<template>
  <div class="main">
     <img class="logo" src="../../public/img/logoOrigin.png" alt="OriginTrail" width="300" height="300px"> 
    <div class="row">
       <p> The Ethereum Blockchain Explorer </p>
      <div style="margin-top: 15px;">
  <el-input placeholder="Search Address" v-model="address" >
      <el-button  icon="el-icon-search" v-on:click="newPage()"  slot="append"></el-button></el-input>
       <el-input placeholder="Start Block (optional)" v-model="startblock" style="width: 160px;"></el-input>
   <el-input placeholder="End Block (optional)" v-model="endblock" style="width: 160px;"></el-input>
    

  
</div>


    </div>

     <div class="row">
    <p>  Ether Price / 1 ETH = </p>
    <el-card class="box-card" shadow="hover" >
      <div class="ethPrice">
     <i class="fas fa-dollar-sign fa-2x"  style="float:left; padding-right:15px;"></i>
      <div class="divTableBody">
<div class="divTableRow">
<div class="divTableCell"> Usd</div>
</div>
<div class="divTableRow">
<div class="divTableCell">{{etherPrice.ethusd}} $</div>
</div>

</div>
        
  </div>
</el-card>

<el-card class="box-card" shadow="hover" >
      <div class="ethPrice">
     <i class="fas fa-dollar-sign fa-2x"  style="float:left; padding-right:15px;"></i>
      <div class="divTableBody">
<div class="divTableRow">
<div class="divTableCell"> Btc</div>
</div>
<div class="divTableRow">
<div class="divTableCell">{{etherPrice.ethbtc}} </div>
</div>

</div>
        
  </div>
</el-card>

<el-card class="box-card" shadow="hover" >
      <div class="ethPrice">
     <i class="fas fa-dollar-sign fa-2x"  style="float:left; padding-right:15px;"></i>
      <div class="divTableBody">
<div class="divTableRow">
<div class="divTableCell"> Eur </div>
</div>
<div class="divTableRow">
<div class="divTableCell">{{exchangeCurency(etherPrice.ethusd,"Eur")}}</div>
</div>

</div>
        
  </div>
</el-card>

<el-card class="box-card" shadow="hover" >
      <div class="ethPrice">
     <i class="fas fa-dollar-sign fa-2x"  style="float:left; padding-right:15px;"></i>
      <div class="divTableBody">
<div class="divTableRow">
<div class="divTableCell"> <p>Ether Price</p>  </div>
</div>
<div class="divTableRow">
<div class="divTableCell">{{etherPrice.ethusd}} $</div>
</div>

</div>
        
  </div>
</el-card>

<el-card class="box-card" shadow="hover" >
      <div class="ethPrice">
     <i class="fas fa-dollar-sign fa-2x"  style="float:left; padding-right:15px;"></i>
      <div class="divTableBody">
<div class="divTableRow">
<div class="divTableCell"> Ether Price </div>
</div>
<div class="divTableRow">
<div class="divTableCell">{{etherPrice.ethusd}} $</div>
</div>

</div>
        
  </div>
</el-card>


<el-card class="box-card" shadow="hover" >
      <div class="ethPrice">
     <i class="fas fa-dollar-sign fa-2x"  style="float:left; padding-right:15px;"></i>
      <div class="divTableBody">
<div class="divTableRow">
<div class="divTableCell"> Ether Price </div>
</div>
<div class="divTableRow">
<div class="divTableCell"> {{exchangeCurency(etherPrice.ethusd,"Eur")}}</div>
</div>

</div>
        
  </div>
</el-card>

     </div>


  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "HelloWorld",
  data: () => ({
    address:"",
    startblock:"",
    endblock:"",
    etherPrice:[],
    currencyRates:[],
    eur:0,
  }),
  methods: {
         newPage() {
           this.address = this.address.replace(' ', '');
           if(this.startblock==""){
              this.startblock = "0";
           }
           if(this.endblock==""){
              this.endblock="99999999";
           }
      this.$router.push({name:'Address',params:{address:this.address,startblock:this.startblock,endblock:this.endblock}})
    },
    exchangeCurency(usd,currency){
      if(currency=="Eur"){
      var asd = usd / this.currencyRates.USD;
      return asd.toFixed(2);
      }

     if(currency=="Nok"){
      asd = usd / this.currencyRates.NOK;
      return asd.toFixed(2);
      }
    },
    getEthPrice(){
 axios
      .get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=568E6J3J3XHJZASJV21UFWDF8YKJG2G3JM')
      .then(response => (this.etherPrice  = response.data.result))
     
    },
    getCurrencyRates(){
 axios
      .get('https://api.exchangeratesapi.io/latest')
      .then(response => (this.currencyRates  = response.data.rates));

    },
  },
  
  mounted () {
   this.getEthPrice();
   this.getCurrencyRates();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  height: calc(100vh - 57px);
  width: 1270px;
  margin: auto;
}
.logo{
  margin-left: 39%;
  padding: 5% 0% 0% 0%;
}
.row{
   width: 1270px;
   height: 50px;
  padding: 35px 0px 35px 0px;
}
.el-input {
  width: 500px;
  float: left;
  padding-right: 25px;
}
.el-card{
  width: 190px;
  margin: 15px 15px 15px 0px;
  float: left;
}
p{
  color:#77838f;
  margin: 0px;
  font-size: 1.21875rem;
}

</style>
