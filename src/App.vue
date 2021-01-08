<template>
  <div id="app">
    <el-menu
      
      class="el-menu-demo"
      mode="horizontal"
     
    >
      <div class="menuItems">
        <el-menu-item style="float: left;">
          <img
            class="logo"
            src="../public/img/originTrailLogo.png"
            alt="OriginTrail"
            width="130"
            height="40px"
          />
        </el-menu-item>
        <el-menu-item
          v-on:click="toLink(config.cvUrl)"
          style="float: right; width:59px;"
          ><i class="fas fa-address-card fa-lg"></i
        ></el-menu-item>
        <el-menu-item
          v-on:click="toLink(config.linkedInUrl)"
          style="float: right; width:59px;"
          ><i class="fab fa-linkedin fa-lg"></i
        ></el-menu-item>
        <el-menu-item
          v-on:click="toLink(config.gitUrl)"
          style="float: right; width:59px;"
          ><i class="fab fa-github fa-lg"></i
        ></el-menu-item>
        <el-menu-item v-on:click="homePage()" style="float: right; width:79px">
          <b>Home</b>
        </el-menu-item>
      </div>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
import config from "../public/config.json";
export default {
  data: () => ({
    config: config,
  }),
  methods: {
    toLink(adress) {
      window.location.href = adress;
    },
    homePage() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style>
.el-menu-item {
  width: 175px;
}
.menuItems {
  width: 1270px;
  margin: auto;
}

#app {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 

  /* background-color: rgb(9, 12, 43); */
  background-color: #f8fafd;
}
body {
  margin: 0;
}
</style>
