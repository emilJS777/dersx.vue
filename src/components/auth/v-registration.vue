<template>
  <div class="modal d-flex a-items-center j-content-center">
    <div class="modal-content animation-from-hidden h-max">
      <h3 class="m-top-0 m-bottom-1 t-center d-flex g-gap-1 j-content-center a-items-center">
        <v-logo/>
        регистрация
      </h3>

      <form action="">
        <v-input-normal label="имя пользователя"
                        span="имя пользователя должно содержать не менее 6  и не больше 16 символов "
                        @value="(value) => this.form.name = value"/>

        <v-input-normal label="имя"
                        class="m-top-1"
                        type="text"
                        @value="(value) => this.form.first_name = value"/>

        <v-input-normal label="фамилия "
                        class="m-top-1"
                        type="text"
                        @value="(value) => this.form.last_name = value"/>

        <v-country-region-select label="Местонахождение"
                                 span="Выберите свое местоположение"
                                 @value="value => form.region = value"
                                 class="m-top-1"/>

        <v-date-picker label="выберите дату своего рождения"
                       class="m-top-1"
                       @value="(value) => this.form.date_birth = value"/>
        
        <v-radios-normal label="ваш пол" class="m-top-1"
                         name="gender"
                         @value="value => this.form.gender_id = value.id"
                         :radios="this.genders"
                         v-if="genders.length"/>

        <v-input-normal label="адрес электронной почты"
                        class="m-top-1"
                        type="email"
                        span="на вашу почту будет отправленнно ссылка или код для подтверждения почты "
                        @value="(value) => this.form.email_address = value"/>

        <v-input-normal label="пароль"
                        class="m-top-1"
                        type="password"
                        span="пароль должен содержать не менее 8 и не больше 32 символов "
                        @value="(value) => this.form.password = value"/>

        <v-input-normal label="повторите пароль" class="m-top-1" type="password" span=""/>

        <div class="d-flex g-gap-1 m-top-1 social-icon-size">
          <i class="fab fa-github c-pointer"/>
          <i class="fab fa-linkedin c-pointer"/>
          <i class="fab fa-google c-pointer"/>
        </div>

        <div class="btn_block d-flex g-gap-1 m-top-1 j-content-flex-end">
          <v-button-normal label="войти" class="bg-content" @click="registration"/>
          <v-button-normal label="закрыт" @click="this.$emit('close')"/>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import toggleMixin from "@/mixins/toggle-mixin";
import VDatePicker from "@/components/_general/v-date-picker";
import VRadiosNormal from "@/components/_general/v-radios-normal";
import VLogo from "@/components/_general/v-logo";
import VCountryRegionSelect from "@/components/_general/v-country-region-select.vue";

export default {
  name: "v-registration",
  mixins: [toggleMixin],
  components: {VCountryRegionSelect, VLogo, VRadiosNormal, VDatePicker, VButtonNormal, VInputNormal},
  data() {
    return {
      genders: [],
      form: {
        name: null,
        first_name: null,
        last_name: null,
        date_birth: null,
        region: null,
        password: null,
        email_address: null,
        gender_id: null
      }
    };
  },
  mounted(){
    this.$store.dispatch("gender/GET", '').then(data => {
      if(data.success)
        this.genders = data.obj
    })
  },
  methods: {
    registration(e){
      e.preventDefault()
      this.emitter.emit('load', true)
      this.$store.dispatch("user/CREATE", this.form).then(data => {
        if(!data.success)
          this.emitter.emit("message", data);
        else{
          this.$store.dispatch("auth/LOGIN", this.form)
        }
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.modal-content{
  width: 25%;
  overflow: auto;
}
</style>