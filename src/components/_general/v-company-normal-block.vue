<template>
  <div class="d-grid company_block a-items-flex-start g-gap-1 p-relative w-max" v-if="company">
    <a :href="`/company?id=${company.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-8 d-flex j-content-center a-items-center">
      <span v-if="!this.company.image" class="c-ccc">
          <i class="fa fa-building fa-3x"></i>
      </span>
      <img :src="`${web_api}/image?filename=${this.company.image.filename}`" v-else/>
    </a>
    <div class="d-grid info_block g-gap-_3">
      <h3 class="m-bottom-0 m-top-0">{{ company.title }}</h3>
      <span class="f-size-small">{{company.user_count}} участника</span>
      <span class="f-size-small">{{company.short_description}}</span>
    </div>
  </div>
</template>

<script>
import imageMixin from "@/mixins/image-mixin";

export default {
  name: "v-company-normal-block",
  props: ["company"],
  mixins: [imageMixin],
  data(){
    return{
      web_api: process.env.WEB_API
    }
  }
}
</script>

<style scoped>
.company_block{
  grid-template-columns: 1fr 8fr;
}
.img_block{
  border: 1px solid #ccc;
  height: 100px;
  width: 100px;
}
img{
  width: 120%;
  height: auto;
}
</style>