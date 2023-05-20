<template>
  <div class="d-flex a-items-center j-content-center">
    <div class="bg-fff padding-1 h-max-content w-max animation-from-hidden d-grid g-gap-1">
      <h3 class="m-top-0">{{ lang.profile.information.experience }}</h3>

      <v-input-normal :label="lang.profile.experience_add.title.title"
                      :span="lang.profile.experience_add.title.description"
                      @value="title => form.title = title"/>

      <v-input-normal :label="lang.profile.experience_add.description.title"
                      :span="lang.profile.experience_add.description.description"
                      @value="description => form.description = description"/>

      <v-input-normal :label="lang.profile.experience_add.link.title"
                      :span="lang.profile.experience_add.link.description"
                      @value="link => form.link = link"/>

      <v-input-normal :label="lang.profile.experience_add.skills_or_technologies.title"
                      :span="lang.profile.experience_add.skills_or_technologies.description"
                      @value="skills => form.skills = skills"/>

      <div class="d-flex g-gap-1">
        <v-date-picker :label="lang.profile.experience_add.start_date.title"
                       :span="lang.profile.experience_add.start_date.description"
                       @value="date => form.date_start = date"/>

        <v-date-picker :label="lang.profile.experience_add.end_date.title"
                       :span="lang.profile.experience_add.end_date.description"
                       @value="date => form.date_end = date"/>
      </div>

      <div class="d-flex g-gap-1 m-top-1 j-content-flex-end">
        <v-button-normal :label="lang.general.save" class="bg-content" @click="onWorkExperience"/>
        <v-button-normal :label="lang.general.cancel" @click="this.$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import VDatePicker from "@/components/_general/v-date-picker";
import validator from "@/validations/work-experience.json"
import {mapState} from "vuex";
import validateMixin from "@/mixins/validate-mixin";
export default {
  name: "v-work-experience-edit-form",
  components: {VDatePicker, VButtonNormal, VInputNormal},
    computed: mapState({
        lang: state => state.lang.LANG
    }),
  mixins: [validateMixin],
  data(){
    return{
      form: {
        title: "",
        description: "",
        skills: "",
        link: "",
        date_start: "",
        date_end: ""
      }
    }
  },
  methods: {
    onWorkExperience(){
      if(this.checkValid(this.form, validator)){
          this.emitter.emit('load', true)
          this.$store.dispatch("work_experience/CREATE", this.form).then(data => {
              this.emitter.emit("message", data);
          }).finally(() => this.emitter.emit('load', false))
      }
    }
  }
}
</script>

<style scoped>

</style>