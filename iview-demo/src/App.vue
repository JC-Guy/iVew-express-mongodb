<style scoped>

.layout {

  position: relative;

  overflow: hidden;
}

.layout-nav {
  width: 800px;
  margin: 5px auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
.layout-logo{
    width: 130px;
    height: 50px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 5px;
    left: 20px;
}
#header {
  background-color: #fff; 
  position: relative;
}
#bgcolor {
  background-color: #fff;
}
#content_container {
  -webkit-border-radius: 6px;
  background-color: #fff;
}
#content {
  background-color: #fff;
}
#leftSider{
  width: 240px;
  background-color: #fff;
}
</style>
<template>
  <div class="layout" >
    <Layout >
      <Header id="header" v-if="sshow!=0">
        <Menu mode="horizontal" theme="light" width="auto">
          <a href="/"><img src="./assets/iview.png" alt="iviewLogo" class="layout-logo"></a>
          <div class="layout-nav">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-stats" /> Act1
              </template>
              <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
              </MenuGroup>
              <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
              </MenuGroup>
            </Submenu>
            <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
            Act2
            </MenuItem>
            <MenuItem name="3">
            <Icon type="ios-analytics"></Icon>
            Item 3
            </MenuItem>
            <MenuItem name="4">
            <Icon type="ios-paper"></Icon>
            Item 4
            </MenuItem>
            <Menu-Item name="5">
              <Icon type="ios-paper"></Icon>
              Item 5
            </Menu-Item>
            <span v-if="user!=null && this.$store.state.doneOrNot==1">
        
              <!-- welcome {{user.username}} -->
              <Button @click="logout" shape="circle">注销</Button>
           <Submenu name="6">
              <template slot="title">
                <Icon type="ios-body" /> {{$store.state.user.username}}
              </template>
              <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
              </MenuGroup>
              <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
              </MenuGroup>
            </Submenu>
            </span>
            <span v-else>
              <Button @click="login">登陆</Button>
              <Button @click="register">注册</Button>
              
            </span>
          </div>
        </Menu>
      </Header>
      <Carousel autoplay loop :autoplay-speed="4000" :height="400" v-if="sshow!=0">
        <CarouselItem>
          <div class="demo-carousel">
            <img src="./assets/66.png" alt="轮播第一张图">
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="./assets/timg.jpg" alt="轮播第二张图">
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="./assets/2.jpg" alt="轮播第三张图">
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="./assets/3.jpg" alt="轮播第四张图">
          </div>
        </CarouselItem>
      </Carousel>
      <Layout id="bgcolor" :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '16px 0'}" v-if="sshow!=0">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Content id="content_container" :style="{padding: '24px 0', minHeight: '280px'}">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}" v-if="sshow!=0">
              <Menu active-name="0" theme="light" width="auto" :open-names="['0']" >
                <MenuItem name="0" to="/">
                  <Icon type="ios-home"></Icon>
                  首页
                </MenuItem>
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    Hip-Hop in Ch
                  </template>
                  <MenuItem name="1-1">视频专区</MenuItem>
                  <MenuItem name="1-2">爆炸事件</MenuItem>
                 
                    <MenuItem name="1-3" to="/comments"> 
                    <Icon type="ios-brush"></Icon>
                    帖子角落
                    </MenuItem>
                  
                </Submenu>
                <Submenu name="2">
                  <template slot="title">
                    <Icon type="ios-keypad"></Icon>
                    这就是灌篮
                  </template>
                  <MenuItem name="2-1">Option 1</MenuItem>
                  <MenuItem name="2-2">Option 2</MenuItem>
                </Submenu>
                <Submenu name="3">
                  <template slot="title">
                    <Icon type="ios-analytics"></Icon>
                    items3
                  </template>
                  <MenuItem name="3-1">Option 1</MenuItem>
                  <MenuItem name="3-2">Option 2</MenuItem>
                </Submenu>
              </Menu>
            </Sider>
            <!-- 内容 -->
            <Content id="content" :style="{padding: '30px', minHeight: '280px'}">
              <router-view v-if="isRouterAlive"></router-view>
            </Content>
            <!-- 锚点 -->
            <!-- <div id="leftSider" v-if="sshow!=0">
              <Anchor show-ink>
                <AnchorLink href="#basic_usage" title="Basic Usage" />
                  <AnchorLink href="#static_position" title="Static Position" />
                  <AnchorLink href="#API" title="API">
                  <AnchorLink href="#Anchor_props" title="Anchor props" />
                  <AnchorLink href="#Anchor_events" title="Anchor events" />
                  <AnchorLink href="#AnchorLink_props" title="AnchorLink props" />
                </AnchorLink>
              </Anchor>
            </div> -->
            <BackTop></BackTop>
          </Layout>
        </Content>
      </Layout>
    
    </Layout>
  </div>
</template>
<script>
export default {
  provide(){
    return {
      reload:this.reload
    }
  },
  data() {
    return {
      sshow:1,
      isRouterAlive:true
    }
  },

  mounted(){
    try{
 this.loginOrNot()
    this.sshowFuc()
    }catch(err){
      throw err
    }
   
  },
  methods: {
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    },
  
    login() {
      this.$router.replace('/login')
    },
    register() {
      this.$router.replace('/register')
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$store.state.doneOrNot=0
        sessionStorage.clear();
        // console.log(JSON.parse(JSON.stringify(sessionStorage.getItem('user')) ))
        this.$router.replace('/')
      })
    },
    sshowFuc(){
      if(this.$route.path=='/login' ||this.$route.path=='/register'){
        this.sshow=0
      }
    },
    loginOrNot(){
      if(this.$store.state.doneOrNot){
        // console.log('登陆后  '+this.$store.state.doneOrNot)
        this.$store.state.user=JSON.parse(sessionStorage.getItem('user'))
      // this.$store.state.user= JSON.parse(JSON.stringify(sessionStorage.getItem('user')) ) 
        // console.log('user is  ' +this.$store.state.user)
        // console.log('username is  ' +this.$store.state.user.username)
      }else{
        // console.log('登陆前'+this.$store.state.doneOrNot)
        // console.log('登陆前'+this.$store.state.user.username)
      }
    }
  },
  watch:{
    '$route'(to ,from){
      if( to.path=='/'){
        this.sshow=1
      }else if(to.path=='/login' || to.path=='/register'){
        this.sshow=0
      }
    },
 
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },

}
</script>
