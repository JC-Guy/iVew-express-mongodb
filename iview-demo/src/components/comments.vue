<template>
  <div>
    <!-- <h1>{{$store.state.user.username}}</h1> -->
    <card title="帖子(username解决不了，过几天再看把)" icon="ios-book">
      <section v-for="item in list" :key="item._id">
        id:
        <span>{{item._id}}</span><br /> user:
        <span>{{item.cUsername}}</span><br />
        <!-- <span>{{user.cUsername}}</span><br /> -->
        title:
        <span>{{item.title}}</span><br /> content:
        <span>{{item.content}}</span><br /> time:
        <span>{{item.time}}</span>
        <Button type="error" ghost v-if="$store.state.doneOrNot" @click="delComments(item._id)">delete</Button>
        <Button type="primary" ghost v-if="$store.state.doneOrNot" @click="recall">recall</Button>
        <divider />
      </section>
      <!-- 回复先不做了，不知道怎么做 -->
      
    </card>
    <div style="height:20px"></div>
    <card title="自己写个帖子" icon="ios-brush" v-if="!isRecall">
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
      list: [],
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
    // this.user = JSON.parse(sessionStorage.getItem('user'))
    // this.user=this.$store.state.user
    // console.log(this.$store.state.user.username)
    this.getComments()

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
            this.$http.post('/api/comments', this.comments).then((res) => {
              if (this.comments) {
                this.$store.dispatch('submitt', this.comments).then(() => {
                  this.$Notice.success({
                    title: '发布成功',
                    duration: 2
                  })
                  // location.reload()
                  this.reload()
                  console.log("评论发表成功")
                  console.log(res.data)
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
    getComments() {
      this.$http.get('/api/comments').then((res) => {
        // console.log(res.data[2].title)
        // console.log('list is '+JSON.stringify( res.data))
        this.list = res.data
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
