<style>
.cardstyle1{
  width: 53%;
  display: inline-block;
  bottom: 20px;
}
.cardstyle2{
  width: 45%;
  float:right;
  bottom: 20px;
}

.buttonstyle{
  float: right;
}
</style>

<template>
  <div>
<!-- 左侧： 全部帖子 -->
    <card title="全部帖子" icon="ios-book" class="cardstyle1">
      <section v-for="item in list_total" :key="item._id">
        id:
        <span>{{item._id}}</span><br /> user:
        <span>{{item.cUsername}}</span><br />
        <!-- <span>{{user.cUsername}}</span><br /> -->
        title:
        <span>{{item.title}}</span><br /> content:
        <span>{{item.content}}</span><br /> time:
        <span>{{item.time}}</span>
        <!-- <Button type="error" ghost v-if="$store.state.doneOrNot" @click="delComments(item._id)">delete</Button>
        <Button type="primary" ghost v-if="$store.state.doneOrNot" @click="recall">recall</Button> -->
        <divider />
      </section>
    </card>
    <!-- 右侧：自己的帖子 -->
    <card title="自己的帖子" icon="ios-book" class="cardstyle2">
      <section v-for="item in list_own" :key="item._id">
        id:
        <span>{{item._id}}</span><br /> user:
        <span>{{item.cUsername}}</span><br />
        <!-- <span>{{user.cUsername}}</span><br /> -->
        title:
        <span>{{item.title}}</span><br /> content:
        <span>{{item.content}}</span><br /> time:
        <span>{{item.time}}</span>
        <div class="buttonstyle">
          <Button type="error"  size="small" ghost v-if="$store.state.doneOrNot" @click="delComments(item._id)">delete</Button>
          <Button type="primary" size="small"  ghost v-if="$store.state.doneOrNot" @click="recall">recall</Button>
        </div>
        <divider />
      </section>
    </card>

    <card title="自己写个帖子" icon="ios-brush" v-if="!isRecall" class="cardstyle3">
      <Form ref="commentsForm" :model="comments" :rules="rules">
        <FormItem  prop="title" >
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
    <card title="回复" icon="ios-brush" v-if="isRecall">
      <Form ref="commentsForm" :model="comments" :rules="rules">
        <FormItem prop="content">
          内容 ：
          <Input type="textarea" v-model="comments.content" placeholder="content"></Input>
        </FormItem>
        <Button type="success" ghost @click="submitt">回复</Button>
        <Button type="primary" ghost @click="gobackk">返回</Button>
        </FormItem>
      </Form>
    </card>



  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      isRecall:false,//点击recall
      pubRecall:true,//点击回复
      comments: {},
      list_total: [],
      list_own:[],
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
    // console.log(this.user.username)
    this.getTotalComments()
    this.getOwnComments()
    },

  methods: {
    submitt() {
      //首先看登陆了没，没登陆不能发表
      if (!this.user && this.$store.state.doneOrNot == 0) {
        this.$Message.info({
          content: '请先登陆，再评论'
        });
      } else {
        this.$refs.commentsForm.validate((value) => {
          if (value) {
            this.$http.post('/api/comments', this.comments,{params:{username:this.user.username}}).then((res) => {
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
    gobackk(){
      this.reload()
    },
    getTotalComments() {
      this.$http.get('/api/comments').then((res) => {
        // console.log('res.date is '+JSON.stringify( res.data))
        this.list_total = res.data
        
      }).catch(err => {
        console.log(err)
      })
    },
    getOwnComments(){
      this.$http.get('/api/comments').then(res=>{
        for(var i=0;i<res.data.length;i++){
          if(res.data[i].cUsername==this.user.username){
            this.list_own.push(res.data[i])
          }
        }
      // console.log(this.list_own)
       
      }).catch(err=>{
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
      this.isRecall=true

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
