<template>
  <div class="modal d-flex a-items-center j-content-center">
    <div class="modal-content h-max-content animation-from-hidden d-grid g-gap-1">
      <h3 class="m-top-0">опыт работы</h3>

      <v-input-normal label="название"
                      span="как назывался проект который вы выполняли"
                      @value="title => form.title = title"/>

      <v-input-normal label="описание"
                      span="вы также можете описать данный проект, какими особенностями обладал проект "
                      @value="description => form.description = description"/>

      <v-input-normal label="ссылка"
                      span="ссылка на проект или репозиторий"
                      @value="link => form.link = link"/>

      <v-input-normal label="скилы или технологии"
                      span="какие скилы или технологии вы использывали при работе с данным проектом "
                      @value="skills => form.skills = skills"/>

      <div class="d-flex g-gap-1">
        <v-date-picker label="начало c"
                       span="дата начало работы с данным проектом "
                       @value="date => form.date_start = date"/>

        <v-date-picker label="завершение"
                       span="дата завершения"
                       @value="date => form.date_end = date"/>
      </div>

      <div class="d-flex g-gap-1 m-top-1 j-content-flex-end">
        <v-button-normal label="сохранить" class="bg-content" @click="onWorkExperience"/>
        <v-button-normal label="закрыть" @click="this.$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import VDatePicker from "@/components/_general/v-date-picker";
export default {
  name: "v-work-experience-edit-modal",
  components: {VDatePicker, VButtonNormal, VInputNormal},
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
      this.emitter.emit('load', true)
      this.$store.dispatch("work_experience/CREATE", this.form).then(data => {
        this.emitter.emit("message", data);
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>

</style>