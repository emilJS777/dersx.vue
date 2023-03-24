<template>
  <div class="resume_create d-grid g-gap-3">
    <div class="d-grid h-max-content g-gap-1">
      <v-button-normal label="скачать файл PDF" @click="exportToPDF"/>
      <v-button-normal label="скачать и опубликовать PDF"/>
    </div>
    <v-resume-form/>
  </div>
</template>

<script>
import VResumeForm from "@/components/resume/forms/v-resume-form.vue";
import html2pdf from "html2pdf.js";
import VButtonNormal from "@/components/_general/v-button-normal.vue";

export default {
  name: "v-resume-create",
  components: {VButtonNormal, VResumeForm},
  methods: {
    exportToPDF() {
      html2pdf(document.getElementById('pdf'));
    }
  }
}
</script>

<style scoped>
.resume_create{
  grid-template-columns: .6fr 2fr;
}
</style>