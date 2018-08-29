<template>
  <Card style="width:300px;margin-left:39%;margin-top:13%;text-align:center">
    <h2 style="text-align:center;margin-bottom:20px">Register</h2>
    <Form ref="registerForm" :model="user" :rules="rules">
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
      <FormItem prop="conform">
        <Input type="password" v-model="user.conform" placeholder="conform">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="success" ghost @click="register">完成</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button type="primary" ghost @click="goback">返回</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
export default {
  data() {
    return {
      user: {},
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '用户名不能少于6位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
        ],
        conform: { required: true, message: '两次输入的密码不一致', trigger: 'blur' }
      }
    }
  },
  methods: {

    register() {
      this.$refs.registerForm.validate((value) => {
        if (value) {
          this.$http.post('/api/register', this.user).then((res) => {
            if (this.user) {
              this.$store.dispatch('register', this.user).then(() => {
                if (res.data.msg) {
                  this.$store.state.doneOrNot = 0
                  this.$Notice.warning({
                    title: '此用户已存在',
                    duration: 1.5
                  })
                }
                else {
                  if (res.data.warn_username_length) {
                    this.$Notice.error({
                      title: "用户名不能少于6位",
                      duration: 1.5
                    })
                  } else if (res.data.warn_password_length) {
                    this.$Notice.error({
                      title: "密码不能少于6位",
                      duration: 1.5
                    })
                  }
                  else {
                    if (this.user.password != this.user.conform) {
                      this.$store.state.doneOrNot = 0
                      this.$Notice.error({
                        title: "两次密码不相同，请重新输入",
                        duration: 1.5
                      })
                    } else {
                      this.$Notice.success({
                        title: '注册成功，欢迎你--' + this.user.username,
                        duration: 2
                      })

                      // console.log(document.cookie)
                      this.$router.replace('/')
                      this.$store.state.doneOrNot = 1
                      console.log("前端:注册成功")
                      console.log(res.data)
                    }
                  }
                }
              })

            } else {
              console.log('前端：用户名或密码不能为空！')
              this.$store.data.doneOrNot = 0
              this.$Notice.error({
                title: "用户名或密码不能为空",
                duration: 1.5
              })
            }
          }).catch((err) => {
            console.log(err)
            this.$store.state.doneOrNot = 0
            this.$Notice.error({
              title: "注册过程错误",
              duration: 1.5
            })
          })

        } else {
          console.log('用户名或密码不能为空')
          this.$store.state.doneOrNot = 0
          this.$Notice.error({
            title: "用户名或密码不能为空",
            duration: 1.5
          })
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
