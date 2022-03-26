<template>
  <div class="cover__container">
    <canvas ref="canvasRef" style="display: none"></canvas>
    <div class="cover__head">
      <a href="javascript:;" class="file">
        <i>上传封面</i>
        <input ref="fileRef" type="file" @change="fileChange" />
      </a>
      <span>支持jpg、png、bmp格式的图片，且文件小于20M</span>
    </div>
    <div class="cover__body clearfix">
      <div class="cover__left" ref="coverRef">
        <img
          src="../../assets/uploads/default_cover.png"
          class="default__cover"
          v-show="!imgSrc"
        />
        <div class="cover__img" ref="coverImgRef" v-show="imgSrc">
          <img :src="imgSrc" />

          <img
            :src="imgSrc"
            :style="{
              clip: `rect(${clipTop}px, ${clipRight}px, ${clipBottom}px, ${clipLeft}px)`
            }"
          />
          <div class="clip" @mousedown="onDown" ref="clipRef">
            <i @mousedown.stop="onClipDown"></i>
          </div>
        </div>
      </div>
      <div class="cover__right">
        <p>歌单封面预览</p>
        <div class="large__img" ref="largeBoxRef">
          <img :src="imgSrc || primarySrc" ref="largeImgRef" />
        </div>
        <span>大尺寸封面（180x180像素）</span>
        <div class="mini__img" ref="miniBoxRef">
          <img :src="imgSrc || primarySrc" ref="miniImgRef" />
        </div>
        <span @click="upload">小尺寸封面（40x40像素）</span>
      </div>
    </div>
    <div class="cover__btn">
      <a
        href="javascript:;"
        :class="['leftBtn', !imgSrc && 'disable']"
        @click="upload"
        ><i>保存</i></a
      >
      <a href="javascript:;" class="cancel" @click="cancel"><i>取消</i></a>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { updateCoverAPI } from '@/api/myAPI'
