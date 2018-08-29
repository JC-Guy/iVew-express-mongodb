<template>
  <Card style="width:300px;margin-left:39%;margin-top:13%;text-align:center;">
    <h2 style="text-align:center;margin-bottom:20px">Login</h2>
    <Form ref="loginForm" :model="user" :rules="rules"> 
       <FormItem prop="username">
        <Input type="text" v-model="user.username"  placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="user.password" placeholder="Password">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>

      <div style="text-align:right;margin-bottom:15px">
        <Radio v-model="checked">记住密码</Radio>
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
      checked: true,
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
    this.getCookie()
  },
  methods: {
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date();//获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);//保存的天数
      //字符串拼接cookie
      window.document.cookie="username"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
    window.document.cookie="password"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
    },
    //读取cookie
    getCookie() {
      if (document.cookie.length>0) {
        var arr=document.cookie.split('; ');
        console.log(arr)
        for(var i=0;i<arr.length;i++){
          var arr2=arr[i].split('=');
          if(arr2[0]=='username'){
            this.rules.username=arr2[1];
          }else if(arr2[0]=='password'){
            this.rules.password=arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie() {
      this.setCookie("", "", -1);//修改2值都为空，天数为负1天就好了
    },
    login(formName) {
      //点击登陆，先检验是否有cookie，
      //是不是没上线的项目cookie就不起作用？
      if (this.checked == true) {
        console.log('checked=true')
        this.setCookie(this.rules.username,this.rules.password,7)
      }else{
        // console.log('清空cookie')
        // this.clearCookie()
      }
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
