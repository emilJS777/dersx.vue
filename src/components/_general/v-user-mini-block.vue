<template>
  <div class="d-flex a-items-center g-gap-_5 p-relative w-max-content" v-if="user">
    <a :href="`/profile?id=${user.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-50 d-flex j-content-center a-items-center">
      <!--            <img src="@/assets/images/user-unknown-1.png" alt="" v-if="!forum.creator.image">-->
      <span v-if="!this.user.image">{{user.first_name[0]}}</span>
      <img :src="`${web_api}/image?filename=${this.user.image.filename}`" v-else/>

    </a>
    <div class="d-grid info_block j-content-flex-end f-size-small">
      <i>{{ user.first_name }} {{ user.last_name }}</i>
      <span class="f-size-very-small">{{user.name}}</span>
    </div>
  </div>
</template>

<script>
import imageMixin from "@/mixins/image-mixin";

export default {
  name: "v-user-mini-block",
  props: ["user"],
  mixins: [imageMixin],
  data(){
    return{
      web_api: process.env.WEB_API
    }
  },
  mounted() {
    // if(this.user.image) this.getImage(this.user.image.filename)
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