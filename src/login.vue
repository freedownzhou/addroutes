<template>
    <div><p>登录界面</p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
      </Form>
      <Button type="error" @click="clear">清除session</Button>
      <Button type="primary" @click="$router.push({path:'/'});">跳转到首页</Button></div>
</template>

<script>
    export default {
        name: "login",
      data(){
          return{
            permitFlag: true,
            formInline: {
              user: '',
              password: ''
            },
            ruleInline: {
              user: [
                { required: true, message: 'Please fill in the user name', trigger: 'blur' }
              ],
              password: [
                { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
              ]
            },
            rtou:[{
              path: '/',
              name: '首页',
              component: '/',
              children: [{
                path: '/the_one',
                name: '菜单管理',
                component: 'the_one',
                children: []
              }, {
                path: '/the_two',
                name: '资源管理',
                component: 'the_two',
                children: []
              }, {
                path: '/the_three',
                name: '项目管理',
                component: 'the_three',
                children: []
              }, {
                path: '/the_four',
                name: '企业管理',
                component: 'the_four',
                children: []
              }]
            }]
          }
      },
      methods: {
        clear(){
          sessionStorage.removeItem('MENU_KEY')
          console.log('清除成功')
        },
        handleSubmit(name){
          var that = this;
          if (that.permitFlag) {
            this.$refs[name].validate(valid => {
              if (valid){
                that.$Message.success('登陸成功，正在跳转...')
                var router = []
                // 一开始不能直接定义好按需加载的component路径，下面循环重新定义component路径
                var qs = this.rtou[0].children
                var temp4 =[]
                // 先循环父级路由
                for (let i = 0; i < qs.length; i++){  // 长度应该是4
                  let temp1 = []    // 用来存储当前父级的所有子级
                  // 如果当前父级路由有子路由的话，循环它重新定义component路径
                  if (qs[i].children){
                    for (let y = 0; y < qs[i].children.length; y++) {
                      let temp2 = {
                        path: qs[i].children[y].path,
                        name: qs[i].children[y].name,
                        component: (resolve) => require([`@/components/${qs[i].children[y].component}`], resolve)
                      }
                      temp1.push(temp2);
                    }
                    // 打印整合的结果
                    console.log(temp1)
                  }
                  // 下面是配置当前循环的父级路由
                   let temp3 = {
                    path: qs[i].path,
                    name: qs[i].name,
                    component: (resolve) => require([`@/components/${qs[i].component}`], resolve),
                    children: temp1,
                  }
                  temp4.push(temp3)
                  // 这里就已经整合结束
                }
                // for循环结束
                // 将处理好的路由push到aaChildren3中
                let aaChildren3 = [
                  {
                    path: "/",
                    name: "main",
                    component: "main",
                    redirect: "/the_one", // 自动重新定义到the_one页面
                    meta: {
                      requireAuth: false
                    },
                    children: temp4 // 把整理好的子级赋给它
                  }
                ];
                // 处理一下定义的主页面的component（暂且我也不知道为什么要在这处理）
                aaChildren3[0].component = (resolve) => require([`@/main.vue`], resolve)
                console.log('没有404页面的router',aaChildren3)
                aaChildren3.push({
                  path: '*',
                  redirect: '/404'
                })
                console.log('有404页面的router',JSON.stringify(aaChildren3))
                // if判斷避免重複添加路由，长度算基础长度，我这本来就有2个页面所以长度为2
                sessionStorage.setItem('MENU_KEY', JSON.stringify(aaChildren3))
                if (this.$router.options.routes.length <= 2) {
                that.$router.addRoutes(aaChildren3)
                  }
              }
              // that.$router.push({path: '/' });
            })
          }
        }
      }
    }
</script>

<style scoped>

</style>