export default {
  name: 'cover',
  props: ['path'],
  data() {
    return {
      imgSrc: null,
      isDown: false,
      // 鼠标按下时位置
      downX: null,
      downY: null,
      maxY: null,
      maxX: null,
      clipLeft: 0,
      clipTop: 0,
      clipRight: 0,
      clipBottom: 0,
      isClipDown: false,
      clipWidth: 0,
      clipHeight: 0,
      imgSize: null,
      formData: null,
      id: this.$route.query.id,
      newSize: null,
      ratio: null
    }
  },
  created() {
    window.addEventListener('mouseup', this.onUp)
    window.addEventListener('mousemove', this.onMove)
    window.addEventListener('mouseup', this.onClipUp)
    window.addEventListener('mousemove', this.onClipMove)
  },
  methods: {
    // 修改图片原始大小
    editImgSize(file, height, width) {
      const canvasEl = this.$refs.canvasRef
      var context = canvasEl.getContext('2d')
      var reader = new FileReader()
      var image = new Image()
      reader.readAsDataURL(file)
      this.promise = new Promise((resolve) => {
        reader.onload = () => {
          const clipEl = this.$refs.clipRef
          const coverImgEl = this.$refs.coverImgRef
          // 通过 reader.result 来访问生成的 DataURL
          const url = reader.result
          const size = (image.height =
            coverImgEl.clientHeight < coverImgEl.clientWidth
              ? coverImgEl.clientHeight
              : coverImgEl.clientWidth)
          image.src = url
          image.width = size
          image.height = size
          canvasEl.setAttribute('width', image.width + 'px')
          canvasEl.setAttribute('height', image.height + 'px')
          const left =
            (this.clipRight - clipEl.offsetLeft) / this.ratio.widthRatio
          const top =
            (this.clipBottom - clipEl.offsetTop) / this.ratio.heightRatio
          context.drawImage(
            image,
            this.clipLeft / this.ratio.widthRatio,
            this.clipTop / this.ratio.heightRatio,
            left,
            top,
            0,
            0,
            height,
            width
          )
          const URL = canvasEl.toDataURL('image/jpeg', 1)
          resolve(this.fileTransform(this.blobTransform(URL), 'imgFile'))
        }
      })
    },
    // base64转blob
    blobTransform(base64Data) {
      const arr = base64Data.split(',')
      const fileType = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let l = bstr.length
      const u8Arr = new Uint8Array(l)

      while (l--) {
        u8Arr[l] = bstr.charCodeAt(l)
      }
      return new Blob([u8Arr], {
        type: fileType
      })
    },
    // blob转file
    fileTransform(newBlob, fileName) {
      newBlob.lastModifiedDate = new Date()
      newBlob.name = fileName
      return newBlob
    },
    // 将图片等比例缩放
    zoomImg(imgWidth, imgHeight, maxWidth, maxHeight) {
      const widthRatio = maxWidth / imgWidth
      const heightRatio = maxHeight / imgHeight
      this.ratio = {
        widthRatio,
        heightRatio
      }
      let ratio
      widthRatio < heightRatio ? (ratio = widthRatio) : (ratio = heightRatio)

      const currentImg = {
        width: parseInt(imgWidth * ratio),
        height: parseInt(imgHeight * ratio)
      }
      return currentImg
    },
    // 当图片上传
    async fileChange(e) {
      const largeBoxEl = this.$refs.largeBoxRef
      const largeImgEl = this.$refs.largeImgRef
      const miniBoxEl = this.$refs.miniBoxRef
      const miniImgEl = this.$refs.miniImgRef
      const coverImgEl = this.$refs.coverImgRef
      const clipEl = this.$refs.clipRef
      const coverEl = this.$refs.coverRef
      // 获取需要的图片信息
      this.imgSize = await this.getImg(e.target.files[0])
      this.imgSrc = this.imgSize.base64
      // 获取缩放后的图片
      this.newSize = this.zoomImg(
        this.imgSize.width,
        this.imgSize.height,
        coverEl.clientWidth,
        coverEl.clientHeight
      )
      document.querySelector('.cover__img').style.width =
        this.newSize.width + 'px'
      document.querySelector('.cover__img').style.height =
        this.newSize.height + 'px'
      this.update(this.newSize)
      // 更新示例cover的图片大小
      this.updateExamplesSize(largeBoxEl, largeImgEl)
      this.updateExamplesSize(miniBoxEl, miniImgEl)
      // 更新示例位置
      this.$nextTick(() => {
        this.apdateExamplesPosition(
          largeBoxEl,
          largeImgEl,
          coverImgEl,
          clipEl,
          clipEl.offsetLeft,
          clipEl.offsetTop
        )
        this.apdateExamplesPosition(
          miniBoxEl,
          miniImgEl,
          coverImgEl,
          clipEl,
          clipEl.offsetLeft,
          clipEl.offsetTop
        )
      })
    },
    // 更新示例cover缩放比例
    updateExamplesSize(imgBoxEl, imgEl) {
      // 初始示例cover的图片大小
      const clipEl = this.$refs.clipRef
      const coverImgEl = this.$refs.coverImgRef
      this.$nextTick(() => {
        const imgWidthSize = coverImgEl.clientWidth / clipEl.clientWidth
        const imgHeightSize = coverImgEl.clientHeight / clipEl.clientHeight
        imgEl.style.width = imgWidthSize * imgBoxEl.clientWidth + 'px'
        imgEl.style.height = imgHeightSize * imgBoxEl.clientHeight + 'px'
      })
    },
    // 更新示例cover位置
    apdateExamplesPosition(imgBoxEl, imgEl, coverImgEl, clipEl, x, y) {
      const PositionX =
        (x * (imgBoxEl.clientWidth - imgEl.clientWidth)) /
        (coverImgEl.clientWidth - clipEl.clientWidth)
      const PositionY =
        (y * (imgBoxEl.clientHeight - imgEl.clientHeight)) /
        (coverImgEl.clientHeight - clipEl.clientHeight)
      imgEl.style.top = PositionY + 'px'
      imgEl.style.left = PositionX + 'px'
    },
    // 获取图片大小
    getImg(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (theFile) {
          const image = new Image()
          image.src = theFile.target.result
          image.onload = function () {
            resolve({
              base64: this.src,
              width: this.width,
              height: this.height
            })
          }
        }
      })
    },
    // 鼠标按下
    onDown(e) {
      this.isDown = true

      const coverImgEl = this.$refs.coverImgRef
      const clipEl = this.$refs.clipRef
      // 获取鼠标位置
      this.downX = e.pageX - clipEl.offsetLeft
      this.downY = e.pageY - clipEl.offsetTop
      // 获取最大移动距离
      this.maxY = coverImgEl.clientHeight - clipEl.clientHeight
      this.maxX = coverImgEl.clientWidth - clipEl.clientWidth
      // 禁用鼠标选中文字
      document.documentElement.style = `
      -moz-user-select: none;
      -khtml-user-select: none;
      user-select: none;
      `
    },
    // 鼠标松开
    onUp() {
      this.isDown = false
      // 启用鼠标选中文字
      document.documentElement.style = `
      -moz-user-select: select;
      -khtml-user-select: select;
      user-select: select;
      `
    },
    onMove(e) {
      if (this.isDown) {
        const clipEl = this.$refs.clipRef
        const largeBoxEl = this.$refs.largeBoxRef
        const largeImgEl = this.$refs.largeImgRef
        const miniBoxEl = this.$refs.miniBoxRef
        const miniImgEl = this.$refs.miniImgRef
        const coverImgEl = this.$refs.coverImgRef
        // 要移动的距离
        let y = e.clientY - this.downY
        let x = e.clientX - this.downX
        if (y < 0) {
          y = 1
        } else if (y > this.maxY) {
          y = this.maxY
        }
        if (x < 0) {
          x = 1
        } else if (x > this.maxX) {
          x = this.maxX - 1
        }
        this.clipLeft = x
        this.clipTop = y
        this.clipRight = x + clipEl.offsetWidth
        this.clipBottom = y + clipEl.offsetHeight
        clipEl.style.top = y + 'px'
        clipEl.style.left = x + 'px'

        // 更新示例位置
        this.$nextTick(() => {
          this.apdateExamplesPosition(
            largeBoxEl,
            largeImgEl,
            coverImgEl,
            clipEl,
            clipEl.offsetLeft,
            clipEl.offsetTop
          )
          this.apdateExamplesPosition(
            miniBoxEl,
            miniImgEl,
            coverImgEl,
            clipEl,
            clipEl.offsetLeft,
            clipEl.offsetTop
          )
        })
      }
    },
    // 更新clip
    update(newSize) {
      const coverImgEl = this.$refs.coverImgRef
      const clipEL = this.$refs.clipRef
      // 处理宽高
      if (newSize.width > newSize.height) {
        if (newSize.height < 180) {
          clipEL.style.width = newSize.height + 'px'
          clipEL.style.height = newSize.height + 'px'
        } else {
          clipEL.style.width = 180 + 'px'
          clipEL.style.height = 180 + 'px'
        }
      } else {
        if (newSize.height < 180) {
          clipEL.style.width = newSize.width + 'px'
          clipEL.style.height = newSize.width + 'px'
        } else {
          clipEL.style.width = 180 + 'px'
          clipEL.style.height = 180 + 'px'
        }
      }
      // 处理clip和rect位置
      this.$nextTick(() => {
        clipEL.style.top =
          coverImgEl.offsetHeight / 2 - clipEL.offsetHeight / 2 + 'px'
        clipEL.style.left =
          coverImgEl.offsetWidth / 2 - clipEL.offsetWidth / 2 + 'px'
        this.clipLeft = clipEL.offsetLeft
        this.clipTop = clipEL.offsetTop
        this.clipRight = clipEL.offsetWidth + clipEL.offsetLeft
        this.clipBottom = clipEL.offsetHeight + clipEL.offsetTop
      })
    },
    // 按下clip时
    onClipDown(e) {
      this.isClipDown = true
      // 获取鼠标位置
      this.downX = e.pageX
      this.downY = e.pageY
      // 获取clip宽高
      const clipEl = this.$refs.clipRef
      this.clipWidth = clipEl.clientWidth
      this.clipHeight = clipEl.clientHeight
      // 禁用鼠标选中文字
      document.documentElement.style = `
      -moz-user-select: none;
      -khtml-user-select: none;
      user-select: none;
      `
    },
    // 松开clip时
    onClipUp() {
      this.isClipDown = false
      // 启用鼠标选中文字
      document.documentElement.style = `
      -moz-user-select: select;
      -khtml-user-select: select;
      user-select: select;
      `
    },
    // 移动clip时
    onClipMove(e) {
      if (this.isClipDown) {
        const coverImgEl = this.$refs.coverImgRef
        const clipEl = this.$refs.clipRef
        const largeBoxEl = this.$refs.largeBoxRef
        const largeImgEl = this.$refs.largeImgRef
        const miniBoxEl = this.$refs.miniBoxRef
        const miniImgEl = this.$refs.miniImgRef
        const y = e.pageY - this.downY
        let size = this.clipHeight + y
        // 放大范围限制
        if (clipEl.offsetTop + size > coverImgEl.offsetHeight) {
          size = coverImgEl.offsetHeight - clipEl.offsetTop
        } else if (size < 12) {
          size = 12
        }
        clipEl.style.width = size + 'px'
        clipEl.style.height = size + 'px'
        // 更新rect值
        this.clipLeft = clipEl.offsetLeft
        this.clipTop = clipEl.offsetTop
        this.clipRight = clipEl.offsetWidth + clipEl.offsetLeft
        this.clipBottom = clipEl.offsetHeight + clipEl.offsetTop
        // 更新示例cover大小
        this.updateExamplesSize(largeBoxEl, largeImgEl)
        this.updateExamplesSize(miniBoxEl, miniImgEl)
      }
    },
    // 更新图片
    async upload() {
      if (!this.imgSrc) return
      // 将更新的图片转为file格式
      this.editImgSize(
        this.$refs.fileRef.files[0],
        this.newSize.height,
        this.newSize.width
      )
      const file = await this.promise
      // 创建formdata对象
      this.formData = new FormData()
      this.formData.append('imgFile', file)
      const { data: result } = await updateCoverAPI(
        this.id,
        this.newSize.width,
        0,
        0,
        this.formData
      )
      this.formData = null
      if (result.code !== 200) return this.$message.error(result.message)
      this.$message.success('保存成功')
      this.$store.dispatch('my/getMySinger')
      this.$store.dispatch('collection/getUserPlayList', this.userId)
      this.$store.dispatch('toplist/getSongsDetails', {
        id: this.id,
        ist: true
      })
      this.cancel()
    },
    cancel() {
      this.$router.push(this.path)
    }
  },
  computed: {
    ...mapState('toplist', {
      songsDetails: 'songsDetails'
    }),
    ...mapState('user', {
      userId: 'userId'
    }),
    // 原头像
    primarySrc() {
      return this.songsDetails.coverImgUrl
    }
  }
}
</script>
<style lang="less" scoped>
.cover__container {
  .cover__head {
    padding: 26px 0 30px 0;
    .file {
      position: relative;
      display: inline-block;
      overflow: hidden;
      height: 31px;
      padding-right: 5px;
      background: url('../../assets/uploads/button2.png') no-repeat right -100px;
      line-height: 31px;
      text-align: center;
      vertical-align: middle;
      i {
        display: inline-block;
        width: 55px;
        height: 31px;
        background: url('../../assets/uploads/button2.png') no-repeat 0 -59px;
        padding: 0 15px 0 20px;
      }
      input {
        position: absolute;
        top: 3px;
        left: -70px;
        height: 31px;
        cursor: pointer;
        opacity: 0;
      }
    }
    .file {
      background-position: right -182px;
      i {
        background-position: 0 -141px;
      }
    }
    span {
      margin: 7px 0 0 10px;
      color: #999;
    }
  }
  .cover__body {
    .cover__left {
      position: relative;
      float: left;
      width: 322px;
      height: 322px;
      border: 1px solid #d1d1d1;
      margin-right: 40px;
      .default__cover {
        width: 100%;
        height: 100%;
      }
      .cover__img {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          vertical-align: middle;
        }
        img:nth-child(1) {
          opacity: 0.5;
        }
        .clip {
          position: absolute;
          z-index: 10;
          top: 0;
          left: 0;
          border: 1px solid #fff;
          cursor: move;
          box-sizing: border-box;
          i {
            position: absolute;
            width: 6px;
            height: 6px;
            right: -1px;
            bottom: -1px;
            border: 1px solid #fff;
            cursor: nw-resize;
            background: #000;
            opacity: 0.8;
            overflow: hidden;
          }
        }
      }
    }
    .cover__right {
      float: left;
      padding-left: 40px;
      border-left: 1px solid #e2e2e2;
      .large__img {
        position: relative;
        width: 180px;
        height: 180px;
        overflow: hidden;
        margin: 20px 0 11px 0;
        border: 1px solid #ccc;
        img {
          position: absolute;
          width: 180px;
          height: 180px;
        }
      }
      .mini__img {
        position: relative;
        width: 40px;
        height: 40px;
        overflow: hidden;
        display: block;
        margin: 20px 0 11px 0;
        border: 1px solid #ccc;
        img {
          position: absolute;
          width: 40px;
          height: 40px;
        }
      }
      p {
        font-size: 12px;
      }
      span {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .cover__btn {
    margin-top: 40px;
    a {
      position: relative;
      display: inline-block;
      width: 80px;
      height: 31px;
      background: url('../../assets/uploads/button2.png') no-repeat;
      padding-right: 5px;
      i {
        position: absolute;
        top: 0;
        left: 0;
        width: 80px;
        height: 100%;
        background: url('../../assets/uploads/button2.png') no-repeat;
        font-style: normal;
        text-align: center;
        line-height: 31px;
        color: #fff;
      }
    }
    .leftBtn {
      background-position: right -428px;
      margin-right: 20px;
      i {
        background-position: 0 -387px;
      }
    }
    .leftBtn:hover {
      background-position: right -510px;
      i {
        background-position: 0 -469px;
      }
    }
    .disable {
      color: #bebebe;
      background-position: right -346px !important;
      cursor: default;
      i {
        color: #bebebe;
        background-position: 0 -305px !important;
      }
    }
    .cancel {
      background-position: right -100px;
      i {
        background-position: 0 -59px;
        color: #333;
      }
    }
    .cancel:hover {
      background-position: right -182px;
      i {
        background-position: 0 -141px;
      }
    }
  }
}
</style>
