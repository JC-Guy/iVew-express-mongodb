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
#audioPlayer{
  float: right;
}

.menu-item span{
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}
.menu-item i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span{
  width: 0px;
  transition: width .2s ease;
}
.collapsed-menu i{
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}


</style>
<template>
  <div class="layout" >
    <Layout >
      <Header id="header" v-if="sshow!=0">
        <Menu mode="horizontal" theme="light" width="auto">
          <a href="/"><img src="./assets/logo.jpg" alt="iviewLogo" class="layout-logo"></a>
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
            <MenuItem name="5">
              <Icon type="ios-paper"></Icon>
              Item 5
            </MenuItem>
            <span v-if="user!=null && this.$store.state.doneOrNot==1">
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
<!-- 加一个全局的音乐播放器  -->
<Affix :offset-top="100" >
  <div id="audioPlayer">
    <div  style="text-align:center">
    <p v-if="this.changeSong==1">{{audioNamee}}--{{singerr}}</p> <p v-if="this.changeSong==0">止战之殇--周杰伦</p>
    <audio-player ref="audioPlayer"  src="http://other.web.ra01.sycdn.kuwo.cn/resource/n1/128/7/30/3920959009.mp3"/>
  </div>
  </div>
</Affix>
          </div>
        </Menu>
      </Header>
      <!-- 1550~1660 : 400  -->
      <Carousel autoplay loop :autoplay-speed="4000" :height="400" v-if="sshow!=0">
        <CarouselItem>
          <div class="demo-carousel">
            <img src="./assets/ms1.png" alt="轮播第一张图">
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="./assets/ff1.jpg" alt="轮播第一张图">
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
         <img src="./assets/ff2.jpg" alt="轮播第一张图">
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="./assets/ms2.jpg" alt="轮播第四张图">
          </div>
        </CarouselItem>
      </Carousel>
      <Layout id="bgcolor" :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '16px 0'}" v-if="sshow!=0">
          <BreadcrumbItem to="/">Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Content id="content_container" :style="{padding: '24px 0', minHeight: '280px'}">
          <Card> 
          <Layout>
<!-- 左侧sidebar -->
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed" hide-trigger :style="{background: '#fff'}" v-if="sshow!=0">
              <Menu active-name="0" theme="light" width="auto" :open-names="['0']" :class="menuitemClasses" >
                <MenuItem name="0" to="/">
                  <Icon type="md-home"></Icon>
                  首页
                </MenuItem>
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    Hip-Hop in Ch
                  </template>
                    <MenuItem name="1-1" to="/videoArea">
                      <Icon type="md-videocam"></Icon>
                      视频专区
                    </MenuItem>
                  <MenuItem name="1-2" to="/audioArea">
                  <Icon type="md-musical-notes"></Icon>
                  音乐享受
                  </MenuItem>
                  <MenuItem name="1-3" to="/comments"> 
                    <Icon type="ios-brush"></Icon>
                    尽情评论
                  </MenuItem>
                </Submenu>
                <Submenu name="2">
                  <template slot="title">
                    <Icon type="ios-keypad"></Icon>
                    this is baskt
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
            <!-- 右侧内容 -->
            <Content id="content" :style="{padding: '30px', minHeight: '280px'}">
              <router-view v-if="isRouterAlive"></router-view>
            </Content>
          </Layout>
          </Card>
          <BackTop></BackTop>
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
      isCollapsed: false,
      sshow:1,
      isRouterAlive:true,
      audioNamee:'',
      singerr:'',
      changeSong:0//是否切换歌曲，在watch里监听
    }
  },

  mounted(){

  // console.log('mounted里面的sURL是：  '+this.$store.state.songURL)
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
    song:function(val){
      this.changeSong=1
      this.$refs.audioPlayer.player.src=val.url
      this.audioNamee=val.audioName
      this.singerr=val.singer
    
      // console.log('watch里面  '+this.$refs.audioPlayer.player.src)
      // console.log('val是   '+JSON.stringify(val) )
      // console.log(val.singer)
      // console.log(val.audioName)
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    song(){
      return this.$store.state.song
    },
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }


  },

}
</script>
