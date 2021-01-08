<template>
  <div class="main">
     <img class="logo" src="../../public/img/logoOrigin.png" alt="OriginTrail" width="300" height="300px"> 
    <div class="input">
      <div style="margin-top: 15px;">
  <el-input placeholder="Search Address" v-model="address" >
      <el-button  icon="el-icon-search" v-on:click="newPage()"  slot="append"></el-button></el-input>
       <el-input placeholder="Start Block (optional)" v-model="startblock" style="width: 160px;"></el-input>
   <el-input placeholder="End Block (optional)" v-model="endblock" style="width: 160px;"></el-input>
    

  
</div>


      <!-- <el-input
        placeholder="Search Address"
        v-model="address"
      >
      </el-input>
      <el-input placeholder="Start Block" v-model="startblock" style="width: 100px;"></el-input>
       <el-input placeholder="End Block" v-model="endblock" style="width: 100px;"></el-input>
      <el-button icon="el-icon-search" v-on:click="newPage()"></el-button> -->
    </div>
    <el-card class="box-card" shadow="hover" >
      <div class="ethPrice">
      <img class="logoEth" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png" alt="OriginTrail" width="55" height="auto" style="float:left;">
      <div class="divTableBody">
<div class="divTableRow">
<div class="divTableCell"> Ether Price </div>
</div>
<div class="divTableRow">
<div class="divTableCell">{{etherPrice.ethusd}} $</div>
</div>
<div class="divTableRow">
<div class="divTableCell">{{etherPrice.ethbtc}} BTC</div>
</div>
</div>
        
  </div>
</el-card>
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
    }
  },
  mounted () {
    axios
      .get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=568E6J3J3XHJZASJV21UFWDF8YKJG2G3JM')
      .then(response => (this.etherPrice  = response.data.result))
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  height: 100vh;
  width: 1270px;
  margin: auto;
}
.logo{
  margin-left: 39%;
}
.input{
  padding: 35px 0px 35px 0px;
}
.el-input {
  width: 500px;
  float: left;
  padding-right: 25px;
}

</style>
