
<template>
  <div>
    <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>Click or drag files here to upload</p>
      </div>
    </Upload>
    <div style="height:20px"></div>

    <Row type="flex" justify="center">
      <Card>
        <Col span="7" offset="1">
        <Card>
          <video  width="100%" height="auto" controls>
            <source src="https://jc-guy-oss.oss-cn-shenzhen.aliyuncs.com/video/test/Country-Girl.mp4?Expires=1536655665&OSSAccessKeyId=TMP.AQGVkVyJPn98sfnAAKO7BAM7_CmBrIOLJ_flcj44yRXI42254zwfUIr2KfUbADAtAhQnt9zq2dQOvSfcaM4DYgRMQS5ETAIVAJTTz_edeOIWUigBcNO9izklZ9Aw&Signature=Hbi%2BzN8lMROPUdMJU0vNp0LjnCM%3D" type="video/mp4" />
          </video>
        </Card>
        <div style="height:20px;"></div>
        </Col>
        <Col span="7" offset="1">
        <Card>
          <video width="100%" height="auto" controls>
            <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4" />
          </video>
        </Card>
        <div style="height:20px;"></div>
        </Col>
        <Col span="7" offset="1">
        <Card>
          <video poster="http://www.html5videoplayer.net/poster/toystory.jpg" width="100%" height="auto" controls>
            <source src="http://www.html5videoplayer.net/videos/toystory.mp4" type="video/mp4" />
          </video>
        </Card>
        <div style="height:20px;"></div>
        </Col>
        <Col span="7" offset="1">
        <Card>
          <video width="100%" height="auto" controls>
            <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4" />
          </video>
        </Card>
        <div style="height:20px;"></div>
        </Col>
        <Col span="7" offset="1">
        <Card>
          <video poster="http://www.html5videoplayer.net/poster/toystory.jpg" width="100%" height="auto" controls>
            <source src="http://www.html5videoplayer.net/videos/toystory.mp4" type="video/mp4" />
          </video>
        </Card>
        <div style="height:20px;"></div>
        </Col>
        <Col span="7" offset="1">
        <Card>
          <video width="100%" height="auto" controls>
            <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4" />
          </video>
        </Card>
        <div style="height:20px;"></div>
        </Col>
        <Col span="7" offset="1">
        <Card>
          <video poster="http://www.html5videoplayer.net/poster/toystory.jpg" width="100%" height="auto" controls>
            <source src="http://www.html5videoplayer.net/videos/toystory.mp4" type="video/mp4" />
          </video>
        </Card>
        <div style="height:20px;"></div>
        </Col>
        <Col span="7" offset="1">
        <Card>
          <video width="100%" height="auto" controls>
            <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4" />
          </video>
        </Card>
        <div style="height:20px;"></div>
        </Col>
        </Col>
      </Card>
      <!-- <Modal
      title="Title"
      v-model="modal1"
      class-name="vertical-center-modal"
      footer-hide="true">
      
      <video  class="videoo" width="100%" height="auto"  controls>
        <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4"  />
      </video>
      <div slot="footer"></div>
    </Modal> -->

    </Row>

  </div>
</template>
<script>
export default {
  data() {
    return {
      modal1: false

    }
  },
  mounted() {
    // console.log(this.playerOptions.sources)
    // console.log(this.playerOptions.sources[0].type)
    // console.log(this.playerOptions.sources[1].src)
  },
  methods: {
    playOnVideo() {
      var videoo=document.getElementsByClassName('videoo')
     videoo.play()
    }

  },
  watch: {

  }
}
</script>
<style>
.video-js .vjs-big-play-button {
  height: 2em;
  width: 2em;
  line-height: 2em;
  border-radius: 1em;
}
</style>