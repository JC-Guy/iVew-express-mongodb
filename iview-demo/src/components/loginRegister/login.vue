<template>
  <div style="width:300px;margin-left:300px">
    <Form ref="loginForm" :model="user" :rules="ruleInline">
      <FormItem prop="username">
        <Input type="text" v-model="user.username" placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="user.password" placeholder="Password">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="login">signin</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>

export default {
  data() {
    return {
      user: {},
      ruleInline: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '用户名不能少于6位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
       
    login() {
      //点击登陆，先检验是否有cookie，有的话直接进入主页，没有的话再进入登陆填写表格

      this.$refs.loginForm.validate((value) => {
        if (value) {
          this.$http.post('/api/login', this.user).then((res) => {
            if (res.data) {
              this.$store.dispatch('login', res.data).then(() => {
                this.$Notice.success({
                  title: '登陆成功',
                  duration: 1.5
                })
              
                this.$router.replace('/')
                this.$store.state.doneOrNot = 1
                console.log("成功登陆")
                console.log(res.data)
              })
            } else {
              console.log('用户名或密码错误')
              this.$store.state.doneOrNot = 0
              this.$Notice.error({
                title: '用户名或密码错误',
                duration: 1.5
              })
            }
          }).catch((err) => {
            console.log("出错")
            this.$store.state.doneOrNot = 0
            this.$Notice.error({
              title: '出错，进入catch里',
              duration: 1.5
            })
          })
        } else {
          console.log('进入else里')
          this.$store.state.doneOrNot = 0
          return false
        }
      })

    },
    goback() {
      this.$router.replace('/')
    }
  }
}
</script>
