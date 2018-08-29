<template>
  <div>
    <card title="帖子(样式需要改一下，从后段获取数据是没问题了)" icon="ios-book">
      <section v-for="item in list" :key="item._id">
        title:
        <span>{{item.title}}</span><br /> content:
        <span>{{item.content}}</span>
        <divider />
      </section>
    </card>
    <div style="height:20px"></div>
    <card title="自己写个帖子" icon="ios-brush">
      <Form ref="commentsForm" :model="comments" :rules="rule">
        <FormItem prop="title">
          标题 ：
          <Input type="text" v-model="comments.title" placeholder="title"></Input>
        </FormItem>
        <FormItem prop="content">
          内容 ：
          <Input type="textarea" v-model="comments.content" placeholder="content"></Input>
        </FormItem>
        <FormItem>
          <Button type="success" ghost @click="submitt">发布</Button>
          <Button type="primary" ghost @click="goback">返回</Button>
        </FormItem>
      </Form>
    </card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comments: {},
      list: [],
      user: {},
      rule: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '评论内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getComments()
    this.user = this.$store.state.user
  },

  methods: {
    submitt() {
      //首先看登陆了没，没登陆不能发表
      if (!this.user) {
        this.$Message.info({
          content: '请先登陆，再评论'
        });
      } else {
        // console.log(this.user.username)可以获得用户名
        this.$refs.commentsForm.validate((value) => {
          if (value) {
            this.$http.post('/api/comments', this.comments).then((res) => {
              if (this.comments) {
                this.$store.dispatch('submitt', this.comments).then(() => {
                  this.$Notice.success({
                    title: '发布成功',
                    duration: 2
                  })
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
    getComments() {
      this.$http.get('/api/comments').then((res) => {
        // console.log(res.data[2].title)
        this.list = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
