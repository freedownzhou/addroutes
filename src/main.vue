<template>
    <div>
      <p>主页面</p>
      下面是我的子路由
      <div>
        <Tabs value="name1">
          <TabPane label="标签一" name="name1">
            <router-link to="/the_one" tag="a">
            这里渲染第一个 one
          </router-link>
          </TabPane>
          <TabPane label="标签二" name="name2">
            <router-link to="/the_two" tag="a">
            这里渲染第二个 two
          </router-link>
          </TabPane>
          <TabPane label="标签三" name="name3">
            <router-link to="/the_three" tag="a">
            这里渲染第三个 three
          </router-link>
          </TabPane>
          <TabPane label="标签四" name="name4">
            <router-link to="/the_four" tag="a">
            这里渲染第四个 four
          </router-link>
          </TabPane>
        </Tabs>
      </div>




    </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{}
      },
      created() {
          alert('这里是首页')
        console.log('这里是首页')
      }
    }
</script>

<style scoped>

</style>
