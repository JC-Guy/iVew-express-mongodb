<template>
  <div>
<!-- http://other.web.ra01.sycdn.kuwo.cn/resource/n1/128/7/30/3920959009.mp3 -->
<!-- 外部链接必须加http或者https，不然不能正确跳转
<a href="http://www.baidu.com" target="_blank">点我跳转</a>
外部连接必须加上http或者https
window.location.href="http://www.baidu.com"  在单页打开外部链接
window.open('http://www.baidu.com','_blank')  在新页面打开外部链接
window.open('http://localhost:1994/#/comments','_blank') 在单页面打开应用内连接 -->
<Card style="width:60%">
  <Form ref="formCustom" :model="formCustom"  :label-width="80" style="width:90%">
      <FormItem label="歌曲名" prop="audioName">
        <Input type="text" v-model="formCustom.audioName"></Input>
      </FormItem>
      <FormItem label="演唱者" prop="singer">
        <Input type="text" v-model="formCustom.singer"></Input>
      </FormItem>
      <FormItem label="发布时间" prop="date">
        <Input type="text" v-model="formCustom.date" ></Input>
      </FormItem>
      <FormItem label="URL" prop="url">
        <Input type="text" v-model="formCustom.url" ></Input>
      </FormItem>
      <FormItem>
      <Button ghost type="primary" @click="setAudio">upload</Button>
    </FormItem>
  </Form>
</Card>
<div style="height:30px"></div>
<p>考虑一下，删除功能到底要不要添加，其实如果说只自己用，删除并没有什么用，因为自己用就是
  为了收集歌曲的信息，以后用。
  序号还是获取不了
</p>
<!-- @on-row-click="playAudio(indexx)" -->
  <Table highlight-row :columns="columns1" :data="data1"></Table>
<!--  -->
  </div>
</template>
<script>

export default {
  inject: ["reload"],
  data() {
    return {
      indexx:0,
      formCustom: {
        audioName: '',
        singer: '',
        date: '',
        url:''
      },
      columns1: [
        {type: 'index', width: 60,align: 'center'},
        {title: '歌曲名',key:'audioName' }, 
        {title: '演唱者',key:'singer' }, 
        {title: '发布时间',key:'date' },
        {title:'歌曲url',key:'url'},
        {title:'操作',key:'operation',align:'center',
        render:(h,params)=>{
          // this.indexx=params.index 不明白
          return h('div',[
            h('Button', {
              props: {
                type: 'primary',
                ghost:true,
                size: 'small'
              },
              style: {
                marginRight:"30px"
              },
              on: { 
                click: () => {
                  this.playAudio(params.index)
                }
              }
            }, 'Play'),
            h('Button',{
            props:{
              type:'error',
              ghost:true,
              size:'small'
            },
            style:{},
            on:{
              click:()=>{
                this.remove(params.index)
              }
            }
          },'Delete')
            
          ])
          
          }
        }
        ],
      data1:[]
    }
  },
  mounted() {
    this.getAudio()
  },
  methods: {
    getAudio() {
      this.$http.get('/api/audioArea').then((res) => {
        this.data1=res.data 
        // console.log(this.data1)
       
      }).catch(err => {
        console.log(err)
      })
    },
    //自己用，不算是对外的功能，所以情况不考虑那么全面
    setAudio(){
      this.$http.post('/api/audioArea',this.formCustom).then(res=>{
          // console.log(this.formCustom)
          // console.log(res.data)
          this.reload()
          this.$Notice.success({
            title:'添加成功',
            duration:2
          })
        }).catch(err=>{
        console.log(err)
      })
    },
    playAudio(index){
      // console.log(this.data1[index].url)
      this.$store.state.song=this.data1[index]
      console.log(index)
      // console.log(this.data1[index])
      // console.log(index)
      // console.log('audioArea的地址   '+this.$store.state.songURL)
    },
    remove(index){
      this.data1.splice(index,1)
    }
  },
  watch: {
    indexx:function(val){
      this.indexx=val
    }
  }
}
</script>
<style>
</style>
