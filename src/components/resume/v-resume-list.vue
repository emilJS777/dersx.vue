<template>
  <div class="resume bg-fff d-grid g-gap-1  box-shadow-slim padding-1 ">
    <div class="img_parent p-relative">
      <div class="w-max p-relative o-hidden img_div w-max h-max d-block-hover c-pointer">
        <img src="@/assets/images/user-unknown-1.png" class="p-absolute absolute-center" alt="">
<!--        <img :src="`${web_api}/image?filename=1February:21:2023:17:50:0826993278_167997990491003_9088908709772641957_n.jpg`" class="p-absolute absolute-center" alt="" v-else>-->
      </div>
      <a class="route p-absolute left-0 top-0 w-max h-max" :href="`/profile?id=`"></a>
    </div>

    <div class="d-grid g-gap-_5">
      <div class="f-weight-bold">
        <h5 class="m-top-0 m-bottom-0">Email Hmabardzumyan</h5>
      </div>
      <div class="d-flex g-gap-_5 a-items-center">
        <span class="m-top-0 m-bottom-0 f-weight-bold">рубрикa</span>
        <span class="f-size-small">выберите категории</span>
      </div>
      <div class="d-flex g-gap-_5 a-items-center">
        <span class="m-top-0 m-bottom-0 f-weight-bold">категории</span>
        <span class="f-size-small">выберите категории</span>
      </div>

      <div class="d-flex a-items-center j-content-flex-end g-gap-1">
        <v-button-normal icon="fa fa-download" label="скачать файл" class="f-size-very-small"/>
        <v-button-normal icon="fa fa-eye" label="подробнее" class="f-size-very-small"/>
      </div>
    </div>

    <!--    <div class="btn_block d-flex j-content-space-evenly m-top-1" v-if="profile">-->
    <!--      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-person-plus c-pointer padding-05 c-content-hover" viewBox="0 0 16 16">-->
    <!--        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>-->
    <!--        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>-->
    <!--      </svg>-->
    <!--      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-envelope c-pointer c-content-hover padding-05" viewBox="0 0 16 16">-->
    <!--        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>-->
    <!--      </svg>-->
    <!--    </div>-->
  </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal.vue";

export default {
  name: "v-resume-list",
  components: {VButtonNormal}
}
</script>

<style scoped>
.resume{
  grid-template-columns: 1fr 8fr;
}
.img_parent{
  width: 150px;
  height: 150px;
}
.img_div > img{
  min-height: 100%;
  max-height: 100%;
}
</style>