<template>
  <div class="d-flex a-items-center j-content-center">
    <div class="bg-fff padding-1 w-max h-max-content animation-from-hidden">
      <h3 class="m-top-0">{{ lang.profile.contact.title }}</h3>

      <v-input-normal :label="lang.profile.contact.type.title"
                      :placeholder="lang.profile.contact.type.placeholder"
                      :span="lang.profile.contact.type.description"
                      @value="value => form.type = value"/>

      <v-input-normal :label="lang.profile.contact.contact_information.title"
                      :span="lang.profile.contact.contact_information.description"
                      :placeholder="lang.profile.contact.contact_information.placeholder"
                      class="m-top-1"
                      @value="value => form.information = value"/>

      <div class="d-flex g-gap-1 m-top-1 j-content-flex-end">
        <v-button-normal :label="lang.general.save" class="bg-content" @click="onContact"/>
        <v-button-normal :label="lang.general.cancel" @click="this.$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import {mapState} from "vuex";
import validator from "@/validations/contact.json"
import validateMixin from "@/mixins/validate-mixin";
export default {
  name: "v-contact-edit-form",
  components: {VButtonNormal, VInputNormal},
    computed: mapState({
        lang: state => state.lang.LANG
    }),
  mixins: [validateMixin],
  data(){
    return{
      form: {
        type: "",
        information: ""
      }
    }
  },
  methods: {
    onContact(){
      if(this.checkValid(this.form, validator)){
          this.emitter.emit('load', true)
          this.$store.dispatch("user_contact/CREATE", this.form).then(data => {
              this.emitter.emit('message', data)
          }).finally(() => this.emitter.emit('load', false))
      }
    }
  }
}
</script>

<style scoped>

</style>