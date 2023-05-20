<template>
  <div class="d-flex a-items-center j-content-center">
    <div class="bg-fff padding-1 w-max h-max-content animation-from-hidden">
      <h3 class="m-top-0">{{ lang.profile.about_me_add.title }}</h3>

      <v-textarea-normal :label="lang.profile.about_me_add.description.title"
                         :span="lang.profile.about_me_add.description.description"
                         @value="value => form.description = value"/>

      <div class="d-flex g-gap-1 m-top-1 j-content-flex-end">
        <v-button-normal :label="lang.general.save" class="bg-content" @click="onAboutUser"/>
        <v-button-normal :label="lang.general.cancel" @click="this.$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import VTextareaNormal from "@/components/_general/v-textarea-normal";
import {mapState} from "vuex";
import validator from "@/validations/user-about.json"
import validateMixin from "@/mixins/validate-mixin";
export default {
  name: "v-about-me-edit-form",
  components: {VTextareaNormal, VButtonNormal},
    computed: mapState({
        lang: state => state.lang.LANG
    }),
  mixins: [validateMixin],
  data(){
    return{
      form: {
        description: ''
      }
    }
  },
  methods: {
    onAboutUser(){
      if(this.checkValid(this.form, validator)){
          this.emitter.emit('load', true)
          this.$store.dispatch("user_about/CREATE", this.form).then(data => {
              this.emitter.emit("message", data);
          }).finally(() => this.emitter.emit('load', false))
      }
    }
  }
}
</script>

<style scoped>
.modal-content{
  width: 50%;
}
</style>