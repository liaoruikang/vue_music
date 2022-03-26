<template>
  <div class="download__container">
    <!-- 二维码 -->
    <div class="mobile">
      <img
        src="https://p1.music.126.net/wCRnpjXHpGRiq1c1uCkIFQ==/109951164246717547.png"
      />
      <p>扫描二维码下载</p>
    </div>
    <div class="wrapper">
      <p class="otherP" @click="other = !other" @mouseup.stop>
        其他操作系统客户端
      </p>
      <!-- 其他操作系统客户端 -->
      <div class="other" v-show="other" @mouseup.stop>
        <a
          href="https://d1.music.126.net/dmusic/NeteaseCloudMusic_Music_official_8.7.11.220318190241_32.apk"
          target="_blank"
          ><i></i>Android</a
        >
        <a href="https://apps.apple.com/cn/app/id590338362" target="_blank"
          ><i></i>iPhone</a
        >
        <a
          href="https://apps.apple.com/cn/app/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90hd/id871041757"
          target="_blank"
          ><i></i>iPad</a
        >
        <a
          href="https://d1.music.126.net/dmusic/NeteaseMusic_2.3.8.872_web.dmg"
          target="_blank"
          ><i></i>Mac</a
        >
        <a
          href="https://d1.music.126.net/dmusic/cloudmusicsetup2.9.8.199759.exe"
          target="_blank"
          ><i></i>PC</a
        >
        <a
          href="https://www.microsoft.com/zh-cn/p/%e7%bd%91%e6%98%93%e4%ba%91%e9%9f%b3%e4%b9%90uwp/9nblggh6g0jf?rtc=1&activetab=pivot:overviewtab"
          target="_blank"
          ><i></i>UWP</a
        >
        <a
          href="https://d1.music.126.net/dmusic/NeteaseCloudMusic_Music_official_8.6.76.220225103952_32.apk"
          target="_blank"
          ><i></i>Android 5.x</a
        >
        <a
          href="javascript:;"
          @click="
            $store.commit('setCFDVisible', {
              display: true,
              component: 'Linux'
            })
          "
          ><i></i>Linux</a
        >
      </div>
      <div class="wrapper__box clearfix">
        <div class="wrapper__left">
          <h3>在电脑上听</h3>
          <el-image
            src="https://p1.music.126.net/PGNd0EAtUgA7iRCWXPnUuA==/109951164207162781.png?param=800x0"
          />
          <div class="icon">
            <i></i>
            <i></i>
          </div>
          <a
            href="https://d1.music.126.net/dmusic/cloudmusicsetup2.9.8.199759.exe"
            class="btn"
            >下载客户端</a
          >
        </div>
        <div class="wrapper__right">
          <h3>在手机上听</h3>
          <el-image
            src="https://p1.music.126.net/sLtya87wVHWn-HWJ33oN4g==/109951164207180884.png?param=450x0"
          />
          <div class="icon">
            <i></i>
            <i></i>
          </div>
          <a
            href="javascript:;"
            class="btn"
            @click="mobileDownload = !mobileDownload"
            @mouseup.stop
            ><i></i>下载手机端</a
          >
          <div class="mobileDownload" v-show="mobileDownload" @mouseup.stop>
            <img
              src="https://p1.music.126.net/wCRnpjXHpGRiq1c1uCkIFQ==/109951164246717547.png"
            />
            <p>扫描二维码下载</p>
          </div>
        </div>
      </div>
    </div>
    <div class="floor">
      <div class="floor__c">
        <div class="box w clearfix">
          <div class="floor__title">
            <h2>千万曲库 首首CD音质</h2>
            <p>
              囊括百万无损SQ音乐，你在用手机听歌时，
              <br />
              也能感受到纤毫毕现的CD音质，更能免费离线收听
            </p>
          </div>
          <div class="floor__img">
            <img
              src="https://p1.music.126.net/KP4aN9umGMNnCS8iCgiV9w==/109951164206415504.jpg"
            />
          </div>
        </div>
      </div>
      <div class="floor__c">
        <div class="box w clearfix">
          <div class="floor__title">
            <h2>千位明星 亲自推荐音乐</h2>
            <p>
              韩红，戴佩妮等<em class="red">千位明星已入驻</em
              >，亲自创建私房歌单，录制独
              <br />
              家DJ节目，推荐他们心中的好音乐
            </p>
          </div>
          <div class="floor__img">
            <img
              src="https://p1.music.126.net/rpwYXqZt_UpO_de46JyYwQ==/109951164488922626.jpg"
            />
          </div>
        </div>
      </div>
      <div class="floor__c">
        <div class="box w clearfix">
          <div class="floor__title">
            <h2>社交关系 发现全新音乐</h2>
            <p>
              你可以<em class="red">关注明星</em
              >、DJ和好友，通过浏览他们的动态、收藏和
              <br />
              分享，发现更多全新好音乐
            </p>
          </div>
          <div class="floor__img">
            <img
              src="https://p1.music.126.net/9CQFSDAZN7TcOWz7UNEqmQ==/109951164488924083.jpg"
            />
          </div>
        </div>
      </div>
      <div class="floor__c">
        <div class="box w clearfix">
          <div class="floor__title">
            <h2>手机电脑 歌单实时同步</h2>
            <p>
              只要一个帐号，你就可以同步在手机、电脑上创建、收藏<br />
              的歌单，<em class="red">随时随地畅享好音乐</em>
            </p>
          </div>
          <div class="floor__img">
            <img
              src="https://p1.music.126.net/IZIgZjpBv9WkyMZ53i043w==/109951164206417003.jpg"
            />
          </div>
        </div>
      </div>
      <div class="floor__c">
        <div class="box w clearfix">
          <div class="floor__title">
            <h2>听歌识曲 助你疯狂猜歌</h2>
            <p>
              歌曲很动听却不知道歌名，歌名在嘴边却想不起来……
              <br />
              用<em class="red">听歌识曲</em>功能，几秒钟就知道歌名
            </p>
          </div>
          <div class="floor__img">
            <img
              src="https://p1.music.126.net/MGGp3L7AerIVlskMkAk1HA==/109951164488904737.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'download',
  data() {
    return {
      mobileDownload: false,
      other: false
    }
  },
  created() {
    window.addEventListener('mouseup', () => {
      this.mobileDownload = false
      this.other = false
    })
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.download__container {
  min-height: 700px;
  .mobile {
    position: fixed;
    z-index: 10;
    top: 435px;
    right: 35px;
    padding: 16px 18px 9px;
    background: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px;
    color: #333;
    font-size: 12px;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
    }
    p {
      margin-top: 7px;
      color: #333333;
    }
  }
  .wrapper {
    position: relative;
    width: 100%;
    background: url('../../assets/uploads/LwY0PYMc2NVWwbIzvGFKcA==_109951164205104153.png')
      no-repeat;
    background-color: #222;
    background-size: cover;
    font-family: PingFangSC-Regular;
    .otherP {
      position: absolute;
      line-height: 60px;
      height: 60px;
      top: 0;
      right: 80px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
    }
    .otherP::before {
      content: '';
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 6px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA5RJREFUWAnNmbtvE0EQh23zCFLsIoWlVEgIQXhTEMlVqECKAkkU/lEggSgFFalSpOARwAUFnaUUIJwUPM3v2+xd7s57593zBWek0e7tzsx+OxffPlKvlZTBYDAj1znprLQpbdlSRe1A2rdlT2W3Xq9/VRks9RAPQQFyTwpYO8RXtvvSrnRXsEzAS7wABTalaB2r570i5xv9VNcOKtAf+WZHPSMBBXdNpovS6VHBAvsPZb8lyE9FfrmAAqNvwWpRjHH7thVgW6ADVyAnoODOyXhZet3ldAJtHxVzQ5C/srHPZhts5lbUzqsNkc8y3rQOSyovBzibRGjsp9lMNhxBeK2hcITZVPDvKHUaAgVIxk5JClAzAGzIKOWR82DBTG+ynmOe17xgGeL+GFAdfEr4tU5aFi2L4YgB9cR3rupPSZnJwgCLEQMoYlaIuNH2TbLoWKZalMF50Yy7QlQ5IVhYUmPAq1VGrygW632toVSyKwld+CtiKAzTho1XbEgLTSfXOQcg+7nTKrMA8gs+rdJkLWYnXCRf1PlC+lv6UHpDOo7syfmVlLHZkFyU5knLJ4Ps2b5J2QU/l77Li+bR/oYYxCKm6lsjfJoAeouC/pUx2Xzv7XRs+FZVNhTOfd+xWboGIJkpkgf6uZ+JDCzkhp55Vb7ChF5aX+OjmLxi/mSK5ADAfpGF+tjXrTkg19X+YYQv3UyEzSjZN2JjPdHDJduUV/R9Mogz30oXJH+T7IbzhAmsO+DW1H4lzynRbjLYSzQUVYFcdWQSSNfBB3B+ENnMAee7OPTIIGdVX2HXuyJI/IwI4I8qz+xjsnDBrcrAF45Y3YYG4MTPodpX+A66IFP+Fty02Qlxzgk5hO3DFmUiJIsMelOagqTRJQm40A+8YYoAdxWcE3+IALmcfN1ZZ9vHaoFtiMAC09F+UKnkW7hDQ6Dckv0jF6Rte6x+bEKFaxHzfY4ySAAAD0Mjyf6OdElA8SWArXM2vl0iHgxxsmJAEXORM2ptzBvvrjr4BF1AqUtpKyOs/bAYiWcdNWiA+6qXOhtHMcYouaN5nfSPM5ho5DKnaHVImFZaZUzGTskQoGbAboPNwP+EZCzW66GdztArjvDtHzqv+qRfN1kLu36LICkFyn0NVyLTPFco/FrLX2AmQQQ5peeO1XEP+NVeAWdAOWDNSznot5N9HvV92bB8VX+J7hpcWZ1ROzsTjq2At2yporp/Q/wDYZIaqIRbHggAAAAASUVORK5CYII=)
        no-repeat;
      background-size: contain;
      vertical-align: middle;
    }
    .otherP:hover {
      opacity: 0.7;
    }
    .other {
      position: absolute;
      z-index: 99;
      top: 70px;
      right: 80px;
      padding-top: 20px;
      padding-left: 10px;
      width: 276px;
      height: 250px;
      background-color: #fff;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      border-radius: 12px;
      box-sizing: border-box;
      a {
        float: left;
        display: block;
        width: 113px;
        height: 45px px;
        margin-bottom: 10px;
        margin-left: 10px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #333333;
        line-height: 45px;
        background: rgba(0, 0, 0, 0.08);
        i {
          display: inline-block;
          width: 26px;
          height: 26px;
          margin-left: 10px;
          margin-right: 5px;
          background: url('../../assets/uploads/56564564.png') no-repeat;
          background-size: contain;
          vertical-align: middle;
        }
      }
    }
    .other::before {
      content: '';
      position: absolute;
      top: -20px;
      right: 40px;
      border-color: transparent transparent #fff transparent;
      border-style: solid;
      border-width: 10px 10px 10px;
    }
    .wrapper__box {
      width: 1100px;
      padding: 112px 0;
      margin: 0 auto;
      .wrapper__left,
      .wrapper__right {
        float: left;
        width: 556px;
        text-align: center;
        h3 {
          margin-bottom: 33px;
          width: 100%;
          font-size: 22px;
          opacity: 0.8;
          color: #ffffff;
          font-weight: normal;
        }
        .icon {
          width: 100%;
          margin: 26px auto;
          font-size: 16px;
          color: #eee;
          text-align: center;
          i {
            display: inline-block;
            width: 154px;
            height: 44px;
            background: url('https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/icon_mac_black_new.bbaa33f484108e702bc365c250b74e79.png')
              no-repeat;
            background-size: contain;
          }
          i:nth-child(2) {
            margin-left: 40px;
            width: 140px;
            height: 44px;
            background: url('https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/windows.3e335fd6d5078918ef80f7e54d0bd4b8.png')
              no-repeat;
            background-size: contain;
          }
        }
        .btn {
          display: block;
          width: 300px;
          height: 65px;
          margin: 0 auto;
          border-radius: 65px;
          background-color: #fff;
          color: #d10000;
          font-size: 22px;
          line-height: 65px;
          text-align: center;
          cursor: pointer;
          box-sizing: content-box;
        }
        .btn:hover {
          opacity: 0.7;
        }
      }
      .wrapper__right {
        position: relative;
        margin-left: 220px;
        width: 300px;
        .icon {
          i {
            width: 120px;
            height: 44px;
            background-image: url('https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/icon_iphone_black_new.3c51a3730124d2d8d662aa4393572914.png');
          }
          i:nth-child(2) {
            background-image: url('https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/android.f73995b4ecd8636ecb3819906598ec13.png');
          }
        }
        .btn {
          i {
            display: inline-block;
            width: 21px;
            height: 21px;
            margin-right: 3px;
            background: url('https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/icon_ncode.28be3ef7e9730069682ff0d0ca17e942.png')
              no-repeat;
            background-size: contain;
            vertical-align: -3px;
          }
        }
        .mobileDownload {
          position: absolute;
          bottom: 90px;
          left: 50%;
          transform: translateX(-50%);
          width: 204px;
          height: 224px;
          color: #333333;
          min-height: 34px;
          background: #fff;
          border-radius: 12px;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          img {
            margin-top: 20px;
            width: 164px;
            height: 164px;
          }
          p {
            margin-top: 7px;
            font-size: 14px;
            color: #333333;
            text-align: center;
          }
        }
        .mobileDownload::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -10px;
          border-top-color: #fff;
          border-right-color: transparent;
          border-left-color: transparent;
          border-style: solid;
          border-top-width: 10px;
          border-width: 10px 10px 0;
        }
      }
    }
  }
  .floor {
    .floor__c {
      background: #fff;
      height: 437px;
      border-bottom: 1px solid #e3e3e3;
      .box {
        padding-top: 65px;
        padding-bottom: 20px;
        .floor__title {
          h2 {
            font-size: 40px;
            font-weight: normal;
            padding: 45px 0 5px 0;
          }
          p {
            font-size: 16px;
            color: #666;
            line-height: 24px;
          }
        }
      }
    }
    .floor__c:nth-child(even) {
      background: #f8f8f8;
      .floor__title {
        float: left;
      }
      .floor__img {
        float: right;
      }
    }
    .floor__c:nth-child(odd) {
      .floor__title {
        float: right;
      }
      .floor__img {
        float: left;
      }
    }
    .red {
      color: #cc0000;
    }
  }
}
</style>
