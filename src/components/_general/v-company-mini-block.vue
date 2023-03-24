<template>
  <div class="d-flex a-items-center g-gap-_5 p-relative w-max-content" v-if="company">
    <a :href="`/company?id=${company.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-50 d-flex j-content-center a-items-center">
      <span v-if="!this.company.image" class="c-ccc">
          <i class="fa fa-building"></i>
        </span>
      <img :src="`${web_api}/image?filename=${this.company.image.filename}`" v-else/>
    </a>
    <div class="d-grid info_block j-content-flex-end f-size-small">
      <b>{{ company.title }}</b>
      <span class="f-size-very-small">{{company.short_description}}</span>
      <span class="f-size-very-small">{{company.user_count}} участника</span>
    </div>
  </div>
</template>

<script>
import imageMixin from "@/mixins/image-mixin";

export default {
  name: "v-company-mini-block",
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
.img_block{
  border: 1px solid #ccc;
  height: 40px;
  width: 40px;
}
img{
  width: 120%;
  height: auto;
}
</style>