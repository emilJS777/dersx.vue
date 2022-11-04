<template>
  <div class="header d-grid g-gap-_3 a-items-center">
    <div class="logo">
      <h1>Skill<span class="c-content">X</span></h1>
      <i>freelance exchange</i>
    </div>

    <div class="nav d-flex">
      <ul class="d-flex j-content-space-between g-gap-2 a-items-center">
        <li>
          <router-link to="/" class="d-flex g-gap-_5 a-items-center c-6d c-content-hover">
            <i class="fa fa-home" aria-hidden="true"></i>
            <b>главная</b>
          </router-link>
        </li>

        <li>
          <router-link to="/services" class="d-flex g-gap-_5 a-items-center c-6d c-content-hover">
            <i class="fa fa-briefcase" aria-hidden="true"></i>
            <b>услуги</b>
          </router-link>
        </li>

        <li>
          <router-link to="/vacancies" class="d-flex g-gap-_5 a-items-center c-6d c-content-hover">
            <i class="fa fa-globe" aria-hidden="true"></i>
            <b>вакансии</b>
          </router-link>
        </li>

        <li>
          <router-link to="/users" class="d-flex g-gap-_5 a-items-center c-6d c-content-hover">
            <i class="fa fa-users" aria-hidden="true"></i>
            <b>пользователи</b>
          </router-link>
        </li>
        <li>
          <router-link to="/forums" class="d-flex g-gap-_5 a-items-center c-6d c-content-hover">
            <i class="fa fa-comment" aria-hidden="true"></i>
            <b>форумы</b>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="d-flex j-content-flex-end g-gap-2" v-if="profile !== null">

<!--      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bell c-pointer c-content-hover" viewBox="0 0 16 16">-->
<!--        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>-->
<!--      </svg>-->

<!--      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-envelope c-pointer c-content-hover" viewBox="0 0 16 16">-->
<!--        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>-->
<!--      </svg>-->

<!--      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-gear c-pointer c-content-hover" viewBox="0 0 16 16">-->
<!--        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>-->
<!--        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>-->
<!--      </svg>-->
    </div>

    <div v-if="profile" class="d-grid g-gap-1 p-relative">
      <div class="auth d-flex j-content-flex-end a-items-center g-gap-1 p-relative" >
        <div class="d-grid info_block j-content-flex-end">
          <b>{{ profile.first_name }} {{ profile.last_name }}</b>
          <i>{{profile.email_address}}</i>
          <span class="c-content f-size-very-small w-max-content c-pointer" @click="setModalName('logoutAlertModal')">выйти из аккаунта</span>
        </div>

        <router-link :to="`/profile?id=${this.profile.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-50 d-flex j-content-center a-items-center">
<!--          <img src="@/assets/images/user-unknown-1.png" alt="" v-if="!profile.image">-->
          <span v-if="!profile.image">{{profile.first_name[0]}}</span>
          <img :src="'data:image/'+profile.image.filename+';charset=utf-8;base64, ' + profile.image.b64" class="p-absolute absolute-center profile_image" v-else>
        </router-link>
      </div>
    </div>

    <div v-if="profile === null"></div>
    <div class="auth_block d-flex g-gap-1" v-if="profile === null">
      <v-button-normal label="логин" @click="setModalName('login')"/>
      <v-button-normal label="регистрация" class="bg-content" @click="setModalName('registration')"/>
    </div>
  </div>

<!--  AUTH MODAL-->
  <v-login-modal v-if="modalName === 'login'" @close="setModalName(false)"/>
  <v-registration v-if="modalName === 'registration'" @close="setModalName(false)"/>

<!--  CONFIRM MODAL-->
  <v-alert-modal v-if="modalName === 'logoutAlertModal'"
                 label="вы хотите выйти из аккаунта ?"
                 @close="setModalName(false)"
                 @confirm="logout"/>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import VLoginModal from "@/components/auth/v-login-modal";
import toggleMixin from "@/mixins/toggle-mixin";
import VRegistration from "@/components/auth/v-registration";
import {mapState} from "vuex"
import imageGetMixin from "@/mixins/image-get-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
export default {
  name: "v-header",
  mixins: [toggleMixin, imageGetMixin],
  components: {VAlertModal, VRegistration, VLoginModal, VButtonNormal},
  computed: mapState({
    profile: state => state.auth.profile
  }),
  methods:{
    logout(){
      this.$store.dispatch("auth/LOGOUT").then(data => {
        if(data.success){
          localStorage.setItem("access_token", '')
          location.reload()
        }
        else
          this.emitter.emit('message', data)
      })
    }
  }
}
</script>

<style scoped>
.header{
  background-color: #fff;
  padding: 20px 15%;
  grid-template-columns: 1fr 2fr 1fr 1fr;
}
.header h1{
  font-size: 38px;
  margin: 0;
}
.logo{
  line-height: .9;
  margin-top: 20px;
  margin-bottom: 20px;
}
.logo span{
  font-style: italic;
  font-size: 45px;
}
.img_block{
  border: 1px solid #ccc;
  height: 40px;
  width: 40px;
}
.info_block{
  font-size: 13px;
}
img{
  width: 28px;
  height: 28px;
}
.profile_image{
  width: 120%;
  height: auto;
}
.router-link-active{
  color: #ea7745;
}
</style>