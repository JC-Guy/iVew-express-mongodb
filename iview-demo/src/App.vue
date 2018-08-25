<style scoped>
.layout {
  border: 1px solid #d7dde4;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #bdbdbd;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 800px;
  margin: 5px auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
#header {
  background-color: white;
}
#bgcolor {
  background-color: #eeeeee;
}
#content_container {
  -webkit-border-radius: 6px;
  background-color: #fff;
}
#content {
  background-color: #fff;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header id="header">
        <Menu mode="horizontal" theme="light" active-name="1">
          <div class="layout-logo" @click="home">
            首页
          </div>
          <div class="layout-nav">

            <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
            Item 1
            </MenuItem>
            <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
            Item 2
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
            <Button @click="login">登陆</Button>
            <Button @click="register">注册</Button>

            <Avatar>USER</Avatar>

          </div>

        </Menu>
      </Header>
      <Layout id="bgcolor" :style="{padding: '0 50px'}">
        <!-- 轮播 -->
        <Carousel autoplay v-model="value2" loop :autoplay-speed="4000" >
          <CarouselItem>
            <div class="demo-carousel">
              <img src="./assets/1.jpg" alt="轮播第一张图">
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img src="./assets/1.jpg" alt="轮播第二张图">
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img src="./assets/1.jpg" alt="轮播第三张图">
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img src="./assets/1.jpg" alt="轮播第四张图">
            </div>
          </CarouselItem>
        </Carousel>
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Content id="content_container" :style="{padding: '24px 0', minHeight: '280px'}">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    items
                  </template>
                  <MenuItem name="1-1">Option 1</MenuItem>
                  <MenuItem name="1-2">Option 2</MenuItem>
                  <MenuItem name="1-3">Option 3</MenuItem>
                </Submenu>
                <Submenu name="2">
                  <template slot="title">
                    <Icon type="ios-keypad"></Icon>
                    items
                  </template>
                  <MenuItem name="2-1">Option 1</MenuItem>
                  <MenuItem name="2-2">Option 2</MenuItem>
                </Submenu>
                <Submenu name="3">
                  <template slot="title">
                    <Icon type="ios-analytics"></Icon>
                    items
                  </template>
                  <MenuItem name="3-1">Option 1</MenuItem>
                  <MenuItem name="3-2">Option 2</MenuItem>
                </Submenu>
              </Menu>
            </Sider>
            <!-- 内容 -->
            <Content id="content" :style="{padding: '30px', minHeight: '280px'}">
              <router-view></router-view>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer id="bgcolor" class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value2:0
    }
  },
  methods: {
    home() {
      this.$router.replace('/')
    },
    login() {
      this.$router.replace('/login')

    },
    register() {
      this.$router.replace('/register')
    }
  }
}
</script>
