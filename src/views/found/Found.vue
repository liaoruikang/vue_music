<template>
  <div class="found__container w">
    <div class="found__box">
      <div class="found__img"></div>
      <p>很抱歉，你要查找的网页找不到</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'found'
}
</script>
<style lang="less" scoped>
.found__container {
  position: relative;
  height: 650px;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .found__box {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .found__img {
      width: 270px;
      height: 112px;
      background: url('../../assets/uploads/logo.png') no-repeat 0 -405px;
    }
    p {
      margin-top: 35px;
      font-size: 18px;
      font-family: 'Microsoft Yahei';
      color: #666;
    }
  }
}
</style>
