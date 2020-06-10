<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{

    }
  },
  methods:{
    getSession(value){
      // this.$router不是响应式的，所以手动将路由元注入路由对象
      if (this.$router.options.routes.length <= 2) {
        this.$router.options.routes.push(value);
        this.$router.addRoutes(value);
      }
    }
  },
  created () {
    const value = sessionStorage.getItem('MENU_KEY')
    console.log(JSON.parse(value))
    if(value){
      console.log(this.$router)
     this.getSession(JSON.parse(value))
      console.log(this.$router.options.routes)
      console.log('有登录过，直接获取数据')
    }else{
      console.log('没登录过，重新登录')
    }
  },
  mounted() {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
