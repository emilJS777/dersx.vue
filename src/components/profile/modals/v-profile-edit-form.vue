<template>
  <div class="d-flex j-content-center h-max a-items-center">
    <div class="bg-fff padding-1 animation-from-hidden d-grid h-max-content w-max">
      <h3 class="m-top-0 m-bottom-0">личнные даннные</h3>
      <span class="f-size-very-small m-top-0">не прописывайте те поля которые не хотите изменить</span>

      <div class="m-top-1">
        <v-input-normal label="имя пользователя" :placeholder="profile.name"
                        span="имя пользователя должно содержать не менее 6  и не больше 16 символов"
                        @value="value => this.form.name = value"/>

        <v-input-normal label="электронная почта"
                        :placeholder="profile.email_address"
                        class="m-top-1"
                        span="на вашу почту будет отправленнно ссылка или код для подтверждения почты "
                        @value="value => this.form.email_address = value"/>

        <v-input-normal label="имя" :placeholder="profile.first_name" class="m-top-1"
                        @value="value => this.form.first_name = value"/>

        <v-input-normal label="фамилия" :placeholder="profile.last_name" class="m-top-1"
                        @value="value => this.form.last_name = value"/>

        <v-country-region-select label="Местонахождение"
                                 span="Выберите свое местоположение"
                                 :placeholder="profile.region"
                                 @value="value => form.region = value"
                                 class="m-top-1"/>

        <v-date-picker label="выберите дату своего рождения"
                       class="m-top-1"
                       :value="profile.date_birth"
                       @value="(value) => this.form.date_birth = value"/>


        <v-radios-normal label="ваш пол" class="m-top-1"
                         name="gender"
                         :active_id="profile.gender_id"
                         @value="value => this.form.gender_id = value.id"
                         :radios="this.genders"/>
      </div>

      <div class="btn_block d-flex g-gap-1 j-content-flex-end m-top-2">
        <v-button-normal label="сохранить" class="bg-content" @click="updateProfile"/>
        <v-button-normal label="закрыт" @click="this.$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import {mapState} from "vuex";
import toggleMixin from "@/mixins/toggle-mixin";
import VInputNormal from "@/components/_general/v-input-normal";
import VDatePicker from "@/components/_general/v-date-picker";
import VRadiosNormal from "@/components/_general/v-radios-normal";
import VCountryRegionSelect from "@/components/_general/v-country-region-select.vue";
export default {
  name: "v-profile-edit-form",
  components: {VCountryRegionSelect, VRadiosNormal, VDatePicker, VInputNormal, VButtonNormal},
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      genders: [],
      form: {
        name: '',
        email_address: '',
        first_name: '',
        last_name: '',
        date_birth: '',
        region: '',
        gender_id: null,
      }
    }
  },
  mounted(){
    this.form.gender_id = this.profile.gender_id
    this.$store.dispatch("gender/GET", '').then(data => {
      if(data.success)
        this.genders = data.obj
    })
  },
  methods: {
    updateProfile(){
      this.emitter.emit('load', true)
      this.$store.dispatch("user/UPDATE", this.form).then(data => {
        this.emitter.emit("message", data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.tab_block{
  grid-template-columns: 1fr 1fr 1fr;
}
</style>