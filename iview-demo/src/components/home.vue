<style scoped>
#container {
  display: inline;
}
.time {
  font-size: 14px;
  font-weight: bold;
}
.content {
  padding-left: 5px;
}
#leftSider {
  width: 240px;
  background-color: #fff;
  float: right;
}
</style>
<template>
  <div id="container">

    <Row>
      <Col span="16">
      <Card>
        <h1>TimeLine Record Everthing</h1>
        <div style="height:10px;"></div>
        <Timeline pending>
          <TimelineItem id="2018.9.5">
            <p class="time">2018.9.5</p>
            <p class="content">评论几乎是完成了，register需要设置cookie，尝试抽离公共 cookie js 但是不会怎么做，暂时停止
            </p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">2018.9.6</p>
            <p class="content">视频上传部分已经有了整个流程的实现思想和步骤， 接下来就是实现，目前卡在了购买云服务器，想要个华为免费的云服务器，但是被抢完了，明天 再抢
            </p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">2018.9.7</p>
            <p class="content">尝试解决视频上传问题,视频绝对不能放在项目里.
             先弄音频，视频有点麻烦
            </p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">2018.9.10</p>
            <p class="content">
              今天弄音频，尽快弄好然后想一下下一步做哪一个模块,获取索引还是没弄好，
              还是通过点按钮来实现吧
            </p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">2018.9.11</p>
            <p class="content">今天做哪一个功能想一想,轮播截图1600*400的，logo自己设计的，狐狸眼</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">1976年</p>
            <p class="content">Apple I 问世</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">1984年</p>
            <p class="content">发布 Macintosh</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">2007年</p>
            <p class="content">发布 iPhone</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">2010年</p>
            <p class="content">发布 iPad</p>
          </TimelineItem>
          <TimelineItem id="sss">
            <p class="time">xxx</p>
            <p class="content">未完待续</p>
          </TimelineItem>
        </Timeline>
      </Card>
      </Col>

      <!-- 锚点 -->
      <Col span="6">
      <!-- <div id="leftSider">
        <Anchor show-ink>
          <AnchorLink href="#2018.9.5" title="2018.9" />
          <AnchorLink href="#static_position" title="2018.10" />
          <AnchorLink href="#Anchor_props" title="2018.11" />
          <AnchorLink href="#Anchor_events" title="2018.12" />
          <AnchorLink href="#AnchorLink_props" title="2019.1" />
          </AnchorLink>
        </Anchor>
      </div> -->
      </Col>
    </Row>

  </div>
</template>
<script>
export default {

}
</script>
