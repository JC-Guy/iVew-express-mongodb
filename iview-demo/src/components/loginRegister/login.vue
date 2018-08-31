<template>
  <Card style="width:300px;margin-left:39%;margin-top:13%;text-align:center;">
    <h2 style="text-align:center;margin-bottom:20px">Login</h2>
    <Form ref="loginForm" :model="user" :rules="rules">
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

      <div style="text-align:right;margin-bottom:15px">
        <Checkbox id="radioo" v-model="single">记住密码</Checkbox>
      </div>

      <FormItem>
        <Button type="success" ghost @click="login(rules)">登陆</Button>
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
      single: false,
      user: {},
      rules: {
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
  mounted() {
    // this.clearAllCookie()
   if(this.getSingle()){
     this.getCookie()
   }
  },
  methods: {
    setCookie(c_name, c_pwd, singlee,exdays) {
      var exdate = new Date()
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
      window.document.cookie = "username" + "=" + c_name +";expires=" + exdate.toGMTString();
      window.document.cookie = "password" + "=" + c_pwd + ";expires=" + exdate.toGMTString();
      window.document.cookie = "single"+"="+singlee
      console.log('setcookie里面的  '+document.cookie)
    },
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ')
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=')
          if (arr2[0] == 'username') {
            this.user.username = arr2[1]
          } else if (arr2[0] == 'password') {
            this.user.password = arr2[1]
          }
        }
      }
    },
    //看看checkbox被选中没
    getSingle:function() {
     if(document.cookie.length==12){
       return this.single=false
     }else{
       return this.single=true
     }
    },

    //清除所有cookie
    clearAllCookie() {
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (var i = keys.length; i--;)
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
    },
    //本地储存数据
    keepData(aaa){
      sessionStorage.setItem('user',JSON.stringify(aaa))
    },

    login(formName) {

      this.$refs.loginForm.validate((value) => {
        if (value) {
          if (this.single == true) {
            this.setCookie(this.user.username, this.user.password,true, 7)
          } else {
            // this.clearAllCookie()
             this.setCookie("", "",false, -1)
          }
          this.$http.post('/api/login', this.user).then((res) => {
            if (res.data) {
              this.$store.dispatch('login', res.data).then(() => {
                this.$Notice.success({
                  title: '登陆成功,欢迎你！ '+this.user.username,
                  duration: 3
                })
                this.$router.replace('/')
                this.$store.state.doneOrNot = 1
this.keepData(res.data)
                console.log('登陆方法里面cookie is  ' + document.cookie)

                console.log("成功登陆")
                // console.log(this.user.username)
                // console.log(res.data)
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
    },

  },
  // watch:{
  //   single:function(){
  //     console.log(this.single)//true false
  //   }
  // }
}
</script>
