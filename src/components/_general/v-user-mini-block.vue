<template>
  <div class="d-flex a-items-center g-gap-_5 p-relative w-max-content" v-if="user">
    <div class="p-relative">
        <a :href="`/profile?id=${user.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-50 d-flex j-content-center a-items-center">
            <!--            <img src="@/assets/images/user-unknown-1.png" alt="" v-if="!forum.creator.image">-->
            <span v-if="!this.user.image">{{user.first_name[0]}}</span>
            <img :src="`${web_api}/image?filename=${this.user.image.filename}`" v-else/>

        </a>
        <v-online-indicator :user_id="this.user.id" :dot="true" class="c-content p-absolute right-0 w-max-content animation-from-hidden-infinite"/>
    </div>

    <div class="d-grid info_block j-content-flex-end f-size-small">
      <span>{{ user.first_name }} {{ user.last_name }}</span>
      <span class="f-size-very-small">{{user.name}} </span>
    </div>
  </div>
</template>

<script>
import imageMixin from "@/mixins/image-mixin";
import VOnlineIndicator from "@/components/user/v-online-indicator.vue";

export default {
  name: "v-user-mini-block",
  components: {VOnlineIndicator},
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