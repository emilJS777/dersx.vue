<template>
  <div :class="`${mobile ? 'g-gap-1 p-fixed z-index-10 top-0 w-max' : 'g-gap-_3 a-items-center'} header d-grid box-shadow-slim`">
    <div class="logo h-max-content">
      <v-logo/>
    </div>

    <div :class="`${mobile ? 'order-2' : ''} nav d-flex animation-from-hidden`" v-if="!mobile || mobile && toggle">
      <ul :class="`${this.mobile ? '' : ' g-gap-3'} d-flex j-content-space-between w-max a-items-center padding-0`" @click="mobile ? toggle=false : ''" v-if="profile">
        <li>
          <router-link to="/" :class="`d-grid g-gap-_5 a-items-center c-6d c-content-hover t-center  ${mobile ? 'f-size-very-small' : ''}`">
            <i :class="`fa fa-home fa-2x m-0-auto`" aria-hidden="true"></i>
            <b>{{ lang.general.home }}</b>
          </router-link>
        </li>

        <li>
          <router-link to="/vacancies" :class="`d-grid g-gap-_5 a-items-center c-6d c-content-hover t-center ${mobile ? 'f-size-very-small' : ''}`">
            <i :class="`fa fa-globe fa-2x m-0-auto`" aria-hidden="true"></i>
            <b>{{ lang.general.vacancies }}</b>
          </router-link>
        </li>

        <li>
          <router-link to="/users" :class="`d-grid g-gap-_5 a-items-center c-6d c-content-hover t-center ${mobile ? 'f-size-very-small' : ''}`">
            <i :class="`fa fa-user fa-2x m-0-auto`" aria-hidden="true"></i>
            <b>{{ lang.general.users }}</b>
          </router-link>
        </li>

        <li class="p-relative">
          <router-link to="/notifications" :class="`d-grid g-gap-_5 a-items-center c-6d c-content-hover t-center ${mobile ? 'f-size-very-small' : ''}`">
            <v-notification-indicator class="p-absolute indicator notification_indicator"/>
            <i :class="`fa fa-bell fa-2x m-0-auto`" aria-hidden="true"></i>
            <b>{{ lang.general.notifications }}</b>
          </router-link>
        </li>

        <li class="p-relative">
          <router-link to="/messages" :class="`d-grid g-gap-_5 a-items-center c-6d c-content-hover t-center ${mobile ? 'f-size-very-small' : ''}`">
            <v-messages-indicator class="p-absolute indicator"/>
            <i :class="`fa fa-envelope fa-2x m-0-auto`" aria-hidden="true"></i>
            <b>{{ lang.general.messages }}</b>
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="profile" :class="`${mobile ? 'order-1 p-absolute top-0 right-0 m-top-1 m-right-05' : 'p-relative'} d-grid g-gap-1  t-right animation-from-hidden`">
      <div class="auth d-flex j-content-flex-end a-items-center g-gap-1 p-relative" v-if="!mobile || mobile && toggle">
        <div class="d-grid info_block j-content-flex-end m-top-05">
          <b>{{ profile.first_name }} {{ profile.last_name }}</b>
          <i class="f-size-very-small">{{profile.email.address}}</i>
          <p class="c-content t-right f-size-very-small m-top-05 c-pointer" @click="setModalName('logoutAlertModal')">{{ lang.general.sign_out }}</p>
        </div>

        <a :href="`/profile?id=${this.profile.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-50 d-flex j-content-center a-items-center">
          <span v-if="!profile.image">{{profile.first_name[0]}}</span>
          <img :src="'data:image/'+profile.image.filename+';charset=utf-8;base64, ' + profile.image.b64" class="p-absolute absolute-center profile_image" v-else>
        </a>
      </div>

      <div v-if="mobile && !toggle" class="padding-03 m-top-01 l-height-1 f-size-22" @click="toggle = !toggle">
          <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
    </div>

    <div :class="`${mobile ? 'p-absolute top-0 right-0 m-top-1_5 f-size-small m-right-05 d-flex' : ''} auth_block d-flex g-gap-1 j-content-flex-end`" v-if="!profile">
      <v-button-normal :label="lang.general.sign_in" @click="setModalName('login')"/>
      <v-button-normal :label="lang.general.sign_up" class="bg-content" @click="setModalName('registration')"/>
        <v-select-lang v-if="mobile || mobile && toggle" :class="`${mobile ? 'order-4  z-index-1 animation-from-hidden' : ''} m-left-05`"/>


    </div>
    <v-select-lang v-if="!mobile || mobile && toggle" :class="`${mobile ? 'order-4 margin-1 z-index-1 animation-from-hidden' : ''} m-left-05`"/>
  </div>

  <div class="p-fixed bg-c5c top-0 left-0 w-max h-max z-index-5 animation-from-hidden" v-if="mobile && toggle" @click="this.toggle = ! toggle"></div>

<!--  AUTH MODAL-->
  <v-login-modal v-if="modalName === 'login'" @close="setModalName(false)" @restore_password="setModalName('restorePassword')"/>
  <v-registration v-if="modalName === 'registration'" @close="setModalName(false)"/>
  <v-create-restore-password v-if="modalName === 'restorePassword'" @close="setModalName(false)"/>
  <v-update-restore-password v-if="this.$route.query.restore_password_security_code"/>

<!--  CONFIRM MODAL-->
  <v-alert-modal v-if="modalName === 'logoutAlertModal'"
                 :label="lang.general.sign_out_confirm"
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
import VCreateRestorePassword from "@/components/auth/v-create-restore-password.vue";
import VUpdateRestorePassword from "@/components/auth/v-update-restore-password.vue";
import VSelectLang from "@/components/_general/v-select-lang.vue";
import deviceMixin from "@/mixins/device-mixin";
export default {
  name: "v-header",
  mixins: [toggleMixin, imageGetMixin, deviceMixin],
  components: {
      VSelectLang,
      VUpdateRestorePassword,
      VCreateRestorePassword,
    VNotificationIndicator,
    VMessagesIndicator, VLogo, VAlertModal, VRegistration, VLoginModal, VButtonNormal},
  data(){
      return{
          toggle: false
      }
  },
  computed: mapState({
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
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
  grid-template-columns: 1fr 3fr 1.1fr .2fr;
}
@media only screen and (max-width: 830px) {
    .header{
        grid-template-columns: 1fr;
    }
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