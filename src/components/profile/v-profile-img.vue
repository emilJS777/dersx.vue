<template>
  <div class="img_parent" v-if="user">
    <div class="w-max p-relative o-hidden img_div w-max h-max d-block-hover">
      <img src="@/assets/images/user-unknown-1.png" class="p-absolute absolute-center" alt="" v-if="!user.image">
      <img :src="`${web_api}/image?filename=${user.image.filename}`" class="p-absolute absolute-center" alt="" v-else>

      <v-input-file-normal sublabel="поменять фото"
                           class="bg-content p-absolute w-max t-center d-flex a-items-center j-content-center padding-02 bott-0 d-none animation-from-hidden"
                           :allowedTypes="['image/jpg', 'image/jpeg', 'image/png']"
                           @file_form="file =>{new_image = file; setModalName('imageUploadAlertModal')}"
                           v-if="profile && profile.id === parseInt(this.$route.query.id)"/>

      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash p-absolute top-0 right-0 padding-03 d-none c-pointer c-content bg-fff animation-from-hidden" viewBox="0 0 16 16"
           @click="setModalName('imageDeleteAlertModal')" v-if="profile && profile.image && profile.id === parseInt(this.$route.query.id)">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>
    </div>
  </div>

  <!--  USER MENU-->
  <v-user-menu-block v-if="profile && user.id !== profile.id" :user="user"/>

  <div class="info d-grid g-gap-1" v-if="user">
    <div class="t-center">
      <h4 class="t-center">персональные данные</h4>
      <i class="t-center">{{user.name}}</i>
    </div>
    <p class="d-flex g-gap-1 a-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
      </svg>
      <span>{{ user.first_name }} {{ user.last_name }}</span>
    </p>

    <p class="d-flex g-gap-1 a-items-center">
      <i class="fa fa-map-marker" aria-hidden="true"></i>
      <span>{{ user.region }}</span>
    </p>

    <p class="d-flex g-gap-1 a-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
      </svg>
      <span class="d-grid">
        {{ user.email_address }}
       <i class="f-size-small err-msg">не подтверждено</i>
      </span>

    </p>

    <p class="d-flex g-gap-1 a-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gender-ambiguous" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1H11.5zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z"/>
      </svg>
      <span class="d-grid">
        <span v-if="user.gender">{{user.gender.title}}</span>
        <span v-else>не указано</span>
      </span>
    </p>

    <p class="d-flex g-gap-1 a-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
      </svg>
      <span>На сайте с {{ user.creation_date }}</span>
    </p>




<!--    ALERT MODALS-->
    <v-alert-modal :label="`вы хотите поменять фото профиля на ${new_image.name} ?`"
                   v-if="modalName === 'imageUploadAlertModal'"
                   @close="setModalName(false)"
                   @confirm="upload_image"/>

    <v-alert-modal :label="`вы дествительно хотите удалить фото профиля ?`"
                   v-if="modalName === 'imageDeleteAlertModal'"
                   @close="setModalName(false)"
                   @confirm="delete_image"/>
  </div>
</template>

<script>

import VInputFileNormal from "@/components/_general/v-input-file-normal";
import toggleMixin from "@/mixins/toggle-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
import imageGetMixin from "@/mixins/image-get-mixin";
import {mapState} from "vuex";
import VUserMenuBlock from "@/components/profile/v-user-menu-block";
export default {
  name: "v-profile-img",
  components: {VUserMenuBlock, VAlertModal, VInputFileNormal},
  mixins: [toggleMixin, imageGetMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      user: {},
      new_image: null,
      web_api: process.env.WEB_API
    }
  },
  mounted(){
    // USER GET
    this.emitter.emit('load', true)
    this.$store.dispatch("user/GET", `?id=${this.$route.query.id}`).then(data => {
      this.user = data.obj
    }).finally(() => this.emitter.emit('load', false))
  },
  methods: {
    async upload_image(){
      this.emitter.emit('load', true)
      if(this.new_image){
        if(this.user.image){
          // DELETE USER IMAGE
          const data = await this.$store.dispatch("image/DELETE", this.user.image.filename)
          if(!data.success)
            this.emitter.emit('message', data)
        }
        // CREATE IMAGE
        const data = await this.$store.dispatch("image/CREATE", {query: `?user_id=${this.user.id}`, form: this.new_image})
        this.emitter.emit('message', data)
        this.emitter.emit('load', false)
      }
    },
    async delete_image(){
      this.emitter.emit('load', true)
      this.$store.dispatch("image/DELETE", this.user.image.filename).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  },
}
</script>

<style scoped>
.img_parent{
  height: 200px;
  width: 200px;
  margin: -40px 15px auto;
}
.img_div p{
  bottom: -6px;
  line-height: 2;
}
.img_div:hover p{
  display: block;
}
.img_div > img{
  min-height: 100%;
  max-height: 100%;
}

h4{
  margin-bottom: 5px;
}
p{
  margin-bottom: 3px;
}
p svg{
  color: #424242;
}
</style>