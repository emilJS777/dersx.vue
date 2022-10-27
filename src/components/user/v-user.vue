<template>
  <div class="user bg-fff padding-1 m-0-auto" v-if="user">
    <div class="img_parent" @click="this.$router.push(`/profile?id=${user.id}`)">
      <div class="w-max p-relative o-hidden img_div w-max h-max d-block-hover c-pointer">
        <img src="@/assets/images/user-unknown-1.png" class="p-absolute absolute-center" alt="" v-if="!user.image">
        <img :src="'data:image/'+user.image.filename+';charset=utf-8;base64, ' + user.image.b64" class="p-absolute absolute-center" alt="" v-else>
      </div>
    </div>
    <p class="f-size-small m-bottom-0">{{ user.name }}</p>
    <span class="f-size-small">{{user.first_name}} {{user.last_name}}</span>
    <p v-if="user.gender" class="m-0-auto f-size-small">{{user.gender.title}}</p>

    <div class="btn_block d-flex j-content-space-evenly m-top-1" v-if="profile">
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-person-plus c-pointer padding-05 c-content-hover" viewBox="0 0 16 16">
        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-envelope c-pointer c-content-hover padding-05" viewBox="0 0 16 16">
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
      </svg>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "v-user",
  props: ['user'],
  computed: mapState({
    profile: state => state.auth.profile
  })
}
</script>

<style scoped>
.user{
  margin-top: -1em;
}
.img_parent{
  width: 150px;
  height: 150px;
}
.img_div > img{
  min-height: 100%;
  max-height: 100%;
}
.btn_block svg{

}
</style>