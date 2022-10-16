<template>
  <div class="modal d-flex a-items-center j-content-center">
    <div class="modal-content h-max-content animation-from-hidden">
      <h3 class="m-top-0 m-bottom-1 t-center">вход в систему </h3>
      <v-input-normal label="имя пользователя" @value="value => form.name = value"/>
      <v-input-normal label="пароль" class="m-top-1" type="password" @value="value => form.password = value"/>

      <div class="btn_block d-flex g-gap-1 m-top-1 j-content-flex-end">
        <v-button-normal label="войти" class="bg-content" @click="login"/>
        <v-button-normal label="закрыт" @click="this.$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
export default {
  name: "v-login-modal",
  components: {VButtonNormal, VInputNormal},
  data(){
    return{
      form: {
        name: null,
        password: null
      }
    }
  },
  methods: {
    login(){
      console.log(this.form)
      this.$store.dispatch("auth/LOGIN", this.form).then(data => {
        if(!data.success)
          this.emitter.emit("message", data);
      })
    }
  }
}
</script>

<style scoped>
.modal-content{
  width: 25%;
}
</style>