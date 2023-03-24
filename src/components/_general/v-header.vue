<template>
  <div class="header d-grid g-gap-_3 a-items-center box-shadow-slim">
    <div class="logo">
      <v-logo/>
      <i>freelance exchange</i>
    </div>

    <div class="nav d-flex">
      <ul class="d-flex j-content-space-between w-max g-gap-3 a-items-center padding-0" v-if="profile">
        <li>
          <router-link to="/" class="d-grid g-gap-_5 a-items-center c-6d c-content-hover">
            <i class="fa fa-home fa-2x m-0-auto" aria-hidden="true"></i>
            <b>главная</b>
          </router-link>
        </li>

<!--        <li>-->
<!--          <router-link to="/services" class="d-grid g-gap-_5 a-items-center c-6d c-content-hover">-->
<!--            <i class="fa fa-briefcase m-0-auto fa-2x" aria-hidden="true"></i>-->
<!--            <b>услуги</b>-->
<!--          </router-link>-->
<!--        </li>-->

        <li>
          <router-link to="/vacancies" class="d-grid g-gap-_5 a-items-center c-6d c-content-hover">
            <i class="fa fa-globe m-0-auto fa-2x" aria-hidden="true"></i>
            <b>вакансии</b>
          </router-link>
        </li>

<!--        <li>-->
<!--          <router-link to="/companies" class="d-grid g-gap-_5 a-items-center c-6d c-content-hover">-->
<!--            <i class="fa fa-building m-0-auto fa-2x" aria-hidden="true"></i>-->
<!--            <b>компании</b>-->
<!--          </router-link>-->
<!--        </li>-->

<!--        <li>-->
<!--          <router-link to="/resumes" class="d-grid g-gap-_5 a-items-center c-6d c-content-hover">-->
<!--            <i class="fa fa-file-pdf m-0-auto fa-2x" aria-hidden="true"></i>-->
<!--            <b>резюме</b>-->
<!--          </router-link>-->
<!--        </li>-->

        <li>
          <router-link to="/users" class="d-grid g-gap-_5 a-items-center c-6d c-content-hover">
            <i class="fa fa-user fa-2x m-0-auto" aria-hidden="true"></i>
            <b>пользователи</b>
          </router-link>
        </li>

<!--        <li>-->
<!--          <router-link to="/groups" class="d-grid g-gap-_5 a-items-center c-6d c-content-hover">-->
<!--            <i class="fa fa-users fa-2x m-0-auto" aria-hidden="true"></i>-->
<!--            <b>группы</b>-->
<!--          </router-link>-->
<!--        </li>-->

        <li class="p-relative">
          <router-link to="/notifications" class="d-grid g-gap-_5 a-items-center c-6d c-content-hover">
            <v-notification-indicator class="p-absolute indicator notification_indicator"/>
            <i class="fa fa-bell fa-2x m-0-auto" aria-hidden="true"></i>
            <b>уведомления</b>
          </router-link>
        </li>

        <li class="p-relative">
          <router-link to="/messages" class="d-grid g-gap-_5 a-items-center c-6d c-content-hover">
            <v-messages-indicator class="p-absolute indicator"/>
            <i class="fa fa-envelope fa-2x m-0-auto" aria-hidden="true"></i>
            <b>сообщения</b>
          </router-link>
        </li>

<!--        <li>-->
<!--          <router-link to="/resume" class="d-grid g-gap-_5 a-items-center c-6d c-content-hover">-->
<!--            <i class="fa fa-file fa-2x m-0-auto" aria-hidden="true"></i>-->
<!--            <b>резюме</b>-->
<!--          </router-link>-->
<!--        </li>-->

<!--        <li>-->
<!--          <router-link to="/teams" class="d-flex g-gap-_5 a-items-center c-6d c-content-hover">-->
<!--            <i class="fa fa-users" aria-hidden="true"></i>-->
<!--            <b>команды</b>-->
<!--          </router-link>-->
<!--        </li>-->
      </ul>
    </div>

    <div v-if="profile" class="d-grid g-gap-1 p-relative">
      <div class="auth d-flex j-content-flex-end a-items-center g-gap-1 p-relative" >

        <div class="d-grid info_block j-content-flex-end">
          <b>{{ profile.first_name }} {{ profile.last_name }}</b>
          <i>{{profile.email_address}}</i>
          <span class="c-content f-size-very-small w-max-content c-pointer" @click="setModalName('logoutAlertModal')">выйти из аккаунта</span>

        </div>

        <a :href="`/profile?id=${this.profile.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-50 d-flex j-content-center a-items-center">
          <span v-if="!profile.image">{{profile.first_name[0]}}</span>
          <img :src="'data:image/'+profile.image.filename+';charset=utf-8;base64, ' + profile.image.b64" class="p-absolute absolute-center profile_image" v-else>
        </a>
      </div>
    </div>

    <div class="auth_block d-flex g-gap-1 j-content-flex-end" v-if="!profile">
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
import VLogo from "@/components/_general/v-logo";
import VMessagesIndicator from "@/components/messager/v-messages-indicator";
import VNotificationIndicator from "@/components/notification/v-notification-indicator";
export default {
  name: "v-header",
  mixins: [toggleMixin, imageGetMixin],
  components: {
    VNotificationIndicator,
    VMessagesIndicator, VLogo, VAlertModal, VRegistration, VLoginModal, VButtonNormal},
  computed: mapState({
    profile: state => state.auth.profile,
  }),
  mounted() {
    this.$store.dispatch("notification/GET", ``).then(() => {})
    this.sockets.subscribe('notification_ids', (data) => {
      this.$store.commit("notification/SET_NOTIFICATION_IDS", data.notification_ids)
    });
  },
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
  grid-template-columns: 1fr 3fr 1.1fr;
}
.logo{
  line-height: .9;
  margin-top: 20px;
  margin-bottom: 20px;
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
  color: #ba6f0b;
}
li{
  font-size: 12px;
}
.indicator{
  width: 10px;
  height: 10px;
  font-size: 9px;
  top: -4px;
  right: 6px;
}
.notification_indicator{
  right: 12px;
}
</style>