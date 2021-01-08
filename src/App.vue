<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
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
          v-on:click="toLink(cvUrl)"
          style="float: right; width:59px;"
          ><i class="fas fa-address-card fa-lg"></i
        ></el-menu-item>
        <el-menu-item
          v-on:click="toLink(linkedInUrl)"
          style="float: right; width:59px;"
          ><i class="fab fa-linkedin fa-lg"></i
        ></el-menu-item>
        <el-menu-item
          v-on:click="toLink(gitUrl)"
          style="float: right; width:59px;"
          ><i class="fab fa-github fa-lg"></i
        ></el-menu-item>
        <el-menu-item v-on:click="homePage()" style="float: right;"
          > <b>Home</b> </el-menu-item
        >
      </div>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  data: () => ({
    cvUrl: "https://tmilost.github.io/Milos_Terzic_CV_Eng/",
    linkedInUrl: "https://www.linkedin.com/in/milos-terzic-a60709183/",
    gitUrl: "https://github.com/tmilost",
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
  color: #2c3e50;

  /* background-color: rgb(9, 12, 43); */
  background-color: #f8fafd;
}
body {
  margin: 0;
}
</style>
