<template>
  <div class="modal d-flex a-items-center j-content-center">
    <div class="modal-content h-max-content animation-from-hidden">
      <h3 class="m-top-0 m-bottom-1 t-center d-flex g-gap-1 a-items-center j-content-center"><v-logo class="t-center m-top-0 m-bottom-0"/> вход в систему </h3>
      <v-input-normal :label="lang.guest.user_name_or_email" @value="value => form.name = value"/>
      <v-input-normal :label="lang.guest.password.title" class="m-top-1" type="password" @value="value => form.password = value"/>

      <div class="m-top-1 f-size-small d-flex j-content-space-between a-items-flex-start">
<!--        <div class="d-flex g-gap-1 m-top-1 social-icon-size">-->
<!--          <i class="fab fa-github c-pointer"/>-->
<!--          <i class="fab fa-linkedin c-pointer"/>-->
<!--          <i class="fab fa-google c-pointer"/>-->
<!--        </div>-->

        <span class="t-decoration-underline c-content-hover c-pointer" @click="this.$emit('restore_password')">восстановить пароль </span>
      </div>

      <div class="btn_block d-flex g-gap-1 m-top-1 j-content-flex-end">
        <v-button-normal :label="lang.general.sign_in" class="bg-content" @click="login"/>
        <v-button-normal :label="lang.general.cancel" @click="this.$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import VLogo from "@/components/_general/v-logo";
import {mapState} from "vuex";
export default {
  name: "v-login-modal",
  components: {VLogo, VButtonNormal, VInputNormal},
  data(){
    return{
      form: {
        name: null,
        password: null
      }
    }
  },
  computed: mapState({
      lang: state => state.lang.LANG
  }),
  methods: {
    login(){
      this.emitter.emit('load', true)
      this.$store.dispatch("auth/LOGIN", this.form).then(data => {
        if(!data.success)
          this.emitter.emit("message", data);
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.modal-content{
  width: 35%;
}
</style>