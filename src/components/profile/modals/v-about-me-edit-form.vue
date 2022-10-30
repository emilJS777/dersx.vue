<template>
  <div class="d-flex a-items-center j-content-center">
    <div class="bg-fff padding-1 w-max h-max-content animation-from-hidden">
      <h3 class="m-top-0">о себя</h3>

      <v-textarea-normal label="несколько слов о себя"
                         span="не меньше 20 символов"
                         @value="value => form.description = value"/>

      <div class="d-flex g-gap-1 m-top-1 j-content-flex-end">
        <v-button-normal label="сохранить" class="bg-content" @click="onAboutUser"/>
        <v-button-normal label="закрыть" @click="this.$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import VTextareaNormal from "@/components/_general/v-textarea-normal";
export default {
  name: "v-about-me-edit-form",
  components: {VTextareaNormal, VButtonNormal},
  data(){
    return{
      form: {
        description: ''
      }
    }
  },
  methods: {
    onAboutUser(){
      this.emitter.emit('load', true)
      this.$store.dispatch("user_about/CREATE", this.form).then(data => {
        this.emitter.emit("message", data);
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.modal-content{
  width: 50%;
}
</style>