<template>
  <img src="../../assets/images/dersx_logo.png" :style="`${mobile ? 'width: 80px !important' : ''}`" alt="">
</template>

<script>
import deviceMixin from "@/mixins/device-mixin";

export default {
  name: "v-logo",
  mixins: [deviceMixin]
}
</script>

<style scoped>
h1{
  font-size: 38px;
  margin: 0;
}
span{
  font-style: italic;
  font-size: 30px;
}
p{
    font-size: 28px;
}
img{
  width: 120px !important;
  height: auto !important;
}
b{
    font-size: 25px;
}
</style>