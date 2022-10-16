<template>
  <div class="components d-grid g-gap-2">
    <v-select-normal label="viberite sferu" :items="[{id: 1, name: 'asd'}]"/>
    <v-input-normal label="input" type="text"/>
    <v-checkboxes-normal label="checkboxes label" :checkboxes="[{id: 1, title: 'check 1'}, {id: 1, title: 'check 1'}]"/>
    <v-textarea-normal label="textarea"/>
    <v-radios-normal label="radio normal" :radios="[{id: 1, title: 'radio 1'}, {id: 2, title: 'radio 2'}]"/>
    <v-input-file-normal label="загрузка файла" sublabel="pdf, word" :allowedTypes="['application/pdf', 'application/word']"/>
    <v-button-normal label="Button"/>
  </div>
</template>

<script>
import VSelectNormal from "@/components/_general/v-select-normal";
import VInputNormal from "@/components/_general/v-input-normal";
import VCheckboxesNormal from "@/components/_general/v-checkboxes-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import VTextareaNormal from "@/components/_general/v-textarea-normal";
import VRadiosNormal from "@/components/_general/v-radios-normal";
import VInputFileNormal from "@/components/_general/v-input-file-normal";
export default {
  name: "v-components",
  components: {
    VInputFileNormal,
    VRadiosNormal, VTextareaNormal, VButtonNormal, VCheckboxesNormal, VInputNormal, VSelectNormal}
}
</script>

<style scoped>
  .components{
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>