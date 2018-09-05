<style>
.cardstyle1 {
  width: 53%;
  display: inline-block;
  bottom: 20px;
}
.cardstyle2 {
  width: 45%;
  float: right;
  display: inline-block;
  bottom: 20px;
}
.cardstyle3 {
}

.buttonstyle {
  float: right;
}
#tieziCard:hover{
   background-color: #2d8cf0;
   color: white;
}
#recallCard:hover{
  background-color: #ff9900;
  color: white;
}
#bbb:hover{
  color: white;
}
</style>

<template>
  <div>
    <!-- 左侧： 全部帖子 -->
    <card title="全部帖子(在做一个分页，滚动条滑动加载，不要用页码)" icon="ios-book" class="cardstyle1">
      <section v-for="item in list_total" :key="item._id">
        <card id="tieziCard">
            id: <span>{{item._id}}</span><br /> user:
        <span>{{item.cUsername}}</span><br /> title:
        <span>{{item.title}}</span><br /> content:
        <span>{{item.content}}</span><br /> time:
        <span>{{item.time}}</span>
        <div class="buttonstyle">
          <Button id="bbb" type="primary" size='small' ghost v-if="$store.state.doneOrNot" @click="recall ,modal1 = true,getId(item._id)">recall</Button>
        </div> 
        </card>
        <!-- 回复区 -->
        <collapse simple style="border:0px">
          <Panel name="1">查看回复
            <div slot="content" v-for="sub in item.subItem" :key="sub._id">
              <card id="recallCard">
                user:{{sub.cUsername}}<br />
                content:{{sub.content}}<br /> 
                time:{{sub.time}}
              </card>
              <div style="height:5px;"></div>
            </div>
          </Panel>
        </collapse>
      </section>
    </card>
    <!-- 右侧：自己的帖子 -->
    <card title="自己的帖子(register设置cookie,抽离出公共cookie方法)" icon="ios-book" class="cardstyle2">
      <p v-if="!this.user" style="text-align:center">登录后即可查看</p>
      <p v-if="this.ownListLength==0 && this.user" style="text-align:center">还没有写帖子哦，快去发表吧</p>
      <section v-for="item in list_own" :key="item._id">
        <card id="tieziCard">
          id:
          <span>{{item._id}}</span><br /> user:
          <span>{{item.cUsername}}</span><br />
          title:
          <span>{{item.title}}</span><br /> content:
          <span>{{item.content}}</span><br /> time:
          <span>{{item.time}}</span>
          <div class="buttonstyle">
            <Button type="error" size="small" ghost v-if="$store.state.doneOrNot" @click="delComments(item._id)">delete</Button>
            <Button type="primary" size="small" ghost v-if="$store.state.doneOrNot" @click="recall ,modal1 = true,getId(item._id)">recall</Button>
          </div>
        </card>
        <!-- 回复区 -->
        <collapse simple style="border:0px">
          <Panel name="1">查看回复
            <!-- <Badge dot :offset=[-10,0]>
            </Badge> -->
            <div slot="content" v-for="sub in item.subItem" :key="sub._id">
              <card id="recallCard">
                user:{{sub.cUsername}}<br />
                content:{{sub.content}}<br /> 
                time:{{sub.time}}
              </card>
              <div style="height:5px"></div>
            </div>
          </Panel>
        </collapse>
      </section>
      </section>
    </card>
    <!-- 发表 -->
    <card title="自己写个帖子" icon="ios-brush" class="cardstyle3">
      <Form ref="commentsForm" :model="comments" :rules="rules">
        <FormItem prop="title">
          标题 ：
          <Input type="text" v-model="comments.title" placeholder="title"></Input>
        </FormItem>
        <FormItem prop="content">
          内容 ：
          <Input type="textarea" v-model="comments.content" placeholder="content"></Input>
        </FormItem>
        <Button type="success" ghost @click="submitt">发布</Button>
        <Button type="primary" ghost @click="goback">返回</Button>
        </FormItem>
      </Form>
    </card>
  <!-- 回复   -->
    <Modal v-model="modal1" title="回复" @on-ok="recall">
      <Form ref="recallForm" :model="comments" :rules="rules">
        <FormItem prop="content">
          内容 ：
          <Input type="textarea" v-model="comments.content" placeholder="content"></Input>
       
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      tieziId:'',
      modal1: false,//对话框回复
      ownListLength:0,//自己帖子数
      doRecall: false,//点击回复
      comments: {},
      list_total: [],
      list_own: [],
      user: {},
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '评论内容不能为空', trigger: 'blur' }
        ],
        id: 0,
        cUsername: '',
        time: ''
      }
    }
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
  
    // console.log(this.$store.state.doneOrNot)
    // console.log(this.user.username)
    // console.log(this.doRecall)
    this.getTotalComments()
    this.getOwnComments()

  },

  methods: {
    submitt() {
      if (!this.user && this.$store.state.doneOrNot == 0) {
        this.$Message.info({
          content: '请先登陆，再评论'
        });
      } else {
        this.$refs.commentsForm.validate((value) => {
          if (value) {
            this.$http.post('/api/comments', this.comments, { params: { username: this.user.username } }).then((res) => {
              if (this.comments) {
                this.$store.dispatch('submitt', this.comments).then(() => {
                  this.$Notice.success({
                    title: '发布成功',
                    duration: 2
                  }) 
                  
                  this.reload()
                
                  // console.log("评论发表成功")
                  // console.log(res.data)
                })
              }
            })
          }
        })
      }
    },
    goback() {
      this.$router.replace('/')
    },
    // gobackk() {
    //   this.reload()
    // },
    getTotalComments() {
      this.$http.get('/api/comments').then((res) => {
        // console.log('res.date is '+JSON.stringify( res.data))
        this.list_total = res.data

      }).catch(err => {
        console.log(err)
      })
    },
    getOwnComments() {
      this.$http.get('/api/comments').then(res => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].cUsername == this.user.username) {
            this.list_own.push(res.data[i])
          }
        }
        this.ownListLength=this.list_own.length
        // console.log(this.ownListLength)
      }).catch(err => {
        console.log(err)
      })
    },
    //删除评论的方法
    delComments(index) {
      this.$http.delete('/api/comments',
        {
          params: { id: index }
        }).then(res => {
          this.reload()
          this.$Notice.success({
            title: '删除成功',
            duration: 2
          })
        }).catch(err => {
          console.log(err)
        })
    },
    //回复评论
    recall() {
      this.doRecall=true
        this.$refs.recallForm.validate((value) => {
          if (value) {
            console.log(value)
            this.$http.post('/api/comments', this.comments, { params: { doRecall: this.doRecall,id:this.tieziId,username: this.user.username} }).then((res) => {
              if (this.comments) {
                this.$store.dispatch('submitt', this.comments).then(() => {
                  this.$Notice.success({
                    title: '回复成功',
                    duration: 2
                  })
                  this.reload() 
                  console.log(res.data)
                })
              }
            })
          }else{
            this.$Notice.error({
              title: '评论不能为空',
              duration: 2
            })
            return false
          }
        })
    },
    //得到当前帖子的_id
    getId(index){
      console.log(index)
      this.tieziId=index
    }
  },

  computed: {
    userr() {
      return this.$store.state.user
    }
  },
  // watch:{
  //   cUsername:function(){
  //     this.rules.cUsername=this.$store.state.user.username
  //   }
  // }
}
</script>
