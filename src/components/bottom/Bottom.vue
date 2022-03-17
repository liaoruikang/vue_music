<template>
  <div class="buttom__container">
    <div class="buttom__box w">
      <div class="left">
        <div class="link">
          <a
            target="_blank"
            href="https://st.music.163.com/official-terms/service"
            >服务条款</a
          >
          <i>|</i>
          <a
            target="_blank"
            href="https://st.music.163.com/official-terms/privacy"
            >隐私政策</a
          ><i>|</i>
          <a
            target="_blank"
            href="https://st.music.163.com/official-terms/children"
            >儿童隐私政策</a
          ><i>|</i>
          <a
            target="_blank"
            href="https://music.163.com/st/staticdeal/complaints.html"
            >版权投诉指引</a
          ><i>|</i>
          <a
            target="_blank"
            href="https://mp.music.163.com/600948c936c13f4d09752e73/contact-us-web/index.html?source=Music-Main-Station"
            >联系我们</a
          ><i>|</i>
          <a target="_blank" href="https://music.163.com/ui/resource"
            >广告合作</a
          >
          <p class="copyright">
            <span class="sep">网易公司版权所有©1997-2022</span>
            <span class="span">杭州乐读科技有限公司运营：</span>
            <a
              target="_blank"
              href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png"
              >浙网文[2021] 1186-054号
            </a>
          </p>
          <div class="keepOnRecord">
            <a
              target="_blank"
              href="https://beian.miit.gov.cn/#/Integrated/index"
              >粤B2-20090191-18 工业和信息化部备案管理系统网站</a
            >
            <span class="icon"></span>
            <a
              target="_blank"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564"
              >浙公网安备 33010902002564号</a
            >
          </div>
        </div>
      </div>
      <div class="right">
        <a target="_blank" href="https://web-amped.music.163.com/"></a>
        <a target="_blank" href="https://music.163.com/st/userbasic#/auth"></a>
        <a target="_blank" href="https://music.163.com/st/musician"></a>
        <a target="_blank" href="https://music.163.com/web/reward"></a>
        <a
          target="_blank"
          href="https://music.163.com/st/ncreator/revenue-plan"
        ></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'buttom'
}
</script>
<style lang="less" scoped>
.buttom__container {
  height: 172px;
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;
  display: block;
  .buttom__box {
    display: flex;
    height: 100%;
    .left {
      flex: 1;
      padding-top: 20px;
      line-height: 24px;

      i {
        margin: 0 8px 0 10px;
        color: #999;
      }
      a {
        color: #999;
      }
      a:hover {
        text-decoration: underline;
      }
      .copyright {
        color: #666;
        a {
          color: #666;
        }
      }
      .keepOnRecord {
        a {
          color: #666;
        }
        span {
          display: inline-block;
          width: 14px;
          height: 14px;
          background: url('../../assets/uploads/police.png') no-repeat;
          background-size: 100%;
          margin-bottom: -3px;
          margin-left: 5px;
        }
      }
    }
    .right {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        position: relative;
        width: 50px;
        height: 45px;
        background: url('../../assets/uploads/foot_enter_new.png') no-repeat;
        background-size: 110px 552px;
        margin: -30px 14px 0 14px;
      }
      a::before {
        content: '';
        position: absolute;
        bottom: -17px;
        left: 50%;
        transform: translateX(-50%);
        height: 14px;
        width: 100%;
        background: url('../../assets/uploads/foot_enter_tt.png') no-repeat;
        background-size: 180px 139px;
      }
      a:nth-child(1) {
        background-position: -63px -456.5px;
      }

      a:nth-child(2) {
        background-position: -63px -101px;
      }
      a:nth-child(3) {
        background-position: 0 0;
      }
      a:nth-child(4) {
        background-position: -60px -50px;
      }
      a:nth-child(5) {
        background-position: 0 -101px;
      }
      a:nth-child(1)::before {
        width: 72px;
        background-position: 0 -108px;
      }
      a:nth-child(2)::before {
        width: 52px;
        background-position: -1px -91px;
      }
      a:nth-child(3)::before {
        width: 52px;
        background-position: 0 0;
      }
      a:nth-child(4)::before {
        width: 52px;
        background-position: 0 -54px;
      }
      a:nth-child(5)::before {
        width: 52px;
        background-position: -1px -72px;
      }
    }
  }
}
</style>
